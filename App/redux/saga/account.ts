import { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import {
  put,
  call,
  takeLatest,
  delay,
  CallEffect,
  PutEffect,
  ForkEffect,
  select,
  SelectEffect
} from 'redux-saga/effects';
import {
  ActionSignInSuccess,
  ActionSignOutComplete,
  ActionSignUpSuccess
} from 'redux/actions/account';
import { ActionHideLoading, ActionShowLoading } from 'redux/actions/loading';
import { USER_CREDENTIALS } from 'const';
import { GET_USER, SIGNIN, SIGNOUT, SIGNUP } from 'const/account';
import { ServerResponseError } from 'types';
import { ReduxStateRoot } from 'types/Redux';
import { ReduxActionLoading } from 'types/Redux/Loading';
import {
  ServerResponseAuthSuccess,
  ItemUserBasic,
  ItemUser,
  ItemUserSignup
} from 'types/Account';
import {
  ReduxActionAccount,
  ReduxActionAuthSignIn,
  ReduxActionAuthUserInformation
} from 'types/Redux/Account';
import { CreateAccount, SignIn } from 'api/account';
import { StorageGetUserCredentials, StoragePutAccessToken } from 'api/account';

function* WatchGetUser(): Generator<
  | SelectEffect
  | CallEffect<ItemUser | null>
  | CallEffect<void>
  | PutEffect<ReduxActionAccount>,
  void,
  ItemUser | null
> {
  try {
    let user: ItemUser | null = yield select(
      (state: ReduxStateRoot): ItemUser | null => state.account.user || null
    );
    if (user) {
      yield call(StoragePutAccessToken, user);
      return;
    }
    user = yield call<() => Promise<ItemUser | null>>(
      StorageGetUserCredentials
    );
    if (user) {
      yield put(ActionSignInSuccess(user));
    }
  } catch {
    yield put(ActionSignOutComplete());
  }
}

function* WatchSignIn({
  payload
}: ReduxActionAuthSignIn): Generator<
  | CallEffect<ServerResponseAuthSuccess>
  | CallEffect<void>
  | PutEffect<ReduxActionLoading>
  | CallEffect<true>,
  void,
  never
> {
  try {
    yield put(ActionShowLoading());
    yield delay<true>(1500);
    let response: ServerResponseAuthSuccess = yield call<
      (data: ItemUserBasic) => Promise<ServerResponseAuthSuccess>
    >(SignIn, payload);

    response = response as ServerResponseAuthSuccess;

    if (response as ServerResponseAuthSuccess) {
      //	Alert.alert(response.message);
      response = response as ServerResponseAuthSuccess;
      yield delay<true>(1000);
      console.log('response.user==>');
      console.log(response.user);
      yield put(ActionSignInSuccess(response.user));
      yield call(StoragePutAccessToken, response.user);
    }
  } catch (exception: AxiosError<ServerResponseError> | Error | unknown) {
    let errorMessage: string = '';
    let errorContent: string = '';

    if ((exception as AxiosError)?.isAxiosError)
      AxiosErrorCase: {
        const axiosException: ServerResponseError | undefined = (
          exception as AxiosError
        ).response?.data;

        errorMessage = (exception as AxiosError).message;

        if (!axiosException) {
          break AxiosErrorCase;
        }

        errorContent = (axiosException as ServerResponseError).errors
          .map(error => error.msg)
          .join('\n')
          .trim();
      }
    else {
      errorMessage =
        exception instanceof Error
          ? exception.message
          : 'Sign in failed. Please try again!';
    }

    Alert.alert(errorMessage, errorContent);
  } finally {
    yield put(ActionHideLoading());
  }
}

function* WatchSignOut(): Generator<
  | PutEffect<ReduxActionLoading>
  | CallEffect<true>
  | PutEffect<ReduxActionAccount>,
  void,
  never
> {
  yield put(ActionShowLoading());
  yield delay(1500);
  // Alert.alert('Sign out completed!');
  AsyncStorage.removeItem(USER_CREDENTIALS);
  yield put(ActionSignOutComplete());
  yield put(ActionHideLoading());
}

function* WatchSignUp({ payload }: ReduxActionAuthUserInformation) {
  debugger;
  try {
    yield put(ActionShowLoading());
    yield delay<true>(1500);
    let response: ServerResponseAuthSuccess = yield call<
      (data: ItemUserSignup) => Promise<ServerResponseAuthSuccess>
    >(CreateAccount, payload);
    // callback();
    response = response as ServerResponseAuthSuccess;

    if (response as ServerResponseAuthSuccess) {
      Alert.alert(response.message);
      response = response as ServerResponseAuthSuccess;
      yield delay<true>(1000);
      yield put(ActionSignUpSuccess(response.user));
      yield call(StoragePutAccessToken, response.user);
    }
  } catch (exception: Error | any | unknown) {
    console.log('WatchSignUp exception==>', exception.response.data);
    Alert.alert(exception?.response?.data?.errors[0]?.msg);
  } finally {
    yield put(ActionHideLoading());
  }
}

function* Auth(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(GET_USER, WatchGetUser);
  yield takeLatest(SIGNIN, WatchSignIn);
  yield takeLatest(SIGNOUT, WatchSignOut);
  yield takeLatest(SIGNUP, WatchSignUp);
}
export default Auth;

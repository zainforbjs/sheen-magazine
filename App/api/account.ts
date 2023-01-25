import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { USER_CREDENTIALS } from 'const';
import { URL_AUTH } from 'const/url';
import {
  ServerResponseAuthSuccess,
  ItemUserBasic,
  ItemUser,
  InputResetPassword,
  ItemUserSignup,
  ServerResponseUserDeleteSuccess,
  SubscriptionForUSer
} from 'types/Account';
import {
  ApiCallResult,
  ServerResponseError,
  ServerResponseSimpleActionSuccess,
  SubscriptionProduct
} from 'types';
import api from 'api';

export const SignIn = (
  data: ItemUserBasic
): Promise<ServerResponseAuthSuccess> => {
  return api.Post<ServerResponseAuthSuccess, ItemUserBasic>(
    `${URL_AUTH}/login`,
    data
  );
};

export const DeleteAccount = (
  userId: string
): Promise<ServerResponseUserDeleteSuccess> => {
  return api.Put<ServerResponseUserDeleteSuccess, null>(
    `${URL_AUTH}/deleteUser/${userId}`,
    null
  );
};

export const CreateAccount = (
  data: ItemUserSignup
): Promise<ServerResponseAuthSuccess> => {
  debugger;
  return api.Post<ServerResponseAuthSuccess, ItemUserSignup>(
    `${URL_AUTH}/signUp`,
    data
  );
};

export const RequestChangePassword = async (
  email: string
): Promise<ApiCallResult> => {
  type PostDataType = {
    email: string;
  };
  return PasswordAction<PostDataType>(
    'requestPasswordReset',
    { email },
    'Request reset password failed. Please try again!'
  );
};

export const RequestVerifyOTP = (
  email: string,
  otpCode: string
): Promise<ApiCallResult> => {
  type PostDataType = {
    email: string;
    otpCode: string;
  };
  return PasswordAction<PostDataType>(
    'verifyOTP',
    { email, otpCode },
    'Bad Request'
  );
};

export const ChangePassword = (
  data: InputResetPassword
): Promise<ApiCallResult> => {
  return PasswordActionWithPut('changePassword', data, 'Bad Request');
};

export async function StorageGetUserCredentials(): Promise<ItemUser | null> {
  const userCredentials: string | null = await AsyncStorage.getItem(
    USER_CREDENTIALS
  );
  try {
    let json: any = JSON.parse(userCredentials ?? '');
    return json as ItemUser;
  } catch {
    return null;
  }
}

export async function StoragePutAccessToken(items: string | ItemUser) {
  try {
    await AsyncStorage.setItem(USER_CREDENTIALS, JSON.stringify(items));
  } catch {}
}

async function PasswordAction<PostDataType>(
  action: string,
  data: PostDataType,
  failMessage: string
): Promise<ApiCallResult> {
  try {
    const response: ServerResponseSimpleActionSuccess = await api.Post<
      ServerResponseSimpleActionSuccess,
      PostDataType
    >(`${URL_AUTH}/${action}`, data);
    return {
      success: true,
      message: response.message,
      token: response.token
    };
  } catch (exception: AxiosError<ServerResponseError> | Error | unknown) {
    console.log('exception=>', exception);
    let errorMessage: string = '';

    if ((exception as AxiosError)?.isAxiosError)
      AxiosErrorCase: {
        const axiosException: ServerResponseError | undefined = (
          exception as AxiosError
        ).response?.data;

        if (!axiosException) {
          break AxiosErrorCase;
        }

        errorMessage = (axiosException as ServerResponseError).errors
          .map(error => error.msg)
          .join('\n')
          .trim();
      }
    else {
      errorMessage =
        exception instanceof Error ? exception.message : failMessage;
    }
    return {
      success: false,
      message: errorMessage
    };
  }
}
async function PasswordActionWithPut<PostDataType>(
  action: string,
  data: PostDataType,
  failMessage: string
): Promise<ApiCallResult> {
  try {
    const response: ServerResponseSimpleActionSuccess = await api.Put<
      ServerResponseSimpleActionSuccess,
      PostDataType
    >(`${URL_AUTH}/${action}`, data);
    return {
      success: true,
      message: response.message
    };
  } catch (exception: AxiosError<ServerResponseError> | Error | unknown) {
    console.log('exception=>', exception);
    let errorMessage: string = '';

    if ((exception as AxiosError)?.isAxiosError)
      AxiosErrorCase: {
        const axiosException: ServerResponseError | undefined = (
          exception as AxiosError
        ).response?.data;

        if (!axiosException) {
          break AxiosErrorCase;
        }

        errorMessage = (axiosException as ServerResponseError).errors
          .map(error => error.msg)
          .join('\n')
          .trim();
      }
    else {
      errorMessage =
        exception instanceof Error ? exception.message : failMessage;
    }
    return {
      success: false,
      message: errorMessage
    };
  }
}

export const GetAvailableSubscription = (): Promise<SubscriptionProduct[]> => {
  return api.Get(`${URL_AUTH}/getSubscriptionProducts`, {
    params: { platform: Platform.OS }
  });
};

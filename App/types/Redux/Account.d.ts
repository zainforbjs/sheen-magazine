import { SIGNIN, SIGNUP } from 'const/account';
import { ReduxActionWithPayload, ReduxActionType } from 'types';
import { ReduxStateLoading } from "types/Redux/Loading";
import { ItemUser, ItemUserBasic } from "types/Account";

export type ReduxDispatchPropsAuth = {
  GetUser: () => void;
};
export type ReduxActionAccount = ReduxActionType<string> &
{
  user?: ItemUser;
  error?: string;
};

export type ReduxStateAccount = 
{
  user?: ItemUser;
  registerUser?: ItemUser;
  error?: string;

};
export type ReduxStateAccountProps = ReduxStateAccount & ReduxStateLoading;
export type ReduxActionAuthSignIn = ReduxActionWithPayload<SIGNIN, ItemUserBasic>;

export type ReduxActionAuthUserInformation = ReduxActionWithPayload<SIGNUP, ItemUser> 

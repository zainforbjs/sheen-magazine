import { SIGNIN, SIGNIN_SUCCESS, SIGNIN_ERROR, SIGNOUT, SIGNOUT_COMPLETE, SIGNUP, SIGNUP_SUCCESS } from 'const/account';
import { ItemUser, ItemUserBasic } from 'types/Account';
import { ReduxActionAccount, ReduxActionAuthSignIn, ReduxActionAuthUserInformation } from "types/Redux/Account";

export const ActionSignIn = (payload: ItemUserBasic) : ReduxActionAuthSignIn => ({ type: SIGNIN, payload }); 
export const ActionSignInSuccess = (user: ItemUser) : ReduxActionAccount => ({ type: SIGNIN_SUCCESS, user });
export const ActionSignInError = (error: string) : ReduxActionAccount => ({ type: SIGNIN_ERROR, error });
export const ActionSignOut = (): ReduxActionAccount => ({ type: SIGNOUT }); 
export const ActionSignOutComplete = () : ReduxActionAccount => ({ type: SIGNOUT_COMPLETE });

export const ActionSignUp = (payload: ItemUser) : ReduxActionAuthUserInformation => ( { type: SIGNUP, payload});
export const ActionSignUpSuccess = (user: ItemUser) : ReduxActionAccount => ({ type: SIGNUP_SUCCESS, user });
import React from 'react';
import { SIGNIN_ERROR, SIGNIN_SUCCESS, SIGNOUT_COMPLETE, SIGNUP, SIGNUP_SUCCESS } from 'const/account';
import { ReduxActionAccount, ReduxStateAccount } from "types/Redux/Account";

const initialState: ReduxStateAccount = {
  user: undefined,
  registerUser: undefined,
  error:''
};

const account: React.Reducer<ReduxStateAccount, ReduxActionAccount> = (
  state = initialState,
  action,
): ReduxStateAccount => {
  const {type, user, error} = action;
  switch (type) {
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        user: user,
        error: "",
      };
    }
    case SIGNIN_ERROR: {
      return {
        ...state,
        error: error,
      };
    }
    case SIGNOUT_COMPLETE: {
      return {
        ...state,
        user: undefined,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        user: user,
      };
    }
    default:
      return state;
  }
};

export default account;

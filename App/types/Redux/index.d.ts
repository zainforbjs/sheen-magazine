import { Reducer } from 'react';
import { CombinedState } from 'redux';
import { ReduxActionAccount, ReduxStateAccount } from 'types/Redux/Account';
import {
  ReduxActionLivestream,
  ReduxStateLivestream
} from 'types/Redux/Livestream';
import { ReduxActionLoading, ReduxStateLoading } from 'types/Redux/Loading';

export type ReduxState = CombinedState<
  ReduxStateAccount,
  ReduxStateLoading,
  ReduxStateLivestream
>;
export type ReduxStateAction = ReduxActionAccount &
  ReduxActionLoading &
  ReduxActionLivestream;

export type ReduxStateRoot = {
  account: ReduxStateAccount;
  loading: ReduxStateLoading;
  livestream: ReduxStateLivestream;
  cart: any;
};

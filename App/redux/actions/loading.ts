import {HIDE_LOADING, SHOW_LOADING} from 'const/loading';
import {ReduxActionLoading} from 'types/Redux/Loading';

export const ActionShowLoading = (): ReduxActionLoading => ({ type: SHOW_LOADING });
export const ActionHideLoading = (): ReduxActionLoading => ({ type: HIDE_LOADING });

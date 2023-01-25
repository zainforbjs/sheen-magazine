import { HIDE_LOADING, SHOW_LOADING } from 'const/loading';
import { ReduxAction } from 'types';

export type ReduxActionLoading = ReduxAction<SHOW_LOADING | HIDE_LOADING>; 
export type ReduxStateLoading = 
{
	isLoading: boolean;
}; 

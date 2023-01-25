import React from 'react';
import { HIDE_LOADING, SHOW_LOADING } from 'const/loading';
import { ReduxActionLoading, ReduxStateLoading } from 'types/Redux/Loading';

const initialState: ReduxStateLoading = 
{
	isLoading: false
};
const loading: React.Reducer<ReduxStateLoading, ReduxActionLoading> = (state: ReduxStateLoading = initialState, action): ReduxStateLoading =>
{
	const { type } = action;
	switch (type)
	{
		case SHOW_LOADING: 
		{
			return {
				...state,
				isLoading: true,
			};
		}
		case HIDE_LOADING: 
		{
			return {
				...state,
				isLoading: false,
			};
		}
		default:
			return state;
	}
};

export default loading;

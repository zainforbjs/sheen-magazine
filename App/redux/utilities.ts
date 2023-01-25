import { Dispatch } from 'redux';
import { ReduxStateAccount, ReduxStateAccountProps } from 'types/Redux/Account';
import { ReduxStateRoot } from 'types/Redux';
import { ReduxStateLoading } from 'types/Redux/Loading';
import { ReduxActionLivestream, ReduxDispatchLivestream, ReduxStateLivestreamCategories } from 'types/Redux/Livestream';
import { ActionGetVideoCategories } from "redux/actions/livestream";

export function MapStateToPropsCart(state: ReduxStateRoot): any
{
	return { cart: state.cart };
}
export function MapDispatchToPropsVideoCategories(dispatch: Dispatch<ReduxActionLivestream>): ReduxDispatchLivestream
{
	return {
		GetVideoCategories: (callback?: (() => Promise<void>)) => dispatch(ActionGetVideoCategories(callback))
	};
}
export function MapStateToPropsAuth(state: ReduxStateRoot): ReduxStateAccountProps
{
	const { user } = MapStateToPropsAuthUser(state);
	const { isLoading } = MapStateToPropsLoading(state);
	return { user, isLoading };
}

export function MapStateToPropsAuthUser(state: ReduxStateRoot): ReduxStateAccount
{
	return {
		user: state.account.user
	};
}

export function MapStateToPropsLoading(state: ReduxStateRoot): ReduxStateLoading
{
	return {
		isLoading: state.loading.isLoading
	};
}

export function MapStateToPropsLivestream(state: ReduxStateRoot): string | undefined
{
	return state.livestream.applicationId;
}

export function MapStateToPropsVideoCategories(state: ReduxStateRoot): ReduxStateLivestreamCategories
{
	return {
		categories: state.livestream.categories
	};
}

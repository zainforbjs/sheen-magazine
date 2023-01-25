import { put, call, takeLatest } from 'redux-saga/effects';
import { GET_SUBSCRIPTION_PRODUCTS } from "const/subscription";
import { SubscriptionProduct } from "types";
import { ActionUpdateSubscriptionProducts } from "redux/actions/subscription";
import { GetAvailableSubscription } from "api/account";

function* WatchGetSubscriptionProducts()
{
	try
	{
        let products : SubscriptionProduct[] = yield call<()=> Promise<SubscriptionProduct[]>>(GetAvailableSubscription); 
        yield put(ActionUpdateSubscriptionProducts(products)); 
	} 
	catch {}
}

function* Subscription()
{
	yield takeLatest(GET_SUBSCRIPTION_PRODUCTS, WatchGetSubscriptionProducts);
}
export default Subscription;
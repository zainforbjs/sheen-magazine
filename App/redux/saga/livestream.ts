import { put, call, takeLatest, CallEffect, PutEffect, ForkEffect } from 'redux-saga/effects';
import { GET_APPLICATION_ID, GET_VIDEO_CATEGORIES } from "const/livestream";
import { CategoryVideo } from "types/MainApp/Tv";
import { ReduxActionLivestream } from "types/Redux/Livestream";
import { GetAppId } from "api/livestream";
import { GetVideoCategories } from "api/videos";
import { ActionUpdateApplicationId, ActionUpdateVideoCategories } from "redux/actions/livestream";
import { ScreenButtonNormal } from "types";

function* WatchGetApplicationId() : Generator<CallEffect<string | undefined> | PutEffect<ReduxActionLivestream>, void, string | undefined> 
{
	try
	{
        let applicationId : string | undefined = yield call<()=> Promise<string | undefined>>(GetAppId); 
        yield put(ActionUpdateApplicationId(applicationId)); 
	} 
	catch {}
}

function* WatchGetVideoCategories() : Generator<PutEffect<ReduxActionLivestream> | CallEffect<CategoryVideo[]>, void, CategoryVideo[]>
{
	try 
	{
		const categoryVideos: CategoryVideo[] = yield call<()=>Promise<CategoryVideo[]>>(GetVideoCategories); 
		const categories: ScreenButtonNormal[] = categoryVideos.map
		(
			({name, categoryId}: CategoryVideo): ScreenButtonNormal => 
			(
				{
					label: name, 
					comparisonValue: categoryId.toString()
				}
			)
		); 
		yield put(ActionUpdateVideoCategories(categories)); 
		yield callback(); 
		yield delay<true>(1000); 
		yield put(ActionHideLoading()); 
	}
	catch {}
}

function* Livestream() : Generator<ForkEffect<never>, void, unknown>
{
	yield takeLatest(GET_APPLICATION_ID, WatchGetApplicationId);
	yield takeLatest(GET_VIDEO_CATEGORIES, WatchGetVideoCategories); 
}
export default Livestream;
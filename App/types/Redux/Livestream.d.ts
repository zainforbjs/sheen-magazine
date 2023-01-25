import { ReduxAction } from "types";
import { UPDATE_APPLICATION_ID, GET_APPLICATION_ID, GET_VIDEO_CATEGORIES, UPDATE_VIDEO_CATEGORIES } from 'const/livestream';


export type ReduxActionLivestream = ReduxAction<UPDATE_APPLICATION_ID | GET_APPLICATION_ID | GET_VIDEO_CATEGORIES | UPDATE_VIDEO_CATEGORIES, ReduxStateLivestream>;

export type ReduxDispatchLivestream = 
{
    GetVideoCategories: ()=>void; 
}; 

export type ReduxStateLivestream = 
{
    applicationId?: string;
    categories?: ScreenButtonNormal[];
};
export type ReduxStateLivestreamCategories = 
{
    categories?: ScreenButtonNormal[];
};

import { GET_APPLICATION_ID, GET_VIDEO_CATEGORIES, UPDATE_APPLICATION_ID, UPDATE_VIDEO_CATEGORIES } from "const/livestream";
import { ScreenButtonNormal } from "types";
import { ReduxActionLivestream } from "types/Redux/Livestream";

export const ActionGetApplicationId = (): ReduxActionLivestream => ({ type: GET_APPLICATION_ID });
export const ActionUpdateApplicationId = (applicationId?: string): ReduxActionLivestream => ({ type: UPDATE_APPLICATION_ID, payload: {applicationId} }); 
export const ActionGetVideoCategories = (): ReduxActionLivestream => ({type: GET_VIDEO_CATEGORIES}); 
export const ActionUpdateVideoCategories = (categories: ScreenButtonNormal[]) : ReduxActionLivestream => ({type: UPDATE_VIDEO_CATEGORIES, payload: {categories}}); 
import { UPDATE_APPLICATION_ID, UPDATE_VIDEO_CATEGORIES } from "const/livestream";
import React from "react";
import { ReduxActionLivestream, ReduxStateLivestream } from "types/Redux/Livestream";


const innitialState: ReduxStateLivestream = 
{
    applicationId: undefined, 
    categories: []
}; 

const livestream: React.Reducer<ReduxStateLivestream, ReduxActionLivestream> = (state: ReduxStateLivestream = innitialState, action: ReduxActionLivestream): ReduxStateLivestream => 
{
    const { type, payload } = action;
    switch (type)
    {
        case UPDATE_APPLICATION_ID: 
            return {
                ...state, 
                applicationId: payload?.applicationId
            }; 
        case UPDATE_VIDEO_CATEGORIES: 
            return {
                ...state, 
                categories: payload?.categories
            }
        default: 
            return state; 
    }
}; 

export default livestream; 
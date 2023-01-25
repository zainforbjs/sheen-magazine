import { ServerResponse } from "types";


export type ItemLivestream = 
{
    preview: string; 
    resourceUri: string; 
    title: string;
    author: string;
    created: string; 
    customData: 
    {
        categories?: string;
        description?: string;
    }
}; 

export type ServerResponseLivestreamApplicationId = ServerResponse & 
{
    applicationId: string | undefined; 
}; 

export type ServerResponseLivestreamActiveBroadcast = 
{
    payload: ItemLivestream; 
    createdAt: string; 
}; 
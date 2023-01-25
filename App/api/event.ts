import { URL_WORDPRESS_EVENT } from 'const/url';
import { DetailEventType, DetailGalleryEventType, ListEventType, ListGalleryEventType } from "types/MainApp/Event";
import api from 'api';

export const GetUpcomingEvents = (pageno?: number): Promise<ListEventType> =>
{
    pageno = pageno??1; 
	return api.Get<ListEventType>(`${URL_WORDPRESS_EVENT}/event-list`, {params: {pageno}});
};

export const GetPastEvents = (pageno?: number): Promise<ListEventType> =>
{
    pageno = pageno??1; 
	return api.Get<ListEventType>(`${URL_WORDPRESS_EVENT}/past-event-list`, {params: {pageno}});
};


export const GetEventDetails = (eventid: number): Promise<DetailEventType> =>
{
	return api.Get<DetailEventType>(`${URL_WORDPRESS_EVENT}/event-detail`, {params: {eventid}});
};

export const GetEventGallery = (pageno?: number): Promise<ListGalleryEventType> =>
{
    pageno = pageno??1; 
	return api.Get<ListGalleryEventType>(`${URL_WORDPRESS_EVENT}/event-gallery`, {params: {pageno}});
};

export const GetEventGalleryDetails = (eventid: number): Promise<DetailGalleryEventType> =>
{
	return api.Get<DetailGalleryEventType>(`${URL_WORDPRESS_EVENT}/event-gallery-detail`, {params: {eventid}});
};

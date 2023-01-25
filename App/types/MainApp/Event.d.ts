type CommonPropertiesItem = 
{
    eventId: number;
    eventTitle: string; 
};

type CommonPropertiesList = 
{
    totalPages: number; 
    totalEvents: number; 
}; 

type Detail<T> = 
{
    eventDetail: T; 
    error: string;

}; 

type List<T> = CommonPropertiesList & 
{
    eventList: T[]
}; 

export type DetailEventType = Detail<DetailItemEvent>; 
export type DetailGalleryEventType = Detail<ItemGalleryEvent>; 
export type DetailItemEvent = ItemEvent & 
{
    eventAddress: string; 
    eventTicketLink: string;
    eventDescription: string;
    eventCoverImage: string;
};

export type ItemEvent = CommonPropertiesItem & 
{
    eventLocation: string; 
    eventStartDate: string; 
    eventEndDate: string; 
    eventStartTime: string; 
    eventEndTime: string; 
};

export type ItemGalleryEvent = CommonPropertiesItem & 
{
    year: number; 
}

export type ListEventType = List<ItemEvent>;
export type ListGalleryEventType = List<ItemGalleryEvent>; 
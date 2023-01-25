# API Descriptions 

## Table of contents
* [Event List (Upcoming event)](#event-list-upcoming-event) 
* [Event List (Past event)](#event-list-past-event) 
* [Event Details](#event-details)
* [Event Gallery List](#event-gallery-list)
* [Event Gallery Details (Individual Event)](#event-gallery-details-individual-event)

# Event List (Upcoming Event)
* URL: https://sheen-staging.dustingary.com/wp-json/event/v1/event-list
* Method: GET
* Parameters:  
	- perpage: default:10 (If you want get all event then pass "perpage = -1")
	- pageno: default: 1
* Example Response: 
```
{
	"eventList": 
	[
		{
			"eventId": 139504,
			"eventTitle": "Sistas Season 4",
			"eventLocation": "Atlanta, GA",
			"eventStartDate": "31-03-2022",
			"eventEndDate": "31-03-2022",
			"eventStartTime": "3:00 PM",
			"eventEndTime": "5:00 PM"
		}, {
			"eventId": 139503,
			"eventTitle": "Legendary Weekend Experience",
			"eventLocation": "Atlanta, GA",
			"eventStartDate": "25-11-2021",
			"eventEndDate": "25-11-2021",
			"eventStartTime": "10:00 AM",
			"eventEndTime": "12:00 PM"
		}, {
			"eventId": 139502,
			"eventTitle": "2021 Sheen Magazine Awards",
			"eventLocation": "Fountain Inn., SC",
			"eventStartDate": "15-12-2021",
			"eventEndDate": "15-12-2021",
			"eventStartTime": "9:30 AM",
			"eventEndTime": "11:00 AM"
		}
	],
	"totalPages": 1,
	"totalEvents": 3
}
```

# Event List (Past Event)
* URL: https://sheen-staging.dustingary.com/wp-json/event/v1/past-event-list
* Method: GET
* Parameters:  
	- perpage: default:10 (If you want get all event then pass "perpage = -1")
	- pageno: default:1
* Example Response: 
```
{
	"eventList": [{
		"eventId": 139503,
		"eventTitle": "Legendary Weekend Experience",
		"eventLocation": "Atlanta, GA",
		"eventStartDate": "01-03-2022",
		"eventEndDate": "02-03-2022",
		"eventStartTime": "10:00 AM",
		"eventEndTime": "12:00 PM"
	}, {
		"eventId": 139502,
		"eventTitle": "2021 Sheen Magazine Awards",
		"eventLocation": "Fountain Inn., SC",
		"eventStartDate": "10-02-2022",
		"eventEndDate": "10-02-2022",
		"eventStartTime": "9:30 AM",
		"eventEndTime": "11:00 AM"
	}],
	"totalPages": 1,
	"totalEvents": 2
}
```

# Event Details ( Individual Event )	
* URL: https://sheen-staging.dustingary.com/wp-json/event/v1/event-detail
* Method: GET
* Parameters:  
	- eventid (Required)
* Example Response: 
``` 
{
    "eventDetail": {
        "eventId": 139502,
        "eventTitle": "2021 Sheen Magazine Awards",
        "eventVenue": "165 Courtland",
        "eventAddress": "165 Courtsland St NE",
        "eventLocation": "Fountain Inn., SC",
        "eventStartDate": "10-02-2022",
        "eventEndDate": "10-02-2022",
        "eventStartTime": "9:30 AM",
        "eventEndTime": "11:00 AM",
        "eventTicketLink": "https:\/\/sheen-staging.dustingary.com\/",
        "eventDescription": "<strong>2021 Sheen Magazine Awards<\/strong>\r\n\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "eventCoverImage": "https:\/\/sheen-staging.dustingary.com\/wp-content\/uploads\/2022\/01\/shutterstock_1272443683.png"
    },
    "error": ""
}
```
	
# Event Gallery List
* URL: https://sheen-staging.dustingary.com/wp-json/event/v1/event-gallery
* Method : GET
* Parameters :  
	1) perpage: default: 10 (If you want get all event gallery then pass "perpage = -1")
	2) pageno: default: 1
* Example Response
```
{
    "eventList": 
	[
        {
            "eventId": 139504,
            "eventTitle": "Sistas Season 4",
            "eventYear": "2022"
        },
        {
            "eventId": 139503,
            "eventTitle": "Legendary Weekend Experience",
            "eventYear": "2022"
        },
        {
            "eventId": 139502,
            "eventTitle": "2021 Sheen Magazine Awards",
            "eventYear": "2022"
        }
    ],
    "totalPages": 1,
    "totalEvents": 3
}
```
		      
# Event Gallery Details (Individual Event)		 
* URL: https://sheen-staging.dustingary.com/wp-json/event/v1/event-gallery-detail
* Method : GET
* Parameters: 
	- eventid (Required)
* Example Response: 
```
{
    "eventDetail": {
        "eventId": 139504,
        "eventTitle": "Sistas Season 4",
        "eventYear": "2022",
        "eventDescription": "<strong>Sistas Season 4</strong>\r\n\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "eventGallery": [
            "https://sheen-staging.dustingary.com/wp-content/uploads/2022/01/kikiki.png",
            "https://sheen-staging.dustingary.com/wp-content/uploads/2022/01/ts-madison.png",
            "https://sheen-staging.dustingary.com/wp-content/uploads/2021/12/cover.png",
            "https://sheen-staging.dustingary.com/wp-content/uploads/2021/12/Picture1-copy-1.jpg",
            "https://sheen-staging.dustingary.com/wp-content/uploads/2021/12/IMG_2264.jpg"
        ]
    },
    "error": ""
}
```

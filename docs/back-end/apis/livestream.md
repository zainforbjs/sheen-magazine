# API Descriptions

[REPO](https://github.com/Exodus-Technologies/Nitrogen)

## Table of contents

- [Home](#home)
- [Probe Check](#probe-check)
- [Upload Video](#upload-video)
- [Get Videos](#get-videos)
- [Get Video By Id](#get-video-by-id)
- [Update Video](#update-video)
- [Delete Video By Id](#delete-video-by-id)
- [Update Views](#update-views)
- [Get AppId](#get-app-id)
- [Webhook](#webhook)
- [Get Active Broadcast](#get-active-broadcast)
- [Get Video Categories](#get-video-categories)
- [Create Video Category](#create-video-category)
- [Delete Video Category](#delete-video-category)
- [Get Video Subscription](#get-issue-subscription)
- [Create Video Subscription](#create-issue-subscription)
- [Update Video Subscription](#update-issue-subscription)
- [Get Video Subscription Status](#get-issue-subscription-status)

## Home

- The first endpoint that was created with this API. This is a GET API that returns a json with a statusCode of 200 and a message of Welcome to Carbon Auth Manager Service!

[Home Url](http://livestream.services-exodustechnologies.com/video-service/)

Example response:

```
{ message: 'Welcome to Chromium Video Manager Service!' }
```

## Probe Check

- The endpoint that serves as a healthcheck url. You would hit this url if you need to verify that the API is up and running. This is a GET API that returns a json with a statusCode of 200 and a message of Carbon Auth Manager service up and running!

[ProbeCheck Url](http://livestream.services-exodustechnologies.com/video-service/probeCheck)

Example response:

```
{
    message: 'Chromium Video Manager Service service up and running!'
}
```

## Upload Video

[Upload Video Url](http://livestream.services-exodustechnologies.com/video-service/uploadVideo)

## Upload directly to S3

- This endpoint serves a way to upload an archive and move it directly to S3. This is a post request and you will need to send these properties in a form data object:
  1. The file you want to upload itself (REQUIRED).
  2. Title of the file (REQUIRED).
  3. Author of the video (REQUIRED).
  4. status of video (REQUIRED)
  5. description: short description of video uploaded (REQUIRED)
  6. categories: categories that the video belongs to (REQUIRED)

Example formdata:

```
file: file (binary file)
title: title of video (string)
author: creator of video (string)
paid: true | false
description: string (no more than 255 characters)
categories: "clothing, fashion"
```

Example success response:

```
{
    "message": "Video uploaded to s3 with success",
    "video": {
        "title": "Business Plan 2022",
        "url": "https://sheen-magazine-videos.s3.amazonaws.com/BusinessPlan2022.mp4",
        "description": "Business plan for Exodus Technologies,LLC ",
        "totalViews": 0,
        "price": "$14.95",
        "author": "Dwain Robinson",
        "paid": true,
        "videoId": 2
    }
}
```

## Get Videos

- This endpoint was created so that videos that have been created and saved to our database can be pulled. This is a GET API that returns 2 responses depending on the situation.

[Get Videos Url](http://livestream.services-exodustechnologies.com/video-service/getVideos)

Example query params:

```
page=1&limit=50&author=Dwain R.&title=movie&sort=-title
```

## NOTE: All of the fields shown are optional EXCEPT page and limit.
### param sort: -title for sort desc title, title for sort asc title (similar for other fields)
1. Returns all videos that meet the criteria in the query string:

```
{
    "message": "Videos fetched from db with success",
    "videos": [
      {
        "title": "qslletdpvwbowsosrnnpxwxfozcdyk",
        "url": "https://sheen-magazine-videos.s3.amazonaws.com/qslletdpvwbowsosrnnpxwxfozcdyk.mp4",
        "description": "something to say about this",
        "totalViews": 0,
        "author": "BDT",
        "key": "qslletdpvwbowsosrnnpxwxfozcdyk",
        "avaiableForSale": true,
        "duration": "0:34",
        "categories": [
          "Fashion"
        ],
        "createdAt": "2022-05-09T14:21:58.925Z",
        "updatedAt": "2022-05-09T14:21:58.925Z",
        "videoId": 91,
        "total": 222,
        "pages": 3,
        "myVideo": false
      }
    ]
}
```

2. Returns below for invalid parameters:

```
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "page",
      "location": "query"
    },
    {
      "msg": "Must provide a page for videos",
      "param": "page",
      "location": "query"
    },
    {
      "msg": "Invalid value",
      "param": "limit",
      "location": "query"
    },
    {
      "msg": "Must provide a limit for videos",
      "param": "limit",
      "location": "query"
    }
  ]
}
```

## Get Video By Id

- This endpoint was created so that videos that have been created and saved to our database can be pulled by singular identifier. This is a GET API that returns 2 responses depending on the situation.

[Get Videos By Id Url](http://livestream.services-exodustechnologies.com/video-service/getVideo/:videoId)

Example url with params:

```
http://livestream.services-exodustechnologies.com/video-service/getVideo/1
```

1. Returns all videos that meet the criteria in the param string:

```
{
  "message": "Video fetched from db with success",
  "video": {
    "_id": "625a68a82d2b13f9624143dc",
    "title": "Lease stuff new again sf",
    "url": "https://sheen-magazine-videos.s3.amazonaws.com/Leasestuffnewagainsf.mp4",
    "description": "something to say ",
    "totalViews": 0,
    "author": "some body ",
    "key": "Leasestuffnewagainsf",
    "duration": "1:00",
    "categories": [
      "Clothing",
      "Space"
    ],
    "paid": false,
    "createdAt": "2022-04-16T06:56:40.955Z",
    "updatedAt": "2022-04-16T06:56:40.955Z",
    "videoId": 13,
    "__v": 0
  }
}
```

2. Returns below for a video that does not exist in our database:

```
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "No video found with id provided."
}
```

[Update Video Url](http://livestream.services-exodustechnologies.com/video-service/updateVideo)

## Update Video

- This endpoint serves a way to upload an archive and move it directly to S3. This is a put request and you will need to send these properties in a form data object:
  1. The file you want to upload itself (optional).
  2. Title of the file (REQUIRED).
  3. Author of the video (REQUIRED).
  4. VideoId (REQUIRED)
  5. status of video (REQUIRED)
  6. description: short description of video uploaded (REQUIRED)
  7. categories: categories that the video belongs to (REQUIRED)

Example formdata:

```
file: file (binary file)
title: title of video (string)
author: creator of video (string)
videoId: id of video that you want to update
paid: true | false
description: string (no more than 255 characters)
categories: "clothing, fashion"
```

Example responses:

```
{
  "message": "Video updated with success.",
  "video": {
    "title": "Blah ",
    "videoId": "5",
    "description": "something to describe",
    "author": "Dwain",
    "url": "https://sheen-magazine-videos.s3.amazonaws.com/Blah.mp4"
  }
}
```

```
{
    "error": "Bad Request",
    "message": "No video found to update."
}
```

## Delete Video By Id

- This endpoint serves a way to delete videos saved in mongodb and reference to AWS S3. This endpoint is a DELETE and it returns a 204 status code for a successful delete.

[Delete Video By Id](http://livestream.services-exodustechnologies.com/video-service/deleteVideo/videoId)

Example url with params:

```
http://livestream.services-exodustechnologies.com/video-service/deleteVideo/4
```

Example response:

```
204
```

[Update Views Url](http://livestream.services-exodustechnologies.com/video-service/updateViews)

## Update Views

- This endpoint serves a way to update the totalViews of a particular video. This is a PUT API that returns a json with the status code, views as a property, and message stating the total Number of views it has currently. It also return a bad response for a video not found.

Example payload:

```
{
    "videoId": 4
}
```

Example responses:

```
{
  "message": "Video with title 'Video from the space' has 1 views.",
  "views": 1
}
```

```
{
  "errors": [
    {
      "value": "Bad Request",
      "msg": "No videos found to update clicks."
    }
  ]
}
```

## Get App Id

- This endpoint was created so that mobile aplications can get the respective app id for their platform. If they have a ios or android device, there is an appId for each platform. This is a GET API that returns 2 responses depending on the situation.

[Get App Id](http://livestream.services-exodustechnologies.com/video-service/getApplicationId)

Example query params:

```
platform=ios
```

## NOTE: All of the fields shown are REQUIRED.

1. Returns an appId that meet the criteria in the query string:

```
{
    message: "Retrieved application id with success.",
    applicationId: "APP_ID"
}
```

2. Returns below for a video that does not exist in our database:

```
{
  "errors": [
    {
      "value": "Bad Request",
      "msg": "No application ids found with platform: 'test.'"
    }
  ]
}
```

## Webhook

- This endpoint serves a way to recieve status updates on events from the platform. This is a post request and it is invoked by the bambuser platfrom. This endpoint will save the event details to mongodb and then update the object until the broadcast has ended.

[Webhook Url](http://livestream.services-exodustechnologies.com/video-service/webHookCallback)

Example payload from webhook:

```
{
  "action": "add",
  "collection": "broadcast",
  "payload": {
    "author": "Sveninge Bambuser",
    "created": 1474033783,
    "customData": "",
    "height": 540,
    "id": "9353eaec-794f-11e6-97c0-f19001529702",
    "ingestChannel": "cfc8626c-9a0e-ab78-6424-3eb0978d8e45",
    "lat": 63.205312,
    "length": 0,
    "lon": 17.13011,
    "positionAccuracy": 25,
    "positionType": "GPS",
    "preview": "https://archive.bambuser.com/9353eaec-794f-11e6-97c0-f19001529702.jpg",
    "resourceUri": "https://cdn.bambuser.net/broadcasts/9353eaec-794f-11e6-97c0-f19001529702?da_signature_method=HMAC-SHA256&da_id=9353eaec-794f-11e6-97c0-f19001529702&da_timestamp=1474033783&da_static=1&da_ttl=0&da_signature=eaf4c9cb29c58b910dcbad17cf7d8a3afa4e6a963624ba4c4fd0bb5bade1cdd6",
    "tags": [
      {
        "text": "whoa"
      }
    ],
    "title": "Amazing!",
    "type": "live",
    "width": 960
  },
  "eventId": "93df93061a891c23"
}
```

Example response:

```
200
```

## Get Active Broadcast

[Get Active Broadcast](http://livestream.services-exodustechnologies.com/video-service/getActiveBroadcast)

- This endpoint serves a way to pull from database to see if there is an active broadcast running on the bambuser platform. This is a get request and you will get two responses:

1. Returns below for a broadcast that is active:

```
{
  "payload": {
    "author": "Admin",
    "created": 1653870167,
    "customData": "{}",
    "height": 360,
    "id": "524f281b-85b6-4e0c-9c30-78e8fb8f48fa",
    "ingestChannel": "8696e0e7-9a11-d3b0-f603-a68d429733c2",
    "length": 1,
    "preview": "https://preview.bambuser.io/live/eyJyZXNvdXJjZVVyaSI6Imh0dHBzOlwvXC9jZG4uYmFtYnVzZXIubmV0XC9icm9hZGNhc3RzXC81MjRmMjgxYi04NWI2LTRlMGMtOWMzMC03OGU4ZmI4ZjQ4ZmEifQ==/preview.jpg",
    "resourceUri": "https://cdn.bambuser.net/broadcasts/524f281b-85b6-4e0c-9c30-78e8fb8f48fa?da_signature_method=HMAC-SHA256&da_id=9e1b1e83-657d-7c83-b8e7-0b782ac9543a&da_timestamp=1653870168&da_static=1&da_ttl=0&da_signature=6b714199386db3e3557adc90030e284fa9377d1deb1e68fafe372c1e13fbed83",
    "tags": [],
    "title": "",
    "type": "live",
    "width": 640
  },
  "_id": "62940e59b94cfe921ed66ea5",
  "action": "add",
  "collectionType": "broadcast",
  "eventId": "34aad63277e501365420f52bc1ca65fa",
  "isActive": true,
  "createdAt": "2022-05-30T00:22:49.080Z",
  "updatedAt": "2022-05-30T00:22:49.080Z",
  "broadcastId": 2,
  "__v": 0
}
```

2. Returns below for a broadcast that is not active:

```
{
  "errors": [
    {
      "value": "Bad Request",
      "msg": "No active broadcast avaiable."
    }
  ]
}
```

## Get Video Categories

- This endpoint was created so that categories for videos that have been created and saved to our database can be pulled. This is a GET API that returns 2 responses depending on the situation.

[Get Videos Categories Url](http://livestream.services-exodustechnologies.com/video-service/getCategories)

Example query params:

```
page=1&limit=50&name=Fashion
```

## NOTE: All of the fields shown are optional EXCEPT page and limit.

1. Returns all video categories that meet the criteria in the query string:

```
{
    "message": "Categories fetched from db with success",
    "categories": [
        {
            "name": "Fashion",
            "description": "Category for describing videos that associate with fashion.",
            "createdAt": "2022-04-13T19:20:49.543Z",
            "updatedAt": "2022-04-13T19:20:49.543Z",
            "categoryId": 2
        }
    ]
}

```

2. Returns below for not passing the required query params:

```
{
    "errors": [
        {
            "msg": "Invalid value",
            "param": "page",
            "location": "query"
        },
        {
            "msg": "Must provide a page for categories.",
            "param": "page",
            "location": "query"
        },
        {
            "msg": "Invalid value",
            "param": "limit",
            "location": "query"
        },
        {
            "msg": "Must provide a limit for categories.",
            "param": "limit",
            "location": "query"
        }
    ]
}
```

## Create Video Category

[Create Video Category Url](http://livestream.services-exodustechnologies.com/video-service/createCategory)

- This endpoint serves a way to create a category and save it to the database. This is a POST request and you will get two responses:

Example payload:

## NOTE: All of the fields shown are required.

```
{
    "name": "Fashion",
    "description": "Category for describing videos that associate with fashion."
}
```

1.  Returns below for a successful create:

```
{
    "message": "Category created with success.",
    "category": {
        "description": "Category for describing videos that associate with space.",
        "name": "Space",
        "categoryId": 3
    }
}
```

2. Returns below for missing required fields in body:

```
{
    "errors": [
        {
            "msg": "Must provide a category name.",
            "param": "name",
            "location": "body"
        },
        {
            "msg": "Invalid value",
            "param": "description",
            "location": "body"
        }
    ]
}
```

## Delete Video Category

- This endpoint serves a way to delete categories for videos saved in mongodb. This endpoint is a DELETE and it returns a 204 status code for a successful delete.

[Delete Video By Id](http://livestream.services-exodustechnologies.com/video-service/deleteCategory/:categoryId)

Example url with params:

```
http://livestream-services-exodustechnologies.com/video-service/deleteCategory/4
```

Example response:

```
204
```

## Get Video Subscription
* This GET endpoint serves a way to get all the videos subscription in the app. Subscription is returned sorted by the end date. 
* URL: http://livestream.services-exodustechnologies.com/video-service/getSubscriptions
* Parameters: 
  - page: number - the page number for pagnition
  - limit: number - the number of record page page 
Example success response: 
```
{
  "message": "Successful fetch for subscription with query params.",
  "subscriptions": [
    {
      "startDate": "2022-04-30T11:28:52",
      "endDate": "2022-12-30T16:28:52",
      "type": "video",
      "purchaseDate": "2022-04-30T11:28:52",
      "amount": 15,
      "userId": 133,
      "subscriptionId": "63ed1def-d560-49ef-90fa-1037966db34d"
    }
  ]
}
```

Example fail response: 
```
{
  "errors": [
    {
      "msg": "Invalid value",
      "param": "page",
      "location": "query"
    },
    {
      "msg": "Must provide a page for issues.",
      "param": "page",
      "location": "query"
    },
    {
      "msg": "Invalid value",
      "param": "limit",
      "location": "query"
    },
    {
      "msg": "Must provide a limit for issues.",
      "param": "limit",
      "location": "query"
    }
  ]
}
```


## Create Video Subscription
* This POST endpoint serves a way to create a video subscription. 
* URL: http://livestream.services-exodustechnologies.com/video-service/createSubscription
* Request data: 
  - amount: number - price amount paid. Default to 15
  - userId: number - the user Id for the subscription 

Example fail response: 
```
{
  "errors": [
    {
      "value": "Bad Request",
      "msg": "Subscription is still active for the current year"
    }
  ]
}
```

Example success response:
```
{
  "message": "Successful creation of subscription.",
  "subscription": {
    "startDate": "2022-04-27T00:31:35",
    "endDate": "2022-12-30T05:31:35",
    "type": "video",
    "purchaseDate": "2022-04-27T00:31:35",
    "amount": 12.99,
    "userId": 133,
    "subscriptionId": "4b8d4c90-f5b3-49d4-ae8a-e691f0678435"
  }
}
```


## Update Video Subscription
* This PUT endpoint serves a way to create an video subscription. 
* URL: http://livestream.services-exodustechnologies.com/video-service/updateSubscription
* Request data: 
  - userId: number - the user Id for the subscription 
  - startDate: date - optional - the start date of the subscription. Default to be the current date 

Example fail response: 
```
{
  "errors": [
    {
      "value": "Bad Request",
      "msg": "No subcriptions to update"
    }
  ]
}
```

Example success response:
```
{
  "message": "Successful update of subscription.",
  "subscription": {
    "_id": "6268cba97a46f0f3e47c52f2",
    "startDate": "2022-12-31T23:50:49",
    "endDate": "2023-12-30T05:50:49",
    "type": "video",
    "purchaseDate": "2022-04-26T23:50:49",
    "amount": 12,
    "userId": 130,
    "subscriptionId": "46baf9e3-2e8d-4ade-a4a8-481df503ab73",
    "__v": 0
  }
}
```

## Get Video Subscription Status

* This GET endpoint serves a way to get the video subscription status for a user based on their ID
* URL: http://livestream.services-exodustechnologies.com/video-service/getSubscriptionStatus
* Request data: 
  - userId: number - the user Id for the subscription 

Example fail response: 
```
{
  "errors": [
    {
      "msg": "Must provide a valid userId.",
      "param": "userId",
      "location": "query"
    }
  ]
}
```

Example success response:
```
{
  "subscriptionStatus": "Subscription ends in 221 days.",
  "endDate": "2022-12-30"
}
```



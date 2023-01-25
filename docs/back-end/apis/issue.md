# API Descriptions 

[REPO](https://github.com/Exodus-Technologies/Chromium)

## Table of contents
* [Home](#home)
* [Probe Check](#probe-check) 
* [Get Issues](#get-issues)
* [Get Issue By Id](#get-issue-by-id)
* [Create Issue](#create-issue)
* [Update Issue](#update-issue)
* [Update Views](#update-views)
* [Delete Issue By Id](#delete-issue-by-id)
* [Get Issue Subscription](#get-issue-subscription)
* [Create Issue Subscription](#create-issue-subscription)
* [Update Issue Subscription](#update-issue-subscription)
* [Get Issue Subscription Status](#get-issue-subscription-status)


## Home 
* The first endpoint that was created with this API. This is a GET API that returns a json with a statusCode of 200 and a message of Welcome to Carbon Auth Manager Service!

[Home Url](http://issues.services-exodustechnologies.com/issue-service/)

Example response:
```
{ message: 'Welcome to Chromium Issue Manager Service!' }
```

## Probe Check
* The endpoint that serves as a healthcheck url. You would hit this url if you need to verify that the API is up and running. This is a GET API that returns a json with a statusCode of 200 and a message of Carbon Auth Manager service up and running!

[ProbeCheck Url](http://issues.services-exodustechnologies.com/issue-service/probeCheck)

Example response:

```
{
    message: 'Chromium Issue Manager Service service up and running!'
}
```

## Get Issues
* This endpoint was created so that issues that have been created and saved to our database can be pulled. When passing the userId parameter, it will have the paid flag to detemine if the user has access to the issue or not. This is a GET API that returns 2 responses depending on the situation.

[Get Issues Url](http://issues.services-exodustechnologies.com/issue-service/getIssues)

Example query params:

```
page=1&limit=17&title=hieu test&author=qweqw&sort=-title
```
## NOTE: All of the fields shown are optional EXCEPT page and limit.
### param sort: -title for sort desc title, title for sort asc title (similar for other fields)
1. Returns all issues that meet the criteria in the query string:
```
{
    "message": "Successful fetch for issue with query params.",
    "issues": [
        {
            "title": "Business Plan 2020",
            "url": "https://sheen-magazine-issues.s3.amazonaws.com/BusinessPlan2020.pdf",
            "description": "Business plan for Exodus Technologies,LLC ",
            "totalViews": 0,
            "author": "Dwain Robinson",
            "key": "BusinessPlan2020",
            "createdAt": "2022-04-06T20:45:46.076Z",
            "updatedAt": "2022-04-11T01:13:09.974Z",
            "issueId": 1, 
            "paid": false,
            "total": 50, // total records
            "pages": 3 // total page
        }
    ]
}
```
2. Returns bad request for missing parametters:
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

## Get Issue By Id
* This endpoint was created so that issues that have been created and saved to our database can be pulled by singular identifier. This is a GET API that returns 2 responses depending on the situation.

[Get Issue By Id Url](http://issues.services-exodustechnologies.com/issue-service/getIssue/:issueId)

Example url with params:

```
http://issues.services-exodustechnologies.com/issue-service/getIssue/4
```

1. Returns all issues that meet the criteria in the param string:
```
{
    "message": "Successful fetch for issue 4.",
    "issue": {
        "_id": "624dfbfac06aab1bd272aca2",
        "title": "Business Plan 2020",
        "url": "https://sheen-magazine-issues.s3.amazonaws.com/BusinessPlan2020.pdf",
        "description": "Business plan for Exodus Technologies,LLC ",
        "totalViews": 0,
        "author": "Dwain Robinson",
        "key": "BusinessPlan2020",
        "createdAt": "2022-04-06T20:45:46.076Z",
        "updatedAt": "2022-04-11T01:13:09.974Z",
        "issueId": 1,
        "__v": 0
    }
}
```

2. Returns below for a issue that does not exist in our database:
```
{
  "errors": [
    {
      "value": "Bad Request",
      "msg": "No issue found with id provided."
    }
  ]
}
```

## Create Issue

## Upload directly to S3 
* This endpoint serves a way to upload an archive and move it directly to S3. This is a post request and you will need to send these properties in a form data object: 
    1. The file you want to upload itself (REQUIRED).
    2. Title of the file (REQUIRED).
    3. Author of the issue (REQUIRED).
    4. description: short description of issue uploaded (REQUIRED).
    5. magazineId: magazine id to associate with issue (REQUIRED).

[Create Issue Url](http://issues.services-exodustechnologies.com/issue-service/createIssue)

Example formdata:

```
file: file (binary file)
title: title of issue (string)
author: creator of issue (string)
description: string (no more than 255 characters)
```

Example success response:
```
{
    "message": "Issue uploaded to s3 with success",
    "issue": {
        "title": "movie_title4",
        "url": "https://sheen-magazine-issues.s3.amazonaws.com/movie_title4",
        "totalViews": 0,
        "author": "Dwain R.",
        "magazineId": "1234567890",
        "_id": "623185d5b1fa9d42cbc09571",
        "createdAt": "2022-03-16T06:38:13.047Z",
        "updatedAt": "2022-03-16T06:38:13.047Z",
        "issueId": 3,
        "__v": 0
    }
}
```

Example error response: 
```
{
  "errors": [
    {
      "value": "Bad Request",
      "msg": "Price must be in a dollar format."
    }
  ]
}
```

## Update Issue

[Update Issue Url](http://issues.services-exodustechnologies.com/issue-service/updateIssue)

* This endpoint serves a way to upload an archive and move it directly to S3. This is a put request and you will need to send these properties in a form data object: 
    1. The file you want to upload itself (optional).
    2. Title of the file (REQUIRED).
    3. Author of the issue (REQUIRED).
    4. issueId (REQUIRED).
    5. description: short description of issue uploaded (REQUIRED) .


Example formdata:

```
file: file (binary file)
title: title of issue (string)
author: creator of issue (string)
issueId: id of issue that you want to update
description: string (no more than 255 characters)
```

Example responses:
```
{
    "message": "Issue updated in s3 with success",
    "issue": {
        "title": "test-not-hieu23234",
        "issueId": "3",
        "description": "lok like something changes ",
        "author": "Chris",
        "url": "https://sheen-magazine-issues.s3.amazonaws.com/test-not-hieu23234.pdf"
    }
}
```

```
{
    "errors": [
        {
            "value": "Bad Request",
            "msg": "No issue was found for issueId passed."
        }
    ]
}
```

## Update Views
* This endpoint serves a way to update the totalViews of a particular issue. This is a PUT API that returns a json with the status code, views as a property, and message stating the total Number of views it has currently. It also return a bad response for a issue not found.

[Update Views Url](http://issues.services-exodustechnologies.com/issue-service/updateViews)

Example payload:
```
{
    "issueId": 4 
}
```

Example success responses:
```
{
    message: `issueId: 4 has 8 views.`,
    views: 8 
}
```

Example fail response: 
```
{
  "errors": [
    {
      "msg": "Must provide a existing issue id.",
      "param": "issueId",
      "location": "body"
    }
  ]
}
```

## Delete Issue By Id
* This endpoint serves a way to delete videos saved in mongodb and reference to AWS S3. This endpoint is a DELETE and it returns a 204 status code for a successful delete.

[Delete Issue By Id](http://issues.services-exodustechnologies.com/issue-service/deleteIssue/:issueId)

Example url with params:
```
http://issues.services-exodustechnologies.com/issue-service/deleteIssue/4
```

Example response:
```
204
```

## Get Issue Subscription
* This GET endpoint serves a way to get all the issues subscription in the app. Subscription is returned sorted by the end date. 
* URL: http://issues.services-exodustechnologies.com/issue-service/getSubscriptions
* Parameters: 
  - page: number - the page number for pagnition
  - limit: number - the number of record page page 
Example success response: 
```
{
  "message": "Successful fetch for subscription with query params.",
  "subscriptions": [
    {
      "startDate": "2022-04-20T23:28:21",
      "endDate": "2022-12-30T04:28:21",
      "type": "issue",
      "purchaseDate": "2022-04-20T23:28:21",
      "amount": 12.25,
      "userId": 130,
      "subscriptionId": "e851d240-97be-4571-ba8d-6e8274e78012"
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


## Create Issue Subscription
* This POST endpoint serves a way to create an issue subscription. 
* URL: http://issues.services-exodustechnologies.com/issue-service/createSubscription
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
    "type": "issue",
    "purchaseDate": "2022-04-27T00:31:35",
    "amount": 12.99,
    "userId": 133,
    "subscriptionId": "4b8d4c90-f5b3-49d4-ae8a-e691f0678435"
  }
}
```


## Update Issue Subscription
* This PUT endpoint serves a way to create an issue subscription. 
* URL: http://issues.services-exodustechnologies.com/issue-service/updateSubscription
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
    "type": "issue",
    "purchaseDate": "2022-04-26T23:50:49",
    "amount": 12,
    "userId": 130,
    "subscriptionId": "46baf9e3-2e8d-4ade-a4a8-481df503ab73",
    "__v": 0
  }
}
```

## Get Issue Subscription Status

* This GET endpoint serves a way to get the issue subscription status for a user based on their ID
* URL: http://issues.services-exodustechnologies.com/issue-service/getSubscriptionStatus
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



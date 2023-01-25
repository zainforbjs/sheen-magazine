# API descriptions

## Table of content

- [urls](#urls)
- [apis](#apis)

## Urls

- API urls used in projects are included in App/const/url.ts

## APIs

- Axios instance: custom instance of axios including retrieving methods such as get, post, put, delete. Each method will be used to implement api services for any kinds of features in application.
- List of features apis
  - Account
    - login 
    - sign up 
    - get credentials if login before and close the app from storage 
    - put credentials to storage for later use 
  - MainApp 
    - Blogs
      - get posts
      - get post detail
      - get categories
      - get comments
    - Events
      - get events
      - get event details
      - get event gallery 
      - get event gallery details 
    - Issues
      - get issues 
      - get current issue subscription 
      - get issue subscription 
      - update issue subscription 
    - Tv
      - Livestream
        - get application Id from Bambuster 
        - get current active broadcast 
      - Videos
        - get video categories 
        - get video thumbnail - create new if the videoId not existed in the storage and get the image from storage if already exist. 
        - get videos 
        - get video by id 
        - get current video subscription
        - create video subscription 
        - update video subscription 

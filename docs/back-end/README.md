## Folder in this documentation:

- api
  - auth: Authentication and user action
    - Login
    - Signup
    - Change Password
    - Get Users
    - Create User
    - Update User
    - Delete User
  - issue: PDF magazine for the Issue tab
    - Get Issues
    - Get Issue By Id
    - Create Issue
    - Update Issue
    - Update Views
    - Delete Issue By Id
    - Get Issue Subscription
    - Create Issue Subscription
    - Update Issue Subscription
    - Get Subscription Status
  - livestream: Sheen Tv tab videos
    - Upload Video
    - Get Videos
    - Get Video By Id
    - Update Video
    - Delete Video By Id
    - Update Views
    - Get AppId
    - Webhook
    - Get Active Broadcast
    - Get Video categories
    - Create Video categories
    - Delete Video categories
    - Get Video Subscription
    - Create Video Subscription
    - Update Video Subscription
    - Get Subscription Status
  - shoplify: all the features related to shop tab
    - Get Products
    - Get Shop Info
    - Get Checkout
    - Create Checkout
    - Add Line Item
    - Remove Line Item
    - Decrement Line Item
    - Increment Line Item
    - Process Checkout
- word-press
  - blogs: the Blog tab contain all the posts and information on them
    - Categories List
    - List Posts
    - Retrieve A Post
    - List Post Comments
    - Comment in an post
  - events: display all events and gallery
    - Event List
    - Event Details
    - Event Gallery List
    - Event Gallery Details (Individual Event)

## Issues with existing APIs

## Currently missing:

- payment: how do we make payment for subscriptions (apple and google pay) https://blog.logrocket.com/implementing-in-app-purchases-in-react-native/

## Nice to fix issues and unimportant addition features:

- Auth:
  - Get user by Id endpoint
  - List of countries in the world 
  - List of states in USA or states in country in a world 
  - List of cities inside a state to choose. 
- Issue:
  - corrupted file pdf still works - change the extension for mp4 to pdf and it works
  - periodically check for the pdf files in the S3. We need to make sure we don't have corrupted files
  - Check to see if user exist when creating subscription for that user
  - Create issue: Upload concerency - at the moment, we can only upload 1 file at 1 time. If you do have 2 people uploading at the same time, it will crash but Gateway timeout
- Video:
  - corrupted file mp4 still works - need to do something later.
  - periodically check for corruption file in S3, we don't want the corrupted file from testing.
  - need to get all the videos stored in Bambuster after the livestream - potentially store in our S3 or we just need to have an endpoint to grab them all and display them. (Need to have a quick check with backend solutions)
  - Upload Videos: 
    - Upload big files (200 MB+)
    - Upload concerency - at the moment, we can only upload 1 file at 1 time. If you do have 2 people uploading at the same time, it will crash but Gateway timeout. 
- Issues subscription:
  - Create subscription:
    - amount paid can be stored and we don't need to pass it in. So, we can have 1 place to control the subscription price
  - fix the overlap subscription period
  - potentially one more endpoint to get the price for subscription and period
  - refund subscription:
    - if the start date is not there yet
    - if the user pay but we fails to add it in
    - in case the user decided to talk to the admin for cancel
    - user fails to pay
  - Get subscription:
    - parameter for sort by
- Video subscription:
  - overlap subscription period
  - potentially one more endpoint to get the price for subscription and period
  - refund subscription:
    - if the start date is not there yet
    - if the user pay but we fails to add it in
    - in case the user decided to talk to the admin for cancel
    - user fails to pay

## For development and testing

- All user created will use password to be <b>BlackFreedom2020!\*</b> for consistency.

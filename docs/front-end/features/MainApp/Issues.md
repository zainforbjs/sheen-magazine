# Componennt Descriptions 


## Table of content
* [Home](#home)
* [SubscriptionIssues](#subscriptionissues)
* [SubscriptionPurchaseIssues](#subscriptionpurchaseissues)
* [ViewIssue](#viewissue)

## Home 
* The first page when tab is navigated to. Display a main issue and a list of issues to donwload. 
* Extend Subscription button is available for user and not admin. This is to go to the SubscriptionPurchaseIssues screen. 
* ItemIssue: 
    - display each magazines with the subscribe or view button depending on the user subscription so the user
    - User can click the issue to view the issue if they have the subscription access. 
    - Admin have access to View all issues without going through subscription. 
    - use ItemIssueThumbnail to show the thumbnail 
* ItemIssueThumbnail: 
    - display the thumbnail of the issue 
    - use the first page of the PDF 
    - display a default image if the issue does not have PDF link 

## SubscriptionIssues 
* Page to buy the subscription 
* Being navigate through by the SubscriptionPurchaseIssues page when the user decided to buy the issue. 

## SubscriptionPurchaseIssues
* Page for user to see the subscription and prize before buying 
* Being navigate through by the SubscriptionPurchaseIssues page when the user decided to extend their subscription. 

## ViewIssue
* View the issue user has access to
* Only access if the user login and bought subscription 
* A PDF view of the issues with cached 
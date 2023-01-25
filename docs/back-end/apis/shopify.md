# API Descriptions 
xs
[REPO](https://github.com/Exodus-Technologies/Neon)

## Table of contents
* [Home](#home)
* [Probe Check](#probe-check) 
* [Get Products](#get-products)
* [Get Shop Info](#get-shop-info)
* [Get Checkout](#get-checkout) 
* [Create Checkout](#create-checkout) 
* [Add Line Item](#add-line-item)
* [Remove Line Item](#remove-line-item) 
* [Decrement Line Item](#decrement-line-item) 
* [Increment Line Item](#increment-line-item) 
* [Process Checkout](#process-checkout) 

## Home 
* The first endpoint that was created with this API. This is a GET API that returns a json with a statusCode of 200 and a message of Welcome to Neon Shopping Manager Service!

[Home Url](http://shopping.services-exodustechnologies.com/shopify-service/)

Example response:
```
{
    message: 'Welcome to Neon Shopping Manager Service!'
}
```
## Probe Check
* The endpoint that serves as a healthcheck url. You would hit this url if you need to verify that the API is up and running. This is a GET API that returns a json with a statusCode of 200 and a message of Neon Shopping Manager service up and running!

[ProbeCheck Url](http://shopping.services-exodustechnologies.com/shopify-service/probeCheck)

Example response:

```
{
    message: 'Neon Shopping Manager service up and running!'
}
```
## Get Products
* This endpoint was created so that products that have been created can get pulled. This is a GET API that returns products created on the Shopify platfrom.

[Get Issues Url]http://shopping.services-exodustechnologies.com/shopify-service/getProducts)

```
See examples/products.json for example response.
```

## Get Shop Info
* This endpoint was created so that the shop details that have been created can get pulled. This is a GET API that returns shop info created on the Shopify platfrom.

[Get Shop Info Url]http://shopping.services-exodustechnologies.com/shopify-service/getShopInfo)

```
See examples/shopInfo.json for example response.
```
## Get Checkout
* This endpoint was created so that you can retrieve existing checkout (cart) details based on checkoutId.

[Get Issues Url](http://shopping.services-exodustechnologies.com/shopify-service/getCheckout)


```
http://shopping.services-exodustechnologies.com/shopify-service/getCheckout/Z2lkOi8vc2hvcGlmeS9DaGVja291dC8wOWYxYmY1Y2IwY2YwMGFlOWVlM2MyY2QzZjA4M2U3Mj9rZXk9MzMxMTgwMmNjMmViOTNiY2Y0ZGRkMzRlY2ZjZjYwN2Q=
```

```
See examples/cart.json for example response.
```
## Create Checkout
* This endpoint was created so that you can create an checkout object to add items to a cart. This is a POST request and does not require a payload.

[Create Checkout Url](http://shopping.services-exodustechnologies.com/shopify-service/createCheckout)

```
See examples/checkout.json for example response.
```
## Add Line Item
* This endpoint was created so that you can add products to a cart. This is a POST request..

[Add Line Item Url](http://shopping.services-exodustechnologies.com/shopify-service/addLineItem)

Example payload:
```
{
    "productId": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzcxODU1NjM1ODI2NTQ=",
    "checkoutId": "Z2lkOi8vc2hvcGlmeS9DaGVja291dC8zMjY0Mjk0OTUyZjk1MjBiMTk4M2QxZmIzMzNmOWViMD9rZXk9MWY1YWYyNWEwNzU2YTBhYzk5OTU0ZGZmZDY1MmM5NWU="
}
```

```
See examples/addLineItem.json for example response.
```
## Remove Line Item
* This endpoint was created so that you can remove products to a cart. This is a POST request..

[Remove Line Item Url](http://shopping.services-exodustechnologies.com/shopify-service/removeLineItem)

Example payload:
```
{
    "productId": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzcxODU1NjM1ODI2NTQ=",
    "checkoutId": "Z2lkOi8vc2hvcGlmeS9DaGVja291dC8zMjY0Mjk0OTUyZjk1MjBiMTk4M2QxZmIzMzNmOWViMD9rZXk9MWY1YWYyNWEwNzU2YTBhYzk5OTU0ZGZmZDY1MmM5NWU="
}
```

```
See examples/removeLineItem.json for example response.
```
## Decrement Line Item
* This endpoint was created so that you can remove products to a cart or reduce the number of items you have for that item. This is a PUT request.

[Decrement Line Item Url](http://shopping.services-exodustechnologies.com/shopify-service/decrementLineItem)

Example payload:
```
{
    "quantity": 1,
    "productId": "Z2lkOi8vc2hvcGlmeS9DaGVja291dExpbmVJdGVtLzQxMjgzNTE0ODU5NzEwMD9jaGVja291dD0zMjY0Mjk0OTUyZjk1MjBiMTk4M2QxZmIzMzNmOWViMA==",
    "checkoutId": "Z2lkOi8vc2hvcGlmeS9DaGVja291dC8zMjY0Mjk0OTUyZjk1MjBiMTk4M2QxZmIzMzNmOWViMD9rZXk9MWY1YWYyNWEwNzU2YTBhYzk5OTU0ZGZmZDY1MmM5NWU="
}
```

```
See examples/decrementLineItem.json for example response.
```
## Increment Line Item
* This endpoint was created so that you can increase the number of items you have for that item. This is a PUT request.

[Increment Line Item Url](http://shopping.services-exodustechnologies.com/shopify-service/incrementLineItem)

Example payload:
```
{
    "quantity": 1,
    "productId": "Z2lkOi8vc2hvcGlmeS9DaGVja291dExpbmVJdGVtLzQxMjgzNTE0ODU5NzEwMD9jaGVja291dD0zMjY0Mjk0OTUyZjk1MjBiMTk4M2QxZmIzMzNmOWViMA==",
    "checkoutId": "Z2lkOi8vc2hvcGlmeS9DaGVja291dC8zMjY0Mjk0OTUyZjk1MjBiMTk4M2QxZmIzMzNmOWViMD9rZXk9MWY1YWYyNWEwNzU2YTBhYzk5OTU0ZGZmZDY1MmM5NWU="
}
```

```
See examples/incrementLineItem.json for example response.
```
## Process Checkout
* This endpoint was created so that you can process checkout of a cart. This is a POST request and only requires an existing checkoutId.

[Process Checkout Url](http://shopping.services-exodustechnologies.com/shopify-service/processCheckout)

Example payload:
```
{
    "checkoutId": "Z2lkOi8vc2hvcGlmeS9DaGVja291dC8xYzQ2Y2M5ZTBmZDIwMTZkNzA1OWZjMTRmZDhkNDhhYz9rZXk9OGUxM2U2MGE0NzY4YmMxZjIxOWFlNTY0MjFjYmE4NmE="
}
```

1. Returns below for a checkout that was successfully process. Shopify does not allow direct API for checkout, so the user must navigate to the url to continue processing.
```
{
    "message": "Proceed to url to process checkout of checkout line items.",
    "cartUrl": "https://sheenmagazine.myshopify.com/61383213246/checkouts/1c46cc9e0fd2016d7059fc14fd8d48ac?key=8e13e60a4768bc1f219ae56421cba86a"
}
```

2. Returns below for a user that is trying to use an checkoutId that does not exist:
```
{
    "error": "Bad Request",
    "message": "Unable to find cart to checkout."
}
```

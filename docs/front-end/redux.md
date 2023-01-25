# Redux descriptions

## Table of content

- [Redux](#redux)
- [Redux Saga](#redux-saga)
- [Apply Redux and Redux Saga](#apply-redux-and-redux-saga)

## Redux

Redux is a library that used for managing application state <br />
Read more at https://redux.js.org/

- Configuration

  - store: a place that combines reducers and middleware (redux thunk, redux saga)
  - redux provider: this wraps all contents of app and include store props to be able to apply redux in application.

- Structure

  - reducer: this is responsible for handling all of the actions that are dispatched, and return new state from events.
  - action: a function containing certain type and any data to be dispated or received.
  - constant: a particular name to determine which action will be retrieved.
  - rootReducer: this consists of all reducers which will be used to fetch or dispatch data in application feaures. Created by combining other reducers. 
  - rootSaga: this consists of generator functions to handle side effects in each feature.

## Redux Saga

redux-saga is a library that aims to handle application side effects <br />
Read more at https://redux-saga.js.org/

- Structure

  - rootSaga: this includes all saga functions of each feature in application.
  - feature saga: function that handle dispatched actions of relevant features.


## Apply Redux and Redux Saga

Steps to create and apply redux in a feature screen

  - Define constants that represent an actions names.
  - Define action functions to handle events in the feature. Each action would contains type(constant) and/or payload to be sent out or received.
  - Setup reducer which stores all datum of a feature. By provoking exact type name, reducer will return relevant result.
  - Setup saga based on feature name. This saga file includes functions to involve in handling dispatched actions and return datum to reducer.
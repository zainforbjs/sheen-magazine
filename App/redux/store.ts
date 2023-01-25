import { Reducer } from 'react';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import reduxThunk from 'redux-thunk';
import { ReduxStateAction, ReduxState } from 'types/Redux';
import loading from 'redux/reducers/loading';
import downloading from 'redux/reducers/downloading';
import account from 'redux/reducers/account';
import livestream from 'redux/reducers/livestream';
import cart from 'redux/reducers/cart';

import saga from 'redux/saga';

const middleware: SagaMiddleware = createSagaMiddleware();

const reducers: Reducer<ReduxState, ReduxStateAction> = combineReducers<
  ReduxState,
  ReduxStateAction
>({
  loading,
  account,
  livestream,
  cart,
  downloading,
});

const store: Store<ReduxState, ReduxStateAction> = createStore<
  ReduxState,
  ReduxStateAction,
  undefined,
  undefined
>(
  reducers,
  applyMiddleware<ReturnType<typeof reduxThunk>, SagaMiddleware>(
    reduxThunk,
    middleware
  )
);
middleware.run(saga);

export default store;

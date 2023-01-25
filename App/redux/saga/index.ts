import {fork, all, AllEffect, ForkEffect} from 'redux-saga/effects';
import Auth from 'redux/saga/account';
import Livestream from "redux/saga/livestream";

function* Saga() : Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all<ForkEffect<void>>([fork(Auth), fork(Livestream)]);
}

export default Saga;

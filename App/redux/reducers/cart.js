import React from 'react';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QTY,
  DECRIEMENT_QTY,
  CLEAR_CART
} from 'const/account';

const initialState = {
  cart: []
};

const cart = (state = initialState, action) => {
  const { type, user } = action;
  switch (type) {
    case ADD_TO_CART: {
      let index = state.cart.findIndex(
        val => val.detail.id === action.payload.detail.id
      );
      let cart = [...state.cart, action.payload];
      if (index !== -1) {
        let copy = [...state.cart];
        copy.splice(index, 1, action.payload);
        cart = copy;
      }
      return {
        ...state,
        cart
      };
    }
    case REMOVE_FROM_CART: {
      let cart = state.cart.filter(item => item.detail.id !== action.payload);
      return {
        ...state,
        cart
      };
    }
    case CLEAR_CART: {
      return {
        ...state,
        cart: []
      };
    }
    default:
      return state;
  }
};

export default cart;

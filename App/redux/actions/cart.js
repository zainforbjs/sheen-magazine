import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from 'const/account';

export const addToCart = payload => ({ type: ADD_TO_CART, payload });
export const removeToCart = payload => ({ type: REMOVE_FROM_CART, payload });
export const clearCart = payload => ({ type: CLEAR_CART });

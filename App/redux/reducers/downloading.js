import React from 'react';
import {
    IS_DOWNLOADING
} from 'const/account';

const initialState = {
  isdownloading: false
};

const downloading = (state = initialState, action) => {
  const { type, user } = action;
  switch (type) {
    case IS_DOWNLOADING: { 
      return {
        ...state,
        isdownloading: action.payload,
      };
    }
  
    default:
      return state;
  }
};

export default downloading;

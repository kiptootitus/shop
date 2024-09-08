// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { productListReducer, productDetailsReducer } from './reducers/ProductReducer';

const store = configureStore({
  reducer: {
    productsList: productListReducer,
    productDetails: productDetailsReducer
  },
  // Redux DevTools is enabled by default with configureStore
});

export default store;

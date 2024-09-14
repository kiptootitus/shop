// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { productListReducer, productDetailsReducer } from './reducers/ProductReducer';
import { userLoginReducer, userRegisterReducer } from './reducers/UserReducer';

const store = configureStore({
  reducer: {
    productsList: productListReducer,
    productDetails: productDetailsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer

  },
  // Redux DevTools is enabled by default with configureStore
});

export default store;

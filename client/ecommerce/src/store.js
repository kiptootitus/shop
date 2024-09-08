import {applyMiddleware, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/ProductReducer';


const reducer = combineReducers({
  productsList: productListReducer,
  productDetails: productDetailsReducer
})

const initialState = {}
const middleware = [thunk]

const store = configureStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
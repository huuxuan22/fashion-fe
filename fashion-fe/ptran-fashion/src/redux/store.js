import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk}  from "redux-thunk"
import { productsReducer } from './Product/Reducer';
import { userReducer } from './User/Reducer';

const rootReducer = combineReducers({
    products: productsReducer,
    users:userReducer
    
}); 
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));
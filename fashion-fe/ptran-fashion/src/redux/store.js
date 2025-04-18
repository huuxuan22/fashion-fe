import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk}  from "redux-thunk"
import { productsReducer } from './Product/Reducer';
import { userReducer } from './User/Reducer';
import { feedbackReducer } from './Feedback/Reducer';

const rootReducer = combineReducers({
    products: productsReducer,
    users:userReducer,
    feedbacks: feedbackReducer,
    
}); 
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk}  from "redux-thunk"
import { productsReducer } from './Product/Reducer';
import { userReducer } from './User/Reducer';
import { feedbackReducer } from './Feedback/Reducer';
import { cartReducer } from './Cart/Reducer';
import { orderAdminReducer } from './Admin/Reducer';
import { notificationReducer } from './Notification/Reducer';

const rootReducer = combineReducers({
    products: productsReducer,
    users:userReducer,
    feedbacks: feedbackReducer,
    carts: cartReducer,
    orderAdmin: orderAdminReducer,
    notification:notificationReducer
    
}); 
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));
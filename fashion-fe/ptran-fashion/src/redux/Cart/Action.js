import axios from "axios";
import { BASE_API_URL } from "../../config/Config";
import { ADD_NEW_PRODUCT_TO_CART, ADD_NEW_PRODUCT_VARIANT_TO_CART, GET_ALL_CART, GET_ALL_PRODUCT_IN_CART } from "./ActionType";


export const addToCartProductVariant =  (token,productDetailDTO)=> async(dispatch) => {
    try {
        console.log(productDetailDTO);
        
        const res = await axios.post(
            `${BASE_API_URL}/api/order/cart/add-to-cart`,
            productDetailDTO,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(res);
        dispatch({type: ADD_NEW_PRODUCT_VARIANT_TO_CART, payload: res.data.content});
        return { success: true, data: res.data };
    } catch (error) {
        console.log(error);
        
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};

export const addToCartProduct =  (token,product)=> async(dispatch) => {
    try {
        console.log("dữ liệu trước khi theem vào dữ liệu: ", product);
        
        const res = await axios.post(
            `${BASE_API_URL}/api/order/cart/add-cart`,
            product,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(res);
        dispatch({type: ADD_NEW_PRODUCT_TO_CART, payload: res.data.content});
        return { success: true, data: res.data };
    } catch (error) {
        console.log(error);
        
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};

export const getAllCart =  (token)=> async(dispatch) => {
    try {
        
        const res = await axios.get(
            `${BASE_API_URL}/api/order/cart/get-all-item`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("dữ liệu của bạn: ",res);
        dispatch({type: GET_ALL_CART, payload: res.data});
        return { success: true, data: res.data };
    } catch (error) {
        console.log(error);
        
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};


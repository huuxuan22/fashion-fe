import axios from "axios";
import { BASE_API_URL } from "../config/Config";

export const addProduct = async (orderDetailDTO,productDetailDTO,token) => {
    try {
        const res = await axios.post(
            `${BASE_API_URL}/api/order/create`,
            orderDetailDTO,productDetailDTO,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return { success: true, data: res.data };
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            return { success: false, data: error.response.data };
        } else {
            console.log(error.response.data);
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};

export const deleteCart = async (cartId,token) => {
    try {
        const res = await axios.delete(
            `${BASE_API_URL}/api/order/cart?cartIds=${cartId}`,
            
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return { success: true, data: res.data };
    } catch (error) {
        console.log(error);
        if (error.response) {
            console.log(error.response.data);
            return { success: false, data: error.response.data };
        } else {
            console.log(error.response.data);
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};
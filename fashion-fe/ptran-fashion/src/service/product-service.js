import axios from "axios";
import { BASE_API_URL } from "../config/Config";

export const getAllPage =async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/get-page`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        } );
        console.log("Số trang",res.data);
        return {success: true, data: res.data}; 
    } catch (error) {
        console.log("Lỗi khi createChat :", error);
        if (error.response) {
            return {success: false,data: error.response.data}
        }else {
            return {success: false, data: "Lỗi ở server vui lòng truy cập lại"}
        }
    }
};

export const getDiscountProduct =async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/discount-product`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        } );
        console.log("Danh sách sản phẩm giảm giá",res.data);
        return {success: true, data: res.data}; 
    } catch (error) {
        console.log("Lỗi khi createChat :", error);
        if (error.response) {
            return {success: false,data: error.response.data}
        }else {
            return {success: false, data: "Lỗi ở server vui lòng truy cập lại"}
        }
    }
}
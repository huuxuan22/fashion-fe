import axios from "axios"
import { BASE_API_URL } from "../config/Config"


export const getAllCategory = async (token) => {
    try {
        const res = await axios.get(
            `${BASE_API_URL}/api/categories/getAll`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return { success: true, data: res.data };
    } catch (error) {
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};

export const getAllSubCateByCateId = async (token,categoryId) => {
    try {
        const res = await axios.get(
            `${BASE_API_URL}/api/subcategory/category/${categoryId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return { success: true, data: res.data };
    } catch (error) {
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};


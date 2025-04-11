import axios from "axios";
import { BASE_API_URL } from "../config/Config";


export const getAllFeedbacks = async (data) => {
    try {
        const res = await axios.get(
            `${BASE_API_URL}/api/feedback/product?productId=${data.categoryId}&page=${data.page}&size=${data.size}`,
            {
                headers: {
                    Authorization: `Bearer ${data.token}`,
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
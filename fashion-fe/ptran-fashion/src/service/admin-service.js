import axios from "axios"
import { BASE_API_URL } from "../config/Config";


export const addProduct = async (formData,token) => {
    try {
        const res = await axios.post(
            `${BASE_API_URL}/admin/product/add-product`,
            formData,
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



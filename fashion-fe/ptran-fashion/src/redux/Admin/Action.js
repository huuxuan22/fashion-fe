import axios from "axios";
import { BASE_API_URL } from "../../config/Config";
import { GET_ALL_ORDER } from "./ActionType";

export const getAllOrder =  (data)=> async(dispatch) => {
    try {
        console.log("dữ liệu tin nhắn trước khi lấy: ",data);
        
        const res = await axios.get(
            `${BASE_API_URL}/api/admin/find-all-order?size=${data.size}&page=${data.page}&category=${data.category}`,
            {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        
        dispatch({type: GET_ALL_ORDER, payload: res.data.content});
        return { success: true, data: res.data };
    } catch (error) {
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};
import axios from "axios";
import { BASE_API_URL } from "../../config/Config";
import { GET_ALL_PRODUCT } from "./ActionType";

export const getAllPropduct = ({data})=> async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/get-all?size=${data.size}&page=${data.page}&search=${data.search}&categoryId=${data.categoryId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        } );
        console.log("res",res.data);
        
        dispatch({type: GET_ALL_PRODUCT, payload: res.data.content});
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



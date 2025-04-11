import axios from "axios";
import { BASE_API_URL } from "../../config/Config";
import { CURRENT_USER } from "./ActionType";


export const currentUser = (token)=> async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/users/profile`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        } );
        console.log("res",res.data);
        
        dispatch({type: CURRENT_USER, payload: res.data});
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
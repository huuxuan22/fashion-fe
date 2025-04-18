import axios from "axios";
import { BASE_API_URL } from "../../config/Config";
import { GET_ALL_COMMENT_BY_RATING, GET_ALL_COMMNENT, GET_ALL_FEEDBACK, GET_ALL_FEEDBACK_MESSAGE, GET_ALL_MEDIA, GET_ALL_TOTAL_PAGE, GET_AVERAGE_RATING, UPDATE_STATUS_SHOW_FEEDBACK_MESSAGE } from "./ActionType";


export const getAllFeedbacks =  (data)=> async(dispatch) => {
    try {
        console.log("dữ liệu trước khi vào be: ",data);
        
        const res = await axios.get(
            `${BASE_API_URL}/api/feedback/product?productId=${data.productId}&page=${data.page}&size=${data.size}&rating=${data.selectedRating
}`,
            {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("dữ liệu tin nhắn sau khi lấy: ",res.data);
        
        dispatch({type: GET_ALL_FEEDBACK, payload: res.data.content});
        return { success: true, data: res.data };
    } catch (error) {
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};
export const countCommentByRating = (data) => async(dispatch) => {
    try {
        const res = await axios.get(
            `${BASE_API_URL}/api/feedback/count-comment?productId=${data.productId}`,
            {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({type: GET_ALL_COMMENT_BY_RATING, payload: res.data});
        return { success: true, data: res.data };
    } catch (error) {
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};
export const countAllComment = (data) => async(dispatch) => {
    try {
        const res = await axios.get(
            `${BASE_API_URL}/api/feedback/count-all-comment?productId=${data.productId}`,
            {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({type: GET_ALL_COMMNENT, payload: res.data});
        return { success: true, data: res.data };
    } catch (error) {
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};
export const countAllMedia = (data) => async(dispatch) => {
    try {
        const res = await axios.get(
            `${BASE_API_URL}/api/feedback/count-all-media?productId=${data.productId}`,
            {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({type: GET_ALL_MEDIA, payload: res.data});
        return { success: true, data: res.data };
    } catch (error) {
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};
export const loadAllFeedbackMess = (feeckbackId,token) => async(dispatch) => {
    try {
        const res = await axios.post(
            `${BASE_API_URL}/api/feedback/feedback-message/${feeckbackId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", // Quan trọng
                },
            }
          );
          dispatch({type: GET_ALL_FEEDBACK_MESSAGE, payload: res.data});
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
export const updateStatusShowFeedbackMessage = (feedbackId,status) => async(dispatch) => {
    dispatch({
        type: UPDATE_STATUS_SHOW_FEEDBACK_MESSAGE,
        payload: { feedbackId, status }
      });
}
export const getAllTotalPage = (productId,rating,token) => async(dispatch) => {
    try {
        const res = await axios.get(
            `${BASE_API_URL}/api/feedback/totalPage/${productId}/${rating}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({type: GET_ALL_TOTAL_PAGE, payload: res.data});
        return { success: true, data: res.data };
    } catch (error) {
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
}
export const getAverageRating = (productId,token) => async(dispatch) => {
    try {
        const res = await axios.get(
            `${BASE_API_URL}/api/feedback/average/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({type: GET_AVERAGE_RATING, payload: res.data});
        return { success: true, data: res.data };
    } catch (error) {
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
}

import axios from "axios";
import { BASE_API_URL } from "../../config/Config";
import {
  ADD_NEW_NOTIFICATION,
  GET_ALL_NEW_NOTIFICATION,
  GET_ALL_NOTIFICATION,
  LOAD_MORE_NOTIFICATION,
  NOTIFICATION_ERROR,
  NOTIFICATION_LOADING,
  SET_NOTIFICATION_TO_ZERO,
} from "./ActionType";

export const getAllNotification = (data) => async (dispatch) => {
  dispatch({ type: NOTIFICATION_LOADING });
  try {
    const res = await axios.get(
      `${BASE_API_URL}/api/users/get-all-notification?size=${data.size}&page=${data.page}`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (data.page === 0) {
      // Nếu là trang đầu tiên
      dispatch({
        type: GET_ALL_NOTIFICATION,
        payload: res.data.content,
        total: res.data.totalElements,
      });
    } else {
      // Nếu là trang tiếp theo
      dispatch({
        type: LOAD_MORE_NOTIFICATION,
        payload: res.data.content,
        page: data.page,
      });
    }

    return {
      success: true,
      data: res.data,
      isLast: res.data.last, // Thêm trường này để kiểm tra trang cuối
    };
  } catch (error) {
    dispatch({ type: NOTIFICATION_ERROR, payload: error.message });
    if (error.response) {
      return { success: false, data: error.response.data };
    } else {
      return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
    }
  }
};

export const getAllNotificationNew = (data) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_API_URL}/api/users/get-all-new-notification`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: GET_ALL_NEW_NOTIFICATION, payload: res.data });
    return { success: true, data: res.data };
  } catch (error) {
    if (error.response) {
      return { success: false, data: error.response.data };
    } else {
      return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
    }
  }
};

export const addnewNotification = () => async (dispatch) => {
  
  dispatch({ type: ADD_NEW_NOTIFICATION });
};

export const setNotificationToZero = () => async (dispatch) => {
  dispatch({ type: SET_NOTIFICATION_TO_ZERO, payload: 0 });
}

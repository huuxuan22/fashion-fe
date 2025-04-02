import axios from "axios"
import { BASE_API_URL } from "../config/Config"


export const login =async (data) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/api/login`,data);
        return {success: true, data: res.data};
    } catch (error) {
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }

}

export const register = async (data) => {
    try {
        const { confirmPassword, gender, ...userDTO } = data; // Loại bỏ confirmPassword
        // Chuyển đổi gender thành true nếu là male, ngược lại false
        const updatedGender = gender === 'male' ? true : false;
        // Cập nhật lại giá trị gender trong userDTO
        const updatedUserDTO = { ...userDTO, gender: updatedGender };
        const res = await axios.put(`${BASE_API_URL}/api/register`, updatedUserDTO, {
            headers: {
                'Content-Type': 'application/json', // Đảm bảo là gửi dưới dạng JSON
            },
        });

        return { success: true, data: res.data };
    } catch (error) {
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};

export const saveAfterCheck = async (userDTO, code) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/api/save`, 
            userDTO, // Đây là @RequestBody
            {
                params: { code } // Đây là @RequestParam
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
}

export const sendCodeAgain = async (email) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/api/send-again?email=${email}`,);
        return {success: true, data: res.data};
    } catch (error) {
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
}

import axios from "axios";
import { BASE_API_URL } from "../config/Config";

export const updateUser = async (formData,token) => {
    try {
        const res = await axios.post(
            `${BASE_API_URL}/api/users/update-profile`,
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


export const getAllAddressUser = async (token) => {
    try {
        const res = await axios.get(
            `${BASE_API_URL}/api/users/address`,
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
            console.log(error.response.data);
            return { success: false, data: error.response.data };
        } else {
            console.log(error.response.data);
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};


export const addNewAddress = async (token,addressUserDTO) => {
    try {
        const res = await axios.post(
            `${BASE_API_URL}/api/users/add-new-address`,addressUserDTO,
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
            console.log(error.response.data);
            return { success: false, data: error.response.data };
        } else {
            console.log(error.response.data);
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};

export const updateAddress = async (token,addressUser) => {
    try {
        const res = await axios.post(
            `${BASE_API_URL}/api/users/update-address`,addressUser,
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
            console.log(error.response.data);
            return { success: false, data: error.response.data };
        } else {
            console.log(error.response.data);
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};

export const deleteAddress = async (token,id) => {
    try {
        const res = await axios.delete(
            `${BASE_API_URL}/api/users/delete?id=${id}`,
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
            console.log(error.response.data);
            return { success: false, data: error.response.data };
        } else {
            console.log(error.response.data);
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};

export const changePassword = async (token, password) => {
    try {
        console.log(" dư lieeujL ", password);
        
        const res = await axios.post(
            `${BASE_API_URL}/api/users/change-password?oldPassword=${password}`,
            {}, // POST body rỗng
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
            console.log(error.response.data);
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};


export const updatePassword = async (token, newPassword,code) => {
    try {
        
        const res = await axios.post(
            `${BASE_API_URL}/api/users/update-password?newPassword=${newPassword}&code=${code}`,
            {}, // POST body rỗng
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
            console.log(error.response.data);
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};


/**
 * Lấy được mã giảm giá khi thanh toán 
 * @param {} token 
 * @param {*} code 
 * @returns 
 */
export const getCoupon = async (token,code) => {
    try {
        
        const res = await axios.get(
            `${BASE_API_URL}/api/users/get-coupon?code=${code}`,
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
            console.log(error.response.data);
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};


/**
 * Lấy được mã giảm giá khi thanh toán 
 * @param {} token 
 * @param {*} code 
 * @returns 
 */
export const getDeal = async (token,productId) => {
    try {
        
        const res = await axios.get(
            `${BASE_API_URL}/api/users/get-deal?productId=${productId}`,
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
            console.log(error.response.data);
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};






/**
 * Lấy được mã giảm giá khi thanh toán 

 */
export const decreaseCoupon = async (token,coupon) => {
    try {
        
        const res = await axios.post(
            `${BASE_API_URL}/api/users/decrease-coupon`,coupon,
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
            console.log(error.response.data);
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};


export const updateNotification = async (token) => {
    try {
        console.log("đã vào đây service");
        
        const res = await axios.get(
            `${BASE_API_URL}/api/users/update-notification`,
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
            console.log(error.response.data);
            return { success: false, data: error.response.data };
        } else {
            console.log(error.response.data);
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};


export const getAllOrderUser = async (data) => {
    try {
        console.log("đã vào đây service");
        
        const res = await axios.get(
            `${BASE_API_URL}/api/users/get-all-order?size=${data.size}&page=${data.page}`,
            {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return { success: true, data: res.data.content };
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


export const countAllOrder = async (data) => {
    try {
        console.log("đã vào đây service");
        
        const res = await axios.get(
            `${BASE_API_URL}/api/users/count-all-order`,
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
            console.log(error.response.data);
            return { success: false, data: error.response.data };
        } else {
            console.log(error.response.data);
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};

export const cancelOrder = async (data) => {
    try {
        const res = await axios.post(
            `${BASE_API_URL}/api/users/cancel-order?orderId=${data.orderId}`,
            {},{
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
            console.log(error.response.data);
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};


export const paymentVNPay = async (data) => {
    try {
        const res = await axios.get(
            `${BASE_API_URL}/api/payment/create-payment?money=${data.money}&orderInf=${data.orderInfor}`,
            {},{
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
            console.log(error.response.data);
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};
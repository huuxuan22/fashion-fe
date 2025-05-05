import axios from "axios"
import { BASE_API_URL } from "../config/Config";
import Deal from './../component/Deal';


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


/**
 * Tìm kiếm ản phẩm
 * @param {*} data 
 * @returns 
 */
export const searchProduct =async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/searchByName?value=${data.searchTerm}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        } );
        console.log("Danh sách sản phẩm giảm giá",res.data);
        
        return {success: true, data: res.data}; 
    } catch (error) {
        console.log("Lỗi khi createChat :", error);
        if (error.response) {
            return {success: false,data: error.response.data}
        }else {
            return {success: false, data: "Lỗi ở server vui lòng truy cập lại"}
        }
    }
}

/**
 * Tìm kiếm ản phẩm
 * @param {*} data 
 * @returns 
 */
export const creaeDeal =async (formData,token) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/api/admin/create-deal`, formData,{
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        } );
        console.log("Danh sách sản phẩm giảm giá",res.data);
        
        return {success: true, data: res.data}; 
    } catch (error) {
        console.log("Lỗi khi createChat :", error);
        if (error.response) {
            return {success: false,data: error.response.data}
        }else {
            return {success: false, data: "Lỗi ở server vui lòng truy cập lại"}
        }
    }
}



/**
 * Lấy toàn bộ DEAL
 * @param {*} data 
 * @returns 
 */
export const getAllDEAL =async (size,page,token) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/admin/deal/get-all?size=${size}&page=${page}`,{
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        } );
        console.log("Danh sách sản phẩm giảm giá",res.data);
        
        return {success: true, data: res.data.content}; 
    } catch (error) {
        console.log("Lỗi khi createChat :", error);
        if (error.response) {
            return {success: false,data: error.response.data}
        }else {
            return {success: false, data: "Lỗi ở server vui lòng truy cập lại"}
        }
    }
}


/**
 * Lấy toàn bộ DEAL
 * @param {*} data 
 * @returns 
 */
export const getAllPageOfDeal =async (token) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/admin/deal/page`,{
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        } );
        console.log("Danh sách sản phẩm giảm giá",res.data);
        
        return {success: true, data: res.data}; 
    } catch (error) {
        console.log("Lỗi khi createChat :", error);
        if (error.response) {
            return {success: false,data: error.response.data}
        }else {
            return {success: false, data: "Lỗi ở server vui lòng truy cập lại"}
        }
    }
}

/**
 * Cập nhật deal
 * @param {*} data 
 * @returns 
 */
export const updateDeal =async (deal,token) => {
    try {
        const res = await axios.put(`${BASE_API_URL}/api/admin/deal/update`,deal,{
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        } );
        console.log("Danh sách sản phẩm giảm giá",res.data);
        
        return {success: true, data: res.data}; 
    } catch (error) {
        console.log("Lỗi khi createChat :", error);
        if (error.response) {
            return {success: false,data: error.response.data}
        }else {
            return {success: false, data: "Lỗi ở server vui lòng truy cập lại"}
        }
    }
}

/**
 * Cập nhật deal
 * @param {*} data 
 * @returns 
 */
export const deleteDeal =async (dealId,token) => {
    try {
        const res = await axios.delete(`${BASE_API_URL}/api/admin/deal?dealId=${dealId}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        } );
        console.log("Danh sách sản phẩm giảm giá",res.data);
        
        return {success: true, data: res.data}; 
    } catch (error) {
        console.log("Lỗi khi createChat :", error);
        if (error.response) {
            return {success: false,data: error.response.data}
        }else {
            return {success: false, data: "Lỗi ở server vui lòng truy cập lại"}
        }
    }
}


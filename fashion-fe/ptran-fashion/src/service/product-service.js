import axios from "axios";
import { BASE_API_URL } from "../config/Config";

export const getAllPage =async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/get-page`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        } );
        console.log("Số trang",res.data);
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

export const getDiscountProduct =async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/discount-product`, {
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
export const searchProduct =async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/search?page=${data.page}&size=${data.size}&value=${data.value}`, {
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
 * Lấy tất cả số trang của sản phẩm
 * @param {*} data 
 * @returns 
 */
export const getAllTotalPage =async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/totalPage?value=${data.value}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        } );
        console.log("Số trang",res.data);
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
 * Lấy sản phẩm nổi bật
 * @param {*} data 
 * @returns 
 */
export const getProductStandOutNam = async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/standOut-nam`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        } );
        console.log("Số trang",res.data);
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
 * Lấy sản phẩm nổi bật
 * @param {*} data 
 * @returns 
 */
export const getProductStandOutNu = async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/standOut-nu`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        } );
        console.log("Số trang",res.data);
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
 * Lấy tất cả danh sách ảnh của sản phẩm
 * @param {*} data 
 * @returns 
 */
export const getAllImageProduct = async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/image?productId=${data.productId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        } );
        console.log("Số trang",res.data);
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
 * Lấy chi tiết thông tin của 1 sản phẩm
 * @param {*} data 
 * @returns 
 */
export const getDetailProduct = async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/detail?productId=${data.productId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        } );
        console.log("Số trang",res.data);
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
 * Lấy Những số lượng sản phẩm đã bán
 * @param {*} data 
 * @returns 
 */
export const getSolidOfProduct = async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/solid?productId=${data.productId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        } );
        console.log("Số trang",res.data);
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
 * Lấy tất cả size của 1 sản phẩm trong Productvariant
 * @param {*} data 
 * @returns 
 */
export const getAllSizeOfOneProduct = async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/size/detail?productId=${data.productId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        } );
        console.log("Số trang",res.data);
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
 * Lấy tất cả color của 1 sản phẩm trong Productvariant
 * @param {*} data 
 * @returns 
 */
export const getAllColorOfOneProduct = async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/color/detail?productId=${data.productId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        } );
        console.log("Số trang",res.data);
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
 * lấy những sản phẩm cofnlaij theo màu sắc khi cái nào hét rồi trả về 0 ddeer hiển thị dữ liệu cho người dugnf xem 
 * @param {*} data 
 * @returns 
 */
export const countQuanlityWithSizeByColorId = async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/color/select-color?productId=${data.productId}&colorId=${data.colorId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        } );
        console.log("Số trang",res.data);
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
 * lấy những sản phẩm tương tự
 * @param {*} data 
 * @returns 
 */
export const getSameProduct = async (data) => {
    if (!data.subCategoryId || !data.productId) {
        return { success: false, data: "Thiếu subCategoryId hoặc productId" };
    }

    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/same?subCategoryId=${data.subCategoryId}&productId=${data.productId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        });
        console.log("Số trang", res.data);
        return { success: true, data: res.data };
    } catch (error) {
        console.log("Lỗi khi gọi getSameProduct:", error);
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi ở server, vui lòng thử lại" };
        }
    }
};
/**
 * Lấy tất cả tổng số đánh giá của 1 sản phẩm
 * @param {*} data 
 * @returns 
 */
export const getAllRatingByProductId = async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/count?productId=${data.productId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        });
        console.log("Số trang", res.data);
        return { success: true, data: res.data };
    } catch (error) {
        console.log("Lỗi khi gọi getSameProduct:", error);
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi ở server, vui lòng thử lại" };
        }
    }
};

/**
 * Lấy Top deal những sản phẩm cso giá thấp nhất
 * @param {*} data 
 * @returns 
 */
export const getTopDealProduct = async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/top-deal`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        });
        console.log("Số trang", res.data);
        return { success: true, data: res.data };
    } catch (error) {
        console.log("Lỗi khi gọi getSameProduct:", error);
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi ở server, vui lòng thử lại" };
        }
    }
};


/**
 * Lấy Top deal những sản phẩm cso giá thấp nhất
 * @param {*} data 
 * @returns 
 */
export const getProductWithCategories = async (data) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/admin/product/category`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        });
        console.log("Số trang", res.data);
        return { success: true, data: res.data };
    } catch (error) {
        console.log("Lỗi khi gọi getSameProduct:", error);
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi ở server, vui lòng thử lại" };
        }
    }
};


/**
 * trang product-page tìm kiếm sản phẩm
 */
export const selectProductByfeature = async (data) => {
    try {
        console.log("dữ liệu trước khi vào be: ", data);
        
        const res = await axios.get(`${BASE_API_URL}/api/users/find-product?categoryId=${data.categoryId !== null?data.categoryId : ""}&subCategoryId=${data.subCategoryId !== null ? data.subCategoryId : ""}&colorId=${data.colorId!==null ? data.colorId : ""}&sizeId=${data.sizeId!==null ? data.sizeId : ""}&sortBy=${data.sortBy!== null ? data.sortBy : ""}&size=${data.size}&page=${data.page}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        });
        console.log("Số trang", res.data.content);
        return { success: true, data: res.data.content };
    } catch (error) {
        console.log("Lỗi khi gọi getSameProduct:", error);
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi ở server, vui lòng thử lại" };
        }
    }
};


/**
 * lấy tổng số trang theo những đặc điểm chọn 
 */
export const getPages = async (data) => {
    try {
        console.log("dữ liệu số trang: ",data);
        
        const res = await axios.get(`${BASE_API_URL}/api/users/count-all-product?categoryId=${data.categoryId !== null ?data.categoryId : "" }&subCategoryId=${data.subCategoryId !== null ? data.subCategoryId : ""}&colorId=${data.colorId !== null ? data.colorId : ""}&sizeId=${data.sizeId !== null ? data.sizeId : "" }`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
            }
        });
        console.log("Số trang", res.data);
        return { success: true, data: res.data };
    } catch (error) {
        console.log("Lỗi khi gọi getSameProduct:", error);
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi ở server, vui lòng thử lại" };
        }
    }
};
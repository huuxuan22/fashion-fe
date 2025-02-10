import axios from "axios"

const URL_ADMIN = "http://localhost:8080/api/admin";

const getAllUser = async (size,page) => {
    if(page == null || size == null) {
        size = 7;
        page = 0;
    }
    try {
        const users = await axios.get(`${URL_ADMIN}/get-all-user?size=${size}&page=${page}`);
        return users.data.content;
    }catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}


const getInforEmployee =async (userId) => {
    try {
        const users = await axios.get(`${URL_ADMIN}/get-infor-employee?userId=${userId}`);
        return users;
    }catch {
        console.log("Không tìm thấy người dùng ");
        
    }
}

const addNewEmployee = async (employeeInfor, province, district, commune, address) => {
    try {
        console.log("Đã đi vào đây");
        const employee = {...employeeInfor, province: province, district: district, commune:commune, notes: address}
        const response = await axios.post(`${URL_ADMIN}/add-new-employee`,
              employee
        );  
        return response.data; // Trả về kết quả nếu cần
    } catch (errors) {
        return errors.response;
    }
};


const getAllEmployeeCategory =async () => {
    try {
        const data = await axios.get(`${URL_ADMIN}/get-all-category-employee`);
        return data.data;
    } catch (error) {
        return error;
    }
}

const uploadImageEmployee =async (url,numberphone) => {
    try {
        console.log("đã vào trong này rồi");
        
        const data = await axios.post(`${URL_ADMIN}/upload-image-employee`, {
            url,numberphone
        });
        return data;
    } catch (error) {
        return error.response;
    }
};

const updateEmployee = async (employeeInfor, province, district, commune, address) => {
    try {
        console.log("Đã đi vào đây ", employeeInfor);
        const employee = {...employeeInfor, province: province, district: district, commune:commune, notes: address}
        const response = await axios.put(`${URL_ADMIN}/update-employee`,
              employee
        );  
        return response.data; // Trả về kết quả nếu cần
    } catch (errors) {
        return errors.response;
    }
}

const deleteEmployee = () => {
    const data = axios.delete(`${URL_ADMIN}/dete`)
}


export {getAllUser,
        getInforEmployee,
        getAllEmployeeCategory,
        addNewEmployee,
        uploadImageEmployee,
        updateEmployee,
        deleteEmployee
    };
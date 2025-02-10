import axios from "axios";

// Hàm lấy danh sách tỉnh
const getProvince = async () => {
  try {
    const response = await axios.get("https://provinces.open-api.vn/api/p/");
    return response.data; // Trả về danh sách tỉnh
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tỉnh:", error);
    throw error; // Ném lỗi để xử lý bên ngoài nếu cần
  }
};

// Hàm lấy danh sách huyện theo tỉnh
const getDistrict = async (provinceCode) => {
  if (!provinceCode) {
    console.error("Thiếu mã tỉnh (provinceCode) để lấy danh sách huyện.");
    return [];
  }

  try {
    const response = await axios.get(
      `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
    );
    return response.data.districts || []; // Trả về danh sách huyện
  } catch (error) {
    console.error("Lỗi khi lấy danh sách huyện:", error);
    throw error;
  }
};

// Hàm lấy danh sách xã theo huyện
const getCommune = async (districtCode) => {
  if (!districtCode) {
    console.error("Thiếu mã huyện (districtCode) để lấy danh sách xã.");
    return [];
  }

  try {
    const response = await axios.get(
      `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
    );
    return response.data.wards || []; // Trả về danh sách xã
  } catch (error) {
    console.error("Lỗi khi lấy danh sách xã:", error);
    throw error;
  }
};

export { getProvince, getDistrict, getCommune };

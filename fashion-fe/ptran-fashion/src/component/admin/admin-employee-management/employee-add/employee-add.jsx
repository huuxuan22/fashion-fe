import React, { useState, useEffect } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import axios from "axios";
import "./employee-add.css";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  getProvince,
  getDistrict,
  getCommune,
} from "./../../../../service/utils/address-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import * as adminService from "./../../../../service/admin-service/admin-service";
import CustomToast from "../../../../share/announcement/announcement-successfull";
import { Spinner } from "react-bootstrap";
const EmployeeAdd = () => {
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [workingPosition, setWorkPosition] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectCommune, setSelectCommune] = useState("");
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  if (!workingPosition) {
    setLoading(true);
  }
  const validation = Yup.object().shape({
    fullName: Yup.string().required("*Không được để trống tên "),
    age: Yup.number()
      .integer("*Chưa đúng định dạng tuổi")
      .min(0, "*Tuổi không được nhỏ hơn 0")
      .required("*Tuổi không được để trống")
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? null : value
      ),
    gender: Yup.number()
      .required("*Chưa xác định giới tính ")
      .oneOf([0, 1], "*Giới tính không hợp lệ"),

    numberphone: Yup.string()
      .required("*SĐT Không được để trống")
      .matches(/^[0-9]{10}$/, "*Chưa đúng định dạng số điện thoại"),
    birthday: Yup.string().required("*Ngày sinh không được để trống"),
    email: Yup.string()
      .email("*Phải đúng định dạng của email")
      .required("*Không được để trống email"),
    categoryEmployee: Yup.number()
      .required("*Bạn chưa chọn công việc cho nhân viên")
      .positive("*Giá trị phải là số dương") // Nếu muốn thêm kiểm tra số dương
      .typeError("*Bạn chưa chọn công việc cho nhân viên "),
  });
  useEffect(() => {
    // Lấy danh sách tỉnh khi component được render
    getProvince()
      .then(setProvinces)
      .catch((error) => console.error("Lỗi khi tải danh sách tỉnh:", error));
  }, []);

  useEffect(() => {
    adminService.getAllEmployeeCategory().then((data) => {
      setWorkPosition(data);
    });
  }, []);

  const handleProvinceChange = async (e) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    setDistricts([]); // Reset danh sách huyện
    setCommunes([]); // Reset danh sách xã
    if (provinceCode) {
      getDistrict(provinceCode)
        .then(setDistricts)
        .catch((error) => console.error("Lỗi khi tải danh sách huyện:", error));
    }
  };

  const handleDistrictChange = (e) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
    setCommunes([]); // Reset danh sách xã
    // console.log(districts[districtCode].name);

    if (districtCode) {
      getCommune(districtCode)
        .then(setCommunes)
        .catch((error) => console.error("Lỗi khi tải danh sách xã:", error));
    }
  };

  const handleCommune = (e) => {
    const communeCode = e.target.value;
    setSelectCommune(communeCode);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  // ===============================LÀM VS AVATAR======================================
  const [avatar, setAvatar] = useState(
    "https://img.lovepik.com/free-png/20211106/lovepik-simple-man-icon-png-image_400345200_wh1200.png" // Hình ảnh mặc định
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
    if (file) {
      setAvatar(file); // Lưu file ảnh để upload
      setPreview(URL.createObjectURL(file)); // Tạo URL preview để hiển thị
    }
  };

  const handleComback = () => {
    navigate("/admin/employee");
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data) => {
    console.log("đã đi vào đây");

    let provine = "",
      district = "",
      commune = "";
    if (selectedProvince) {
      provinces.forEach((value) => {
        if (value.code == selectedProvince) {
          provine = value.name;
        }
      });
    }

    if (selectedDistrict) {
      districts.forEach((value) => {
        if (value.code == selectedDistrict) {
          district = value.name;
        }
      });
    }

    if (selectCommune) {
      communes.forEach((value) => {
        if (value.code == selectCommune) {
          commune = value.name;
        }
      });
    }
    // addNewEmployee = async (employeeInfor, province, district, commune, address)
    await adminService
      .addNewEmployee(data, provine, district, commune, notes)
      .then((datas) => {
        console.log(datas.status);

        if (datas.status === 400) {
          console.log(datas.data);
          const backendErrors = datas.data;
          // Gán lỗi từ backend vào từng trường
          if (backendErrors.email) {
            setError("email", { type: "manual", message: backendErrors.email });
          }
          if (backendErrors.age) {
            setError("age", { type: "manual", message: backendErrors.age });
          }
          if (backendErrors.gender) {
            setError("gender", {
              type: "manual",
              message: backendErrors.gender,
            });
          }
          if (backendErrors.numberphone) {
            setError("numberphone", {
              type: "manual",
              message: backendErrors.numberphone,
            });
          }
        }
        console.log(data);
        
       if (datas.status !== 400 || datas.status !== 500) {
        navigate("/admin/upload-image", {
          state: { numberphone: data.numberphone },
        });
       }
      });
    console.log("Đã vào cái hiện thông báo ");
    // Submit form data with the uploaded URL
  };

  const handleSelectProvine = (data) => {};

  return (
    <div>
      {loading && (
        <div className="loading-overlay">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      {open && (
        <CustomToast
          message="*Bạn đã thêm mới 1 nhân viên"
          duration={4000}
          onClose={() => setOpen(false)} // Tắt Toast sau khi đóng
        />
      )}
      <button
        onClick={handleComback}
        // style={styles.button}
        className="btn-comback"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Trở lại
      </button>
      <div className="employee-update ">
        <div className="avatar-container">
          <div className="avatar-image">
            <img
              src={
                preview ||
                "https://img.lovepik.com/free-png/20211106/lovepik-simple-man-icon-png-image_400345200_wh1200.png"
              } // Hiển thị ảnh mặc định nếu chưa chọn
              alt="User Avatar"
            />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-6 col-sm-12 mb-1">
              <input
                type="text"
                placeholder="Họ và tên"
                {...register("fullName")}
              />
              {errors.fullName && (
                <div className="error-message">
                  <p>{errors.fullName.message}</p>
                </div>
              )}
            </div>

            <div className="col-lg-6 col-sm-12 mb-1">
              <input type="text" placeholder="Email" {...register("email")} />
              {errors.email && (
                <div className="error-message">
                  <p>{errors.email.message}</p>
                </div>
              )}
            </div>

            <div className="col-lg-6 mb-1 col-sm-12">
              <input type="text" placeholder="Tuổi" {...register("age")} />
              {errors.age && (
                <div className="error-message">
                  <p>{errors.age.message}</p>
                </div>
              )}
            </div>

            <div className="col-lg-6 mb-1 col-sm-12">
              <input
                type="text"
                placeholder="Số điện thoại"
                {...register("numberphone")}
              />
              {errors.numberphone && (
                <div className="error-message">
                  <p>{errors.numberphone.message}</p>
                </div>
              )}
            </div>

            <div className="col-lg-4 mb-1 col-sm-12">
              <input type="date" {...register("birthday")} />
              {errors.birthday && (
                <div className="error-message">
                  <p>{errors.birthday.message}</p>
                </div>
              )}
            </div>

            <div className="col-lg-4 mb-1 col-sm-12">
              <select id="gender" name="gender" {...register("gender")}>
                <option value="">Giới tính</option>
                <option value="0">NAM</option>
                <option value="1">NỮ</option>
              </select>

              {errors.gender && (
                <div className="error-message">
                  <p>{errors.gender.message}</p>
                </div>
              )}
            </div>

            <div className="col-lg-4 mb-1 col-sm-12">
              <select
                id="categoryEmployee"
                name="categoryEmployee"
                {...register("categoryEmployee", { valueAsNumber: true })}
              >
                <option value="">Công việc</option>{" "}
                {/* Giá trị mặc định là chuỗi rỗng */}
                {workingPosition
                  ? workingPosition?.map((position) => (
                      <option
                        key={position.categoryEmployeeId}
                        value={position.categoryEmployeeId} // Gán giá trị ID của công việc
                      >
                        {position.ceName}
                      </option>
                    ))
                  : setLoading}
              </select>
              {errors.categoryEmployee && (
                <div className="error-message">
                  <p>{errors.categoryEmployee.message}</p>
                </div>
              )}
            </div>

            {/* Select Tỉnh */}
            <div className="col-lg-4 mb-1 col-sm-12">
              <select value={selectedProvince} onChange={handleProvinceChange}>
                <option value="">Chọn Tỉnh / Thành phố</option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Huyện */}
            <div className="col-lg-4 mb-1 col-sm-12">
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedProvince}
              >
                <option value="">Chọn Huyện</option>
                {districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Xã */}
            <div className="col-lg-4 mb-1 col-sm-12">
              <select disabled={!selectedDistrict} onChange={handleCommune}>
                <option value="">Chọn Xã / Phường</option>
                {communes.map((commune) => (
                  <option key={commune.code} value={commune.code}>
                    {commune.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Textarea để thêm ghi chú */}
            <div style={{ marginTop: "20px" }}>
              <textarea
                id="notes"
                value={notes}
                onChange={handleNotesChange}
                rows="4"
                cols="50"
                placeholder="Địa chỉ nhà hoặc nơi thường trú....."
                style={{
                  display: "block",
                  marginTop: "10px",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <button
              type="submit"
              className="col-lg-12 btn-add btn-outline-primary"
            >
              THÊM MỚI NHÂN VIÊN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeAdd;

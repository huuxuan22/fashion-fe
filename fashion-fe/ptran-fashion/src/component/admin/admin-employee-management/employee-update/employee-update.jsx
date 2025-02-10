import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "./emplopyee-update.css";
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
import { useLocation, useNavigate } from "react-router-dom";
import * as AdminService from "./../../../../service/admin-service/admin-service";
const EmployeeUpdate = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDistrict, setIsDistrict] = useState(false);
  const [isCommune, setIsCommune] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const navigate = useNavigate();
  const [addressUser, setAddressUser] = useState({});
  const [selectedProvince, setSelectedProvince] = useState(
    addressUser.province || ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectCommune, setSelectCommune] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Lấy danh sách tỉnh khi component được render
    getProvince()
      .then(setProvinces)
      .catch((error) => console.error("Lỗi khi tải danh sách tỉnh:", error));
  }, []);
  const handleProvinceChange = (e) => {
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

    if (districtCode) {
      getCommune(districtCode)
        .then(setCommunes)
        .catch((error) => console.error("Lỗi khi tải danh sách xã:", error));
    }
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
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result); // Cập nhật hình ảnh
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComback = () => {
    navigate("/admin/employee");
  };

  // Lấy danh sách làm việc của nhân viên
  useEffect(() => {
    getAllEmployeeCategory();
  }, []);
  const [workingPosition, setWorkPosition] = useState([]);

  const getAllEmployeeCategory = async () => {
    await AdminService.getAllEmployeeCategory().then((data) => {
      setWorkPosition(data);
    });
  };

  if (!workingPosition) {
    setWorkPosition("Chưa có vị trí nào");
  }

  // Thực hiện công việc submit
  const onSubmit = (data) => {
    console.log("Thông tin cập nhật");
    console.log(data);
    let provine = "",
      district = "",
      commune = "";
    if (selectedProvince) {
      provinces.forEach((value) => {
        if (value.code == selectedProvince) {
          provine = value.name;
        }
      });
    } else {
      provine = addressUser.province || "";
    }

    if (selectedDistrict) {
      districts.forEach((value) => {
        if (value.code == selectedDistrict) {
          district = value.name;
        }
      });
    } else {
      district = addressUser.district || "";
    }

    if (selectCommune) {
      communes.forEach((value) => {
        if (value.code == selectCommune) {
          commune = value.name;
        }
      });
    } else {
      commune = addressUser.commune || "";
    }
    if (!notes) {
      setNotes(addressUser.homeAddress)
    }
    AdminService.updateEmployee(data,provine,district,commune,notes).then((data) => {
        // console.log("Dữ liệu của bạn: ",data,provine,district,commune,notes);
        
    })
  };

  // Lấy id của người dùng và sau đó lấy thông tin của người dùng
  const location = useLocation();
  const { data } = location.state || {};
  const [userInfor, setUserInfor] = useState({});

  const getInforUser = async (userId) => {
    AdminService.getInforEmployee(userId).then((data) => {
      console.log(data);

      setUserInfor(data.data.userRespone);
      setAddressUser(data.data.addressUser);
    });
  };
  useEffect(() => {
    getInforUser(data);
  }, [data]);

  const validation = Yup.object().shape({
    fullName: Yup.string().required("*Không được để trống tên "),
    age: Yup.number()
      .integer("*Chưa đúng định dạng tuổi")
      .min(0, "*Tuổi không được nhỏ hơn 0")
      .required("*Tuổi không được để trống")
      .transform((value, originalValue) => {
        // Kiểm tra xem originalValue có phải là chuỗi và không rỗng hay không
        if (typeof originalValue === "string" && originalValue.trim() === "") {
          return null; // Trả về null nếu chuỗi rỗng
        }
        return value; // Trả về giá trị gốc nếu không phải chuỗi rỗng
      }),
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
    isActive: Yup.string()
      .required("*Bạn chưa chọn trạng thái công việc")
      .oneOf(["working", "retired"], "*Trạng thái công việc không hợp lệ"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: "working",
      gender: 0,
    },
    defaultValue: {
      fullName: userInfor.fullName,
      birthday: userInfor.birthday,
    },
    resolver: yupResolver(validation),
  });

  const handleInputClick = () => {
    setIsEditing(true); // Chuyển sang chế độ `select` khi người dùng nhấp vào
  };

  const handleInputDistrictClick = () => {
    setIsDistrict(true);
  };

  const handleInputCommuneClick = () => {
    setIsCommune(true);
  };

  useEffect(() => {
    console.log("Thông tin người dùng: ", userInfor);

    if (userInfor) {
      reset({
        fullName: userInfor.fullName || "",
        birthday: userInfor.birthday || "",
        age: userInfor.age || "",
        email: userInfor.email || "",
        numberphone: userInfor.numberphone || "",
        isActive: userInfor.isActive || "working",
        gender: userInfor.gender || 0,
      });
    }
  }, [userInfor, reset]);

  // hàm chuyển đổi ngày từ 2025-01-03 00:00:00.0 sang 03/01/2025
  const formatDate = (dateString) => {
    if (dateString) {
      const [year, month, day] = dateString.split(" ")[0].split("-");
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    }
    return ""; // Trả về chuỗi rỗng nếu không có giá trị
  };
  return (
    <div className="employee-update ">
      <button
        onClick={handleComback}
        // style={styles.button}
        className="btn-comback"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Trở lại
      </button>
      <div className="avatar-container">
        <div className="avatar-image">
          <img
            src={userInfor.imgUrl ? userInfor.imgUrl : avatar}
            alt="User Avatar"
          />
        </div>

        <label htmlFor="avatarInput" className="avatar-button">
          <CloudUploadIcon style={{ marginRight: "8px" }} /> Cập nhật ảnh
        </label>
        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          className="avatar-input"
          onChange={handleImageChange}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-6 col-sm-12 mb-1">
            <input
              type="text"
              placeholder={userInfor.fullName}
              {...register("fullName")}
            />
            {errors.fullName && (
              <div className="error-message">
                <p>{errors.fullName.message}</p>
              </div>
            )}
          </div>

          <div className="col-lg-6 col-sm-12 mb-1">
            <input
              placeholder={userInfor.email}
              type="text"
              {...register("email")}
            />
            {errors.email && (
              <div className="error-message">
                <p>{errors.email.message}</p>
              </div>
            )}
          </div>

          <div className="col-lg-6 mb-3 col-sm-1">
            <input
              placeholder={userInfor.age}
              type="text"
              {...register("age")}
            />
            {errors.age && (
              <div className="error-message">
                <p>{errors.age.message}</p>
              </div>
            )}
          </div>

          <div className="col-lg-6 mb-3 col-sm-1">
            <input
              placeholder={userInfor.numberphone}
              type="text"
              {...register("numberphone")}
            />
            {errors.numberphone && (
              <div className="error-message">
                <p>{errors.numberphone.message}</p>
              </div>
            )}
          </div>

          <div className="col-lg-4 mb-1 col-sm-1">
            <input
              defaultValue={formatDate(userInfor.birthday)}
              {...register("birthday")}
              type="date"
            />
            {errors.birthday && (
              <div className="error-message">
                <p>{errors.birthday.message}</p>
              </div>
            )}
          </div>

          <div className="col-lg-4 mb-1 col-sm-12">
            <select
              placeholder={userInfor.gender ? "0" : "1"}
              id="gender"
              name="gender"
              {...register("gender")}
            >
              <option value="" disabled>
                Giới tính
              </option>
              <option value="0">NAM</option>
              <option value="1">NỮ</option>
            </select>

            {errors.gender && (
              <div className="error-message">
                <p>{errors.gender.message}</p>
              </div>
            )}
          </div>

          {isEditing ? (
            // Hiển thị `select` khi đang chỉnh sửa
            <div className="col-lg-4 mb-1 col-sm-12">
              <select
                className="col-lg-4 mb-1 col-sm-12"
                value={selectedProvince}
                onChange={handleProvinceChange}
                onBlur={() => setIsEditing(false)} // Quay lại chế độ `input` khi mất focus
              >
                <option value="">Chọn Tỉnh / Thành phố</option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            // Hiển thị `input` khi không chỉnh sửa
            <div className="col-lg-4 mb-1 col-sm-12">
              <input
                defaultValue={addressUser?.province}
                type="text"
                value={addressUser ? addressUser.province : "Tỉnh / thành phố"}
                readOnly
                onClick={handleInputClick}
                style={{ cursor: "pointer" }} // Thêm con trỏ chỉ tay để gợi ý rằng có thể nhấp vào
              />
            </div>
          )}

          {isDistrict ? (
            // Hiển thị `select` khi đang chỉnh sửa
            <div className="col-lg-4 mb-1 col-sm-12">
              <select
                className="col-lg-4 mb-1 col-sm-12"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                onBlur={() => setIsDistrict(false)} // Quay lại chế độ `input` khi mất focus
              >
                <option value="">Chọn Quận / Huyện</option>
                {districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            // Hiển thị `input` khi không chỉnh sửa
            <div className="col-lg-4 mb-1 col-sm-12">
              <input
                defaultValue={addressUser?.district}
                type="text"
                value={addressUser ? addressUser.district : "Quận / Huyện"}
                readOnly
                onClick={handleInputDistrictClick}
                style={{ cursor: "pointer" }} // Thêm con trỏ chỉ tay để gợi ý rằng có thể nhấp vào
              />
            </div>
          )}

          {isCommune ? (
            // Hiển thị `select` khi đang chỉnh sửa
            <div className="col-lg-4 mb-1 col-sm-12">
              <select
                className="col-lg-4 mb-1 col-sm-12"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                onBlur={() => setIsDistrict(false)} // Quay lại chế độ `input` khi mất focus
              >
                <option value="">Chọn Xã / Phường</option>
                {communes.map((commune) => (
                  <option key={commune.code} value={commune.code}>
                    {commune.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            // Hiển thị `input` khi không chỉnh sửa
            <div className="col-lg-4 mb-1 col-sm-12">
              <input
                defaultValue={addressUser?.commune}
                type="text"
                value={addressUser ? addressUser.commune : "Quận / Huyện"}
                readOnly
                onClick={handleInputCommuneClick}
                style={{ cursor: "pointer" }} // Thêm con trỏ chỉ tay để gợi ý rằng có thể nhấp vào
              />
            </div>
          )}

          {/* Textarea để thêm ghi chú */}
          <div style={{ marginTop: "20px" }}>
            <textarea
              defaultValue={addressUser.homeAddress}
              id="notes"
              value={notes}
              onChange={handleNotesChange}
              rows="4"
              cols="50"
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

          <div className="col-lg-3 mb-1 col-sm-12">
            <label htmlFor="workStatus">Trạng thái công việc</label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  id="working"
                  name="workStatus"
                  value="working"
                  {...register("isActive")}
                  defaultChecked={true}
                />
                <label htmlFor="working">Còn làm việc</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  id="retired"
                  name="workStatus"
                  value="retired"
                  {...register("isActive")}
                />
                <label htmlFor="retired">Đã nghỉ</label>
              </div>
            </div>
            {errors.isActive && (
              <p className="text-danger">{errors.isActive.message}</p>
            )}
          </div>

          <button type="submit" className="btn-outline-primary">
            CẬP NHẬT
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeUpdate;

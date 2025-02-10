import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./register.css";
import {
  faFacebookF,
  faGoogle,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as Yup from "yup";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Validation schema với Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("*Email không được để trống"),

    email: Yup.string()
      .email("*Username không hợp lệ")
      .required("*Username  không được để trống"),

    password: Yup.string()
      .required("*Mật khẩu không được để trống")
      .min(6, "*Mật khẩu phải ít nhất 6 ký tự"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "*Xác nhận mật khẩu không khớp")
      .required("*Xác nhận mật khẩu không được để trống"),

    fullname: Yup.string()
      .required("*Họ và tên không được để trống")
      .min(2, "*Họ và tên phải có ít nhất 2 ký tự"),

    gender: Yup.string(),

    birthday: Yup.date()
      .nullable() // Cho phép null
      .transform((value, originalValue) => {
        // Nếu giá trị gốc là chuỗi rỗng, chuyển thành null
        return originalValue === "" ? null : value;
      })
      .required("*Ngày sinh không được để trống")
      .test("age", "*Bạn phải từ 18 tuổi trở lên", (value) => {
        if (!value) return false; // Nếu không có giá trị, kiểm tra sẽ thất bại
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        return age > 18 || (age === 18 && m >= 0);
      }),

    numberPhone: Yup.string()
      .required("*Số điện thoại không được để trống")
      .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, "*Số điện thoại không hợp lệ"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gender: "male", // Mặc định là "male"
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log("Thông tin đăng nhập:", data);
    alert("*Đăng nhập thành công!");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (provider) => {
    alert(`Bạn đã chọn đăng nhập bằng ${provider}`);
    // Thêm logic xử lý đăng nhập tại đây
  };

  return (
    <div className="register">
      <img
        src="https://watermark.lovepik.com/photo/20211124/large/lovepik-fashion-womens-summer-shopping-image-picture_500961857.jpg"
        alt="background"
        className="background-image-register"
      />
      <div className="form-login">
        <h1>PTRAN-FASHION</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div className="row">
            <div className="col-lg-12 ">
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullname")}
              />
              {errors.fullname && (
                <div className="error-message">
                  <p>{errors.fullname.message}</p>
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 gender">
              <div className="category-gender">
                <input type="radio" value="female" {...register("gender")} />
                <p>Female</p>
              </div>

              <div className="category-gender">
                <input
                  type="radio"
                  value="male"
                  {...register("gender")}
                  defaultChecked // Đặt mặc định được chọn
                />
                <p>Male</p>
              </div>

              <div className="category-gender">
                <input type="radio" value="other" {...register("gender")} />
                <p>Other</p>
              </div>
            </div>
            <div className="col-lg-5 ">
              <input type="date" {...register("birthday")} />
              {errors.birthday && (
                <div className="error-message birthday">
                  <p>{errors.birthday.message}</p>
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <input
                type="text"
                placeholder="Email"
                {...register("username")}
              />
              {errors.email && (
                <div className="error-message">
                  <p>{errors.email.message}</p>
                </div>
              )}
            </div>

            <div className="col-lg-6">
              <input
                type="text"
                placeholder="Number phone"
                {...register("numberphone")}
              />
              {errors.numberPhone && (
                <div className="error-message">
                  <p>{errors.numberPhone.message}</p>
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <input
                type="text"
                placeholder="username"
                {...register("username")}
              />
              {errors.username && (
                <div className="error-message">
                  <p>{errors.username.message}</p>
                </div>
              )}
            </div>

            <div className="col-lg-12">
              <input
                type="text"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <div className="error-message">
                  <p>{errors.password.message}</p>
                </div>
              )}
            </div>

            <div className="col-lg-12">
              <input
                type="text"
                placeholder="Confirm Password"
                {...register("username")}
              />
              {errors.confirmPassword && (
                <div className="error-message">
                  <p>{errors.confirmPassword.message}</p>
                </div>
              )}
            </div>
          </div>

          <button type="submit">Register</button>
        </form>

        {/* Thêm liên kết "Quên mật khẩu" */}
      </div>
    </div>
  );
};
export default Register;

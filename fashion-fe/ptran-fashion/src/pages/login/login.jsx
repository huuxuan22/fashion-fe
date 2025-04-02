import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./login.css";
import {
  faFacebookF,
  faGoogle,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faZalo } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import * as loginService from "./../../service/login-service"
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Validation schema với Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Tên tài khoản không được để trống")
      .min(4, "Tên tài khoản phải ít nhất 4 ký tự"),
    password: Yup.string()
      .required("Mật khẩu không được để trống")
      .min(6, "Mật khẩu phải ít nhất 6 ký tự"),
  });

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit =async (data) => {
    await loginService.login(data).then((data) => {
      if (data.data.username) {
        setError("username", {
          type: "manual",
          message: data.data.username, // Gán thông báo lỗi từ API
        });
      } else if (data.data.password) {
        setError("password", {
          type: "manual",
          message: data.data.password, // Gán thông báo lỗi từ API
        });
      } else {
        localStorage.setItem()
      }

    })
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (provider) => {
    alert(`Bạn đã chọn đăng nhập bằng ${provider}`);
    // Thêm logic xử lý đăng nhập tại đây
  };

  return (
    <div className="image-overlay">
      <img
        src="https://watermark.lovepik.com/photo/20211124/large/lovepik-fashion-womens-summer-shopping-image-picture_500961857.jpg"
        alt="background"
        className="background-image"
      />
      <div className="form-login">
        <h1>PTRAN-FASHION</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div className="username-field">
            <input
              type="text"
              placeholder="Tài khoản"
              {...register("username")}
            />
            {errors.username && (
              <div className="error-message">
                <p>{errors.username.message}</p>
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="password-field">
            <div className="password-field-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                {...register("password")}
              />
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>
          </div>
          {errors.password && (
            <div className="error-message-password">
              <p>{errors.password.message}</p>
            </div>
          )}
          <button type="submit">Đăng Nhập</button>
        </form>
        <div className="forgot-password">
          <a href="/forgot-password" className="forgot-password-link">
            Quên mật khẩu?
          </a>
        </div>

        <div className="login-3rd">
          <button
            className="login-button"
            onClick={() => handleLogin("Gmail")}
            style={{ backgroundColor: "#db4437" }}
          >
            <FontAwesomeIcon icon={faGoogle} style={{ marginRight: "10px" }} />
            Google
          </button>

          <button
            className="login-button"
            onClick={() => handleLogin("Facebook")}
            style={{ backgroundColor: "#3b5998" }}
          >
            <FontAwesomeIcon
              icon={faFacebookF}
              style={{ marginRight: "10px" }}
            />
            Facebook
          </button>
          <button
            className="login-button"
            onClick={() => handleLogin("TikTok")}
            style={{ backgroundColor: "#000000" }}
          >
            <FontAwesomeIcon icon={faTiktok} style={{ marginRight: "10px" }} />
            TikTok
          </button>
        </div>

        {/* Liên hệ qua Zalo và Số điện thoại */}
        {/* Liên hệ qua Zalo và Số điện thoại */}
        <div className="contact-info">
          <div className="contact">
            <a
              href="https://zalo.me/your-zalo-id"
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Liên hệ qua Zalo !
            </a>
            
            <a href="tel:+849xxxxxxxx" className="contact-link">
              chat ngay với chúng tôi!
            </a>
          </div>
        </div>

        {/* Thêm liên kết "Quên mật khẩu" */}
        <p>
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import "./change-password.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as userService from "../../service/user-service";
import * as loginService from "./../../service/login-service";
import { Backdrop, CircularProgress } from "@mui/material";
import { currentUser } from './../../redux/User/Action';
const ChangePassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { users } = useSelector((store) => store);
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data) => {
    console.log(users);
    
    if (isSubmitting) return; // Ngăn không cho gửi nhiều lần
    setIsSubmitting(true); // Bắt đầu gửi
    try {
      const checkPassword = await userService.changePassword(
        token,
        data.oldPassword
      );
      if (checkPassword.success) {
        await loginService.sendCodeAgain(users.currentUser.email).then((dataCheck) => {
          navigate(`/verify-code`, {
            state: {
              account: {
                email: users.email,
                newPassword: data.newPassword,
              },
            },
          });
        });
      }
    } catch (error) {

    } finally {
      setIsSubmitting(false); // Kết thúc gửi
    }
  };

  // Validation schema với Yup
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required("Mật khẩu cũ không được để trống")
      .min(4, "Mật khẩu cũ phải ít nhất 4 ký tự"),

    newPassword: Yup.string()
      .required("Mật khẩu mới không được để trống")
      .min(6, "Mật khẩu mới phải ít nhất 6 ký tự")
      .matches(/[a-z]/, "Mật khẩu mới phải có ít nhất một ký tự thường (a-z)")
      .matches(/[A-Z]/, "Mật khẩu mới phải có ít nhất một ký tự viết hoa (A-Z)")
      .matches(/[0-9]/, "Mật khẩu mới phải có ít nhất một chữ số (0-9)")
      .matches(
        /[@$!%*?&#]/,
        "Mật khẩu mới phải có ít nhất một ký tự đặc biệt (@$!%*?&#)"
      ),

    confirmNewPassword: Yup.string()
      .required("Xác nhận mật khẩu không được để trống")
      .oneOf([Yup.ref("newPassword"), null], "Xác nhận mật khẩu không khớp"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="change-password">
      <img
        src="https://watermark.lovepik.com/photo/20211124/large/lovepik-fashion-womens-summer-shopping-image-picture_500961857.jpg"
        alt="background"
        className="background-image"
      />
      <div className="row form-change-password">
        <Link
          onClick={() => {
            navigate(-1);
          }}
          className="back-link mb-5"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Come back
        </Link>
        <h1>PTRAN-FASHION</h1>
        <div className="col-lg-6">
          <div className="col-lg-6">
            <div className="password-standards">
              <h3>Change Password</h3>
              <h6>Password must contain:</h6>

              {/* Mật khẩu phải có ít nhất một ký tự thường */}
              <div className="password-standard">
                <span className="icon">&#10003;</span> {/* Biểu tượng tick */}
                <p>At least one lowercase letter (a-z)</p>
              </div>

              {/* Mật khẩu phải có ít nhất một ký tự viết hoa */}
              <div className="password-standard">
                <span className="icon">&#10003;</span>
                <p>At least one uppercase letter (A-Z)</p>
              </div>

              {/* Mật khẩu phải có ít nhất một ký tự số */}
              <div className="password-standard">
                <span className="icon">&#10003;</span>
                <p>At least one numeric digit (0-9)</p>
              </div>

              {/* Mật khẩu phải có ít nhất một ký tự đặc biệt */}
              <div className="password-standard">
                <span className="icon">&#10003;</span>
                <p>At least one special character (!@#$%^&*)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Password Field */}
            <div className="password-field">
              <div className="password-field-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Old Password"
                  {...register("oldPassword")}
                />
                <span
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
            </div>
            {errors.oldPassword && (
              <div className="error-message-password">
                <p>{errors.oldPassword.message}</p>
              </div>
            )}

            {/* Password Field */}
            <div className="password-field">
              <div className="password-field-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  {...register("newPassword")}
                />
                <span
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
            </div>
            {errors.newPassword && (
              <div className="error-message-password">
                <p>{errors.newPassword.message}</p>
              </div>
            )}

            {/* Password Field */}
            <div className="password-field">
              <div className="password-field-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmNewPassword")}
                />
                <span
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
            </div>
            {errors.confirmNewPassword && (
              <div className="error-message-password">
                <p>{errors.confirmNewPassword.message}</p>
              </div>
            )}
            <button type="submit">Đăng Nhập</button>
          </form>
        </div>
      </div>

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        open={isSubmitting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ChangePassword;

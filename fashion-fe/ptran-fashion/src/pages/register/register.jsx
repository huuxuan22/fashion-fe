import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Google, Facebook } from "@mui/icons-material";
import { FaTiktok } from "react-icons/fa";
import * as loginService from "./../../service/login-service";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Backdrop } from "@mui/material";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  // Validation schema with Yup
  const validationSchema = Yup.object().shape({
    gender: Yup.string().required("Giới tính không được để trống"),
    numberphone: Yup.string()
      .required("Số điện thoại không được để trống")
      .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ"),

    fullName: Yup.string()
      .required("Họ và tên không được để trống")
      .min(2, "Họ và tên phải có ít nhất 2 ký tự"),

    birthday: Yup.date()
      .nullable()
      .transform((value, originalValue) => {
        // Kiểm tra và chuyển đổi giá trị thành Timestamp (định dạng dd-MM-yyyy)
        if (originalValue === "") return null; // Nếu không có giá trị, trả về null
        const formattedDate = new Date(originalValue);
        // Đảm bảo ngày sinh là trong quá khứ
        if (formattedDate >= new Date()) {
          return new Yup.ValidationError(
            "Ngày sinh phải là một ngày trong quá khứ"
          );
        }
        return formattedDate;
      })
      .required("Ngày sinh không được để trống")
      .test("age", "Bạn phải từ 18 tuổi trở lên", (value) => {
        if (!value) return false;
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        return age > 18 || (age === 18 && m >= 0);
      }),

    username: Yup.string()
      .required("Tên đăng nhập không được để trống")
      .min(5, "Tên đăng nhập phải có ít nhất 5 ký tự")
      .max(20, "Tên đăng nhập không được quá 20 ký tự"),

    password: Yup.string()
      .required("Mật khẩu không được để trống")
      .min(6, "Mật khẩu phải ít nhất 6 ký tự"),

    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Xác nhận mật khẩu không khớp")
      .required("Xác nhận mật khẩu không được để trống"),
  });

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái để theo dõi việc submit
  const formatBirthday = (birthday) => {
    const date = new Date(birthday);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Lưu ý: tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Định dạng dd-MM-yyyy
  };
  const onSubmit = async (data) => {
    const formattedBirthday = formatBirthday(data.birthday);
    data.birthday = formattedBirthday;
    if (isSubmitting) return; // Nếu đang submit, không cho phép submit lại
    setIsSubmitting(true); // Đặt trạng thái là đang submit
    try {
      console.log("đã đi vào đây");
      await loginService.register(data).then((data) => {
        if (!data.success) {
          if (data.data.fullName) {
            setError("fullName", {
              type: "manual",
              message: data.data.fullName, // Gán thông báo lỗi từ API
            });
          } else if (data.data.gender) {
            setError("gender", {
              type: "manual",
              message: data.data.gender, // Gán thông báo lỗi từ API
            });
          } else if (data.data.numberphone) {
            setError("numberphone", {
              type: "manual",
              message: data.data.numberphone, // Gán thông báo lỗi từ API
            });
          } else if (data.data.birthday) {
            setError("birthday", {
              type: "manual",
              message: data.data.birthday, // Gán thông báo lỗi từ API
            });
          } else if (data.data.password) {
            setError("password", {
              type: "manual",
              message: data.data.password, // Gán thông báo lỗi từ API
            });
          } else if (data.data.email) {
            setError("email", {
              type: "manual",
              message: data.data.email, // Gán thông báo lỗi từ API
            });
          } else if (data.data.username) {
            setError("username", {
              type: "manual",
              message: data.data.username, // Gán thông báo lỗi từ API
            });
          }
        } else {
          console.log("đã đi vào");
          navigate("/verify-code", { state: { userDTO: data.data } });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "url(https://watermark.lovepik.com/photo/20211124/large/lovepik-fashion-womens-summer-shopping-image-picture_500961857.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)",
        }}
      />

      {/* Form Container */}
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(5px)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="subtitle1" sx={{ color: "#2E7D32" }}>
              Đăng ký tài khoản
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Full Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  variant="outlined"
                  {...register("fullName")}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              </Grid>

              {/* Gender and Birthday */}
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" sx={{ color: "#2E7D32" }}>
                    Giới tính
                  </FormLabel>
                  <RadioGroup row>
                    <FormControlLabel
                      value="female"
                      control={
                        <Radio
                          sx={{ color: "#2E7D32" }}
                          {...register("gender")}
                        />
                      }
                      label="Nữ"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="male"
                      control={
                        <Radio
                          sx={{ color: "#2E7D32" }}
                          defaultChecked
                          {...register("gender")}
                        />
                      }
                      label="Nam"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                  {errors.gender && (
                    <Typography variant="caption" color="error">
                      {errors.gender.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ngày sinh"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...register("birthday")}
                  error={!!errors.birthday}
                  helperText={errors.birthday?.message}
                />
              </Grid>

              {/* Email and Phone */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  variant="outlined"
                  {...register("numberphone")}
                  error={!!errors.numberphone}
                  helperText={errors.numberphone?.message}
                />
              </Grid>

              {/* Username */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  {...register("username")}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Mật khẩu"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePassword}
                          edge="end"
                          sx={{ color: "#2E7D32" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Confirm Password */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Xác nhận mật khẩu"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleToggleConfirmPassword}
                          edge="end"
                          sx={{ color: "#2E7D32" }}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  variant="contained"
                  sx={{
                    py: 2,
                    backgroundColor: "#2E7D32",
                    "&:hover": { backgroundColor: "#1B5E20" },
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Đăng ký"
                  )}
                </Button>
              </Grid>

              {/* Social Login */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }}>Hoặc đăng nhập bằng</Divider>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                  <IconButton
                    onClick={() => alert("Đăng nhập bằng Google")}
                    sx={{ color: "#DB4437", border: "1px solid #DB4437" }}
                  >
                    <Google />
                  </IconButton>
                  <IconButton
                    onClick={() => alert("Đăng nhập bằng Facebook")}
                    sx={{ color: "#4267B2", border: "1px solid #4267B2" }}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton
                    onClick={() => alert("Đăng nhập bằng TikTok")}
                    sx={{ color: "#000", border: "1px solid #000" }}
                  >
                    <FaTiktok />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
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
    </Box>
  );
};

export default Register;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Avatar,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as userServiceRedux from "./../redux/User/Action";
import * as userService from "./../service/user-service";
const Profile = () => {
  const primaryColor = "#005244";
  const lightPrimary = "#e0f2f1";
  const token = localStorage.getItem("token");
  const { users } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState({
    email: false,
    phone: false,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation Schema
  const validationSchema = yup.object({
    fullName: yup.string().required("Họ tên là bắt buộc"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    numberphone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số")
      .required("Số điện thoại là bắt buộc"),
    gender: yup.boolean().required("Giới tính là bắt buộc"),
    birthday: yup.object({
      day: yup.number().required("Ngày là bắt buộc"),
      month: yup.number().required("Tháng là bắt buộc"),
      year: yup.number().required("Năm là bắt buộc"),
    }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      numberphone: "",
      gender: true,
      birthday: {
        day: "",
        month: "",
        year: "",
      },
    },
  });

  const loadData = async () => {
    await dispatch(userServiceRedux.currentUser(token));
  };

  useEffect(() => {
    loadData();
  }, []);

  const user = users.currentUser;

  // Reset form when user data is loaded
  useEffect(() => {
    if (user) {
      reset({
        fullName: user?.fullName || "",
        email: user?.email || "",
        numberphone: user?.numberphone || "",
        gender: user?.gender ?? true,
        birthday: {
          day: user?.birthday ? new Date(user.birthday).getDate() : "",
          month: user?.birthday ? new Date(user.birthday).getMonth() + 1 : "",
          year: user?.birthday ? new Date(user.birthday).getFullYear() : "",
        },
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log("Dữ lieuej đâynè: ", data);

    try {
      // Create FormData object
      const formData = new FormData();

      // Add all fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (key === "birthday") {
          // Convert to LocalDateTime string in format "yyyy-MM-ddTHH:mm:ss"
          const localDateTime = `${value.year}-${String(value.month).padStart(
            2,
            "0"
          )}-${String(value.day).padStart(2, "0")}T00:00:00`;
          formData.append("birthday", localDateTime);
        } else {
          formData.append(key, value);
        }
      });

      // Add image if selected
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      formData.append("gender", data.gender);

      await userService.updateUser(formData, token).then((data) => {
        console.log(data.data);

        if (data.data.status) {
          setSnackbar({
            open: true,
            message: "Cập nhật thông tin thành công",
            severity: "success",
          });
        }
      });
      await loadData();

      // Reload data
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Cập nhật thông tin thất bại",
        severity: "error",
      });
      console.error("Update profile error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image
      if (file.size > 1024 * 1024) {
        setSnackbar({
          open: true,
          message: "Ảnh không được vượt quá 1MB",
          severity: "error",
        });
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setSnackbar({
          open: true,
          message: "Chỉ chấp nhận ảnh định dạng JPEG hoặc PNG",
          severity: "error",
        });
        return;
      }

      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEditToggle = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ "& .MuiPaper-root": { borderRadius: 2 } }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%", boxShadow: 3 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          bgcolor: "background.paper",
          boxShadow: "0px 8px 24px rgba(0, 82, 68, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: primaryColor,
            mb: 1,
            letterSpacing: 0.5,
          }}
        >
          Hồ Sơ Của Tôi
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            {/* Avatar Section */}
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={previewImage ? previewImage : (user?.imgUrl ? "http://localhost:8080/image/user/" + user.imgUrl : undefined)}
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: primaryColor,
                    mb: 2,
                    fontSize: "2.5rem",
                    border: `3px solid ${lightPrimary}`,
                    boxShadow: 3,
                  }}
                >
                  {user?.fullName?.charAt(0) || "U"}
                </Avatar>

                <input
                  accept="image/jpeg,image/png"
                  style={{ display: "none" }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="avatar-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    sx={{
                      color: primaryColor,
                      borderColor: primaryColor,
                      mb: 1,
                      px: 3,
                      py: 0.8,
                      borderRadius: 2,
                      "&:hover": {
                        bgcolor: `${primaryColor}15`,
                        borderColor: primaryColor,
                      },
                    }}
                  >
                    Chọn ảnh
                  </Button>
                </label>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  align="center"
                >
                  Dụng lượng tối đa 1MB
                  <br />
                  Định dạng: JPEG, PNG
                </Typography>
              </Box>
            </Grid>

            {/* Form Section */}
            <Grid item xs={12} sm={8}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: "text.primary", fontWeight: 600 }}
                >
                  Tên đăng nhập
                </Typography>
                <TextField
                  value={user?.username || ""}
                  fullWidth
                  size="small"
                  disabled
                  sx={{
                    "& .MuiInputBase-input": { py: 1.2, fontSize: "0.9rem" },
                    "& .Mui-disabled": { bgcolor: "action.hover" },
                  }}
                  helperText="Tên đăng nhập không thể thay đổi"
                  FormHelperTextProps={{ sx: { fontSize: "0.75rem", mt: 0.5 } }}
                />
              </Box>

              {/* Các trường form<TextField
                  value={user?.username || ""}
                  fullWidth
                  size="small"
                  disabled
                  sx={{
                    "& .MuiInputBase-input": { py: 1, fontSize: "0.875rem" },
                  }}
                  helperText="Tên Đăng nhập chỉ có thể thay đổi một lần."
                  FormHelperTextProps={{ sx: { fontSize: "0.7rem", mt: 0.5 } }}
                />
              </Box>

              {/* Name */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  sx={{ mb: 0.5, color: primaryColor, fontWeight: "bold" }}
                >
                  Tên
                </Typography>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                      placeholder="Nhập tên của bạn"
                      fullWidth
                      size="small"
                      sx={{
                        "& .MuiInputBase-input": {
                          py: 1,
                          fontSize: "0.875rem",
                        },
                      }}
                    />
                  )}
                />
              </Box>

              {/* Email */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  sx={{ mb: 0.5, color: primaryColor, fontWeight: "bold" }}
                >
                  Email
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                        size="small"
                        disabled={!editMode.email}
                        sx={{
                          mr: 1,
                          "& .MuiInputBase-input": {
                            py: 1,
                            fontSize: "0.875rem",
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => handleEditToggle("email")}
                                edge="end"
                              >
                                {editMode.email ? (
                                  <CloseIcon fontSize="small" />
                                ) : (
                                  <EditIcon fontSize="small" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>

              {/* Phone */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  sx={{ mb: 0.5, color: primaryColor, fontWeight: "bold" }}
                >
                  Số điện thoại
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Controller
                    name="numberphone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        error={!!errors.numberphone}
                        helperText={errors.numberphone?.message}
                        fullWidth
                        size="small"
                        disabled={!editMode.phone}
                        sx={{
                          mr: 1,
                          "& .MuiInputBase-input": {
                            py: 1,
                            fontSize: "0.875rem",
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => handleEditToggle("phone")}
                                edge="end"
                              >
                                {editMode.phone ? (
                                  <CloseIcon fontSize="small" />
                                ) : (
                                  <EditIcon fontSize="small" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>

              {/* Gender */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  sx={{ mb: 0.5, color: primaryColor, fontWeight: "bold" }}
                >
                  Giới tính
                </Typography>
                <FormControl>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        row
                        sx={{ mt: 0.5 }}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value === "true")
                        }
                      >
                        <FormControlLabel
                          value={true}
                          control={
                            <Radio size="small" sx={{ color: primaryColor }} />
                          }
                          label={<Typography variant="body2">Nam</Typography>}
                          sx={{ mr: 1 }}
                        />
                        <FormControlLabel
                          value={false}
                          control={
                            <Radio size="small" sx={{ color: primaryColor }} />
                          }
                          label={<Typography variant="body2">Nữ</Typography>}
                          sx={{ mr: 1 }}
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Box>

              {/* Birthday */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="caption"
                  sx={{ mb: 0.5, color: primaryColor, fontWeight: "bold" }}
                >
                  Ngày sinh
                </Typography>
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Controller
                    name="birthday.day"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        size="small"
                        SelectProps={{ native: true }}
                        {...field}
                        error={!!errors.birthday?.day}
                        sx={{
                          flex: 1,
                          "& .MuiSelect-select": {
                            py: 1,
                            fontSize: "0.875rem",
                          },
                        }}
                      >
                        <option value="">Ngày</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                          (day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          )
                        )}
                      </TextField>
                    )}
                  />
                  <Controller
                    name="birthday.month"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        size="small"
                        SelectProps={{ native: true }}
                        {...field}
                        error={!!errors.birthday?.month}
                        sx={{
                          flex: 1,
                          "& .MuiSelect-select": {
                            py: 1,
                            fontSize: "0.875rem",
                          },
                        }}
                      >
                        <option value="">Tháng</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          )
                        )}
                      </TextField>
                    )}
                  />
                  <Controller
                    name="birthday.year"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        size="small"
                        SelectProps={{ native: true }}
                        {...field}
                        error={!!errors.birthday?.year}
                        sx={{
                          flex: 1,
                          "& .MuiSelect-select": {
                            py: 1,
                            fontSize: "0.875rem",
                          },
                        }}
                      >
                        <option value="">Năm</option>
                        {Array.from(
                          { length: 100 },
                          (_, i) => new Date().getFullYear() - i
                        ).map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </TextField>
                    )}
                  />
                </Box>
                {errors.birthday?.day ||
                errors.birthday?.month ||
                errors.birthday?.year ? (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ fontSize: "0.75rem", mt: 0.5, display: "block" }}
                  >
                    Vui lòng chọn đầy đủ ngày tháng năm sinh
                  </Typography>
                ) : null}
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  bgcolor: primaryColor,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  "&:hover": { bgcolor: "#003d33" },
                  mt: 2,
                  boxShadow: "none",
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "LƯU THAY ĐỔI"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Profile;

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Avatar,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import * as adminService from "./../service/admin-service";
import { Token } from "@mui/icons-material";
import SuccessNotification from "./SuccessNotification";

// Validation schema
const couponSchema = yup.object().shape({
  couponCode: yup
    .string()
    .required("Vui lòng nhập mã giảm giá"),
  discountType: yup
    .string()
    .required("Vui lòng chọn loại giảm giá"),
  discountValue: yup
    .number()
    .typeError("Giá trị giảm giá phải là một số")
    .positive("Giá trị giảm giá phải lớn hơn 0")
    .required("Vui lòng nhập giá trị giảm giá"),
  startTime: yup
    .date()
    .required("Vui lòng chọn ngày bắt đầu")
    .nullable(),
  endTime: yup
    .date()
    .required("Vui lòng chọn ngày kết thúc")
    .nullable()
    .min(yup.ref("startTime"), "Ngày kết thúc phải sau ngày bắt đầu"),
  usageLimit: yup
    .number()
    .typeError("Số lượt sử dụng phải là một số")
    .integer("Số lượt sử dụng phải là số nguyên")
    .positive("Số lượt sử dụng phải lớn hơn 0")
    .required("Vui lòng nhập số lượt sử dụng"),
  couponStatus: yup
    .string()
    .required("Vui lòng chọn trạng thái"),
  imageUrl: yup
    .mixed()
    .test("fileSize", "Kích thước tệp quá lớn (tối đa 2MB)", (value) => {
      if (value) {
        return value.size <= 2000000; // 2MB
      }
      return true;
    })
    .test("fileType", "Tệp phải là hình ảnh (jpg, jpeg, png, gif)", (value) => {
      if (value) {
        return ["image/jpeg", "image/png", "image/gif", "image/jpg"].includes(value.type);
      }
      return true;
    })
    .nullable(),
});
const token = localStorage.getItem("token");
const CreateCoupon = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(couponSchema),
    defaultValues: {
      couponCode: "",
      discountType: "",
      discountValue: "",
      startTime: null,
      endTime: null,
      usageLimit: "",
      couponStatus: "Active",
      imageUrl: null,
    },
  });
  const [open,setOpen] = useState((false));
  const selectedImage = watch("imageUrl");
  const discountType = watch("discountType");
  const onClose = () => {
    setOpen(false);
  }
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setValue("imageUrl", event.target.files[0]);
    } else {
      setValue("imageUrl", null);
    }
  };

  const removeImage = () => {
    setValue("imageUrl", null);
  };

  const onSubmit =async (data) => {
    const formData = new FormData();
    
    // Thêm các trường dữ liệu vào FormData
    formData.append("couponCode", data.couponCode);
    formData.append("discountType", data.discountType);
    formData.append("discountValue", data.discountValue);
    formData.append("startTime", data.startTime.toISOString());
    formData.append("endTime", data.endTime.toISOString());
    formData.append("usageLimit", data.usageLimit);
    formData.append("couponStatus", data.couponStatus);
    
    // Chỉ thêm hình ảnh nếu có
    if (data.imageUrl) {
      formData.append("imageUrl", data.imageUrl);
    }
    
    console.log("Dữ liệu coupon:", Object.fromEntries(formData));
    
    // Gửi formData đến API
    // axios.post('/api/coupons', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // }).then(response => {
    //   console.log('Thành công:', response);
    // }).catch(error => {
    //   console.error('Lỗi:', error);
    // });
    await adminService.createCoupon(formData,token).then((data) => {
      setOpen(true);
      reset({
        couponCode: "",
        discountType: "",
        discountValue: "",
        startTime: null,
        endTime: null,
        usageLimit: "",
        couponStatus: "Active",
        imageUrl: null,
      });
    })
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: 7, display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={3}
          sx={{ p: 3, border: "1px solid #008772", borderRadius: "8px", maxWidth: 850 }}
        >
          <Typography
            variant="h5"
            component="h1"
            gutterBottom
            sx={{ mb: 2, color: "#008772", fontWeight: "bold", textAlign: "center" }}
          >
            Tạo mã giảm giá
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="couponCode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Mã giảm giá"
                      variant="outlined"
                      error={!!errors.couponCode}
                      helperText={errors.couponCode?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.discountType}>
                  <InputLabel>Loại giảm giá</InputLabel>
                  <Controller
                    name="discountType"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="Loại giảm giá">
                        <MenuItem value="PERCENTAGE">Phần trăm (%)</MenuItem>
                        <MenuItem value="FIXED_AMOUNT">Số tiền cố định (₫)</MenuItem>
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors.discountType?.message}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="discountValue"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Giá trị giảm giá"
                      type="number"
                      variant="outlined"
                      error={!!errors.discountValue}
                      helperText={errors.discountValue?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {discountType === "PERCENTAGE" ? "%" : "₫"}
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field }) => (
                    <DateTimePicker
                      label="Ngày bắt đầu"
                      {...field}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!errors.startTime}
                          helperText={errors.startTime?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="endTime"
                  control={control}
                  render={({ field }) => (
                    <DateTimePicker
                      label="Ngày kết thúc"
                      {...field}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!errors.endTime}
                          helperText={errors.endTime?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="usageLimit"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Số lượt sử dụng"
                      type="number"
                      variant="outlined"
                      error={!!errors.usageLimit}
                      helperText={errors.usageLimit?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.couponStatus}>
                  <InputLabel>Trạng thái</InputLabel>
                  <Controller
                    name="couponStatus"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="Trạng thái">
                        <MenuItem value="Active">Kích hoạt</MenuItem>
                        <MenuItem value="Inactive">Vô hiệu hóa</MenuItem>
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors.couponStatus?.message}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="coupon-image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="coupon-image-upload">
                  <Button variant="outlined" component="span" fullWidth>
                    Tải lên hình ảnh (tùy chọn)
                  </Button>
                </label>
                {errors.imageUrl && (
                  <FormHelperText error>{errors.imageUrl.message}</FormHelperText>
                )}
                {selectedImage && (
                  <Box mt={2} display="flex" flexDirection="column" alignItems="center">
                    <Avatar
                      src={URL.createObjectURL(selectedImage)}
                      alt="Xem trước hình ảnh"
                      sx={{ width: 150, height: 150 }}
                      variant="rounded"
                    />
                    <Button 
                      color="error" 
                      onClick={removeImage}
                      sx={{ mt: 1 }}
                    >
                      Xóa hình ảnh
                    </Button>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#008772",
                    "&:hover": {
                      backgroundColor: "#00695f",
                    },
                    py: 1.5,
                    fontSize: "1rem",
                  }}
                >
                  TẠO MÃ GIẢM GIÁ
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        {open && (<SuccessNotification 
          open = {open}
          onClose={onClose}
          message={"Đã tạo 1 mã giảm giá"}
        />)}
      </Box>
    </LocalizationProvider>
  );
};

export default CreateCoupon;
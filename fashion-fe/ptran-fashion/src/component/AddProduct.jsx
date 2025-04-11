import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  MenuItem,
  Paper,
  Avatar,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // Validation schema
  IconButton,
  Backdrop,
  Alert,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloudUpload, Cancel, Delete } from "@mui/icons-material";
import * as categoryServie from "./../service/category-service";
import * as colorService from "../service/color-size-service";
import * as productService from "./../service/admin-service";
import { Snackbar, SnackbarContent } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
// Validation schema
const productSchema = yup.object().shape({
  productName: yup.string().required("Title is required").default(""),
  description: yup.string().required("Description is required").default(""),
  mrpPrice: yup
    .number()
    .typeError("MRP must be a number")
    .positive("MRP must be positive")
    .required("MRP is required")
    .default(""),
  sellingPrice: yup
    .number()
    .default("")
    .typeError("Selling price must be a number")
    .positive("Selling price must be positive")
    .required("Selling price is required"),
  category: yup.string().required("Category is required"),
  secondCategory: yup.string(),
});

// Size options

const AddProduct = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const token = localStorage.getItem("token");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [variants, setVariants] = useState([]);
  const [currentVariant, setCurrentVariant] = useState({
    color: {},
    size: {},
    quantity: 1,
  });
  const [categoryId, setCategoryId] = useState("");
  const [checkCate, setCheckCate] = useState(false);
  const fileInputRef = useRef();

  const {
    register,
    setValue,
    setError,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      productName: "", // Giá trị mặc định
      description: "", // Giá trị mặc định
      // ... các field khác
    },
  });
  useEffect(() => {
    if (categoryId) {
      console.log("Current categoryId:", categoryId); // Kiểm tra giá trị categoryId
      loadAllSubCate(categoryId);
    }
  }, [categoryId]);
  useEffect(() => {
    loadAllCategory();
    loadAllColor();
    loadAllSize();
  }, []);
  useEffect(() => {
    loadAllCategory();
  }, [checkCate]);
  const loadAllCategory = async () => {
    await categoryServie.getAllCategory(token).then((data) => {
      setCategories(data.data);
    });
  };
  const loadAllColor = async () => {
    await colorService.getAllColor(token).then((data) => {
      setColors(data.data);
    });
  };
  const loadAllSize = async () => {
    await colorService.getAllSize(token).then((data) => {
      setSizes(data.data);
    });
  };
  const loadAllSubCate = async (id) => {
    try {
      const response = await categoryServie.getAllSubCateByCateId(token, id);
      // Kiểm tra và đảm bảo dữ liệu là mảng
      const data = Array.isArray(response?.data) ? response.data : [];
      console.log("Subcategories data:", data);
      setSubCategories(data);
    } catch (error) {
      console.error("Error loading subcategories:", error);
      setSubCategories([]); // Luôn đảm bảo là mảng
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Lưu cả File object và preview URL
      const newFiles = files.map((file) => ({
        file, // Lưu File object nguyên bản
        preview: URL.createObjectURL(file), // Tạo URL để preview
      }));

      setImagePreviews((prev) => [...prev, ...newFiles]);
    }
  };

  const removeImage = (index) => {
    // Giải phóng URL tạo ra trước đó
    URL.revokeObjectURL(imagePreviews[index].preview);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;

    if (name === "color") {
      const selectedColor = colors.find((c) => c.colorId === value);
      setCurrentVariant((prev) => ({
        ...prev,
        [name]: selectedColor || {}, // Lưu cả đối tượng color
      }));
    } else if (name === "size") {
      const selectedSize = sizes.find((s) => s.sizeId === value);
      setCurrentVariant((prev) => ({
        ...prev,
        [name]: selectedSize || {}, // Lưu cả đối tượng size nếu cần
      }));
    } else {
      setCurrentVariant((prev) => ({
        ...prev,
        [name]: name === "quantity" ? parseInt(value) || 0 : value,
      }));
    }
  };

  const addVariant = () => {
    if (
      !currentVariant.color?.colorId || // Kiểm tra colorId trong đối tượng color
      !currentVariant.size?.sizeId || // Kiểm tra sizeId trong đối tượng size
      currentVariant.quantity <= 0
    ) {
      return;
    }

    const variantExists = variants.some(
      (v) =>
        v.color.colorId === currentVariant.color.colorId &&
        v.size.sizeId === currentVariant.size.sizeId
    );

    if (!variantExists) {
      setVariants((prev) => [...prev, currentVariant]);
      setCurrentVariant({
        color: {},
        size: {},
        quantity: 1,
      });
    }
  };

  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    return () => {
      // Dọn dẹp các object URL khi component unmount
      imagePreviews.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, [imagePreviews]);
  const onSubmit = async (data) => {
    if (variants.length === 0) {
      alert("Please add at least one variant");
      return;
    }
    // 1. Chuẩn bị dữ liệu
    const characters = variants.map((variant) => ({
      quality: variant.quantity,
      colorId: variant.color?.colorId,
      sizeId: variant.size?.sizeId,
    }));

    const productDTO = {
      productName: data.productName,
      description: data.description,
      price: data.mrpPrice,
      sellPrice: data.sellingPrice,
      subCategories: data.secondCategory,
      isActive: true,
      characters: characters,
    };

    // 2. Tạo FormData
    const formData = new FormData();
    formData.append(
      "productDTO",
      new Blob([JSON.stringify(productDTO)], {
        type: "application/json",
      })
    );

    // 4. Thêm từng file ảnh (tên field phải khớp với @RequestPart ở backend)
    imagePreviews.forEach((item) => {
      formData.append("listFile", item.file); // Gửi File object thực sự
    });
    setOpenBackdrop(true); // Mở backdrop loading
    setIsSubmitting(true);
    // 5. Gửi request
    try {
      const data = await productService.addProduct(formData, token);
      if (!data.success) {
        if (data.data.productName) {
          setError("productName", {
            type: "manual",
            message: data.data.productName,
          });
        }
        if (data.data.description) {
          setError("description", {
            type: "manual",
            message: data.data.description,
          });
        }
        if (data.data.price) {
          setError("mrpPrice", {
            type: "manual",
            message: data.data.price,
          });
        }
        if (data.data.sellPrice) {
          setError("sellingPrice", {
            type: "manual",
            message: data.data.sellPrice,
          });
        }
        if (data.data.subCategories) {
          setError("secondCategory", {
            type: "manual",
            message: data.data.subCategories,
          });
        } else {
          console.log("đã đi vào đây 2");

          setErrorMessage(data.data);
          setShowError(true);
        }
      } else {
        // Reset form và trạng thái
        setImagePreviews([]);
        setVariants([]);
        setCurrentVariant({
          color: {},
          size: {},
          quantity: 0,
        });
        setCategoryId("");
        setCheckCate(true);
        setSubCategories([]); // Reset subcategories
        fileInputRef.current.value = null; // Reset file input
        toast.success("Product added successfully!");
        setValue("productName", ""); // Reset giá trị của productName
        setValue("description", ""); // Reset giá trị của description
        setValue("mrpPrice", ""); // Reset giá trị của mrpPrice
        setValue("sellingPrice", ""); // Reset giá trị của sellingPrice
        setValue("secondCategory", ""); // Reset giá trị của secondCategory
        setValue("category", ""); // Reset giá trị của category
      }
    } catch (error) {
      // Xử lý lỗi tại đây
    } finally {
      setCheckCate(true);
      setOpenBackdrop(false); // Tắt backdrop loading
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowError(false); // Đóng Snackbar
  };
  // Teal color theme
  const tealColor = "#007160";
  const hoverTealColor = "#005a4a";
  const handleCategoryChange = (event) => {
    const newCategoryId = event.target.value;
    setCategoryId(newCategoryId);
    // Gọi trực tiếp hàm load sau khi set state
    if (newCategoryId) {
      loadAllSubCate(newCategoryId);
    } else {
      setSubCategories([]); // Reset nếu không có categoryId
    }
  };

  return (
    <Box
      component={Paper}
      sx={{ maxWidth: "md", mx: "auto", p: 4, boxShadow: 3 }}
    >
      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Backdrop
        sx={{
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền với độ trong suốt
          zIndex: 9999, // Đảm bảo hiển thị trên tất cả các phần tử khác
          // Các thuộc tính khác
        }}
        open={openBackdrop}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Đang xử lý...
          </Typography>
        </Box>
      </Backdrop>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", color: tealColor }}
      >
        Add New Product
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Image Upload */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{ mb: 1, color: "text.secondary" }}
          >
            Product Images *
          </Typography>

          {/* Image Previews */}
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", mb: 2 }}>
            {imagePreviews.map((item, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <Avatar
                  src={item.preview} // Sử dụng preview URL
                  variant="rounded"
                  sx={{
                    width: 100,
                    height: 100,
                    border: `1px solid ${tealColor}`,
                  }}
                />
                <Chip
                  icon={<Cancel />}
                  size="small"
                  onClick={() => removeImage(index)}
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    backgroundColor: "error.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "error.dark",
                    },
                  }}
                />
              </Box>
            ))}
          </Stack>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            multiple
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            startIcon={<CloudUpload />}
            onClick={() => fileInputRef.current?.click()}
            sx={{
              color: tealColor,
              borderColor: tealColor,
              "&:hover": {
                borderColor: hoverTealColor,
                backgroundColor: "rgba(0, 113, 96, 0.04)",
              },
            }}
          >
            Upload Images (Multiple)
          </Button>

          {/* Show error message if there's an error */}
          {showError && errorMessage && (
            <Typography
              variant="caption"
              color="error"
              sx={{
                display: "block",
                mt: 1,
                fontWeight: "bold",
                fontSize: "0.875rem",
                color: "red",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                padding: "5px",
                borderRadius: "4px",
              }}
            >
              {errorMessage}
            </Typography>
          )}

          {/* Show warning when no images are uploaded */}
          {imagePreviews.length === 0 && !showError && (
            <Typography
              variant="caption"
              color="error"
              sx={{ display: "block", mt: 1 }}
            >
              Please upload at least one image
            </Typography>
          )}
        </Box>

        {/* Title */}
        <TextField
          label="productName *"
          fullWidth
          margin="normal"
          {...register("productName")}
          error={!!errors.productName}
          helperText={errors.productName?.message}
          sx={{
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: tealColor,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: tealColor,
            },
          }}
        />
        {/* Description */}
        <TextField
          label="Description *"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          sx={{
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: tealColor,
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: tealColor,
            },
          }}
        />
        {/* Price Row */}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* MRP Price */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="MRP Price *"
              fullWidth
              margin="normal"
              type="number"
              {...register("mrpPrice")}
              error={!!errors.mrpPrice}
              helperText={errors.mrpPrice?.message}
              sx={{
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: tealColor,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: tealColor,
                },
              }}
            />
          </Grid>

          {/* Selling Price */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Selling Price *"
              fullWidth
              margin="normal"
              type="number"
              {...register("sellingPrice")}
              error={!!errors.sellingPrice}
              helperText={errors.sellingPrice?.message}
              sx={{
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: tealColor,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: tealColor,
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Variants Section */}
        <Box sx={{ mt: 3, mb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, color: "text.secondary" }}
          >
            Product Variants *
          </Typography>

          <Grid container spacing={2}>
            {/* Color */}
            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Color *"
                fullWidth
                value={currentVariant.color?.colorId || ""} // Lấy colorId từ đối tượng color
                onChange={handleVariantChange}
                name="color"
              >
                <MenuItem value="">Select color</MenuItem>
                {colors?.length > 0 ? (
                  colors?.map((color) => (
                    <MenuItem
                      key={color.colorId}
                      value={color.colorId}
                      style={{ fontSize: "16px", color: "black" }}
                    >
                      {color.colorName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Loading...</MenuItem>
                )}
              </TextField>
            </Grid>

            {/* Size */}
            <Grid item xs={12} sm={3}>
              <TextField
                select
                label="Size *"
                fullWidth
                value={currentVariant.size?.sizeId || ""} // Lấy sizeId từ đối tượng size
                onChange={handleVariantChange}
                name="size"
              >
                <MenuItem value="">Select size</MenuItem>
                {sizes?.map((size) => (
                  <MenuItem key={size?.sizeId} value={size?.sizeId}>
                    {size?.nameSize}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Quantity */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="Quantity *"
                fullWidth
                type="number"
                value={currentVariant.quantity}
                onChange={handleVariantChange}
                name="quantity"
                inputProps={{ min: 1 }}
              />
            </Grid>

            {/* Add Button */}
            <Grid
              item
              xs={12}
              sm={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Button
                variant="contained"
                onClick={addVariant}
                sx={{
                  backgroundColor: tealColor,
                  "&:hover": {
                    backgroundColor: hoverTealColor,
                  },
                  height: "56px", // Match text field height
                  width: "100%",
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>

          {/* Variants Table */}
          {variants.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Color</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {variants.map((variant, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {variant.color.colorName || variant.color.colorId}
                      </TableCell>
                      <TableCell>
                        {variant.size.nameSize || variant.size.sizeId}
                      </TableCell>
                      <TableCell>{variant.quantity}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => removeVariant(index)}>
                          <Delete color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>

        {/* Categories */}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* Category */}
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Category *"
              fullWidth
              margin="normal"
              {...register("category")}
              error={!!errors.category}
              helperText={errors.category?.message}
              sx={{
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: tealColor,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: tealColor,
                },
              }}
              onChange={handleCategoryChange}
            >
              <MenuItem value="">Select category</MenuItem>
              {categories?.map((category) => (
                <MenuItem
                  key={category.categorieId}
                  value={category.categorieId}
                >
                  {category.categoriesName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Second Category */}
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Second Category"
              fullWidth
              margin="normal"
              {...register("secondCategory")}
            >
              <MenuItem value="">Select sub category</MenuItem>
              {Array.isArray(subCategories) && subCategories.length > 0 ? (
                subCategories.map((subcategory) => (
                  <MenuItem
                    key={subcategory.subCategoryId}
                    value={subcategory.subCategoryId}
                  >
                    {subcategory.subCategoryName}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>
                  {categoryId ? "Loading..." : "Select a category first"}
                </MenuItem>
              )}
            </TextField>
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box sx={{ mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={imagePreviews.length === 0 || variants.length === 0}
            sx={{
              py: 1.5,
              backgroundColor: tealColor,
              "&:hover": {
                backgroundColor: hoverTealColor,
              },
              "&:disabled": {
                backgroundColor: "grey.400",
              },
            }}
          >
            ADD PRODUCT
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddProduct;

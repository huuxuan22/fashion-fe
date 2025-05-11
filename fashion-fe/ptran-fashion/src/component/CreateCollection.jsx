import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Avatar,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
  ListItemAvatar,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SearchIcon from "@mui/icons-material/Search";
import { keyframes } from "@emotion/react";
import * as productService from "./../service/product-service";
import * as adminService from "./../service/admin-service";
import SuccessNotification from './SuccessNotification';

// Hiệu ứng rung khi validate lỗi
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const CreateCollectionPage = () => {
  // State chính
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const loadData = async () => {
    await adminService
      .searchProduct({ token: token, searchTerm: searchTerm })
      .then((data) => {
        setProducts(data.data);
      });
  };

  const onClose = () => {
    setOpen(false);
  };

  // Hiệu ứng rung khi có lỗi
  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  useEffect(() => {
    setProducts([]);
  }, []);

  useEffect(() => {
    loadData();
  }, [searchTerm]);

  // Tìm kiếm sản phẩm
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
  };

  // Chọn/bỏ chọn sản phẩm
  const handleProductSelect = (product) => {
    const isSelected = selectedProducts.some((p) => p.productId === product.productId);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  // Xử lý upload ảnh
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
  
    if (!file) {
      alert("Không có tệp nào được chọn.");
      return;
    }
  
    if (!(file instanceof Blob)) {
      alert("Tệp không hợp lệ.");
      return;
    }
  
    setImageFile(file);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Vui lòng nhập tên bộ sưu tập";
    if (!description) newErrors.description = "Vui lòng nhập mô tả";
    if (!startDate) newErrors.startDate = "Vui lòng chọn ngày bắt đầu";
    if (!endDate) newErrors.endDate = "Vui lòng chọn ngày kết thúc";
    if (startDate && endDate && startDate > endDate) {
      newErrors.endDate = "Ngày kết thúc phải sau ngày bắt đầu";
    }
    if (selectedProducts.length === 0)
      newErrors.products = "Vui lòng chọn ít nhất 1 sản phẩm";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShake(true);
      return false;
    }
    return true;
  };

  // Submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const productIds = selectedProducts
      .filter((p) => p.productId)
      .map((p) => p.productId);
      
    if (validateForm()) {
      const formData = new FormData();
      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }
      const start = new Date(startDate).toISOString();
      const end = new Date(endDate).toISOString();
      
      formData.append("name", name);
      formData.append("description", description);
      formData.append("startDate", start);
      formData.append("endDate", end);
      productIds.forEach((id) => formData.append("product", id));

      await adminService.createCollection(formData, token).then(() => {
        setOpen(true);
        setImageFile(null);
        setSearchTerm("");
        setName("");
        setDescription("");
        setStartDate("");
        setEndDate("");
        setSelectedProducts([]);
      });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        padding: 3,
        animation: shake ? `${shake} 0.5s ease-in-out` : "none",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Name and Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tên bộ sưu tập"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mô tả"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>

          {/* Date Range */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Ngày bắt đầu"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              error={!!errors.startDate}
              helperText={errors.startDate}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Ngày kết thúc"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              error={!!errors.endDate}
              helperText={errors.endDate}
            />
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                />
                <PhotoCamera />
              </IconButton>
              {imageFile ? (
                <Avatar
                  src={URL.createObjectURL(imageFile)}
                  alt="Collection Preview"
                  sx={{ width: 100, height: 100 }}
                  variant="rounded"
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Tải lên ảnh bộ sưu tập
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Product Search */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                fullWidth
                label="Tìm kiếm sản phẩm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                sx={{ flexGrow: 1 }}
              />
              <IconButton onClick={handleSearch} sx={{ ml: 1 }}>
                <SearchIcon />
              </IconButton>
            </Box>
            {errors.products && (
              <Typography variant="caption" color="error">
                {errors.products}
              </Typography>
            )}
          </Grid>

          {/* Search Results */}
          {products?.length > 0 && (
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ maxHeight: 300, overflow: "auto" }}>
                <List>
                  {products?.map((product) => (
                    <ListItem key={product.productId}>
                      <Checkbox
                        checked={selectedProducts.some(
                          (p) => p.productId === product.productId
                        )}
                        onChange={() => handleProductSelect(product)}
                      />
                      <ListItemAvatar>
                        <Avatar
                          src={
                            "http://localhost:8080/image/product/" +
                            product.thumbnail
                          }
                          alt={product.name}
                          sx={{ width: 60, height: 60, mr: 2 }}
                          variant="rounded"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={product.productName}
                        secondary={`${product.price.toLocaleString()} VND`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          )}

          {/* Selected Products */}
          {selectedProducts.length > 0 && (
            <Grid item xs={12}>
              <Box>
                <Typography variant="h6">Sản phẩm đã chọn:</Typography>
                <List dense>
                  {selectedProducts.map((product) => (
                    <ListItem key={product.productId}>
                      <ListItemAvatar>
                        <Avatar
                          src={
                            "http://localhost:8080/image/product/" +
                            product.thumbnail
                          }
                          alt={product.productName}
                          sx={{ width: 50, height: 50, mr: 2 }}
                          variant="rounded"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={product.productName}
                        secondary={`${product.price.toLocaleString()} VND`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          )}

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#008772",
                "&:hover": { backgroundColor: "#006a5d" },
              }}
            >
              Tạo Bộ Sưu Tập
            </Button>
          </Grid>
        </Grid>
      </form>
      {open && (
        <SuccessNotification 
          open={open}
          onClose={onClose}
          message={"Tạo bộ sưu tập thành công"}
        />
      )}
    </Box>
  );
};

export default CreateCollectionPage;
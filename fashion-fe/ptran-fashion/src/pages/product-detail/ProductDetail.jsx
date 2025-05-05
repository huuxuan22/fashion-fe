import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  Button,
  Grid,
  TextField,
  Stack,
  Card,
  CardMedia,
  Chip,
  Paper,
  keyframes,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ProductDescription from "../../features/ProductDescription";
import ProductComment from "../../features/ProductComment";
import SimilarProducts from "../../features/SimilarProduct";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as userService from "./../../redux/User/Action";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as productService from "./../../service/product-service";
import * as feedbackService from "./../../redux/Feedback/Action";
import Toast from "../../component/Toast";
import { useWebSocket } from "../../hooks/useWebSocket";
import Header from "../../layout/Header";
import * as cartServiceRedux from "./../../redux/Cart/Action";
import SuccessNotification from "../../component/SuccessNotification";
import { set } from "date-fns";

// Hiệu ứng rung:
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
`;
const shakeAnimation = {
  "@keyframes shake": {
    "0%": { transform: "translateX(0)" },
    "25%": { transform: "translateX(-4px)" },
    "50%": { transform: "translateX(4px)" },
    "75%": { transform: "translateX(-4px)" },
    "100%": { transform: "translateX(0)" },
  },
};

const ProductDetail = () => {
  const [colorList, setColorList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [solid, setSolid] = useState(0);
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(null); // Sử dụng images thay vì similarProducts
  const [quality, setQuality] = useState(1);
  const [checkData, setCheckData] = useState(false);
  const [open, setOpen] = useState(false);
  const handleImageClick = (clickedImage) => {
    setMainImage(clickedImage);
  };

  const loadData = async () => {
    await productService
      .getSolidOfProduct({ productId: productId, token: token })
      .then((data) => {
        if (data.success) {
          setSolid(data.data);
        } else {
          console.log("Lỗi khi lấy dữ liệu sản phẩm:", data.data);
        }
      });
    await productService
      .getDetailProduct({ productId: productId, token: token })
      .then((data) => {
        if (data.success) {
          setMainImage(data.data.thumbnail);
          setProduct(data.data);
          setOrder((prev) => ({ ...prev, product: data.data }));
        } else {
          console.log("Lỗi khi lấy dữ liệu sản phẩm:", data.data);
        }
      });
    await productService
      .getAllImageProduct({ productId: productId, token: token })
      .then((data) => {
        if (data.success) {
          setImages(data.data);
        } else {
          console.log("Lỗi khi lấy Hình ảnh sản phẩm:", data.data);
        }
      });
    await productService
      .getAllColorOfOneProduct({ productId: productId, token: token })
      .then((data) => {
        if (data.success) {
          setColorList(data.data);
        } else {
          console.log("Lỗi khi lấy màu sắc sản phẩm:", data.data);
        }
      });
    await productService
      .getAllSizeOfOneProduct({ productId: productId, token: token })
      .then((data) => {
        if (data.success) {
          console.log(data.data);
          setSizeList(data.data);
        } else {
          console.log("Lỗi khi lấy kích thước sản phẩm:", data.data);
        }
      });
    await dispatch(feedbackService.countAllComment({ productId, token }));
  };
  const { users, feedbacks } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(userService.currentUser(token));
    };
    if (token) {
      fetchUser();
    }
  }, [token, dispatch]);
  useEffect(() => {
    setSizeList([]);
    setColorList([]);
    loadData();
  }, []);
  const location = useLocation();
  const { productId } = location.state || {};
  const [order, setOrder] = useState({
    product: null,
    color: null,
    size: null,
    stock: quality,
  });
  const handlePurchare = () => {
    if (!order.size || !order.color) {
      setCheckData(true);
    } else {
      setCheckData(false);
      console.log("order: ",order);
      
      navigate(`/payment`, { state: { order: [order] } });
    }
  };

  useEffect(() => {
    if (!productId) return; // Thêm kiểm tra này
    setSizeList([]);
    console.log("đã đi vào đây");
    setSelectedColor(null);
    setSelectedSize(null);
    loadData();
  }, [productId]); // Thêm productId vào dependency array

  const handleAddToBag = async () => {
    try {
      if (!order.size || !order.color) {
        setCheckData(true);
      } else {
        setCheckData(false);
        const data =  await dispatch(cartServiceRedux.addToCartProductVariant(token, order));
        if (data) {
          setOpen(true)
        }
      }
    } catch (error) {
      setOpen(false)
    }
  };
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <div>
      <Header />
      <Box
        sx={{
          width: "100%",
          px: "200px", // 200px padding on both sides
          py: 3,
        }}
      >
        <Grid container spacing={3}>
          {/* Left Column - Similar Products (20% width) */}
          <Grid item xs={12} md={2.4}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Similar Products
            </Typography>

            <Stack direction="column" spacing={2}>
              {images?.map((product) => (
                <Card
                  key={product.imageId}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "8px",
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                    width: 220, // tăng chiều ngang ảnh
                  }}
                  onClick={() => handleImageClick(product.imageUrl)}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 220, // tăng chiều cao ảnh
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    image={
                      "http://localhost:8080/image/product/" + product.imageUrl
                    }
                    alt={product.product.productName}
                  />
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* Middle Column - Main Product Image (55% width) */}
          <Grid item xs={12} md={6.6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                minHeight: "500px",
                bgcolor: "#f9f9f9",
                borderRadius: "4px",
                overflow: "hidden",
                mb: 2,
              }}
            >
              <img
                src={"http://localhost:8080/image/product/" + mainImage}
                alt={product.productName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  maxHeight: "600px",
                }}
              />
            </Box>
          </Grid>

          {/* Right Column - Product Info (25% width) */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                position: "sticky",
                top: 16,
                p: 1.5,
              }}
            >
              <Typography
                variant="h6"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Raam Clothing
              </Typography>

              <Typography
                variant="subtitle1"
                component="h2"
                gutterBottom
                sx={{ fontWeight: 500 }}
              >
                {product.productName}
              </Typography>

              <Box sx={{ my: 1.5 }}>
                <Typography variant="caption" color="text.secondary">
                  {feedbacks?.countComment} Ratings | {solid} Sold
                </Typography>
                <Typography variant="h6" sx={{ mt: 0.5, fontWeight: 700 }}>
                  {product.price} VNĐ
                </Typography>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Typography
                variant="caption"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                QUANTITY:
              </Typography>
              <TextField
                type="number"
                defaultValue="1"
                inputProps={{ min: 1 }}
                variant="outlined"
                size="small"
                sx={{ width: 72, mb: 1.5 }}
                onChange={(e) => {
                  setOrder((prev) => ({
                    ...prev,
                    stock: e.target.value,
                  }));
                }}
              />

              <Box
                sx={{
                  p: 2,
                  border: "1px solid #f0f0f0",
                  borderRadius: 2,
                  backgroundColor: "#fafafa",
                }}
              >
                {/* Phần chọn màu sắc */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                    Màu sắc
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                    {colorList?.map((color) => (
                      <Paper
                        key={color.colorId}
                        elevation={0}
                        onClick={() => {
                          setSelectedColor(color.colorName);
                          setOrder((prev) => ({
                            ...prev,
                            color: color,
                          }));
                        }}
                        sx={{
                          ...shakeAnimation,
                          p: 1,
                          minWidth: 80,
                          borderRadius: "20px",
                          border: `1px solid ${color.colorCode}`,
                          backgroundColor:
                            selectedColor === color.colorName
                              ? "#fff2f0"
                              : "white",
                          cursor: "pointer",
                          position: "relative",
                          overflow: "hidden",
                          transition: "all 0.2s",
                          "&:hover": {
                            borderColor: "#ee4d2d",
                          },
                          ...(checkData &&
                            !selectedColor && {
                              border: "2px solid red",
                              animation: "shake 0.4s",
                            }),
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              backgroundColor: color.colorCode,
                              border:
                                color.colorCode === "#ffffff"
                                  ? "1px solid #c2c2c2"
                                  : "none",
                            }}
                          />
                          <Typography variant="body2">
                            {color?.colorName}
                          </Typography>
                        </Box>

                        {selectedColor === color?.colorName && (
                          <CheckCircleIcon
                            sx={{
                              position: "absolute",
                              right: 8,
                              bottom: 6,
                              color: "#ee4d2d",
                              fontSize: 16,
                            }}
                          />
                        )}
                      </Paper>
                    ))}
                  </Box>

                  {checkData && !selectedColor && (
                    <Typography
                      sx={{ mt: 1, color: "red", fontSize: "0.875rem" }}
                    >
                      Bạn chưa chọn màu sắc
                    </Typography>
                  )}
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Phần chọn kích thước */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                    Kích thước
                  </Typography>

                  {/* Thông báo nếu sản phẩm chỉ có duy nhất size "0" */}
                  {sizeList?.length === 1 && sizeList[0].nameSize === "0" && (
                    <Typography
                      sx={{ mb: 1, fontSize: "0.875rem", color: "#555" }}
                    >
                      Sản phẩm này không có kích thước cụ thể. Vui lòng bấm vào
                      "Tiếp tục" để tiếp tục mua sắm.
                    </Typography>
                  )}

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {sizeList?.map((size) => {
                      const isOutOfStock = size.stock === 0;
                      const isSelected = selectedSize === size.nameSize;

                      return (
                        <Chip
                          key={size.sizeId}
                          label={
                            isOutOfStock
                              ? `${size.nameSize} (Hết hàng)`
                              : size.nameSize === "0"
                              ? "Tiếp tục"
                              : size.nameSize
                          }
                          clickable={!isOutOfStock}
                          onClick={() => {
                            if (!isOutOfStock) {
                              setSelectedSize(size.nameSize);
                              setOrder((prev) => ({
                                ...prev,
                                size: size,
                              }));
                            }
                          }}
                          sx={{
                            ...shakeAnimation,
                            minWidth: 50,
                            height: 40,
                            fontSize: "0.875rem",
                            color: isOutOfStock ? "#9e9e9e" : "inherit",
                            border: `1px solid ${
                              isSelected
                                ? "#ee4d2d"
                                : isOutOfStock
                                ? "#e0e0e0"
                                : "#e0e0e0"
                            }`,
                            backgroundColor: isSelected
                              ? "#fff2f0"
                              : isOutOfStock
                              ? "#f5f5f5"
                              : "white",
                            "&:hover": {
                              borderColor: isOutOfStock ? "#e0e0e0" : "#ee4d2d",
                              backgroundColor: isOutOfStock
                                ? "#f5f5f5"
                                : "#fff2f0",
                            },
                            textDecoration: isOutOfStock
                              ? "line-through"
                              : "none",
                            cursor: isOutOfStock ? "not-allowed" : "pointer",

                            ...(checkData &&
                              !selectedSize && {
                                border: "2px solid red",
                                animation: "shake 0.4s",
                              }),
                          }}
                        />
                      );
                    })}
                  </Box>

                  {checkData && !selectedSize && (
                    <Typography
                      sx={{ mt: 1, color: "red", fontSize: "0.875rem" }}
                    >
                      Bạn chưa chọn kích thước
                    </Typography>
                  )}
                </Box>

                {/* Thông báo lựa chọn */}
                {(selectedColor || selectedSize) && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 1.5,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">
                      Đã chọn:
                      {selectedColor && (
                        <span
                          style={{
                            fontWeight: 600,
                            marginLeft: 4,
                            color: "#2e7d32",
                          }}
                        >
                          Màu sắc {selectedColor}
                        </span>
                      )}
                      {selectedSize && (
                        <span
                          style={{
                            fontWeight: 600,
                            marginLeft: 8,
                            color: "#2e7d32",
                          }}
                        >
                          Kích thước{" "}
                          {selectedSize === "0" ? "Tiếp tục" : selectedSize}
                        </span>
                      )}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Grid container spacing={1} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    fullWidth
                    size="small"
                    startIcon={<ShoppingCartIcon fontSize="small" />}
                    sx={{
                      py: 0.8,
                      bgcolor: "#00917b",
                      color: "white",
                      "&:hover": { bgcolor: "#007e6a" }, // hover = xanh đậm hơn
                      animation: checkData ? `${shake} 0.4s linear` : "none", // rung nếu thiếu dữ liệu
                      boxShadow: checkData ? "0 0 10px #66bb6a" : "none", // viền xanh lá sáng
                    }}
                    onClick={handleAddToBag}
                  >
                    ADD TO BAG
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    size="small"
                    startIcon={<FlashOnIcon fontSize="small" />}
                    sx={{
                      py: 0.8,
                      bgcolor: "#00725f", // xanh đậm hơn một chút
                      color: "white",
                      "&:hover": { bgcolor: "#006354" }, // hover = xanh đậm hơn nữa
                      animation: checkData ? `${shake} 0.4s linear` : "none",
                      boxShadow: checkData ? "0 0 10px #66bb6a" : "none", // viền xanh lá sáng
                    }}
                    onClick={handlePurchare}
                  >
                    BUY NOW
                  </Button>
                </Grid>
              </Grid>

              <Button
                variant="outlined"
                fullWidth
                size="small"
                startIcon={<FavoriteBorderIcon fontSize="small" />}
                sx={{
                  mt: 1,
                  py: 0.8,
                  color: "#00917b",
                  borderColor: "#00917b",
                  "&:hover": {
                    bgcolor: "rgba(0, 145, 123, 0.08)", // nền xanh nhạt khi hover
                    borderColor: "#007e6a",
                    color: "#007e6a",
                  },
                }}
              >
                ADD TO WISHLIST
              </Button>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1.5, display: "block" }}
              >
                The saree comes with an unstitched blouse piece. The blouse worn
                by the model might be for a modelling purpose only.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ProductDescription description={product.description} />
      <ProductComment productId={productId} currentUser={users?.currentUser} />
      <SimilarProducts product={product} />

      {open && (
              <SuccessNotification
                open={open}
                onClose={handleClose}
                message={"Thêm vào giỏ hàng thành công"}
              />
            )}
    </div>
  );
};

export default ProductDetail;

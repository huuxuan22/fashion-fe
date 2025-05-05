import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Pagination,
  Stack,
  Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import * as productService from "./../service/product-service";
import { useNavigate } from "react-router-dom";
import * as productServiceRedux from "./../redux/Feedback/Action";
import * as cartServiceRedux from "./../redux/Cart/Action";
import { useDispatch } from "react-redux";
import SuccessNotification from "../component/SuccessNotification";
const SimilarProducts = ({ product }) => {
  const dispatch = useDispatch();
  const [sameProduct, setSameProduct] = useState([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 12; // 2 hàng × 6 cột
  const pageCount = Math.ceil(sameProduct.length / productsPerPage);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  // Lấy dữ liệu sản phẩm tương tự
  const loadData = async () => {
    try {
      if (!product?.categories?.subCategoryId || !product?.productId) return;

      const response = await productService.getSameProduct({
        subCategoryId: product.categories.subCategoryId,
        productId: product.productId,
        token: token,
      });

      setSameProduct(response.data || []);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm tương tự:", error);
      setSameProduct([]);
    }
  };
  const handleAddToCart = async (product) => {
    await dispatch(cartServiceRedux.addToCartProduct(token, product));
    setOpen(true);
  };
  const handleSelectProduct = (productId) => {
    navigate("/product-detail", {
      state: {
        productId: productId,
        // Có thể thêm các dữ liệu khác nếu cần
      },
    });
    // Scroll lên đầu trang để đảm bảo UX
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    loadData();
  }, [product]); // Gọi lại khi product thay đổi

  // Chia sản phẩm thành 2 hàng
  const renderProductRows = () => {
    const startIdx = (page - 1) * productsPerPage;
    const visibleProducts = sameProduct.slice(
      startIdx,
      startIdx + productsPerPage
    );

    return (
      <>
        {/* Hàng 1 */}
        <Grid container item xs={12} spacing={3}>
          {visibleProducts
            .slice(0, 6)
            .map((product) => renderProductCard(product))}
        </Grid>

        {/* Hàng 2 */}
        <Grid container item xs={12} spacing={3} sx={{ mt: 0 }}>
          {visibleProducts
            .slice(6, 12)
            .map((product) => renderProductCard(product))}
        </Grid>
      </>
    );
  };

  // tính phần trăm giảm giá
  const calculateDiscountPercentage = (originalPrice, salePrice) => {
    if (originalPrice <= 0 || salePrice < 0 || salePrice > originalPrice) {
      return "Dữ liệu không hợp lệ";
    }
    const discount = ((originalPrice - salePrice) / originalPrice) * 100;
    return Math.round(discount); // Làm tròn phần trăm giảm giá
  };

  const getRating = async (productIds) => {
    const data = await productService.getAllRatingByProductId({
      token: token,
      productId: productIds,
    });
    console.log("tổng rating: ", data.data);

    return data.data;
  };
  // Render card sản phẩm
  const renderProductCard = (product) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={2}
      key={product.id}
      onClick={() => handleSelectProduct(product.productId)}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "transform 0.3s",
          "&:hover": { transform: "translateY(-5px)" },
        }}
      >
        <CardMedia
          component="div"
          sx={{
            width: "100%",
            height: 300, // Tăng chiều cao vùng chứa ảnh
            overflow: "hidden", // Ẩn tràn (nếu muốn ảnh nằm gọn)
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={
              product.thumbnail
                ? "http://localhost:8080/image/product/" + product.thumbnail
                : "https://via.placeholder.com/150"
            }
            alt={product.productName}
            style={{
              height: "100%", // Cho ảnh cao bằng vùng chứa
              width: "auto", // Tự co giãn theo chiều ngang
              objectFit: "cover", // Cho ảnh tràn hết vùng, nhìn đầy đủ
              display: "block",
            }}
          />
        </CardMedia>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="h3"
            sx={{
              fontWeight: 600,
              height: 40,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.productName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {product.brand || "ptran-fashion"}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#02907B" }}
            >
              {product.price} VNĐ
            </Typography>
            {product.price && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ textDecoration: "line-through", ml: 1 }}
              >
                {product.sellPrice}
              </Typography>
            )}
            {product && (
              <Chip
                label={
                  calculateDiscountPercentage(
                    product.price,
                    product.sellPrice
                  ) + "%"
                }
                size="small"
                sx={{
                  ml: 1,
                  backgroundColor: "#ffebee",
                  color: "#c62828",
                  fontSize: "0.65rem",
                  height: 20,
                }}
              />
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ p: 1 }}>
          <Button
            size="small"
            fullWidth
            sx={{
              backgroundColor: "#02907B",
              color: "#fff",
              borderRadius: 1,
              fontSize: "0.75rem",
              py: 0.8,
              "&:hover": { backgroundColor: "#028066" },
            }}
            onClick={(e) => {
              e.stopPropagation(); // Ngăn gọi handleSelectProduct
              handleAddToCart(product);
            }}
          >
            Thêm vào giỏ
          </Button>
        </CardActions>
      </Card>

      {open && (
        <SuccessNotification
          open={open}
          onClose={handleClose}
          message={"Thêm vào giỏ hàng thành công"}
        />
      )}
    </Grid>
  );

  return (
    <Box sx={{ px: { xs: 2, md: "100px" }, py: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#02907B", mb: 3 }}
      >
        Sản Phẩm Tương Tự
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3} sx={{ cursor: "pointer" }}>
        {sameProduct.length > 0 ? (
          renderProductRows()
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ width: "100%", textAlign: "center", py: 4 }}
          >
            Không có sản phẩm tương tự
          </Typography>
        )}
      </Grid>

      {pageCount > 1 && (
        <Stack spacing={2} sx={{ mt: 4, alignItems: "center" }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#02907B",
                borderColor: "#02907B",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#02907B",
                color: "white",
              },
            }}
          />
        </Stack>
      )}
    </Box>
  );
};

export default SimilarProducts;

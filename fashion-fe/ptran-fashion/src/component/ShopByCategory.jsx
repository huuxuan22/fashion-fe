import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, Typography, Box } from "@mui/material";
import * as productService from "./../service/product-service";
import { useNavigate } from "react-router-dom";

const ShopByCategory = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const loadData = async () => {
    try {
      const response = await productService.getProductWithCategories({ token });
      // Lấy 14 sản phẩm đầu tiên (hoặc có thể điều chỉnh theo API)
      setProducts(response.data.slice(0, 14));
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const navigate = useNavigate()
  const handleProduct = (id) => {
    navigate('/product-detail', {state: {productId: id}})
  }
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "2900px", // Giới hạn chiều rộng tối đa
        margin: "0 auto",
        padding: { xs: "24px 16px", md: "24px 50px" },
      }}
    >

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {products.map((item) => (
          <Grid 
            item 
            xs={6}  // 2 cột trên mobile
            sm={3}   // 4 cột trên tablet nhỏ
            md={2}   // 6 cột trên tablet lớn
            lg={1.7} // ~7 cột trên desktop
            key={item.productId || item.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              cursor:'pointer'
            }}
            onClick={() => handleProduct(item.productId)}
          >
            <Card
              sx={{
                width: "100%",
                maxWidth: "400px", // Giới hạn kích thước tối đa
                height: "auto",
                aspectRatio: "1/1",
                borderRadius: "50%",
                border: "3px solid #008B76",
                boxShadow: "0 0 0 4px rgba(0, 139, 118, 0.3)",
                transition: "all 0.3s ease",
                padding: "4px",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 0 0 6px rgba(0, 139, 118, 0.4)",
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                image={"http://localhost:8080/image/product/" + item.thumbnail}
                alt={item.productName || `Sản phẩm ${item.productId}`}
              />
            </Card>
            {item.categoryName && (
              <Typography 
                variant="subtitle2" 
                sx={{
                  textAlign: "center",
                  mt: 1,
                  fontWeight: "500",
                  color: "#333"
                }}
              >
                {item.categoryName}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShopByCategory;
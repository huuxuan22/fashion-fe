import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Pagination,
  Box,
} from "@mui/material";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import * as productService from "./../service/product-service.js";
import { useNavigate } from "react-router-dom";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    flex: 1,
    paddingBottom: "60px",
  },
  productCard: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    border: "2px solid #039278",
    boxShadow: 3,
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.03)",
    },
  },
  cardMedia: {
    height: 300,
    objectFit: "cover",
    width: "100%",
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  // Thêm style mới cho product name
  productName: {
    fontWeight: "bold",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
    mb: 1, // Thêm margin bottom nếu cần
  },
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const itemsPerPage = 12;
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    loadProducts();
  }, [searchTerm, page]);

  const loadProducts = async () => {
    if (searchTerm.trim() !== "") {
      await productService
        .searchProduct({
          page: page,
          size: itemsPerPage,
          value: searchTerm,
          token: token,
        })
        .then((data) => {
          setProducts(data.data.content);
        });
      await productService
        .getAllTotalPage({ value: searchTerm, token: token })
        .then((data) => {
          setTotalPage(data.data);
        });
    }
  };
  const handleProductDetail = (productId) => {
    navigate("/product-detail", { state: { productId: productId } });
  };
  return (
    <div style={styles.root}>
      <Header />
      <Box component="main" style={styles.content}>
        <Box sx={{ padding: 3, textAlign: "center", mb: 10, mt: 5 }}>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}
          >
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: "50%",
                mb: 10,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#029177" },
                  "&:hover fieldset": { borderColor: "#029177" },
                  "&.Mui-focused fieldset": { borderColor: "#029177" },
                },
                "& .MuiInputLabel-root": { color: "#029177" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#029177" },
              }}
            />
          </Box>

          {products.length === 0 ? (
            <Typography variant="h6" sx={{ color: "#029177" }}>
              Không có sản phẩm nào phù hợp.
            </Typography>
          ) : (
            <>
              <Grid container spacing={3} sx={{ cursor: "pointer" }}>
                {products.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={2}
                    key={product.productId}
                    onClick={() => handleProductDetail(product.productId)}
                  >
                    <Card sx={styles.productCard}>
                      <CardMedia
                        component="img"
                        sx={styles.cardMedia}
                        image={
                          "http://localhost:8080/image/product/" +
                          product.thumbnail
                        }
                        alt={product.productName}
                      />
                      <CardContent sx={styles.cardContent}>
                        <Typography variant="h6" color="#039278" gutterBottom>
                          {product.brand}
                        </Typography>
                        <Typography variant="body1" sx={styles.productName}>
                          {product.productName}
                        </Typography>
                        <Box sx={{ mt: "auto" }}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#039278", // Màu xanh theo yêu cầu
                              fontWeight: 700, // Làm đậm chữ
                              fontSize: "1.1rem", // Kích thước font
                            }}
                          >
                            {product.sellPrice.toLocaleString()}₫
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textDecoration: "line-through",
                              color: "gray",
                            }}
                          >
                            ₹{product.price} vnđ
                          </Typography>
                          <Typography variant="body2" color="green">
                            số lượng: {product.quality}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
              >
                <Pagination
                  count={totalPage}
                  page={page - 1}
                  onChange={(_, value) => setPage(value - 1)}
                  color="primary"
                />
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Search;

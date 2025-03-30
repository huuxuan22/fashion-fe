import React, { useState } from "react";
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

const products = Array.from({ length: 24 }).map((_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  brand: "Raam Clothing",
  price: Math.floor(Math.random() * 500) + 300,
  oldPrice: Math.floor(Math.random() * 1000) + 700,
  discount: `${Math.floor(Math.random() * 50) + 10}% off`,
  image:
    "https://th.bing.com/th/id/OIP.VqTyXBv4EFfMB272uVx3KQHaHa?rs=1&pid=ImgDetMain",
}));

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12; // 2 hàng × 6 cột

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Phân trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <Header></Header>
      <Box sx={{ padding: 3, textAlign: "center", mb: 10, mt: 5 }}>
        {/* Ô nhập liệu tìm kiếm */}
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

        {/* Kiểm tra nếu không có sản phẩm */}
        {filteredProducts.length === 0 ? (
          <Typography variant="h6" sx={{ color: "#029177" }}>
            Không có sản phẩm nào phù hợp.
          </Typography>
        ) : (
          <>
            {/* Danh sách sản phẩm (2 hàng × 6 cột) */}
            <Grid container spacing={2}>
              {displayedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={product.id}>
                  <Card sx={{ border: `2px solid #039278`, boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      height="180"
                      image={product.image}
                      alt={product.name}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography variant="h6" color="#039278">
                        {product.brand}
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {product.name}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ₹{product.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textDecoration: "line-through", color: "gray" }}
                      >
                        ₹{product.oldPrice}
                      </Typography>
                      <Typography variant="body2" color="green">
                        {product.discount}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Nút phân trang ở dưới */}
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Box>
          </>
        )}
      </Box>
      <Footer></Footer>
    </div>
  );
};

export default Search;

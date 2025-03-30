import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Avatar,
  Pagination,
  Stack
} from "@mui/material";
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Dữ liệu mẫu
  const products = [
    { id: 1, name: "Áo thun nam", price: 250000, category: "Áo", stock: 45, image: "https://product.hstatic.net/1000147171/product/img_e2877_d12f02095d774d8883cbcd7009f6ff00_large.jpg" },
    { id: 2, name: "Quần jean nữ", price: 450000, category: "Quần", stock: 20, image: "https://product.hstatic.net/1000147171/product/img_e2877_d12f02095d774d8883cbcd7009f6ff00_large.jpg" },
    { id: 3, name: "Giày thể thao", price: 800000, category: "Giày", stock: 15, image: "https://product.hstatic.net/1000147171/product/img_e2877_d12f02095d774d8883cbcd7009f6ff00_large.jpg" },
    { id: 4, name: "Túi xách da", price: 600000, category: "Phụ kiện", stock: 8, image: "https://product.hstatic.net/1000147171/product/img_e2877_d12f02095d774d8883cbcd7009f6ff00_large.jpg" },
    { id: 5, name: "Áo khoác dù", price: 500000, category: "Áo", stock: 12, image: "https://product.hstatic.net/1000147171/product/img_e2877_d12f02095d774d8883cbcd7009f6ff00_large.jpg" },
    { id: 6, name: "Ví da nam", price: 350000, category: "Phụ kiện", stock: 20, image: "https://product.hstatic.net/1000147171/product/img_e2877_d12f02095d774d8883cbcd7009f6ff00_large.jpg" }
  ];

  // Lọc dữ liệu
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (filterCategory === "all" || product.category === filterCategory)
  );

  // Phân trang
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Danh mục
  const categories = ["all", ...new Set(products.map(product => product.category))];

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#00917B" }}>
        ALL PRODUCT
      </Typography>

      {/* Thanh tìm kiếm & lọc */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          variant="outlined"
          placeholder="Tìm kiếm sản phẩm..."
          fullWidth
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#00917B" }} />
              </InputAdornment>
            ),
            sx: { bgcolor: "#fff", borderRadius: 1, borderColor: "#e0e0e0" }
          }}
        />

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Danh mục</InputLabel>
          <Select
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setPage(1);
            }}
            sx={{ bgcolor: "#fff", borderRadius: 1, borderColor: "#e0e0e0" }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category === "all" ? "Tất cả" : category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Bảng sản phẩm */}
      <TableContainer component={Paper} sx={{ border: "1px solid #e0e0e0", mb: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#00917B" }}>Hình ảnh</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#00917B" }}>Tên sản phẩm</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#00917B" }}>Danh mục</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#00917B" }} align="right">Giá (VND)</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#00917B" }} align="right">Tồn kho</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#00917B" }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Avatar src={product.image} variant="square" sx={{ width: 50, height: 50 }} />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell align="right">{product.price.toLocaleString()}</TableCell>
                <TableCell align="right">{product.stock}</TableCell>
                <TableCell>
                  <IconButton sx={{ color: "#00917B" }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ color: "#d32f2f" }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang */}
      <Stack spacing={2} alignItems="center">
        <Pagination count={totalPages} page={page} onChange={(e, newPage) => setPage(newPage)} color="primary" />
      </Stack>
    </Box>
  );
};

export default ProductList;

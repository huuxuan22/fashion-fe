import React, { useEffect, useState } from "react";
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
  Stack,
} from "@mui/material";
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import * as productServcie from "./../redux/Product/Action";
import * as productServiceMain from "./../service/product-service";
import * as categoriesServcie from "./../service/category-service";
import { set } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { store } from "./../redux/store";
import { ca } from "date-fns/locale";
const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  // Danh mục
  const { products } = useSelector((store) => store);
  console.log("dữ liệu danh sách sản phẩm của bạn ", products);
  console.log("danh mục sản phẩm: ", categories);

  const loadCategory = async () => {
    await categoriesServcie.getAllCategory(token).then((data) => {
      setCategories(data.data);
    });
  };
  const loadProduct = async () => {
    await dispatch(
      productServcie.getAllPropduct({
        data: {
          page: page,
          size: rowsPerPage,
          token,
          search: searchTerm || "",
          categoryId: categoryId || 0,
        },
      })
    );
  };
  const loadAllPage = async () => {
    await productServiceMain.getAllPage({ token: token }).then((data) => {
      setTotalPages(data.data);
    });
  };
  useEffect(() => {
    loadProduct();
    loadAllPage();
    loadCategory();
  }, []);

  useEffect(() => {
    console.log("categoryId khi thay đổi:", categoryId);
    console.log("search khi thay đổi: ", searchTerm);

    loadProduct();
  }, [page]);

  useEffect(() => {
    console.log("categoryId khi thay đổi:", categoryId);
    console.log("search khi thay đổi: ", searchTerm);

    loadProduct();
  }, [categoryId,searchTerm]);

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", p: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 2, color: "#00917B" }}
      >
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
            setPage(0);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#00917B" }} />
              </InputAdornment>
            ),
            sx: { bgcolor: "#fff", borderRadius: 1, borderColor: "#e0e0e0" },
          }}
        />

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Danh mục</InputLabel>
          <Select
            onChange={(e) => {
              setCategoryId(e.target.value);
              setPage(0);
            }}
            sx={{ bgcolor: "#fff", borderRadius: 1, borderColor: "#e0e0e0" }}
          >
            {categories?.map((category) => (
              <MenuItem key={category.categorieId} value={category.categorieId}>
                {category.categoriesName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Bảng sản phẩm */}
      <TableContainer
        component={Paper}
        sx={{ border: "1px solid #e0e0e0", mb: 2 }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#00917B" }}>
                ProductId
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#00917B" }}>
                Hình ảnh
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#00917B" }}>
                Tên sản phẩm
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#00917B" }}>
                Danh mục
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "#00917B" }}
                align="right"
              >
                Giá (VND)
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: "#00917B" }}
                align="right"
              >
                Tồn kho
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#00917B" }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.products && products.products.length > 0 ? (
              products.products.map((product) => (
                <TableRow key={product.productId}>
                  <TableCell>
                    <Avatar
                      src={
                        "http://localhost:8080/image/product/" +
                        product.thumbnail
                      }
                      variant="square"
                      sx={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>{product.productId}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.categories.subCategoryName}</TableCell>
                  <TableCell align="right">
                    {product.sellPrice.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">{product.quality}</TableCell>
                  <TableCell>
                    <IconButton sx={{ color: "#00917B" }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#d32f2f" }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <p
                    style={{
                      fontSize: "20px",
                      color: "#00917B",
                      fontWeight: "bold",
                    }}
                  >
                    Không có sản phẩm nào
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang */}
      <Stack spacing={2} alignItems="center">
        <Pagination
          count={totalPages} // Tổng số trang
          page={page + 1} // Vì Pagination hiển thị bắt đầu từ 1
          onChange={(e, newPage) => {
            setPage(newPage - 1); // Chuyển về base 0
            // loadProduct(newPage - 1); // Gọi lại API hoặc Redux
          }}
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default ProductList;

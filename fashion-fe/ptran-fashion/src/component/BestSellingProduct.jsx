import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  styled,
  Button,
  Chip,
  Pagination,
  Stack
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const StyledTab = styled(Tab)({
  fontWeight: 'bold',
  color: '#000',
  '&.Mui-selected': {
    color: '#00917B',
    backgroundColor: 'rgba(0, 145, 123, 0.08)'
  }
});

const BestSellingProduct = () => {
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
    setPage(1);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRestock = (productId) => {
    console.log(`Nhập hàng cho sản phẩm ID: ${productId}`);
  };

  const bestSellingProducts = [
    { id: 1, name: 'Áo thun nam', sold: 120, stock: 45, status: 'Còn hàng', image: 'https://product.hstatic.net/1000147171/product/img_e2877_d12f02095d774d8883cbcd7009f6ff00_large.jpg' },
    { id: 2, name: 'Quần jean nữ', sold: 98, stock: 0, status: 'Hết hàng', image: 'https://product.hstatic.net/1000147171/product/img_e2877_d12f02095d774d8883cbcd7009f6ff00_large.jpg' },
    { id: 3, name: 'Giày thể thao', sold: 85, stock: 12, status: 'Còn hàng', image: 'https://product.hstatic.net/1000147171/product/img_e2877_d12f02095d774d8883cbcd7009f6ff00_large.jpg' },
    { id: 4, name: 'Túi xách da', sold: 76, stock: 5, status: 'Còn hàng', image: 'https://product.hstatic.net/1000147171/product/img_e2877_d12f02095d774d8883cbcd7009f6ff00_large.jpg' },
    { id: 5, name: 'Mũ lưỡi trai', sold: 65, stock: 0, status: 'Hết hàng', image: 'https://product.hstatic.net/1000147171/product/img_e2877_d12f02095d774d8883cbcd7009f6ff00_large.jpg' },
    { id: 6, name: 'Ví da nam', sold: 58, stock: 8, status: 'Còn hàng', image: 'https://product.hstatic.net/1000147171/product/img_e2877_d12f02095d774d8883cbcd7009f6ff00_large.jpg' },
    { id: 7, name: 'Áo khoác dù', sold: 52, stock: 0, status: 'Hết hàng', image: 'https://product.hstatic.net/1000147171/product/img_e2877_d12f02095d774d8883cbcd7009f6ff00_large.jpg' }
  ];

  const inStockProducts = bestSellingProducts.filter(product => product.stock > 0);
  const outOfStockProducts = bestSellingProducts.filter(product => product.stock === 0);

  const getCurrentData = () => {
    switch (tabValue) {
      case 0:
        return bestSellingProducts;
      case 1:
        return inStockProducts;
      case 2:
        return outOfStockProducts;
      default:
        return bestSellingProducts;
    }
  };

  const currentData = getCurrentData();
  const totalPages = Math.ceil(currentData.length / rowsPerPage);
  const paginatedData = currentData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2, color: '#000' }}>
        Quản lý sản phẩm
      </Typography>
      
      <Tabs
        value={tabValue}
        onChange={handleChangeTab}
        indicatorColor="primary"
        textColor="inherit"
        sx={{
          mb: 3,
          '& .MuiTabs-indicator': {
            backgroundColor: '#00917B',
          }
        }}
      >
        <StyledTab label="Sản phẩm bán chạy" />
        <StyledTab label="Sản phẩm còn hàng" />
        <StyledTab label="Sản phẩm hết hàng" />
      </Tabs>
      
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', mb: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Hình ảnh</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Tên sản phẩm</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#000' }} align="right">Đã bán</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#000' }} align="right">Tồn kho</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Trạng thái</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#000' }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.image} alt={product.name} width={60} height={60} style={{ borderRadius: '5px' }} />
                </TableCell>
                <TableCell sx={{ color: '#000' }}>{product.id}</TableCell>
                <TableCell sx={{ color: '#000' }}>{product.name}</TableCell>
                <TableCell align="right" sx={{ color: '#000' }}>{product.sold}</TableCell>
                <TableCell 
                  align="right" 
                  sx={{ 
                    color: product.stock > 0 ? '#000' : '#d32f2f',
                    fontWeight: product.stock > 0 ? 'normal' : 'bold'
                  }}
                >
                  {product.stock}
                </TableCell>
                <TableCell>
                  <Chip
                    label={product.status}
                    sx={{
                      backgroundColor: product.status === 'Còn hàng' ? '#e8f5e9' : '#ffebee',
                      color: product.status === 'Còn hàng' ? '#2e7d32' : '#d32f2f',
                      fontWeight: 'bold'
                    }}
                  />
                </TableCell>
                <TableCell>
                  {(product.status === 'Hết hàng' || tabValue === 0) && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => handleRestock(product.id)}
                      sx={{
                        color: '#00917B',
                        borderColor: '#00917B',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 145, 123, 0.04)',
                          borderColor: '#00917B'
                        }
                      }}
                    >
                      Nhập hàng
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} alignItems="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default BestSellingProduct;

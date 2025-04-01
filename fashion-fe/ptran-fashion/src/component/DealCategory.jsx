import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  TablePagination
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const DealCategory = () => {
  const categories = [
    { id: 1, categoryId: 29, image: '', category: 'men_t_shirts', name: 'Men T-Shirts' },
    { id: 2, categoryId: 30, image: '', category: 'women_skirts_palazzos', name: 'Women Skirts & Palazzos' },
    { id: 3, categoryId: 31, image: '', category: 'men_formal_shirts', name: 'Men Formal Shirts' },
    { id: 4, categoryId: 32, image: '', category: 'women_sarees', name: 'Women Sarees' }
  ];

  // State cho phân trang
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Hàm xử lý cập nhật
  const handleUpdate = (categoryId) => {
    console.log('Cập nhật category với ID:', categoryId);
    // Thêm logic cập nhật ở đây
  };

  // Hàm xử lý xóa
  const handleDelete = (categoryId) => {
    console.log('Xóa category với ID:', categoryId);
    // Thêm logic xóa ở đây
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          mb: 3,
          color: '#008772',
          fontWeight: 'bold'
        }}
      >
        Category List
      </Typography>
      
      <TableContainer 
        component={Paper} 
        elevation={3}
        sx={{
          border: '1px solid #008772',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#008772' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>No</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Image</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : categories
            ).map((row) => (
              <TableRow
                key={row.id}
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: '#E0F2F1' }
                }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.categoryId}</TableCell>
                <TableCell>
                  {row.image ? (
                    <img src={row.image} alt={row.name} width={50} style={{ borderRadius: '4px' }} />
                  ) : (
                    <Typography color="textSecondary">No image</Typography>
                  )}
                </TableCell>
                <TableCell sx={{ color: '#008772', fontWeight: '500' }}>
                  {row.category}
                </TableCell>
                <TableCell>
                  {row.name || (
                    <Typography color="textSecondary">-</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => handleUpdate(row.categoryId)}
                    sx={{ color: '#008772' }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDelete(row.categoryId)}
                    sx={{ color: '#d32f2f' }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Phân trang */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: '1px solid #e0e0e0',
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              color: '#008772'
            }
          }}
        />
      </TableContainer>
    </Box>
  );
};

export default DealCategory;
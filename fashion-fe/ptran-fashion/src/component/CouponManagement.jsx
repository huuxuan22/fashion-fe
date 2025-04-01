import React, { useState } from 'react';
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
  TablePagination,
  Checkbox,
  Chip
} from '@mui/material';
import { Delete } from '@mui/icons-material';

const CouponManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

  const coupons = [
    { id: 1, code: 'ZOSH50', startDate: '2024-08-25', endDate: '2024-09-29', minOrder: 500, discount: 50, status: 'Active' },
    { id: 2, code: 'ZOSH30', startDate: '2024-08-25', endDate: '2024-09-29', minOrder: 599, discount: 30, status: 'Active' },
    { id: 3, code: 'ZOSH10', startDate: '2024-08-25', endDate: '2024-09-29', minOrder: 699, discount: 10, status: 'Active' },
    { id: 4, code: 'ZOSH11', startDate: '2024-08-25', endDate: '2024-09-29', minOrder: 699, discount: 10, status: 'Active' },
    { id: 5, code: 'ZOSH12', startDate: '2024-08-25', endDate: '2024-09-29', minOrder: 699, discount: 10, status: 'Active' },
    { id: 6, code: 'ZOSH13', startDate: '2024-08-25', endDate: '2024-09-29', minOrder: 699, discount: 10, status: 'Active' },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = coupons.map((coupon) => coupon.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleDelete = (id) => {
    console.log('Delete coupon with id:', id);
    // Add your delete logic here
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
        Active Coupons
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
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < coupons.length}
                  checked={coupons.length > 0 && selected.length === coupons.length}
                  onChange={handleSelectAllClick}
                  sx={{ color: '#fff' }}
                />
              </TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Coupon Code</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Start Date</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>End Date</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Min Order Value</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Discount %</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? coupons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : coupons
            ).map((coupon) => {
              const isItemSelected = isSelected(coupon.id);
              return (
                <TableRow
                  key={coupon.id}
                  hover
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#E0F2F1' }
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onClick={(event) => handleClick(event, coupon.id)}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: '500' }}>{coupon.code}</TableCell>
                  <TableCell>{coupon.startDate}</TableCell>
                  <TableCell>{coupon.endDate}</TableCell>
                  <TableCell>${coupon.minOrder}</TableCell>
                  <TableCell>{coupon.discount}%</TableCell>
                  <TableCell>
                    <Chip 
                      label={coupon.status} 
                      color="success" 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        fontWeight: 'bold'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleDelete(coupon.id)}
                      sx={{ color: '#d32f2f' }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={coupons.length}
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
}

export default CouponManagement
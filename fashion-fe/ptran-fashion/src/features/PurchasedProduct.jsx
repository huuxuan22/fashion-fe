import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Button,
  Stack,
  Paper,
  Divider
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import SearchIcon from '@mui/icons-material/Search';

const PurchasedProducts = () => {
  const orders = [
    {
      id: 1,
      image: 'https://via.placeholder.com/80/FF5733/FFFFFF?text=Cerave',
      store: 'Cerave Official Store',
      name: 'Sữa rửa mặt làm sạch sâu Cerave Foaming Facial Cleanser',
      price: 439000,
      status: 'Đã giao hàng',
      voucher: 'Giảm đến 412k',
      flashSale: 'Flash Sale 15:00'
    }
  ];

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: '1500px',
      margin: '0 auto',
      p: 2
    }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="body2" sx={{ color: '#008B76' }}>
          [Menu] [Cerave Official Store]
        </Typography>
      </Stack>

      {orders.map((item) => (
        <Paper 
          key={item.id}
          elevation={0}
          sx={{
            p: 2,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            borderLeft: '3px solid #008B76',
            borderRadius: '0 4px 4px 0',
            height: '100px' // Chiều cao cố định
          }}
        >
          {/* Hình ảnh */}
          <Avatar
            src={item.image}
            variant="square"
            sx={{ 
              width: 80, 
              height: 80,
              mr: 2,
              flexShrink: 0
            }}
          />

          {/* Thông tin sản phẩm */}
          <Box sx={{ 
            flexGrow: 1,
            minWidth: 0, // Cho phép text overflow
            pr: 2
          }}>
            <Typography 
              noWrap 
              variant="body1" 
              sx={{ 
                fontWeight: 'bold',
                mb: 0.5
              }}
            >
              {item.name}
            </Typography>
            
            <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
              <Typography variant="body2" sx={{ color: '#d32f2f' }}>
                {item.price.toLocaleString('vi-VN')} đ
              </Typography>
              <Chip
                label={item.voucher}
                size="small"
                sx={{
                  backgroundColor: '#e8f5e9',
                  color: '#008B76',
                  fontSize: '0.7rem',
                  height: '20px'
                }}
              />
            </Stack>
            
            <Typography variant="caption" sx={{ color: '#ff9800' }}>
              {item.flashSale}
            </Typography>
          </Box>

          {/* Các nút thao tác */}
          <Stack 
            direction="row" 
            spacing={1}
            sx={{
              flexShrink: 0,
              width: '200px'
            }}
          >
            <Button
              variant="contained"
              size="small"
              startIcon={<ReplayIcon fontSize="small" />}
              sx={{
                backgroundColor: '#008B76',
                color: 'white',
                fontSize: '0.75rem',
                px: 1,
                py: 0.5,
                minWidth: '90px'
              }}
            >
              Mua lại
            </Button>
            
            <Button
              variant="outlined"
              size="small"
              startIcon={<SearchIcon fontSize="small" />}
              sx={{
                borderColor: '#008B76',
                color: '#008B76',
                fontSize: '0.75rem',
                px: 1,
                py: 0.5,
                minWidth: '90px'
              }}
            >
              Tương tự
            </Button>
          </Stack>
        </Paper>
      ))}

      <Divider sx={{ my: 2 }} />

      {/* Phần đề xuất */}
      <Typography variant="body2" sx={{ color: '#008B76', mb: 1 }}>
        Sản phẩm tương tự
      </Typography>
    </Box>
  );
};

export default PurchasedProducts;
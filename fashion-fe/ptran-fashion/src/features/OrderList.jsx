import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Paper,
  Pagination,
  Stack
} from '@mui/material';
import {
  LocalShipping,
  CheckCircle,
  Cancel,
  HourglassEmpty,
  Payment
} from '@mui/icons-material';

const OrderList = ({ orders, onOrderClick, page, totalPages, onPageChange }) => {
  const primaryColor = '#005244';
  const lightPrimary = '#e0f2f1';

  const statusConfig = {
    'DELIVERY': {
      label: 'Đang vận chuyển', 
      icon: <LocalShipping fontSize="small" />,
      color: primaryColor,
      bgColor: lightPrimary
    },
    'COMPLETE': {
      label: 'Hoàn thành',
      icon: <CheckCircle fontSize="small" />,
      color: '#2e7d32',
      bgColor: '#e8f5e9'
    },
    'CANCELLED': {
      label: 'Đã hủy',
      icon: <Cancel fontSize="small" />,
      color: '#c62828',
      bgColor: '#ffebee'
    },
    'CREATE': {
      label: 'Đang duyệt',
      icon: <HourglassEmpty fontSize="small" />,
      color: '#ff8f00',
      bgColor: '#fff8e1'
    },
    'PAID': {
      label: 'Đã thanh toán',
      icon: <Payment fontSize="small" />,
      color: '#1565c0',
      bgColor: '#e3f2fd'
    }
  };

  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length !== 6) return '';
    const [year, month, day] = dateArray;
    return `${day}/${month}/${year}`;
  };

  return (
    <Paper elevation={0} sx={{ 
      p: 3, 
      borderRadius: 2,
      border: `1px solid ${lightPrimary}`,
      backgroundColor: '#fff'
    }}>
      <Typography variant="h6" gutterBottom sx={{ 
        fontWeight: 'bold',
        color: primaryColor,
        mb: 3
      }}>
        Danh sách đơn hàng
      </Typography>

      {orders.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
          Bạn chưa có đơn hàng nào
        </Typography>
      ) : (
        <>
          <List sx={{ mb: 3 }}>
            {orders.map((order) => (
              <React.Fragment key={order.orderId}>
                <ListItem 
                  sx={{ 
                    py: 2, 
                    px: 0,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f5fbfa'
                    }
                  }}
                  onClick={() => onOrderClick(order)}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          #{order.orderCode}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(order.orderDate)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Chip
                            label={statusConfig[order.status]?.label || order.status}
                            size="small"
                            icon={statusConfig[order.status]?.icon}
                            sx={{
                              mr: 1,
                              backgroundColor: statusConfig[order.status]?.bgColor || '#f5f5f5',
                              color: statusConfig[order.status]?.color || '#616161',
                              fontWeight: 'bold',
                              '& .MuiChip-icon': {
                                color: statusConfig[order.status]?.color || '#616161'
                              }
                            }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: primaryColor }}>
                            {order.total.toLocaleString('vi-VN')} VND
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider component="li" sx={{ borderColor: lightPrimary }} />
              </React.Fragment>
            ))}
          </List>

          {totalPages >= 1 && (
            <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
              <Pagination
                count={totalPages}
                page={page + 1}
                onChange={(e, value) => onPageChange(value - 1)}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: primaryColor,
                    border: `1px solid ${lightPrimary}`,
                    '&:hover': {
                      backgroundColor: lightPrimary
                    }
                  },
                  '& .MuiPaginationItem-page.Mui-selected': {
                    backgroundColor: lightPrimary,
                    color: primaryColor,
                    fontWeight: 'bold',
                    border: `1px solid ${primaryColor}`
                  }
                }}
              />
            </Stack>
          )}
        </>
      )}
    </Paper>
  );
};

export default OrderList;
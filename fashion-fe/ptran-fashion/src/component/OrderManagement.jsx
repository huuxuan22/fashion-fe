import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Avatar,
  Pagination,
  Stack
} from '@mui/material';
import {
  CheckCircle as ApprovedIcon,
  LocalShipping as ShippingIcon,
  DoneAll as DeliveredIcon,
  AssignmentReturn as ReturnedIcon,
  HourglassEmpty as PendingIcon,
  Send as SendIcon
} from '@mui/icons-material';

const OrderManagement = () => {
  // Dữ liệu mẫu các đơn hàng
  const allOrders = [
    {
      id: 1,
      customer: 'Nguyễn Văn A',
      avatar: 'https://i.pravatar.cc/150?img=1',
      email: 'nguyenvana@example.com',
      phone: '0987654321',
      orderDate: '2023-05-15',
      total: 1250000,
      status: 'pending',
      items: [
        { name: 'Áo thun nam', quantity: 2, price: 250000 },
        { name: 'Quần jean', quantity: 1, price: 750000 }
      ]
    },
    // ... (giữ nguyên các đơn hàng mẫu khác)
    // Thêm nhiều đơn hàng hơn để demo phân trang
    {
      id: 6,
      customer: 'Trần Văn F',
      avatar: 'https://i.pravatar.cc/150?img=6',
      email: 'tranvanf@example.com',
      phone: '0912345678',
      orderDate: '2023-05-20',
      total: 850000,
      status: 'approved',
      items: [
        { name: 'Áo sơ mi', quantity: 1, price: 350000 },
        { name: 'Quần tây', quantity: 1, price: 500000 }
      ]
    },
    // Thêm thêm các đơn hàng khác...
  ];

  const [orders, setOrders] = useState(allOrders);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Tính toán dữ liệu phân trang
  const count = Math.ceil(orders.length / rowsPerPage);
  const paginatedOrders = orders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleSendNotification = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    alert(`Đã gửi thông báo cho ${order.customer} về trạng thái đơn hàng #${orderId}`);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const statusStyles = {
    pending: { color: '#ff9800', icon: <PendingIcon />, label: 'Chờ duyệt' },
    approved: { color: '#2196f3', icon: <ApprovedIcon />, label: 'Đã duyệt' },
    shipping: { color: '#673ab7', icon: <ShippingIcon />, label: 'Đang giao' },
    delivered: { color: '#4caf50', icon: <DeliveredIcon />, label: 'Đã giao' },
    returned: { color: '#f44336', icon: <ReturnedIcon />, label: 'Đã trả hàng' }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3, color: '#00917B' }}>
        ALL ORDER
      </Typography>
      
      <TableContainer 
        component={Paper} 
        elevation={3}
        sx={{ flex: 1, mb: 2 }}
      >
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Mã đơn</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Khách hàng</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Thông tin liên hệ</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ngày đặt</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Sản phẩm</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tổng tiền</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={order.avatar} sx={{ mr: 2 }} />
                    {order.customer}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <div>{order.email}</div>
                    <div>{order.phone}</div>
                  </Box>
                </TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>
                  <Box>
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.name} (x{item.quantity}) - {item.price.toLocaleString()}đ
                      </div>
                    ))}
                  </Box>
                </TableCell>
                <TableCell>{order.total.toLocaleString()}đ</TableCell>
                <TableCell>
                  <Chip
                    icon={statusStyles[order.status].icon}
                    label={statusStyles[order.status].label}
                    sx={{ 
                      backgroundColor: `${statusStyles[order.status].color}20`,
                      color: statusStyles[order.status].color,
                      fontWeight: 'bold'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>Thay đổi</InputLabel>
                      <Select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        label="Thay đổi"
                      >
                        <MenuItem value="pending">Chờ duyệt</MenuItem>
                        <MenuItem value="approved">Đã duyệt</MenuItem>
                        <MenuItem value="shipping">Đang giao</MenuItem>
                        <MenuItem value="delivered">Đã giao</MenuItem>
                        <MenuItem value="returned">Đã trả hàng</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<SendIcon />}
                      onClick={() => handleSendNotification(order.id)}
                      sx={{ 
                        bgcolor: '#00917B',
                        '&:hover': { bgcolor: '#007965' }
                      }}
                    >
                      Gửi
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang - cố định ở góc phải */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Stack spacing={2}>
          <Pagination
            count={count}
            page={page}
            onChange={handlePageChange}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#00917B',
              },
              '& .Mui-selected': {
                backgroundColor: 'rgba(0, 145, 123, 0.2)',
                color: '#00917B',
                fontWeight: 'bold'
              },
              '& .MuiPaginationItem-root:hover': {
                backgroundColor: 'rgba(0, 145, 123, 0.1)',
              }
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default OrderManagement;
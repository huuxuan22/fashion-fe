import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Divider,
  Chip,
  Button,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import PrintIcon from '@mui/icons-material/Print';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Tạo theme với bảng màu phù hợp
const theme = createTheme({
  palette: {
    primary: {
      main: '#02907b',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

const OrderDetailPage = () => {
  // State cho dialog hủy đơn
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState('Đang xử lý');

  // Dữ liệu đơn hàng mẫu
  const orderData = {
    orderId: 'DH-02907b',
    date: new Date().toLocaleDateString(),
    customer: {
      name: 'Nguyễn Văn A',
      phone: '0987654321',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      email: 'nguyenvana@gmail.com'
    },
    items: [
      {
        id: 1,
        productName: 'Áo thun nam cao cấp',
        quantity: 2,
        size: 'L',
        color: '#000000',
        price: 250000,
        image: 'https://via.placeholder.com/80/02907b/FFFFFF?text=Áo+Thun'
      },
      {
        id: 2,
        productName: 'Quần jeans nữ slim fit',
        quantity: 1,
        size: 'M',
        color: '#0000FF',
        price: 450000,
        image: 'https://via.placeholder.com/80/02907b/FFFFFF?text=Quần+Jeans'
      },
    ],
    note: 'Giao hàng giờ hành chính',
    subtotal: 950000,
    shippingFee: 30000,
    discount: 50000,
    total: 930000,
    paymentMethod: 'Chuyển khoản',
    shippingMethod: 'Giao hàng tiêu chuẩn'
  };

  const handleCancelOrder = () => {
    setOpenCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    // Xử lý hủy đơn hàng ở đây
    setOrderStatus('Đã hủy');
    setOpenCancelDialog(false);
    setSnackbarOpen(true);
    
    // Gọi API hủy đơn hàng trong thực tế
    // axios.post('/api/cancel-order', { orderId: orderData.orderId })
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: 'background.default', 
        p: 3 
      }}>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 900, margin: '0 auto' }}>
          {/* Nút quay lại */}
          <Button 
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 2 }}
            onClick={() => window.history.back()}
          >
            Quay lại
          </Button>
          
          {/* Header đơn hàng */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3
          }}>
            <Box>
              <Typography variant="h4" color="primary">
                ĐƠN HÀNG #{orderData.orderId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ngày đặt: {orderData.date}
              </Typography>
            </Box>
            <Chip 
              label={orderStatus}
              icon={orderStatus === 'Đã hủy' ? <CancelIcon /> : <CheckCircleIcon />}
              color={
                orderStatus === 'Đã hủy' ? 'error' : 
                orderStatus === 'Đang xử lý' ? 'warning' : 'success'
              }
              variant="outlined"
            />
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          {/* Thông tin khách hàng */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Thông tin khách hàng
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box>
                <Typography variant="body1">
                  <strong>Tên:</strong> {orderData.customer.name}
                </Typography>
                <Typography variant="body1">
                  <strong>SĐT:</strong> {orderData.customer.phone}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">
                  <strong>Email:</strong> {orderData.customer.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Địa chỉ:</strong> {orderData.customer.address}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          {/* Thông tin vận chuyển & thanh toán */}
          <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Phương thức vận chuyển</strong>
              </Typography>
              <Typography>{orderData.shippingMethod}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Phương thức thanh toán</strong>
              </Typography>
              <Typography>{orderData.paymentMethod}</Typography>
            </Box>
          </Box>
          
          {/* Bảng sản phẩm */}
          <TableContainer component={Paper} elevation={0} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', width: '50px' }}>STT</TableCell>
                  <TableCell sx={{ color: 'white' }}>Sản phẩm</TableCell>
                  <TableCell align="center" sx={{ color: 'white', width: '80px' }}>SL</TableCell>
                  <TableCell align="center" sx={{ color: 'white', width: '70px' }}>Size</TableCell>
                  <TableCell align="center" sx={{ color: 'white', width: '70px' }}>Màu</TableCell>
                  <TableCell align="right" sx={{ color: 'white', width: '120px' }}>Đơn giá</TableCell>
                  <TableCell align="right" sx={{ color: 'white', width: '150px' }}>Thành tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData.items.map((item, index) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          src={item.image} 
                          alt={item.productName}
                          variant="rounded"
                          sx={{ width: 60, height: 60, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="body1">{item.productName}</Typography>
                          <Typography variant="body2" color="text.secondary">SKU: {item.id}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="center">{item.size}</TableCell>
                    <TableCell align="center">
                      <Box 
                        sx={{ 
                          display: 'inline-block', 
                          width: 20, 
                          height: 20, 
                          backgroundColor: item.color, 
                          border: '1px solid #ddd',
                          borderRadius: '50%'
                        }} 
                      />
                    </TableCell>
                    <TableCell align="right">
                      {item.price.toLocaleString()}đ
                    </TableCell>
                    <TableCell align="right">
                      {(item.price * item.quantity).toLocaleString()}đ
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {/* Tổng cộng và ghi chú */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 4
          }}>
            <Box sx={{ width: '60%' }}>
              <Typography variant="h6" gutterBottom>
                Ghi chú đơn hàng
              </Typography>
              <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                  {orderData.note}
                </Typography>
              </Paper>
            </Box>
            
            <Box sx={{ 
              width: '35%', 
              backgroundColor: '#f5f5f5', 
              p: 2,
              borderRadius: 1
            }}>
              <Typography variant="h6" gutterBottom>
                Thanh toán
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mb: 1
              }}>
                <Typography>Tạm tính:</Typography>
                <Typography>{orderData.subtotal.toLocaleString()}đ</Typography>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mb: 1
              }}>
                <Typography>Phí vận chuyển:</Typography>
                <Typography>{orderData.shippingFee.toLocaleString()}đ</Typography>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mb: 1
              }}>
                <Typography>Giảm giá:</Typography>
                <Typography color="error">-{orderData.discount.toLocaleString()}đ</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mb: 1
              }}>
                <Typography variant="subtitle1">
                  <strong>Tổng cộng:</strong>
                </Typography>
                <Typography variant="subtitle1">
                  <strong>{orderData.total.toLocaleString()}đ</strong>
                </Typography>
              </Box>
            </Box>
          </Box>
          
          {/* Các nút hành động */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            gap: 2,
            mt: 3
          }}>
            <Button 
              variant="outlined" 
              startIcon={<PrintIcon />}
              onClick={handlePrint}
            >
              In đơn hàng
            </Button>
            
            {orderStatus !== 'Đã hủy' && (
              <Button 
                variant="outlined" 
                color="error"
                startIcon={<CancelIcon />}
                onClick={handleCancelOrder}
              >
                Hủy đơn hàng
              </Button>
            )}
          </Box>
        </Paper>
        
        {/* Dialog xác nhận hủy đơn */}
        <Dialog
          open={openCancelDialog}
          onClose={() => setOpenCancelDialog(false)}
        >
          <DialogTitle>Xác nhận hủy đơn hàng</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc chắn muốn hủy đơn hàng #{orderData.orderId}? 
              Thao tác này không thể hoàn tác.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCancelDialog(false)}>Quay lại</Button>
            <Button 
              onClick={handleConfirmCancel} 
              color="error"
              variant="contained"
            >
              Xác nhận hủy
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Snackbar thông báo */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity="success"
            sx={{ width: '100%' }}
          >
            Đã hủy đơn hàng #{orderData.orderId} thành công
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default OrderDetailPage;
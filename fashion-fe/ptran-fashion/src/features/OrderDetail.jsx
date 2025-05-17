import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  LocalShipping,
  CheckCircle,
  Cancel,
  ArrowForward,
  Payment,
  ShoppingBag,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SuccessNotification from "../component/SuccessNotification";
import * as userService from "../service/user-service";
import ErrorNotification from "../component/ErrorNotification";
const OrderDetail = ({ open, order, onClose, loadData }) => {
  const [openModal, setOpenModal] = useState(false);
  const primaryColor = "#005244";
  const lightPrimary = "#e0f2f1";
  const [errorOpen, setErrorOpen] = useState(false);
  const navigate = useNavigate();
  if (!order) return null;
  const token = localStorage.getItem("token");
  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length !== 6) return "";
    const [year, month, day, hour, minute, second] = dateArray;
    return new Date(
      year,
      month - 1,
      day,
      hour,
      minute,
      second
    ).toLocaleString();
  };

  const handleCancelOrder = async () => {
    await userService
      .cancelOrder({ token: token, orderId: order.orderId })
      .then((data) => {
        if (data.success === false) {
          console.log("đã đi vào đây");
          setErrorOpen(true);
        } else {
          setOpenModal(true);
          // loadData();
          // setTimeout(() => {
          //   onClose();
          //   window.location.reload();
          // }, 2000);
        }
      });
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "DELIVERY":
        return <LocalShipping fontSize="small" />;
      case "COMPLETE":
        return <CheckCircle fontSize="small" color="success" />;
      case "CANCELLED":
        return <Cancel fontSize="small" color="error" />;
      case "PENDING":
        return <ShoppingBag fontSize="small" />;
      case "PAID":
        return <Payment fontSize="small" color="primary" />;
      default:
        return <ArrowForward fontSize="small" />;
    }
  };

  const getActiveStep = (status) => {
    switch (status) {
      case "PENDING":
        return 0;
      case "PAID":
        return 1;
      case "DELIVERY":
        return 2;
      case "COMPLETE":
        return 3;
      case "CANCELLED":
        return -1;
      default:
        return 0;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ color: primaryColor, fontWeight: "bold" }}>
        Order Details - {order.orderCode}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stepper activeStep={getActiveStep(order.status)} alternativeLabel>
              <Step>
                <StepLabel>Pending</StepLabel>
              </Step>
              <Step>
                <StepLabel>Paid</StepLabel>
              </Step>
              <Step>
                <StepLabel>Shipping</StepLabel>
              </Step>
              <Step>
                <StepLabel>Completed</StepLabel>
              </Step>
            </Stepper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Order Information
            </Typography>
            <Box
              sx={{
                p: 2,
                border: `1px solid ${lightPrimary}`,
                borderRadius: 1,
              }}
            >
              <Typography variant="body2">
                <strong>Order Code:</strong> {order.orderCode}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong>
                <Chip
                  label={order.status}
                  size="small"
                  icon={getStatusIcon(order.status)}
                  sx={{
                    ml: 1,
                    backgroundColor:
                      order.status === "DELIVERY"
                        ? lightPrimary
                        : order.status === "COMPLETE"
                        ? "#e8f5e9"
                        : order.status === "CANCELLED"
                        ? "#ffebee"
                        : order.status === "PAID"
                        ? "#e3f2fd"
                        : "#fff3e0",
                    color:
                      order.status === "DELIVERY"
                        ? primaryColor
                        : order.status === "COMPLETE"
                        ? "#2e7d32"
                        : order.status === "CANCELLED"
                        ? "#c62828"
                        : order.status === "PAID"
                        ? "#1565c0"
                        : "#e65100",
                    fontWeight: "bold",
                  }}
                />
              </Typography>
              <Typography variant="body2">
                <strong>Order Date:</strong> {formatDate(order.orderDate)}
              </Typography>
              <Typography variant="body2">
                <strong>Payment Method:</strong> {order.paymentType}
              </Typography>
              {order.note && (
                <Typography variant="body2">
                  <strong>Note:</strong> {order.note}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Customer Information
            </Typography>
            <Box
              sx={{
                p: 2,
                border: `1px solid ${lightPrimary}`,
                borderRadius: 1,
              }}
            >
              <Typography variant="body2">
                <strong>Name:</strong> {order.users.fullName}
              </Typography>
              <Typography variant="body2">
                <strong>Phone:</strong> {order.users.numberphone}
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong> {order.users.email}
              </Typography>
              <Typography variant="body2">
                <strong>Adrress:</strong> {order.address}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Order Items
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ border: `1px solid ${lightPrimary}` }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: lightPrimary }}>
                    <TableCell>Hình ảnh</TableCell> {/* Thêm cột hình ảnh */}
                    <TableCell>Product</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderDetailsList.map((item, index) => (
                    <TableRow
                      sx={{ cursor: "pointer" }}
                      key={index}
                      onClick={() => {
                        navigate(`/product-detail`, {
                          state: {
                            productId: item.productVariant.product.productId,
                          },
                        });
                      }}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={`http://localhost:8080/image/product/${item.productVariant.product.thumbnail}`}
                            alt={item.productVariant.product.productName}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/60"; // Ảnh placeholder nếu load lỗi
                            }}
                          />
                        </Box>
                      </TableCell>

                      <TableCell>
                        {item.productVariant.product.productName}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              backgroundColor:
                                item.productVariant.color.colorCode,
                              border: "1px solid #ddd",
                            }}
                          />
                          {item.productVariant.color.colorName}
                        </Box>
                      </TableCell>
                      <TableCell>{item.productVariant.size.nameSize}</TableCell>
                      <TableCell>{item.price.toLocaleString()} VND</TableCell>
                      <TableCell>{item.quality}</TableCell>
                      <TableCell>
                        {(item.price * item.quality).toLocaleString()} VND
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Payment Summary
            </Typography>
            <Box
              sx={{
                p: 2,
                border: `1px solid ${lightPrimary}`,
                borderRadius: 1,
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body2">Subtotal:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <Typography variant="body2">
                    {order.orderDetailsList
                      .reduce((sum, item) => sum + item.price * item.quality, 0)
                      .toLocaleString()}{" "}
                    VND
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Shipping:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <Typography variant="body2">0 VND</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Total:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <Typography variant="body2">
                    <strong>{order.total.toLocaleString()} VND</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: primaryColor }}>
          Close
        </Button>
        {order.status === "CREATE" && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: primaryColor,
              "&:hover": { backgroundColor: "#003d33" },
            }}
            onClick={(e) => {
              e.preventDefault();
              e.preventDefault();
              handleCancelOrder();
            }}
          >
            Hủy đơn
          </Button>
        )}
      </DialogActions>

      {openModal && (
        <SuccessNotification
          openModal={openModal}
          onClose={onCloseModal}
          message={"Đơn hàng đã được hủy thành công!"}
        />
      )}

      <ErrorNotification
        open={errorOpen}
        title="KHÔNG THỂ HỦY ĐƠN HÀNG"
        message="VÌ đơn hàng của bạn đã được vận chuyển "
        onClose={() => setErrorOpen(false)}
        autoHideDuration={8000}
        
      />
    </Dialog>
  );
};

export default OrderDetail;

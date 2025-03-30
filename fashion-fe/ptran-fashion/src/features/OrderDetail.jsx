import React from "react";
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
} from "@mui/icons-material";

const OrderDetail = ({ open, order, onClose }) => {
  const primaryColor = "#005244";
  const lightPrimary = "#e0f2f1";

  if (!order) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case "SHIPPED":
        return <LocalShipping fontSize="small" />;
      case "DELIVERED":
        return <CheckCircle fontSize="small" color="success" />;
      case "CANCELLED":
        return <Cancel fontSize="small" color="error" />;
      default:
        return <ArrowForward fontSize="small" />;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ color: primaryColor, fontWeight: "bold" }}>
        Order Details
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stepper
              activeStep={
                order.status === "SHIPPED"
                  ? 1
                  : order.status === "DELIVERED"
                  ? 2
                  : order.status === "CANCELLED"
                  ? -1
                  : 0
              }
              alternativeLabel
            >
              <Step>
                <StepLabel>Order Placed</StepLabel>
              </Step>
              <Step>
                <StepLabel>Shipped</StepLabel>
              </Step>
              <Step>
                <StepLabel>Delivered</StepLabel>
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
                <strong>Order ID:</strong> #{order.id}
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
                      order.status === "SHIPPED"
                        ? lightPrimary
                        : order.status === "DELIVERED"
                        ? "#e8f5e9"
                        : order.status === "CANCELLED"
                        ? "#ffebee"
                        : "#fff3e0",
                    color:
                      order.status === "SHIPPED"
                        ? primaryColor
                        : order.status === "DELIVERED"
                        ? "#2e7d32"
                        : order.status === "CANCELLED"
                        ? "#c62828"
                        : "#e65100",
                    fontWeight: "bold",
                  }}
                />
              </Typography>
              <Typography variant="body2">
                <strong>Order Date:</strong> Oct 01, 2023
              </Typography>
              {order.status === "CANCELLED" && (
                <Typography variant="body2" color="error">
                  <strong>Cancellation Reason:</strong> Customer request
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Shipping Information
            </Typography>
            <Box
              sx={{
                p: 2,
                border: `1px solid ${lightPrimary}`,
                borderRadius: 1,
              }}
            >
              <Typography variant="body2">
                <strong>Recipient:</strong> John Doe
              </Typography>
              <Typography variant="body2">
                <strong>Address:</strong> 123 Main St, District 1, HCMC
              </Typography>
              <Typography variant="body2">
                <strong>Phone:</strong> 0987****56
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
                    <TableCell>Product</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.size}</TableCell>
                    <TableCell>$99.99</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>$99.99</TableCell>
                  </TableRow>
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
                  <Typography variant="body2">$99.99</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Shipping:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <Typography variant="body2">$0.00</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Total:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <Typography variant="body2">
                    <strong>$99.99</strong>
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
        {order.status === "SHIPPED" && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: primaryColor,
              "&:hover": { backgroundColor: "#003d33" },
            }}
          >
            Track Order
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetail;

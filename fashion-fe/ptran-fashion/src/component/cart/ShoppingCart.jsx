import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Checkbox,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Avatar,
  IconButton,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../layout/Header";
import { useDispatch, useSelector } from "react-redux";
import * as cartServiceRedux from "./../../redux/Cart/Action";
import { useNavigate } from "react-router-dom";
import PurchasedProducts from "../../features/PurchasedProduct";
import { ErrorToast } from "../ToastErrors";
import * as orderService from "./../../service/order-service"
import SuccessNotification from "../SuccessNotification";
const ShoppingCart = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSuccess,setOpenSucces] = useState(false);
  const loadData = async () => {
    await dispatch(cartServiceRedux.getAllCart(token));
  };

  useEffect(() => {
    loadData();
  }, [token]);

  useEffect(() => {
    loadData();
  }, []);

  const { carts } = useSelector((store) => store);

  const handleProductClick = (productId) => {
    navigate(`/product-detail`, { state: { productId: productId } });
  };

  const handleSelectItem = (cartId, isSelected) => {
    if (isSelected) {
      setSelectedItems((prev) => [...prev, cartId]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== cartId));
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(carts.carts?.map((cart) => cart.cartId) || []);
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      console.log("danh sách bạn chọn: ",selectedItems);
      await orderService.deleteCart(selectedItems,token).then(() => {
          loadData();
          setOpenSucces(true)
      })
      //
      setSelectedItems([]);
      loadData(); // Refresh cart data after deletion
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };

  const calculateTotal = () => {
    if (!carts?.carts) return 0;
    return carts?.carts
      .filter((cart) => selectedItems.includes(cart?.cartId))
      .reduce((total, cart) => {
        const item = cart.items[0];
        const price = item.product
          ? item.product.price
          : item.productVariant.price;
        return total + price * cart.quantity;
      }, 0);
  };

  const handleCheckout = (item) => {
    console.log("Item mà bạn đã chọn: ", item);

    // Kiểm tra xem có sản phẩm nào KHÔNG hợp lệ không
    const hasInvalidProduct = item.some((cart) => cart.items[0]?.product);
    const cartIds = item.map((cart) => cart.cartId)
    if (hasInvalidProduct) {
      setOpen(true); // mở cảnh báo hoặc modal nếu có lỗi
    } else {
      const order = item.map((cart) => {
        return {
          product: cart.items[0].productVariant.product,
          size: cart.items[0].productVariant.size,
          color: cart.items[0].productVariant.color,
          stock: cart.items[0].quantity,
        };
      });

      navigate(`/payment`, { state: { order: order,place : true,cartIds: cartIds } });
    }
  };

  const onClose = () => {
    setOpen(false);
  };
  const onCloseSuccess = () => {
    setOpenSucces(false);
  }

  const selectedCount = selectedItems.length;

  return (
    <div>
      <Header />
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          py: 2,
          px: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "#008B76",
          }}
        >
          Giỏ hàng của bạn
        </Typography>

        <Grid container spacing={2}>
          {/* Left Column - Products */}
          <Grid item xs={12} md={9}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                border: "1px solid #e0e0e0",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Checkbox
                  checked={
                    selectedItems.length === carts.carts?.length &&
                    carts.carts.length > 0
                  }
                  indeterminate={
                    selectedItems.length > 0 &&
                    selectedItems.length < carts.carts?.length
                  }
                  onChange={handleSelectAll}
                />
                <Typography variant="body1" sx={{ mr: 2 }}>
                  Chọn tất cả ({carts.carts?.length || 0})
                </Typography>
                {selectedCount > 0 && (
                  <IconButton size="small" onClick={handleDeleteSelected}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              <List
                sx={{
                  maxHeight: "600px",
                  overflow: "auto",
                  "& .MuiListItem-root": {
                    alignItems: "flex-start",
                  },
                }}
              >
                {carts?.carts?.length > 0 ? (
                  [...carts.carts].reverse().map((cart) => {
                    // Thêm .reverse() để đảo ngược mảng
                    const item = cart?.items[0];
                    const product =
                      item?.product || item?.productVariant.product;
                    const isSelected = selectedItems.includes(cart?.cartId);

                    return (
                      <ListItem
                        key={cart?.cartId}
                        sx={{
                          p: 2,
                          mb: 2,
                          border: "1px solid #f5f5f5",
                          borderRadius: 1,
                          backgroundColor: isSelected
                            ? "rgba(0, 139, 118, 0.05)"
                            : "inherit",
                          minHeight: "120px",
                        }}
                        secondaryAction={
                          <Typography variant="body1" fontWeight="bold">
                            {cart?.items[0]?.product
                              ? cart?.items[0]?.product.price
                              : cart?.items[0]?.productVariant.product
                                  .price}{" "}
                            VND
                          </Typography>
                        }
                      >
                        <Checkbox
                          checked={isSelected}
                          onChange={(e) =>
                            handleSelectItem(cart.cartId, e.target.checked)
                          }
                          sx={{ mr: 1 }}
                        />

                        <Avatar
                          src={
                            product?.thumbnail
                              ? `http://localhost:8080/image/product/${product.thumbnail}`
                              : "/placeholder-product.jpg"
                          }
                          variant="square"
                          sx={{
                            width: 80,
                            height: 100,
                            borderRadius: 1,
                            mr: 2,
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleProductClick(
                              cart?.items[0].product
                                ? cart?.items[0].product.productId
                                : cart?.items[0].productVariant.product
                                    .productId
                            )
                          }
                        />
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: "medium",
                                cursor: "pointer",
                                "&:hover": { textDecoration: "underline" },
                                mb: 1,
                              }}
                              onClick={() =>
                                handleProductClick(
                                  cart?.items[0].product
                                    ? cart?.items[0].product.productId
                                    : cart?.items[0].productVariant.product
                                        .productId
                                )
                              }
                            >
                              {product?.productName}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography
                                variant="body2"
                                display="block"
                                sx={{ mt: 1 }}
                              >
                                Số lượng:{" "}
                                {cart?.items[0].product
                                  ? 1
                                  : cart?.items[0]?.quantity}
                              </Typography>
                              {item?.productVariant && (
                                <>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: "success.main",
                                      fontWeight: "bold",
                                      mt: 1,
                                    }}
                                  >
                                    Size:{" "}
                                    {
                                      cart?.items[0]?.productVariant.size
                                        .nameSize
                                    }
                                  </Typography>

                                  <Typography
                                    variant="body2"
                                    display="flex"
                                    alignItems="center"
                                    sx={{
                                      color: "success.main",
                                      fontWeight: "bold",
                                      mt: 1,
                                    }}
                                  >
                                    Color:{" "}
                                    <Box
                                      sx={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: "3px",
                                        border: "1px solid #ccc",
                                        backgroundColor:
                                          cart?.items[0]?.productVariant.color
                                            .colorCode,
                                        display: "inline-block",
                                        ml: 1,
                                        mr: 1,
                                      }}
                                    />
                                    {
                                      cart?.items[0]?.productVariant.color
                                        .colorName
                                    }
                                  </Typography>
                                </>
                              )}
                            </>
                          }
                        />
                      </ListItem>
                    );
                  })
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      py: 2,
                      color: "text.secondary",
                    }}
                  >
                    Giỏ hàng của bạn đang trống
                  </Typography>
                )}
              </List>
            </Paper>
          </Grid>

          {/* Right Column - Summary */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                border: "1px solid #e0e0e0",
                position: "sticky",
                top: 16,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  color: "#008B76",
                }}
              >
                Tóm tắt đơn hàng
              </Typography>

              <List dense>
                <ListItem disableGutters sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={`Sản phẩm (${selectedCount})`}
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                  <Typography variant="body2">
                    {new Intl.NumberFormat("vi-VN").format(calculateTotal())}{" "}
                    VND
                  </Typography>
                </ListItem>
                <Divider sx={{ my: 1 }} />
                <ListItem disableGutters sx={{ py: 1 }}>
                  <ListItemText
                    primary="Tổng cộng"
                    primaryTypographyProps={{
                      variant: "body1",
                      fontWeight: "bold",
                    }}
                  />
                  <Typography variant="body1" fontWeight="bold" color="#008B76">
                    {new Intl.NumberFormat("vi-VN").format(calculateTotal())}{" "}
                    VND
                  </Typography>
                </ListItem>
              </List>

              <Button
                variant="contained"
                fullWidth
                size="small"
                startIcon={<LocalMallIcon />}
                sx={{
                  mt: 2,
                  backgroundColor: "#008B76",
                  border: open ? "2px solid red" : "none",
                  animation: open ? "shake 0.4s ease-in-out" : "none",
                  "&:hover": {
                    backgroundColor: "#00695c",
                  },
                  "@keyframes shake": {
                    "0%": { transform: "translateX(0)" },
                    "25%": { transform: "translateX(-4px)" },
                    "50%": { transform: "translateX(4px)" },
                    "75%": { transform: "translateX(-4px)" },
                    "100%": { transform: "translateX(0)" },
                  },
                }}
                disabled={selectedCount === 0}
                onClick={() => {
                  const selectedCartItems = carts.carts.filter((cart) =>
                    selectedItems.includes(cart.cartId)
                  );
                  handleCheckout(selectedCartItems);
                }}
              >
                Thanh toán ({selectedCount})
              </Button>

              <Button
                variant="outlined"
                fullWidth
                size="small"
                startIcon={<FavoriteBorderIcon />}
                sx={{
                  mt: 1,
                  color: "#008B76",
                  borderColor: "#008B76",
                  "&:hover": {
                    backgroundColor: "rgba(0, 139, 118, 0.1)",
                  },
                }}
              >
                Mua sau
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <PurchasedProducts />
      {open && (
        <ErrorToast
          open={open}
          onClose={onClose}
          message={
            "Có vài sản phẩm Bạn chưa chọn size và màu để đi đến checkOut"
          }
        />
      )}

      {
        openSuccess && (
          <SuccessNotification 
            open = {openSuccess}
            onClose={onCloseSuccess}
            message={"Đã xóa thành công"}
          />
        )
      }
    </div>
  );
};

export default ShoppingCart;

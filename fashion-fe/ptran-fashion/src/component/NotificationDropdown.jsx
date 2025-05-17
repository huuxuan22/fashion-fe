import React, { useEffect, useRef, useState } from "react";
import {
  IconButton,
  Badge,
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
  ListItemIcon,
  Slide,
  Fade,
  Grow,
  styled,
  CircularProgress,
  Drawer,
  Stack,
  Collapse,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DiscountIcon from "@mui/icons-material/Discount";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import * as notificationsServiceRedux from "./../redux/Notification/Action";
import { useDispatch, useSelector } from "react-redux";
import * as userService from "./../service/user-service";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const CollapseContent = styled(Box)({
  padding: "0 12px 12px 12px",
  borderTop: "1px solid #eee",
});
const OrderDetailsItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "8px 0",
  fontSize: "0.9rem",
});

// Styled components với thiết kế full-width
const FullScreenDrawer = styled(Drawer)({
  "& .MuiDrawer-paper": {
    width: "30%",
    maxWidth: "100vw",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    boxShadow: "none",
    borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
    overflow: "hidden",
  },
});

const NotificationHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "sticky",
  top: 0,
  zIndex: 1,
}));

const NotificationTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: "1.5rem",
  color: "#008b76",
});

const NotificationContent = styled(Box)({
  padding: "16px",
  height: "calc(100vh - 120px)",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: 8,
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#008b76",
    borderRadius: 4,
  },
});

const NotificationItem = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  marginBottom: "16px",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 139, 118, 0.15)",
  },
}));

const NotificationItemHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "16px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
});

const NotificationAvatar = styled(Avatar)({
  width: 48,
  height: 48,
  marginRight: "16px",
  border: "2px solid #008b76",
});

const NotificationTime = styled(Typography)({
  fontSize: "0.75rem",
  color: "#6c757d",
  marginTop: "4px",
});

const NotificationBody = styled(Box)({
  padding: "16px",
});

const OrderDetailsContainer = styled(Box)({
  marginTop: "12px",
  padding: "12px",
  backgroundColor: "rgba(0, 139, 118, 0.03)",
  borderRadius: "8px",
  borderLeft: "3px solid #008b76",
});

const ProductItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "8px 0",
  borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
  "&:last-child": {
    borderBottom: "none",
  },
});

const ProductImage = styled(Avatar)({
  width: 40,
  height: 40,
  marginRight: 12,
  border: "1px solid #e0e0e0",
});

const ProductInfo = styled(Box)({
  flex: 1,
});

const ProductName = styled(Typography)({
  fontSize: "0.9rem",
  fontWeight: 500,
  color: "#333",
});

const ProductPrice = styled(Typography)({
  fontSize: "0.85rem",
  color: "#008b76",
  fontWeight: 600,
});

const OrderSummary = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "12px",
  paddingTop: "12px",
  borderTop: "1px dashed #008b76",
});

const OrderTotal = styled(Typography)({
  fontWeight: 700,
  color: "#008b76",
  fontSize: "1rem",
});

const EmptyState = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "60vh",
  textAlign: "center",
  "& svg": {
    fontSize: "4rem",
    color: "rgba(0, 139, 118, 0.2)",
    marginBottom: "16px",
  },
});

const CompactItemHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "12px",
  position: "relative",
});
const PAGE_SIZE = 10;

const NotificationDropdown = ({ length }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentOpenId, setCurrentOpenId] = useState(null);
  const contentRef = useRef(null);

  const { notification } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");


  console.log("tất cả đơn hàng của bạn: ",notification.notifications);
  
  const loadNotifications = async (pageNum) => {
    setLoading(true);
    await dispatch(notificationsServiceRedux.setNotificationToZero());
    await userService.updateNotification(token);
    try {
      const result = await dispatch(
        notificationsServiceRedux.getAllNotification({
          size: PAGE_SIZE,
          page: pageNum,
          token: token,
        })
      );

      if (result.payload?.isLast || result.payload?.data?.last) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Lỗi khi tải thông báo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setPage(0);
    setHasMore(true);
    loadNotifications(0);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleItemClick = (notificationId, coupon, message) => {
    if (message === 'COUPON NEW') {
      navigate("/coupon-detail", {
      state: { coupon: coupon },
      replace: false, // Đảm bảo không dùng replace nếu không cần thiết
    });
    } else {
      if (currentOpenId === notificationId) {
      navigate(`/profile`);
    } else {
      setCurrentOpenId(notificationId);
    }
    }
  };
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadNotifications(nextPage);
  };

  const handleScroll = () => {
    if (!contentRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      handleLoadMore();
    }
  };

  const formatTime = (createAtArray) => {
    if (!createAtArray || createAtArray.length !== 6) return "";

    const [year, month, day, hour, minute, second] = createAtArray;
    const createdAt = new Date(year, month - 1, day, hour, minute, second);
    const now = new Date();
    const diffInSeconds = Math.floor((now - createdAt) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} giây trước`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
  };
  console.log("Notification: ",);
  

  const renderNotificationItem = (note, index) => {
    const isOrderNote = !!note.order;
    const isOpen = currentOpenId === note.notificationId;

    return (
      <NotificationItem
        key={note.notificationId}
        onClick={() =>
          handleItemClick(note.notificationId, note.coupon, note.message)
        }
        sx={{cursor:'pointer'}}
      >
        <CompactItemHeader>
          {isOrderNote ? (
            <NotificationAvatar>
              {note.order.status === "COMPLETE" ? (
                <CheckCircleIcon fontSize="small" />
              ) : (
                <LocalShippingIcon fontSize="small" />
              )}
            </NotificationAvatar>
          ) : (
            <NotificationAvatar>
              <DiscountIcon fontSize="small" />
            </NotificationAvatar>
          )}

          <Box flex={1}>
            <Typography variant="subtitle2" lineHeight={1.3}>
              {note.message || "Thông báo mới"}
            </Typography>
            <NotificationTime>{formatTime(note.createAt)}</NotificationTime>
          </Box>

          {isOrderNote && (
            <ExpandMoreIcon
              sx={{
                transform: isOpen ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
                color: "#666",
              }}
            />
          )}
        </CompactItemHeader>

        {isOrderNote && (
          <Collapse in={isOpen}>
            <CollapseContent>
              <Typography variant="body2" color="textSecondary" mb={1}>
                Mã đơn hàng: {note.order.orderCode}
              </Typography>

              {note.order.orderDetailsList?.map((item, idx) => (
                <OrderDetailsItem key={idx}>
                  <Typography flex={1}>
                    {item.productVariant?.product?.productName}
                    {item.productVariant?.size.sizeName &&
                      ` (${item.productVariant.size.sizeName})`}
                  </Typography>
                  <Typography variant="body2">x{item.quality}</Typography>
                  <Typography variant="body2" width={80} textAlign="right">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price)}
                  </Typography>
                </OrderDetailsItem>
              ))}

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
              >
                <Typography variant="body2">Tổng cộng:</Typography>
                <Typography variant="subtitle2">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(note.order.total)}
                </Typography>
              </Box>
            </CollapseContent>
          </Collapse>
        )}
      </NotificationItem>
    );
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          position: "relative",
          "&:hover": { backgroundColor: "#008b7611" },
        }}
      >
        <Badge
          badgeContent={length || 0}
          color="error"
          overlap="circular"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.7rem",
              height: 18,
              minWidth: 18,
              padding: "0 4px",
            },
          }}
        >
          <NotificationsIcon sx={{ color: "#008b76" }} />
        </Badge>
      </IconButton>

      <FullScreenDrawer anchor="right" open={open} onClose={handleClose}>
        <NotificationHeader>
          <Typography variant="h6">Thông báo</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </NotificationHeader>

        <NotificationContent ref={contentRef}>
          {notification.notifications?.map((note, index) =>
            renderNotificationItem(note, index)
          )}

          <NotificationContent ref={contentRef} onScroll={handleScroll}>
            {notification.notifications?.length > 0 ? (
              <>
                {notification.notifications.map((note, index) =>
                  renderNotificationItem(note, index)
                )}

                {loading && (
                  <Box display="flex" justifyContent="center" py={3}>
                    <CircularProgress size={24} sx={{ color: "#008b76" }} />
                  </Box>
                )}

                {!loading && hasMore && (
                  <Box display="flex" justifyContent="center" py={2}>
                    <Button
                      onClick={handleLoadMore}
                      variant="outlined"
                      sx={{
                        color: "#008b76",
                        borderColor: "#008b76",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "rgba(0, 139, 118, 0.08)",
                          borderColor: "#008b76",
                        },
                      }}
                    >
                      Tải thêm thông báo
                    </Button>
                  </Box>
                )}
              </>
            ) : (
              <EmptyState>
                <NotificationsIcon />
                <Typography variant="h6" color="textSecondary" mt={2}>
                  Không có thông báo mới
                </Typography>
                <Typography variant="body2" color="textSecondary" mt={1}>
                  Chúng tôi sẽ thông báo khi có cập nhật mới
                </Typography>
              </EmptyState>
            )}
          </NotificationContent>
        </NotificationContent>
      </FullScreenDrawer>
    </>
  );
};

export default NotificationDropdown;

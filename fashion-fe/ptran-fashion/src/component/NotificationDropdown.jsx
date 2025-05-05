import React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
  ListItemIcon,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DiscountIcon from "@mui/icons-material/Discount";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const NotificationDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Danh sách thông báo với icon và thời gian
  const notifications = [
    {
      id: 1,
      title: "Đơn hàng của bạn đang được giao",
      content: "Đơn hàng #12345 đã được vận chuyển",
      icon: <LocalShippingIcon color="primary" />,
      time: "10 phút trước",
      image: "https://th.bing.com/th/id/OIP.uTCL9bX_dMt8iqtZNsbO0QHaHa?rs=1&pid=ImgDetMain",
    },
    {
      id: 2,
      title: "Bạn đã nhận được coupon",
      content: "Giảm 20% cho đơn hàng tiếp theo",
      icon: <DiscountIcon color="secondary" />,
      time: "1 giờ trước",
      image: "https://th.bing.com/th/id/OIP.uTCL9bX_dMt8iqtZNsbO0QHaHa?rs=1&pid=ImgDetMain",
    },
    {
      id: 3,
      title: "Thanh toán thành công",
      content: "Đơn hàng #12344 đã thanh toán thành công",
      icon: <CheckCircleIcon color="success" />,
      time: "2 ngày trước",
      image: "https://th.bing.com/th/id/OIP.uTCL9bX_dMt8iqtZNsbO0QHaHa?rs=1&pid=ImgDetMain",
    },
  ];

  return (
    <>
      <IconButton
        onClick={handleClick}
        color="inherit"
        aria-controls={open ? "notification-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            width: 350,
            maxHeight: 400,
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
            border: "none", // Bỏ đường viền
            "& .MuiMenuItem-root": {
              padding: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            Thông báo
          </Typography>
        </Box>

        <Divider />

        {notifications.length > 0 ? (
          notifications.map((note) => (
            <MenuItem key={note.id} onClick={handleClose}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                {note.icon}
              </ListItemIcon>
              <Box sx={{ flexGrow: 1, ml: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={note.image}
                    sx={{ width: 40, height: 40, mr: 1 }}
                  />
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {note.title}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {note.time}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {note.content}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <Typography variant="body2">Không có thông báo</Typography>
          </MenuItem>
        )}

        <Divider />

        <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
          <Button
            size="small"
            color="primary"
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Xem tất cả thông báo
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default NotificationDropdown;
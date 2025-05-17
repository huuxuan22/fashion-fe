import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Badge,
  Box,
  Popover,
} from "@mui/material";
import { Search, FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import CategoryDropdown from "../features/CategoryDropdown";
import { useNavigate } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SearchIcon from "@mui/icons-material/Search";
import { FaTruck } from "react-icons/fa";
import * as categoryService from "./../service/category-service";
import { useDispatch, useSelector } from "react-redux";
import * as cartServiceRedux from "./../redux/Cart/Action";
import * as userServiceRedux from "./../redux/User/Action";
import NotificationDropdown from "../component/NotificationDropdown";
import NotificationsIcon from '@mui/icons-material/Notifications';
import * as notificationSerivceRedux from "./../redux/Notification/Action";
const Header = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { notificationNew } = useSelector((store) => store.notification);
  const loadData = async () => {
    await dispatch(cartServiceRedux.getAllCart(token));
    await dispatch(userServiceRedux.currentUser(token));
    await dispatch(
      notificationSerivceRedux.getAllNotificationNew({ token: token })
    );
    await dispatch(
      notificationSerivceRedux.getAllNotification({ token, size: 7, page: 0 })
    );
  };
  const loadCategories = async () => {
    await categoryService.getAllCategory(token).then((data) => {
      setCategories(data.data);
    });
  };
  const { carts, users } = useSelector((store) => store);

  useEffect(() => {
    loadCategories();
    loadData();
  }, []);

  const handleCategoryEnter = (category, event) => {
    if (category === "Product") {
      setActiveCategory(category);
      setAnchorEl(event.currentTarget);
    }
  };

  useEffect(() => {
    console.log("Notification count changed:", notificationNew);
  }, [notificationNew]);
  const handleClose = () => {
    setAnchorEl(null);
    setActiveCategory(null);
  };

  const open = Boolean(anchorEl);
  const handleClickShoppingCart = () => {
    navigate("/shopping-cart");
  };
  const handleHomepage = () => {
    console.log("Nó đã đi vào đây");
    navigate("/");
  };
  const handleSearch = () => {
    navigate("/search");
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleIntroduce = () => {
    navigate("/introduce");
  };
  const handleContact = () => {
    navigate("/contact");
  };

  const orderLookup = () => {
    navigate('/profile')
  }

  return (
    <>
      <AppBar
        position="sticky" // Thay đổi từ "static" sang "sticky"
        sx={{
          background: "white",
          boxShadow: 1,
          px: 2,
          top: 0, // Cần thiết cho sticky
          zIndex: (theme) => theme.zIndex.drawer + 1, // Đảm bảo nổi lên trên các thành phần khác
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{ fontFamily: "cursive", color: "#388e3c", cursor: "pointer" }}
            onClick={() => handleHomepage()}
          >
            PTRAN_FASHION
          </Typography>

          {/* Menu Items */}
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {/* 1. Product Button */}
            <Button
              startIcon={<ShoppingBasketIcon />}
              sx={{
                cursor: "pointer",
                color: "#008772",
                textTransform: "none",
                fontWeight: activeCategory === "Product" ? "bold" : "normal",
                fontSize: "16px",
                fontFamily: "Arial, sans-serif",
                "&:hover": {
                  textDecoration: "underline", // Gạch chân khi hover
                  textUnderlineOffset: "4px", // Điều chỉnh vị trí gạch chân
                  fontSize: "18px",
                  backgroundColor: "transparent", // Loại bỏ màu nền
                  "& .MuiSvgIcon-root": { transform: "scale(1.1)" },
                },
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => handleCategoryEnter("Product", e)}
            >
              Product
            </Button>

            {/* 2. Introduction Button */}
            <Button
              startIcon={<InfoIcon />}
              sx={{
                cursor: "pointer",
                color: "#008772",
                textTransform: "none",
                fontWeight:
                  activeCategory === "Introduction" ? "bold" : "normal",
                fontSize: "16px",
                fontFamily: "Arial, sans-serif",
                "&:hover": {
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  "& .MuiSvgIcon-root": { transform: "scale(1.1)" },
                },
                transition: "all 0.3s ease",
              }}
              onClick={() => handleIntroduce()}
            >
              Introduction
            </Button>

            {/* 3. Contact Button */}
            <Button
              startIcon={<ContactMailIcon />}
              sx={{
                cursor: "pointer",
                color: "#008772",
                textTransform: "none",
                fontWeight: activeCategory === "Contact" ? "bold" : "normal",
                fontSize: "16px",
                fontFamily: "Arial, sans-serif",
                "&:hover": {
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  "& .MuiSvgIcon-root": { transform: "scale(1.1)" },
                },
                transition: "all 0.3s ease",
              }}
              onClick={() => {
                handleContact();
              }}
            >
              Contact
            </Button>

            {/* 4. Order Lookup Button */}
            <Button
              startIcon={<FaTruck />} // Đã thay bằng icon từ MUI
              sx={{
                cursor: "pointer",
                color: "#008772",
                textTransform: "none",
                fontWeight:
                  activeCategory === "Order Lookup" ? "bold" : "normal",
                fontSize: "16px",
                fontFamily: "Arial, sans-serif",
                "&:hover": {
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                  "& .MuiSvgIcon-root": { transform: "scale(1.1)" },
                },
                transition: "all 0.3s ease",
              }}
              onClick={() => orderLookup()}
            >
              Order Lookup
            </Button>
          </Box>

          {/* Search & Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <IconButton onClick={() => handleSearch()}>
              <Search />
            </IconButton>

            {/* User Avatar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleProfile()}
            >
              <Avatar
                src={
                  "http://localhost:8080/image/user/" +
                  users?.currentUser?.imgUrl
                }
                sx={{ width: 30, height: 30 }}
              />
              <Typography sx={{ color: "#388e3c", fontWeight: "bold" }}>
                {users?.currentUser?.username}
              </Typography>
            </Box>

            {/* Wishlist */}
            <IconButton>
              <FavoriteBorder />
            </IconButton>

            {/* Cart with Badge */}
            <IconButton onClick={() => handleClickShoppingCart()}>
              <Badge badgeContent={carts.carts.length} color="success">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Become Seller Button */}

            <NotificationDropdown
              open={notificationOpen}
              onClose={() => setNotificationOpen(false)}
              length={notificationNew?.length}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          mt: 1,
          pointerEvents: "none", // Cho phép hover tiếp tục khi di chuyển đến popover
        }}
        PaperProps={{
          sx: {
            pointerEvents: "auto", // Bật lại events khi ở trong popover
            width: "100%",
            maxWidth: "lg",
            borderRadius: 0,
            boxShadow: 3,
          },
        }}
        onMouseLeave={handleClose}
      >
        <CategoryDropdown categories={categories} onClose={handleClose} />
      </Popover>
    </>
  );
};

export default Header;

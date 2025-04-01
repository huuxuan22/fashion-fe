import React, { useState } from "react";
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

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryEnter = (category, event) => {
    setActiveCategory(category);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveCategory(null);
  };

  const open = Boolean(anchorEl);
  const handleClickShoppingCart = () => {
      navigate("/shopping-cart")
  }
  const handleHomepage = () => {
    console.log("Nó đã đi vào đây");
    navigate("/")
  } 
  const handleSearch = () => {
    navigate("/search")
  }
  const handleProfile = () => {
    navigate("/profile")
  }
  return (
    <>
      <AppBar
        position="static"
        sx={{ background: "white", boxShadow: 1, px: 2 }}
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
            sx={{ fontFamily: "cursive", color: "#388e3c",cursor: 'pointer' }}
            onClick = {() => handleHomepage()}
          >
            Zosh Bazaar
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
            {["Men", "Women", "Children", "Electronics"].map((item) => (
              <Button
                key={item}
                sx={{
                  cursor: "pointer",
                  color: activeCategory === item ? "#388e3c" : "#333",
                  textTransform: "none",
                  fontWeight: activeCategory === item ? "bold" : "normal",
                  fontSize: "16px", // Chữ to hơn
                  fontFamily: "Arial, sans-serif", // Font mặc định (thay đổi font tại đây)
                  "&:hover": {
                    color: "#388e3c", // Thay đổi màu khi hover
                    fontFamily: "Times New Roman, serif", // Thay đổi font khi hover
                    fontSize: "18px", // Kích thước chữ lớn hơn khi hover
                  },
                }}
                onMouseEnter={(e) => handleCategoryEnter(item, e)}
              >
                {item}
              </Button>
            ))}
          </Box>

          {/* Search & Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <IconButton onClick={() => handleSearch()}>
              <Search />
            </IconButton>

            {/* User Avatar */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px", cursor: 'pointer' }} onClick = {() => handleProfile()}>
              <Avatar
                src="/path-to-avatar.jpg"
                sx={{ width: 30, height: 30 }}
              />
              <Typography sx={{ color: "#388e3c", fontWeight: "bold" }}>
                ASHOK
              </Typography>
            </Box>

            {/* Wishlist */}
            <IconButton>
              <FavoriteBorder />
            </IconButton>

            {/* Cart with Badge */}
            <IconButton onClick={() => handleClickShoppingCart()}>
              <Badge badgeContent={1} color="success">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Become Seller Button */}
            <Button
              variant="outlined"
              sx={{ borderColor: "#388e3c", color: "#388e3c" }}
            >
              BECOME SELLER
            </Button>
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
          width: "100%",
          maxWidth: "lg",
          mx: "auto",
        }}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "lg",
            borderRadius: 0,
            boxShadow: 3,
          },
        }}
      >
        <CategoryDropdown onClose={handleClose} />
      </Popover>
    </>
  );
};

export default Header;

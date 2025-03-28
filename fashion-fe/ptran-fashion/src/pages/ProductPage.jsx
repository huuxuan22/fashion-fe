import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Chip,
  Collapse,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  CardActions,
  Pagination,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import StarIcon from "@mui/icons-material/Star";
import Header from "../layout/Header";

const ProductPage = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedColor, setExpandedColor] = useState(false);
  const [expandedSize, setExpandedSize] = useState(false);
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const products = [
    {
      id: 1,
      name: "GRAPHIC TEE",
      brand: "Men Originals",
      price: "C54.95",
      originalPrice: "C89.95",
      discount: "40% OFF",
      ratingCount: 10,
      imageUrl:
        "https://th.bing.com/th/id/OIP.igBz4SMjeCAZiXvhV_Rr6gHaIS?rs=1&pid=ImgDetMain",
    },
    {
      id: 1,
      name: "GRAPHIC TEE",
      brand: "Men Originals",
      price: "C54.95",
      originalPrice: "C89.95",
      discount: "40% OFF",
      ratingCount: 10,
      imageUrl:
        "https://th.bing.com/th/id/OIP.igBz4SMjeCAZiXvhV_Rr6gHaIS?rs=1&pid=ImgDetMain",
    },
    {
      id: 1,
      name: "GRAPHIC TEE",
      brand: "Men Originals",
      price: "C54.95",
      originalPrice: "C89.95",
      discount: "40% OFF",
      ratingCount: 10,
      imageUrl:
        "https://th.bing.com/th/id/OIP.igBz4SMjeCAZiXvhV_Rr6gHaIS?rs=1&pid=ImgDetMain",
    },
    {
      id: 1,
      name: "GRAPHIC TEE",
      brand: "Men Originals",
      price: "C54.95",
      originalPrice: "C89.95",
      discount: "40% OFF",
      ratingCount: 10,
      imageUrl:
        "https://th.bing.com/th/id/OIP.igBz4SMjeCAZiXvhV_Rr6gHaIS?rs=1&pid=ImgDetMain",
    },
    {
      id: 1,
      name: "GRAPHIC TEE",
      brand: "Men Originals",
      price: "C54.95",
      originalPrice: "C89.95",
      discount: "40% OFF",
      ratingCount: 10,
      imageUrl:
        "https://th.bing.com/th/id/OIP.igBz4SMjeCAZiXvhV_Rr6gHaIS?rs=1&pid=ImgDetMain",
    },
    {
      id: 1,
      name: "GRAPHIC TEE",
      brand: "Men Originals",
      price: "C54.95",
      originalPrice: "C89.95",
      discount: "40% OFF",
      ratingCount: 10,
      imageUrl:
        "https://th.bing.com/th/id/OIP.igBz4SMjeCAZiXvhV_Rr6gHaIS?rs=1&pid=ImgDetMain",
    },
    // ... other products
  ];

  const categories = [
    { name: "Men", subcategories: ["T-Shirts", "Shirts", "Pants", "Jackets"] },
    { name: "Women", subcategories: ["Dresses", "Tops", "Skirts", "Jeans"] },
    { name: "Kids", subcategories: ["Boys", "Girls", "Baby"] },
  ];

  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F3FF33",
    "#FF33F3",
    "#33FFF3",
    "#8A2BE2",
    "#FF6347",
    "#7CFC00",
    "#9932CC",
    "#FF4500",
    "#00CED1",
    "#FFD700",
    "#C71585",
    "#00FF7F",
    "#4169E1",
    "#FF8C00",
    "#E9967A",
    "#8FBC8F",
    "#483D8B",
  ];

  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "3XL",
    "28",
    "30",
    "32",
    "34",
    "36",
    "38",
    "40",
  ];

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleColorClick = (event) => {
    setColorAnchorEl(event.currentTarget);
  };

  const handleColorClose = () => {
    setColorAnchorEl(null);
  };

  const openColorPopover = Boolean(colorAnchorEl);

  return (
    <div>
      <Header />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          MEN · SHIRTS
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          571 products
        </Typography>

        <Grid container spacing={3}>
          {/* Sidebar filter */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              REFINE
            </Typography>

            {/* Category Filter */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2">CATEGORY</Typography>
              <List dense>
                {categories.map((category) => (
                  <React.Fragment key={category.name}>
                    <ListItemButton
                      onClick={() => handleCategoryClick(category.name)}
                      sx={{ p: 0 }}
                    >
                      <ListItemText primary={category.name} />
                      {expandedCategory === category.name ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={expandedCategory === category.name}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding dense>
                        {category.subcategories.map((sub) => (
                          <ListItemButton key={sub} sx={{ pl: 4 }}>
                            <ListItemText primary={sub} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </React.Fragment>
                ))}
              </List>
            </Box>

            {/* Color Filter */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2">COLOR</Typography>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleColorClick}
                sx={{
                  mt: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {selectedColor ? (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      bgcolor: selectedColor,
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  "Select Color"
                )}
                <ExpandMore />
              </Button>

              <Popover
                open={openColorPopover}
                anchorEl={colorAnchorEl}
                onClose={handleColorClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                PaperProps={{
                  sx: {
                    p: 2,
                    width: 280,
                  },
                }}
              >
                <Grid container spacing={1}>
                  {colors.map((color) => (
                    <Grid item xs={3} key={color}>
                      <IconButton
                        sx={{
                          p: 0,
                          border:
                            selectedColor === color ? "2px solid #000" : "none",
                        }}
                        onClick={() => {
                          setSelectedColor(color);
                          handleColorClose();
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: color,
                            borderRadius: "4px",
                          }}
                        />
                      </IconButton>
                    </Grid>
                  ))}
                </Grid>
              </Popover>
            </Box>

            {/* Size Filter */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2">SIZE</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {sizes.map((size) => (
                  <Chip
                    key={size}
                    label={size}
                    variant="outlined"
                    onClick={() =>
                      setSelectedSize(selectedSize === size ? null : size)
                    }
                    sx={{
                      minWidth: 40,
                      justifyContent: "center",
                      fontSize: 14,
                      cursor: "pointer",
                      borderColor:
                        selectedSize === size
                          ? "#02907B"
                          : "rgba(0, 0, 0, 0.23)",
                      backgroundColor:
                        selectedSize === size ? "#02907B" : "transparent",
                      color: selectedSize === size ? "#fff" : "#02907B",
                      "&:hover": {
                        backgroundColor:
                          selectedSize === size
                            ? "#027a68"
                            : "rgba(2, 144, 123, 0.1)",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mb: 2 }}>
              MEN
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Chip label="MEN" />
              <Chip label="SHIRTS" />
              <Chip label="CLOTHING" />
              <Chip label="Clear All" variant="outlined" />
            </Box>
          </Grid>

          {/* Product List */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.imageUrl}
                      alt={product.name}
                      sx={{
                        width: "100%",
                        height: 300,
                        objectFit: "contain",
                        p: 2,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="h2"
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.brand}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <Typography variant="h6" sx={{ mr: 1 }}>
                          {product.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textDecoration: "line-through" }}
                        >
                          {product.originalPrice}
                        </Typography>
                        <Chip
                          label={product.discount}
                          size="small"
                          color="error"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <StarIcon color="warning" fontSize="small" />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                          ({product.ratingCount})
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        fullWidth
                        sx={{
                          backgroundColor: "#02907B",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#028066",
                          },
                        }}
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Pagitation */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="20vh"
        >
          <Pagination
            count={10}
            sx={{
              "& .MuiPaginationItem-root": { color: "#02907B" }, // Màu chữ
              "& .Mui-selected": {
                backgroundColor: "#02907B", // Màu nền khi chọn
                color: "#fff", // Màu chữ khi chọn
              },
              "& .MuiPaginationItem-root:hover": {
                backgroundColor: "#028066",
                color: "#fff",
              },
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default ProductPage;

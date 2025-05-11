import React, { useEffect, useState } from "react";
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
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import StarIcon from "@mui/icons-material/Star";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Header from "../layout/Header";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import * as categoryService from "./../service/category-service";
import * as colorSizeService from "./../service/color-size-service";
import * as adminService from "./../service/admin-service";
import * as productService from "./../service/product-service";
import * as orderService from "./../service/order-service";
import * as cartServiceRedux from "./../redux/Cart/Action";
import { useDispatch } from "react-redux";
import SuccessNotification from "../component/SuccessNotification";
const ProductPage = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const size = 8;
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const subcategoryId = searchParams.get("subcategoryId");
  console.log("subcategoryId: ", subcategoryId);

  const loadData = async () => {
    await categoryService.getAllCategory(token).then((data) => {
      setCategories(data.data);
    });

    await colorSizeService.getAllColor(token).then((data) => {
      setColors(data.data);
    });

    await colorSizeService.getAllSize(token).then((data) => {
      setSizes(data.data);
    });
  };

  useEffect(() => {
    if (subcategoryId) {
      setSelectedSubCategory(subcategoryId);
    }
  }, []);
  const loadProductDefaut = async () => {
    await productService
      .selectProductByfeature({
        token: token,
        categoryId: categoryId !== null ? categoryId : "",
        subCategoryId: subcategoryId !== null ? subcategoryId : "",
        page: page,
        size: size,
        colorId: selectedColor?.colorId ? selectedColor?.colorId : "",
        sizeId: selectedSize,
        sortBy: sortBy,
      })
      .then((data) => {
        setProducts(data.data);
      });
    await productService
      .getPages({
        token: token,
        categoryId: categoryId !== null ? categoryId : "",
        subCategoryId: selectedSubCategory !== null ? selectedSubCategory : "",
        colorId: selectedColor?.colorId ? selectedColor?.colorId : "",
        sizeId: selectedSize,
      })
      .then((data) => {
        setTotalPage(data.data);
      });
  };

  const loadProductClick = async () => {
    await productService
      .selectProductByfeature({
        token: token,
        categoryId: "",
        subCategoryId: selectedSubCategory !== null ? selectedSubCategory : "",
        page: page,
        size: size,
        colorId: selectedColor?.colorId ? selectedColor?.colorId : "",
        sizeId: selectedSize,
        sortBy: sortBy,
      })
      .then((data) => {
        setProducts(data.data);
      });
    await productService
      .getPages({
        token: token,
        categoryId: "",
        subCategoryId: selectedSubCategory !== null ? selectedSubCategory : "",
        colorId: selectedColor?.colorId ? selectedColor?.colorId : "",
        sizeId: selectedSize,
      })
      .then((data) => {
        setTotalPage(data.data);
      });
  };

  useEffect(() => {
    if (selectedSubCategory) {
      loadProductClick();
      loadData();
    } else {
      loadProductDefaut();
      loadData();
    }
  }, [
    selectedColor,
    selectedSize,
    selectedSubCategory,
    sortBy,
    page,
    selectedSubCategory,
  ]);

  const handleColorClick = (event) => {
    setColorAnchorEl(event.currentTarget);
  };

  const handleColorClose = () => {
    setColorAnchorEl(null);
  };

  const openColorPopover = Boolean(colorAnchorEl);
  const navigate = useNavigate();

  const handleDetail = (productId) => {
    navigate("/product-detail", { state: { productId: productId } });
  };
  const dispath = useDispatch();
  const handleAddToCart = async (product) => {
    const data = await dispath(
      cartServiceRedux.addToCartProduct(token, product)
    );
    setOpen(true)
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Header />
      <Box sx={{ p: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 3,
            color: "grey.800",
            position: "relative",
            display: "inline-flex",
            alignItems: "baseline",
            gap: 1,
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -6,
              left: 0,
              width: "100%",
              height: 1.5,
              backgroundColor: "grey.300",
              borderRadius: 2,
              transform: "scaleX(0.95)",
              transformOrigin: "center",
            },
            fontWeight: 600,
            paddingBottom: 0.5,
            letterSpacing: "0.03em",
            transition: "all 0.3s ease",
            "&:hover": {
              color: "grey.900",
              "&::after": {
                backgroundColor: "grey.500",
                height: 2,
              },
              "& span": {
                color: "grey.700",
              },
            },
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              position: "relative",
              color: "grey.900",
              "&::before": {
                content: '""',
                position: "absolute",
                left: -12,
                top: "50%",
                transform: "translateY(-50%)",
                width: 6,
                height: 6,
                backgroundColor: "grey.600",
                borderRadius: "50%",
                opacity: 0.7,
              },
            }}
          >
            PTRAN_FASHION
          </Box>
          <Box
            component="span"
            sx={{
              color: "grey.600",
              fontSize: "0.95rem",
              fontWeight: 400,
              fontStyle: "italic",
              ml: 0.5,
              transition: "color 0.3s ease",
            }}
          >
            571 Sản phẩm
          </Box>
        </Typography>

        <Grid container spacing={3}>
          {/* Sidebar filter */}
          <Grid item xs={12} md={3}>
            {/* Category Filter */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2">CATEGORY</Typography>
              <List
                dense
                sx={{
                  borderRight: "1px solid #f0f0f0",
                  pr: 2,
                  mr: 2,
                }}
              >
                {categories?.map((category) => (
                  <React.Fragment key={category.categorieId}>
                    <ListItemButton
                      onClick={() => {
                        // Đóng tất cả các category khác khi mở một category mới
                        setExpandedCategory(
                          expandedCategory === category.categorieId
                            ? null
                            : category.categorieId
                        );
                      }}
                      sx={{
                        p: "8px 0",
                        borderRadius: "6px",
                        "&:hover": {
                          backgroundColor: "rgba(0, 139, 118, 0.05)",
                        },
                      }}
                    >
                      <ListItemText
                        primary={category.categoriesName}
                        primaryTypographyProps={{
                          fontWeight:
                            expandedCategory === category.categorieId
                              ? "600"
                              : "500",
                          fontSize: "0.95rem",
                          color:
                            expandedCategory === category.categorieId
                              ? "#008b76"
                              : "#333",
                        }}
                      />
                      {expandedCategory === category.categorieId ? (
                        <ExpandLess sx={{ color: "#008b76" }} />
                      ) : (
                        <ExpandMore sx={{ color: "#666" }} />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={expandedCategory === category.categorieId}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding dense>
                        {category.categories?.map((sub) => (
                          <ListItemButton
                            key={sub.subCategoryId}
                            sx={{
                              pl: 3,
                              ml: 1,
                              py: "6px",
                              borderRadius: "4px",
                              backgroundColor:
                                selectedSubCategory === sub.subCategoryId
                                  ? "rgba(0, 139, 118, 0.1)"
                                  : "transparent",
                              borderLeft:
                                selectedSubCategory === sub.subCategoryId
                                  ? "3px solid #008b76"
                                  : "none",
                              "&:hover": {
                                backgroundColor: "rgba(0, 139, 118, 0.08)",
                              },
                            }}
                            onClick={() => {
                              setSelectedSubCategory(sub.subCategoryId);
                              // Có thể thêm logic load sản phẩm theo subcategory ở đây
                            }}
                          >
                            <ListItemText
                              primary={sub.subCategoryName}
                              primaryTypographyProps={{
                                fontSize: "0.875rem",
                                color:
                                  selectedSubCategory === sub.subCategoryId
                                    ? "#008b76"
                                    : "#555",
                                fontWeight:
                                  selectedSubCategory === sub.subCategoryId
                                    ? "500"
                                    : "normal",
                              }}
                              sx={{
                                "& .MuiTypography-root": {
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                },
                              }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                    <Divider sx={{ my: 0.5, borderColor: "#f5f5f5" }} />
                  </React.Fragment>
                ))}
              </List>
            </Box>

            {/* Color Filter */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#008b76",
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                  mb: 1,
                }}
              >
                Màu sắc
              </Typography>

              <Button
                variant="outlined"
                fullWidth
                onClick={handleColorClick}
                sx={{
                  mt: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 16px",
                  borderColor: "#e0e0e0",
                  "&:hover": {
                    borderColor: "#008b76",
                    backgroundColor: "rgba(0, 139, 118, 0.04)",
                  },
                }}
              >
                {selectedColor ? (
                  <>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        bgcolor: selectedColor.colorCode,
                        borderRadius: "4px",
                        mr: 1.5,
                        border: "1px solid #e0e0e0",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        flexGrow: 1,
                        textAlign: "left",
                        color: "#333",
                        fontWeight: 500,
                      }}
                    >
                      {selectedColor.colorName}
                    </Typography>
                  </>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      flexGrow: 1,
                      textAlign: "left",
                      color: "#888",
                    }}
                  >
                    Lựa Chọn Màu
                  </Typography>
                )}
                <ExpandMore sx={{ color: "#008b76" }} />
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
                    width: 300,
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    border: "1px solid #e0e0e0",
                  },
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#008b76",
                    mb: 1,
                    px: 1,
                    fontWeight: "bold",
                  }}
                >
                  Select a color
                </Typography>

                <Grid container spacing={1.5}>
                  {colors?.map((color) => {
                    const getTextColor = (hexColor) => {
                      hexColor = hexColor.replace("#", "");
                      const r = parseInt(hexColor.substr(0, 2), 16);
                      const g = parseInt(hexColor.substr(2, 2), 16);
                      const b = parseInt(hexColor.substr(4, 2), 16);
                      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                      return brightness > 128 ? "#333" : "#fff";
                    };

                    return (
                      <Grid item xs={3} key={color.colorId}>
                        <IconButton
                          sx={{
                            p: 0,
                            borderRadius: "6px",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            },
                          }}
                          onClick={() => {
                            if (selectedColor?.colorId === color.colorId) {
                              setSelectedColor(null);
                              handleColorClose();
                            } else {
                              setSelectedColor(color);
                              handleColorClose();
                            }
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              height: 64,
                              bgcolor: color.colorCode,
                              borderRadius: "6px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-end",
                              alignItems: "center",
                              p: 1,
                              border:
                                selectedColor?.colorId === color.colorId
                                  ? "2px solid #008b76"
                                  : "1px solid #e0e0e0",
                              boxShadow:
                                selectedColor?.colorId === color.colorId
                                  ? "0 0 0 2px rgba(0, 139, 118, 0.2)"
                                  : "none",
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color: getTextColor(color.colorCode),
                                fontSize: "0.7rem",
                                fontWeight: 500,
                                lineHeight: 1.2,
                                textAlign: "center",
                                textShadow:
                                  getTextColor(color.colorCode) === "#333"
                                    ? "0 1px 1px rgba(255,255,255,0.7)"
                                    : "0 1px 1px rgba(0,0,0,0.3)",
                                backgroundColor: "rgba(0,0,0,0.05)",
                                px: 0.5,
                                borderRadius: "2px",
                              }}
                            >
                              {color.colorName}
                            </Typography>
                          </Box>
                        </IconButton>
                      </Grid>
                    );
                  })}
                </Grid>
              </Popover>
            </Box>

            {/* Size Filter */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2">SIZE</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {sizes?.map((size) => {
                  if (size.sizeId === 0) {
                    return (
                      <Chip
                        key={0}
                        label="No size"
                        variant="outlined"
                        sx={{
                          minWidth: 40,
                          justifyContent: "center",
                          fontSize: 14,
                          cursor: "not-allowed", // Không cho click
                          color: "text.disabled",
                          borderColor: "rgba(0, 0, 0, 0.12)",
                          backgroundColor: "transparent",
                        }}
                      />
                    );
                  }
                  return (
                    <Chip
                      key={size.sizeId}
                      label={size.nameSize}
                      variant="outlined"
                      onClick={() =>
                        setSelectedSize(
                          selectedSize === size.sizeId ? null : size.sizeId
                        )
                      }
                      sx={{
                        minWidth: 40,
                        justifyContent: "center",
                        fontSize: 14,
                        cursor: "pointer",
                        borderColor:
                          selectedSize === size.sizeId
                            ? "#02907B"
                            : "rgba(0, 0, 0, 0.23)",
                        backgroundColor:
                          selectedSize === size.sizeId
                            ? "#02907B"
                            : "transparent",
                        color:
                          selectedSize === size.sizeId ? "#fff" : "#02907B",
                        "&:hover": {
                          backgroundColor:
                            selectedSize === size.sizeId
                              ? "#027a68"
                              : "rgba(2, 144, 123, 0.1)",
                        },
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Chip label="MEN" />
              <Chip label="SHIRTS" />
              <Chip label="CLOTHING" />
              <Chip label="Clear All" variant="outlined" />
            </Box>
          </Grid>

          {/* Product List */}
          <Grid item xs={12} md={9}>
            {/* Sorting section */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                backgroundColor: "white", // Đổi thành nền trắng
                borderBottom: "1px solid #e0e0e0", // Thêm gạch chân
                borderRadius: 0, // Bỏ bo góc
              }}
            >
              <Typography variant="body1">
                Showing 1-{products?.length} of {products?.length} products
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" sx={{ mr: 1 }}>
                  Sort by:
                </Typography>
                <Select
                  defaultValue="default" // Thêm giá trị mặc định
                  size="small"
                  sx={{
                    minWidth: 180, // Tăng độ rộng
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none", // Bỏ viền
                    },
                    "&:hover": {
                      backgroundColor: "#f5f5f5", // Hiệu ứng hover
                    },
                  }}
                  onChange={(e) => {
                    console.log("dữ liệu: ", e.target.value);

                    setSortBy(e.target.value);
                  }}
                >
                  <MenuItem value="default">Mặc định</MenuItem>
                  <MenuItem value="giaTang">Giá: Tăng</MenuItem>
                  <MenuItem value="giaGiam">Giá: Giảm</MenuItem>
                  {/* <MenuItem value="rating-high">Tương Tác cao</MenuItem> */}
                </Select>
              </Box>
            </Box>

            <Grid container spacing={2}>
              {products.length > 0 ? (
                products.map((product) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={product?.productId}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handleDetail(product.productId);
                    }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={
                          "http://localhost:8080/image/product/" +
                          product.thumbnail
                        }
                        alt={product.productName}
                        sx={{
                          width: "100%",
                          height: "auto", // Thay đổi từ fixed height sang auto
                          aspectRatio: "1/1", // Giữ tỷ lệ khung hình vuông (có thể điều chỉnh)
                          objectFit: "cover", // Thay đổi từ "contain" sang "cover"
                          p: 0, // Loại bỏ padding
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="h2"
                        >
                          {product.productName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.brand}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1} mt={1}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "success.main",
                              fontWeight: "bold",
                              fontSize: "1.25rem",
                            }}
                          >
                            {product.sellPrice.toLocaleString()}{" "}
                            <span style={{ fontSize: "0.875rem" }}>vnđ</span>
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              textDecoration: "line-through",
                              fontSize: "0.95rem",
                            }}
                          >
                            {product.price.toLocaleString()} vnđ
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="medium" // Changed from small to medium for better proportion
                          variant="contained"
                          fullWidth
                          sx={{
                            backgroundColor: "#02907B",
                            color: "#fff",
                            padding: "8px 16px", // Added more padding
                            minWidth: "120px", // Set minimum width
                            borderRadius: "6px", // Slightly rounded corners
                            fontSize: "0.875rem", // Adjusted font size
                            fontWeight: 600, // Bold text
                            textTransform: "none", // Remove uppercase transformation
                            letterSpacing: "0.5px", // Slightly spaced letters
                            transition: "all 0.3s ease", // Smooth hover transition
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Subtle shadow
                            "&:hover": {
                              backgroundColor: "#017a65",
                              transform: "translateY(-1px)", // Slight lift on hover
                              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                            },
                            "&:active": {
                              transform: "translateY(0)", // Reset when clicked
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                        >
                          Add to Cart
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} sx={{ textAlign: "center", py: 8 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Inventory2OutlinedIcon
                      sx={{
                        fontSize: 64,
                        color: "text.disabled",
                        mb: 2,
                      }}
                    />
                    <Typography variant="h6" color="text.secondary">
                      Không có sản phẩm nào
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.disabled"
                      sx={{ mt: 1 }}
                    >
                      Hiện không có sản phẩm phù hợp với tiêu chí tìm kiếm
                    </Typography>
                  </Box>
                </Grid>
              )}
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
            count={totalPage}
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
            page={page + 1} // Vì Pagination hiển thị bắt đầu từ 1
            onChange={(e, newPage) => {
              setPage(newPage - 1); // Chuyển về base 0
              // loadProduct(newPage - 1); // Gọi lại API hoặc Redux
            }}
          />
        </Box>
      </Box>

      {open && (
        <SuccessNotification
          open={open}
          onClose={onClose}
          message={"Đã thêm vào giỏ hàng"}
        />
      )}
    </div>
  );
};

export default ProductPage;

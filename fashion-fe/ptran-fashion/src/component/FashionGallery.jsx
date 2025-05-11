import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Box,
  Container,
  Chip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as adminService from "./../service/admin-service";
import { useNavigate } from "react-router-dom";
import SuccessNotification from "./SuccessNotification";
import * as cartServiceRedux from "./../redux/Cart/Action";
import { useDispatch } from "react-redux";
const theme = createTheme({
  palette: {
    primary: {
      main: "#1a3f36",
      contrastText: "#f7f7f7",
    },
    secondary: {
      main: "#d4af87",
    },
    background: {
      default: "#fcfaf7",
    },
  },
  typography: {
    fontFamily: "'Cormorant Garamond', serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "0.02em",
      lineHeight: 1.1,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body1: {
      fontFamily: "'Lato', sans-serif",
      fontSize: "1rem",
      lineHeight: 1.6,
      color: "#555",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          overflow: "visible",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px -8px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
  },
});

const FashionGallery = () => {
  const navigate = useNavigate();
  const [collection, setCollection] = useState(null);
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const handleAddToCart = async (product) => {
    console.log("thêm vào cart rồi nè");
    
    await dispatch(cartServiceRedux.addToCartProduct(token, product));
    setOpen(true);
  };
  const loadData = async () => {
    try {
      const data = await adminService.getFirstCollection(token);
      setCollection(data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!collection) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: '"Playfair Display", serif',
        }}
      >
        <Typography variant="h5">Loading Collection...</Typography>
      </Box>
    );
  }

  const mainImageUrl = `http://localhost:8080/image/collection/${collection.imageUrl}`;
  const productImages = collection.productCollections;
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "background.default",
          pt: { xs: 3, md: 6 },
          pb: 6,
          minHeight: "100vh",
        }}
        onClick={(e) => {
          e.preventDefault();
          navigate("collection-detail", { state: { collection: collection } });
        }}
      >
        <Container maxWidth="xl">
          {/* Main Hero Section */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={7}>
              <Card
                sx={{
                  height: { md: "65vh" },
                  boxShadow: "0 8px 24px -8px rgba(0, 0, 0, 0.15)",
                  position: "relative",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(45deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)",
                    zIndex: 1,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={mainImageUrl}
                  sx={{
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                  }}
                />
                <Chip
                  label="New Collection"
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    bgcolor: "secondary.main",
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    px: 1.5,
                    py: 0.5,
                  }}
                />
              </Card>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  pl: { md: 4 },
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    mb: 2,
                    position: "relative",
                    "&:after": {
                      content: '""',
                      display: "block",
                      width: "80px",
                      height: "3px",
                      bgcolor: "secondary.main",
                      mt: 2,
                    },
                  }}
                >
                  {collection.name}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    fontSize: "1.1rem",
                    maxWidth: "480px",
                  }}
                >
                  {collection.description}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    "& .MuiChip-root": {
                      border: "1px solid",
                      borderColor: "primary.main",
                      fontSize: "0.9rem",
                      px: 1.5,
                      py: 1,
                    },
                  }}
                >
                  <Chip label="Spring 2024" variant="outlined" />
                  <Chip label="Limited Edition" variant="outlined" />
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Product Grid Section */}

          <Grid container spacing={3}>
            {productImages.map((pc, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  onClick={(e) => {
                    e.stopPropagation();
                    e.stopPropagation();
                    e.preventDefault();
                    navigate('product-detail', { state: { productId: pc.product.productId } })
                  }}
                  sx={{
                    position: "relative",
                    bgcolor: "primary.contrastText",
                    "&:hover .product-overlay": {
                      opacity: 1,
                      "& > *": {
                        transform: "translateY(0)",
                        opacity: 1,
                      },
                    },
                  }}
                >
                  {/* Product Image */}
                  <Box
                    sx={{
                      aspectRatio: "3/4",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`http://localhost:8080/image/product/${pc.product.thumbnail}`}
                      sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s",
                        "&:hover": {
                          transform: "scale(1.03)",
                        },
                      }}
                    />
                  </Box>

                  {/* Product Overlay */}
                  <Box
                    className="product-overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      bgcolor: "rgba(26, 63, 54, 0.85)",
                      opacity: 0,
                      transition: "opacity 0.3s",
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        color: "primary.contrastText",
                        fontSize: "1.3rem",
                        transform: "translateY(15px)",
                        transition: "all 0.2s 0.1s",
                        opacity: 0,
                      }}
                    >
                      {pc.product.productName}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "secondary.main",
                        mt: 0.5,
                        mb: 1.5,
                        fontSize: "0.9rem",
                        transform: "translateY(15px)",
                        transition: "all 0.2s 0.15s",
                        opacity: 0,
                      }}
                    >
                      {pc.product.sellPrice.toLocaleString()} VND
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        "& .MuiChip-root": {
                          bgcolor: "secondary.main",
                          color: "primary.main",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          py: 0.5,
                          height: "auto",
                        },
                      }}
                    >
                      <Chip
                        label="Add to Cart"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(pc.product);
                        }}
                      />
                      <Chip
                        label="Quick View"
                        sx={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigate("/product-detail", {
                            state: { productId: pc.product.productId },
                          });
                        }}
                      />
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {open && (
        <SuccessNotification
          open={open}
          onClose={onClose}
          message={"thêm giỏ hàng thành công"}
        />
      )}
    </ThemeProvider>
  );
};

export default FashionGallery;

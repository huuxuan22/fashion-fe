import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Box,
  Container,
  Chip,
  Button,
  Divider,
  IconButton,
  Stack,
  useMediaQuery
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Favorite, ShoppingBag, RemoveRedEye, East } from "@mui/icons-material";
import * as adminService from "./../service/admin-service";
import * as cartServiceRedux from "./../redux/Cart/Action";
import SuccessNotification from "../component/SuccessNotification";

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
      fontSize: "2.8rem",
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
      fontSize: "1.1rem",
      lineHeight: 1.6,
      color: "#555",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          overflow: "visible",
          transition: "all 0.3s ease",
          boxShadow: "none",
          border: "1px solid rgba(0,0,0,0.08)",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 24px -8px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  },
});

const LuxuryFashionGallery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collection, setCollection] = useState(null);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleAddToCart = async (product) => {
    await dispatch(cartServiceRedux.addToCartProduct(token, product));
    setOpen(true);
  };

  const loadData = async () => {
    try {
      const data = await adminService.getSecondCollection(token);
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
          py: { xs: 3, md: 6 },
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="xl">
          {/* New Split Layout */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {/* Left Column - Main Image */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: { xs: "50vh", md: "80vh" },
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={mainImageUrl}
                  sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                />
                <Chip
                  label="New Collection"
                  sx={{
                    position: "absolute",
                    top: 24,
                    right: 24,
                    bgcolor: "secondary.main",
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    px: 2,
                    py: 1,
                    borderRadius: 0,
                  }}
                />
              </Box>
            </Grid>

            {/* Right Column - Content */}
            <Grid item xs={12} md={6}>
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
                    mb: 3,
                    position: "relative",
                    "&:after": {
                      content: '""',
                      display: "block",
                      width: "80px",
                      height: "3px",
                      bgcolor: "secondary.main",
                      mt: 3,
                    },
                  }}
                >
                  {collection.name}
                </Typography>

                <Typography variant="body1" sx={{ mb: 4 }}>
                  {collection.description}
                </Typography>

                <Button
                  variant="outlined"
                  endIcon={<East />}
                  sx={{
                    alignSelf: "flex-start",
                    borderRadius: 0,
                    px: 4,
                    py: 1.5,
                    borderWidth: "2px",
                    borderColor: "primary.main",
                    color: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      borderWidth: "2px",
                    },
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("collection-detail", { state: { collection } });
                  }}
                >
                  View Full Collection
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Featured Products Section */}
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                textAlign: "center",
                position: "relative",
                "&:after": {
                  content: '""',
                  display: "block",
                  width: "80px",
                  height: "2px",
                  bgcolor: "secondary.main",
                  margin: "16px auto 0",
                },
              }}
            >
              Featured Products
            </Typography>

            <Grid container spacing={4}>
              {productImages.map((pc, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("product-detail", {
                        state: { productId: pc.product.productId },
                      });
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        image={`http://localhost:8080/image/product/${pc.product.thumbnail}`}
                        sx={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          color: "secondary.main",
                          bgcolor: "background.default",
                          "&:hover": {
                            bgcolor: "background.default",
                          },
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle favorite action
                        }}
                      >
                        <Favorite />
                      </IconButton>
                    </Box>
                    <Box sx={{ p: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 1, color: "#333" }}
                      >
                        {pc.product.productName}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "secondary.main",
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        {pc.product.sellPrice?.toLocaleString() || "N/A"}₫
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<RemoveRedEye />}
                          sx={{
                            borderColor: "primary.main",
                            color: "primary.main",
                            borderRadius: 0,
                            "&:hover": {
                              borderColor: "primary.dark",
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("product-detail", {
                              state: { productId: pc.product.productId },
                            });
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<ShoppingBag />}
                          sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            borderRadius: 0,
                            "&:hover": {
                              bgcolor: "primary.dark",
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(pc.product);
                          }}
                        >
                          Add
                        </Button>
                      </Stack>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
        {open && (
          <SuccessNotification
            open={open}
            onClose={() => setOpen(false)}
            message={"Added to cart successfully"}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default LuxuryFashionGallery;
import React from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  Button,
  Grid,
  TextField,
  Stack,
  Card,
  CardMedia,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ProductDescription from "../../features/ProductDescription";
import ProductComment from "../../features/ProductComment";
import SimilarProducts from "../../features/SimilarProduct";

const ProductDetail = () => {
  // Mock data for similar products
  const similarProducts = [
    {
      id: 1,
      name: "Red Kanjeevaram",
      price: "₹4599",
      image:
        "https://th.bing.com/th/id/OIP.4EwySPkocKdQyE_CKzhuHQHaJ4?rs=1&pid=ImgDetMain",
    },
    {
      id: 2,
      name: "Green Kanjeevaram",
      price: "₹4899",
      image:
        "https://www.sporter.vn/wp-content/uploads/2017/06/Ao-bong-da-real-madrid-xanh-den-0.png",
    },
    {
      id: 3,
      name: "Blue Kanjeevaram",
      price: "₹4299",
      image:
        "https://footballmonk.in/wp-content/uploads/2021/08/Rm-away-21-22-1.jpg",
    },
    {
      id: 4,
      name: "Gold Kanjeevaram",
      price: "₹5299",
      image:
        "https://th.bing.com/th/id/OIP.1rUDwW_ClEPEbaO9S6ymygHaHa?w=1000&h=1000&rs=1&pid=ImgDetMain",
    },
  ];

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          px: "200px", // 200px padding on both sides
          py: 3,
        }}
      >
        <Grid container spacing={3}>
          {/* Left Column - Similar Products (20% width) */}
          <Grid item xs={12} md={2.4}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Similar Products
            </Typography>
            <Stack spacing={1.5}>
              {similarProducts.map((product) => (
                <Card
                  key={product.id}
                  sx={{ cursor: "pointer", borderRadius: "4px" }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: 120, objectFit: "cover" }}
                    image={product.image}
                    alt={product.name}
                  />
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* Middle Column - Main Product Image (55% width) */}
          <Grid item xs={12} md={6.6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                minHeight: "500px",
                bgcolor: "#f9f9f9",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <img
                src="https://th.bing.com/th/id/OIP.ZIAd0SA3sgiml2gbFS_duAHaHa?w=1410&h=1410&rs=1&pid=ImgDetMain"
                alt="Silk Blend Kanjeevaram Saree"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  maxHeight: "600px",
                }}
              />
            </Box>
          </Grid>

          {/* Right Column - Product Info (25% width) */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                position: "sticky",
                top: 16,
                p: 1.5,
              }}
            >
              <Typography
                variant="h6"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Raam Clothing
              </Typography>

              <Typography
                variant="subtitle1"
                component="h2"
                gutterBottom
                sx={{ fontWeight: 500 }}
              >
                Silk Blend Kanjeevaram Saree
              </Typography>

              <Box sx={{ my: 1.5 }}>
                <Typography variant="caption" color="text.secondary">
                  358 Ratings | 1149 Sold
                </Typography>
                <Typography variant="h6" sx={{ mt: 0.5, fontWeight: 700 }}>
                  ₹4999
                </Typography>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Typography
                variant="caption"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                QUANTITY:
              </Typography>
              <TextField
                type="number"
                defaultValue="1"
                inputProps={{ min: 1 }}
                variant="outlined"
                size="small"
                sx={{ width: 72, mb: 1.5 }}
              />

              <Box sx={{ my: 1.5 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Review of all taxes. Free Shipping above ₹1500
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <FormControlLabel
                    control={<Checkbox checked size="small" />}
                    label={
                      <Typography variant="caption">
                        Authentic & Quality Assured
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox checked size="small" />}
                    label={
                      <Typography variant="caption">
                        100% money back guarantee
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox checked size="small" />}
                    label={
                      <Typography variant="caption">
                        Free Shipping & Returns
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox checked size="small" />}
                    label={
                      <Typography variant="caption">
                        Pay on delivery available
                      </Typography>
                    }
                  />
                </Box>
              </Box>

              <Grid container spacing={1} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="small"
                    startIcon={<ShoppingCartIcon fontSize="small" />}
                    sx={{ py: 0.8 }}
                  >
                    ADD TO BAG
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size="small"
                    startIcon={<FlashOnIcon fontSize="small" />}
                    sx={{
                      py: 0.8,
                      bgcolor: "error.main",
                      "&:hover": { bgcolor: "error.dark" },
                    }}
                  >
                    BUY NOW
                  </Button>
                </Grid>
              </Grid>

              <Button
                variant="outlined"
                color="primary"
                fullWidth
                size="small"
                startIcon={<FavoriteBorderIcon fontSize="small" />}
                sx={{ mt: 1, py: 0.8 }}
              >
                ADD TO WISHLIST
              </Button>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1.5, display: "block" }}
              >
                The saree comes with an unstitched blouse piece. The blouse worn
                by the model might be for a modelling purpose only.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ProductDescription />
      <ProductComment />
      <SimilarProducts />
    </div>
  );
};

export default ProductDetail;

import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  TextField,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Container,
  Avatar
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Header from "../../layout/Header";

const ShoppingCart = () => {
  const products = [
    {
      id: 1,
      name: "Turquoise Blue Stonework Satin Designer Saree",
      seller: "Natural Library-Produces Frame Limited",
      image: "https://example.com/saree-image.jpg",
      price: 3158,
      discount: 1960,
      quantity: 2,
      replacement: "7 days replacement available"
    },
    {
      id: 2,
      name: "Turquoise Blue Stonework Satin Designer Saree",
      seller: "Natural Library-Produces Frame Limited",
      image: "https://example.com/saree-image.jpg",
      price: 3158,
      discount: 1960,
      quantity: 1,
      replacement: "7 days replacement available"
    },
    {
      id: 3,
      name: "Turquoise Blue Stonework Satin Designer Saree",
      seller: "Natural Library-Produces Frame Limited",
      image: "https://example.com/saree-image.jpg",
      price: 3158,
      discount: 1960,
      quantity: 1,
      replacement: "7 days replacement available"
    },
    {
      id: 4,
      name: "Turquoise Blue Stonework Satin Designer Saree",
      seller: "Natural Library-Produces Frame Limited",
      image: "https://example.com/saree-image.jpg",
      price: 3158,
      discount: 1960,
      quantity: 2,
      replacement: "7 days replacement available"
    }
  ];

  return (
    <div>
        <Header></Header>
        <Box sx={{ 
      width: 'calc(100% - 300px)', // Trừ đi 150px mỗi bên
      margin: '0 150px', // Cách mỗi bên 150px
      py: 3
    }}>
      <Typography variant="h5" sx={{ 
        mb: 2, 
        fontWeight: "bold",
        color: '#008B76' // Áp dụng màu chủ đạo
      }}>
        Raam Clothing
      </Typography>

      <Grid container spacing={3}>
        {/* Left Column - Products */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ 
            p: 3,
            border: '1px solid #008B76' // Thêm viền màu chủ đạo
          }}>
            <Typography variant="subtitle1" sx={{ 
              fontWeight: "bold", 
              mb: 2,
              color: '#008B76' // Áp dụng màu chủ đạo
            }}>
              Your Items ({products.length})
            </Typography>
            
            <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
              {products.map((product) => (
                <Box key={product.id} sx={{
                  display: 'flex',
                  gap: 2,
                  mb: 2,
                  alignItems: 'center',
                  '&:hover': { backgroundColor: 'rgba(0, 139, 118, 0.05)' }
                }}>
                  <Avatar
                    src={product.image}
                    variant="square"
                    sx={{ 
                      width: 100, 
                      height: 100, 
                      borderRadius: 1,
                      border: '1px solid #008B76' // Viền avatar
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ 
                      fontWeight: "bold", 
                      mb: 0.5,
                      color: '#008B76' // Tiêu đề màu chủ đạo
                    }}>
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                      Sold by: {product.seller}
                    </Typography>
                    <Typography variant="caption" sx={{ mb: 1 }}>
                      {product.replacement}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={`Qty: ${product.quantity}`}
                        size="small"
                        sx={{ 
                          borderRadius: 1, 
                          bgcolor: '#f5f5f5',
                          border: '1px solid #008B76' // Viền chip
                        }}
                      />
                      <Button 
                        size="small" 
                        sx={{ 
                          fontSize: '0.75rem',
                          color: '#008B76', // Màu chữ
                          borderColor: '#008B76', // Màu viền
                          '&:hover': {
                            backgroundColor: 'rgba(0, 139, 118, 0.1)' // Hiệu ứng hover
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            <Divider sx={{ 
              my: 2,
              backgroundColor: '#008B76' // Màu divider
            }} />

            {/* Coupon Section */}
            <Typography variant="subtitle1" sx={{ 
              fontWeight: "bold", 
              mb: 1,
              color: '#008B76' // Màu tiêu đề
            }}>
              Apply Coupons
            </Typography>
            <Box sx={{ display: "flex", mb: 2 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Enter coupon code"
                sx={{ 
                  flexGrow: 1, 
                  mr: 1, 
                  '& .MuiInputBase-root': { 
                    height: 36,
                    '& fieldset': {
                      borderColor: '#008B76' // Màu viền input
                    }
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#008B76 !important' // Màu viền khi hover
                  }
                }}
              />
              <Button 
                variant="contained" 
                size="small" 
                sx={{ 
                  textTransform: "none",
                  backgroundColor: '#008B76', // Màu nền
                  '&:hover': {
                    backgroundColor: '#00695c' // Màu hover đậm hơn
                  }
                }}
              >
                APPLY
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ 
            p: 3,
            border: '1px solid #008B76', // Viền màu chủ đạo
            backgroundColor: 'rgba(0, 139, 118, 0.03)' // Màu nền nhạt
          }}>
            <Typography variant="subtitle1" sx={{ 
              fontWeight: "bold", 
              mb: 2,
              color: '#008B76' // Màu tiêu đề
            }}>
              Order Summary
            </Typography>
            
            <List dense>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <ListItemText 
                  primary="Subtotal" 
                  primaryTypographyProps={{ variant: 'body2' }} 
                />
                <Typography variant="body2">¥3158</Typography>
              </ListItem>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <ListItemText 
                  primary="Discount" 
                  primaryTypographyProps={{ variant: 'body2' }} 
                />
                <Typography variant="body2" color="#008B76">-¥1960</Typography>
              </ListItem>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <ListItemText 
                  primary="Shipping" 
                  primaryTypographyProps={{ variant: 'body2' }} 
                />
                <Typography variant="body2">¥79</Typography>
              </ListItem>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <ListItemText 
                  primary="Platform fee" 
                  primaryTypographyProps={{ variant: 'body2' }} 
                />
                <Typography variant="body2" color="#008B76">Free</Typography>
              </ListItem>
              <Divider sx={{ 
                my: 1,
                backgroundColor: '#008B76' // Màu divider
              }} />
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <ListItemText 
                  primary="Total" 
                  primaryTypographyProps={{ 
                    variant: 'subtitle2', 
                    fontWeight: 'bold',
                    color: '#008B76' // Màu chữ
                  }} 
                />
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: "bold",
                  color: '#008B76' // Màu chữ
                }}>
                  ¥1198
                </Typography>
              </ListItem>
            </List>

            <Button
              variant="contained"
              fullWidth
              size="medium"
              startIcon={<LocalMallIcon fontSize="small" />}
              sx={{ 
                py: 1, 
                mb: 2, 
                fontSize: '0.875rem',
                backgroundColor: '#008B76', // Màu nền
                '&:hover': {
                  backgroundColor: '#00695c' // Màu hover đậm hơn
                }
              }}
            >
              BUY NOW
            </Button>
            
            <Button
              variant="outlined"
              fullWidth
              size="medium"
              startIcon={<FavoriteBorderIcon fontSize="small" />}
              sx={{ 
                py: 1, 
                fontSize: '0.875rem',
                color: '#008B76', // Màu chữ
                borderColor: '#008B76', // Màu viền
                '&:hover': {
                  backgroundColor: 'rgba(0, 139, 118, 0.1)', // Màu hover
                  borderColor: '#008B76'
                }
              }}
            >
              Add From Wishlist
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default ShoppingCart;

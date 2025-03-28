import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mobile" },
  { id: 3, name: "Smartwatch" },
  { id: 4, name: "Headphones" },
  { id: 5, name: "Speaker" },
  { id: 6, name: "Camera" }
];

const ProductCategory = () => {
  return (
    <Box sx={{
      maxWidth: 'xl',
      mx: 'auto',
      py: 2,
      px: 2
    }}>
      <Grid container spacing={20}>
        {products.map((product) => (
          <Grid item xs={4} sm={2} key={product.id}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 1,
              '&:hover': {
                backgroundColor: '#f5f5f5',
                borderRadius: 1
              }
            }}>
              <Box
                component="img"
                src="https://th.bing.com/th/id/OIP.LWUitlY8iCqaic9EqAXYhwHaHa?rs=1&pid=ImgDetMain" // Thay bằng ảnh thực tế
                alt={product.name}
                sx={{
                  width: 70,
                  height: 70,
                  objectFit: 'contain',
                  mb: 1
                }}
              />
              <Typography variant="body2" sx={{ 
                textAlign: 'center',
                fontWeight: 'medium'
              }}>
                {product.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductCategory;
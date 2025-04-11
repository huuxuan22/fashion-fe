import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import * as categoriesService from "./../service/category-service";


const ProductCategory = () => {
  const [categories, setCategories] = useState([]);
    const token = localStorage.getItem("token");
    const loadCategory = async () => {
      await categoriesService.getAllCategory(token).then((data) => {
        console.log("dữ liệu category", data.data);
        
        setCategories(data.data);
      });
    };
    useEffect(() => {
      loadCategory();
    }, []);
  return (
    <Box
  sx={{
    maxWidth: 'xl',
    mx: 'auto',
    py: 2,
    px: 2,
    display: 'flex',
    justifyContent: 'space-between', // Hoặc 'space-around' / 'center'
    flexWrap: 'nowrap', // Quan trọng: không cho xuống dòng
    overflowX: 'auto'   // Nếu màn hình nhỏ quá thì cuộn ngang
  }}
>
  {categories?.map((product) => (
    <Box
      key={product.categorieId}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        p: 1,
        minWidth: '200px', // Cố định để chia đều
        '&:hover': {
          backgroundColor: '#f5f5f5',
          borderRadius: 1
        }
      }}
    >
      <Box
        component="img"
        src={product.thumbnail}
        alt={product.categoriesName}
        sx={{
          width: 90,
          height: 90,
          objectFit: 'contain',
          mb: 1
        }}
      />
      <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 'medium' }}>
        {product.categoriesName}
      </Typography>
    </Box>
  ))}
</Box>

    
  );
};

export default ProductCategory;
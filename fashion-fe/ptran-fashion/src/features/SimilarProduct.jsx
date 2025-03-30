import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Pagination,
  Stack,
  Divider
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const SimilarProducts = ({ products }) => {
  const [page, setPage] = useState(1);
  const productsPerPage = 12; // 6 per row × 2 rows
  const pageCount = Math.ceil(products.length / productsPerPage);

  const currentProducts = products.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  return (
    <Box sx={{ px: '200px', py: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ 
        fontWeight: 'bold',
        color: '#02907B',
        mb: 3
      }}>
        Sản Phẩm Tương Tự
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3}>
        {currentProducts.map((product) => (
          <Grid item xs={12} sm={4} md={2} key={product.id}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardMedia
                component="img"
                image="https://th.bing.com/th/id/OIP.ZIAd0SA3sgiml2gbFS_duAHaHa?w=1410&h=1410&rs=1&pid=ImgDetMain"
                alt={product.name}
                sx={{
                  width: '100%',
                  height: 160,
                  objectFit: 'contain',
                  p: 2
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="subtitle2" component="h3" sx={{
                  fontWeight: 600,
                  height: 40,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {product.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {product.brand}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 'bold',
                    color: '#02907B'
                  }}>
                    {product.price}
                  </Typography>
                  {product.originalPrice && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ textDecoration: 'line-through', ml: 1 }}
                    >
                      {product.originalPrice}
                    </Typography>
                  )}
                  {product.discount && (
                    <Chip
                      label={product.discount}
                      size="small"
                      sx={{ 
                        ml: 1,
                        backgroundColor: '#ffebee',
                        color: '#c62828',
                        fontSize: '0.65rem',
                        height: 20
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <StarIcon fontSize="small" sx={{ color: '#ffb300' }} />
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    ({product.ratingCount})
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ p: 1 }}>
                <Button
                  size="small"
                  fullWidth
                  sx={{
                    backgroundColor: '#02907B',
                    color: '#fff',
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    py: 0.8,
                    '&:hover': {
                      backgroundColor: '#028066',
                    },
                  }}
                >
                  Thêm vào giỏ
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {pageCount > 1 && (
        <Stack spacing={2} sx={{ mt: 4, alignItems: 'center' }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#02907B',
                borderColor: '#02907B'
              },
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#02907B',
                color: 'white'
              }
            }}
          />
        </Stack>
      )}
    </Box>
  );
};

// Sample data
SimilarProducts.defaultProps = {
  products: Array(12).fill().map((_, i) => ({
    id: i + 1,
    name: `Sản phẩm tương tự ${i + 1}`,
    brand: 'Thương hiệu',
    price: `${Math.floor(Math.random() * 100) + 100}.000đ`,
    originalPrice: `${Math.floor(Math.random() * 100) + 200}.000đ`,
    discount: `-${Math.floor(Math.random() * 30) + 10}%`,
    ratingCount: Math.floor(Math.random() * 100),
    imageUrl: 'https://th.bing.com/th/id/OIP.ZIAd0SA3sgiml2gbFS_duAHaHa?w=1410&h=1410&rs=1&pid=ImgDetMain'
  }))
};

export default SimilarProducts;
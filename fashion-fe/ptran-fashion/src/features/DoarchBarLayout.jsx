import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Divider,
  Chip,
  Grid,
  Paper,
  styled
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import * as productService from "./../service/product-service"
import { useNavigate } from 'react-router-dom';
// Styled components
const LuxuryNotificationCard = styled(Paper)({
  padding: '40px',
  borderRadius: '4px',
  backgroundColor: '#f8f5f2',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    backgroundColor: '#000',
  }
});
const LuxuryTitle = styled(Typography)({
  fontFamily: '"Playfair Display", serif',
  fontSize: '2.5rem',
  fontWeight: 700,
  letterSpacing: '2px',
  color: '#000',
  marginBottom: '8px',
  textTransform: 'uppercase'
});
const LuxurySubtitle = styled(Typography)({
  fontFamily: '"Playfair Display", serif',
  fontSize: '1.8rem',
  fontWeight: 400,
  letterSpacing: '1px',
  color: '#000',
  marginBottom: '24px',
  textTransform: 'uppercase'
});
const LuxuryText = styled(Typography)({
  fontFamily: '"Cormorant Garamond", serif',
  fontSize: '1.1rem',
  fontWeight: 300,
  lineHeight: '1.8',
  color: '#333',
  maxWidth: '600px',
  marginBottom: '32px'
});
const PromotionCard = styled(Card)({
  borderRadius: 12,
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  height: '100%',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,145,123,0.3) 0%, rgba(0,145,123,0.7) 100%)',
  }
});
const ProductCard = styled(Card)({
  borderRadius: 12,
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.3s',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
  }
});
// Mock data
const luxuryNotifications = [
  { 
    id: 1,
    title: "HYDROPHOBIC SHORTS",
    subtitle: "HYDROPHOBIC SHORTS",
    text: "Elevate your wardrobe with timeless pieces that define who you are. Every moment counts with a touch of sophistication."
  },
  { 
    id: 2,
    title: "LUXURY COLLECTION",
    subtitle: "NEW ARRIVALS",
    text: "Discover our exclusive collection that combines comfort with elegance for the modern lifestyle."
  },
  { 
    id: 3,
    title: "PREMIUM MATERIALS",
    subtitle: "CRAFTED TO PERFECTION",
    text: "Experience the finest fabrics and attention to detail in every stitch of our premium collection."
  },
];
const promotions = [
  { id: 1, title: 'Giảm giá 50%', subtitle: 'Cho tất cả sản phẩm', image: 'https://th.bing.com/th/id/R.b05879ccadc3950bb58057c31db48dc2?rik=iImeoSeL2XOvXg&pid=ImgRaw&r=0' },
  { id: 2, title: 'Mua 1 tặng 1', subtitle: 'Áp dụng cuối tuần', image: 'https://th.bing.com/th/id/OIP.WlwO_bSMc__IyRg-LAXDsAHaHa?w=590&h=590&rs=1&pid=ImgDetMain' },
  { id: 3, title: 'Freeship', subtitle: 'Đơn hàng từ 500K', image: 'https://static.vecteezy.com/system/resources/previews/003/206/008/non_2x/social-media-banner-template-free-vector.jpg' },
];
const topProducts = [
  { id: 1, name: 'Kem dưỡng da', price: '250,000đ', salePrice: '175,000đ', image: 'https://th.bing.com/th/id/OIP.L5zJbR9VCIYxo1blZUIQBQHaLG?rs=1&pid=ImgDetMain' },
  { id: 2, name: 'Serum vitamin C', price: '350,000đ', salePrice: '245,000đ', image: 'https://vanessa.vn/upload/files/THANG-4-2023/dam-cong-chua-FA-4-2023-226.jpg' },
  { id: 3, name: 'Mặt nạ collagen', price: '120,000đ', salePrice: '84,000đ', image: 'https://th.bing.com/th/id/OIP.qI6s8grcnGehMPM8lhl2EgHaHz?w=720&h=758&rs=1&pid=ImgDetMain' },
];
const DashboardLayout = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [topProduct, setTopProduct] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleNext = () => {
    setCurrentNotification((prev) => (prev + 1) % luxuryNotifications.length);
  };
  const handlePrev = () => {
    setCurrentNotification((prev) => (prev - 1 + luxuryNotifications.length) % luxuryNotifications.length);
  };
  const loadTopPorduct = async () => {
    await productService.getDiscountProduct({token: token}).then((data) => {
      setTopProduct(data.data);
    });
  };
  useEffect(() => {
    loadTopPorduct();
  },[]);
  console.log("Top sản phẩm giảm giá",topProduct);
  
  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Grid container spacing={3}>
        {/* Luxury Notification Section - Left Side */}
        <Grid item xs={12} md={6}>
          <LuxuryNotificationCard elevation={0}>
            <LuxuryTitle>
              {luxuryNotifications[currentNotification]?.title}
            </LuxuryTitle>
            <LuxurySubtitle>
              {luxuryNotifications[currentNotification]?.subtitle}
            </LuxurySubtitle>
            <Divider sx={{ width: '100px', borderColor: '#000', mb: 3 }} />
            <LuxuryText>
              {luxuryNotifications[currentNotification]?.text}
            </LuxuryText>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              mt: 2
            }}>
              <IconButton 
                onClick={handlePrev} 
                sx={{ 
                  color: '#000',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.05)'
                  }
                }}
              >
                <ChevronLeft fontSize="large" />
              </IconButton>
              
              <Box sx={{ display: 'flex', mx: 2 }}>
                {luxuryNotifications.map((_, index) => (
                  <Box 
                    key={index} 
                    sx={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      bgcolor: index === currentNotification ? '#000' : '#ccc',
                      mx: 0.5
                    }}
                  />
                ))}
              </Box>
              
              <IconButton 
                onClick={handleNext} 
                sx={{ 
                  color: '#000',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.05)'
                  }
                }}
              >
                <ChevronRight fontSize="large" />
              </IconButton>
            </Box>
          </LuxuryNotificationCard>
        </Grid>

        {/* Promotion Image - Right Side */}
        <Grid item xs={12} md={6}>
          <PromotionCard>
            <CardMedia
              component="img"
              height="400"
              image={promotions[0].image}
              alt={promotions[0].title}
              sx={{ objectFit: 'cover' }}
            />
            <Box sx={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              zIndex: 2,
              color: 'white'
            }}>
              <Typography variant="h4" fontWeight="bold">{promotions[0].title}</Typography>
              <Typography variant="h6">{promotions[0].subtitle}</Typography>
              <Chip 
                label="HOT" 
                size="small" 
                sx={{ 
                  mt: 1, 
                  bgcolor: '#ff5252', 
                  color: 'white',
                  fontWeight: 'bold',
                }} 
              />
            </Box>
          </PromotionCard>
        </Grid>

        {/* Top 3 Sale Products - Bottom Section */}
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold" color="#00917b" gutterBottom>
            Top 3 sản phẩm giảm giá
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            {topProduct?.map((product) => (
              <Grid item xs={12} sm={4} key={product.productId} onClick={() => navigate("/product-detail" , { state: { productId: product.productId } })}>
                <ProductCard sx={{cursor: 'pointer'}}>
                  <CardMedia
                    component="img"
                    height="280"
                    image={"http://localhost:8080/image/product/" +product.thumbnail}
                    alt={product.productName}
                    sx={{ 
                      objectFit: 'contain',
                      p: 2
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                      {product.productName}
                    </Typography>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mt: 2,
                      flexWrap: 'wrap'
                    }}>
                      <Typography variant="h6" color="text.secondary" sx={{ 
                        textDecoration: 'line-through', 
                        mr: 2,
                        fontSize: '1rem'
                      }}>
                        {product.price}
                      </Typography>
                      <Typography variant="h5" color="#00917b" fontWeight="bold">
                        {product.sellPrice}
                      </Typography>
                      <Chip 
                        label="SALE" 
                        size="medium"
                        sx={{ 
                          ml: 'auto', 
                          bgcolor: '#00917b', 
                          color: 'white',
                          fontSize: '0.8rem',
                          height: '28px'
                        }} 
                      />
                    </Box>
                  </CardContent>
                </ProductCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardLayout;
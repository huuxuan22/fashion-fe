import React from 'react'
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
    Tabs,
    Tab,
    Paper
  } from '@mui/material';
  import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  import FlashOnIcon from '@mui/icons-material/FlashOn';
const ProductDescription = ({description}) => {
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
    };
  
    // Mock data for similar products
    const similarProducts = [
      { id: 1, name: 'Red Kanjeevaram', price: '₹4599', image: 'https://th.bing.com/th/id/OIP.4EwySPkocKdQyE_CKzhuHQHaJ4?rs=1&pid=ImgDetMain' },
      { id: 2, name: 'Green Kanjeevaram', price: '₹4899', image: 'https://www.sporter.vn/wp-content/uploads/2017/06/Ao-bong-da-real-madrid-xanh-den-0.png' },
      { id: 3, name: 'Blue Kanjeevaram', price: '₹4299', image: 'https://footballmonk.in/wp-content/uploads/2021/08/Rm-away-21-22-1.jpg' },
      { id: 4, name: 'Gold Kanjeevaram', price: '₹5299', image: 'https://th.bing.com/th/id/OIP.1rUDwW_ClEPEbaO9S6ymygHaHa?w=1000&h=1000&rs=1&pid=ImgDetMain' },
    ];
  
    return (
      <Box sx={{ 
        width: '100%',
        px: '200px',
        py: 3
      }}>
        {/* Main Product Section */}
        <Grid container spacing={3}>
          {/* Left Column - Similar Products */}
          <Grid item xs={12} md={2.4}>
            {/* ... (keep existing similar products code) ... */}
          </Grid>
  
          {/* Middle Column - Main Product Image */}
          <Grid item xs={12} md={6.6}>
            {/* ... (keep existing main image code) ... */}
          </Grid>
  
          {/* Right Column - Product Info */}
          <Grid item xs={12} md={3}>
            {/* ... (keep existing product info code) ... */}
          </Grid>
        </Grid>
  
        {/* Product Description Section */}
        <Box sx={{ mt: 4 }}>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="product description tabs">
              <Tab label="Description" />
              <Tab label="Details" />
              <Tab label="Shipping & Returns" />
            </Tabs>
  
            <Box sx={{ mt: 3 }}>
              {tabValue === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Product Description
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {description}
                  </Typography>
                </Box>
              )}
  
              {tabValue === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Product Details
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Material:</strong> Premium silk-cotton blend with pure zari work<br />
                    <strong>Pattern:</strong> Traditional temple border with floral motifs<br />
                    <strong>Color:</strong> Rich red with golden accents<br />
                    <strong>Work:</strong> Handwoven with intricate zari embroidery<br />
                    <strong>Blouse:</strong> Includes unstitched blouse piece (0.8m)<br />
                    <strong>Origin:</strong> Handcrafted in Kanchipuram, Tamil Nadu
                  </Typography>
                </Box>
              )}
  
              {tabValue === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Shipping & Returns
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Shipping:</strong> 
                    • Free standard shipping on orders above ₹1500<br />
                    • Express shipping available at additional cost<br />
                    • Typically dispatched in 2-3 business days<br />
                    • Delivery time: 4-7 business days nationwide
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Returns:</strong>
                    • 100% money back guarantee if not satisfied<br />
                    • Easy 15-day return policy<br />
                    • Items must be unused with original tags<br />
                    • Return shipping costs borne by customer
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
  
          {/* Additional Information Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Why Choose This Saree?
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Authentic</Typography>
                  <Typography variant="caption">Direct from Kanchipuram weavers</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Premium Quality</Typography>
                  <Typography variant="caption">Finest silk and pure zari</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Easy Returns</Typography>
                  <Typography variant="caption">15-day hassle-free returns</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Secure Payment</Typography>
                  <Typography variant="caption">100% secure checkout</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    );
  
}

export default ProductDescription
import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Divider,
  Button,
  ThemeProvider,
  createTheme,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';

// Tạo theme với màu chính #00917B
const theme = createTheme({
  palette: {
    primary: {
      main: '#00917B',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const products = [
  {
    name: "ÁO THUN",
    price: "59K",
    image: "https://inkythuatso.com/uploads/thumbnails/800/2023/02/5-anh-the-nu-nen-trang-inkythuatso-27-10-37-25.jpg" // Thay bằng URL ảnh thực tế
  },
  {
    name: "SHORT NAM",
    price: "79K",
    image: "https://inkythuatso.com/uploads/thumbnails/800/2023/02/5-anh-the-nu-nen-trang-inkythuatso-27-10-37-25.jpg" // Thay bằng URL ảnh thực tế
  },
  {
    name: "QUẦN TÂY NỮ",
    price: "99K",
    image: "https://inkythuatso.com/uploads/thumbnails/800/2023/02/5-anh-the-nu-nen-trang-inkythuatso-27-10-37-25.jpg" // Thay bằng URL ảnh thực tế
  }
];

const Promotion = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" color="primary" fontWeight="bold" gutterBottom>
            GIẢM GIÁ
          </Typography>
          <Typography variant="body2" color="text.secondary">
            TOÀN CỦA HÀNG | P.O. 1000, TQM 10-15
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            TỔ CHÍC SÁN ĐƯỜNG NGHỆ | HỌ THUYỂN HÀNG KHÔNG VỀ CỦA HÀNG
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            PHOENIX TRUCK HÀNG GIAN HỌ | PHOENIX TRUCK HÀNG KHÔNG VỀ CỦA HÀNG
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Promotion 1 */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderLeft: '4px solid #00917B' }}>
          <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
            SALE ĐẾN 80% TOÀN BỘ CỦA HÀNG -...
          </Typography>
          <Typography variant="body1" paragraph>
            Chào hè, FM sale đến 80% toàn bộ của hàng - không kèm điều kiện. Giá sau giảm chi từ 20k, 30k, 40k.
          </Typography>
          <Button variant="contained" color="primary">
            Xem ngay
          </Button>
        </Paper>

        {/* Promotion 2 */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderLeft: '4px solid #00917B' }}>
          <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
            GIẢN ĐẾN 60% TOÀN BỘ SẢN PHẨM NH...
          </Typography>
          <Typography variant="body1" paragraph>
            Nhân dịp Valentine, FM sale khủng, giảm đến 60% toàn bộ sản phẩm không kèm điều kiện. Có những sản phẩm đồng gia chí từ 8k 59k 98k và ...
          </Typography>
          <Button variant="contained" color="primary">
            Xem ngay
          </Button>
        </Paper>

        {/* Product Cards - Nằm ngang hàng */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom textAlign="center">
            SẢN DEAL NHƯ Ý
          </Typography>
          <Grid container spacing={3}>
            {products.map((product, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3" textAlign="center">
                      {product.name}
                    </Typography>
                    <Typography variant="h5" color="primary" textAlign="center">
                      {product.price}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" size="small">
                      Mua ngay
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="caption" color="text.secondary" display="block" mt={2}>
            XII-ONG DIỄI XEÚN | Áp dụng không: A02, 2022/2026, 16 cục xét rõ chính thiểu hoàn quốc.
          </Typography>
        </Paper>

        {/* Promotion 3 */}
        <Paper elevation={3} sx={{ p: 3, borderLeft: '4px solid #00917B' }}>
          <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
            KHAI XUÂN ÁT TỰ - ĐỒNG GIÁ 59K 79K 99K
          </Typography>
          <Typography variant="body1" paragraph>
            Khai xuân Át Tỵ - FM sale Âo thun 59k, quần short nam 79k, quần tày nữ 39k, không điều kiện. Tất cả sản phẩm đã lên full lệ, ...
          </Typography>
          <Button variant="contained" color="primary">
            Mua ngay
          </Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Promotion;
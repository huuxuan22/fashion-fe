import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  styled
} from '@mui/material';
import * as productService from './../service/product-service.js';
import { useNavigate } from 'react-router-dom';
import * as cartServiceRedux from  "./../redux/Cart/Action.js"
import { useDispatch } from 'react-redux';
import SuccessNotification from '../component/SuccessNotification.jsx';
const products = [
  {
    id: 1,
    name: 'Short Kaki Nam Gài Tran Av',
    price: '188.000 VND',
    image: 'https://th.bing.com/th/id/R.a6b340e08a67440dd3512122747e43bc?rik=qthlNrMwrrM2NQ&pid=ImgRaw&r=0',
    trending: true
  },
  {
    id: 2,
    name: 'Short Kaki Nam Gài Rút Dây C...',
    price: '259.000 VND',
    image: 'https://th.bing.com/th/id/R.a6b340e08a67440dd3512122747e43bc?rik=qthlNrMwrrM2NQ&pid=ImgRaw&r=0',
    trending: false
  },
  {
    id: 3,
    name: 'Áo Polo Regular Nam Phối 2 V...',
    price: '249.000 VND',
    image: 'https://th.bing.com/th/id/R.a6b340e08a67440dd3512122747e43bc?rik=qthlNrMwrrM2NQ&pid=ImgRaw&r=0',
    trending: true
  },
  {
    id: 4,
    name: 'Áo Polo Basic Nữ Vải Thun Cá...',
    price: '195.000 VND',
    image: 'https://th.bing.com/th/id/R.a6b340e08a67440dd3512122747e43bc?rik=qthlNrMwrrM2NQ&pid=ImgRaw&r=0',
    trending: false
  },
  {
    id: 5,
    name: 'Áo Thun Nữ Croptop Nữ Sn C...',
    price: '99.000 VND',
    image: 'https://th.bing.com/th/id/R.a6b340e08a67440dd3512122747e43bc?rik=qthlNrMwrrM2NQ&pid=ImgRaw&r=0',
    trending: true
  },
  {
    id: 6,
    name: 'Áo Thun Nam Cổ Tròn',
    price: '120.000 VND',
    image: 'https://th.bing.com/th/id/R.a6b340e08a67440dd3512122747e43bc?rik=qthlNrMwrrM2NQ&pid=ImgRaw&r=0',
    trending: false
  },
  {
    id: 7,
    name: 'Quần Jeans Nam Slim Fit',
    price: '350.000 VND',
    image: 'https://th.bing.com/th/id/R.a6b340e08a67440dd3512122747e43bc?rik=qthlNrMwrrM2NQ&pid=ImgRaw&r=0',
    trending: true
  },
  {
    id: 8,
    name: 'Áo Khoác Nam Dù',
    price: '450.000 VND',
    image: 'https://th.bing.com/th/id/R.a6b340e08a67440dd3512122747e43bc?rik=qthlNrMwrrM2NQ&pid=ImgRaw&r=0',
    trending: false
  },
  {
    id: 9,
    name: 'Váy Nữ Dáng Xòe',
    price: '280.000 VND',
    image: 'https://th.bing.com/th/id/R.a6b340e08a67440dd3512122747e43bc?rik=qthlNrMwrrM2NQ&pid=ImgRaw&r=0',
    trending: true
  },
  {
    id: 10,
    name: 'Áo Len Nữ Cổ Lọ',
    price: '320.000 VND',
    image: 'https://th.bing.com/th/id/R.a6b340e08a67440dd3512122747e43bc?rik=qthlNrMwrrM2NQ&pid=ImgRaw&r=0',
    trending: false
  }
];

const ProductCard = styled(Card)({
  position: 'relative',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    '& .add-to-cart': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
});

const ImageContainer = styled(Box)({
  position: 'relative',
  paddingTop: '150%', // Tạo tỉ lệ 2:3 (rộng:cao)
  overflow: 'hidden',
});

const StyledCardMedia = styled(CardMedia)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover' // Đảm bảo hình ảnh phủ đầy container
});

const AddToCartButton = styled(Button)({
  position: 'absolute',
  bottom: 16,
  left: '50%',
  transform: 'translateX(-50%) translateY(20px)',
  opacity: 0,
  transition: 'all 0.3s ease',
  backgroundColor: '#00917B',
  color: 'white',
  '&:hover': {
    backgroundColor: '#00695C'
  }
});

const TrendingBadge = styled(Chip)({
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: '#FF4081',
  color: 'white',
  fontWeight: 'bold',
  zIndex: 1
});

const ProductGrid = ({category}) => { 
  const [products,setProducts] = useState([]);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const [open,setOpen] = useState(false);
  useEffect(() => {
    loadProducts();
  },[])
  const loadProducts = async () => {
    if (category === 'noibac') {
      await productService.getProductStandOut({token: token}).then((data) => {
        setProducts(data.data);
      })
    }
  }
  const handleAddToCart =async (product) => {
    const data =  await dispatch(cartServiceRedux.addToCartProduct(token,product));
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
  }
  console.log("Sản phẩm nổi bật của bạn là: ",products);
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Sản phẩm nổi bật
      </Typography>
      
      <Grid container spacing={3} >
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.productId}  sx={{ cursor: 'pointer' }}
          onClick = {() => {
              navigate('/product-detail', {state: {productId: product.productId}});
          }}>
            <ProductCard>
              <ImageContainer>
                {product.trending && (
                  <TrendingBadge label="Xu hướng" size="small" />
                )}
                <StyledCardMedia
                  component="img"
                  image={"http://localhost:8080/image/product/"+product.thumbnail
                  }
                  alt={product.productName}
                />
              </ImageContainer>
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="body1" component="div" noWrap>
                  {product.productName}
                </Typography>
                <Typography variant="h6" color="text.primary">
                  {product.price}
                </Typography>
              </CardContent>
              
              <Box sx={{ position: 'relative', pb: 2 }}>
                <AddToCartButton 
                  variant="contained" 
                  size="small"
                  className="add-to-cart"
                  onClick={(e) => {
                    e.stopPropagation(); // Chặn sự kiện click lan lên Grid item
                    handleAddToCart(product);
                  }}
                >
                  Thêm vào giỏ hàng
                </AddToCartButton>
              </Box>
            </ProductCard>
          </Grid>
        ))}
      </Grid>

      {open  && (
        <SuccessNotification 
          open={open}
          onClose= {handleClose}
          message={"Đã thêm vào giỏ hàng"}
        />
      )}
    </Box>
  );
};

export default ProductGrid;
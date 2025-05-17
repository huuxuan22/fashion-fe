import React from 'react';
import { Box, Typography, Button, Card, CardContent, Fade } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLocation, useNavigate } from 'react-router-dom';

const deliveryImage = 'https://th.bing.com/th/id/OIP.bBq7K1CkbnpP8UfvYd0yMgHaHa?rs=1&pid=ImgDetMain';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
    const location = useLocation();
    const product = location.state.product;
    console.log("Product: ",product);
    
  React.useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);
  const handleComeback = () => {
    if (product.length === 1) {
      navigate('/product-detail', {state: {productId: product[0].product.productId}});
    }else {
      navigate('/shopping-cart')
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f0fdf9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Fade in={show} timeout={800}>
        <Card
          sx={{
            maxWidth: 550,
            width: '100%',
            boxShadow: 6,
            borderRadius: 4,
            backgroundColor: '#ffffff',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ 
            width: '100%', 
            textAlign: 'center', 
            backgroundColor: '#e6faf6',
            padding: '20px 0',
            position: 'relative',
            height: 180,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img
              src={deliveryImage}
              alt="Người giao hàng"
              style={{ 
                height: '100%',
                width: 'auto',
                maxWidth: '80%',
                objectFit: 'contain',
                filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.1))'
              }}
            />
          </Box>
          <CardContent sx={{ 
            textAlign: 'center', 
            padding: 4,
            '& > *': {
              marginBottom: 3,
              '&:last-child': {
                marginBottom: 0
              }
            }
          }}>
            <CheckCircleIcon sx={{ 
              fontSize: 70, 
              color: '#02907b',
              filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))'
            }} />
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold', 
              color: '#02907b',
              fontSize: '1.8rem',
              lineHeight: 1.3
            }}>
              Đặt hàng thành công!
            </Typography>
            <Typography variant="body1" sx={{ 
              fontSize: '1.05rem',
              color: '#555',
              lineHeight: 1.6
            }}>
              Hãy chờ admin duyệt để đơn hàng được gửi đi. Cảm ơn bạn đã mua sắm cùng chúng tôi!
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 3, 
              marginTop: 4,
              '& button': {
                minWidth: 120,
                padding: '10px 20px',
                fontSize: '0.95rem',
                borderRadius: '8px'
              }
            }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#02907b',
                  color: '#02907b',
                  '&:hover': {
                    backgroundColor: '#e0f7f4',
                    borderColor: '#027061',
                  },
                }}
                onClick={() => handleComeback()}
              >
                Trở lại
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#02907b',
                  '&:hover': {
                    backgroundColor: '#027061',
                  },
                }}
                onClick={() => navigate('/profile')}
              >
                Xem đơn hàng
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default OrderSuccess;
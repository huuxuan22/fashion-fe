import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  keyframes,
  styled
} from '@mui/material';
import {
  FlashOn as FlashIcon,
  Event as EventIcon,
  AccessTime as ClockIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

// Custom animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

// Styled components
const AnimatedCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
    '& .promo-icon': {
      animation: `${pulse} 1.5s infinite`
    }
  }
}));

const GradientBox = styled(Box)({
  animation: `${fadeIn} 0.8s ease-out`,
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #008b76, #00b294)',
    opacity: 0.7
  }
});

// Mock data
const ongoingPromotions = [
  {
    id: 1,
    title: "FREESHIP TOÀN QUỐC",
    description: "Miễn phí vận chuyển cho mọi đơn hàng từ 300K",
    type: "SHIPPING",
    endDate: "31/12/2023",
    featured: true
  },
  {
    id: 2,
    title: "ƯU ĐÃI THẺ THÀNH VIÊN",
    description: "Tích điểm 2X cho thành viên VIP",
    type: "MEMBERSHIP",
    endDate: "31/12/2023",
    featured: false
  }
];

const upcomingEvents = [
  {
    id: 3,
    title: "SỰ KIỆN BLACK FRIDAY",
    description: "Giảm giá cực sốc vào 24/11",
    type: "EVENT",
    startDate: "24/11/2023"
  },
  {
    id: 4,
    title: "NGÀY HỘI TRI ÂN",
    description: "Nhiều ưu đãi đặc biệt cho khách hàng thân thiết",
    type: "LOYALTY",
    startDate: "15/12/2023"
  }
];

const Promotion = () => {
  const theme = useTheme();

  const getPromoIcon = (type) => {
    const iconStyle = {
      fontSize: '2rem',
      color: '#008b76'
    };
    
    switch(type) {
      case 'SHIPPING': return <FlashIcon sx={iconStyle} />;
      case 'MEMBERSHIP': return <EventIcon sx={iconStyle} />;
      case 'LOYALTY': return <EventIcon sx={iconStyle} />;
      default: return <EventIcon sx={iconStyle} />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ 
      py: 8,
      fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif'
    }}>
      {/* Hero Banner */}
      <GradientBox sx={{
        height: { xs: 240, md: 320 },
        borderRadius: 2,
        mb: 8,
        background: 'linear-gradient(135deg, #008b76 0%, #00b294 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        boxShadow: 3
      }}>
        <Box px={4} sx={{ animation: `${fadeIn} 1s ease-out` }}>
          <Typography variant="h2" component="h1" sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '2rem', md: '2.5rem' },
            letterSpacing: 1
          }}>
            ƯU ĐÃI DỊCH VỤ
          </Typography>
          <Typography variant="h5" sx={{
            fontWeight: 400,
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            opacity: 0.9,
            maxWidth: 600,
            margin: '0 auto'
          }}>
            Khám phá những ưu đãi đặc biệt dành riêng cho bạn
          </Typography>
        </Box>
      </GradientBox>

      {/* Ongoing Promotions */}
      <Box mb={10} sx={{ animation: `${fadeIn} 0.8s ease-out` }}>
        <Typography variant="h3" component="h2" sx={{
          fontWeight: 600,
          mb: 6,
          fontSize: { xs: '1.5rem', md: '1.8rem' },
          color: '#333',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -12,
            left: 0,
            width: 60,
            height: 3,
            backgroundColor: '#008b76'
          }
        }}>
          ƯU ĐÃI ĐANG ÁP DỤNG
        </Typography>

        <Grid container spacing={4}>
          {ongoingPromotions.map((promo) => (
            <Grid item xs={12} md={6} key={promo.id}>
              <AnimatedCard sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                borderLeft: promo.featured ? '4px solid #008b76' : 'none',
                borderRadius: 1,
                overflow: 'hidden'
              }}>
                <Box sx={{ 
                  width: { xs: '100%', sm: 140 },
                  minHeight: { xs: 120, sm: 'auto' },
                  bgcolor: '#f8f8f8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2
                }}>
                  <Box className="promo-icon">
                    {getPromoIcon(promo.type)}
                  </Box>
                </Box>
                <Box sx={{ 
                  flex: 1, 
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  {promo.featured && (
                    <Chip
                      label="NỔI BẬT"
                      size="small"
                      sx={{ 
                        mb: 2,
                        bgcolor: '#008b76',
                        color: 'white',
                        fontWeight: 600,
                        alignSelf: 'flex-start'
                      }}
                    />
                  )}
                  <Typography variant="h5" component="h3" sx={{
                    fontWeight: 600,
                    mb: 1.5,
                    color: '#333',
                    fontSize: '1.3rem'
                  }}>
                    {promo.title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: '#666',
                    mb: 2,
                    lineHeight: 1.6
                  }}>
                    {promo.description}
                  </Typography>
                  <Box display="flex" alignItems="center" sx={{ color: '#777' }}>
                    <ClockIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      Kết thúc: {promo.endDate}
                    </Typography>
                  </Box>
                </Box>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Upcoming Events */}
      <Box mb={10} sx={{ animation: `${fadeIn} 0.8s ease-out` }}>
        <Typography variant="h3" component="h2" sx={{
          fontWeight: 600,
          mb: 6,
          fontSize: { xs: '1.5rem', md: '1.8rem' },
          color: '#333',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -12,
            left: 0,
            width: 60,
            height: 3,
            backgroundColor: '#008b76'
          }
        }}>
          SỰ KIỆN SẮP TỚI
        </Typography>

        <List sx={{ 
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1,
          overflow: 'hidden'
        }}>
          {upcomingEvents.map((event, index) => (
            <ListItem 
              key={event.id} 
              divider={index !== upcomingEvents.length - 1}
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': { 
                  bgcolor: '#f8f8f8',
                  transform: 'translateX(5px)'
                },
                py: 3,
                px: 4
              }}
            >
              <ListItemIcon sx={{ minWidth: 48, mr: 3 }}>
                <Box sx={{ 
                  bgcolor: '#e8f5f2',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getPromoIcon(event.type)}
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ 
                    fontWeight: 600,
                    color: '#333',
                    fontSize: '1.1rem',
                    mb: 0.5
                  }}>
                    {event.title}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ 
                    color: '#666',
                    fontSize: '0.95rem'
                  }}>
                    {event.description}
                  </Typography>
                }
                sx={{ my: 0 }}
              />
              <Box sx={{ 
                textAlign: 'right',
                ml: 2
              }}>
                <Typography variant="caption" sx={{ 
                  display: 'block',
                  color: '#008b76',
                  fontWeight: 500,
                  mb: 0.5
                }}>
                  Bắt đầu
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#333',
                  fontWeight: 500
                }}>
                  {event.startDate}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Terms and Conditions */}
      <Box sx={{ animation: `${fadeIn} 0.8s ease-out` }}>
        <Typography variant="h3" component="h2" sx={{
          fontWeight: 600,
          mb: 6,
          fontSize: { xs: '1.5rem', md: '1.8rem' },
          color: '#333',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -12,
            left: 0,
            width: 60,
            height: 3,
            backgroundColor: '#008b76'
          }
        }}>
          ĐIỀU KHOẢN ÁP DỤNG
        </Typography>

        <List sx={{ 
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1,
          overflow: 'hidden'
        }}>
          {[
            "Ưu đãi có thể thay đổi tùy theo thời điểm",
            "Mỗi ưu đãi có điều kiện áp dụng riêng",
            "Vui lòng liên hệ hotline 1900 1234 để biết thêm chi tiết"
          ].map((item, index) => (
            <ListItem 
              key={index} 
              divider={index !== 2}
              sx={{
                py: 2.5,
                px: 4,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  bgcolor: '#f8f8f8',
                  paddingLeft: '28px'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckIcon sx={{ color: '#008b76' }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ 
                    color: '#444',
                    fontSize: '1rem'
                  }}>
                    {item}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Promotion;
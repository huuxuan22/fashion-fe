import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Typography, Card, CardMedia, CardContent, Button, Chip } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as adminService from "./../service/admin-service";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";

// Animation effects
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

// Primary color
const primaryColor = '#008772';
const hoverColor = '#00695f';

// Custom styled components
const DealCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  border: '1px solid #e0e0e0',
  animation: `${fadeIn} 0.5s ease forwards`,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    borderColor: primaryColor,
    animation: `${pulse} 1.5s infinite ease-in-out`,
  },
}));

const DealImageWrapper = styled(Box)({
  position: 'relative',
  paddingTop: '100%',
  overflow: 'hidden',
  backgroundColor: '#f9f9f9',
});

const DealImage = styled(CardMedia)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: '#ff4444',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '0.75rem',
  zIndex: 1,
  animation: `${pulse} 2s infinite ease-in-out`,
}));

const DealsSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          speed: 600,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          speed: 500,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          speed: 400,
        },
      },
    ],
  };
  
  const [dealList, setDealList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  const loadData = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getAllDEAL(8, 0, token);
      setDealList(response.data || []);
    } catch (error) {
      console.error("Error loading deals:", error);
      setDealList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length < 5) return "";
    const [year, month, day] = dateArray;
    return `${day}/${month}/${year}`;
  };

  const renderDiscountInfo = (deal) => {
    if (deal.dealType === "DEAL PERCENT") {
      return `${deal.discountPercent}% OFF`;
    } else if (deal.dealType === "DEAL PRICE") {
      return `Giá chỉ ${deal.dealPrice?.toLocaleString() || '0'}đ`;
    }
    return "";
  };
  const navigate = useNavigate();
 const handleDetailProduct = (id) => {
    navigate('/product-detail', {state: {productId: id}})
 }
 console.log(dealList);
 
  return (
    <Box sx={{ 
      px: { xs: 2, sm: 4, md: 6, lg: '100px' },
      py: 6,
      backgroundColor: '#f8f9fa',
      overflow: 'hidden',
      cursor: 'pointer'
    }}>
      <Typography variant="h4" sx={{ 
        textAlign: 'center',
        fontWeight: 'bold',
        mb: 4,
        color: primaryColor,
        fontSize: { xs: '1.75rem', md: '2.125rem' },
        position: 'relative',
        animation: `${fadeIn} 0.8s ease forwards`,
        '&:after': {
          content: '""',
          display: 'block',
          width: '80px',
          height: '4px',
          backgroundColor: primaryColor,
          margin: '16px auto 0',
          borderRadius: '2px',
          animation: `${fadeIn} 1s ease forwards`,
        }
      }}>
        Ưu đãi đặc biệt
      </Typography>

      {isLoading ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '300px',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
        }}>
          <Typography variant="h6" color="textSecondary">
            Đang tải ưu đãi...
          </Typography>
        </Box>
      ) : dealList.length > 0 ? (
        <Box sx={{ 
          position: 'relative',
          animation: `${fadeIn} 0.6s ease forwards`,
        }}>
          <Slider {...settings}>
            {dealList.map((deal, index) => (
              <Box key={deal.dealId} sx={{ 
                px: 1.5, 
                py: 1,
                animation: `${fadeIn} ${0.3 + index * 0.1}s ease forwards`,
              }}
              onClick={() => handleDetailProduct(deal.product.productId)}
              >
                <DealCard>
                  <DealImageWrapper>
                    <DealImage
                      component="img"
                      image={"http://localhost:8080/image/product/" + (deal.product.thumbnail || "default-product.jpg")}
                      alt={deal.product.productName}
                    />
                    {(deal.dealType === "DEAL PERCENT" && deal.discountPercent) && (
                      <DiscountBadge label={`-${deal.discountPercent}%`} />
                    )}
                  </DealImageWrapper>
                  <CardContent sx={{
                    flexGrow: 1,
                    textAlign: 'center',
                    bgcolor: 'white',
                    py: 2,
                    px: 2,
                  }}>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 'bold', 
                      fontSize: '1rem',
                      mb: 1,
                      color: '#333',
                      minHeight: '48px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {deal.product.productName}
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 1.5,
                    }}>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 'bold',
                        color: primaryColor,
                        fontSize: '1.1rem',
                      }}>
                        {renderDiscountInfo(deal)}
                      </Typography>
                    </Box>
                    
                    <Typography variant="caption" sx={{ 
                      display: 'block', 
                      color: '#666',
                      fontSize: '0.75rem',
                      mb: 1.5,
                    }}>
                      Áp dụng: {formatDate(deal.startTime)} - {formatDate(deal.endTime)}
                    </Typography>
                    
                    <Button 
                      variant="contained"
                      size="medium"
                      fullWidth
                      sx={{ 
                        backgroundColor: primaryColor,
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        borderRadius: '6px',
                        py: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: hoverColor,
                          boxShadow: `0 4px 15px ${primaryColor}80`,
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      Mua ngay
                    </Button>
                  </CardContent>
                </DealCard>
              </Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '300px',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
          animation: `${fadeIn} 0.6s ease forwards`,
        }}>
          <Typography variant="h6" color="textSecondary">
            Hiện không có ưu đãi nào
          </Typography>
        </Box>
      )}

      {/* Custom slider arrows and dots */}
      <style>
        {`
          .slick-dots {
            bottom: -40px !important;
          }
          .slick-dots li {
            margin: 0 4px !important;
            width: 12px !important;
            height: 12px !important;
          }
          .slick-dots li button {
            width: 12px !important;
            height: 12px !important;
            padding: 0 !important;
          }
          .slick-dots li button:before {
            color: ${primaryColor} !important;
            font-size: 10px !important;
            opacity: 0.3 !important;
            width: 12px !important;
            height: 12px !important;
            line-height: 12px !important;
            transition: all 0.3s ease !important;
          }
          .slick-dots li.slick-active button:before {
            color: ${primaryColor} !important;
            opacity: 1 !important;
            transform: scale(1.2);
          }
          .slick-prev, .slick-next {
            width: 40px !important;
            height: 40px !important;
            z-index: 1;
            background: rgba(255,255,255,0.9) !important;
            border-radius: 50% !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: all 0.3s ease !important;
          }
          .slick-prev:hover, .slick-next:hover {
            background: white !important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          }
          .slick-prev:before, .slick-next:before {
            color: ${primaryColor} !important;
            font-size: 24px !important;
            opacity: 1 !important;
          }
          .slick-prev {
            left: -15px !important;
          }
          .slick-next {
            right: -15px !important;
          }
        `}
      </style>
    </Box>
  );
};

export default DealsSection;
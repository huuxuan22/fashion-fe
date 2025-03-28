import React from "react";
import Slider from "react-slick";
import { Box, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const deals = [
  {
    title: "Smart Watches",
    discount: "35% OFF",
    image: "https://th.bing.com/th/id/OIP.1GBZ9LkpZlppxLZNsY6_3AHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7",
  },
  {
    title: "Women Skirts Palazzos",
    discount: "25% OFF",
    image: "https://th.bing.com/th/id/OIP.1GBZ9LkpZlppxLZNsY6_3AHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7",
  },
  {
    title: "Men T-Shirts",
    discount: "30% OFF",
    image: "https://th.bing.com/th/id/OIP.1GBZ9LkpZlppxLZNsY6_3AHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7",
  },
  {
    title: "Women Sarees",
    discount: "20% OFF",
    image: "https://th.bing.com/th/id/OIP.1GBZ9LkpZlppxLZNsY6_3AHaHa?w=216&h=216&c=7&r=0&o=5&pid=1.7",
  },
];

const DealsSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ 
      px: '100px',
      py: 4,
      backgroundColor: 'white',
    }}>
      <Typography variant="h4" sx={{ 
        textAlign: 'center',
        fontWeight: 'bold',
        mb: 3,
        color: '#2E7D32' // Màu xanh lá cây đậm
      }}>
        Today's Deals
      </Typography>

      <Slider {...settings}>
        {deals.map((deal, index) => (
          <Box key={index} sx={{ px: 1.5 }}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              boxShadow: 3,
              overflow: 'hidden',
              border: '2px solid #2E7D32', // Viền xanh lá cây đậm
              '&:hover': {
                boxShadow: 6,
              }
            }}>
              <CardMedia
                component="img"
                sx={{
                  height: 180,
                  width: '100%',
                  objectFit: 'contain',
                  backgroundColor: 'white',
                  p: 1,
                }}
                image={deal.image}
                alt={deal.title}
              />
              <CardContent sx={{
                textAlign: 'center',
                bgcolor: 'white',
                color: '#2E7D32', // Chữ màu xanh lá cây đậm
                py: 1.5,
                borderTop: '1px solid #2E7D32' // Viền ngăn cách
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {deal.title}
                </Typography>
                <Typography variant="body2" sx={{ my: 0.5, fontSize: '0.8rem' }}>
                  {deal.discount}
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    color: '#2E7D32',
                    borderColor: '#2E7D32',
                    textTransform: 'none',
                    fontSize: '0.8rem',
                    '&:hover': {
                      backgroundColor: '#2E7D32',
                      color: 'white',
                      borderColor: '#2E7D32'
                    }
                  }}
                >
                  Shop Now
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>

      {/* Tùy chỉnh dots slider */}
      <style>
        {`
          .slick-dots li button:before {
            color: #2E7D32 !important;
          }
          .slick-dots li.slick-active button:before {
            color: #2E7D32 !important;
          }
        `}
      </style>
    </Box>
  );
};

export default DealsSection;
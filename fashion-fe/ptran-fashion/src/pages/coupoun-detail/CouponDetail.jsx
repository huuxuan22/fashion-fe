import React from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  Paper,
  Tooltip,
  Fade,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Check as CheckIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  ContentCopy as CopyIcon,
  ShoppingCart as ShoppingCartIcon,
  People,
  CalendarToday,
  StarBorder,
  WarningAmber
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../layout/Header";

const primaryColor = "#008b76";
const secondaryColor = "#d4af87";
const lightBg = "#f5faf9";
const hoverColor = "#00695c";

const CouponDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { coupon } = location.state;

  if (!coupon) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">Đang tải thông tin...</Typography>
      </Container>
    );
  }

  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length < 5) return "";
    const [year, month, day, hour, minute] = dateArray;
    return `${day}/${month}/${year} ${hour}:${minute.toString().padStart(2, "0")}`;
  };

  const startTime = formatDate(coupon.startTime);
  const endTime = formatDate(coupon.endTime);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.couponCode);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Header></Header>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 4,
          position: 'relative'
        }}>
          <Tooltip title="Quay lại" arrow TransitionComponent={Fade}>
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                mr: 2,
                color: primaryColor,
                "&:hover": {
                  backgroundColor: primaryColor,
                  color: "white",
                },
              }}
            >
              <ArrowBackIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: primaryColor,
              flexGrow: 1,
              textAlign: 'center',
              fontFamily: "'Times New Roman', serif",
              position: 'relative',
              '&:after': {
                content: '""',
                display: 'block',
                width: '80px',
                height: '3px',
                backgroundColor: secondaryColor,
                margin: '12px auto 0',
                borderRadius: '2px'
              }
            }}
          >
            CHI TIẾT DEAL
          </Typography>
        </Box>

        {/* Main Card */}
        <Card elevation={0} sx={{ 
          borderRadius: '12px',
          bgcolor: lightBg,
          position: 'relative'
        }}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {/* Left Column */}
              <Grid item xs={12} md={6}>
                {/* Coupon Image */}
                <Paper sx={{ 
                  p: 2, 
                  mb: 3,
                  borderRadius: '8px',
                  textAlign: 'center',
                  position: 'relative'
                }}>
                  <Box sx={{
                    width: '100%',
                    height: 200,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img
                      src={`http://localhost:8080/image/deal/${coupon.imageUrl}`}
                      alt="Deal"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <Box sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      p: 1
                    }}>
                      <Typography variant="body2">
                        {coupon.couponCode}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Coupon Code */}
                <Paper sx={{ 
                  p: 2, 
                  mb: 3,
                  border: `2px dashed ${primaryColor}`,
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: primaryColor }}>
                      {coupon.couponCode}
                    </Typography>
                    <Tooltip title="Sao chép mã">
                      <IconButton onClick={handleCopyCode} size="small" sx={{ color: primaryColor }}>
                        <CopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Paper>

                {/* Usage Progress */}
                <Paper sx={{ p: 2, mb: 3, borderRadius: '8px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <People sx={{ fontSize: 18, color: primaryColor, mr: 1 }} />
                    <Typography variant="body2">Lượt dùng còn lại: {coupon.usageLimit}</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(coupon.usageLimit / 200) * 100} 
                    sx={{ 
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        bgcolor: primaryColor
                      }
                    }}
                  />
                </Paper>
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={6}>
                {/* Deal Details */}
                <Paper sx={{ p: 2, mb: 3, borderRadius: '8px' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: primaryColor }}>
                    Thông tin chính
                  </Typography>
                  
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <StarBorder sx={{ color: primaryColor, fontSize: 18 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`Giảm ${coupon.discountValue.toLocaleString()}${coupon.discountType === 'FIXED_AMOUNT' ? '₫' : '%'}`}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CalendarToday sx={{ color: primaryColor, fontSize: 18 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${startTime} - ${endTime}`}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                </Paper>

                {/* Terms & Conditions */}
                <Paper sx={{ p: 2, borderRadius: '8px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <WarningAmber sx={{ fontSize: 18, color: primaryColor, mr: 1 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: primaryColor }}>
                      Điều kiện
                    </Typography>
                  </Box>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <StarBorder sx={{ color: primaryColor, fontSize: 16 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Áp dụng cho đơn từ 500.000₫"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <StarBorder sx={{ color: primaryColor, fontSize: 16 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Không kết hợp khuyến mãi khác"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                </Paper>

                {/* Action Buttons */}
                <Box sx={{ 
                  mt: 3,
                  display: 'flex', 
                  gap: 2,
                  flexWrap: 'wrap'
                }}>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    fullWidth
                    sx={{
                      bgcolor: primaryColor,
                      borderRadius: '6px',
                      py: 1,
                      fontSize: '0.9rem',
                      '&:hover': {
                        bgcolor: hoverColor
                      }
                    }}
                    onClick={() => {
                      navigate('/product-page')
                    }}
                  >
                    Sử dụng ngay
                  </Button>
                  
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderColor: primaryColor,
                      color: primaryColor,
                      borderRadius: '6px',
                      py: 1,
                      fontSize: '0.9rem',
                      '&:hover': {
                        bgcolor: primaryColor,
                        color: 'white'
                      }
                    }}
                  >
                    Chia sẻ
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </LocalizationProvider>
  );
};

export default CouponDetail;
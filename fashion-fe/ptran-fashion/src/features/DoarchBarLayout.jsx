import React, { useEffect, useRef, useState } from "react";
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
  styled,
  Button,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import * as productService from "./../service/product-service";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import StarIcon from "@mui/icons-material/Star";
import * as adminService from "./../service/admin-service";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import * as cartServiceRedux from "./../redux/Cart/Action"
// Styled components

const ProductCard = styled(Card)({
  borderRadius: 12,
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  transition: "transform 0.3s",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-5px)",
  },
});
// Mock data
const luxuryNotifications = [
  {
    id: 1,
    title: "HYDROPHOBIC SHORTS",
    subtitle: "HYDROPHOBIC SHORTS",
    text: "Elevate your wardrobe with timeless pieces that define who you are. Every moment counts with a touch of sophistication.",
  },
  {
    id: 2,
    title: "LUXURY COLLECTION",
    subtitle: "NEW ARRIVALS",
    text: "Discover our exclusive collection that combines comfort with elegance for the modern lifestyle.",
  },
  {
    id: 3,
    title: "PREMIUM MATERIALS",
    subtitle: "CRAFTED TO PERFECTION",
    text: "Experience the finest fabrics and attention to detail in every stitch of our premium collection.",
  },
];


const DashboardLayout = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [topProduct, setTopProduct] = useState([]);
  const [deals, setDeals] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const size = 5;
  const [page, setPage] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const loadTopPorduct = async () => {
    await productService.getDiscountProduct({ token: token }).then((data) => {
      setTopProduct(data.data);
    });
    await adminService.getAllCoupon(size, page, token).then((data) => {
      setCoupons(data.data);
    });
    await adminService.getAllDEAL(size, page, token).then((data) => {
      setDeals(data.data);
    });
  };
  useEffect(() => {
    loadTopPorduct();
  }, []);



  const couponSliderRef = useRef(null);

  const handlePrevCoupon = () => {
    if (couponSliderRef.current) {
      couponSliderRef.current.slickPrev();
    }
  };

  const handleNextCoupon = () => {
    if (couponSliderRef.current) {
      couponSliderRef.current.slickNext();
    }
  };

  // Refs và hàm xử lý slider
  const dealSliderRef = useRef(null);

  const handlePrevDeal = () => {
    dealSliderRef.current.slickPrev();
  };

  const handleNextDeal = () => {
    dealSliderRef.current.slickNext();
  };

  // Hàm format ngày tháng
  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length < 5) return "";
    const [year, month, day] = dateArray;
    return `${day}/${month}/${year}`;
  };

  const handleCoupon = (coupon) => {
    console.log("Navigating to coupon detail", coupon); // Kiểm tra log này
    navigate("/coupon-detail", {
      state: { coupon: coupon },
      replace: false, // Đảm bảo không dùng replace nếu không cần thiết
    });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1800, margin: "0 auto" }}>
      <Grid spacing={3}>
        {/* Coupon-deal - Left Side */}
        <Grid container spacing={3}>
          {/* Promotion Slider - Right Side */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                height: "100%",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0, 113, 96, 0.2)",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 40px rgba(0, 113, 96, 0.3)",
                },
              }}
            >
              {/* Thêm ribbon góc trái */}
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: -28,
                  width: "120px",
                  backgroundColor: "#007160",
                  color: "white",
                  textAlign: "center",
                  lineHeight: "28px",
                  transform: "rotate(-45deg)",
                  zIndex: 3,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                }}
              >
                LIMITED
              </Box>

              <Slider
                ref={couponSliderRef}
                dots={true}
                infinite={true}
                speed={600}
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={4500}
                arrows={false}
                adaptiveHeight={true}
                cssEase="cubic-bezier(0.645, 0.045, 0.355, 1)"
                dotClass="slick-dots custom-dots"
              >
                {coupons.map((coupon) => (
                  <Box
                    key={coupon.couponId}
                    sx={{ position: "relative" }}
                    onClick={(e) => {
                      e.preventDefault(); // Ngăn hành vi mặc định (ví dụ submit form)
                      e.stopPropagation();
                      console.log("vào đây rồi ");

                      handleCoupon(coupon);
                    }}
                  >
                    {/* Overlay pattern */}
                    <Box
                      sx={{
                        position: "absolute",
                        cursor: "pointer",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          "linear-gradient(135deg, rgba(0, 113, 96, 0.08) 0%, transparent 50%)",
                        zIndex: 1,
                      }}
                    />

                    <CardMedia
                      component="img"
                      height="420"
                      image={
                        "http://localhost:8080/image/deal/" + coupon.imageUrl ||
                        "/default-coupon-image.jpg"
                      }
                      alt={coupon.couponCode}
                      sx={{
                        objectFit: "cover",
                        width: "100%",
                        filter: "brightness(0.9) contrast(1.05)",
                        transition:
                          "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                        transformOrigin: "center center",
                        "&:hover": {
                          transform: "scale(1.04)",
                        },
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 2,
                        color: "white",
                        background:
                          "linear-gradient(to top, rgba(0, 40, 35, 0.95) 0%, transparent 120%)",
                        padding: "24px",
                        pt: "48px",
                        pb: "32px",
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: "90%",
                          marginBottom: "8px",
                          padding: "8px 12px",
                          background: "rgba(255,255,255,0.15)",
                          backdropFilter: "blur(4px)",
                          borderRadius: "6px",
                          display: "inline-block",
                        }}
                      >
                        
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: "#d0f0ed",
                          fontWeight: 600,
                          fontSize: "1.25rem",
                          mb: 2,
                          textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                        }}
                      >
                        <LocalOfferIcon
                          fontSize="medium"
                          sx={{
                            color: "#80deea",
                            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                          }}
                        />
                        Giảm {coupon.discountValue.toLocaleString()}
                        {coupon.discountType === "PERCENTAGE" ? "%" : "đ"}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <Chip
                          label="ƯU ĐÃI ĐẶC BIỆT"
                          size="medium"
                          sx={{
                            bgcolor: "#007160",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                            px: 1.5,
                            py: 1,
                            boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
                            borderRadius: "6px",
                            "& .MuiChip-label": {
                              paddingLeft: "6px",
                              paddingRight: "6px",
                            },
                          }}
                        />
                        {coupon.usageLimit && (
                          <Chip
                            label={`⏳ CÒN ${coupon.usageLimit} LƯỢT`}
                            size="medium"
                            sx={{
                              bgcolor: "#4fb3bf",
                              color: "white",
                              fontWeight: "bold",
                              fontSize: "0.8rem",
                              px: 1.5,
                              py: 1,
                              boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
                              borderRadius: "6px",
                              "& .MuiChip-label": {
                                paddingLeft: "6px",
                                paddingRight: "6px",
                              },
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Slider>

              {/* Custom arrows */}
              <IconButton
                onClick={handlePrevCoupon}
                sx={{
                  position: "absolute",
                  left: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 3,
                  color: "white",
                  backgroundColor: "rgba(0, 113, 96, 0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 80, 70, 0.9)",
                    transform: "translateY(-50%) scale(1.1)",
                  },
                  width: 44,
                  height: 44,
                  display: { xs: "none", md: "flex" },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <ChevronLeft fontSize="medium" />
              </IconButton>

              <IconButton
                onClick={handleNextCoupon}
                sx={{
                  position: "absolute",
                  right: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 3,
                  color: "white",
                  backgroundColor: "rgba(0, 113, 96, 0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 80, 70, 0.9)",
                    transform: "translateY(-50%) scale(1.1)",
                  },
                  width: 44,
                  height: 44,
                  display: { xs: "none", md: "flex" },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <ChevronRight fontSize="medium" />
              </IconButton>
            </Box>
          </Grid>
          {/* Luxury Notifications - Left Side */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                height: "100%",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0, 113, 96, 0.2)",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 40px rgba(0, 113, 96, 0.3)",
                },
              }}
            >
              {/* Thêm ribbon góc trái */}
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: -28,
                  width: "120px",
                  backgroundColor: "#007160",
                  color: "white",
                  textAlign: "center",
                  lineHeight: "28px",
                  transform: "rotate(-45deg)",
                  zIndex: 3,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                }}
              >
                HOT DEAL
              </Box>

              <Slider
                ref={dealSliderRef}
                dots={true}
                infinite={true}
                speed={600}
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={4500}
                arrows={false}
                adaptiveHeight={true}
                cssEase="cubic-bezier(0.645, 0.045, 0.355, 1)"
                dotClass="slick-dots custom-dots"
              >
                {deals.map((deal) => (
                  <Box key={deal.dealId} sx={{ position: "relative" }}>
                    {/* Overlay pattern */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          "linear-gradient(135deg, rgba(0, 113, 96, 0.08) 0%, transparent 50%)",
                        zIndex: 1,
                        pointerEvents: "none",
                      }}
                    />

                    <CardMedia
                      component="img"
                      height="420"
                      image={
                        "http://localhost:8080/image/deal/" + deal.imageUrl ||
                        "/default-deal-image.jpg"
                      }
                      alt={deal.product.productName}
                      sx={{
                        objectFit: "cover",
                        width: "100%",
                        filter: "brightness(0.9) contrast(1.05)",
                        transition:
                          "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                        transformOrigin: "center center",
                        "&:hover": {
                          transform: "scale(1.04)",
                        },
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 2,
                        color: "white",
                        background:
                          "linear-gradient(to top, rgba(0, 40, 35, 0.95) 0%, transparent 120%)",
                        padding: "24px",
                        pt: "48px",
                        pb: "32px",
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: "90%",
                          marginBottom: "8px",
                          padding: "8px 12px",
                          background: "rgba(255,255,255,0.15)",
                          backdropFilter: "blur(4px)",
                          borderRadius: "6px",
                          display: "inline-block",
                        }}
                      >
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: "#d0f0ed",
                          fontWeight: 600,
                          fontSize: "1.25rem",
                          mb: 2,
                          textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                        }}
                      >
                        <LocalOfferIcon
                          fontSize="medium"
                          sx={{
                            color: "#80deea",
                            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                          }}
                        />
                        Giảm {deal.discountPercent}%
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <Chip
                          label="DEAL SỐC"
                          size="medium"
                          sx={{
                            bgcolor: "#007160",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                            px: 1.5,
                            py: 1,
                            boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
                            borderRadius: "6px",
                            "& .MuiChip-label": {
                              paddingLeft: "6px",
                              paddingRight: "6px",
                            },
                          }}
                        />
                        <Chip
                          label={`⏳ ${formatDate(deal.endTime)} KẾT THÚC`}
                          size="medium"
                          sx={{
                            bgcolor: "#4fb3bf",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                            px: 1.5,
                            py: 1,
                            boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
                            borderRadius: "6px",
                            "& .MuiChip-label": {
                              paddingLeft: "6px",
                              paddingRight: "6px",
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Slider>

              {/* Custom arrows */}
              <IconButton
                onClick={handlePrevDeal}
                sx={{
                  position: "absolute",
                  left: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 3,
                  color: "white",
                  backgroundColor: "rgba(0, 113, 96, 0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 80, 70, 0.9)",
                    transform: "translateY(-50%) scale(1.1)",
                  },
                  width: 44,
                  height: 44,
                  display: { xs: "none", md: "flex" },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <ChevronLeft fontSize="medium" />
              </IconButton>

              <IconButton
                onClick={handleNextDeal}
                sx={{
                  position: "absolute",
                  right: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 3,
                  color: "white",
                  backgroundColor: "rgba(0, 113, 96, 0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 80, 70, 0.9)",
                    transform: "translateY(-50%) scale(1.1)",
                  },
                  width: 44,
                  height: 44,
                  display: { xs: "none", md: "flex" },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <ChevronRight fontSize="medium" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        {/* Top 3 Sale Products - Bottom Section */}
        <Grid
          item
          xs={12}
          sx={{
            width: "90%", // Tăng từ 70% lên 90%
            maxWidth: 1000, // Tăng từ 1000 lên 1200
            margin: "0 auto",
            px: 2,
          }}
          container
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="text.secondary"
            gutterBottom
            sx={{
              textAlign: "center",
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: "2rem", // Tăng cỡ chữ từ 1.5rem lên 2rem
              letterSpacing: "1px", // Tăng giãn cách chữ
              mt: 9,
              mb: 4, // Thêm margin bottom
            }}
          >
            Top 3 sản phẩm giảm giá
          </Typography>
          <Divider sx={{ mb: 4 }} /> {/* Tăng margin bottom */}
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            {" "}
            {/* Tăng spacing từ 3 lên 4 */}
            {topProduct?.map((product) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={product.productId}
                sx={{ display: "flex" }}
                onClick={() => {
                  navigate("/product-detail", {
                    state: { productId: product.productId },
                  });
                }}
              >
                <ProductCard
                  sx={{
                    cursor: "pointer",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    fontFamily: '"Times New Roman", Times, serif', // Thêm font chung
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 3,
                      backgroundColor: "#f9f9f9",
                      minHeight: 350,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={
                        "http://localhost:8080/image/product/" +
                        product.thumbnail
                      }
                      alt={product.productName}
                      sx={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                        maxHeight: 320,
                        mixBlendMode: "multiply",
                      }}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      flexGrow: 0,
                      p: 3,
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontWeight: "bold",
                        minHeight: "72px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "1.25rem",
                        fontFamily: '"Times New Roman", Times, serif', // Times New Roman
                      }}
                    >
                      {product.productName}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 3,
                        flexWrap: "wrap",
                        fontFamily: '"Times New Roman", Times, serif', // Times New Roman
                      }}
                    >
                      {product.price > product.sellPrice && (
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          sx={{
                            textDecoration: "line-through",
                            mr: 2,
                            fontFamily: '"Times New Roman", Times, serif', // Times New Roman
                          }}
                        >
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(product.price)}
                        </Typography>
                      )}

                      <Typography
                        variant="h4"
                        color="#00917b"
                        fontWeight="bold"
                        sx={{
                          mr: 2,
                          fontFamily: '"Times New Roman", Times, serif', // Times New Roman
                        }}
                      >
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.sellPrice)}
                      </Typography>

                      {product.price > product.sellPrice && (
                        <Chip
                          label={`-${Math.round(
                            (1 - product.sellPrice / product.price) * 100
                          )}%`}
                          size="medium"
                          sx={{
                            ml: "auto",
                            bgcolor: "#ff5252",
                            color: "white",
                            fontSize: "0.9rem",
                            height: "28px",
                            fontWeight: "bold",
                            fontFamily: '"Times New Roman", Times, serif', // Times New Roman
                          }}
                        />
                      )}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 2,
                        color: "text.secondary",
                        fontFamily: '"Times New Roman", Times, serif', // Times New Roman
                      }}
                    >
                      <StarIcon
                        fontSize="medium"
                        sx={{ color: "#ffc107", mr: 1 }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          mr: 1.5,
                          fontSize: "1rem",
                          fontFamily: '"Times New Roman", Times, serif', // Times New Roman
                        }}
                      >
                        {product.rating || "4.5"}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "1rem",
                          fontFamily: '"Times New Roman", Times, serif', // Times New Roman
                        }}
                      >
                        • Đã bán {product.soldQuantity || "100+"}
                      </Typography>
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

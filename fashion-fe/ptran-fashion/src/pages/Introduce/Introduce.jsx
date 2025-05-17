import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Chip,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Hidden,
} from "@mui/material";
import {
  Store,
  Groups,
  Stars,
  LocalShipping,
  SupportAgent,
  Phone,
  Schedule,
  LocationOn,
  CheckCircle,
  ExpandMore,
  Favorite,
  Redeem,
  Loyalty,
  Instagram,
  Facebook,
  Twitter,
  YouTube,
  Email,
  Category,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/Header";
import "./Introduce.css";
// Tạo theme tùy chỉnh


const faqList = [
  {
    question: "PTTran Fashion có cửa hàng offline không?",
    answer:
      "Hiện chúng tôi có 5 cửa hàng offline tại Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng và Cần Thơ. Bạn có thể xem địa chỉ chi tiết trong phần Liên hệ.",
  },
  {
    question: "Thời gian giao hàng như thế nào?",
    answer:
      "Đối với khu vực nội thành Hà Nội và TP.HCM: giao hàng trong 24h. Các tỉnh thành khác: 2-4 ngày làm việc tùy khu vực.",
  },
  {
    question: "Chính sách đổi trả hàng như thế nào?",
    answer:
      "Chúng tôi chấp nhận đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm bị lỗi hoặc không đúng mô tả. Sản phẩm phải còn nguyên tag, chưa qua sử dụng và giữ nguyên tình trạng ban đầu.",
  },
  {
    question: "Có được thử đồ khi mua online không?",
    answer:
      "Khi nhận hàng, bạn có thể thử đồ và kiểm tra chất lượng. Nếu không vừa hoặc không ưng ý, bạn có thể từ chối nhận hàng và được hoàn tiền 100%.",
  },
  {
    question: "Làm sao để trở thành khách hàng thân thiết?",
    answer:
      "Khi tích lũy mua hàng từ 5 triệu đồng, bạn sẽ tự động trở thành khách hàng thân thiết và nhận được nhiều ưu đãi đặc biệt.",
  },
];
const theme = createTheme({
  palette: {
    primary: {
      main: "#1a1a1a", // Rich black
    },
    secondary: {
      main: "#d4af37", // Gold
    },
    background: {
      default: "#f8f8f8", // Off-white
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontSize: "3.5rem",
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontSize: "2.8rem",
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontSize: "2.2rem",
      fontWeight: 600,
    },
    button: {
      textTransform: "uppercase",
      fontWeight: 500,
      letterSpacing: "1px",
    },
  },
});

const Introduce = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Quay lại trang trước
  };
  return (
    <ThemeProvider theme={theme}>
      <Header></Header>

      {/* Hero Section */}
      <Box
  sx={{
    bgcolor: "primary.main",
    color: "primary.contrastText",
    py: 12,
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "100px",
      background:
        "linear-gradient(to bottom right, transparent 49%, white 50%)",
    },
  }}
>
  <Container maxWidth="xl">
    <Grid container alignItems="center" spacing={6}>
      <Grid item xs={12} md={6}>
        <Chip
          label="Thương hiệu thời trang hàng đầu"
          color="secondary"
          sx={{
            mb: 3,
            fontSize: "1rem",
            padding: "8px 16px",
            fontWeight: "bold",
            borderRadius: 0, // Vuông góc
          }}
        />
        <Typography
          variant="h1"
          gutterBottom
          sx={{ fontWeight: 700, letterSpacing: -1 }}
        >
          PTTran Fashion
        </Typography>
        <Typography
          variant="h5"
          sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}
        >
          Phong cách của bạn – Diện mạo của thời đại
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              color: "primary.main",
              fontWeight: "bold",
              borderRadius: 0, // Vuông góc
              boxShadow: "none",
              textTransform: "uppercase",
            }}
            onClick={() => navigate(`/`)}
          >
            Khám phá ngay
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderColor: "primary.contrastText",
              color: "primary.contrastText",
              borderRadius: 0, // Vuông góc
              fontWeight: "bold",
              textTransform: "uppercase",
              "&:hover": {
                borderColor: "white",
              },
            }}
            onClick={() => {navigate(`/contact`)}}
          >
            Liên hệ
          </Button>
        </Box>
      </Grid>

      <Hidden mdDown>
        <Grid item md={6}>
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="PTTran Fashion"
            sx={{
              width: "100%",
              boxShadow: 6,
              transform: "rotate(3deg)",
              border: "8px solid rgba(255,255,255,0.2)",
              borderRadius: 0, // Vuông góc
            }}
          />
        </Grid>
      </Hidden>
    </Grid>
  </Container>
</Box>


      {/* Giới thiệu tổng quan */}
      <Box
        sx={{
          py: 15,
          bgcolor: "#fafafa",
          backgroundImage:
            "linear-gradient(to bottom right, #ffffff 0%, #f5f5f5 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h1"
            align="center"
            gutterBottom
            sx={{
              mb: 10,
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: -15,
                left: "50%",
                transform: "translateX(-50%)",
                width: "120px",
                height: "4px",
                bgcolor: "#008772",
              },
            }}
          >
            <Box
              component="span"
              sx={{
                color: "#008772",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              Về chúng tôi
            </Box>
          </Typography>

          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: "#2a2a2a",
                  fontFamily: "'Playfair Display', serif",
                  mb: 5,
                }}
              >
                Hành trình của Phương Trân
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontSize: "1.15rem",
                  lineHeight: 1.8,
                  color: "#555555",
                  maxWidth: "90%",
                }}
              >
                Từ một sinh viên ngành Y với ước mơ thời trang, tôi - Phương
                Trân đã xây dựng thương hiệu từ những thiết kế đầu tiên trong
                căn phòng ký túc xá. Mỗi sản phẩm là sự kết hợp giữa tính thẩm
                mỹ y khoa và nghệ thuật may mặc.
              </Typography>

              <Grid container spacing={4} sx={{ mt: 6 }}>
                {[
                  { value: "50,000+", label: "Khách hàng" },
                  { value: "5", label: "Cửa hàng" },
                  { value: "100%", label: "Hài lòng" },
                ].map((item, index) => (
                  <Grid item xs={4} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        textAlign: "center",
                        borderRadius: 2,
                        bgcolor: "rgba(0, 135, 114, 0.08)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          bgcolor: "rgba(0, 135, 114, 0.12)",
                        },
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          color: "#008772",
                          mb: 1,
                        }}
                      >
                        {item.value}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666666",
                          fontWeight: 500,
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box
                sx={{
                  position: "relative",
                  maxWidth: { xs: "80%", md: "65%" },
                  margin: "0 auto",
                  textAlign: "center",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    width: "calc(100% + 50px)",
                    height: "calc(100% + 50px)",
                    border: "3px solid rgba(0, 135, 114, 0.2)",
                    borderRadius: "12px",
                    top: 20,
                    left: 20,
                    zIndex: 0,
                    transition: "all 0.4s ease",
                  },
                  "&:hover:before": {
                    borderColor: "rgba(0, 135, 114, 0.4)",
                    transform: "translate(5px, 5px)",
                  },
                }}
              >
                {/* Avatar Frame */}
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 25px 50px -12px rgba(0, 135, 114, 0.25)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 35px 60px -15px rgba(0, 135, 114, 0.3)",
                    },
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.1) 100%)",
                      zIndex: 1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      width: "100%",
                      height: { xs: 320, md: 420 },
                      objectFit: "cover",
                      objectPosition: "top center",
                      filter: "brightness(0.98) contrast(1.05)",
                      transition: "transform 0.5s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                      },
                    }}
                    src="https://anhgaixinh.vn/wp-content/uploads/2022/08/7_hinh-gai-xinh-cute-de-thuong-nhat-viet-nam.jpg"
                    alt="Phương Trân - Nhà sáng lập"
                  />
                </Box>

                {/* Caption */}
                <Box sx={{ mt: 4, px: 2 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      color: "#008772",
                      letterSpacing: "0.05em",
                      position: "relative",
                      display: "inline-block",
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: -10,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "40%",
                        height: 2,
                        bgcolor: "#d4af37",
                        borderRadius: 2,
                        transition: "width 0.3s ease",
                      },
                      "&:hover:after": {
                        width: "60%",
                      },
                    }}
                  >
                    Phương Trân
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 2.5,
                      color: "#555",
                      fontSize: "1.15rem",
                      fontStyle: "italic",
                      fontWeight: 500,
                      letterSpacing: "0.03em",
                      maxWidth: "80%",
                      margin: "0 auto",
                      position: "relative",
                      "&:before": {
                        content: '"\\201C"',
                        position: "absolute",
                        left: -15,
                        top: -5,
                        fontSize: "2.5rem",
                        color: "rgba(0, 135, 114, 0.2)",
                        fontFamily: "serif",
                      },
                      "&:after": {
                        content: '"\\201D"',
                        position: "absolute",
                        right: -15,
                        bottom: -15,
                        fontSize: "2.5rem",
                        color: "rgba(0, 135, 114, 0.2)",
                        fontFamily: "serif",
                      },
                    }}
                  >
                    Nhà sáng lập & Creative Director
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Sản phẩm chính */}
      <Box sx={{ py: 10, bgcolor: "white" }}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            color="primary"
            sx={{ mb: 8 }}
          >
            <Box
              component="span"
              sx={{ borderBottom: "4px solid #007160", pb: 1 }}
            >
              Dòng sản phẩm chính
            </Box>
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                CategoryId: 1,
                title: "Thời trang nam",
                description:
                  "Phong cách trẻ trung, lịch lãm dành cho phái mạnh",
                image:
                  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              },
              {
                CategoryId: 2,
                title: "Thời trang nữ",
                description: "Thanh lịch, quyến rũ và cực kỳ thoải mái",
                image:
                  "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              },
              {
                CategoryId: 3,
                title: "Đồ đôi",
                description: "Sự đáng yêu và đẹp đẽ của các cặp đ",
                image:
                  "https://vn-test-11.slatic.net/p/abd4961b2c594474f4c67b2e2a1be6d2.jpg",
              },
              {
                CategoryId: 4,
                title: "Phụ kiện",
                description:
                  "Hoàn thiện phong cách với các phụ kiện thời thượng",
                image:
                  "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              },
            ].map((item, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                onClick={() => {
                  navigate(`/product-page?categoryId=${item.CategoryId}`);
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    },
                    cursor: "pointer",
                  }}
                  className="luxury-card"
                >
                  <Box
                    component="img"
                    sx={{
                      width: "100%",
                      height: 250,
                      objectFit: "cover",
                    }}
                    src={item.image}
                    alt={item.title}
                    className="luxury-card-image"
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      className="luxury-heading"
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <Button
                      variant="text"
                      color="primary"
                      sx={{ mt: 2, fontWeight: "bold" }}
                    >
                      Xem thêm
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Sứ mệnh & Tầm nhìn */}
      <Box sx={{ py: 10, bgcolor: "background.default" }}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            color="primary"
            sx={{ mb: 8 }}
          >
            <Box
              component="span"
              sx={{ borderBottom: "4px solid #007160", pb: 1 }}
            >
              Sứ mệnh & Tầm nhìn
            </Box>
          </Typography>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 5,
                  height: "100%",
                  borderRadius: 4,
                  background:
                    "linear-gradient(135deg, #007160 0%, #00a884 100%)",
                  color: "white",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Stars sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    Sứ mệnh
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
                >
                  Chúng tôi cam kết mang đến cho khách hàng những trải nghiệm
                  mua sắm tuyệt vời nhất với các sản phẩm chất lượng, giá cả hợp
                  lý và dịch vụ chuyên nghiệp.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
                >
                  Mỗi sản phẩm của PTTran Fashion đều được chọn lọc kỹ lưỡng để
                  đảm bảo sự hài lòng tối đa cho khách hàng.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 5,
                  height: "100%",
                  borderRadius: 4,
                  background:
                    "linear-gradient(135deg, #005a4c 0%, #007160 100%)",
                  color: "white",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Store sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h3" sx={{ fontWeight: 600 }}>
                    Tầm nhìn
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
                >
                  Đến năm 2025, PTTran Fashion phấn đấu trở thành thương hiệu
                  thời trang được yêu thích nhất trong phân khúc bình dân tại
                  Việt Nam.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
                >
                  Mục tiêu mở rộng hệ thống lên 20 cửa hàng trên toàn quốc và
                  phát triển thương hiệu ra thị trường quốc tế.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Cam kết chất lượng */}
      <Box sx={{ py: 10, bgcolor: "white" }}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            color="primary"
            sx={{ mb: 8 }}
          >
            <Box
              component="span"
              sx={{ borderBottom: "4px solid #007160", pb: 1 }}
            >
              Cam kết của chúng tôi
            </Box>
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <CheckCircle fontSize="large" />,
                title: "Chất lượng đảm bảo",
                description:
                  "Sản phẩm được kiểm duyệt nghiêm ngặt trước khi đến tay khách hàng",
              },
              {
                icon: <LocalShipping fontSize="large" />,
                title: "Giao hàng nhanh",
                description:
                  "Miễn phí vận chuyển cho đơn hàng từ 500k, giao hàng trong 24h tại Hà Nội & TP.HCM",
              },
              {
                icon: <SupportAgent fontSize="large" />,
                title: "Hỗ trợ 24/7",
                description:
                  "Đội ngũ tư vấn luôn sẵn sàng hỗ trợ mọi thắc mắc của khách hàng",
              },
              {
                icon: <Redeem fontSize="large" />,
                title: "Đổi trả dễ dàng",
                description:
                  "Đổi trả trong vòng 7 ngày nếu sản phẩm không đúng mô tả hoặc lỗi từ nhà sản xuất",
              },
              {
                icon: <Favorite fontSize="large" />,
                title: "Khách hàng là trung tâm",
                description:
                  "Mọi quyết định đều hướng đến trải nghiệm và lợi ích của khách hàng",
              },
              {
                icon: <Loyalty fontSize="large" />,
                title: "Ưu đãi thường xuyên",
                description:
                  "Nhiều chương trình khuyến mãi, ưu đãi dành cho khách hàng thân thiết",
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 5px 15px rgba(0,113,96,0.1)",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        mr: 3,
                        width: 60,
                        height: 60,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1">{item.description}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Câu hỏi thường gặp */}
     <Box sx={{ py: 10, bgcolor: "#ffffff" }}>
  <Container maxWidth="md">
    <Typography
      variant="h2"
      align="center"
      gutterBottom
      color="primary"
      sx={{ mb: 8, fontWeight: "bold", color: "#007160" }}
    >
      <Box
        component="span"
        sx={{
          borderBottom: "4px solid #007160",
          pb: 1,
        }}
      >
        Câu hỏi thường gặp
      </Box>
    </Typography>

    {faqList.map((item, index) => (
      <Accordion
        key={index}
        sx={{
          mb: 2,
          borderRadius: 0, // Góc vuông
          boxShadow: "0 4px 12px rgba(0, 113, 96, 0.15)", // Shadow tone xanh sang
          border: "1px solid #007160",
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: "#007160" }} />}
          sx={{
            bgcolor: "#ffffff",
            color: "#007160",
            borderRadius: 0,
            fontWeight: "bold",
            "&.Mui-expanded": {
              bgcolor: "#007160",
              color: "#ffffff",
              borderBottom: "1px solid #004d3f",
            },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {item.question}
          </Typography>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            bgcolor: "#f9f9f9",
            borderTop: "1px solid #e0e0e0",
            px: 3,
            py: 2,
            color: "#333",
          }}
        >
          <Typography sx={{ lineHeight: 1.7 }}>{item.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    ))}
  </Container>
</Box>


      {/* Đội ngũ */}
      {/* Đội ngũ - Phiên bản cao cấp */}
      <Box
        sx={{
          py: 10,
          bgcolor: "white",
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(0, 113, 96, 0.03) 0%, rgba(255,255,255,1) 100%)",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              mb: 8,
              color: "#007160",
              position: "relative",
              display: "inline-block",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "4px",
                bgcolor: "#d4af37",
                borderRadius: 2,
              },
            }}
          >
            Đội Ngũ Tinh Hoa
          </Typography>

          <Grid container spacing={6}>
            {[
              {
                name: "Trần Văn A",
                position: "Giám đốc điều hành",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                quote:
                  "Chúng tôi không bán quần áo, chúng tôi bán phong cách sống",
              },
              {
                name: "Nguyễn Thị B",
                position: "Trưởng phòng thiết kế",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                quote:
                  "Mỗi thiết kế là một câu chuyện, và tôi muốn kể câu chuyện của bạn",
              },
              {
                name: "Lê Văn C",
                position: "Trưởng phòng kinh doanh",
                image: "https://randomuser.me/api/portraits/men/75.jpg",
                quote: "Khách hàng hài lòng là ưu tiên số một của chúng tôi",
              },
              {
                name: "Phạm Thị D",
                position: "Chuyên viên tư vấn",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                quote:
                  "Tôi luôn lắng nghe để hiểu và đáp ứng tốt nhất nhu cầu của khách hàng",
              },
            ].map((person, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    p: 4,
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0, 113, 96, 0.1)",
                    transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 15px 40px rgba(0, 113, 96, 0.2)",
                      "& .luxury-avatar": {
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 25px rgba(0, 113, 96, 0.3)",
                      },
                    },
                  }}
                >
                  <Avatar
                    src={person.image}
                    sx={{
                      width: 160,
                      height: 160,
                      mx: "auto",
                      mb: 3,
                      border: "4px solid #007160",
                      boxShadow: "0 5px 15px rgba(0, 113, 96, 0.2)",
                      transition: "all 0.4s ease",
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        top: -8,
                        left: -8,
                        right: -8,
                        bottom: -8,
                        border: "2px solid rgba(0, 113, 96, 0.1)",
                        borderRadius: "50%",
                      },
                    }}
                    className="luxury-avatar"
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: "#007160",
                      letterSpacing: "0.5px",
                      mt: 2,
                    }}
                  >
                    {person.name}
                  </Typography>
                  <Chip
                    label={person.position}
                    sx={{
                      mb: 3,
                      bgcolor: "rgba(0, 113, 96, 0.1)",
                      color: "#007160",
                      fontWeight: 500,
                      fontSize: "0.9rem",
                      height: "28px",
                      "& .MuiChip-label": {
                        px: 1.5,
                      },
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontStyle: "italic",
                      color: "#555",
                      position: "relative",
                      px: 2,
                      "&:before": {
                        content: '"\\201C"',
                        position: "absolute",
                        left: 0,
                        top: -15,
                        fontSize: "3rem",
                        color: "rgba(0, 113, 96, 0.1)",
                        fontFamily: "serif",
                        lineHeight: 1,
                      },
                      "&:after": {
                        content: '"\\201D"',
                        position: "absolute",
                        right: 0,
                        bottom: -25,
                        fontSize: "3rem",
                        color: "rgba(0, 113, 96, 0.1)",
                        fontFamily: "serif",
                        lineHeight: 1,
                      },
                    }}
                  >
                    {person.quote}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Khách hàng nói gì */}
      <Box sx={{ py: 10, bgcolor: "background.default" }}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            color="primary"
            sx={{ mb: 8 }}
          >
            <Box
              component="span"
              sx={{ borderBottom: "4px solid #007160", pb: 1 }}
            >
              Khách hàng nói gì về chúng tôi
            </Box>
          </Typography>

          <Grid container spacing={4}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} md={6} key={item}>
                <Card
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    height: "100%",
                    bgcolor: "white",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                  }}
                >
                  <Box sx={{ display: "flex", mb: 3 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Stars key={star} color="primary" />
                    ))}
                  </Box>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ fontSize: "1.1rem", fontStyle: "italic" }}
                  >
                    "Tôi rất hài lòng với chất lượng sản phẩm của PTTran
                    Fashion. Quần áo mặc rất thoải mái và hợp thời trang. Dịch
                    vụ chăm sóc khách hàng cũng rất tuyệt vời!"
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                    <Avatar
                      src={`https://randomuser.me/api/portraits/${
                        item % 2 === 0 ? "women" : "men"
                      }/${item}0.jpg`}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Khách hàng {item}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Thành viên từ 202{item}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Liên hệ */}
      <Box sx={{ py: 10, bgcolor: "#ffffff" }}>
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              mb: 8,
              fontWeight: "bold",
              color: "#007160",
            }}
          >
            <Box
              component="span"
              sx={{
                borderBottom: "4px solid #007160",
                pb: 1,
              }}
            >
              Liên hệ với chúng tôi
            </Box>
          </Typography>

          <Grid container spacing={6} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: 400,
                  objectFit: "cover",
                  borderRadius: 0,
                  boxShadow: "0 8px 24px rgba(0,113,96,0.2)",
                }}
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Cửa hàng PTTran"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 5,
                  border: "1px solid #e0e0e0",
                  borderRadius: 0,
                  height: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: 600, color: "#007160", mb: 4 }}
                >
                  Thông tin liên hệ
                </Typography>

                <List sx={{ px: 0 }}>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: "#007160" }}>
                      <LocationOn sx={{ fontSize: 30 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Địa chỉ"
                      secondary="Xã Bình An, Huyện Thăng Bình, Tỉnh Quảng Nam"
                      secondaryTypographyProps={{ sx: { fontSize: "1.1rem", color: "#333" } }}
                    />
                  </ListItem>

                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: "#007160" }}>
                      <Phone sx={{ fontSize: 30 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Hotline"
                      secondary="0654213878"
                      secondaryTypographyProps={{ sx: { fontSize: "1.1rem", color: "#333" } }}
                    />
                  </ListItem>

                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: "#007160" }}>
                      <Email sx={{ fontSize: 30 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary="letgo@pttranfashion.com"
                      secondaryTypographyProps={{ sx: { fontSize: "1.1rem", color: "#333" } }}
                    />
                  </ListItem>

                  <ListItem disableGutters>
                    <ListItemIcon sx={{ color: "#007160" }}>
                      <Schedule sx={{ fontSize: 30 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Giờ làm việc"
                      secondary="8:30 - 21:30 hàng ngày"
                      secondaryTypographyProps={{ sx: { fontSize: "1.1rem", color: "#333" } }}
                    />
                  </ListItem>
                </List>

                <Box sx={{ mt: 5 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600, color: "#007160" }}
                  >
                    Theo dõi chúng tôi
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                    {[
                      { icon: <Facebook />, color: "#3b5998" },
                      { icon: <Instagram />, color: "#e1306c" },
                      { icon: <Twitter />, color: "#1da1f2" },
                      { icon: <YouTube />, color: "#ff0000" },
                    ].map((social, index) => (
                      <Avatar
                        key={index}
                        sx={{
                          bgcolor: social.color,
                          color: "white",
                          width: 40,
                          height: 40,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.1)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          },
                        }}
                      >
                        {social.icon}
                      </Avatar>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          py: 10,
          bgcolor: "primary.main",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Sẵn sàng trải nghiệm PTTran Fashion?
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Đăng ký ngay để nhận ưu đãi 10% cho đơn hàng đầu tiên
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: "primary.main",
            }}
            onClick={() => {navigate(`/register`)}}
          >
            Đăng ký ngay
          </Button>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Introduce;

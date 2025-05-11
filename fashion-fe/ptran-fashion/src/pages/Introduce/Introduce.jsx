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
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/Header";

// Tạo theme tùy chỉnh
const theme = createTheme({
  palette: {
    primary: {
      main: "#007160",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f5f5f5",
    },
    background: {
      default: "#f9f9f9",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2.8rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "2.2rem",
      fontWeight: 600,
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
                }}
              />
              <Typography variant="h1" gutterBottom>
                PTTran Fashion
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Phong cách của bạn - Diện mạo của thời đại
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
                  }}
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
                    "&:hover": {
                      borderColor: "primary.contrastText",
                    },
                  }}
                >
                  Liên hệ
                </Button>
              </Box>
            </Grid>
            <Hidden mdDown>
              <Grid item md={6}>
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    borderRadius: 4,
                    boxShadow: 6,
                    transform: "rotate(3deg)",
                    border: "8px solid rgba(255,255,255,0.2)",
                  }}
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="PTTran Fashion"
                />
              </Grid>
            </Hidden>
          </Grid>
        </Container>
      </Box>

      {/* Giới thiệu tổng quan */}
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
              Về chúng tôi
            </Box>
          </Typography>

          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                Câu chuyện PTTran Fashion
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
              >
                Ra đời từ năm 2020, PTTran Fashion bắt đầu từ một cửa hàng nhỏ
                tại Hà Nội với mong muốn mang đến những sản phẩm thời trang chất
                lượng với giá cả phải chăng. Chúng tôi tin rằng thời trang không
                chỉ là quần áo, mà còn là cách thể hiện cá tính và phong cách
                sống.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
              >
                Sau 3 năm phát triển, chúng tôi tự hào đã mở rộng hệ thống cửa
                hàng tại 5 thành phố lớn và phục vụ hơn 50.000 khách hàng trên
                toàn quốc.
              </Typography>

              <Grid container spacing={2} sx={{ mt: 4 }}>
                {[
                  { value: "50,000+", label: "Khách hàng" },
                  { value: "5", label: "Cửa hàng" },
                  { value: "100%", label: "Hài lòng" },
                ].map((item, index) => (
                  <Grid item xs={4} key={index}>
                    <Paper
                      elevation={2}
                      sx={{ p: 3, textAlign: "center", borderRadius: 3 }}
                    >
                      <Typography
                        variant="h4"
                        color="primary"
                        sx={{ fontWeight: 700 }}
                      >
                        {item.value}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {item.label}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box
                component="img"
                sx={{
                  width: "100%",
                  borderRadius: 4,
                  boxShadow: 6,
                }}
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Lịch sử PTTran"
              />
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
                title: "Thời trang nam",
                description:
                  "Phong cách trẻ trung, lịch lãm dành cho phái mạnh",
                image:
                  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              },
              {
                title: "Thời trang nữ",
                description: "Thanh lịch, quyến rũ và cực kỳ thoải mái",
                image:
                  "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              },
              {
                title: "Thời trang trẻ em",
                description: "An toàn, thoải mái và đáng yêu cho bé",
                image:
                  "https://images.unsplash.com/photo-1604917018138-9fe1829a0b9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              },
              {
                title: "Phụ kiện",
                description:
                  "Hoàn thiện phong cách với các phụ kiện thời thượng",
                image:
                  "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    },
                  }}
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
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
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
      <Box sx={{ py: 10, bgcolor: "background.default" }}>
        <Container maxWidth="md">
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
              Câu hỏi thường gặp
            </Box>
          </Typography>

          {[
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
          ].map((item, index) => (
            <Accordion
              key={index}
              sx={{
                mb: 2,
                borderRadius: "8px !important",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore color="primary" />}
                sx={{
                  bgcolor: "white",
                  borderRadius: "8px",
                  "&.Mui-expanded": {
                    bgcolor: "primary.main",
                    color: "white",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ bgcolor: "white", borderTop: "1px solid #eee" }}
              >
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* Đội ngũ */}
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
              Đội ngũ của chúng tôi
            </Box>
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
                    p: 3,
                    borderRadius: 3,
                    boxShadow: "0 5px 15px rgba(0,113,96,0.1)",
                  }}
                >
                  <Avatar
                    src={person.image}
                    sx={{
                      width: 150,
                      height: 150,
                      mx: "auto",
                      mb: 3,
                      border: "4px solid #007160",
                    }}
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {person.name}
                  </Typography>
                  <Chip
                    label={person.position}
                    color="primary"
                    sx={{ mb: 3 }}
                  />
                  <Typography
                    variant="body1"
                    fontStyle="italic"
                    color="text.secondary"
                  >
                    "{person.quote}"
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
              Liên hệ với chúng tôi
            </Box>
          </Typography>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: 400,
                  objectFit: "cover",
                  borderRadius: 4,
                  boxShadow: 3,
                }}
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Cửa hàng PTTran"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{ p: 5, borderRadius: 4, height: "100%" }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 4 }}
                >
                  Thông tin liên hệ
                </Typography>

                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <LocationOn color="primary" sx={{ fontSize: 30 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Địa chỉ"
                      secondary="123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"
                      secondaryTypographyProps={{ sx: { fontSize: "1.1rem" } }}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Phone color="primary" sx={{ fontSize: 30 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Hotline"
                      secondary="1900 123 456"
                      secondaryTypographyProps={{ sx: { fontSize: "1.1rem" } }}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Email color="primary" sx={{ fontSize: 30 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary="info@pttranfashion.com"
                      secondaryTypographyProps={{ sx: { fontSize: "1.1rem" } }}
                    />
                  </ListItem>

                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Schedule color="primary" sx={{ fontSize: 30 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Giờ làm việc"
                      secondary="8:30 - 21:30 hàng ngày"
                      secondaryTypographyProps={{ sx: { fontSize: "1.1rem" } }}
                    />
                  </ListItem>
                </List>

                <Box sx={{ mt: 4 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Theo dõi chúng tôi
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
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
                          "&:hover": {
                            transform: "scale(1.1)",
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

      {/* CTA cuối trang */}
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
          >
            Đăng ký ngay
          </Button>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Introduce;

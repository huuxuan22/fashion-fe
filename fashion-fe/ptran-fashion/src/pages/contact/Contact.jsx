import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Divider,
  Link,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  LocationOn,
  Phone,
  Email,
  Schedule,
  Reply,
  Send,
  Facebook,
  Twitter,
  Instagram,
  YouTube,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../../layout/Header";

// Custom theme with Times New Roman and serif fonts
const theme = createTheme({
  typography: {
    fontFamily: '"Times New Roman", Times, serif',
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
      fontFamily: '"Times New Roman", Times, serif',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.25px",
      fontFamily: '"Times New Roman", Times, serif',
    },
    subtitle1: {
      fontWeight: 500,
      fontFamily: '"Times New Roman", Times, serif',
    },
    body1: {
      fontFamily: '"Times New Roman", Times, serif',
    },
    body2: {
      fontFamily: '"Times New Roman", Times, serif',
    },
    button: {
      fontFamily: '"Times New Roman", Times, serif',
      textTransform: "none", // Keep button text in normal case
    },
  },
  palette: {
    primary: {
      main: "#039278",
      light: "#4ac3aa",
      dark: "#00644a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff7d00",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f9fbfa",
      paper: "#ffffff",
    },
    text: {
      primary: "#2d3748",
      secondary: "#718096",
    },
  },
  shape: {
    borderRadius: 6, // Slightly squared corners
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            fontFamily: '"Times New Roman", Times, serif',
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: 4, // More squared corners for inputs
            "& fieldset": {
              borderColor: "#e2e8f0",
              borderWidth: 2,
            },
            "&:hover fieldset": {
              borderColor: "#cbd5e0",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#039278",
              boxShadow: "0 0 0 3px rgba(3, 146, 120, 0.1)",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4, // More squared button
          letterSpacing: "0.5px",
        },
      },
    },
  },
});

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  border: "1px solid",
  borderColor: theme.palette.divider,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  backgroundColor: theme.palette.background.paper,
}));

const ContactCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[50],
  border: "1px solid",
  borderColor: theme.palette.divider,
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: "rgba(3, 146, 120, 0.03)",
  },
}));

const ContactIcon = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  marginRight: theme.spacing(2),
  width: 44,
  height: 44,
  borderRadius: 4, // Squared icon container
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  fontSize: "1rem",
  borderRadius: 4,
  boxShadow: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(1.5),
  borderRadius: 4,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: "relative",
  paddingBottom: theme.spacing(2),
  marginBottom: theme.spacing(4),
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "50px",
    height: "3px",
    backgroundColor: theme.palette.primary.main,
  },
}));

const MapContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  width: "100%",
  "& .map-wrapper": {
    height: "450px",
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    border: "1px solid",
    borderColor: theme.palette.divider,
    boxShadow: theme.shadows[1],
  },
}));

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      contact: "",
      message: "",
    });
  };

  return (
    <div>
      <Header></Header>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100vh",
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
            >
            </Typography>

            <Grid container spacing={4}>
              {/* Contact Information */}
              <Grid item xs={12} md={5}>
                <StyledPaper>
                  <SectionTitle variant="h5" component="h2">
                    Thông Tin Liên Hệ
                  </SectionTitle>

                  <ContactCard>
                    <ContactIcon>
                      <LocationOn fontSize="small" />
                    </ContactIcon>
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                        Địa chỉ cửa hàng
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        123 Đường ABC, Quận 1, TP.HCM
                      </Typography>
                    </Box>
                  </ContactCard>

                  <ContactCard>
                    <ContactIcon>
                      <Phone fontSize="small" />
                    </ContactIcon>
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                        Số điện thoại
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        0901 234 567 (Hotline/Zalo/Viber)
                      </Typography>
                    </Box>
                  </ContactCard>

                  <ContactCard>
                    <ContactIcon>
                      <Email fontSize="small" />
                    </ContactIcon>
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                        Email hỗ trợ
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        support@example.com
                      </Typography>
                    </Box>
                  </ContactCard>

                  <ContactCard>
                    <ContactIcon>
                      <Schedule fontSize="small" />
                    </ContactIcon>
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                        Giờ làm việc
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Thứ 2 - Thứ 7: 8h00 - 17h00
                      </Typography>
                    </Box>
                  </ContactCard>

                  <Divider sx={{ my: 3, borderColor: "divider" }} />

                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    Kênh mạng xã hội
                  </Typography>
                  <Box sx={{ display: "flex", mt: 2 }}>
                    <SocialButton aria-label="Facebook">
                      <Facebook fontSize="small" />
                    </SocialButton>
                    <SocialButton aria-label="Twitter">
                      <Twitter fontSize="small" />
                    </SocialButton>
                    <SocialButton aria-label="Instagram">
                      <Instagram fontSize="small" />
                    </SocialButton>
                    <SocialButton aria-label="YouTube">
                      <YouTube fontSize="small" />
                    </SocialButton>
                  </Box>

                  <Box sx={{ mt: 4 }}>
                    <Link
                      href="#"
                      underline="hover"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "primary.main",
                        fontWeight: 500,
                        "&:hover": {
                          color: "primary.dark",
                        },
                      }}
                    >
                      <Reply sx={{ mr: 1, fontSize: "1.1rem" }} /> Chính sách
                      đổi trả, hoàn tiền
                    </Link>
                  </Box>
                </StyledPaper>
              </Grid>

              {/* Contact Form */}
              <Grid item xs={12} md={7}>
                <StyledPaper>
                  <SectionTitle variant="h5" component="h2">
                    Gửi Tin Nhắn Cho Chúng Tôi
                  </SectionTitle>

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Họ tên"
                          variant="outlined"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email/Số điện thoại"
                          variant="outlined"
                          name="contact"
                          value={formData.contact}
                          onChange={handleChange}
                          required
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Nội dung tin nhắn"
                          variant="outlined"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          multiline
                          rows={6}
                        />
                      </Grid>

                      <Grid item xs={12} sx={{ textAlign: "right" }}>
                        <SubmitButton
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          endIcon={<Send sx={{ fontSize: "1.1rem" }} />}
                        >
                          Gửi Tin Nhắn
                        </SubmitButton>
                      </Grid>
                    </Grid>
                  </form>
                </StyledPaper>
              </Grid>
            </Grid>

            {/* Google Maps Section */}
            <MapContainer>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ fontWeight: 600, mt: 4 }}
              >
                Vị trí cửa hàng
              </Typography>
              <Box className="map-wrapper">
                <iframe
                  title="Store Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.126365377024!2d106.66001031526053!3d10.801834361948813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2sHo%20Chi%20Minh%20City%20University%20of%20Technology!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </Box>
            </MapContainer>
          </Container>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Contact;

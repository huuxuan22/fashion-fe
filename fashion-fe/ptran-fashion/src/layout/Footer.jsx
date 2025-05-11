import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Link,
  Divider,
  IconButton,
  TextField,
  Button,
  Container,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { Facebook, Instagram, Twitter, Pinterest, Email, LocalPhone, LocationOn } from "@mui/icons-material";

const Footer = () => {
  const [email, setEmail] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubscribe = () => {
    if (email) {
      alert(`Cảm ơn bạn đã đăng ký nhận tin với email ${email}!`);
      setEmail("");
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#ffffff",
        color: "#333",
        padding: isMobile ? "40px 20px" : "60px 0",
        marginTop: "auto",
        borderTop: "1px solid rgba(0, 0, 0, 0.05)"
      }}
    >
      <Container maxWidth="xl">
        {/* Top Section */}
        <Grid container spacing={isMobile ? 4 : 6} sx={{ mb: isMobile ? 4 : 6 }}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ 
                color: "#555",
                lineHeight: 1.6,
                mb: 2,
                fontStyle: "italic"
              }}>
                "Vẻ đẹp đến từ sự tinh tế trong từng chi tiết"
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {[
                  { icon: <Facebook />, color: "#3b5998" },
                  { icon: <Instagram />, color: "#E1306C" },
                  { icon: <Twitter />, color: "#1DA1F2" },
                  { icon: <Pinterest />, color: "#E60023" },
                ].map((social, index) => (
                  <IconButton 
                    key={index}
                    sx={{ 
                      color: social.color,
                      backgroundColor: "rgba(0,0,0,0.02)",
                      border: "1px solid rgba(0,0,0,0.05)",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.05)"
                      }
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <LocalPhone sx={{ color: "#008b76", fontSize: "20px", mr: 1.5 }} />
              <Typography variant="body2" sx={{ color: "#555" }}>
                +84 123 456 789
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <LocationOn sx={{ color: "#008b76", fontSize: "20px", mr: 1.5, mt: 0.5 }} />
              <Typography variant="body2" sx={{ color: "#555" }}>
                123 Đường Thời Trang, Quận 1, TP.HCM
              </Typography>
            </Box>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={6} md={2}>
            <Typography 
              variant="subtitle1" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                color: "#008b76",
                mb: 3,
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: "40px",
                  height: "2px",
                  backgroundColor: "#008b76"
                }
              }}
            >
              Mua sắm
            </Typography>
            <Box component="ul" sx={{ 
              listStyle: "none", 
              padding: 0, 
              "& li": { 
                mb: 1.5,
                transition: "all 0.3s ease"
              } 
            }}>
              {[
                "Bộ sưu tập mới",
                "Sản phẩm bán chạy",
                "Ưu đãi đặc biệt",
                "Phụ kiện",
                "Quà tặng"
              ].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    underline="none" 
                    sx={{ 
                      color: "#555",
                      "&:hover": {
                        color: "#008b76",
                        paddingLeft: "8px"
                      }
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography 
              variant="subtitle1" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                color: "#008b76",
                mb: 3,
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: "40px",
                  height: "2px",
                  backgroundColor: "#008b76"
                }
              }}
            >
              Dịch vụ
            </Typography>
            <Box component="ul" sx={{ 
              listStyle: "none", 
              padding: 0, 
              "& li": { 
                mb: 1.5,
                transition: "all 0.3s ease"
              } 
            }}>
              {[
                "Theo dõi đơn hàng",
                "Hướng dẫn chọn size",
                "Chính sách đổi trả",
                "Câu hỏi thường gặp",
                "Liên hệ"
              ].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    underline="none" 
                    sx={{ 
                      color: "#555",
                      "&:hover": {
                        color: "#008b76",
                        paddingLeft: "8px"
                      }
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="subtitle1" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                color: "#008b76",
                mb: 3,
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: "40px",
                  height: "2px",
                  backgroundColor: "#008b76"
                }
              }}
            >
              Nhận bản tin
            </Typography>
            <Typography variant="body2" sx={{ 
              color: "#555",
              mb: 3,
              lineHeight: 1.6
            }}>
              Đăng ký để nhận thông tin mới nhất về bộ sưu tập và ưu đãi đặc biệt.
            </Typography>
            
            <Box sx={{ 
              display: "flex", 
              flexDirection: isMobile ? "column" : "row",
              gap: 2
            }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { 
                      borderColor: "#ddd",
                      borderRadius: "0"
                    },
                    "&:hover fieldset": { 
                      borderColor: "#008b76" 
                    },
                    "&.Mui-focused fieldset": { 
                      borderColor: "#008b76",
                      borderWidth: "1px"
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSubscribe}
                sx={{
                  backgroundColor: "#008b76",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#006b5a",
                  },
                  px: 4,
                  borderRadius: "0",
                  whiteSpace: "nowrap",
                  minWidth: isMobile ? "100%" : "auto"
                }}
              >
                Đăng ký
              </Button>
            </Box>

            <Box sx={{ 
              mt: 4,
              p: 3,
              backgroundColor: "#f9f9f7",
              borderLeft: "3px solid #008b76"
            }}>
              <Typography variant="body2" sx={{ 
                color: "#555",
                fontStyle: "italic",
                lineHeight: 1.6
              }}>
                "Mỗi bộ sưu tập của chúng tôi là một câu chuyện về sự tinh tế và đẳng cấp."
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Divider with decorative element */}
        <Box sx={{ 
          position: "relative",
          my: 6,
          "&:before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "1px",
            backgroundColor: "rgba(0, 0, 0, 0.08)",
            zIndex: 1
          }
        }}>
          <Box sx={{
            position: "relative",
            zIndex: 2,
            display: "inline-block",
            backgroundColor: "#fff",
            px: 2,
            mx: "auto",
            left: "50%",
            transform: "translateX(-50%)"
          }}>
            <Box sx={{ 
              width: "60px",
              height: "2px",
              backgroundColor: "#008b76",
              mx: "auto"
            }} />
          </Box>
        </Box>

        {/* Bottom Section */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: isMobile ? "center" : "left",
          gap: 2
        }}>
          <Typography variant="body2" sx={{ 
            color: "#777",
            order: isMobile ? 2 : 1
          }}>
            © {new Date().getFullYear()} Thương hiệu thời trang. Bảo lưu mọi quyền.
          </Typography>
          
          <Box sx={{ 
            display: "flex", 
            gap: 3,
            order: isMobile ? 1 : 2,
            mb: isMobile ? 2 : 0
          }}>
            <Link href="#" underline="none" sx={{ 
              color: "#555",
              "&:hover": {
                color: "#008b76"
              }
            }}>
              Điều khoản sử dụng
            </Link>
            <Link href="#" underline="none" sx={{ 
              color: "#555",
              "&:hover": {
                color: "#008b76"
              }
            }}>
              Chính sách bảo mật
            </Link>
            <Link href="#" underline="none" sx={{ 
              color: "#555",
              "&:hover": {
                color: "#008b76"
              }
            }}>
              Chính sách cookie
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
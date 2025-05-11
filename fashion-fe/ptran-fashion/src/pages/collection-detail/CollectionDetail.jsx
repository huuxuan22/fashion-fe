import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Container,
  IconButton,
  Button,
  Grid,
  Chip,
  Stack,
  Fab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowBack,
  Favorite,
  Share,
  ShoppingBag,
  RemoveRedEye,
} from "@mui/icons-material";
import Header from "./../../layout/Header";
import Footer from "./../../layout/Footer";
import * as adminService from "./../../service/admin-service";
import * as cartServiceRedux from "./../../redux/Cart/Action"
import { useDispatch } from "react-redux";
import SuccessNotification from "../../component/SuccessNotification";
const CollectionDetail = () => {
  const dispath = useDispatch()
  const navigate = useNavigate();
  const { state } = useLocation();
  const collection = state?.collection;
  const [collections, setCollections] = useState([]);
  const [liked, setLiked] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const token = localStorage.getItem("token");
  const [open,setOpen] = useState(false);
  const loadData = async () => {
    await adminService.getAllCollection(token).then((data) => {
      setCollections(data.data);
    });
  };
  const onClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    loadData();
  }, []);
  // Dummy data for demonstration
  const otherCollections = [
    {
      id: 1,
      name: "Bộ sưu tập Xuân 2024",
      imageUrl: "spring-collection.jpg",
      items: 15,
    },
    {
      id: 2,
      name: "Thời trang công sở",
      imageUrl: "office-style.jpg",
      items: 20,
    },
    {
      id: 3,
      name: "Dạo phố cuối tuần",
      imageUrl: "weekend-style.jpg",
      items: 12,
    },
  ];

  console.log("dữ liệu collection: ", collections);

  if (!collection) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 10 }}>
        <Typography variant="h6">Không tìm thấy bộ sưu tập</Typography>
      </Box>
    );
  }
  const handleAddToCart =async (product) => {
    await dispath(cartServiceRedux.addToCartProduct(token,product))
    setOpen(true);
  }

  return (
    <Box sx={{ bgcolor: "#f9f9f7", minHeight: "100vh" }}>
      {/* Floating Action Buttons */}
      <Header></Header>
      <Stack
        spacing={2}
        sx={{
          position: "fixed",
          right: 24,
          bottom: 24,
          zIndex: 1000,
          display: isMobile ? "none" : "block",
        }}
      >
        <Fab
          color="primary"
          onClick={() => setLiked(!liked)}
          sx={{
            backgroundColor: liked ? "#e53935" : "rgba(0,0,0,0.08)",
            "&:hover": {
              backgroundColor: liked ? "#c62828" : "rgba(0,0,0,0.12)",
            },
          }}
        >
          <Favorite sx={{ color: liked ? "#fff" : "#5f5f5f" }} />
        </Fab>
        <Fab
          color="primary"
          sx={{
            backgroundColor: "#008b76",
            "&:hover": {
              backgroundColor: "#006b5a",
            },
          }}
        >
          <Share sx={{ color: "#fff" }} />
        </Fab>
      </Stack>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: isMobile ? "50vh" : isTablet ? "60vh" : "70vh",
          mb: 8,
        }}
      >
        <CardMedia
          component="img"
          image={`http://localhost:8080/image/collection/${collection.imageUrl}`}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            filter: "brightness(0.9)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.5) 100%)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            p: isMobile ? 3 : 6,
            color: "white",
          }}
        >
          <Box sx={{ maxWidth: isMobile ? "100%" : "60%" }}>
            <IconButton
              sx={{
                position: "absolute",
                left: 16,
                top: 16,
                color: "white",
                backgroundColor: "rgba(0,0,0,0.2)",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.4)",
                },
              }}
              onClick={() => navigate(-1)}
            >
              <ArrowBack fontSize={isMobile ? "medium" : "large"} />
            </IconButton>

            <Typography
              variant={isMobile ? "h4" : "h2"}
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                mb: 2,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                fontSize: isMobile ? "2rem" : isTablet ? "3rem" : "3.5rem",
                lineHeight: 1.2,
              }}
            >
              {collection.name}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: isMobile ? "1rem" : "1.1rem",
                mb: 4,
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                opacity: 0.9,
              }}
            >
              {collection.description}
            </Typography>

            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              startIcon={<ShoppingBag />}
              sx={{
                backgroundColor: "#008b76",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#006b5a",
                },
                px: isMobile ? 4 : 6,
                py: isMobile ? 1 : 1.5,
                borderRadius: "0",
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontSize: isMobile ? "0.8rem" : "0.9rem",
              }}
            >
              Khám phá bộ sưu tập
            </Button>
          </Box>
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ px: isMobile ? 2 : 4, pb: 8 }}>
        {/* Collection Details */}
        <Box
          sx={{
            mb: 8,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#008b76",
                mb: 2,
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              Về bộ sưu tập
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#333",
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              Bộ sưu tập này được thiết kế với những đường cắt tinh tế, chất
              liệu cao cấp và phong cách hiện đại phù hợp với nhiều dịp khác
              nhau. Mỗi sản phẩm đều được chăm chút tỉ mỉ từ đường kim mũi chỉ
              đến chất liệu vải.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#333",
                lineHeight: 1.8,
              }}
            >
              Chúng tôi tự hào mang đến những thiết kế độc đáo, kết hợp giữa
              truyền thống và hiện đại, tạo nên phong cách riêng biệt cho người
              mặc.
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              backgroundColor: "#f0f0f0",
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#008b76",
                mb: 2,
                fontWeight: 600,
                letterSpacing: "1px",
              }}
            >
              Thông tin bộ sưu tập
            </Typography>
            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  fontWeight: 500,
                  minWidth: "120px",
                }}
              >
                Số sản phẩm:
              </Typography>
              <Typography variant="body1" sx={{ color: "#333" }}>
                {collection.productCollections.length} items
              </Typography>
            </Box>
            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  fontWeight: 500,
                  minWidth: "120px",
                }}
              >
                Chất liệu:
              </Typography>
              <Typography variant="body1" sx={{ color: "#333" }}>
                Lụa cao cấp, Cotton nhập khẩu
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  fontWeight: 500,
                  minWidth: "120px",
                }}
              >
                Phong cách:
              </Typography>
              <Typography variant="body1" sx={{ color: "#333" }}>
                Tối giản, Thanh lịch
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Products Grid */}
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{
            mb: isMobile ? 4 : 6,
            fontWeight: 600,
            position: "relative",
            fontFamily: '"Playfair Display", serif',
            color: "#333",
            "&:after": {
              content: '""',
              display: "block",
              width: "80px",
              height: "3px",
              bgcolor: "#008b76",
              margin: isMobile ? "12px 0 0" : "16px 0 0",
            },
          }}
        >
          Sản phẩm trong bộ sưu tập
        </Typography>

        <Grid
          container
          spacing={isMobile ? 2 : 4}
          sx={{ mb: isMobile ? 6 : 10 }}
        >
          {collection.productCollections.map((item, index) => (
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              lg={3}
              key={index}
              
            >
              <Card
                sx={{
                  position: "relative",
                  borderRadius: 0,
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "none",
                  border: "1px solid #eee",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box sx={{ position: "relative", flexGrow: 1 }} 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/product-detail', {state: {productId: item.product.productId}})
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`http://localhost:8080/image/product/${item.product.thumbnail}`}
                    sx={{
                      width: "100%",
                      height: isMobile ? "200px" : "300px",
                      objectFit: "cover",
                    }}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.9)",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,1)",
                        },
                      }}
                    >
                      <Favorite fontSize="small" sx={{ color: "#e53935" }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.9)",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,1)",
                        },
                      }}
                    >
                      <RemoveRedEye fontSize="small" sx={{ color: "#333" }} />
                    </IconButton>
                  </Box>
                </Box>

                <Box
                  sx={{
                    p: isMobile ? 1.5 : 2,
                    textAlign: "left",
                    bgcolor: "#fff",
                  }}
                >
                  <Typography
                    variant={isMobile ? "subtitle2" : "subtitle1"}
                    sx={{
                      fontWeight: 500,
                      mb: 1,
                      color: "#333",
                    }}
                  >
                    {item.product.productName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#008b76",
                      fontWeight: 600,
                      mb: 2,
                      fontSize: isMobile ? "0.9rem" : "1rem",
                    }}
                  >
                    {item.product.sellPrice.toLocaleString()}₫
                  </Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      borderColor: "#008b76",
                      color: "#008b76",
                      borderRadius: 0,
                      "&:hover": {
                        borderColor: "#006b5a",
                        backgroundColor: "rgba(0, 139, 118, 0.04)",
                      },
                      py: 0.8,
                      textTransform: "uppercase",
                      fontSize: isMobile ? "0.7rem" : "0.8rem",
                      letterSpacing: "1px",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleAddToCart(item.product)
                    }}
                  >
                    Thêm vào giỏ
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Other Collections */}
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{
            mb: isMobile ? 4 : 6,
            fontWeight: 600,
            position: "relative",
            fontFamily: '"Playfair Display", serif',
            color: "#333",
            "&:after": {
              content: '""',
              display: "block",
              width: "80px",
              height: "3px",
              bgcolor: "#008b76",
              margin: isMobile ? "12px 0 0" : "16px 0 0",
            },
          }}
        >
          Bộ sưu tập khác
        </Typography>

        <Grid
          container
          spacing={isMobile ? 2 : 4}
          sx={{ mb: isMobile ? 4 : 8 }}
        >
          {collections.map((collection) => (
            <Grid item xs={12} sm={6} md={4} key={collection.id}>
              <Card
                sx={{
                  position: "relative",
                  borderRadius: 0,
                  overflow: "hidden",
                  height: isMobile ? "250px" : "350px",
                  cursor: "pointer",
                  boxShadow: "none",
                  "&:hover": {
                    "& .collection-image": {
                      transform: "scale(1.03)",
                    },
                    "& .collection-overlay": {
                      opacity: 1,
                    },
                  },
                }}
                onClick={(e) => {
                e.preventDefault();
                console.log("đã vào đây");

                navigate(`/collection-detail`, { state: { collection: collection } });
              }}
              >
                <CardMedia
                  component="img"
                  image={`http://localhost:8080/image/collection/${collection.imageUrl}`}
                  className="collection-image"
                  sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />

                <Box
                  className="collection-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 139, 118, 0.85)",
                    opacity: 0,
                    transition: "opacity 0.3s ease-in-out",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "white",
                    p: isMobile ? 2 : 4,
                  }}
                >
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      fontFamily: '"Playfair Display", serif',
                    }}
                  >
                    {collection.name}
                  </Typography>
                  <Chip
                    label={`${collection.productCollections.length} sản phẩm`}
                    sx={{
                      backgroundColor: "white",
                      color: "#008b76",
                      fontWeight: 500,
                      height: "32px",
                      borderRadius: "0",
                      "& .MuiChip-label": {
                        px: 2,
                      },
                    }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      mt: 3,
                      borderColor: "white",
                      color: "white",
                      borderRadius: 0,
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderColor: "white",
                      },
                      px: 3,
                      py: 1,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Xem bộ sưu tập
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer></Footer>
      {open && (<SuccessNotification
        open={open}
        onClose={onClose}
        message={"thêm vào giỏ hàng thành công"}
      />)}
    </Box>
  );
};

export default CollectionDetail;

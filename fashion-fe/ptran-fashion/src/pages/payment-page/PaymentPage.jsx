import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  Collapse,
  MenuItem,
  Select,
  InputLabel,
  useTheme,
  CardMedia,
  keyframes,
  FormHelperText,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  ArrowBack,
  ArrowBackIos,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useWebSocket } from "../../hooks/useWebSocket";
import * as orderService from "./../../service/order-service"
/* Bạn có thể đặt trong App.css hoặc style.css */

const PaymentPage = () => {
  const location = useLocation();
  const order = location.state.order;
  const place = location.state.place;
  const cartIds = location.state.cartIds;
  console.log("Danh sách từ cart: ", place);
  console.log(" cart: ", cartIds);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const token = localStorage.getItem("token");
  const [totalPrice,setTotalPrice] = useState(0); 
  const navigate = useNavigate();
  // Lấy danh sách tỉnh/thành phố
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);
  // Hàm lấy thông tin tỉnh theo mã province code
  const fetchProvinceByCode = async (provinceCode) => {
    try {
      const response = await fetch(
        `https://provinces.open-api.vn/api/p/${provinceCode}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        code: data.code,
        name: data.name,
      };
    } catch (error) {
      console.error("Lỗi khi lấy thông tin tỉnh:", error);
      return null;
    }
  };

  // Lấy quận/huyện khi chọn tỉnh
  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts))
        .catch((error) => console.error("Error fetching districts:", error));
      setSelectedDistrict("");
      setWards([]);
    }
  }, [selectedProvince]);
  // Hàm lấy thông tin quận/huyện theo mã district code
  const fetchDistrictByCode = async (districtCode) => {
    try {
      const response = await fetch(
        `https://provinces.open-api.vn/api/d/${districtCode}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return {
        code: data.code,
        name: data.name,
      };
    } catch (error) {
      console.error("Lỗi khi lấy thông tin quận/huyện:", error);
      return null;
    }
  };

  // Lấy phường/xã khi chọn quận/huyện
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((res) => res.json())
        .then((data) => setWards(data.wards))
        .catch((error) => console.error("Error fetching wards:", error));
      setSelectedWard("");
    }
  }, [selectedDistrict]);

  const deleteCart =async () => {
    await orderService.deleteCart(cartIds,token)
  }

  const { isConnected, sendMessage } = useWebSocket(
    `http://localhost:8080/ws`,
    [`/topic/purchase`],
    (data) => {
      console.log("== RAW comment từ WebSocket:", data);
      try {
        if (place && cartIds.length > 0) {
          deleteCart();
        }
        navigate("/order-success", { state: { product: data.productDetail } });
      } catch (err) {
        console.error("❌ JSON parse failed:", err);
      }
    }
  );
  // log ra kiểm tra kết nối với websocket
  useEffect(() => {
    console.log(
      `WebSocket connection status: ${
        isConnected ? "✅ Connected" : "❌ Disconnected"
      }`
    );
  }, [isConnected]);
  const schema = yup.object().shape({
    province: yup.string().required("Họ tên không được bỏ trống"),
    district: yup.string().required("Họ tên không được bỏ trống"),
    commune: yup.string().required("Họ tên không được bỏ trống"),
    street: yup.string().required("Tên đương không được bỏ trống"),
    numberPhone: yup.string().required("Họ tên không được bỏ trống"),
    note: yup.string().default(""),
    status: yup.string().default("PENDING"),
    paymentType: yup.string().default("CASH"),
  });
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Thêm các state mới
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  // Hàm tính toán
  const calculateSubtotal = () => {
    return selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
  };
  const calculateDiscount = () => {
    if (!appliedVoucher) return 0;
    return (calculateSubtotal() * appliedVoucher.discount) / 100;
  };
  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };
  // Xử lý áp dụng voucher
  const handleApplyVoucher = () => {
    // Kiểm tra voucher hợp lệ (trong thực tế sẽ call API)
    const validVouchers = [
      { code: "SALE10", discount: 10 },
      { code: "SALE20", discount: 20 },
    ];

    const foundVoucher = validVouchers.find((v) => v.code === voucherCode);

    if (foundVoucher) {
      setAppliedVoucher(foundVoucher);
    } else {
      alert("Mã giảm giá không hợp lệ");
    }
  };
  // Xóa voucher
  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherCode("");
  };

  useEffect(() => {
    if (order && Array.isArray(order)) {
      const total = order.reduce(
        (sum, item) => sum + item.product.price * item.stock,
        0
      );
      setTotalPrice(total);
    }
  }, [order]);
  
  const [selectCommune, setSelectCommune] = useState({}); // cái này là vì lấy không được thông tin xã dựa theo API có sẵn
  const previousAddresses = [
    {
      full: "123 Đường ABC, Quận 1, Hồ Chí Minh",
      province: "Hồ Chí Minh",
      district: "Quận 1",
      ward: "Phường Bến Nghé",
      phone: "0909123456",
    },
    {
      full: "456 Đường XYZ, Quận 7, Hồ Chí Minh",
      province: "Hồ Chí Minh",
      district: "Quận 7",
      ward: "Phường Tân Phong",
      phone: "0987654321",
    },
  ];
  // dữ liệu dùng cho thanh toán been thứ 3
  const theme = useTheme();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  // Dữ liệu mẫu
  const selectedProducts = [
    {
      id: 1,
      name: "Áo thun trắng",
      price: 150000,
      quantity: 1,
      image:
        "https://th.bing.com/th/id/OIP.oh4x3Ae2erwB8AoPylth7AHaEK?rs=1&pid=ImgDetMain", // Thay bằng link ảnh thật
    },
    {
      id: 2,
      name: "Quần jeans xanh",
      price: 350000,
      quantity: 1,
      image:
        "https://th.bing.com/th/id/OIP.oh4x3Ae2erwB8AoPylth7AHaEK?rs=1&pid=ImgDetMain", // Thay bằng link ảnh thật
    },
  ];
  const onSubmit = async (data) => {
    try {
      const prov = await fetchProvinceByCode(data.province);
      const dis = await fetchDistrictByCode(data.district);
      const productDetailDTO = Array.isArray(order) ? order : [order]; // đảm bảo luôn là mảng

      sendMessage(`/app/purchase`, {
        productDetail: productDetailDTO,
        orderDetail: {
          commune: selectCommune,
          district: dis,
          province: prov,
          numberPhone: data.numberPhone,
          status: data.status,
          street: data.street,
          paymentType: data.paymentType,
          totalPrice: 20,
        },
        token: token,
      });
    } catch (error) {
      console.error("Lỗi khi lấy thông tin địa phương:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 1600, margin: "0 auto", p: 2 }}>
      <Box sx={{ mb: 1 }}>
        <Button
          startIcon={<ArrowBackIos sx={{ fontSize: 16 }} />} // Icon mũi tên nhỏ hơn
          onClick={() => window.history.back()}
          sx={{
            color: "#00917B",
            backgroundColor: "transparent",
            padding: "6px 12px",
            textTransform: "none",
            fontSize: "0.875rem",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "rgba(0, 145, 123, 0.05)",
              textDecoration: "underline",
            },
            "& .MuiButton-startIcon": {
              marginRight: "4px",
            },
          }}
        >
          Trở về trang trước
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
        Thanh Toán
      </Typography>

      <Grid container spacing={2}>
        {/* Cột trái: Sản phẩm */}
        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{
              mb: 2,
              borderColor: "#00917B",
              boxShadow: "0 4px 12px rgba(0, 145, 123, 0.2)",
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#00917B" }}
              >
                Đơn hàng của bạn
              </Typography>
              <Divider sx={{ my: 1 }} />

              {order.map((orderItem, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1.5,
                    p: 1,
                    borderRadius: 2,
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: "#f0fdfb",
                      transform: "scale(1.01)",
                      boxShadow: "0 2px 6px rgba(0, 145, 123, 0.2)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`http://localhost:8080/image/product/${orderItem.product?.thumbnail}`}
                    alt={orderItem?.product?.productName}
                    sx={{
                      width: 60,
                      height: 60,
                      mr: 2,
                      borderRadius: 2,
                      border: "2px solid #00917B",
                      objectFit: "cover",
                    }}
                  />

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body2"
                      fontWeight="500"
                      sx={{
                        mb: 0.5,
                        color: "#333",
                        fontSize: "0.9rem",
                      }}
                    >
                      {orderItem?.product?.productName}
                     
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          display: "inline-flex",
                          alignItems: "center",
                          "&:after": {
                            content: '"|"',
                            marginLeft: "8px",
                            color: "#ddd",
                          },
                        }}
                      >
                        Số lượng: {orderItem?.stock}
                      </Typography>

                      {orderItem?.size?.nameSize && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            display: "inline-flex",
                            alignItems: "center",
                            "&:after": {
                              content: '"|"',
                              marginLeft: "8px",
                              color: "#ddd",
                            },
                          }}
                        >
                          Size: {orderItem?.size?.nameSize}
                        </Typography>
                      )}

                      {orderItem?.color?.colorName && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            display: "inline-flex",
                          }}
                        >
                          Màu: {orderItem?.color?.colorName}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Typography variant="body2" fontWeight="bold" color="#00917B">
                    {(
                      orderItem?.product?.price * orderItem?.stock
                    ).toLocaleString()}{" "}
                    đ
                    
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 1 }} />

              {/* Tính tổng tiền tất cả sản phẩm */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" fontWeight="bold">
                  Tổng cộng:
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="#00917B">
                  {order
                    .reduce(
                      (sum, item) => sum + item.product.price * item.stock,
                      0
                    )
                    .toLocaleString()}{" "}
                  đ
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Cột phải: Thanh toán + giao hàng */}
        <Grid item xs={12} md={7}>
          {/* Phương thức thanh toán */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Phương thức thanh toán
                </Typography>

                <RadioGroup value={paymentMethod} sx={{ gap: 1 }}>
                  {/* VNPay */}
                  <Paper
                    onClick={() => setValue("paymentType", "VNPAY")}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: `2px solid ${
                        paymentMethod === "vnpay"
                          ? "#0064D2"
                          : theme.palette.divider
                      }`,
                      boxShadow:
                        paymentMethod === "vnpay"
                          ? "0 4px 12px rgba(0, 100, 210, 0.2)"
                          : "none",
                      transition: "all 0.3s",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "scale(1.01)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Radio
                        size="small"
                        checked={paymentMethod === "vnpay"}
                        sx={{ color: "#0064D2" }}
                      />
                      <img
                        src="https://th.bing.com/th/id/OIP.nyUKfh7g-nzvEH44E0bNiwHaD4?rs=1&pid=ImgDetMain"
                        alt="VNPay"
                        style={{ height: 24, marginRight: 8 }}
                      />
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="#0064D2"
                      >
                        Thanh toán qua VNPay
                      </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      {paymentMethod === "vnpay" ? (
                        <ExpandLess fontSize="small" />
                      ) : (
                        <ExpandMore fontSize="small" />
                      )}
                    </Box>

                    <Collapse in={paymentMethod === "vnpay"}>
                      <Grid container spacing={2} sx={{ mt: 2, pl: 4 }}>
                        {/* Số thẻ */}
                        <Grid item xs={12} sm={8}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Số thẻ"
                            placeholder="9704 xxxx xxxx xxxx"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                        </Grid>

                        {/* Ngày hết hạn */}
                        <Grid item xs={6} sm={2}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Hết hạn"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                          />
                        </Grid>

                        {/* CVV */}
                        <Grid item xs={6} sm={2}>
                          <TextField
                            fullWidth
                            size="small"
                            label="CVV"
                            placeholder="***"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                          />
                        </Grid>
                      </Grid>

                      {/* Gợi ý thêm cho người dùng */}
                      <Box
                        sx={{
                          mt: 3,
                          pl: 4,
                          backgroundColor: "#e3f2fd",
                          borderLeft: "4px solid #0064D2",
                          p: 2,
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Hướng dẫn:</strong>
                        </Typography>
                        <Typography variant="caption" display="block">
                          - Nhập chính xác số thẻ ATM hoặc Credit/Debit có đăng
                          ký Internet Banking.
                        </Typography>
                        <Typography variant="caption" display="block">
                          - Kiểm tra ngày hết hạn và mã bảo mật CVV ở mặt sau
                          thẻ.
                        </Typography>
                        <Typography variant="caption" display="block">
                          - VNPay sẽ chuyển bạn sang trang xác thực OTP sau khi
                          nhấn "Thanh toán".
                        </Typography>
                      </Box>
                    </Collapse>
                  </Paper>

                  {/* Momo */}
                  <Paper
                    onClick={() => setValue("paymentType", "MOMO")}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: `2px solid ${
                        paymentMethod === "momo"
                          ? "#a50064"
                          : theme.palette.divider
                      }`,
                      boxShadow:
                        paymentMethod === "momo"
                          ? "0 4px 12px rgba(165, 0, 100, 0.2)"
                          : "none",
                      transition: "all 0.3s",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "scale(1.01)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Radio
                        size="small"
                        checked={paymentMethod === "momo"}
                        sx={{ color: "#a50064" }}
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                        alt="Momo"
                        style={{ height: 24, marginRight: 8 }}
                      />
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="#a50064"
                      >
                        Thanh toán qua ví MoMo
                      </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      {paymentMethod === "momo" ? (
                        <ExpandLess fontSize="small" />
                      ) : (
                        <ExpandMore fontSize="small" />
                      )}
                    </Box>

                    <Collapse in={paymentMethod === "momo"}>
                      <Box sx={{ mt: 2, pl: 4 }}>
                        {/* Số điện thoại */}
                        <TextField
                          fullWidth
                          size="small"
                          label="Số điện thoại MoMo"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          sx={{ mb: 2 }}
                        />

                        {/* Tên người nhận */}
                        <TextField
                          fullWidth
                          size="small"
                          label="Tên chủ tài khoản"
                          value="Nguyễn Văn A"
                          disabled
                          sx={{ mb: 2 }}
                        />

                        {/* Mã đơn hàng */}
                        <TextField
                          fullWidth
                          size="small"
                          label="Mã đơn hàng"
                          value={`ORDER-${Date.now()}`}
                          disabled
                          sx={{ mb: 2 }}
                        />

                        {/* QR code (fake) */}
                        <Box
                          sx={{
                            textAlign: "center",
                            my: 2,
                          }}
                        >
                          <img
                            src="https://img.vietqr.io/image/970422-0123456789-compact.png?amount=500000&addInfo=ThanhToanMomo"
                            alt="QR MoMo"
                            style={{
                              width: 160,
                              height: 160,
                              borderRadius: 8,
                              border: "2px solid #a50064",
                            }}
                          />
                          <Typography
                            variant="caption"
                            display="block"
                            sx={{ mt: 1, color: "#a50064" }}
                          >
                            Quét mã để thanh toán
                          </Typography>
                        </Box>

                        {/* Hướng dẫn */}
                        <Box
                          sx={{
                            backgroundColor: "#fff0f6",
                            borderLeft: "4px solid #a50064",
                            p: 2,
                            borderRadius: 1,
                          }}
                        >
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Hướng dẫn:</strong>
                          </Typography>
                          <Typography variant="caption" display="block">
                            1. Mở ứng dụng MoMo trên điện thoại.
                          </Typography>
                          <Typography variant="caption" display="block">
                            2. Chọn "Quét mã" và quét mã QR bên trên.
                          </Typography>
                          <Typography variant="caption" display="block">
                            3. Kiểm tra thông tin & xác nhận thanh toán.
                          </Typography>
                        </Box>
                      </Box>
                    </Collapse>
                  </Paper>

                  {/* Tiền mặt */}
                  <Paper
                    onClick={() => setValue("paymentType", "CASH")}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: `2px solid ${
                        paymentMethod === "cash"
                          ? "#00917B"
                          : theme.palette.divider
                      }`,
                      boxShadow:
                        paymentMethod === "cash"
                          ? "0 4px 12px rgba(0, 145, 123, 0.2)"
                          : "none",
                      transition: "all 0.3s",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "scale(1.01)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Radio
                        size="small"
                        checked={paymentMethod === "cash"}
                        sx={{ color: "#00917B" }}
                      />
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2703/2703983.png"
                        alt="Tiền mặt"
                        style={{ height: 24, marginRight: 8 }}
                      />
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="#00917B"
                      >
                        Thanh toán khi nhận hàng (COD)
                      </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      {paymentMethod === "cash" ? (
                        <ExpandLess fontSize="small" />
                      ) : (
                        <ExpandMore fontSize="small" />
                      )}
                    </Box>

                    <Collapse in={paymentMethod === "cash"}>
                      <Box
                        sx={{
                          mt: 2,
                          pl: 4,
                          backgroundColor: "#e0f2f1",
                          borderLeft: "4px solid #00917B",
                          p: 2,
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Lưu ý khi thanh toán COD:</strong>
                        </Typography>
                        <Typography variant="caption" display="block">
                          - Vui lòng chuẩn bị đủ tiền mặt khi nhận hàng từ nhân
                          viên giao hàng.
                        </Typography>
                        <Typography variant="caption" display="block">
                          - Chỉ áp dụng cho đơn hàng dưới 5.000.000đ.
                        </Typography>
                        <Typography variant="caption" display="block">
                          - Bạn có thể kiểm tra hàng trước khi thanh toán.
                        </Typography>
                      </Box>
                    </Collapse>
                  </Paper>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Thông tin giao hàng */}
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Thông tin giao hàng
                </Typography>

                <Grid container spacing={2}>
                  {/* Địa chỉ đã lưu */}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Chọn địa chỉ đã lưu</InputLabel>
                      <Select
                        value={selectedAddress || ""}
                        onChange={(e) => {
                          const selected = previousAddresses.find(
                            (addr) => addr.full === e.target.value
                          );
                          if (selected) {
                            setPhoneNumber(selected.phone);
                            setSelectedAddress(selected.full);
                          }
                        }}
                        label="Chọn địa chỉ đã lưu"
                        sx={{
                          borderRadius: 1,
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor:
                              selectedAddress !== ""
                                ? theme.palette.primary.main
                                : theme.palette.divider,
                          },
                        }}
                      >
                        {previousAddresses.map((addr, idx) => (
                          <MenuItem key={idx} value={addr.full}>
                            {addr.full}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Tỉnh/Thành - Quận/Huyện - Phường/Xã */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth error={!!errors.province}>
                      <InputLabel>Tỉnh/Thành phố</InputLabel>
                      <Select
                        value={selectedProvince}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSelectedProvince(value);
                          setValue("province", value, { shouldValidate: true }); // validate khi chọn
                        }}
                        label="Tỉnh/Thành phố"
                        className={errors.province ? "shake" : ""}
                        sx={
                          errors.province
                            ? {
                                animation: "shake 0.3s ease-in-out",
                                "@keyframes shake": {
                                  "0%": { transform: "translateX(0)" },
                                  "20%": { transform: "translateX(-5px)" },
                                  "40%": { transform: "translateX(5px)" },
                                  "60%": { transform: "translateX(-5px)" },
                                  "80%": { transform: "translateX(5px)" },
                                  "100%": { transform: "translateX(0)" },
                                },
                              }
                            : {}
                        }
                      >
                        {provinces.map((province) => (
                          <MenuItem key={province.code} value={province.code}>
                            {province.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* Quận huyện */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth error={!!errors.district}>
                      <InputLabel>Quận/Huyện</InputLabel>
                      <Select
                        value={selectedDistrict}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSelectedDistrict(value);
                          setValue("district", value, { shouldValidate: true });
                        }}
                        label="Quận/Huyện"
                        disabled={!selectedProvince}
                        className={errors.district ? "shake-error" : ""} // Áp dụng class shake-error nếu có lỗi
                        sx={{
                          border: errors.district
                            ? "1px solid red" // Viền đỏ khi có lỗi
                            : "1px solid #ccc", // Viền bình thường
                          animation: errors.district
                            ? "shake 0.3s ease-in-out" // Hiệu ứng rung khi có lỗi
                            : "none",
                          "@keyframes shake": {
                            "0%": { transform: "translateX(0)" },
                            "20%": { transform: "translateX(-5px)" },
                            "40%": { transform: "translateX(5px)" },
                            "60%": { transform: "translateX(-5px)" },
                            "80%": { transform: "translateX(5px)" },
                            "100%": { transform: "translateX(0)" },
                          },
                        }}
                      >
                        {districts.map((district) => (
                          <MenuItem key={district.code} value={district.code}>
                            {district.name}
                          </MenuItem>
                        ))}
                      </Select>

                      {/* Hiển thị lỗi */}
                    </FormControl>
                  </Grid>
                  {/* Xã */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth error={!!errors.commune}>
                      <InputLabel>Phường/Xã</InputLabel>
                      <Select
                        value={selectedWard}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSelectedWard(value);
                          setValue("commune", value, { shouldValidate: true });
                        }}
                        label="Phường/Xã"
                        disabled={!selectedDistrict}
                        sx={{
                          border: errors.commune
                            ? "1px solid red"
                            : "1px solid #ccc", // Viền đỏ khi có lỗi
                          animation: errors.commune
                            ? "shake 0.3s ease-in-out"
                            : "none", // Hiệu ứng rung khi có lỗi
                          "@keyframes shake": {
                            "0%": { transform: "translateX(0)" },
                            "20%": { transform: "translateX(-5px)" },
                            "40%": { transform: "translateX(5px)" },
                            "60%": { transform: "translateX(-5px)" },
                            "80%": { transform: "translateX(5px)" },
                            "100%": { transform: "translateX(0)" },
                          },
                        }}
                      >
                        {wards.map((commune) => (
                          <MenuItem
                            key={commune.code}
                            value={commune.code}
                            onClick={(e) => {
                              setSelectCommune({
                                code: commune.code,
                                name: commune.name,
                              });
                            }}
                          >
                            {commune.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* Hiển thị lỗi */}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tên đường"
                      {...register("street", {
                        required: "Vui lòng nhập tên đường", // Thêm validation nếu cần
                      })}
                      error={!!errors.street}
                      helperText={errors.street?.message} // Hiển thị thông báo lỗi
                      sx={{
                        "& .MuiInputBase-root": {
                          border: errors.street
                            ? "0.5px solid red"
                            : "0.5px solid #ccc",
                        },
                        "& .MuiFormLabel-root": {
                          position: "absolute",
                          transform: "translate(14px, 9px) scale(1)", // Điều chỉnh vị trí label
                          "&.Mui-focused": {
                            transform: "translate(14px, -9px) scale(0.75)",
                          },
                          "&.MuiFormLabel-filled": {
                            transform: "translate(14px, -9px) scale(0.75)",
                          },
                        },
                        animation: errors.street
                          ? "shake 0.3s ease-in-out"
                          : "none",
                        "@keyframes shake": {
                          "0%": { transform: "translateX(0)" },
                          "20%": { transform: "translateX(-5px)" },
                          "40%": { transform: "translateX(5px)" },
                          "60%": { transform: "translateX(-5px)" },
                          "80%": { transform: "translateX(5px)" },
                          "100%": { transform: "translateX(0)" },
                        },
                      }}
                    />
                  </Grid>

                  {/* Số điện thoại */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      {...register("numberPhone")}
                      error={!!errors.numberPhone} // Hiển thị lỗi
                      sx={{
                        "& .MuiInputBase-root": {
                          border: errors.numberPhone
                            ? "0.5px solid red"
                            : "0.5px solid #ccc", // Viền nhỏ hơn
                        },
                        "& .MuiFormLabel-root": {
                          position: "absolute", // Đảm bảo label không bị che khuất
                        },
                        animation: errors.numberPhone
                          ? "shake 0.3s ease-in-out"
                          : "none", // Hiệu ứng rung khi có lỗi
                        "@keyframes shake": {
                          "0%": { transform: "translateX(0)" },
                          "20%": { transform: "translateX(-5px)" },
                          "40%": { transform: "translateX(5px)" },
                          "60%": { transform: "translateX(-5px)" },
                          "80%": { transform: "translateX(5px)" },
                          "100%": { transform: "translateX(0)" },
                        },
                      }}
                    />
                  </Grid>

                  {/* Ghi chú */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Ghi chú (tùy chọn)"
                      multiline
                      rows={3}
                      {...register("note")}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Voucher */}
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Mã giảm giá
                </Typography>

                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      label="Nhập mã giảm giá"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleApplyVoucher}
                      sx={{
                        height: "56px",
                        backgroundColor: "#00917B",
                        "&:hover": {
                          backgroundColor: "#007c6b", // màu đậm hơn khi hover
                        },
                      }}
                    >
                      Áp dụng
                    </Button>
                  </Grid>

                  {appliedVoucher && (
                    <Grid item xs={12}>
                      <Paper
                        sx={{
                          p: 2,
                          bgcolor: "#f5f5f5",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography fontWeight="bold">
                            {appliedVoucher.code} - Giảm{" "}
                            {appliedVoucher.discount}%
                          </Typography>
                          <Typography variant="body2">
                            Áp dụng cho đơn hàng này
                          </Typography>
                        </Box>
                        <Button color="error" onClick={handleRemoveVoucher}>
                          Xóa
                        </Button>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>

            {/* Tổng thanh toán */}
            <Card variant="outlined">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Tổng thanh toán
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography>Tạm tính:</Typography>
                    <Typography>
                      {totalPrice} VNĐ
                    </Typography>
                  </Box>

                  {appliedVoucher && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography>
                        Giảm giá ({appliedVoucher.discount}%):
                      </Typography>
                      <Typography color="error">
                         đ
                      </Typography>
                    </Box>
                  )}

                  <Divider sx={{ my: 1 }} />

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      Tổng cộng:
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                       
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  type="submit"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: "#00917B",
                    "&:hover": {
                      backgroundColor: "#007c6b", // xanh lá đậm hơn khi hover
                    },
                  }}
                >
                  {paymentMethod === "vnpay"
                    ? "Thanh toán VNPay"
                    : paymentMethod === "momo"
                    ? "Thanh toán Momo"
                    : "Đặt hàng"}
                </Button>
              </CardContent>
            </Card>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentPage;

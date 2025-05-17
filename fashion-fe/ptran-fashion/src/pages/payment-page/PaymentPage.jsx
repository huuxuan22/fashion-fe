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
  Chip,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  ArrowBack,
  ArrowBackIos,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { get, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useWebSocket } from "../../hooks/useWebSocket";
import * as orderService from "./../../service/order-service";
import * as userService from "./../../service/user-service";
import Header from "./../../layout/Header";
import { ca } from "date-fns/locale";
import ErrorNotification from "../../component/ErrorNotification";
/* Bạn có thể đặt trong App.css hoặc style.css */
const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;
const PaymentPage = () => {
  const location = useLocation();
  const [openError, setOpenError] = useState(false);
  const order = location.state.order;
  const place = location.state.place;
  const cartIds = location.state.cartIds;
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const token = localStorage.getItem("token");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [deal, setDeal] = useState([]);

  //=================Lấy tổng tiền theo đơn hàng==================
  const [priceDetails, setPriceDetails] = useState({
    subtotal: 0,
    discount: 0,
    total: 0,
  });
  const onCloseError = () => {
    setOpenError(false);
  };
  useEffect(() => {
    const prices = getTotalPrice();
    setPriceDetails({
      subtotal: prices.subtotal,
      discount: prices.subtotal - prices.discountedPrice,
      total: prices.total,
    });
  }, [order, deal, appliedVoucher]);
  // hàm tính tổng tiền của sản phẩm
  const getTotalPrice = () => {
    if (!order) return 0;
    // 1. Tính tổng giá gốc
    const subtotal = order.reduce((sum, item) => {
      return sum + item.product.price * item.stock;
    }, 0);

    // 2. Áp dụng các deal (nếu có)
    let discountedPrice = subtotal;

    if (deal && deal.length > 0) {
      order.forEach((item) => {
        const productDeals = deal.filter(
          (d) => d.product.productId === item.product.productId
        );
        if (productDeals.length > 0) {
          // Lấy deal tốt nhất cho sản phẩm này
          const bestDeal = productDeals.reduce(
            (best, current) => {
              if (current.dealType === "DEAL PRICE") {
                return current.dealPrice * item.stock < best.value
                  ? { type: "price", value: current.dealPrice * item.stock }
                  : best;
              } else {
                return current.discountPercent > best.value
                  ? { type: "percent", value: current.discountPercent }
                  : best;
              }
            },
            { type: "", value: 0 }
          );

          if (bestDeal.type === "price") {
            discountedPrice -= item.product.price * item.stock - bestDeal.value;
          } else if (bestDeal.type === "percent") {
            discountedPrice -=
              (item.product.price * item.stock * bestDeal.value) / 100;
          }
        }
      });
    }

    // 3. Áp dụng voucher (nếu có)
    if (appliedVoucher) {
      if (appliedVoucher.discountType === "FIXED_AMOUNT") {
        discountedPrice -= appliedVoucher.discountValue;
      } else {
        discountedPrice *= 1 - appliedVoucher.discountValue / 100;
      }
    }

    // Đảm bảo giá không âm
    discountedPrice = Math.max(0, discountedPrice);

    setTotalPrice(discountedPrice);
    return {
      subtotal,
      discountedPrice,
      total: discountedPrice,
    };
  };
  useEffect(() => {
    getTotalPrice();
  }, [order]);
  //===================================

  // Lấy danh sách tỉnh/thành phố
  useEffect(() => {
    loadData();
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);
  const loadData = async () => {
    order?.map((item) => {
      getDeal(item.product.productId);
      return item.product.price * item.stock;
    });
  };

  /**
   * Lấy tất cả deal của 1 sản phẩm
   * @param {*} productId
   */
  const getDeal = async (productId) => {
    try {
      const response = await userService.getDeal(token, productId);
      if (response.success) {
        // Lọc bỏ các deal trùng lặp
        const uniqueDeals = response.data.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.dealId === item.dealId)
        );
        setDeal(uniqueDeals);
      }
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

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

  // định dạng ngày tháng từ Locate datetimne sang ngày
  const formatDateRange = (startTime, endTime) => {
    const start = new Date(...startTime);
    const end = new Date(...endTime);

    return `${start.getDate()}/${start.getMonth() + 1} - ${end.getDate()}/${
      end.getMonth() + 1
    }/${end.getFullYear()}`;
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

  const deleteCart = async () => {
    await orderService.deleteCart(cartIds, token);
  };

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

  // hàm để áp voucher và xử lý vouchẻ
  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      setErrorMessage("Vui lòng nhập mã giảm giá");
      return;
    }
    try {
      const response = await userService.getCoupon(token, voucherCode);
      console.log(response);

      if (response.success) {
        setAppliedVoucher(response.data);
        setErrorMessage(null);
      } else {
        setErrorMessage(response.data || "Mã giảm giá không hợp lệ");
        setAppliedVoucher(null);
      }
    } catch (error) {
      setErrorMessage("Có lỗi xảy ra khi kiểm tra mã giảm giá");
      setAppliedVoucher(null);
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

  // lấy chi tiết 1 đơn hàng của order trong VNPay
  const generateShortProductStrings = (productDetails) => {
    // Kiểm tra nếu không phải mảng hoặc mảng rỗng
    if (!Array.isArray(productDetails) || productDetails.length === 0) {
      return "[...]";
    }
    // Tạo mảng các string mô tả sản phẩm
    const productStrings = productDetails.map((item) => {
      if (!item || !item.product) return "[...]";
      return `[${item.product.productName} : ${item.stock}]`;
    });

    // Nối các string thành một string duy nhất, cách nhau bởi dấu phẩy
    return productStrings.join(", ");
  };

  // dữ liệu dùng cho thanh toán been thứ 3
  const theme = useTheme();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [selectedAddress, setSelectedAddress] = useState("");

  const onSubmit = async (data) => {
    try {
      const prov = await fetchProvinceByCode(data.province);
      const dis = await fetchDistrictByCode(data.district);
      const productDetailDTO = Array.isArray(order) ? order : [order]; // đảm bảo luôn là mảng
      const finalTotalPrice = priceDetails.total;
      console.log("tổng tiền của bạn là: ", finalTotalPrice);
      localStorage.setItem(
          "vnOrderData",
          JSON.stringify({
            productDetail: productDetailDTO,
            orderDetail: {
              commune: selectCommune,
              district: dis,
              province: prov,
              numberPhone: data.numberPhone,
              status: data.status,
              street: data.street,
              paymentType: data.paymentType,
              totalPrice: finalTotalPrice,
            },
            appliedVoucher,
            place,
            cartIds,
          })
        );


      if (paymentMethod === "cash") {
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
            totalPrice: finalTotalPrice,
          },
          token: token,
        });
      } else if (paymentMethod === "momo") {
        setOpenError(true);
      } else if (paymentMethod === "vnpay") {
        const shortProductStrings = generateShortProductStrings(productDetailDTO);
        const data = await userService.paymentVNPay({
          money: finalTotalPrice,
          orderInf: shortProductStrings,
          token: token,
        });

        
        window.location.href = data.data;
      }

      if (appliedVoucher !== null) {
        await userService.decreaseCoupon(token, appliedVoucher);
      }
      if (place === true) {
        await orderService.deleteCart(cartIds, token);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin địa phương:", error);
    }
  };
  console.log("Vouchar code: ", appliedVoucher);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  console.log("place: ", place);
  console.log("cartIds: ", cartIds);

  return (
    <div>
      <Header></Header>
      <Box sx={{ maxWidth: 1700, margin: "0 auto", p: 2 }}>
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

        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 2 }}
        >
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

                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="#00917B"
                    >
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
            </Card>{" "}
            {/* thanh toán bằng momo VNPay */}
            <Card
              variant="outlined"
              sx={{ mb: 2, borderRadius: 3, borderColor: "#f0f0f0" }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "#333", mb: 2 }}
                >
                  Phương thức thanh toán
                </Typography>

                <RadioGroup value={paymentMethod} sx={{ gap: 2 }}>
                  {/* VNPay */}
                  <Paper
                    onClick={() => {
                      setPaymentMethod("vnpay");
                      setValue("paymentType", "VNPAY");
                    }}
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      border: `1px solid ${
                        paymentMethod === "vnpay" ? "#0066cc" : "#e0e0e0"
                      }`,
                      backgroundColor:
                        paymentMethod === "vnpay" ? "#f5faff" : "#fff",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      "&:hover": {
                        borderColor:
                          paymentMethod === "vnpay" ? "#0066cc" : "#b3b3b3",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Radio
                        size="small"
                        checked={paymentMethod === "vnpay"}
                        sx={{
                          color: "#0066cc",
                          "&.Mui-checked": {
                            color: "#0066cc",
                          },
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexGrow: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            borderRadius: "4px",
                            border: "1px solid #f0f0f0",
                            marginRight: 2,
                            padding: "4px",
                          }}
                        >
                          <img
                            src="https://th.bing.com/th/id/OIP.pn3RUm1xk1HiAxWIgC6CIwHaHa?r=0&rs=1&pid=ImgDetMain"
                            alt="VNPay"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle1"
                            fontWeight="600"
                            color="#333"
                          >
                            Thanh toán qua VNPay
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            Thanh toán an toàn bằng thẻ ngân hàng/VNPay QR
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>

                  {/* Momo */}
                  <Paper
                    onClick={() => {
                      setPaymentMethod("momo");
                      setValue("paymentType", "MOMO");
                    }}
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      border: `1px solid ${
                        paymentMethod === "momo" ? "#a50064" : "#e0e0e0"
                      }`,
                      backgroundColor:
                        paymentMethod === "momo" ? "#fff0f6" : "#fff",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      "&:hover": {
                        borderColor:
                          paymentMethod === "momo" ? "#a50064" : "#b3b3b3",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Radio
                        size="small"
                        checked={paymentMethod === "momo"}
                        sx={{
                          color: "#a50064",
                          "&.Mui-checked": {
                            color: "#a50064",
                          },
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexGrow: 1,
                        }}
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                          alt="Momo"
                          style={{ height: 24, marginRight: 12 }}
                        />
                        <Box>
                          <Typography
                            variant="subtitle1"
                            fontWeight="600"
                            color="#333"
                          >
                            Thanh toán qua ví MoMo
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            Thanh toán nhanh chóng bằng ví điện tử MoMo
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>

                  {/* Tiền mặt */}
                  <Paper
                    onClick={() => {
                      setPaymentMethod("cash");
                      setValue("paymentType", "CASH");
                    }}
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      border: `1px solid ${
                        paymentMethod === "cash" ? "#00917B" : "#e0e0e0"
                      }`,
                      backgroundColor:
                        paymentMethod === "cash" ? "#f0fdfb" : "#fff",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      "&:hover": {
                        borderColor:
                          paymentMethod === "cash" ? "#00917B" : "#b3b3b3",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Radio
                        size="small"
                        checked={paymentMethod === "cash"}
                        sx={{
                          color: "#00917B",
                          "&.Mui-checked": {
                            color: "#00917B",
                          },
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexGrow: 1,
                        }}
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2703/2703983.png"
                          alt="Tiền mặt"
                          style={{ height: 24, marginRight: 12 }}
                        />
                        <Box>
                          <Typography
                            variant="subtitle1"
                            fontWeight="600"
                            color="#333"
                          >
                            Thanh toán khi nhận hàng (COD)
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            Thanh toán bằng tiền mặt khi nhận được hàng
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </RadioGroup>

                {/* Thông tin bổ sung dựa trên phương thức chọn */}
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    backgroundColor: "#f9f9f9",
                    borderRadius: 2,
                  }}
                >
                  {paymentMethod === "vnpay" && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Lưu ý:</strong> Bạn sẽ được chuyển hướng đến cổng
                      thanh toán VNPay để hoàn tất giao dịch. Vui lòng không tắt
                      trình duyệt cho đến khi nhận được kết quả.
                    </Typography>
                  )}
                  {paymentMethod === "momo" && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Lưu ý:</strong> Mở ứng dụng MoMo và quét mã QR
                      hoặc nhập số điện thoại để thanh toán. Giao dịch sẽ được
                      xử lý ngay lập tức.
                    </Typography>
                  )}
                  {paymentMethod === "cash" && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>Lưu ý:</strong> Bạn chỉ cần thanh toán khi nhận
                      được hàng. Vui lòng kiểm tra hàng hóa trước khi thanh
                      toán.
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Cột phải: Thanh toán + giao hàng */}
          <Grid item xs={12} md={7}>
            {/* Phương thức thanh toán */}
            <form onSubmit={handleSubmit(onSubmit)}>
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
                            setValue("province", value, {
                              shouldValidate: true,
                            }); // validate khi chọn
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
                            setValue("district", value, {
                              shouldValidate: true,
                            });
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
                            setValue("commune", value, {
                              shouldValidate: true,
                            });
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
                        error={!!errorMessage}
                        helperText={errorMessage}
                        sx={{
                          animation: errorMessage
                            ? `${shake} 0.5s ease-in-out`
                            : "none",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: errorMessage
                                ? "error.main"
                                : undefined,
                            },
                          },
                        }}
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
                            backgroundColor: "#007c6b",
                          },
                        }}
                      >
                        Áp dụng
                      </Button>
                    </Grid>

                    <Grid item xs={4}></Grid>
                    <Grid item xs={8}></Grid>

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
                              {appliedVoucher.couponCode} - Giảm{" "}
                              {appliedVoucher.discountType === "FIXED_AMOUNT"
                                ? `${appliedVoucher.discountValue.toLocaleString()}đ`
                                : `${appliedVoucher.discountValue}%`}
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

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Ưu đãi đặc biệt cho sản phẩm
                  </Typography>

                  {deal && deal.length > 0 ? (
                    <Grid container spacing={2}>
                      {deal.map((item, index) => (
                        <Grid item xs={12} key={index}>
                          <Paper
                            sx={{
                              p: 2,
                              borderLeft: "4px solid",
                              borderColor:
                                item.dealStatus === "CREATE"
                                  ? "#00917B"
                                  : "#f50057",
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              position: "relative",
                              overflow: "hidden",
                              "&:hover": {
                                boxShadow: 2,
                              },
                            }}
                          >
                            {/* Hình ảnh deal */}
                            {item.imageUrl && (
                              <Box
                                sx={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: 1,
                                  overflow: "hidden",
                                  flexShrink: 0,
                                }}
                              >
                                <img
                                  src={
                                    "http://localhost:8080/image/deal/" +
                                    item.imageUrl
                                  }
                                  alt={item.product.productName}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </Box>
                            )}

                            {/* Thông tin deal */}
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {item.product.productName}
                              </Typography>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  mt: 0.5,
                                }}
                              >
                                {item.dealType === "DEAL PERCENT" ? (
                                  <Chip
                                    label={`Giảm ${item.discountPercent}%`}
                                    color="success"
                                    size="small"
                                    sx={{ fontWeight: "bold" }}
                                  />
                                ) : (
                                  <Chip
                                    label={`Giá chỉ ${item.dealPrice?.toLocaleString()}đ`}
                                    color="primary"
                                    size="small"
                                    sx={{ fontWeight: "bold" }}
                                  />
                                )}

                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {formatDateRange(
                                    item.startTime,
                                    item.endTime
                                  )}
                                </Typography>
                              </Box>

                              <Typography variant="body2" sx={{ mt: 1 }}>
                                {item.product.description?.substring(0, 100)}...
                              </Typography>
                            </Box>

                            {/* Badge trạng thái */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                bgcolor:
                                  item.dealStatus === "CREATE"
                                    ? "#e8f5e9"
                                    : "#ffebee",
                                color:
                                  item.dealStatus === "CREATE"
                                    ? "#2e7d32"
                                    : "#c62828",
                                px: 1,
                                borderRadius: 1,
                                fontSize: 12,
                                fontWeight: "bold",
                              }}
                            >
                              {item.dealStatus === "CREATE"
                                ? "ĐANG ÁP DỤNG"
                                : "HẾT HẠN"}
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "center", py: 2 }}
                    >
                      Hiện không có ưu đãi nào cho sản phẩm này
                    </Typography>
                  )}
                </Box>
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
                      <Typography>Đơn hàng của bạn:</Typography>
                      <Typography>
                        {formatCurrency(priceDetails.subtotal)}
                      </Typography>
                    </Box>
                    {/* Hiển thị danh sách các deal */}
                    {deal && deal.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        {deal.map((item, index) => (
                          <Typography
                            key={index}
                            variant="body2"
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              py: 0.5,
                              fontSize: "0.8125rem",
                            }}
                          >
                            <span>{item.product.productName}</span>
                            <span style={{ color: "#d32f2f", fontWeight: 500 }}>
                              {item.dealType === "DEAL PERCENT"
                                ? `-${item.discountPercent}%`
                                : `-${formatCurrency(
                                    item.product.price - item.dealPrice
                                  )}`}
                            </span>
                          </Typography>
                        ))}
                      </Box>
                    )}

                    {appliedVoucher && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography>Giảm giá:</Typography>
                        <Typography color="error">
                          {appliedVoucher.discountType
                            ? "- " + appliedVoucher.discountValue + " VNĐ"
                            : appliedVoucher.discountValue + "%"}
                        </Typography>
                      </Box>
                    )}

                    <Divider sx={{ my: 1 }} />

                    <Box sx={{ mt: 2 }}>
                      {priceDetails.discount > 0 && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography>Giảm giá:</Typography>
                          <Typography color="error">
                            -{formatCurrency(priceDetails.discount)}
                          </Typography>
                        </Box>
                      )}

                      <Divider sx={{ my: 1 }} />

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight="bold">
                          Tổng cộng:
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {formatCurrency(priceDetails.total)}
                        </Typography>
                      </Box>
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
      {openError && (
        <ErrorNotification
          open={openError}
          title={"KHÔNG THỂ THANH TOÁN BẰNG MOMO"}
          message={"Hiện tại trang web chưa hỗ trợ thanh toán bằng MôM"}
          onClose={onCloseError}
        />
      )}
    </div>
  );
};

export default PaymentPage;

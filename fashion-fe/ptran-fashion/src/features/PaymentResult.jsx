import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, CircularProgress } from "@mui/material";
import * as orderService from "../service/order-service";
import { useWebSocket } from "../hooks/useWebSocket";

const PaymentResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const storedOrder = JSON.parse(localStorage.getItem("vnOrderData"));
  const { productDetail, orderDetail,appliedVoucher, place, cartIds } = storedOrder || {};

  const deleteCart = async () => {
    try {
      await orderService.deleteCart(cartIds, token);
    } catch (err) {
      console.error("Xóa giỏ hàng thất bại:", err);
    }
  };

  const {isConnected, sendMessage } = useWebSocket(
    `http://localhost:8080/ws`,
    [`/topic/purchase`],
    (data) => {
      try {
        if (place && cartIds.length > 0) {
          deleteCart();
        }
        navigate("/order-success", { state: { product: data.productDetail } });
      } catch (err) {
        console.error("Xử lý WebSocket thất bại:", err);
      }
    }
  );
  useEffect(() => {
    console.log(
      `WebSocket connection status: ${
        isConnected ? "✅ Connected" : "❌ Disconnected"
      }`
    );
  }, [isConnected]);
  useEffect(() => {
  const verifyAndProcessPayment = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/payment/payment_info", {
        params: {
          vnp_Amount: queryParams.get("vnp_Amount"),
          vnp_BankCode: queryParams.get("vnp_BankCode"),
          vnp_OrderInfo: queryParams.get("vnp_OrderInfo"),
          vnp_ResponseCode: queryParams.get("vnp_ResponseCode"),
          vnp_TxnRef: queryParams.get("vnp_TxnRef"),
          vnp_SecureHash: queryParams.get("vnp_SecureHash"),
        },
      });

      const data = response.data;
      console.log("✅ Xác minh thành công:", data);

      if (data.status) {
        // ⏳ Chờ WebSocket kết nối
        const waitForSocket = new Promise((resolve, reject) => {
          let tries = 0;
          const maxTries = 10;

          const interval = setInterval(() => {
            if (isConnected) {
              clearInterval(interval);
              resolve();
            } else if (tries > maxTries) {
              clearInterval(interval);
              reject("⛔ Kết nối WebSocket thất bại sau 10 lần thử.");
            }
            tries++;
          }, 300); // chờ 300ms mỗi lần
        });

        await waitForSocket;

        sendMessage(`/app/purchase`, {
          productDetail,
          orderDetail,
          token,
        });
      } 
    } catch (error) {
      console.error("❌ Lỗi xử lý kết quả thanh toán:", error);
    }
  };

  verifyAndProcessPayment();
}, [isConnected]); // 👈 để theo dõi isConnected


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        p: 3,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" sx={{ mt: 3 }}>
        Đang xác minh kết quả thanh toán...
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Vui lòng không tắt trình duyệt trong khi hệ thống xử lý.
      </Typography>
    </Box>
  );
};

export default PaymentResult;

import React from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import {
  ArrowUpward,
  Add,
  Equalizer,
  People,
  InsertChart,
  PieChart,
  Timeline,
  Map,
  Repeat,
} from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

// Dữ liệu mẫu cho biểu đồ
const revenueData = [
  { date: "01/02", value: 2.5 },
  { date: "05/02", value: 5.0 },
  { date: "09/02", value: 3.2 },
  { date: "15/02", value: 7.5 },
  { date: "17/02", value: 4.0 },
  { date: "21/02", value: 6.8 },
  { date: "25/02", value: 10.0 },
];

const customerData = [
  { date: "01/02", value: 1 },
  { date: "05/02", value: 0 },
  { date: "09/02", value: 1 },
  { date: "15/02", value: 2 },
  { date: "17/02", value: 1 },
  { date: "21/02", value: 3 },
  { date: "25/02", value: 2 },
];

const primaryColor = "#00917B";
const secondaryColor = "#00695C";

const RevenueStatistics = () => {
  return (
    <Box sx={{ p: 2 }}>
      {/* Tiêu đề và khoảng thời gian */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
          Tổng quan báo cáo
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "#666", mt: 0.5 }}>
          01/02/2021 - 28/02/2021
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* Phần doanh thu */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Equalizer sx={{ color: primaryColor, mr: 1, fontSize: 20 }} />
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  TỔNG DOANH THU
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mr: 1 }}>
                  22,303,540₫
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#4caf50",
                  }}
                >
                  <ArrowUpward fontSize="small" />
                  <Typography variant="caption">2374.17%</Typography>
                </Box>
              </Box>

              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Doanh thu theo thời gian
              </Typography>
              <Box sx={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <XAxis dataKey="date" fontSize={12} />
                    <YAxis
                      domain={[0, "dataMax + 2"]}
                      tickFormatter={(value) => `${value}M`}
                      fontSize={12}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={primaryColor}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Typography variant="caption" color="textSecondary">
                  01/02/2021 - 28/02/2021
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  04/01/2021 - 31/01/2021
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                BÁO CÁO KHÁC
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Button
                  startIcon={<Timeline sx={{ color: primaryColor }} />}
                  sx={{ 
                    justifyContent: "flex-start", 
                    textTransform: "none",
                    fontSize: 14,
                    p: 0.5
                  }}
                >
                  Báo cáo doanh số theo thời gian
                </Button>
                <Button
                  startIcon={<PieChart sx={{ color: primaryColor }} />}
                  sx={{ 
                    justifyContent: "flex-start", 
                    textTransform: "none",
                    fontSize: 14,
                    p: 0.5
                  }}
                >
                  Báo cáo doanh số theo sản phẩm
                </Button>
                <Button
                  startIcon={<InsertChart sx={{ color: primaryColor }} />}
                  sx={{ 
                    justifyContent: "flex-start", 
                    textTransform: "none",
                    fontSize: 14,
                    p: 0.5
                  }}
                >
                  Báo cáo doanh số theo mã SXU
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Phần khách hàng */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <People sx={{ color: primaryColor, mr: 1, fontSize: 20 }} />
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  TỔNG KHÁCH HÀNG
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mr: 1 }}>
                  5
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#666",
                  }}
                >
                  <Typography variant="caption">0%</Typography>
                </Box>
              </Box>

              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Khách hàng theo thời gian
              </Typography>
              <Box sx={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={customerData}>
                    <XAxis dataKey="date" fontSize={12} />
                    <YAxis domain={[0, "dataMax + 1"]} fontSize={12} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={primaryColor}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Typography variant="caption" color="textSecondary">
                  01/02/2021 - 28/02/2021
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  04/01/2021 - 31/01/2021
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                BÁO CÁO KHÁC
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Button
                  startIcon={<Timeline sx={{ color: primaryColor }} />}
                  sx={{ 
                    justifyContent: "flex-start", 
                    textTransform: "none",
                    fontSize: 14,
                    p: 0.5
                  }}
                >
                  Báo cáo khách hàng theo thời gian
                </Button>
                <Button
                  startIcon={<Map sx={{ color: primaryColor }} />}
                  sx={{ 
                    justifyContent: "flex-start", 
                    textTransform: "none",
                    fontSize: 14,
                    p: 0.5
                  }}
                >
                  Báo cáo khách hàng theo vùng miền
                </Button>
                <Button
                  startIcon={<Repeat sx={{ color: primaryColor }} />}
                  sx={{ 
                    justifyContent: "flex-start", 
                    textTransform: "none",
                    fontSize: 14,
                    p: 0.5
                  }}
                >
                  Báo cáo khách hàng mua trở lại
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Nút thêm báo cáo */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="outlined"
          startIcon={<Add />}
          sx={{
            borderColor: primaryColor,
            color: primaryColor,
            "&:hover": { borderColor: secondaryColor },
            fontSize: 14,
            py: 0.5,
            px: 2
          }}
        >
          Thêm báo cáo
        </Button>
      </Box>
    </Box>
  );
};

export default RevenueStatistics;
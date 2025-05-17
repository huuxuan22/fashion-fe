import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Avatar,
  Pagination,
  Stack,
  Collapse,
  IconButton,
  Grid,
} from "@mui/material";
import {
  CheckCircle as ApprovedIcon,
  LocalShipping as ShippingIcon,
  DoneAll as DeliveredIcon,
  AssignmentReturn as ReturnedIcon,
  HourglassEmpty as PendingIcon,
  Send as SendIcon,
  KeyboardArrowDown as ExpandIcon,
  KeyboardArrowUp as CollapseIcon,
  FilterList as FilterIcon,
  Category,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import * as adminServiceRedux from "./../redux/Admin/Action";
import * as adminService from "./../service/admin-service";
import { set } from "date-fns";
import SuccessNotification from "./SuccessNotification";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import * as notificationServiceRedux from "./../redux/Notification/Action";
import { useWebSocket } from "../hooks/useWebSocket";
import ErrorNotification from "./ErrorNotification";
const OrderManagement = () => {
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const token = localStorage.getItem("token");
  const { notificationNew } = useSelector((store) => store.notification);
  const dispatch = useDispatch();
  const [totalPage, setTotalPage] = useState(0);
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);

  const loadNotification = async () => {
    await dispatch(notificationServiceRedux.getAllNotificationNew({ token }));
  };

  const loadData = async () => {
    await dispatch(
      adminServiceRedux.getAllOrder({
        token: token,
        page: page - 1,
        size: 7,
        category: statusFilter,
      })
    );
    await adminService.countAllOrder(token, statusFilter).then((res) => {
      setTotalPage(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, [page, statusFilter]);

  const { ordersAdmin } = useSelector((store) => store.orderAdmin);
  console.log("tổng số trang: ", totalPage);

  const handleExpandOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  const onCloseError = () => {
    setOpenError(false);
  };
  const handleSendNotification = async (orderId) => {
    // Xử lý gửi thông báo

    const order = ordersAdmin.find((order) => order.orderId === orderId);
    if (order.status === "CREATE") {
      // Gửi thông báo duyệt đơn
      await adminService.deliveryOrder(token, orderId).then((data) => {
        if (data.succces) {
          setOpen(true);
          loadData();
          setMessage("Đơn hàng đã được duyệt thành công");
        } else {
          setOpenError(true);
          loadData();
        }
      });
    } else if (order.status === "DELIVERY") {
      await adminService.completeOrder(token, orderId).then(() => {
        setOpen(true);
        loadData();
        setMessage("Đơn hàng đã được giao thành công");
      });
    }
    loadNotification();
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleStatusFilterChange = (event) => {
    const newStatus = event.target.value;
    setStatusFilter(newStatus);
    console.log(newStatus);
  };

  const statusStyles = {
    CREATE: {
      color: "#ff9800",
      icon: <PendingIcon />,
      label: "Chờ duyệt",
      bgColor: "#FFF3E0", // Màu nền nhạt
    },
    DELIVERY: {
      color: "#2196f3",
      icon: <ShippingIcon />,
      label: "Đang giao",
      bgColor: "#E3F2FD",
    },
    COMPLETED: {
      color: "#4caf50",
      icon: <DeliveredIcon />,
      label: "Hoàn thành",
      bgColor: "#E8F5E9",
    },
    CANCELLED: {
      color: "#f44336",
      icon: <ReturnedIcon />,
      label: "Đã hủy",
      bgColor: "#FFEBEE",
    },
  };

  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length < 6) return "";
    const [year, month, day, hour, minute, second] = dateArray;
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 3, color: "#00917B" }}
      >
        QUẢN LÝ ĐƠN HÀNG
      </Typography>

      {/* Filter Section */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="status-filter-label">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FilterIcon sx={{ mr: 1, fontSize: 20 }} />
                Lọc theo trạng thái
              </Box>
            </InputLabel>

            <Select
              labelId="status-filter-label"
              value={statusFilter}
              onChange={handleStatusFilterChange}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FilterIcon sx={{ mr: 1, fontSize: 20 }} />
                  Lọc theo trạng thái
                </Box>
              }
              sx={{
                "& .MuiSelect-icon": {
                  color: "#00917B",
                },
              }}
            >
              <MenuItem value="ALL">Tất cả đơn hàng</MenuItem>
              <MenuItem value="CREATE">Đơn mới tạo</MenuItem>
              <MenuItem value="DELIVERY">Đang xử lý</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer component={Paper} elevation={3} sx={{ flex: 1, mb: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Chi tiết</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mã đơn</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Khách hàng</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Địa chỉ</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Ngày đặt</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tổng tiền</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phương thức TT</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersAdmin?.length > 0 ? (
              <>
                {ordersAdmin?.map((order) => (
                  <React.Fragment key={order.orderDetailsId}>
                    <TableRow>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleExpandOrder(order.orderId)}
                        >
                          {expandedOrder === order.orderId ? (
                            <CollapseIcon />
                          ) : (
                            <ExpandIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>{order.orderCode}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={
                              "http://localhost:8080/image/user/" +
                                order.users?.imgUrl ||
                              "https://i.pravatar.cc/150?img=3"
                            }
                            sx={{ mr: 2 }}
                          />
                          {order.users?.fullName || "Khách hàng"}
                        </Box>
                      </TableCell>
                      <TableCell
                        style={{
                          maxWidth: "30ch", // 1ch ≈ chiều rộng ký tự "0"
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {order.address}
                      </TableCell>
                      <TableCell>{formatDate(order.orderDate)}</TableCell>
                      <TableCell>{order.total?.toLocaleString()}đ</TableCell>
                      <TableCell>
                        {order.paymentType === "CASH"
                          ? "Tiền mặt"
                          : "Chuyển khoản"}
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{ display: "flex", gap: 1, alignItems: "center" }}
                        >
                          {/* Box hiển thị trạng thái */}
                          <Box
                            sx={{
                              minWidth: 120,
                              height: 40,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 1,
                              px: 1.5,
                              ...(order.status === "CREATE" && {
                                bgcolor: "rgba(0, 145, 123, 0.1)",
                                border: "1px solid rgba(0, 145, 123, 0.3)",
                              }),
                              ...(order.status === "DELIVERY" && {
                                bgcolor: "rgba(46, 125, 50, 0.1)",
                                border: "1px solid rgba(46, 125, 50, 0.3)",
                              }),
                              ...(order.status === "COMPLETED" && {
                                bgcolor: "rgba(56, 142, 60, 0.1)",
                                border: "1px solid rgba(56, 142, 60, 0.3)",
                              }),
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              {order.status === "CREATE" && (
                                <>
                                  <ShippingIcon
                                    sx={{ color: "#00796B", fontSize: 20 }}
                                  />
                                  <Typography
                                    variant="body2"
                                    color="#00796B"
                                    fontWeight="500"
                                  >
                                    Chờ duyệt
                                  </Typography>
                                </>
                              )}
                              {order.status === "DELIVERY" && (
                                <>
                                  <DeliveredIcon
                                    sx={{ color: "#2E7D32", fontSize: 20 }}
                                  />
                                  <Typography
                                    variant="body2"
                                    color="#2E7D32"
                                    fontWeight="500"
                                  >
                                    Đang giao
                                  </Typography>
                                </>
                              )}
                              {order.status === "COMPLETED" && (
                                <>
                                  <CheckCircleIcon
                                    sx={{ color: "#388E3C", fontSize: 19 }}
                                  />
                                  <Typography
                                    variant="body2"
                                    color="#388E3C"
                                    fontWeight="500"
                                  >
                                    Hoàn thành
                                  </Typography>
                                </>
                              )}
                            </Box>
                          </Box>

                          {/* Nút thao tác */}
                          {(order.status === "CREATE" ||
                            order.status === "DELIVERY") && (
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<SendIcon sx={{ fontSize: 18 }} />}
                              onClick={() =>
                                handleSendNotification(order.orderId)
                              }
                              sx={{
                                bgcolor: "#00917B",
                                "&:hover": {
                                  bgcolor: "#007965",
                                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                },
                                height: 40,
                                minWidth: 90,
                                borderRadius: 1,
                                textTransform: "none",
                                fontWeight: "500",
                                boxShadow: "none",
                                transition: "all 0.2s ease",
                              }}
                            >
                              {order.status === "CREATE"
                                ? "Duyệt đơn"
                                : "Hoàn thành"}
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>

                    {/* Row for order details */}
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={8}
                      >
                        <Collapse
                          in={expandedOrder === order.orderId}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ margin: 1 }}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div"
                            >
                              Chi tiết đơn hàng
                            </Typography>
                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Sản phẩm</TableCell>
                                  <TableCell>Màu sắc</TableCell>
                                  <TableCell>Kích thước</TableCell>
                                  <TableCell>Đơn giá</TableCell>
                                  <TableCell>Số lượng</TableCell>
                                  <TableCell>Thành tiền</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {order.orderDetailsList?.map(
                                  (detail, index) => (
                                    <TableRow key={index}>
                                      <TableCell>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Avatar
                                            variant="square"
                                            src={
                                              detail.productVariant?.product
                                                ?.thumbnail
                                                ? "http://localhost:8080/image/product/" +
                                                  detail.productVariant.product
                                                    .thumbnail
                                                : "https://via.placeholder.com/100"
                                            }
                                            sx={{
                                              mr: 2,
                                              width: 100,
                                              height: 100,
                                              borderRadius: 0,
                                            }}
                                          />
                                          {
                                            detail.productVariant?.product
                                              ?.productName
                                          }
                                        </Box>
                                      </TableCell>

                                      <TableCell>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Box
                                            sx={{
                                              width: 20,
                                              height: 20,
                                              backgroundColor:
                                                detail.productVariant?.color
                                                  ?.colorCode || "#ccc",
                                              border: "1px solid #ddd",
                                              mr: 1,
                                            }}
                                          />
                                          {
                                            detail.productVariant?.color
                                              ?.colorName
                                          }
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        {detail.productVariant?.size?.nameSize}
                                      </TableCell>
                                      <TableCell>
                                        {detail.price?.toLocaleString()}đ
                                      </TableCell>
                                      <TableCell>{detail.quality}</TableCell>
                                      <TableCell>
                                        {(
                                          detail.price * detail.quality
                                        )?.toLocaleString()}
                                        đ
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 10 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <ShoppingCartOutlinedIcon
                        sx={{
                          fontSize: 80,
                          color: "#e0e0e0",
                          opacity: 0.7,
                        }}
                      />
                      <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{
                          fontWeight: 500,
                          color: "#757575",
                        }}
                      >
                        Hiện chưa có đơn hàng nào
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          color: "#9e9e9e",
                          maxWidth: "400px",
                          textAlign: "center",
                        }}
                      >
                        Bạn chưa có đơn hàng nào trong hệ thống. Khi có đơn hàng
                        mới, chúng sẽ xuất hiện tại đây.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang */}
      {totalPage > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(totalPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#02907B",
                },
                "& .Mui-selected": {
                  backgroundColor: "rgba(2, 144, 123, 0.2)",
                  color: "#02907B",
                  fontWeight: "bold",
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "rgba(2, 144, 123, 0.1)",
                },
              }}
            />
          </Stack>
        </Box>
      )}
      <ErrorNotification
        open={openError}
        title="KHÔNG THỂ GIAO HÀNG ĐƠN HÀNG"
        message="VÌ đơn hàng này đã được hủy "
        onClose={() => setOpenError(false)}
        autoHideDuration={8000}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => alert("Đang thử lại...")}
          >
            Thử lại
          </Button>
        }
      />
      {<SuccessNotification open={open} onClose={onClose} message={message} />}
    </Box>
  );
};

export default OrderManagement;

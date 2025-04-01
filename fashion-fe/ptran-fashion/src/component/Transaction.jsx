import React, { useState } from "react";
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
  Collapse,
  IconButton,
  Avatar,
  Chip,
  Pagination,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Payment as PaymentIcon,
  CheckCircle as CompletedIcon,
  Search as SearchIcon,
  DateRange as DateRangeIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// Mock data chỉ chứa giao dịch đã hoàn thành
const mockTransactions = [
  {
    id: "TXN_12345",
    orderId: "#ORD1001",
    customer: "Nguyễn Văn A",
    method: "Momo",
    amount: "1,200,000đ",
    status: "Completed",
    date: "2024-05-20 10:30",
    items: [
      {
        id: 1,
        name: "iPhone 13",
        price: "1,000,000đ",
        quantity: 1,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1657641866580",
      },
      {
        id: 2,
        name: "Ốp lưng",
        price: "200,000đ",
        quantity: 1,
        image: "https://www.xtmobile.vn/vnt_upload/product/09_2022/30/op-lung-iphone-13-pro-max-magsafe-clear-case-mau-trong-suot-xtmobile.jpg",
      },
    ],
  },
  {
    id: "TXN_12346",
    orderId: "#ORD1002",
    customer: "Trần Thị B",
    method: "Credit Card",
    amount: "3,500,000đ",
    status: "Completed",
    date: "2024-05-20 14:15",
    items: [
      {
        id: 3,
        name: "Samsung Galaxy S22",
        price: "3,500,000đ",
        quantity: 1,
        image: "https://images.samsung.com/vn/smartphones/galaxy-s22-ultra/images/galaxy-s22-ultra_highlights_kv.jpg",
      },
    ],
  },
  {
    id: "TXN_12347",
    orderId: "#ORD1003",
    customer: "Lê Văn C",
    method: "Bank Transfer",
    amount: "2,500,000đ",
    status: "Completed",
    date: "2024-05-21 09:45",
    items: [
      {
        id: 3,
        name: "MacBook Pro M1",
        price: "2,500,000đ",
        quantity: 1,
        image: "https://www.apple.com/v/macbook-pro-14-and-16/b/images/overview/hero/hero_intro_endframe__e6khcva4hkeq_large.jpg",
      },
    ],
  },
  {
    id: "TXN_12348",
    orderId: "#ORD1004",
    customer: "Phạm Thị D",
    method: "Momo",
    amount: "750,000đ",
    status: "Completed",
    date: "2024-05-22 16:20",
    items: [
      {
        id: 4,
        name: "AirPods Pro",
        price: "750,000đ",
        quantity: 1,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361",
      },
    ],
  },
  {
    id: "TXN_12349",
    orderId: "#ORD1005",
    customer: "Hoàng Văn E",
    method: "Credit Card",
    amount: "5,200,000đ",
    status: "Completed",
    date: "2024-05-23 11:10",
    items: [
      {
        id: 5,
        name: "iPad Pro 11",
        price: "5,200,000đ",
        quantity: 1,
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-finish-select-202210-12-9inch-space-gray-wifi_FMT_WHH?wid=1280&hei=720&fmt=p-jpg&qlt=95&.v=1667411388486",
      },
    ],
  },
];

// Component hiển thị trạng thái giao dịch (chỉ hiển thị Completed)
const StatusChip = () => (
  <Chip
    icon={<CompletedIcon />}
    label="Thành công"
    color="success"
    variant="outlined"
    sx={{ fontWeight: "bold" }}
  />
);

// Component hiển thị phương thức thanh toán
const PaymentMethod = ({ method }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <PaymentIcon fontSize="small" />
      <Typography>{method}</Typography>
    </Box>
  );
};

const TransactionRow = ({ transaction }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography fontWeight="bold">{transaction.id}</Typography>
        </TableCell>
        <TableCell>{transaction.orderId}</TableCell>
        <TableCell>{transaction.customer}</TableCell>
        <TableCell>
          <PaymentMethod method={transaction.method} />
        </TableCell>
        <TableCell>
          <Typography fontWeight="bold" color="#00917B">
            {transaction.amount}
          </Typography>
        </TableCell>
        <TableCell>
          <StatusChip />
        </TableCell>
        <TableCell>{transaction.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Chi tiết đơn hàng
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell>Đơn giá</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Thành tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transaction.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={item.image}
                          alt={item.name}
                          sx={{ width: 60, height: 60, mr: 2, borderRadius: 2 }}
                          variant="rounded"
                        />
                        <Typography fontWeight="500">{item.name}</Typography>
                      </TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {parseInt(item.price.replace(/\D/g, "")) * item.quantity}đ
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Transaction = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("all");

  // Hàm lọc giao dịch
  const filteredTransactions = mockTransactions.filter((transaction) => {
    // Lọc theo từ khóa tìm kiếm
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase());

    // Lọc theo khoảng thời gian
    const transactionDate = dayjs(transaction.date.split(" ")[0]);
    const matchesDate =
      (!startDate || transactionDate.isAfter(startDate.subtract(1, "day"))) &&
      (!endDate || transactionDate.isBefore(endDate.add(1, "day")));

    // Lọc theo phương thức thanh toán
    const matchesPaymentMethod =
      paymentMethod === "all" || transaction.method === paymentMethod;

    return matchesSearch && matchesDate && matchesPaymentMethod;
  });

  // Tính toán số trang
  const count = Math.ceil(filteredTransactions.length / rowsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Xử lý thay đổi trang
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#00917B", mb: 3 }}>
          Lịch sử Giao dịch đã hoàn thành
        </Typography>

        {/* Bộ lọc và tìm kiếm */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm giao dịch..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); // Reset về trang đầu khi tìm kiếm
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Phương thức</InputLabel>
              <Select
                value={paymentMethod}
                label="Phương thức"
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setPage(1);
                }}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="Momo">Momo</MenuItem>
                <MenuItem value="Credit Card">Credit Card</MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2.5}>
            <DatePicker
              label="Từ ngày"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
                setPage(1);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRangeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2.5}>
            <DatePicker
              label="Đến ngày"
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
                setPage(1);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRangeIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <TableContainer component={Paper} elevation={3}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#00917B" }}>
                <TableCell sx={{ color: "white" }} />
                <TableCell sx={{ color: "white" }}>Mã GD</TableCell>
                <TableCell sx={{ color: "white" }}>Đơn hàng</TableCell>
                <TableCell sx={{ color: "white" }}>Khách hàng</TableCell>
                <TableCell sx={{ color: "white" }}>Phương thức</TableCell>
                <TableCell sx={{ color: "white" }}>Số tiền</TableCell>
                <TableCell sx={{ color: "white" }}>Trạng thái</TableCell>
                <TableCell sx={{ color: "white" }}>Thời gian</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((transaction) => (
                  <TransactionRow key={transaction.id} transaction={transaction} />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body1" color="textSecondary" sx={{ py: 3 }}>
                      Không tìm thấy giao dịch phù hợp
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Phân trang */}
        {filteredTransactions.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination
              count={count}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#00917B",
                  borderColor: "#00917B",
                },
                "& .Mui-selected": {
                  backgroundColor: "#00917B !important",
                  color: "white",
                },
              }}
            />
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default Transaction;
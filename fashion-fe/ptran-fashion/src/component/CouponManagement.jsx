import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  TablePagination,
  Chip,
  Avatar,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import * as adminService from "./../service/admin-service";

const CouponManagement = () => {
  const [page, setPage] = useState(0);
  const size = 5;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [coupons, setCoupons] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const token = localStorage.getItem("token");

  const loadData = async () => {
    try {
      const [couponsResponse, totalPageResponse] = await Promise.all([
        adminService.getAllCoupon(size, page, token),
        adminService.getAllPageOfCoupon(token),
      ]);
      setCoupons(couponsResponse.data);
      setTotalPage(totalPageResponse.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length !== 5) return "";
    const [year, month, day, hour, minute] = dateArray;
    return `${day}/${month}/${year} ${hour}:${minute
      .toString()
      .padStart(2, "0")}`;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id) => {
    try {
      await adminService.deleteCoupon(id, token);
      alert("Xóa mã giảm giá thành công");
      loadData();
    } catch (error) {
      console.error("Error deleting coupon:", error);
      alert("Xóa mã giảm giá thất bại");
    }
  };

  const handleStatusChange = async (couponId, newStatus) => {
    try {
      // await adminService.updateCouponStatus(couponId, newStatus, token);
      alert("Cập nhật trạng thái thành công");
      loadData();
    } catch (error) {
      console.error("Error updating coupon status:", error);
      alert("Cập nhật trạng thái thất bại");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Cancel":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          mb: 3,
          color: "#008772",
          fontWeight: "bold",
        }}
      >
        Quản lý mã giảm giá
      </Typography>

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          border: "1px solid #008772",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#008772" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Hình ảnh
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Mã giảm giá
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Loại giảm giá
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Giá trị
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Bắt đầu
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Kết thúc
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Số lượt
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Trạng thái
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow
                key={coupon.couponId}
                hover
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#E0F2F1" },
                }}
              >
                <TableCell>
                  <Avatar
                    src={"http://localhost:8080/image/deal/" + coupon.imageUrl}
                    variant="rounded"
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: "500" }}>
                  {coupon.couponCode}
                </TableCell>
                <TableCell>
                  {coupon.discountType === "PERCENTAGE"
                    ? "Phần trăm"
                    : "Số tiền cố định"}
                </TableCell>
                <TableCell>
                  {coupon.discountType === "PERCENTAGE"
                    ? `${coupon.discountValue}%`
                    : `₫${coupon.discountValue.toLocaleString()}`}
                </TableCell>
                <TableCell>{formatDate(coupon.startTime)}</TableCell>
                <TableCell>{formatDate(coupon.endTime)}</TableCell>
                <TableCell>{coupon.usageLimit}</TableCell>
                <TableCell>
                  <FormControl fullWidth size="small">
                    <Select
                      value={coupon.couponStatus}
                      onChange={(e) =>
                        handleStatusChange(coupon.couponId, e.target.value)
                      }
                      variant="outlined"
                      sx={{
                        border: "2px solid #4caf50",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        color: "#4caf50",
                        fontWeight: "bold",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4caf50",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#388e3c",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#66bb6a",
                        },
                        "& .MuiSelect-icon": {
                          color: "#4caf50",
                        },
                      }}
                    >
                      <MenuItem
                        value="Active"
                        sx={{ color: "#4caf50", fontWeight: "bold" }}
                      >
                        Active
                      </MenuItem>
                      <MenuItem
                        value="Cancel"
                        sx={{ color: "#f44336", fontWeight: "bold" }}
                      >
                        Cancel
                      </MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalPage * size}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: "1px solid #e0e0e0",
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                color: "#008772",
              },
          }}
        />
      </TableContainer>
    </Box>
  );
};

export default CouponManagement;

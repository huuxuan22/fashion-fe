import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  Pagination
} from "@mui/material";

const SellerTable = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Dữ liệu mẫu
  const [sellers, setSellers] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com", mobile: "0123456789", ostin: "12345", business: "Shop ABC", status: "Active" },
    { id: 2, name: "Trần Thị B", email: "b@example.com", mobile: "0987654321", ostin: "67890", business: "Shop XYZ", status: "Inactive" },
    { id: 3, name: "Lê Văn C", email: "c@example.com", mobile: "0912345678", ostin: "54321", business: "Cửa hàng 123", status: "Active" },
    { id: 4, name: "Phạm Thị D", email: "d@example.com", mobile: "0934567890", ostin: "98765", business: "Shop LMN", status: "Inactive" },
    { id: 5, name: "Hoàng Văn E", email: "e@example.com", mobile: "0901234567", ostin: "11111", business: "Fashion Store", status: "Active" },
    { id: 6, name: "Bùi Thị F", email: "f@example.com", mobile: "0976543210", ostin: "22222", business: "Shop Beauty", status: "Inactive" }
  ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const toggleStatus = (id) => {
    setSellers((prevSellers) =>
      prevSellers.map((seller) =>
        seller.id === id ? { ...seller, status: seller.status === "Active" ? "Inactive" : "Active" } : seller
      )
    );
  };

  // Dữ liệu phân trang
  const totalPages = Math.ceil(sellers.length / rowsPerPage);
  const paginatedData = sellers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, border: "2px solid #00917B" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "#00917B" }}>
        Danh sách người bán
      </Typography>
      
      <Table>
        <TableHead sx={{ bgcolor: "#00917B" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Tên người bán</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Email</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Số điện thoại</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>OSTIN</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Tên doanh nghiệp</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Trạng thái</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Thay đổi trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((seller) => (
            <TableRow key={seller.id} sx={{ "&:nth-of-type(odd)": { bgcolor: "#f5f5f5" } }}>
              <TableCell>{seller.name}</TableCell>
              <TableCell>{seller.email}</TableCell>
              <TableCell>{seller.mobile}</TableCell>
              <TableCell>{seller.ostin}</TableCell>
              <TableCell>{seller.business}</TableCell>
              <TableCell>
                <Chip
                  label={seller.status}
                  sx={{
                    backgroundColor: seller.status === "Active" ? "#00917B" : "#d32f2f",
                    color: "#fff",
                    fontWeight: "bold"
                  }}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => toggleStatus(seller.id)}
                  sx={{
                    color: seller.status === "Active" ? "#d32f2f" : "#00917B",
                    borderColor: seller.status === "Active" ? "#d32f2f" : "#00917B",
                    "&:hover": {
                      backgroundColor: seller.status === "Active" ? "rgba(211, 47, 47, 0.1)" : "rgba(0, 145, 123, 0.1)",
                      borderColor: seller.status === "Active" ? "#d32f2f" : "#00917B"
                    }
                  }}
                >
                  {seller.status === "Active" ? "Deactivate" : "Activate"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": { color: "#00917B" },
            "& .Mui-selected": {
              backgroundColor: "#00917B",
              color: "#fff",
              fontWeight: "bold"
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "rgba(0, 145, 123, 0.2)"
            }
          }}
        />
      </Stack>
    </TableContainer>
  );
};

export default SellerTable;

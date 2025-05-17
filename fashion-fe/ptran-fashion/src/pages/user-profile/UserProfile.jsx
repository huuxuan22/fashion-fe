import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  Paper,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  TextareaAutosize,
  FormControl,
  InputLabel,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
} from "@mui/material";
import {
  LocalShipping,
  Person,
  CreditCard,
  Home,
  ExitToApp,
  Lock,
  LocationOn,
} from "@mui/icons-material";
import OrderList from "../../features/OrderList";
import ProfilePage from "../../features/Profile";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import Address from "../../component/Address";
import { useNavigate } from "react-router-dom";
import OrderDetail from "../../features/OrderDetail";
import * as userServiceRedux from "./../../redux/User/Action";
import { useDispatch, useSelector } from "react-redux";
import * as loginService from "./../../service/login-service";
import * as userService from "./../../service/user-service";
const UserProfile = () => {
  const navigate = useNavigate();
  const primaryColor = "#005244";
  const lightPrimary = "#e0f2f1";
  const [activeTab, setActiveTab] = useState("orders");
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(0);
  const size = 10;
  const [totalPages, setTotalPages] = useState(0);
  const { users } = useSelector((store) => store);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  const handleLogout = async () => {
    await loginService.logOut(token).then((data) => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const loadData = async () => {
    try {
      // Fetch orders
      const ordersResponse = await userService.getAllOrderUser({
        token: token,
        size: size,
        page: page,
      });

      if (ordersResponse.success) {
        setOrders(ordersResponse.data || []);
      } else {
        console.error("Failed to fetch orders:", ordersResponse.data);
      }

      // Fetch total pages
      const countResponse = await userService.countAllOrder({ token: token });
      if (countResponse.success) {
        const totalItems = countResponse.data;
        setTotalPages(Math.ceil(totalItems / size));
      } else {
        console.error("Failed to fetch total pages:", countResponse.data);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  
  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <div>
      <Header />
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 3, mb: 20, mt: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 2,
                border: `1px solid ${lightPrimary}`,
                cursor: "pointer",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  src={
                    "http://localhost:8080/image/user/" +
                    users?.currentUser?.imgUrl
                  }
                  sx={{
                    width: 56,
                    height: 56,
                    mr: 2,
                    bgcolor: primaryColor,
                    color: "white",
                  }}
                >
                  A
                </Avatar>
                <Typography variant="h6" sx={{ color: primaryColor }}>
                  {users?.currentUser?.username}
                </Typography>
              </Box>

              <List>
                <ListItem
                  button
                  sx={{
                    borderRadius: 1,
                    backgroundColor:
                      activeTab === "orders" ? lightPrimary : "transparent",
                    mb: 1,
                  }}
                  onClick={() => setActiveTab("orders")}
                >
                  <LocalShipping sx={{ mr: 2, color: primaryColor }} />
                  <ListItemText
                    primary="Orders"
                    primaryTypographyProps={{
                      color: primaryColor,
                      fontWeight: activeTab === "orders" ? "bold" : "normal",
                    }}
                  />
                </ListItem>
                <ListItem
                  button
                  sx={{
                    borderRadius: 1,
                    backgroundColor:
                      activeTab === "profile" ? lightPrimary : "transparent",
                    mb: 1,
                  }}
                  onClick={() => setActiveTab("profile")}
                >
                  <Person sx={{ mr: 2, color: primaryColor }} />
                  <ListItemText
                    primary="Profile"
                    primaryTypographyProps={{
                      color: primaryColor,
                      fontWeight: activeTab === "profile" ? "bold" : "normal",
                    }}
                  />
                </ListItem>
                <ListItem
                  button
                  sx={{
                    borderRadius: 1,
                    backgroundColor:
                      activeTab === "address" ? lightPrimary : "transparent",
                    mb: 1,
                  }}
                  onClick={() => setActiveTab("address")}
                >
                  <LocationOn sx={{ mr: 2, color: primaryColor }} />
                  <ListItemText
                    primary="Addresses"
                    primaryTypographyProps={{
                      color: primaryColor,
                      fontWeight: activeTab === "address" ? "bold" : "normal",
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  sx={{
                    borderRadius: 1,
                    backgroundColor:
                      activeTab === "password" ? lightPrimary : "transparent",
                    mb: 1,
                  }}
                  onClick={() => navigate("/change-password")}
                >
                  <Lock sx={{ mr: 2, color: primaryColor }} />
                  <ListItemText
                    primary="Change Password"
                    primaryTypographyProps={{
                      color: primaryColor,
                      fontWeight: activeTab === "password" ? "bold" : "normal",
                    }}
                  />
                </ListItem>

                <Divider sx={{ my: 1, borderColor: lightPrimary }} />
                <ListItem button>
                  <ExitToApp sx={{ mr: 2, color: "#d32f2f" }} />
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{ color: "#d32f2f" }}
                    onClick={() => setOpen(true)}
                  />

                  <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle style={{ color: "#007160" }}>
                      Xác nhận đăng xuất
                    </DialogTitle>
                    <DialogContent>
                      Nếu bạn đăng xuất, mọi thay đổi chưa lưu sẽ bị mất.
                      <br />
                      Bạn có chắc chắn muốn tiếp tục?
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => setOpen(false)}
                        style={{ color: "#007160" }}
                      >
                        Hủy
                      </Button>
                      <Button
                        onClick={handleLogout}
                        style={{ color: "#007160" }}
                      >
                        Đăng xuất
                      </Button>
                    </DialogActions>
                  </Dialog>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            {activeTab === "orders" && (
              <div>
                <OrderList
                  orders={orders}
                  onOrderClick={handleOrderClick}
                  page={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
                <OrderDetail
                  open={detailOpen}
                  order={selectedOrder}
                  loadData={loadData}
                  onClose={handleCloseDetail}
                />
              </div>
            )}
            {activeTab === "profile" && <ProfilePage />}
            {activeTab === "address" && <Address />}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default UserProfile;

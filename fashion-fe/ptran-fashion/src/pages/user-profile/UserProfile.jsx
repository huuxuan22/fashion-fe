import React, { useState } from "react";
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
const UserProfile = () => {
  const navigate = useNavigate();
  const primaryColor = "#005244";
  const lightPrimary = "#e0f2f1";
  const [activeTab, setActiveTab] = useState("orders");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setDetailOpen(true);
  };
  const handleCloseDetail = () => {
    setDetailOpen(false);
  };
  const orders = [
    {
      id: 1,
      status: "SHIPPED",
      arrival: "Arriving by Fri, Oct 04",
      merchant: "Raam Clothing",
      product:
        'Cellscor RAY 1.47" AMOLED Display | 700 NITS | AOD | BT-Calling | AI Voice | Split Screen Smartwatch (Black Strap, Free Size)',
      size: "FREE",
    },
    {
      id: 2,
      status: "CANCELLED",
      arrival: "Arriving by Fri, Oct 04",
      merchant: "Raam Clothing",
      product:
        'Cellscor RAY 1.47" AMOLED Display (y100 NITS | AOD | BT-Calling | AI Voice | Split Screen Smartwatch (Black Strap, Free Size)',
      size: "FREE",
    },
  ];

  return (
    <div>
      <Header />
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 3, mb: 20, mt: 3 }}>
        <Grid container spacing={4}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 2,
                border: `1px solid ${lightPrimary}`,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
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
                  Ashok
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
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Right Content */}
          <Grid item xs={12} md={9}>
            {activeTab === "orders" && (
              <div>
                <OrderList orders={orders} onOrderClick={handleOrderClick} />{" "}
                <OrderDetail
                  open={detailOpen}
                  order={selectedOrder}
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

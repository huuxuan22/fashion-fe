import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";
import {
  ShoppingCart as OrdersIcon,
  Inventory as ProductsIcon,
  Add as AddProductIcon,
  LocalOffer as DealsIcon,
  Receipt as TransactionIcon,
  AccountCircle as AccountIcon,
  ExitToApp as LogoutIcon,
  Dashboard as DashboardIcon,
  ExpandLess,
  ExpandMore,
  BarChart as RevenueIcon,
  Loyalty as CouponsIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  Star as BestSellerIcon,
  ListAlt as AllProductsIcon,
  Collections as CollectionsIcon,
  PlaylistAdd as CreateCollectionIcon,
  ViewList as CollectionListIcon,
} from "@mui/icons-material";

import BestSeller from "./../features/SellerTable";
import ProductList from "./ProductList";
import BestSellingProduct from "./BestSellingProduct";
import AddProduct from "./AddProduct";
import RevenueStatistics from "./RevenueStatistics";
import CouponManagement from "./CouponManagement";
import OrderManagement from "./OrderManagement";
import Deal from "./Deal";
import CreateCoupon from "./CreateCoupon.jsx";
import Transaction from "./Transaction.jsx";
import CollectionList from "./CollectionList";
import CreateCollection from "./CreateCollection";

const SideBarAdmin = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [couponsMenuOpen, setCouponsMenuOpen] = useState(false);
  const [collectionsMenuOpen, setCollectionsMenuOpen] = useState(false);
  const [orderManagerOpen, setOrderManagerOpen] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setOpenLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setOpenLogoutModal(false);
  };

  const handleConfirmLogout = () => {
    // Handle logout logic here
    console.log("User logged out");
    setOpenLogoutModal(false);
    // Add redirect or other logout actions
  };

  const renderContent = () => {
    switch (selectedComponent) {
      case "doarshbar":
        return <BestSeller />;
      case "orders":
        return <OrderManagement />;
      case "products":
        return <ProductList />;
      case "bestSeller":
        return <BestSellingProduct />;
      case "addProduct":
        return <AddProduct />;
      case "deals":
        return <Deal />;
      case "transaction":
        return <Transaction />;
      case "revenue":
        return <RevenueStatistics />;
      case "coupons":
        return <CouponManagement />;
      case "addCoupon":
        return <CreateCoupon />;
      case "homePage":
        return <CouponManagement />;
      case "electronicsCategory":
        return <Typography variant="h4">Electronics Category</Typography>;
      case "collections":
        return <CollectionList />;
      case "createCollection":
        return <CreateCollection />;
      default:
        return <RevenueStatistics />;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          bgcolor: "background.paper",
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box sx={{ p: 2 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", color: "#00917B" }}
            >
              Dashboard
            </Typography>
          </Box>

          <Divider sx={{ bgcolor: "#00917B" }} />

          <List>
            {/* Dashboard */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setSelectedComponent("doarshbar")}
                selected={selectedComponent === "doarshbar"}
              >
                <ListItemIcon sx={{ color: "#00917B" }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ color: "#00917B" }} />
              </ListItemButton>
            </ListItem>

            {/* Orders */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setSelectedComponent("orders")}
                selected={selectedComponent === "orders"}
              >
                <ListItemIcon sx={{ color: "#00917B" }}>
                  <OrdersIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" sx={{ color: "#00917B" }} />
              </ListItemButton>
            </ListItem>

            {/* Products with submenu */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setProductsMenuOpen(!productsMenuOpen)}
              >
                <ListItemIcon sx={{ color: "#00917B" }}>
                  <ProductsIcon />
                </ListItemIcon>
                <ListItemText primary="Products" sx={{ color: "#00917B" }} />
                {productsMenuOpen ? (
                  <ExpandLess sx={{ color: "#00917B" }} />
                ) : (
                  <ExpandMore sx={{ color: "#00917B" }} />
                )}
              </ListItemButton>
            </ListItem>

            <Collapse in={productsMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => setSelectedComponent("products")}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ color: "#00917B" }}>
                      <AllProductsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="All Products"
                      sx={{ color: "#00917B" }}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => setSelectedComponent("bestSeller")}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ color: "#00917B" }}>
                      <BestSellerIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Best Seller"
                      sx={{ color: "#00917B" }}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => setSelectedComponent("addProduct")}
                    selected={selectedComponent === "addProduct"}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ color: "#00917B" }}>
                      <AddProductIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Add Product"
                      sx={{ color: "#00917B" }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            {/* Collections with submenu */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setCollectionsMenuOpen(!collectionsMenuOpen)}
              >
                <ListItemIcon sx={{ color: "#00917B" }}>
                  <CollectionsIcon />
                </ListItemIcon>
                <ListItemText primary="Collections" sx={{ color: "#00917B" }} />
                {collectionsMenuOpen ? (
                  <ExpandLess sx={{ color: "#00917B" }} />
                ) : (
                  <ExpandMore sx={{ color: "#00917B" }} />
                )}
              </ListItemButton>
            </ListItem>

            <Collapse in={collectionsMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => setSelectedComponent("collections")}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ color: "#00917B" }}>
                      <CollectionListIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Collection List"
                      sx={{ color: "#00917B" }}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => setSelectedComponent("createCollection")}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ color: "#00917B" }}>
                      <CreateCollectionIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Create Collection"
                      sx={{ color: "#00917B" }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            {/* Coupons with submenu */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setCouponsMenuOpen(!couponsMenuOpen)}
                selected={selectedComponent === "coupons"}
              >
                <ListItemIcon sx={{ color: "#00917B" }}>
                  <CouponsIcon />
                </ListItemIcon>
                <ListItemText primary="Coupons" sx={{ color: "#00917B" }} />
                {couponsMenuOpen ? (
                  <ExpandLess sx={{ color: "#00917B" }} />
                ) : (
                  <ExpandMore sx={{ color: "#00917B" }} />
                )}
              </ListItemButton>
            </ListItem>

            <Collapse in={couponsMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => setSelectedComponent("addCoupon")}
                    selected={selectedComponent === "addCoupon"}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ color: "#00917B" }}>
                      <AddProductIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Add New Coupon"
                      sx={{ color: "#00917B" }}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => setSelectedComponent("homePage")}
                    selected={selectedComponent === "homePage"}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ color: "#00917B" }}>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Home Page"
                      sx={{ color: "#00917B" }}
                    />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => setSelectedComponent("electronicsCategory")}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ color: "#00917B" }}>
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Electronics Category"
                      sx={{ color: "#00917B" }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            {/* Deals */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setSelectedComponent("deals")}
                selected={selectedComponent === "deals"}
              >
                <ListItemIcon sx={{ color: "#00917B" }}>
                  <DealsIcon />
                </ListItemIcon>
                <ListItemText primary="Deals" sx={{ color: "#00917B" }} />
              </ListItemButton>
            </ListItem>

            {/* Transaction */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setSelectedComponent("transaction")}
              >
                <ListItemIcon sx={{ color: "#00917B" }}>
                  <TransactionIcon />
                </ListItemIcon>
                <ListItemText primary="Transaction" sx={{ color: "#00917B" }} />
              </ListItemButton>
            </ListItem>

            {/* Revenue Statistics */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setSelectedComponent("revenue")}>
                <ListItemIcon sx={{ color: "#00917B" }}>
                  <RevenueIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Revenue Statistics"
                  sx={{ color: "#00917B" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Divider sx={{ bgcolor: "#00917B" }} />

          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "#00917B" }}>
                  <AccountIcon />
                </ListItemIcon>
                <ListItemText primary="Account" sx={{ color: "#00917B" }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogoutClick}>
                <ListItemIcon sx={{ color: "#00917B" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ color: "#00917B" }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>

      {/* Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {renderContent()}
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogoutModal}
        onClose={handleCloseLogoutModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "#00917B" }}>
          Xác nhận đăng xuất
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn đăng xuất không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseLogoutModal} 
            sx={{ color: "#00917B" }}
          >
            Hủy
          </Button>
          <Button 
            onClick={handleConfirmLogout} 
            sx={{ color: "#00917B" }}
            autoFocus
          >
            Đăng xuất
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SideBarAdmin;
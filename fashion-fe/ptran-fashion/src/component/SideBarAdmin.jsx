import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Collapse
} from '@mui/material';
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
  ListAlt as AllProductsIcon
} from '@mui/icons-material';

import BestSeller from './../features/SellerTable';
import ProductList from './ProductList';
import BestSellingProduct from './BestSellingProduct';
import AddProduct from './AddProduct';
import RevenueStatistics from './RevenueStatistics';
import CouponManagement from './CouponManagement';
import OrderManagement from './OrderManagement';

const WelcomeImage = () => (
  <Box sx={{ textAlign: 'center', p: 5 }}>
    <img 
      src="https://th.bing.com/th/id/OIP.tqJMvOKYKFNbHvuK0o_80QHaFI?rs=1&pid=ImgDetMain" 
      alt="Admin Dashboard" 
      style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }}
    />
    <Typography variant="h5" sx={{ mt: 2 }}>Chào mừng đến với Admin Dashboard</Typography>
  </Box>
);

const SideBarAdmin = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [couponsMenuOpen, setCouponsMenuOpen] = useState(false);
  const [orderManagerOpen,setOrderManagerOpen] = useState(false);
  const renderContent = () => {
    switch (selectedComponent) {
      case 'doarshbar':
        return <BestSeller />;
      case 'orders':
        return <OrderManagement/>;
      case 'products':
        return <ProductList />;
      case 'bestSeller':
        return <BestSellingProduct />;
      case 'addProduct':
        return <AddProduct />;
      case 'deals':
        return <Typography variant="h4">Deals Management</Typography>;
      case 'transaction':
        return <Typography variant="h4">Transaction Page</Typography>;
      case 'revenue':
        return <RevenueStatistics />;
      case 'coupons':
        return <CouponManagement />;
      case 'addCoupon':
        return <Typography variant="h4">Add New Coupon</Typography>;
      case 'homePage':
        return <Typography variant="h4">Home Page Settings</Typography>;
      case 'electronicsCategory':
        return <Typography variant="h4">Electronics Category</Typography>;
      default:
        return <WelcomeImage />;
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          bgcolor: 'background.paper',
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <Box sx={{ p: 2 }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ fontWeight: 'bold', color: '#00917B' }}
            >
              Dashboard
            </Typography>
          </Box>

          <Divider sx={{ bgcolor: '#00917B' }} />

          <List>
            {/* Dashboard */}
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => setSelectedComponent('doarshbar')}
                selected={selectedComponent === 'doarshbar'}
              >
                <ListItemIcon sx={{ color: '#00917B' }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Doarshbar" sx={{ color: '#00917B' }} />
              </ListItemButton>
            </ListItem>

            {/* Orders */}
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => setSelectedComponent('orders')}
                selected={selectedComponent=== 'orders'}
              >
                <ListItemIcon sx={{ color: '#00917B' }}>
                  <OrdersIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" sx={{ color: '#00917B' }} />
              </ListItemButton>
            </ListItem>

            {/* Products với submenu */}
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => setProductsMenuOpen(!productsMenuOpen)}
              >
                <ListItemIcon sx={{ color: '#00917B' }}>
                  <ProductsIcon />
                </ListItemIcon>
                <ListItemText primary="Products" sx={{ color: '#00917B' }} />
                {productsMenuOpen ? <ExpandLess sx={{ color: '#00917B' }} /> : <ExpandMore sx={{ color: '#00917B' }} />}
              </ListItemButton>
            </ListItem>

            <Collapse in={productsMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => setSelectedComponent('products')}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ color: '#00917B' }}>
                      <AllProductsIcon />
                    </ListItemIcon>
                    <ListItemText primary="All Products" sx={{ color: '#00917B' }} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => setSelectedComponent('bestSeller')}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ color: '#00917B' }}>
                      <BestSellerIcon />
                    </ListItemIcon>
                    <ListItemText primary="Best Seller" sx={{ color: '#00917B' }} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => setSelectedComponent('addProduct')}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ color: '#00917B' }}>
                      <AddProductIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Product" sx={{ color: '#00917B' }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            {/* Coupons với submenu */}
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => setCouponsMenuOpen(!couponsMenuOpen)}
              >
                <ListItemIcon sx={{ color: '#00917B' }}>
                  <CouponsIcon />
                </ListItemIcon>
                <ListItemText primary="Coupons" sx={{ color: '#00917B' }} />
                {couponsMenuOpen ? <ExpandLess sx={{ color: '#00917B' }} /> : <ExpandMore sx={{ color: '#00917B' }} />}
              </ListItemButton>
            </ListItem>

            <Collapse in={couponsMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => setSelectedComponent('addCoupon')}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ color: '#00917B' }}>
                      <AddProductIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add New Coupon" sx={{ color: '#00917B' }} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => setSelectedComponent('homePage')}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ color: '#00917B' }}>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home Page" sx={{ color: '#00917B' }} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => setSelectedComponent('electronicsCategory')}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon sx={{ color: '#00917B' }}>
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Electronics Category" sx={{ color: '#00917B' }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            {/* Deals */}
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => setSelectedComponent('deals')}
              >
                <ListItemIcon sx={{ color: '#00917B' }}>
                  <DealsIcon />
                </ListItemIcon>
                <ListItemText primary="Deals" sx={{ color: '#00917B' }} />
              </ListItemButton>
            </ListItem>

            {/* Transaction */}
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => setSelectedComponent('transaction')}
              >
                <ListItemIcon sx={{ color: '#00917B' }}>
                  <TransactionIcon />
                </ListItemIcon>
                <ListItemText primary="Transaction" sx={{ color: '#00917B' }} />
              </ListItemButton>
            </ListItem>

            {/* Revenue Statistics */}
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => setSelectedComponent('revenue')}
              >
                <ListItemIcon sx={{ color: '#00917B' }}>
                  <RevenueIcon />
                </ListItemIcon>
                <ListItemText primary="Revenue Statistics" sx={{ color: '#00917B' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        <Box>
          <Divider sx={{ bgcolor: '#00917B' }} />

          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: '#00917B' }}>
                  <AccountIcon />
                </ListItemIcon>
                <ListItemText primary="Account" sx={{ color: '#00917B' }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: '#00917B' }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ color: '#00917B' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>

      {/* Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default SideBarAdmin;
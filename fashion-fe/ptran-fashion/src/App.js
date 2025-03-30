import { BrowserRouter, Route, Routes } from "react-router-dom";
import "swiper/css"; // Cách import mới cho CSS
import "@fontsource/roboto";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fontsource/inter";
import Login from "./../src/pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import ChangePassword from "./pages/change-password/change-password.jsx";
import VerifyCode from "./pages/verify-code/verify-code.jsx";
import EnterEmailVerify from "./pages/enter-email-verify/enter-email-verify.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./layout/Header.jsx";
import DealsSection from "./component/DealsSection.jsx";
import ShopByCategory from "./component/ShopByCategory.jsx";
import FashionGallery from "./component/FashionGallery.jsx";
import ProductCategory from "./component/ProductCategory.jsx";
import Sidebar from "./component/Sidebar.jsx";
import ClothingCard from "./component/ClothingCard.jsx";
import Footer from "./layout/Footer.jsx";
import { Box } from "@mui/material";
import HomePage from "./pages/home/HomePage.jsx";
import ShoppingCart from "./component/cart/ShoppingCart.jsx";
import { useState } from "react";
import CategoryDropdown from "./features/CategoryDropdown.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ProductDetail from "./pages/product-detail/ProductDetail.jsx";
import UserProfile from "./pages/user-profile/UserProfile.jsx";
import SideBarAdmin from "./component/SideBarAdmin.jsx";
import Search from "./component/Search.jsx";
import BestSellingProduct from "./component/BestSellingProduct.jsx";
import ProductList from "./component/ProductList.jsx";
import SellerTable from "./features/SellerTable.jsx";
import OrderManagement from "./component/OrderManagement.jsx";
function App() {
  const [showFooter, setShowFooter] = useState(true);
  return (
    <BrowserRouter>
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/product-page" element={<ProductPage />} />
          {/* cái này là xổ xuống  khi chọn category ở header */}
          <Route path="/drowdown" element={<CategoryDropdown />} />

          {/*shopping Cart  */}
          <Route path="/shopping-cart" element={<ShoppingCart />} />

          {/* đây là những sản phẩm mới */}
          <Route path="/deal" element={<DealsSection />} />

          {/*những sản phẩm mới theo từng loại sản phẩm  */}
          <Route path="/shop-by-cate" element={<ShopByCategory />} />
          <Route path="/footer" element={<Footer />} />

          {/* cart product  */}
          <Route path="/clothing-card" element={<ClothingCard />} />

          {/* mấy cái hình ở đầu */}
          <Route path="/product-category" element={<ProductCategory />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/gallery" element={<FashionGallery />} />
          <Route path="/homepage" element={<HomePage />}></Route>
          <Route path="/header" element={<Header />} />
          <Route path="/register" element={<Register />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/enter-email-verify" element={<EnterEmailVerify />} />

          <Route path="/admin">
          <Route path="seller" element={<SellerTable />}></Route>
          <Route path="order" element={<OrderManagement />}></Route>
          <Route path="sidebar-admin" element={<SideBarAdmin />}></Route>
          <Route path="product-list" element={<ProductList />}></Route>
          <Route
              path="best-selling-product"
              element={<BestSellingProduct />}
            ></Route>
          </Route>
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;

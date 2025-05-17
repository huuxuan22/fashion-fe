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
import CreateCoupon from "./component/CreateCoupon.jsx";
import Transaction from "./component/Transaction.jsx";
import ProductComment from "./features/ProductComment.jsx";
import PaymentPage from "./pages/payment-page/PaymentPage.jsx";
import InvoicePage from "./pages/order-detail/OrderDetailPage.jsx";
import OrderDetail from "./features/OrderDetail.jsx";
import OrderDetailPage from "./pages/order-detail/OrderDetailPage.jsx";
import OrderSuccess from "./component/OrderSuccess.jsx";
import Introduce from "./pages/Introduce/Introduce.jsx";
import Contact from "./pages/contact/Contact.jsx";
import CouponDetailPage from "./pages/coupoun-detail/CouponDetail.jsx";
import CreateCollectionPage from "./component/CreateCollection.jsx";
import CollectionDetail from "./pages/collection-detail/CollectionDetail.jsx";
import PaymentResult from "./features/PaymentResult.jsx";
function App() {
  const [showFooter, setShowFooter] = useState(true);
  return (
    <BrowserRouter>
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/coupon-detail" element={<CouponDetailPage />}></Route>
          <Route path="/collection-detail" element={<CollectionDetail />}></Route>
          <Route path="/create-collection" element={<CreateCollectionPage />}></Route>
          <Route path="/payment-result" element={<PaymentResult />} />

          {/*shopping Cart  */}
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/comment" element={<ProductComment/>}></Route>
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-detail" element={<OrderDetailPage />} />
          
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/product-page" element={<ProductPage />} />
          {/* cái này là xổ xuống  khi chọn category ở header */}
          <Route path="/drowdown" element={<CategoryDropdown />} />
          {/* đây là những sản phẩm mới */}
          <Route path="/deal" element={<DealsSection />} />
          {/*những sản phẩm mới theo từng loại sản phẩm  */}
          <Route path="/shop-by-cate" element={<ShopByCategory />} />
          <Route path="/footer" element={<Footer />} />
          {/* mấy cái hình ở đầu */}
          <Route path="/product-category" element={<ProductCategory />} />
          <Route path="/gallery" element={<FashionGallery />} />
          <Route path="/header" element={<Header />} />
          <Route path="/register" element={<Register />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/enter-email-verify" element={<EnterEmailVerify />} />

          <Route path="/admin" element= {<SideBarAdmin/>}>
          {/* <Route path="create-coupon" element={<CreateCoupon />}></Route>
          <Route path="seller" element={<SellerTable />}></Route>
          <Route path="transaction" element={<Transaction />}></Route>
          <Route path="order" element={<OrderManagement />}></Route>
          <Route path="sidebar-admin" element={<SideBarAdmin />}></Route>
          <Route path="product-list" element={<ProductList />}></Route>
          <Route
              path="best-selling-product"
              element={<BestSellingProduct />}
            ></Route> */}
          </Route>
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewProductHeader from "./component/new-product-homepage/new-product";
import "swiper/css"; // Cách import mới cho CSS
import NavbarHeader from "./component/navbar-header/navbar-header";
import FeatureContent from "./component/feature-content/feature-content";
import Footer from "./component/footer/footer";
import SelectOptionOrder from "./component/order-product/select-option-categories/select-categories";
import "@fontsource/roboto";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fontsource/inter";
import CheckBoxSizeColor from "./component/order-product/checkbox-size-color/checkbox-size-color";
import OrderProduct from "./component/order-product/order-product/order-product";
import CardProduct from "./component/card-product/card-product";
import ShoppingCart from "./component/order-product/shopping-cart/shopping-cart";
import PurchasedProduct from "./component/order-product/shopping-cart/purchased-products/purchased-products";
import Login from "./component/login/login";
import Register from "./component/register/register";
import ChangePassword from "./component/change-password/change-password";
import VerifyCode from "./component/verify-code/verify-code";
import EnterEmailVerify from "./component/enter-email-verify/enter-email-verify";
import DoashbarAmin from "./component/doashbar-admin/doashbar-admin";
import EmployeeManagemenet from "./component/admin/admin-employee-management/employee-management/employee-management";
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfile from "./component/admin/admin-employee-management/employee-details/employee-details";
import EmployeeUpdate from "./component/admin/admin-employee-management/employee-update/employee-update";
import EmployeeAdd from "./component/admin/admin-employee-management/employee-add/employee-add";
import UploadImage from "./share/upload-image/UploadImage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/new-product-header" element={<NewProductHeader />} />
        <Route path="/slider" element={<NavbarHeader />} />
        <Route path="/sections-content" element={<FeatureContent />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/order" element={<SelectOptionOrder />} />
        <Route path="/checkbox-size-color" element={<CheckBoxSizeColor />} />
        <Route path="/order-product" element={<OrderProduct />} />
        <Route path="/card-product" element={<CardProduct />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/purchased-product" element={<PurchasedProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/enter-email-verify" element={<EnterEmailVerify />} />

        {/* Sidebar bên trái */}
        <Route path="/employee" element={<EmployeeManagemenet />} />

        {/* Nội dung bên phải */}
        <Route path="/admin" element={<DoashbarAmin />}>
          <Route path="employee" element={<EmployeeManagemenet />} />
          <Route path="employee-infor" element={<UserProfile />} />
          <Route path="employee-update" element={<EmployeeUpdate />} />
          <Route path="employee-add" element={<EmployeeAdd />} />
          <Route path="upload-image" element={<UploadImage/>}></Route>
          {/* <Route path="absence" element={<AbsenceRequest />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

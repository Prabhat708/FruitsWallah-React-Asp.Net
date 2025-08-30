
import { Routes, Route } from "react-router-dom";
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import SignUpPage from "../Pages/SignUpPage";
import ContactPage from "../Pages/ContactPage";
import ProductsPage from "../Pages/ProductsPage";
import CartPage from "../Pages/CartPage";
import OrdersPage from "../Pages/OrdersPage";
import ProfilePage from "../Pages/ProfilePage";
import TermAndConditionPage from "../Pages/TermAndConditionPage";
import ChangePasswordPage from "../Pages/ChangePasswordPage";
import ManageAddressPage from "../Pages/ManageAddressPage";
import SavedPaymentPage from "../Pages/SavedPaymentPage";
import Product from "../components/Product";
import LogoutPage from "../Pages/LogoutPage";
import CheckoutPage from "../Pages/CheckoutPage";
import AdminPage from "../Pages/AdminPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/t&c" element={<TermAndConditionPage />} />
      <Route path="/changePassword" element={<ChangePasswordPage />} />
      <Route path="/address" element={<ManageAddressPage />} />
      <Route path="/payment" element={<SavedPaymentPage />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/logOut" element={<LogoutPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/FruitsWAllahAdmin" element={<AdminPage />} />
    </Routes>
  );
}

export default AppRoutes

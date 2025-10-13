import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
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
import SingleOrderPage from "../Pages/SingleOrderPage";
import PrivateRoute from "./PrivateRoute";
import AdminOrdersController from "../Pages/AdminOrdersController";
import ProductManagementPage from "../Pages/ProductManagementPage";
import ManageAdmin from "../Pages/ManageAdmin";
import SearchPage from "../Pages/SearchPage";
import AdminRoutes from "./AdminRoutes";
import AdminChatSupportPage from "../Pages/AdminChatSupportPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/search/:search" element={<SearchPage />} />
      <Route path="/t&c" element={<TermAndConditionPage />} />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/logOut"
        element={
          <PrivateRoute>
            <LogoutPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <OrdersPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <PrivateRoute>
            <SavedPaymentPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/address"
        element={
          <PrivateRoute>
            <ManageAddressPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/order/:OrderId"
        element={
          <PrivateRoute>
            <SingleOrderPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/changePassword"
        element={
          <PrivateRoute>
            <ChangePasswordPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/FruitsWallahAdmin"
        element={
          <AdminRoutes>
            <AdminPage />
          </AdminRoutes>
        }
      />
      <Route
        path="/FruitsWallahAdmin/orders"
        element={
          <AdminRoutes>
            <AdminOrdersController />
          </AdminRoutes>
        }
      />
      <Route
        path="/FruitsWallahAdmin/products"
        element={
          <AdminRoutes>
            <ProductManagementPage />
          </AdminRoutes>
        }
      />
      <Route
        path="/FruitsWallahAdmin/users"
        element={
          <AdminRoutes>
            <ManageAdmin />
          </AdminRoutes>
        }
      />
      <Route
        path="/FruitsWallahAdmin/AdminChatSupportPage"
        element={
          <AdminRoutes>
            <AdminChatSupportPage />
          </AdminRoutes>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

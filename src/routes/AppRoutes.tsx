import { Route, Routes } from "react-router-dom";

import LoginPage from "../features/auth/LoginPage";
import ProfilePage from "../features/auth/ProfilePage";
import RegisterPage from "../features/auth/RegisterPage";
import ProtectedRoute from "../features/auth/ProtectedRoute";

import CartPage from "../features/cart/CartPage";
import CheckoutPage from "../features/cart/CheckoutPage";

import OrderHistoryPage from "../features/orders/OrderHistoryPage";
import OrderSuccessPage from "../features/orders/OrderSuccessPage";

import ProductDetails from "../features/products/ProductDetails";
import ProductsPage from "../features/products/ProductsPage";


import DashboardLayout from "../layouts/DashboardLayout";

import OverviewPage from "../pages/dashboard/OverviewPage";
import DashboardProfilePage from "../pages/dashboard/ProfilePage";
import DashboardOrdersPage from "../pages/dashboard/OrdersPage";
import WishlistPage from "../pages/dashboard/WishlistPage";
import SettingsPage from "../pages/dashboard/SettingsPage";

import NotFoundPage from "./NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<ProductsPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetails />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/cart" element={<CartPage />} />

      {/* Protected Routes */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrderHistoryPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-success/:id"
        element={
          <ProtectedRoute>
            <OrderSuccessPage />
          </ProtectedRoute>
        }
      />

      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OverviewPage />} />
        <Route path="profile" element={<DashboardProfilePage />} />
        <Route path="orders" element={<DashboardOrdersPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

import { Route, Routes } from "react-router-dom";

import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import ProtectedRoute from "../features/auth/ProtectedRoute";

import CartPage from "../features/cart/CartPage";
import CheckoutPage from "../features/cart/CheckoutPage";

import OrderHistoryPage from "../features/orders/OrderHistoryPage";
import OrderSuccessPage from "../features/orders/OrderSuccessPage";

import ProductDetails from "../features/products/ProductDetails";
import ProductsPage from "../features/products/ProductsPage";

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
        path="/order-success/:id"
        element={
          <ProtectedRoute>
            <OrderSuccessPage />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/features/auth/ProductsPage";
import CartPage from "./pages/CartPage";

import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProductDetailPage from "./pages/ProductDetail.page";
import CheckoutPage from "./pages/checkoutPage";
import LoginPage from "./pages/ LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>}/ > */}
        <Route path="/order-success/:id" element={<OrderSuccessPage />} />
      </Routes>
    </>
  );
}

import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Productdetail from "./components/Productdetail";
import Wishlist from "./pages/Wishlist";
import CartPage from "./pages/Cart.jsx";
import OrderPage from "./pages/Order.jsx";
import OrderSuccessPage from "./pages/Ordersuccess";
import OrdersPage from "./pages/Orders.jsx";
import ProfilePage from "./pages/Profile.jsx";

import AdminLayout from "./admin/components/Adminlayout.jsx";
import AdminRoute from "./admin/AdminRoute.jsx";
import DashboardPage from "./admin/pages/Dashboard.jsx";
import ProductManagementPage from "./admin/pages/Product.jsx";
import UserManagementPage from "./admin/pages/users.jsx";

import { AuthContext } from "./context/AuthContext";
import OrderManagementPage from "./admin/pages/Orders.jsx";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category/:name" element={<Products />} />
        <Route path="/products/:id" element={<Productdetail />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Protected Routes */}
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/order" element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
        <Route path="/order-success" element={<ProtectedRoute><OrderSuccessPage /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="products" element={<ProductManagementPage />} />
          <Route path="orders" element={<OrderManagementPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;

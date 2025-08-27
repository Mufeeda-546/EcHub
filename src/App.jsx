// src/App.jsx
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Productdetail from "./components/Productdetail";
import Wishlist from "./pages/Wishlist";
import CartPage from "./pages/Cart.jsx";
import OrderSuccessPage from "./pages/Ordersuccess";
import OrdersPage from "./pages/order.jsx";
import ProfilePage from "./pages/Profile.jsx";

const App = () => {
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              wishlist={wishlist}
              // searchQuery={searchQuery}
              // setSearchQuery={setSearchQuery}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile"  element={<ProfilePage/>}/>
        <Route
          path="/products"
          element={<Products wishlist={wishlist} setWishlist={setWishlist} />}
        />
         <Route path="/category/:name" element={<Products />}/>
        <Route
          path="/products/:id"
          element={<Productdetail wishlist={wishlist} setWishlist={setWishlist} />}
        />
        <Route
          path="/wishlist"
          element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />

        <Route path="/order-success" element={<OrderSuccessPage />} />
      </Routes>
      <ToastContainer/>
    </Router>
  );
};

export default App;

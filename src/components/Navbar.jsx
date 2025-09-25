import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faRightFromBracket,
  faBars,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { WishlistContext } from "../context/wishlistcontext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const handleCartClick = () => {
    if (user) navigate("/cart");
    else {
      toast.info("You haven't logged in yet");
      navigate("/login", { state: { from: "/cart" } });
    }
  };

  const handleWishlistClick = () => {
    if (user) navigate("/wishlist");
    else {
      toast.info("You haven't logged in yet");
      navigate("/login", { state: { from: "/wishlist" } });
    }
  };

  return (
    <nav className="bg-[#F5F5DC] shadow-md px-6 py-3 flex justify-between items-center relative">
      <h1
        className="text-xl font-bold text-[#4A5D23] cursor-pointer"
        onClick={() => navigate("/")}
      >
        EcHub
      </h1>

      <div className="hidden md:flex gap-6 items-center">
        {location.pathname !== "/" && (
          <button
            onClick={() => navigate("/")}
            className="text-gray-700 hover:text-green-700 font-medium"
          >
            Home
          </button>
        )}
        {location.pathname !== "/about" && (
          <button
            onClick={() => navigate("/about")}
            className="text-gray-700 hover:text-green-700 font-medium"
          >
            About
          </button>
        )}
        {location.pathname !== "/products" && (
          <button
            onClick={() => navigate("/products")}
            className="text-gray-700 hover:text-green-700 font-medium"
          >
            Products
          </button>
        )}

        <div className="relative cursor-pointer" onClick={handleWishlistClick}>
          <FontAwesomeIcon icon={faHeart} className="text-2xl text-red-500" />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </div>

        <div className="relative cursor-pointer" onClick={handleCartClick}>
          <FontAwesomeIcon icon={faShoppingCart} className="text-2xl text-green-700" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>

        {user ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 bg-[#556B2F] text-white px-3 py-1 rounded-lg hover:bg-[#4A5D23] transition"
            >
              <FontAwesomeIcon icon={faUser} />
              {user.name ? `Hi, ${user.name}` : "Profile"}
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                <button
                  onClick={() => navigate("/profile")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigate("/orders")}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  My Orders
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/signup")}
            className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
          >
            Signup
          </button>
        )}
      </div>

      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon
            icon={menuOpen ? faTimes : faBars}
            className="text-2xl text-green-700"
          />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#fdf6ee] shadow-md flex flex-col items-start px-6 py-4 md:hidden">
          {location.pathname !== "/" && (
            <button
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
              className="text-gray-700 hover:text-green-700 font-medium py-2"
            >
              Home
            </button>
          )}
          {location.pathname !== "/about" && (
            <button
              onClick={() => {
                navigate("/about");
                setMenuOpen(false);
              }}
              className="text-gray-700 hover:text-green-700 font-medium py-2"
            >
              About
            </button>
          )}
          {location.pathname !== "/products" && (
            <button
              onClick={() => {
                navigate("/products");
                setMenuOpen(false);
              }}
              className="text-gray-700 hover:text-green-700 font-medium py-2"
            >
              Products
            </button>
          )}

          <div className="flex gap-4 mt-2">
            <div className="relative cursor-pointer" onClick={handleWishlistClick}>
              <FontAwesomeIcon icon={faHeart} className="text-2xl text-red-500" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </div>

            <div className="relative cursor-pointer" onClick={handleCartClick}>
              <FontAwesomeIcon icon={faShoppingCart} className="text-2xl text-green-700" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

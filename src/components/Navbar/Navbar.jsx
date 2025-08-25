import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faRightFromBracket, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../context/CartContext"; 
import { AuthContext } from "../../context/AuthContext";  

const Navbar = ({ wishlist }) => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignup = () => {
    if (user) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-[#fdf6ee] shadow-md px-6 py-3 flex justify-between items-center relative">
      <div className="flex items-center gap-2">
        <img
          src="src/assets/EcHub .jpg"
          alt="EcHub logo"
          className="h-12 w-12 rounded-full object-cover"
        />
        <h1
          className="text-xl font-bold text-green-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          EcHub
        </h1>
      </div>

      <div className="hidden md:flex gap-6">
        <button
          onClick={() => navigate("/")}
          className="text-gray-700 hover:text-green-700 font-medium"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/products")}
          className="text-gray-700 hover:text-green-700 font-medium"
        >
          Products
        </button>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/wishlist")}
        >
          <FontAwesomeIcon icon={faHeart} className="text-2xl text-red-500" />
          {wishlist?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-2xl text-green-700"
          />
          {cart?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>

        <button
          onClick={handleSignup}
          className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
        >
          Signup
        </button>

        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>
        )}
      </div>

      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-2xl text-green-700" />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#fdf6ee] shadow-md flex flex-col items-center gap-4 py-4 md:hidden z-50">
          <button
            onClick={() => { navigate("/"); setMenuOpen(false); }}
            className="text-gray-700 hover:text-green-700 font-medium"
          >
            Home
          </button>
          <button
            onClick={() => { navigate("/products"); setMenuOpen(false); }}
            className="text-gray-700 hover:text-green-700 font-medium"
          >
            Products
          </button>
          <button
            onClick={() => { navigate("/wishlist"); setMenuOpen(false); }}
            className="text-gray-700 hover:text-green-700 font-medium"
          >
            Wishlist ({wishlist?.length || 0})
          </button>
          <button
            onClick={() => { navigate("/cart"); setMenuOpen(false); }}
            className="text-gray-700 hover:text-green-700 font-medium"
          >
            Cart ({cart?.length || 0})
          </button>
          <button
            onClick={() => { handleSignup(); setMenuOpen(false); }}
            className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
          >
            Signup
          </button>
          {user && (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

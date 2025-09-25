import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/wishlistcontext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { id, name, price, image, description } = product;
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isInWishlist = wishlist.some((item) => item.id === id);

  const handleAddToCart = () => {
    const success = addToCart(product);
    if (!success && !user) {
      navigate("/login", { state: { from: location.pathname } });
    }
  };

  const handleWishlistClick = () => {
    if (!user) {
      toast.info("Please log in to manage wishlist.");
      navigate("/login", { state: { from: location.pathname } });
    } else {
      toggleWishlist(product);
    }
  };

  return (
    <div className="relative flex flex-col bg-[#F2F5D9] rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-5">
      <Link to={`/products/${id}`} state={{ product }} className="block mb-4 relative rounded-2xl overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105 rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
      </Link>

      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

        <div className="flex items-center justify-between">
          <p className="text-green-700 font-bold text-xl">₹{price}</p>
          <button
            onClick={handleWishlistClick}
            className="text-red-500 text-2xl hover:text-red-600 transition-colors"
          >
            <FontAwesomeIcon icon={isInWishlist ? solidHeart : regularHeart} />
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-5 w-full py-3 bg-[#6B8E23] text-white rounded-2xl font-semibold shadow-md hover:bg-[#4A5D23] transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

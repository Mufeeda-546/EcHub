import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/wishlistcontext";

const ProductCard = ({ id, name, price, image, description }) => {
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  const isInWishlist = wishlist.some(item => item.id === id);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-56 text-center m-2 relative transition-transform transform hover:scale-105">
      <Link to={`/products/${id}`} state={{ product: { id, name, price, image, description } }}>
        <img src={image} alt={name} className="w-full h-40 object-cover rounded-lg" />
        <h3 className="text-lg font-semibold mt-3 text-gray-800">{name}</h3>
        <p className="text-green-600 font-medium mt-1">₹{price}</p>
      </Link>

      <button
        onClick={() => toggleWishlist({ id, name, price, image, description })}
        className="absolute top-2 right-2 text-xl text-red-500 transition-transform transform hover:scale-125"
      >
        <FontAwesomeIcon icon={isInWishlist ? solidHeart : regularHeart} />
      </button>

      <button
        onClick={() => addToCart({ id, name, price, image, description })}
        className="mt-3 w-full py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

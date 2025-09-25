import React, { useContext } from "react";
import { WishlistContext } from "../context/wishlistcontext";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { FaTrash } from "react-icons/fa";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  if (wishlist.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <h2 className="text-3xl font-semibold text-gray-600">
          Your wishlist is empty 💔
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FBE8]">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Your Wishlist
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-[#F2F5D9] border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover rounded-md hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50 transition"
                >
                  <FaTrash className="text-red-500 text-sm" />
                </button>
              </div>

              <div className="mt-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {item.name}
                </h3>
                <p className="text-gray-700 font-medium mt-2 text-base">
                  ₹{item.price}
                </p>
              </div>

              <button
                onClick={() => addToCart(item)}
                className="mt-5 w-full bg-[#6B8E23] text-white py-2.5 rounded-lg font-medium hover:bg-[#4A5D23] transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

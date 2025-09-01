// src/pages/Wishlist.jsx
import React, { useContext } from "react";
import { WishlistContext } from "../context/wishlistcontext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-700">
          No items in wishlist
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-md p-4 relative bg-white"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <p className="text-green-600 font-medium">₹{item.price}</p>

            <button
              onClick={() => removeFromWishlist(item.id)}
              className="absolute top-2 right-2 text-red-500 font-bold hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

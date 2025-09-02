import React, { useContext } from "react";
import { WishlistContext } from "../context/wishlistcontext";
import { CartContext } from "../context/CartContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  if (wishlist.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-600">
          Your wishlist is empty
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Your Wishlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col relative"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-44 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-3 text-gray-800 truncate">
              {item.name}
            </h3>
            <p className="text-green-600 font-medium mt-1">₹{item.price}</p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => addToCart(item)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

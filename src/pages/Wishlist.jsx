import React from 'react';
// import { Link } from 'react-router-dom';



const Wishlist = ({ wishlist, setWishlist }) => {
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  if (wishlist.length === 0) return <p className="text-center mt-10">No items in wishlist.</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map(item => (
          <div key={item.id} className="border rounded-lg p-4 relative">
            <img src={item.image} alt={item.name} className="w-full h-40  rounded-lg" />
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <p className="text-green-600 font-medium">₹{item.price}</p>
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="absolute top-2 right-2 text-red-500 font-bold"
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

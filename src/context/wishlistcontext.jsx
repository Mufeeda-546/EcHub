import React, { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist for logged in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      const savedWishlist = JSON.parse(localStorage.getItem(`user_wishlist_${user.id}`)) || [];
      setWishlist(savedWishlist);
    }
  }, []);

  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      localStorage.setItem(`user_wishlist_${user.id}`, JSON.stringify(newWishlist));
    }
  };

  const addToWishlist = (item) => {
    if (!wishlist.some((i) => i.id === item.id)) {
      const updated = [...wishlist, item];
      saveWishlist(updated);
    }
  };

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((i) => i.id !== id);
    saveWishlist(updated);
  };

  const toggleWishlist = (item) => {
    if (wishlist.some((i) => i.id === item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

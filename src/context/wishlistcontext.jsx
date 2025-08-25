// src/context/WishlistContext.js
import React, { createContext, useState, useEffect } from "react";

// 1. Create Context
export const WishlistContext = createContext();

// 2. Provider Component
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // 3. Load wishlist from localStorage when app starts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser")); // get logged in user
    if (user) {
      const savedWishlist = JSON.parse(
        localStorage.getItem(`user_wishlist_${user.name}`)
      ) || [];
      setWishlist(savedWishlist);
    }
  }, []);

  // 4. Save wishlist to state and localStorage
  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      localStorage.setItem(
        `user_wishlist_${user.name}`,
        JSON.stringify(newWishlist)
      );
    }
  };

  // 5. Add item to wishlist
  const addToWishlist = (item) => {
    // avoid duplicates
    const exists = wishlist.find((i) => i.id === item.id);
    if (!exists) {
      saveWishlist([...wishlist, item]);
      alert(`${item.name} added to wishlist`);
    } else {
      alert(`${item.name} is already in wishlist`);
    }
  };

  // 6. Remove item from wishlist
  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((i) => i.id !== id);
    saveWishlist(updated);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

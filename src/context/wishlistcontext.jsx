import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      const savedWishlist =
        JSON.parse(localStorage.getItem(`user_wishlist_${user.id}`)) || [];
      setWishlist(savedWishlist);
    } else {
      setWishlist([]);
    }
  }, [user]);

  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    if (user) {
      localStorage.setItem(
        `user_wishlist_${user.id}`,
        JSON.stringify(newWishlist)
      );
    }
  };

  const addToWishlist = (item) => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      return;
    }
    if (!wishlist.some((i) => i.id === item.id)) {
      const updated = [...wishlist, { ...item, userId: user.id }];
      saveWishlist(updated);
      toast.success("Added to Wishlist!");
    } else {
      toast.info("Item is already in your wishlist");
    }
  };

  const removeFromWishlist = (id) => {
    if (!user) return;
    const updated = wishlist.filter((i) => i.id !== id || i.userId !== user.id);
    saveWishlist(updated);
    toast.info("Removed from Wishlist!");
  };

  const toggleWishlist = (item, navigate) => {
    if (!user) {
      toast.error("Please login to use Wishlist");
      navigate("/login", { state: { from: "/wishlist" } });
      return;
    }

    if (wishlist.some((i) => i.id === item.id && i.userId === user.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

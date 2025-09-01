// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  

  useEffect(() => {
    if (user) {
      const savedCart =
        JSON.parse(localStorage.getItem(`user_cart_${user.id}`)) || [];
      setCart(savedCart);
    } else {
      setCart([]);
    }
  }, [user]);

  const saveCart = (newCart) => {
    setCart(newCart);
    if (user) {
      localStorage.setItem(`user_cart_${user.id}`, JSON.stringify(newCart));
    }
  };

  const addToCart = (item) => {
    if (!user) {
      toast.error("Please login to add items to your cart");

    ;

      return false;
    }

    const existing = cart.find((i) => i.id === item.id);
    let updated;
    if (existing) {
      updated = cart.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      toast.info("Item quantity updated");
    } else {
      updated = [...cart, { ...item, quantity: 1 }];
      toast.success("Item added to cart");
    }
    saveCart(updated);
    return true;
  };

  const removeFromCart = (id) => {
    const updated = cart.filter((i) => i.id !== id);
    saveCart(updated);
  };

  const increaseQty = (id) => {
    const updated = cart.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i
    );
    saveCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart.map((i) =>
      i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
    );
    saveCart(updated);
  };

  const clearCart = () => {
    setCart([]);
    if (user) {
      localStorage.removeItem(`user_cart_${user.id}`);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

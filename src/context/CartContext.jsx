import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

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
      return false;
    }

    const existing = cart.find((i) => i.id === item.id);

    if (existing) {
      toast.info("Item is already in your cart");
      return false;
    } else {
      const updated = [...cart, { ...item, quantity: 1 }];
      saveCart(updated);
      toast.success("Item added to cart");
      return true;
    }
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

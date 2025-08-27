import React, { createContext, useState, useEffect,useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();
export function CartProvider({ children }) {
  const {user}=useContext(AuthContext)
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      const savedCart = JSON.parse(localStorage.getItem(`user_cart_${user.id}`)) || [];
      setCart(savedCart);
    }
  }, [user]);

  const saveCart = (newCart) => {
    setCart(newCart);
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      localStorage.setItem(`user_cart_${user.id}`, JSON.stringify(newCart));
    }
  };

  const addToCart = (item) => {
    const existing = cart.find((i) => i.id === item.id);
    let updated;
    if (existing) {
      updated = cart.map((i) =>{
        toast.info("you have already added ")
       return  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
    });
    } else {
      updated = [...cart, { ...item, quantity: 1 }];
    }
    saveCart(updated);
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
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

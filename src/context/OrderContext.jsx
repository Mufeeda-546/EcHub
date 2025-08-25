// src/context/OrderContext.js
import React, { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  // ✅ Load orders from localStorage when app starts
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // ✅ Save orders to localStorage whenever they change
  const saveOrders = (newOrders) => {
    setOrders(newOrders);
    localStorage.setItem("orders", JSON.stringify(newOrders));
  };

  // ✅ Place Order (called from CartPage)
  const placeOrder = (cart, userId) => {
    const newOrder = {
      id: Date.now(), // unique order id
      userId,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toLocaleString(),
      status: "Confirmed",
    };

    const updatedOrders = [...orders, newOrder];
    saveOrders(updatedOrders);

    return newOrder; // return order so we can show it
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

// src/context/OrderContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:3000/orders?userId=${user.id}`);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);
const placeOrder = async (cart, address, payment) => {
  if (!user) return null;

  const newOrder = {
    userId: user.id, // 👈 link order to logged-in user
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    address,
    payment,
    date: new Date().toLocaleString(),
    status: "Confirmed",
  };

  try {
    const res = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });

    const savedOrder = await res.json(); // ✅ server will return the object with generated id

    setOrders((prev) => [...prev, savedOrder]); // ✅ keep UI in sync
    return savedOrder;
  } catch (error) {
    console.error("Error placing order", error);
    return null;
  }
};

  return (
    <OrderContext.Provider value={{ orders, placeOrder, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

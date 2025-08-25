import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    if (user) {
      setOrders(savedOrders.filter((order) => order.userId === user.id));
    } else {
      setOrders([]);
    }
  }, [user]);

  const saveOrders = (newOrders) => {
    setOrders(newOrders.filter((order) => order.userId === user.id));
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const otherOrders = allOrders.filter((order) => order.userId !== user.id);
    localStorage.setItem("orders", JSON.stringify([...otherOrders, ...newOrders]));
  };

  const placeOrder = (cart, userId) => {
    const newOrder = {
      id: Date.now(),
      userId,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toLocaleString(),
      status: "Confirmed",
    };

    const updatedOrders = [...orders, newOrder];
    saveOrders(updatedOrders);

    return newOrder;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

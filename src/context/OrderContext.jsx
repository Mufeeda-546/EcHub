import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { user } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);
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
      userId: user.id,
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

      const savedOrder = await res.json();

      setOrders((prev) => [...prev, savedOrder]);
      clearCart();
      return savedOrder;
    } catch (error) {
      console.error("Error placing order", error);
      return null;
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const order = orders.find((o) => o.id === orderId);
      if (!order) return null;

      if (order.status.toLowerCase() === "delivered") {
        return null;
      }

      const updatedOrder = { ...order, status: "cancelled" };

      const res = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrder),
      });

      const saved = await res.json();

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? saved : o))
      );

      return saved;
    } catch (error) {
      console.error("Error cancelling order", error);
      return null;
    }
  };

  return (
    <OrderContext.Provider
      value={{ orders, placeOrder, fetchOrders, cancelOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}

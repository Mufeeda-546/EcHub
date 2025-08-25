import React, { useContext } from "react";
import { OrderContext } from "../context/ordercontext";

const OrdersPage = () => {
  const { orders } = useContext(OrderContext);

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-700">
          📭 No orders found
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📦 Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-lg p-6 border"
          >
            <p className="font-semibold text-gray-800">Order ID: {order.id}</p>
            <p className="text-gray-600">Date: {order.date}</p>
            <p className="text-gray-600">Status: {order.status}</p>

            <ul className="mt-4 space-y-2">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between bg-gray-50 p-2 rounded"
                >
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} × ₹{item.price}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold mt-4">
              💰 Total: ₹{order.total}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;

import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderSuccessPage = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-700">
           No order found
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-md mb-6 text-center">
        <h1 className="text-3xl font-bold"> Order Placed Successfully!</h1>
        <p className="mt-2 text-gray-700">Thank you for your purchase </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <p className="text-gray-800">
          <span className="font-semibold"> Order ID:</span> {order.id}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold"> Date:</span> {order.date}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold"> Status:</span> {order.status}
        </p>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Items:</h3>
          <ul className="space-y-2">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-700">
                  {item.quantity} × ₹{item.price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 border-t pt-4">
           Total: ₹{order.total}
        </h2>
      </div>

      <div className="mt-6 flex justify-between">
        <Link
          to="/orders"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View All Orders
        </Link>
        <Link
          to="/products"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;

import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderSuccessPage = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-500">
          No order found
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-green-100 to-green-200 border-l-4 border-green-500 text-green-800 px-6 py-6 rounded-xl shadow-lg text-center mb-8">
        <h1 className="text-4xl font-extrabold mb-2">🎉 Order Placed!</h1>
        <p className="text-gray-700 text-lg">Thank you for shopping with us.</p>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
          <div>
            <span className="block text-gray-500 font-medium mb-1">Order ID</span>
            <span className="font-semibold text-gray-900">{order.id}</span>
          </div>
          <div>
            <span className="block text-gray-500 font-medium mb-1">Date</span>
            <span className="font-semibold text-gray-900">{order.date}</span>
          </div>
          <div>
            <span className="block text-gray-500 font-medium mb-1">Status</span>
            <span className="font-semibold text-green-600">{order.status}</span>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Items</h3>
          <ul className="divide-y divide-gray-200">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-3"
              >
                <span className="font-medium text-gray-900">{item.name}</span>
                <span className="text-gray-700">
                  {item.quantity} × ₹{item.price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t pt-4 text-right">
          <h2 className="text-2xl font-bold text-gray-900">
            Total: ₹{order.total}
          </h2>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-center sm:justify-between gap-4">
        <Link
          to="/orders"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-transform transform hover:scale-105 shadow-md text-center"
        >
          View All Orders
        </Link>
        <Link
          to="/products"
          className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-transform transform hover:scale-105 shadow-md text-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;

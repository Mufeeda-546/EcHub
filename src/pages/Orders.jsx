import React, { useContext, useEffect } from "react";
import { OrderContext } from "../context/ordercontext";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { orders, fetchOrders, cancelOrder } = useContext(OrderContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-lg md:text-xl font-medium text-gray-500">
          No orders found
        </h2>
      </div>
    );
  }

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancel = async (id) => {
    const result = await cancelOrder(id);
    if (result) {
      toast.success("Order cancelled successfully!");
    } else {
      toast.error("Unable to cancel this order.");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
        My Orders
      </h1>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                Date
              </th>
              <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                Payment
              </th>
              <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                Items
              </th>
              <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                Total
              </th>
              <th className="px-4 py-3 text-left text-gray-600 text-sm font-medium">
                Status
              </th>
              <th className="px-4 py-3 text-center text-gray-600 text-sm font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-gray-700 text-sm font-medium">
                  {order.id}
                </td>

                <td className="px-4 py-3 text-gray-600 text-sm">{order.date}</td>

                <td className="px-4 py-3 text-gray-600 text-sm">
                  {order.payment}
                </td>

                <td className="px-4 py-3 text-gray-700 text-sm">
                  <ul className="space-y-1">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex justify-between">
                        <span>{item.name} × {item.quantity}</span>
                        <span className="font-medium">₹{item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </td>

                <td className="px-4 py-3 text-gray-900 text-sm font-semibold">
                  ₹{order.total}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  {order.status.toLowerCase() !== "delivered" &&
                  order.status.toLowerCase() !== "cancelled" ? (
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="px-3 py-1.5 bg-red-500 text-white rounded-md text-xs md:text-sm hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;

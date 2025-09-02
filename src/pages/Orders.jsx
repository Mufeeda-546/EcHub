import React, { useContext, useEffect } from "react";
import { OrderContext } from "../context/ordercontext";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { orders, fetchOrders, cancelOrder } = useContext(OrderContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <h2 className="text-center mt-10">No orders found</h2>;
  }

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-yellow-500 text-black";
      case "shipped":
        return "bg-blue-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-white";
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <p><strong>Order ID:</strong> {order.id}</p>
            <span
              className={`px-3 py-1 rounded-full font-semibold ${getStatusBadgeClass(
                order.status
              )}`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Payment:</strong> {order.payment}</p>
          <p><strong>Address:</strong> {order.address}</p>

          <ul className="mt-3 space-y-1">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-bold mt-3">Total: ₹{order.total}</h3>

          {order.status.toLowerCase() !== "delivered" &&
           order.status.toLowerCase() !== "cancelled" && (
            <button
              onClick={() => handleCancel(order.id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Cancel Order
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;

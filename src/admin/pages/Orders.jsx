import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  confirmed: "bg-purple-100 text-purple-800",
};

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOrder, setModalOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const [ordersRes, usersRes] = await Promise.all([
        fetch("http://localhost:3000/orders"),
        fetch("http://localhost:3000/users"),
      ]);
      const [ordersData, usersData] = await Promise.all([
        ordersRes.json(),
        usersRes.json(),
      ]);
      setOrders(ordersData);
      setUsers(usersData);
      setFilteredOrders(ordersData);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filterOrders = (searchValue = searchTerm, status = statusFilter) => {
    const value = searchValue.toLowerCase();
    const filtered = orders.filter((order) => {
      const userName = users.find((u) => u.id === order.userId)?.name || "";
      const productNames = order.items.map((p) => p.name).join(" ").toLowerCase();
      const matchesSearch =
        order.id.toLowerCase().includes(value) ||
        userName.toLowerCase().includes(value) ||
        productNames.includes(value) ||
        order.status.toLowerCase().includes(value) ||
        order.payment.toLowerCase().includes(value);
      const matchesStatus =
        status === "all" ? true : order.status.toLowerCase() === status;
      return matchesSearch && matchesStatus;
    });
    setFilteredOrders(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterOrders(e.target.value, statusFilter);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    filterOrders(searchTerm, e.target.value);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderToUpdate = orders.find((o) => o.id === orderId);
      if (!orderToUpdate) return;
      const updatedOrder = { ...orderToUpdate, status: newStatus };
      await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrder),
      });
      fetchOrders();
    } catch (err) {
      setError("Failed to update order");
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Loading orders...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by Order ID, User, Product, Status, or Payment"
          className="border rounded-lg p-2 flex-1 focus:ring-2 focus:ring-green-400 focus:outline-none"
        />
        <select
          value={statusFilter}
          onChange={handleStatusFilter}
          className="border rounded-lg p-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
          <option value="confirmed">Confirmed</option>
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full min-w-[900px] text-left border-collapse">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 rounded-tl-lg">Order ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Products</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
              <th className="p-3 rounded-tr-lg">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
            {filteredOrders.map((order) => {
              const user = users.find((u) => u.id === order.userId);
              return (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 font-medium">{order.id}</td>
                  <td className="p-3">{user?.name || "Unknown"}</td>
                  <td className="p-3">
                    {order.items.map((p) => (
                      <div key={p.id} className="flex justify-between">
                        <span>{p.name}</span>
                        <span className="text-gray-500">x{p.quantity}</span>
                      </div>
                    ))}
                  </td>
                  <td className="p-3 font-semibold">₹{order.total}</td>
                  <td className="p-3">{order.payment}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded font-medium ${
                        statusColors[order.status.toLowerCase()]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => setModalOrder(order)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                    >
                      <FaEye />
                    </button>
                    <select
                      value={order.status.toLowerCase()}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="border rounded px-2 py-1 focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  </td>
                  <td className="p-3">{order.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <h2 className="text-xl font-semibold mb-4">
              Order Details - {modalOrder.id}
            </h2>
            <p>
              <strong>User:</strong>{" "}
              {users.find((u) => u.id === modalOrder.userId)?.name || "Unknown"}
            </p>
            <p>
              <strong>Payment:</strong> {modalOrder.payment}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded font-medium ${
                  statusColors[modalOrder.status.toLowerCase()]
                }`}
              >
                {modalOrder.status}
              </span>
            </p>
            <p className="mt-2 font-semibold">Products:</p>
            <ul className="list-disc list-inside">
              {modalOrder.items.map((p) => (
                <li key={p.id}>
                  {p.name} x {p.quantity} - ₹{p.price * p.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">Total: ₹{modalOrder.total}</p>
            <button
              onClick={() => setModalOrder(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagementPage;

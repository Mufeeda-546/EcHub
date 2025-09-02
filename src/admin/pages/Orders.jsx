import React, { useEffect, useState } from "react";

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
      const productNames = order.items
        .map((p) => p.name)
        .join(" ")
        .toLowerCase();

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
    const value = e.target.value;
    setSearchTerm(value);
    filterOrders(value, statusFilter);
  };

  const handleStatusFilter = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    filterOrders(searchTerm, value);
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

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "DELETE",
      });
      fetchOrders();
    } catch (err) {
      setError("Failed to delete order");
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Loading orders...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by Order ID, User, Product, Status or Payment"
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
                      <div key={p.id}>
                        {p.name} x {p.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="p-3 font-semibold">₹{order.total}</td>
                  <td className="p-3">{order.payment}</td>
                  <td className="p-3">
                    <select
                      value={order.status.toLowerCase()}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className={`border rounded px-2 py-1 ${
                        order.status.toLowerCase() === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status.toLowerCase() === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status.toLowerCase() === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="p-3">{order.date}</td>
                </tr>
              );
            })}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagementPage;

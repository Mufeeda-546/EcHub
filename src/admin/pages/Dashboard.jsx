import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#d35400", "#8e44ad"];

const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, ordersRes, productsRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:3000/users"),
          fetch("http://localhost:3000/orders"),
          fetch("http://localhost:3000/products"),
          fetch("http://localhost:3000/categories"),
        ]);

        const [usersData, ordersData, productsData, categoriesData] = await Promise.all([
          usersRes.json(),
          ordersRes.json(),
          productsRes.json(),
          categoriesRes.json(),
        ]);

        setUsers(usersData);
        setOrders(ordersData);
        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-4">Loading dashboard...</p>;

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);

  const revenueTrend = orders
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((order) => ({
      date: order.date,
      total: Number(order.total),
    }))
    .reduce((acc, curr) => {
      const existing = acc.find((item) => item.date === curr.date);
      if (existing) existing.total += curr.total;
      else acc.push({ date: curr.date, total: curr.total });
      return acc;
    }, []);

 const barData = [
  { name: "Users", value: users.length },
  { name: "Orders", value: orders.length },
  { name: "Products", value: products.length },
  { name: "Categories", value: categories.length },
  { name: "Revenue (₹ in K)", value: Math.round(totalRevenue / 1000) },
];

  const pieData = categories
    .map((cat) => ({
      name: cat.name,
      value: products.filter((p) => p.category === cat.name).length,
    }))
    .filter((c) => c.value > 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-4 rounded shadow text-center">Total Users: {users.length}</div>
        <div className="bg-white p-4 rounded shadow text-center">Total Orders: {orders.length}</div>
        <div className="bg-white p-4 rounded shadow text-center">Total Products: {products.length}</div>
        <div className="bg-white p-4 rounded shadow text-center">Total Categories: {categories.length}</div>
        <div className="bg-white p-4 rounded shadow text-center">Total Revenue: ₹{totalRevenue}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow h-96">
          <h3 className="font-semibold mb-2 text-center">Counts Overview</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow h-96 flex flex-col items-center justify-center">
          <h3 className="font-semibold mb-2 text-center">Products by Category</h3>
          <ResponsiveContainer width="100%" height="90%">
    <PieChart>
  <Pie
    data={pieData}
    dataKey="value"
    nameKey="name"
    cx="40%"  
    cy="50%"
    outerRadius="80%"
    fill="#8884d8"
    label
  >
    {pieData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>

  <Legend
    layout="vertical"
    align="right"
    verticalAlign="middle"
  />
</PieChart>


          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow h-96">
        <h3 className="font-semibold mb-2 text-center">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={revenueTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded shadow overflow-auto">
        <h3 className="font-semibold mb-2 text-center">Recent Orders</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Status</th>
              <th className="p-2">Total</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(-5).map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{users.find((u) => u.id === order.userId)?.name || "Unknown"}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">₹{order.total}</td>
                <td className="p-2">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;

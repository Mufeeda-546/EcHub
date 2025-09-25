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

// Reusable card component
const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow text-center">
    <h4 className="text-gray-600">{title}</h4>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

// Reusable Bar Chart
const RevenueBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="90%">
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip formatter={(value) => `₹${value}`} />
      <Legend />
      <Bar dataKey="total">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

// Reusable Pie Chart
const CategoryPieChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="90%">
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius="80%"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend layout="vertical" align="right" verticalAlign="middle" />
    </PieChart>
  </ResponsiveContainer>
);

// Reusable Line Chart
const StatusLineChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="90%">
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="status" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
);

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

  // Last 7 days for revenue chart
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0];
  }).reverse();

  const revenueLast7Days = last7Days.map((day) => ({
    date: day,
    total: orders.filter((o) => o.date === day).reduce((sum, o) => sum + Number(o.total), 0),
  }));

  const productsByCategory = categories
    .map((cat) => ({
      name: cat.name,
      value: products.filter((p) => p.category === cat.name).length,
    }))
    .filter((c) => c.value > 0);

  const orderStatusData = Object.entries(
    orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([status, value]) => ({ status, value }));

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);

  const stats = [
    { title: "Total Users", value: users.length },
    { title: "Total Orders", value: orders.length },
    { title: "Total Products", value: products.length },
    { title: "Total Categories", value: categories.length },
    { title: "Total Revenue", value: `₹${totalRevenue}` },
  ];

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} title={stat.title} value={stat.value} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow h-96">
          <h3 className="font-semibold mb-2 text-center">Revenue - Last 7 Days</h3>
          <RevenueBarChart data={revenueLast7Days} />
        </div>

        <div className="bg-white p-4 rounded shadow h-96 flex flex-col items-center justify-center">
          <h3 className="font-semibold mb-2 text-center">Products by Category</h3>
          <CategoryPieChart data={productsByCategory} />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow h-96">
        <h3 className="font-semibold mb-2 text-center">Orders Count by Status</h3>
        <StatusLineChart data={orderStatusData} />
      </div>

      {/* Recent orders table */}
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

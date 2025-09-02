import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

const menuItems = [
  { to: "/admin", label: "Dashboard", icon: <FaTachometerAlt /> },
  { to: "/admin/users", label: "Users", icon: <FaUsers /> },
  { to: "/admin/products", label: "Products", icon: <FaBoxOpen /> },
  { to: "/admin/orders", label: "Orders", icon: <FaShoppingCart /> },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const getTopbarContent = () => {
    if (location.pathname === "/admin") return { title: "Dashboard", subtitle: "Welcome back to EcHub Admin panel! 👋" };
    if (location.pathname.includes("/admin/users")) return { title: "Users", subtitle: "Manage all registered users" };
    if (location.pathname.includes("/admin/products")) return { title: "Products", subtitle: "Manage all products" };
    if (location.pathname.includes("/admin/orders")) return { title: "Orders", subtitle: "Track and update orders" };
    return { title: "", subtitle: "" };
  };

  const { title, subtitle } = getTopbarContent();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-lg">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold mb-1">EcHub</h2>
          <p className="text-gray-300 text-sm">Hello, Admin 👋</p>
        </div>

        <nav className="flex-1 px-2 mt-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/admin"}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-700 flex items-center gap-3 px-4 py-3 rounded-lg font-medium"
                      : "flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-lg transition"
                  }
                >
                  {item.icon} {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md flex flex-col justify-center items-center h-28 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-800">{title}</h1>
          {subtitle && (
            <p className="text-gray-500 text-lg mt-2 text-center px-4 max-w-2xl">
              {subtitle}
            </p>
          )}
        </header>

        <main className="flex-1 p-8 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

import React, { useEffect, useState } from "react";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    status: "active",
  });
  const [editing, setEditing] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredUsers(
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(value) ||
          u.email.toLowerCase().includes(value) ||
          u.phone.toLowerCase().includes(value) ||
          u.role.toLowerCase().includes(value) ||
          u.address.toLowerCase().includes(value)
      )
    );
  };

  // Add or Update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await fetch(`http://localhost:3000/users/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, id: Date.now().toString() }),
        });
      }
      setFormData({
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        role: "",
        status: "active",
      });
      setEditing(false);
      fetchUsers();
    } catch (err) {
      setError("Failed to save user");
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setFormData(user);
    setEditing(true);
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    try {
      await fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  // Block/Unblock user
  const handleBlockToggle = async (user) => {
    const updatedStatus = user.status === "active" ? "blocked" : "active";
    try {
      await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: updatedStatus }),
      });
      fetchUsers();
    } catch (err) {
      setError("Failed to update status");
    }
  };

  if (loading) return <p className="p-4">Loading users...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="space-y-6 p-4">
      {/* User Form */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">
          {editing ? "Edit User" : "Add New User"}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            placeholder="Phone Number"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            placeholder="Address"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="role"
            value={formData.role}
            placeholder="Role (admin/user)"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
          <button
            type="submit"
            className="col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {editing ? "Update User" : "Add User"}
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="flex justify-end">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, email, phone, role, or address"
          className="border p-2 rounded w-full md:w-1/3 mb-2"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white p-6 rounded shadow overflow-auto">
        <h3 className="text-xl font-semibold mb-4">All Users</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Address</th>
              <th className="p-2">Role</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.phone}</td>
                <td className="p-2">{user.address}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">{user.status}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${
                      user.status === "active" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    } text-white p-1 rounded`}
                    onClick={() => handleBlockToggle(user)}
                  >
                    {user.status === "active" ? "Block" : "Unblock"}
                  </button>
                  <button
                    className="bg-gray-500 text-white p-1 rounded hover:bg-gray-600"
                    onClick={() => handleDelete(user.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;

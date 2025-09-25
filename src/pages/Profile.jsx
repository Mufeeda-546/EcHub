// pages/ProfilePage.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ProfilePage = () => {
  const { user, updateUser, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = async () => {
    try {
      if (newPassword && newPassword !== confirmPassword) {
        alert("New passwords do not match!");
        return;
      }

      const updatedUser = {
        ...user,
        name,
        email,
        password: newPassword ? newPassword : user.password,
      };

      await axios.put(`https://backend-w1xu.onrender.com/users/${user.id}`, updatedUser);

      updateUser(updatedUser);

      alert("Profile updated successfully!");
      setIsEditing(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Something went wrong while updating profile.");
    }
  };

  if (!user) {
    return <p className="text-center mt-10 text-red-500">Please log in first.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      {!isEditing ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Profile</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Edit Profile
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

          <label className="block mb-2 font-semibold">Name</label>
          <input
            className="w-full border p-2 rounded mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block mb-2 font-semibold">Email</label>
          <input
            className="w-full border p-2 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-lg font-bold mt-4 mb-2">Change Password</h3>

          <label className="block mb-2 font-semibold">Current Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded mb-4"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <label className="block mb-2 font-semibold">New Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label className="block mb-2 font-semibold">Confirm New Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded mb-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

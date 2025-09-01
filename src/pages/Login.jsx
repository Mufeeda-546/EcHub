import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/users?email=${encodeURIComponent(email.trim())}&password=${encodeURIComponent(password.trim())}`
      );

      if (res.data.length === 0) {
        alert("Invalid credentials");
        return;
      }

      const foundUser = res.data[0];

      if (foundUser.status === "blocked") {
        alert("Your account is blocked.");
        return;
      }

      login(foundUser); // Save to context & localStorage

      alert("Login successful!");

      if (foundUser.role === "admin") navigate("/admin");
      else navigate(redirectPath, { replace: true });

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

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
        `https://backend-w1xu.onrender.com/users?email=${encodeURIComponent(
          email.trim()
        )}&password=${encodeURIComponent(password.trim())}`
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

      login(foundUser);
      alert("Login successful!");

      if (foundUser.role === "admin") navigate("/admin");
      else navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-green-50 to-green-100">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 transform transition-transform duration-500 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-green-700 text-center mb-6">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-green-600 font-medium cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

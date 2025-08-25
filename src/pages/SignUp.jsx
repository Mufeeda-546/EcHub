import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // get user from context

  // If user already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate("/"); 
    }
  }, [user, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }
    if (confirmPassword !== password) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:3000/users", {
        name,
        email,
        password,
      });
      alert("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
          Create Account
        </h2>
        <form onSubmit={handleSignup} className="flex flex-col">
          <input
            className="border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            className="border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            className="border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />

          {/* Hide SignUp button if already logged in */}
          {!user && (
            <button
              type="submit"
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          )}
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;

import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!name || !email || !password || !confirmPassword || !phone || !place || !address || !pincode) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Check if email already exists
      const existing = await axios.get(
        `http://localhost:3000/users?email=${encodeURIComponent(email.trim())}`
      );
      if (existing.data.length > 0) {
        alert("Email already exists");
        return;
      }

      // Save user to JSON Server
      await axios.post("http://localhost:3000/users", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        phone: phone.trim(),
        place: place.trim(),
        address: address.trim(),
        pincode: pincode.trim(),
        role: "user",
        status: "active"
      });

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSignup} className="flex flex-col">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"/>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"/>
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"/>
          <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"/>
          <input type="text" placeholder="Place" value={place} onChange={(e) => setPlace(e.target.value)} className="border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"/>
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"/>
          <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className="border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"/>
          <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Sign Up</button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-green-600 cursor-pointer hover:underline">Login</span>
        </p>
      </div>
    </div>
  );
}

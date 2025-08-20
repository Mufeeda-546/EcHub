import React from "react";
import { useNavigate } from "react-router-dom";
// import {link}from "react-router-dom"

const Navbar = () => {
  const navigate=useNavigate()
  return (
    <nav className="bg-[#fdf6ee]  shadow-md px-6 py-0 flex justify-between items-center">
      <div className="flex items-center gap-1">
        <img 
          src="src/assets/EcHub .jpg"
          alt="EcHub logo"
          className="h-15 w-15 rounded-full object-cover"
        />
        <h1 className="text-xl font-bold text-green-700">EcHub</h1>
      </div>

      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li>
          <a href="#" className="hover:text-green-600 transition">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-green-600 transition">
            About
          </a>
        </li>
      </ul>

      <button onClick={()=>navigate("/signup")}className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">
        Sign Up
      </button>
    </nav>
  );
};

export default Navbar;



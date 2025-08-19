import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#fdf6ee]  shadow-md px-6 py-0 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center gap-1">
        <img 
          src="src/assets/EcHub .jpg"
          alt="EcHub logo"
          className="h-15 w-15 rounded-full object-cover"
        />
        <h1 className="text-xl font-bold text-green-700">EcHub</h1>
      </div>

      {/* Navigation Links */}
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

      {/* Signup Button */}
      <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">
        Sign Up
      </button>
    </nav>
  );
};

export default Navbar;



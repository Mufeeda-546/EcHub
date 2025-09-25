import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const FooterSection = () => {
  return (
    <footer className=" bg-[#3E482A] text-white pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">EcHub</h2>
          <p className="text-sm mb-4">
            Your hub for eco-friendly and sustainable essentials.  
            Live green, shop smart. 🌱
          </p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="text-xl hover:text-gray-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="text-xl hover:text-gray-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="text-xl hover:text-gray-300" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="/products" className="hover:text-gray-300">Products</a></li>
            <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-gray-300">FAQs</a></li>
            <li><a href="/returns" className="hover:text-gray-300">Returns & Refunds</a></li>
            <li><a href="/privacy" className="hover:text-gray-300">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-gray-300">Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Join Our Newsletter</h3>
          <p className="text-sm mb-3">Get eco-friendly updates and exclusive offers!</p>
          <form className="flex items-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-3 py-2 rounded-l-md text-gray-700 focus:outline-none"
            />
            <button 
              type="submit" 
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-md"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-500 mt-8 pt-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} EcHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterSection;

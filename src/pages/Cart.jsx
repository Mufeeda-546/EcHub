import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login to checkout");
      navigate("/login", { state: { from: "/cart" } });
    } else {
      navigate("/order");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F9FBE8]">
        <h2 className="text-3xl font-bold text-gray-600 tracking-wide">
          Your cart is empty 🛒
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FBE8]">
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-gray-800 text-center tracking-tight">
          Your Shopping Cart
        </h2>

        <div className="space-y-8 ">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center md:justify-between bg-[#F2F5D9] backdrop-blur-lg shadow-xl rounded-3xl p-6 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-2xl shadow-md"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 mt-1 text-lg font-medium">
                    ₹{item.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6 md:mt-0">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded-full shadow hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 font-semibold hover:text-red-700 mt-6 md:mt-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-white/80 backdrop-blur-lg border border-green-100 p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            Total: <span className="text-green-700">₹{totalPrice}</span>
          </h3>
          <button
            onClick={handleCheckout}
            className="mt-6 md:mt-0 md:ml-6 bg-gradient-to-r from-[#556B2F] to-[#6B8E23] text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

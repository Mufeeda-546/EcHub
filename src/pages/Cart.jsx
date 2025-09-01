// src/pages/CartPage.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
      </div>
    );
  }

  // ✅ Checkout logic with login check
  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login to checkout");
      navigate("/login", { state: { from: "/cart" } });
    } else {
      navigate("/order"); // Goes to Order Page
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQty(item.id)}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-lg font-semibold">{item.quantity}</span>
              <button
                onClick={() => increaseQty(item.id)}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 font-medium hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700">
          Total: ₹{totalPrice}
        </h3>
        <button
          onClick={handleCheckout}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;

import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/ordercontext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const { cart, totalPrice } = useContext(CartContext);
  const { placeOrder } = useContext(OrderContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }
    if (!address) {
      alert("Please enter your delivery address");
      return;
    }

    const order = await placeOrder(cart, address, payment);

    if (order) {
      localStorage.removeItem(`user_cart_${user.id}`);
      navigate("/order-success", { state: { order } });
    }
  };

  if (cart.length === 0) {
    return <h2 className="text-center mt-10">Your cart is empty</h2>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-3">Order Summary</h3>
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mt-4">Total: ₹{totalPrice}</h3>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-3">Delivery Address</h3>
        <textarea
          className="w-full border p-2 rounded"
          rows="3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-3">Payment Method</h3>
        <select
          className="border p-2 rounded w-full"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        >
          <option value="cod">Cash on Delivery</option>
          <option value="card">Credit/Debit Card</option>
          <option value="upi">UPI</option>
        </select>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderPage;

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
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#F9FBE8]">
        <h2 className="text-2xl font-semibold text-gray-600">
          Your cart is empty 🛒
        </h2>
        <button
          onClick={() => navigate("/products")}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F9FBE8]">
      <div className="p-6 md:p-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
         
          <div className="md:col-span-2 space-y-8">
        
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
                🏠 Delivery Address
              </h3>
              <textarea
                className="w-full border border-gray-200 focus:ring-2 focus:ring-green-500 p-3 rounded-xl resize-none text-gray-700"
                rows="4"
                placeholder="Enter your full address with landmark"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
                💳 Payment Method
              </h3>
              <div className="space-y-4">
                {[
                  { value: "cod", label: "Cash on Delivery" },
                  { value: "card", label: "Credit / Debit Card" },
                  { value: "upi", label: "UPI" },
                ].map((method) => (
                  <label
                    key={method.value}
                    className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-green-50 transition"
                  >
                    <input
                      type="radio"
                      value={method.value}
                      checked={payment === method.value}
                      onChange={(e) => setPayment(e.target.value)}
                      className="accent-green-600"
                    />
                    <span className="text-gray-700">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="md:sticky md:top-8 self-start">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                🛍️ Review & Summary
              </h3>

              <div className="max-h-64 overflow-y-auto pr-2">
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-xl hover:shadow-md transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                          📦
                        </div>
                        <div>
                          <p className="text-gray-800 font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900">
                        ₹{item.price * item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex justify-between text-lg font-bold text-gray-900">
                <span>Total:</span>
                <span className="text-green-600">₹{totalPrice}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-transform"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

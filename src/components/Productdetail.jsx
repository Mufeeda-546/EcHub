import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/wishlistcontext";
import { OrderContext } from "../context/ordercontext";
import Navbar from "./Navbar";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { placeOrder } = useContext(OrderContext);

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!product) {
      fetch(`https://backend-w1xu.onrender.com/products/${id}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch product");
          return res.json();
        })
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }
  }, [id, product]);

  if (loading) return <p className="text-center mt-20 text-gray-400 text-lg">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500 text-lg">{error.message}</p>;
  if (!product) return <p className="text-center mt-20 text-gray-400 text-lg">Product not found</p>;

  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleBuyNow = () => navigate("/order");

  return (
    <div className="bg-[#F9FBE8] min-h-screen">
      <Navbar />

      <div className="flex justify-center mt-12 px-4">
        <div className="max-w-6xl w-full flex flex-col md:flex-row gap-10 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transition-transform hover:scale-[1.01]">
          <div className="relative w-full md:w-1/2 flex items-center justify-center overflow-hidden rounded-2xl shadow-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl transition-transform transform hover:scale-105 duration-500"
            />
            <button
              onClick={() => toggleWishlist({ ...product }, navigate)}
              className="absolute top-4 right-4 text-red-500 text-3xl p-2 rounded-full bg-white/90 shadow-lg hover:scale-125 transition-transform"
            >
              <FontAwesomeIcon icon={isInWishlist ? solidHeart : regularHeart} />
            </button>
          </div>

          <div className="flex flex-col justify-between w-full md:w-1/2">
            <div>
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-3xl text-green-600 font-bold mb-6">₹{product.price}</p>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">{product.description || "No description available."}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <button
                onClick={() => {
                  const success = addToCart({ ...product });
                  if (!success && !user) {
                    navigate("/login", { state: { from: location.pathname } });
                  }
                }}
                className="flex-1 py-4 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white font-semibold rounded-2xl shadow-xl hover:scale-105 transform transition-all"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 bg-gradient-to-r from-orange-400 via-amber-500 to-red-500 text-white font-semibold rounded-2xl shadow-xl hover:scale-105 transform transition-all hover:from-orange-500 hover:via-amber-600 hover:to-red-600"
              >
                Buy Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

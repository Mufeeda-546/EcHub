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
      fetch(`http://localhost:3000/products/${id}`)
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

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error.message}</p>;
  if (!product) return <p className="text-center mt-10 text-gray-500">Product not found</p>;

  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleBuyNow = () => {
    navigate("/order");
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-10 px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl w-full flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 w-full md:w-1/2 relative">
            <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-lg shadow-sm" />
            <button
              onClick={() => toggleWishlist({ ...product }, navigate)}
              className="absolute top-2 right-2 text-red-500 text-2xl transition-transform transform hover:scale-125"
            >
              <FontAwesomeIcon icon={isInWishlist ? solidHeart : regularHeart} />
            </button>
          </div>

          <div className="flex flex-col justify-between w-full md:w-1/2">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
              <p className="text-xl text-green-600 font-semibold mb-4">Price: ₹{product.price}</p>
              <p className="text-gray-700 mb-6">{product.description || "No description available"}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  const success = addToCart({ ...product });
                  if (!success && !user) {
                    navigate("/login", { state: { from: location.pathname } });
                  }
                }}
                className="flex-1 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
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

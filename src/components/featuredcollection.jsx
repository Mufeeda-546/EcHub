import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FeaturedCollection = ({ products }) => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setFeaturedProducts(products.slice(31, 37)); // show first 8
    }
  }, [products]);

  if (!featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      {/* Title */}
      <h2 className="text-2xl font-bold text-green-700 mb-6 px-4">
        Featured Collection
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 w-full px-2">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer overflow-hidden"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-44 object-cover"
            />

            {/* Info */}
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800 truncate">
                {product.name}
              </h3>
              <p className="text-green-600 font-bold text-sm mt-1">
                ₹{product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollection;

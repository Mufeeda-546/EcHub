import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FeaturedCollection = ({ products }) => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setFeaturedProducts(products.slice(0, 6));
    }
  }, [products]);

  if (!featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          Featured Collection
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-x-6  ">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-green-600 font-medium">₹{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;

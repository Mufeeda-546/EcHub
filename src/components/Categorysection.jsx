import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <section className="  py-10 bg-gray-50">
      <h2 className=" text-2xl font-bold text-green-700 mb-6 px-4">
        Shop by Category
      </h2>

      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 px-4 ">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() =>
              navigate(`/category/${encodeURIComponent(category.name)}`)
            }
            className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-lg  transition-transform"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover"
            />
            <h3 className="text-sm font-semibold text-gray-800 text-center py-3">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;

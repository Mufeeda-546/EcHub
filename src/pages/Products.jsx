import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const Products = ({ wishlist, setWishlist }) => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("https://backend-w1xu.onrender.com/products");
        setProducts(data || []);
        setFilteredProducts(data || []);

        const uniqueCategories = [
          "All",
          ...Array.from(new Set(data.map((p) => p.category).filter(Boolean))),
        ];
        setCategories(uniqueCategories);

        if (name) setSelectedCategory(name);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [name]);

  // Filter, search, and sort
  useEffect(() => {
    let filtered = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (sortOption === "az") filtered.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortOption === "za") filtered.sort((a, b) => b.name.localeCompare(a.name));

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, sortOption, products]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-[#F9FBE8]">
      <Navbar wishlist={wishlist} cart={JSON.parse(localStorage.getItem("cart")) || []} />

      <div className="flex flex-wrap gap-3 p-3 justify-between items-center bg-[#F5F5DC] rounded-2xl shadow-md mb-8 mx-4 md:mx-8">
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search products..."
    className="flex-1 min-w-[180px] p-2.5 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-[#C5D6A7] focus:outline-none transition-all duration-300 placeholder-gray-400"
  />

  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="p-2.5 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-[#C5D6A7] focus:outline-none transition-all duration-300"
  >
    {categories.map((cat, idx) => (
      <option key={idx} value={cat}>
        {cat}
      </option>
    ))}
  </select>

  <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    className="p-2.5 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-[#C5D6A7] focus:outline-none transition-all duration-300"
  >
    <option value="">Sort</option>
    <option value="az">A → Z</option>
    <option value="za">Z → A</option>
  </select>
</div>



      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 md:px-8 pb-8">
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} wishlist={wishlist} setWishlist={setWishlist} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg mt-10">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;

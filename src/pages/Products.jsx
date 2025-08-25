import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Products = ({ wishlist, setWishlist }) => {
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
        const res = await axios.get("http://localhost:3000/products");
        setProducts(res.data || []);
        setFilteredProducts(res.data || []);

        const uniqueCategories = [
          "All",
          ...Array.from(new Set((res.data || []).map((p) => p.category).filter(Boolean))),
        ];
        setCategories(uniqueCategories);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (searchQuery.trim() !== "") {
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

    if (sortOption === "az") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "za") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, sortOption, products]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Navbar wishlist={wishlist} cart={JSON.parse(localStorage.getItem("cart")) || []} />

      <div className="flex flex-wrap gap-4 p-4 justify-between items-center bg-gray-100 rounded-lg shadow">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="border p-2 rounded-lg flex-1 min-w-[200px]"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded-lg"
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
          className="border p-2 rounded-lg"
        >
          <option value="">Sort</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              image={p.image}
              description={p.description}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;

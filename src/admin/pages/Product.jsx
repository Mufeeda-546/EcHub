import React, { useEffect, useState } from "react";

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    currency: "INR",
    category: "",
    stock: "",
    description: "",
    image: "",
  });
  const [editing, setEditing] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/products");
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredProducts(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(value) ||
          p.category.toLowerCase().includes(value)
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await fetch(`http://localhost:3000/products/${formData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch("http://localhost:3000/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, id: Date.now().toString() }),
        });
      }
      setFormData({
        id: "",
        name: "",
        price: "",
        currency: "INR",
        category: "",
        stock: "",
        description: "",
        image: "",
      });
      setEditing(false);
      fetchProducts();
    } catch (err) {
      setError("Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  if (loading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="space-y-6 p-4">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">
          {editing ? "Edit Product" : "Add New Product"}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Product Name"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            placeholder="Price"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            placeholder="Category"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            placeholder="Stock Quantity"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            placeholder="Image URL"
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
          />
          <textarea
            name="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
          />
          <button
            type="submit"
            className="col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {editing ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      <div className="flex justify-end">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name or category"
          className="border p-2 rounded w-full md:w-1/3 mb-2"
        />
      </div>

      <div className="bg-white p-6 rounded shadow overflow-auto">
        <h3 className="text-xl font-semibold mb-4">All Products</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">ID</th>
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Category</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Description</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-2">{product.id}</td>
                <td className="p-2">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="p-2">{product.name}</td>
                <td className="p-2">₹{product.price}</td>
                <td className="p-2">{product.category}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2">{product.description}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagementPage;

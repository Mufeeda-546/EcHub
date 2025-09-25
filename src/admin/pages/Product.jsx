import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
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
      if (editingProduct) {
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
      setEditingProduct(null);
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      setError("Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingProduct(product);
    setShowModal(true);
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
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name or category"
        className="border p-2 rounded w-full md:w-1/3 mb-2"
      />

      <div className="bg-white p-6 rounded shadow overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Image</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Category</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 border-b">
                <td className="p-2">{product.id}</td>
                <td className="p-2">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="p-2">{product.name}</td>
                <td className="p-2">₹{product.price}</td>
                <td className="p-2">{product.category}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 p-1 text-white rounded hover:bg-yellow-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 p-1 text-white rounded hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-xl">
            <h3 className="text-xl font-semibold mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
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
              <div className="col-span-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditingProduct(null); }}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagementPage;

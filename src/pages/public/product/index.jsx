import React, { useState, useEffect } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../../_services/product";

function Product() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    stock: "",
    price: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ==========================
  // FETCH PRODUCTS
  // ==========================
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.log("🔒 User belum login — skip fetch products");
        return;
      }

      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ==========================
  // FORM CHANGE
  // ==========================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ==========================
  // CREATE / UPDATE SUBMIT
  // ==========================
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editId) {
      // UPDATE
      await updateProduct(editId, formData);

      setProducts(products.map((p) =>
        p.id === editId ? { ...p, ...formData } : p
      ));

      setEditId(null);
    } else {
      // CREATE
      const newProduct = await createProduct(formData);
      setProducts([...products, newProduct]);
    }

    // CLEAR FORM
    setFormData({
      name: "",
      stock: "",
      price: "",
      description: "",
    });

  } catch (error) {
    console.error("❌ Failed to save product:", error);
  }
};


  // ==========================
  // DELETE
  // ==========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("❌ Failed to delete product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white flex justify-center py-10 px-4">
      <div className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-lg border border-blue-100">

        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          Product Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ========================== */}
          {/* FORM SECTION */}
          {/* ========================== */}
          <form onSubmit={handleSubmit} className="space-y-5 bg-blue-50 p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Enter product name"
                className="p-3 border rounded-xl focus:ring focus:ring-blue-300 outline-none"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                placeholder="Enter stock"
                className="p-3 border rounded-xl focus:ring focus:ring-blue-300 outline-none"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                placeholder="Enter price"
                className="p-3 border rounded-xl focus:ring focus:ring-blue-300 outline-none"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                placeholder="Enter description"
                className="p-3 border rounded-xl min-h-[80px] focus:ring focus:ring-blue-300 outline-none"
                onChange={handleChange}
                required
              />
            </div>

            <button className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-xl text-lg font-semibold shadow hover:shadow-xl transition-all">
              {editId ? "Update Product" : "Save Product"}
            </button>
          </form>

          {/* ========================== */}
          {/* TABLE SECTION */}
          {/* ========================== */}
          <div className="overflow-auto">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">Product List</h2>

            {loading ? (
              <p className="text-gray-500 text-center py-4">Loading...</p>
            ) : (
              <table className="w-full text-left border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-green-100 text-gray-700 font-medium">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Price</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center p-3 text-gray-500">
                        No products yet
                      </td>
                    </tr>
                  ) : (
                    products.map((p) => (
                      <tr key={p.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{p.name}</td>
                        <td className="p-3">{p.stock}</td>
                        <td className="p-3">Rp {p.price}</td>

                        <td className="p-3 flex justify-center gap-2">
                          <button
                            className="text-blue-600 font-medium hover:underline"
                            onClick={() => {
                              setFormData({
                                name: p.name,
                                stock: p.stock,
                                price: p.price,
                                description: p.description,
                              });
                              setEditId(p.id);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className="text-red-600 font-medium hover:underline"
                            onClick={() => handleDelete(p.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Product;

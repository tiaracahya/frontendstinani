import React, { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../_services/product";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    stock: "",
    price: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);

  // ==========================
  // FETCH DATA
  // ==========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("❌ Gagal fetch produk:", err);
      }
    };

    fetchData();
  }, []);

  // ==========================
  // FORM HANDLER
  // ==========================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ==========================
  // SUBMIT CREATE / UPDATE
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateProduct(editId, formData);
        setProducts(
          products.map((p) =>
            p.id === editId ? { ...p, ...formData } : p
          )
        );
        setEditId(null);
      } else {
        const newProduct = await createProduct(formData);
        setProducts([...products, newProduct]);
      }

      // reset
      setFormData({
        name: "",
        stock: "",
        price: "",
        description: "",
      });
    } catch (err) {
      console.error("❌ Gagal simpan produk:", err);
    }
  };

  // ==========================
  // DELETE
  // ==========================
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus produk?")) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("❌ Gagal hapus:", err);
    }
  };

  return (
    <div className="p-6">

      {/* TITLE */}
      <h1 className="text-xl font-bold mb-4">Manajemen Stok Produk</h1>

      {/* FORM INPUT */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="font-semibold mb-3">
          {editId ? "Edit Produk" : "Tambah Produk"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nama produk"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stok"
            value={formData.stock}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Harga"
            value={formData.price}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Deskripsi"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>

        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? "Update Produk" : "Simpan Produk"}
        </button>
      </form>

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th>No</th>
            <th>Nama Produk</th>
            <th>Stok</th>
            <th>Harga</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td className="text-center p-3" colSpan="6">
                Belum ada produk
              </td>
            </tr>
          ) : (
            products.map((p, i) => (
              <tr key={p.id} className="text-center border-b">
                <td>{i + 1}</td>
                <td>{p.name}</td>
                <td>{p.stock}</td>
                <td>Rp {p.price}</td>
                <td>{p.description}</td>

                <td className="flex justify-center gap-3 py-2">
                  <button
                    className="text-blue-600 hover:underline"
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
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(p.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}

export default ProductPage;


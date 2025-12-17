import React, { useState, useEffect } from "react";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../_services/product";
import { productImageStorage } from "../../../_api";

function Product() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    stock: "",
    price: "",
    description: "",
    photo: null,
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ==========================
  // AMBIL DATA PRODUK
  // ==========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProduct();
        setProducts(data);
      } catch (err) {
        console.error("Gagal mengambil data produk:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ==========================
  // HANDLE INPUT
  // ==========================
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ==========================
  // SIMPAN / UPDATE PRODUK
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("stock", formData.stock);
      data.append("price", formData.price);
      data.append("description", formData.description);
      if (formData.photo) data.append("photo", formData.photo);

      if (editId) {
        const updated = await updateProduct(editId, data);
        setProducts(products.map((p) => (p.id === editId ? updated.data : p)));
        setEditId(null);
      } else {
        const newProduct = await createProduct(data);
        setProducts([...products, newProduct.data]);
      }

      setFormData({
        name: "",
        stock: "",
        price: "",
        description: "",
        photo: null,
      });
    } catch (error) {
      console.error("Gagal menyimpan produk:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // HAPUS PRODUK
  // ==========================
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah yakin ingin menghapus produk ini?")) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
    }
  };

  // ==========================
  // PILIH EDIT
  // ==========================
  const handleEdit = (p) => {
    setFormData({
      name: p.name,
      stock: p.stock,
      price: p.price,
      description: p.description,
      photo: null,
    });
    setEditId(p.id);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">
            Manajemen Produk
          </h1>
          <p className="text-slate-500 mt-1">
            Kelola data produk, stok, harga, dan foto
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* FORM */}
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">
              {editId ? "Edit Produk" : "Tambah Produk"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Nama Produk" name="name" value={formData.name} onChange={handleChange} />
              <Input label="Stok" name="stock" type="number" value={formData.stock} onChange={handleChange} />
              <Input label="Harga" name="price" type="number" value={formData.price} onChange={handleChange} />

              <div>
                <label className="text-sm text-slate-600">Deskripsi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                  rows="3"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Foto Produk</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full mt-1 p-2 border rounded-lg"
                />
              </div>

              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                {editId ? "Perbarui Produk" : "Simpan Produk"}
              </button>
            </form>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">
              Daftar Produk
            </h2>

            {loading ? (
              <p className="text-center text-slate-500">Memuat data...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="p-3 text-left">Foto</th>
                      <th className="p-3 text-left">Nama</th>
                      <th className="p-3 text-left">Stok</th>
                      <th className="p-3 text-left">Harga</th>
                      <th className="p-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="p-4 text-center text-slate-400">
                          Belum ada produk
                        </td>
                      </tr>
                    ) : (
                      products.map((p) => (
                        <tr key={p.id} className="border-b hover:bg-slate-50">
                          <td className="p-3">
                            {p.photo && (
                              <img
                                src={`${productImageStorage}/${p.photo}`}
                                alt={p.name}
                                className="w-14 h-14 object-cover rounded"
                              />
                            )}
                          </td>
                          <td className="p-3">{p.name}</td>
                          <td className="p-3">{p.stock}</td>
                          <td className="p-3">
                            Rp {Number(p.price).toLocaleString("id-ID")}
                          </td>
                          <td className="p-3 text-center space-x-2">
                            <button
                              onClick={() => handleEdit(p)}
                              className="text-blue-600 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="text-red-600 hover:underline"
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
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

/* =====================
   KOMPONEN INPUT
===================== */
const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-slate-600">{label}</label>
    <input
      {...props}
      className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
      required
    />
  </div>
);

export default Product;


import React, { useState, useEffect } from "react";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../_services/product";
import { productImageStorage } from "../../../_api";

function ProductPage() {
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
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProduct();
        setProducts(data);
      } catch (err) {
        console.error("❌ Gagal mengambil data produk:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
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
  // SIMPAN / UPDATE
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
        const created = await createProduct(data);
        setProducts([...products, created.data]);
      }

      setFormData({
        name: "",
        stock: "",
        price: "",
        description: "",
        photo: null,
      });
    } catch (error) {
      console.error("❌ Gagal menyimpan produk:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // HAPUS PRODUK
  // ==========================
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("❌ Gagal menghapus produk:", error);
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
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* HEADER */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-slate-800">
            Manajemen Produk
          </h1>
          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
            Stok & Harga
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-1 bg-slate-50 border rounded-2xl p-6 space-y-5"
          >
            <h2 className="text-lg font-semibold text-slate-700">
              {editId ? "Edit Produk" : "Tambah Produk"}
            </h2>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Nama Produk
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama produk"
                className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Stok
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Jumlah stok"
                className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Harga
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Harga produk"
                className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Deskripsi
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Deskripsi singkat"
                className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Foto Produk
              </label>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                accept="image/*"
                className="mt-1 w-full p-2 border rounded-xl bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              {editId ? "Perbarui Produk" : "Simpan Produk"}
            </button>
          </form>

          {/* TABLE */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">
              Daftar Produk
            </h2>

            <div className="overflow-hidden border rounded-2xl">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="p-4">Foto</th>
                    <th className="p-4 text-left">Nama</th>
                    <th className="p-4">Stok</th>
                    <th className="p-4">Harga</th>
                    <th className="p-4 text-left">Deskripsi</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="p-6 text-center text-slate-500">
                        Memuat data...
                      </td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-6 text-center text-slate-500">
                        Belum ada produk
                      </td>
                    </tr>
                  ) : (
                    products.map((p) => (
                      <tr
                        key={p.id}
                        className="border-t hover:bg-slate-50 transition"
                      >
                        <td className="p-3">
                          {p.photo && (
                            <img
                              src={`${productImageStorage}/${p.photo}`}
                              alt={p.name}
                              className="w-16 h-16 object-cover rounded-xl"
                            />
                          )}
                        </td>
                        <td className="p-3">{p.name}</td>
                        <td className="p-3 text-center">{p.stock}</td>
                        <td className="p-3 text-center">
                          Rp {Number(p.price).toLocaleString("id-ID")}
                        </td>
                        <td className="p-3">{p.description}</td>
                        <td className="p-3 flex justify-center gap-3">
                          <button
                            onClick={() => handleEdit(p)}
                            className="px-4 py-1 rounded-full text-sm bg-blue-100 text-blue-700 hover:bg-blue-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="px-4 py-1 rounded-full text-sm bg-red-100 text-red-600 hover:bg-red-200"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;


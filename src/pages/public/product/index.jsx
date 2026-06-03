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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProduct();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "photo" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      if (editId) {
        const updated = await updateProduct(editId, data);
        setProducts(products.map(p => p.id === editId ? updated.data : p));
        setEditId(null);
      } else {
        const created = await createProduct(data);
        setProducts([...products, created.data]);
      }

      setFormData({ name: "", stock: "", price: "", description: "", photo: null });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus produk ini?")) return;
    await deleteProduct(id);
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Manajemen Produk
            </h1>
            <p className="text-slate-500 mt-1">
              Kelola produk, stok, harga, dan foto
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FORM */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow border p-6">
            <h2 className="text-lg font-semibold mb-4">
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
                  rows="3"
                  className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-300 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Foto Produk</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full mt-1 text-sm"
                />
              </div>

              <button
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
              >
                {editId ? "Update Produk" : "Simpan Produk"}
              </button>
            </form>
          </div>

          {/* TABLE */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow border p-6">
            <h2 className="text-lg font-semibold mb-4">Daftar Produk</h2>

            {loading ? (
              <p className="text-center text-slate-400 py-8">Memuat data...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="p-4 text-left">Produk</th>
                      <th className="p-4">Stok</th>
                      <th className="p-4">Harga</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center p-6 text-slate-400">
                          Belum ada produk
                        </td>
                      </tr>
                    ) : (
                      products.map(p => (
                        <tr key={p.id} className="border-b hover:bg-slate-50">
                          <td className="p-4 flex items-center gap-4">
                            {p.photo && (
                              <img
                                src={`${productImageStorage}/${p.photo}`}
                                className="w-12 h-12 rounded-lg object-cover"
                                alt={p.name}
                              />
                            )}
                            <span className="font-medium">{p.name}</span>
                          </td>
                          <td className="p-4 text-center">{p.stock}</td>
                          <td className="p-4 text-center">
                            Rp {Number(p.price).toLocaleString("id-ID")}
                          </td>
                          <td className="p-4 text-center space-x-3">
                            <button
                              onClick={() => handleEdit(p)}
                              className="text-blue-600 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="text-red-500 hover:underline"
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

/* INPUT */
const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-slate-600">{label}</label>
    <input
      {...props}
      required
      className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-300 outline-none"
    />
  </div>
);

export default Product;



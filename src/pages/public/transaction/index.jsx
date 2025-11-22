import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Transaction() {
  const navigate = useNavigate();
  const API_URL = "http://127.0.0.1:8000/api"; // GANTI sesuai backend

  const [salesId] = useState("S001"); 
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    product_id: "",
    qty: "",
    date: "",
    total: 0,
    price: 0,
  });

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setMessage("⚠️ Gagal memuat produk"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...form, [name]: value };

    if (name === "product_id") {
      const selected = products.find(p => p.id === parseInt(value));
      updated.price = selected?.price ?? 0;
    }

    updated.total = updated.price * (updated.qty || 0);
    setForm(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      sales_id: salesId,
      ...form,
    };

    try {
      const res = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("🎉 Transaksi berhasil disimpan!");
        setForm({ product_id: "", qty: "", date: "", total: 0, price: 0 });
      } else {
        setMessage("❌ Gagal menyimpan transaksi");
      }
    } catch {
      setMessage("❌ Kesalahan koneksi server");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-blue-200">

        {/* Header Informasi */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-green-700 text-transparent bg-clip-text drop-shadow-md">
            Input Transaksi Penjualan
          </h1>
          <p className="text-gray-600 mt-2">
            Masukkan data transaksi untuk pencatatan penjualan dan laporan.
          </p>
        </div>

        {message && (
          <div className="mb-4 p-3 text-center rounded-lg font-medium bg-blue-50 border border-blue-200 text-blue-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Sales ID */}
          <div>
            <label className="font-medium text-gray-700 mb-1">Sales ID</label>
            <input
              disabled
              value={salesId}
              className="w-full p-3 bg-gray-100 border rounded-xl cursor-not-allowed"
            />
          </div>

          {/* Produk */}
          <div>
            <label className="font-medium text-gray-700 mb-1">Produk</label>
            <select
              required
              name="product_id"
              value={form.product_id}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Pilih Produk</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — Rp {p.price.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Qty & Price */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="font-medium text-gray-700 mb-1">Jumlah</label>
              <input
                type="number"
                name="qty"
                required
                value={form.qty}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="font-medium text-gray-700 mb-1">Harga Satuan</label>
              <input
                disabled
                value={`Rp ${form.price.toLocaleString()}`}
                className="w-full p-3 bg-gray-100 border rounded-xl cursor-not-allowed"
              />
            </div>
          </div>

          {/* Tanggal */}
          <div>
            <label className="font-medium text-gray-700 mb-1">Tanggal Transaksi</label>
            <input
              required
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Total */}
          <div>
            <label className="font-medium text-gray-700 mb-1">Total Harga</label>
            <input
              disabled
              value={`Rp ${form.total.toLocaleString()}`}
              className="w-full p-3 bg-gray-100 border rounded-xl font-bold"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:opacity-90 transition-all"
            >
              Simpan Transaksi
            </button>

            <button
              type="button"
              onClick={() => navigate("/sales")}
              className="px-5 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium"
            >
              Sales
            </button>

            <button
              type="button"
              onClick={() => navigate("/product")}
              className="px-5 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium"
            >
              Produk
            </button>

            <button
              type="button"
              onClick={() => navigate("/reports")}
              className="px-5 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium"
            >
              Reports
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Transaction;

import React, { useState, useEffect } from "react";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "../../../_services/transaction";
import { getProduct } from "../../../_services/product";
import { getCustomer } from "../../../_services/customer";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    customer_id: "",
    product_id: "",
    qty: 0,
    date: "",
    price: 0,
    total: 0,
  });

  const [editId, setEditId] = useState(null);

  // ==========================
  // AMBIL DATA
  // ==========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProduct();
        const customersData = await getCustomer();
        const transactionsData = await getTransactions();

        setProducts(productsData);
        setCustomers(customersData);
        setTransactions(transactionsData);
      } catch (err) {
        setMessage("⚠️ Gagal memuat data transaksi");
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // ==========================
  // HELPER
  // ==========================
  const getCustomerName = (id) =>
    customers.find((c) => c.id === Number(id))?.name || "-";

  const getProductName = (id) =>
    products.find((p) => p.id === Number(id))?.name || "-";

  const getProductPrice = (id) =>
    products.find((p) => p.id === Number(id))?.price || 0;

  // ==========================
  // HANDLE INPUT
  // ==========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...form, [name]: value };

    if (name === "product_id") updated.price = getProductPrice(value);
    if (name === "qty") updated.qty = parseInt(value) || 0;

    updated.total = updated.price * (updated.qty || 0);
    setForm(updated);
  };

  // ==========================
  // SIMPAN / UPDATE
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.customer_id || !form.product_id || !form.qty || !form.date) {
      setMessage("⚠️ Semua field wajib diisi");
      return;
    }

    try {
      const payload = {
        customer_id: Number(form.customer_id),
        product_id: Number(form.product_id),
        quantity: Number(form.qty),
        date: form.date,
      };

      if (editId) {
        await updateTransaction(editId, payload);
        setTransactions(
          transactions.map((t) =>
            t.id === editId ? { ...t, ...payload, total: form.total } : t
          )
        );
        setMessage("✅ Transaksi berhasil diperbarui");
        setEditId(null);
      } else {
        const created = await createTransaction(payload);
        setTransactions([
          ...transactions,
          { ...created.data, total: form.total },
        ]);
        setMessage("✅ Transaksi berhasil ditambahkan");
      }

      setForm({
        customer_id: "",
        product_id: "",
        qty: 0,
        date: "",
        price: 0,
        total: 0,
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Gagal menyimpan transaksi");
    }
  };

  // ==========================
  // HAPUS
  // ==========================
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus transaksi ini?")) return;

    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter((t) => t.id !== id));
      setMessage("✅ Transaksi berhasil dihapus");
    } catch {
      setMessage("❌ Gagal menghapus transaksi");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* HEADER */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-slate-800">
            Manajemen Transaksi
          </h1>
          <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
            Penjualan
          </span>
        </div>

        {message && (
          <div className="mb-6 p-3 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-1 bg-slate-50 border rounded-2xl p-6 space-y-5"
          >
            <h2 className="text-lg font-semibold text-slate-700">
              {editId ? "Edit Transaksi" : "Tambah Transaksi"}
            </h2>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Customer
              </label>
              <select
                name="customer_id"
                value={form.customer_id}
                onChange={handleChange}
                className="mt-1 w-full p-3 border rounded-xl"
              >
                <option value="">Pilih Customer</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Produk
              </label>
              <select
                name="product_id"
                value={form.product_id}
                onChange={handleChange}
                className="mt-1 w-full p-3 border rounded-xl"
              >
                <option value="">Pilih Produk</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — Rp{" "}
                    {Number(p.price).toLocaleString("id-ID")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Jumlah
              </label>
              <input
                type="number"
                name="qty"
                value={form.qty}
                onChange={handleChange}
                className="mt-1 w-full p-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Total Harga
              </label>
              <input
                disabled
                value={`Rp ${Number(form.total).toLocaleString("id-ID")}`}
                className="mt-1 w-full p-3 border rounded-xl bg-gray-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Tanggal Transaksi
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="mt-1 w-full p-3 border rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              {editId ? "Perbarui Transaksi" : "Simpan Transaksi"}
            </button>
          </form>

          {/* TABLE */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">
              Daftar Transaksi
            </h2>

            <div className="overflow-hidden border rounded-2xl">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="p-4 text-left">Customer</th>
                    <th className="p-4 text-left">Produk</th>
                    <th className="p-4 text-center">Jumlah</th>
                    <th className="p-4 text-center">Total</th>
                    <th className="p-4 text-center">Tanggal</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-6 text-center text-slate-500"
                      >
                        Belum ada transaksi
                      </td>
                    </tr>
                  ) : (
                    transactions.map((t) => (
                      <tr
                        key={t.id}
                        className="border-t hover:bg-slate-50"
                      >
                        <td className="p-3">
                          {getCustomerName(t.customer_id)}
                        </td>
                        <td className="p-3">
                          {getProductName(t.product_id)}
                        </td>
                        <td className="p-3 text-center">
                          {t.quantity}
                        </td>
                        <td className="p-3 text-center">
                          Rp{" "}
                          {Number(t.total).toLocaleString("id-ID")}
                        </td>
                        <td className="p-3 text-center">{t.date}</td>
                        <td className="p-3 flex justify-center gap-3">
                          <button
                            onClick={() => {
                              setForm({
                                customer_id: t.customer_id,
                                product_id: t.product_id,
                                qty: t.quantity,
                                date: t.date,
                                price: getProductPrice(t.product_id),
                                total: t.total,
                              });
                              setEditId(t.id);
                            }}
                            className="px-4 py-1 rounded-full text-sm bg-blue-100 text-blue-700 hover:bg-blue-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
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

export default Transaction;

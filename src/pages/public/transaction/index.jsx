import React, { useState, useEffect } from "react";
import { getTransactions, createTransaction, deleteTransaction, updateTransaction } from "../../../_services/transaction";
import { getProduct } from "../../../_services/product";
import { getCustomer } from "../../../_services/customer";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    customer_id: "",
    product_id: "",
    qty: 0,
    date: "",
    price: 0,
    total: 0,
  });

  // ==========================
  // FETCH DATA
  // ==========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setProducts(await getProduct());
        setCustomers(await getCustomer());
        setTransactions(await getTransactions());
      } catch (err) {
        console.error(err);
        setMessage("⚠️ Gagal memuat data");
      }
    };
    fetchData();
  }, []);

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
    if (name === "qty") updated.qty = Number(value) || 0;

    updated.total = updated.price * updated.qty;
    setForm(updated);
  };

  // ==========================
  // SUBMIT
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        customer_id: form.customer_id,
        product_id: form.product_id,
        quantity: form.qty,
        date: form.date,
      };

      if (editId) {
        await updateTransaction(editId, payload);
        setTransactions(
          transactions.map((t) =>
            t.id === editId ? { ...t, ...payload, total: form.total } : t
          )
        );
        setEditId(null);
        setMessage("✅ Transaksi berhasil diperbarui");
      } else {
        const res = await createTransaction(payload);
        setTransactions([...transactions, res.data]);
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
    } catch {
      setMessage("❌ Gagal menyimpan transaksi");
    }
  };

  // ==========================
  // DELETE
  // ==========================
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah yakin ingin menghapus transaksi ini?")) return;

    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter((t) => t.id !== id));
      setMessage("✅ Transaksi berhasil dihapus");
    } catch {
      setMessage("❌ Gagal menghapus transaksi");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">
            Manajemen Transaksi
          </h1>
          <p className="text-slate-500">
            Catat dan kelola transaksi penjualan
          </p>
        </div>

        {message && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg">
            {message}
          </div>
        )}

        {/* FORM */}
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            {editId ? "Edit Transaksi" : "Tambah Transaksi"}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Customer"
              name="customer_id"
              value={form.customer_id}
              onChange={handleChange}
              options={customers.map((c) => ({ value: c.id, label: c.name }))}
            />

            <Select
              label="Produk"
              name="product_id"
              value={form.product_id}
              onChange={handleChange}
              options={products.map((p) => ({
                value: p.id,
                label: `${p.name} — Rp ${Number(p.price).toLocaleString("id-ID")}`,
              }))}
            />

            <Input label="Jumlah" name="qty" type="number" value={form.qty} onChange={handleChange} />
            <Input label="Tanggal" name="date" type="date" value={form.date} onChange={handleChange} />

            <div className="md:col-span-2 bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Total Pembayaran</p>
              <p className="text-2xl font-semibold text-blue-700">
                Rp {form.total.toLocaleString("id-ID")}
              </p>
            </div>

            <button className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
              {editId ? "Perbarui Transaksi" : "Simpan Transaksi"}
            </button>
          </form>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Riwayat Transaksi
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Produk</th>
                  <th className="p-3 text-left">Jumlah</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-left">Tanggal</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-slate-400">
                      Belum ada transaksi
                    </td>
                  </tr>
                ) : (
                  transactions.map((t) => (
                    <tr key={t.id} className="border-b hover:bg-slate-50">
                      <td className="p-3">{getCustomerName(t.customer_id)}</td>
                      <td className="p-3">{getProductName(t.product_id)}</td>
                      <td className="p-3">{t.quantity}</td>
                      <td className="p-3">
                        Rp {Number(t.total).toLocaleString("id-ID")}
                      </td>
                      <td className="p-3">{t.date}</td>
                      <td className="p-3 text-center space-x-2">
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
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
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
        </div>

      </div>
    </div>
  );
}

/* =====================
   KOMPONEN BANTUAN
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

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm text-slate-600">{label}</label>
    <select
      {...props}
      className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
      required
    >
      <option value="">Pilih {label}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

export default Transaction;

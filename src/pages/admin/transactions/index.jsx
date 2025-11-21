import React, { useEffect, useState } from "react";
import api from "../../../_api";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    sales_id: "",
    product_id: "",
    quantity: 1,
    total_price: 0,
    date: "",
  });

  const fetchData = async () => {
    const [tx, s, p] = await Promise.all([
      api.get("/transactions"),
      api.get("/sales"),
      api.get("/products"),
    ]);
    setTransactions(tx.data);
    setSales(s.data);
    setProducts(p.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selected = products.find((p) => p.id === parseInt(form.product_id));
    const total = form.quantity * selected.price;

    await api.post("/transactions", { ...form, total_price: total });
    setForm({ sales_id: "", product_id: "", quantity: 1, total_price: 0, date: "" });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Transaksi Penjualan</h1>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <select
          value={form.sales_id}
          onChange={(e) => setForm({ ...form, sales_id: e.target.value })}
          className="border p-2 rounded w-1/5"
        >
          <option value="">Pilih Pembeli</option>
          {sales.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <select
          value={form.product_id}
          onChange={(e) => setForm({ ...form, product_id: e.target.value })}
          className="border p-2 rounded w-1/5"
        >
          <option value="">Pilih Produk</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          placeholder="Jumlah"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="border p-2 rounded w-1/5"
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 rounded w-1/5"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Tambah Transaksi
        </button>
      </form>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>Pembeli</th>
            <th>Produk</th>
            <th>Qty</th>
            <th>Total Harga</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={t.id} className="text-center border-b">
              <td>{i + 1}</td>
              <td>{t.date}</td>
              <td>{t.sales_name}</td>
              <td>{t.product_name}</td>
              <td>{t.quantity}</td>
              <td>Rp {t.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionPage;



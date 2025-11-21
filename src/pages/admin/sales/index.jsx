import React, { useEffect, useState } from "react";
import api from "../../../_api";

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "" });

  const getSales = async () => {
    const res = await api.get("/sales");
    setSales(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/sales", form);
    setForm({ name: "", phone: "" });
    getSales();
  };

  const handleDelete = async (id) => {
    await api.delete(`/sales/${id}`);
    getSales();
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Daftar Pembeli</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nama pembeli"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="No HP"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 rounded w-1/3"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Tambah
        </button>
      </form>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>No HP</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s, i) => (
            <tr key={s.id} className="text-center border-b">
              <td>{i + 1}</td>
              <td>{s.name}</td>
              <td>{s.phone}</td>
              <td>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesPage;


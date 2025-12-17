import React, { useState, useEffect } from "react";
import {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../../_services/customer";

function SalesPage() {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({ name: "", phone_number: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        setLoading(true);
        const data = await getCustomer();
        setSales(data);
      } catch (err) {
        console.error("❌ Failed to fetch sales:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const updated = await updateCustomer(editId, formData);
        setSales(sales.map((s) => (s.id === editId ? updated.data : s)));
        setEditId(null);
      } else {
        const created = await createCustomer(formData);
        setSales([...sales, created.data]);
      }

      setFormData({ name: "", phone_number: "" });
    } catch (err) {
      console.error("❌ Failed to save sales:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;

    try {
      await deleteCustomer(id);
      setSales(sales.filter((s) => s.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete sales:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* HEADER */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-slate-800">
            Sales Management
          </h1>
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
            Customer Data
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-1 bg-slate-50 border rounded-2xl p-6 space-y-5"
          >
            <h2 className="text-lg font-semibold text-slate-700">
              {editId ? "Edit Sales" : "Add New Sales"}
            </h2>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Nama
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama sales"
                className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="08xxxxxxxx"
                className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              {editId ? "Update Sales" : "Save Sales"}
            </button>
          </form>

          {/* TABLE */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">
              Sales List
            </h2>

            <div className="overflow-hidden border rounded-2xl">
              <table className="w-full">
                <thead className="bg-slate-100 text-slate-700 text-sm">
                  <tr>
                    <th className="p-4 text-left">Nama</th>
                    <th className="p-4 text-left">Phone</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="p-6 text-center text-slate-500">
                        Loading...
                      </td>
                    </tr>
                  ) : sales.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="p-6 text-center text-slate-500">
                        No sales data available
                      </td>
                    </tr>
                  ) : (
                    sales.map((s) => (
                      <tr
                        key={s.id}
                        className="border-t hover:bg-slate-50 transition"
                      >
                        <td className="p-4">{s.name}</td>
                        <td className="p-4">{s.phone_number}</td>
                        <td className="p-4 flex justify-center gap-4">
                          <button
                            onClick={() => {
                              setFormData({
                                name: s.name,
                                phone_number: s.phone_number,
                              });
                              setEditId(s.id);
                            }}
                            className="px-4 py-1 rounded-full text-sm bg-blue-100 text-blue-700 hover:bg-blue-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(s.id)}
                            className="px-4 py-1 rounded-full text-sm bg-red-100 text-red-600 hover:bg-red-200"
                          >
                            Delete
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

export default SalesPage;


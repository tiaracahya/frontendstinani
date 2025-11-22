import React, { useState, useEffect } from "react";
import api from "../../../_api";

function SalesPage() {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ======================================
  // FETCH SALES (LOGIKA CUSTOMER)
  // ======================================
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.log("🔒 User belum login — skip fetch sales");
        return;
      }

      try {
        setLoading(true);
        const res = await api.get("/sales");
        setSales(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch sales:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ======================================
  // HANDLE INPUT
  // ======================================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ======================================
  // CREATE & UPDATE (LOGIKA CUSTOMER)
  // ======================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // UPDATE
        await api.post(`/sales/${editId}`, formData);

        setSales(
          sales.map((s) =>
            s.id === editId ? { ...s, ...formData } : s
          )
        );

        setEditId(null);
      } else {
        // CREATE
        const res = await api.post("/sales", formData);
        setSales([...sales, res.data]);
      }

      setFormData({ name: "", phone: "" });
    } catch (err) {
      console.error("❌ Failed to save sales:", err);
    }
  };

  // ======================================
  // DELETE (LOGIKA CUSTOMER)
  // ======================================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sales?")) return;

    try {
      await api.delete(`/sales/${id}`);
      setSales(sales.filter((s) => s.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete:", err);
    }
  };

  // ======================================
  // UI (LAYOUT SALES)
  // ======================================
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">
          Sales Management
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-blue-50 p-6 rounded-xl shadow space-y-5"
          >
            <h2 className="text-xl font-semibold text-blue-700">
              {editId ? "Edit Sales" : "Add Sales"}
            </h2>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Nama</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="p-3 border rounded-xl focus:ring focus:ring-blue-300 outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="p-3 border rounded-xl focus:ring focus:ring-blue-300 outline-none"
                required
              />
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold shadow hover:bg-blue-700 transition">
              {editId ? "Update Sales" : "Save Sales"}
            </button>
          </form>

          {/* TABLE */}
          <div className="overflow-auto">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              Sales List
            </h2>

            {loading ? (
              <p className="text-center text-gray-500 py-4">Loading...</p>
            ) : (
              <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-blue-100 text-gray-700">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {sales.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="p-4 text-center text-gray-500">
                        No sales found
                      </td>
                    </tr>
                  ) : (
                    sales.map((s) => (
                      <tr key={s.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{s.name}</td>
                        <td className="p-3">{s.phone}</td>

                        <td className="p-3 flex justify-center gap-3">
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => {
                              setFormData({
                                name: s.name,
                                phone: s.phone,
                              });
                              setEditId(s.id);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => handleDelete(s.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default SalesPage;



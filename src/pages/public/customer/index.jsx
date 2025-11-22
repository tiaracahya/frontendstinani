import React, { useState, useEffect } from "react";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../../_services/customer";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    phone: "",
  });

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ==========================
  // FETCH CUSTOMER / SALES
  // ==========================
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.log("🔒 User belum login — skip fetch customers");
        return; 
      }

      try {
        setLoading(true);
        const data = await getCustomers();
        setCustomers(data);
      } catch (err) {
        console.error("❌ Failed to fetch customers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ==========================
  // FORM CHANGE
  // ==========================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ==========================
  // CREATE & UPDATE
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // UPDATE DATA
        await updateCustomer(editId, formData);

        setCustomers(
          customers.map((c) =>
            c.id === editId ? { ...c, ...formData } : c
          )
        );

        setEditId(null);
      } else {
        // CREATE DATA
        const newCustomer = await createCustomer(formData);
        setCustomers([...customers, newCustomer]);
      }

      setFormData({ nama: "", phone: "" });
    } catch (error) {
      console.error("❌ Failed to save customer:", error);
    }
  };

  // ==========================
  // DELETE CUSTOMER
  // ==========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await deleteCustomer(id);
      setCustomers(customers.filter((c) => c.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete customer:", err);
    }
  };

  // ==========================
  // UI
  // ==========================
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
                name="nama"
                value={formData.nama}
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
            <h2 className="text-xl font-semibold text-blue-700 mb-3">Sales List</h2>

            {loading ? (
              <p className="text-center text-gray-500 py-4">Loading...</p>
            ) : (
              <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-blue-100 text-gray-700">
                  <tr>
                    <th className="p-3">Nama</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {customers.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="p-4 text-center text-gray-500">
                        No sales found
                      </td>
                    </tr>
                  ) : (
                    customers.map((c) => (
                      <tr key={c.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{c.nama}</td>
                        <td className="p-3">{c.phone}</td>

                        <td className="p-3 flex justify-center gap-3">
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => {
                              setFormData({
                                nama: c.nama,
                                phone: c.phone,
                              });
                              setEditId(c.id);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => handleDelete(c.id)}
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

export default Customer;

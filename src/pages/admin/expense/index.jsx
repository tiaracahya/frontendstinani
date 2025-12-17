import React, { useEffect, useState } from "react";
import {
  getExpenses,
  createExpenses,
  deleteExpenses,
  updateExpenses,
} from "../../../_services/expense";

function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    date: "",
    quantity: "",
    total: "",
  });

  // ================= GET =================
  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenses(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Gagal load expense:", err);
      setExpenses([]);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ================= INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({ name: "", date: "", quantity: "", total: "" });
    setShowForm(false);
    setIsEdit(false);
    setEditId(null);
  };

  // ================= CREATE & UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      date: form.date,
      quantity: Number(form.quantity),
      total: Number(form.total),
    };

    try {
      if (isEdit) {
        await updateExpenses(editId, payload);
      } else {
        await createExpenses(payload);
      }

      resetForm();
      fetchExpenses();
    } catch (err) {
      console.error("Gagal simpan expense:", err);
    }
  };

  // ================= EDIT =================
  const handleEdit = (expense) => {
    setForm({
      name: expense.name,
      date: expense.date,
      quantity: expense.quantity,
      total: expense.total,
    });
    setEditId(expense.id);
    setIsEdit(true);
    setShowForm(true);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus expense?")) return;

    try {
      await deleteExpenses(id);
      fetchExpenses();
    } catch (err) {
      console.error("Gagal hapus expense:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Expense</h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
        >
          + Tambah
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-center">Date</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-right">Total</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((e) => (
                <tr
                  key={e.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{e.name}</td>
                  <td className="p-3 text-center">{e.date}</td>
                  <td className="p-3 text-center">{e.quantity}</td>
                  <td className="p-3 text-right font-semibold">
                    Rp {Number(e.total).toLocaleString("id-ID")}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(e)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(e.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  Belum ada data expense
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4 border rounded-xl p-5 bg-gray-50"
        >
          <h3 className="font-semibold text-gray-700">
            {isEdit ? "Edit Expense" : "Tambah Expense"}
          </h3>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama expense"
            className="border rounded-lg p-2 w-full"
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Qty"
              className="border rounded-lg p-2 w-full"
              required
            />

            <input
              name="total"
              type="number"
              value={form.total}
              onChange={handleChange}
              placeholder="Total"
              className="border rounded-lg p-2 w-full"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              {isEdit ? "Update" : "Simpan"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Batal
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ExpensePage;


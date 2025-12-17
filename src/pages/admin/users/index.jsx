import React, { useEffect, useState } from "react";
import {
  getUsers,
  createUsers,
  deleteUsers,
} from "../../../_services/user";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // ================= GET USERS =================
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Gagal mengambil users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= CREATE USER =================
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createUsers(form);
      setShowAddModal(false);
      setForm({ name: "", email: "", password: "", role: "user" });
      fetchUsers();
    } catch (error) {
      console.error("Gagal membuat user:", error);
    }
  };

  // ================= DELETE USER =================
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus user ini?")) return;

    try {
      await deleteUsers(id);
      fetchUsers();
    } catch (error) {
      console.error("Gagal menghapus user:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Users</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
        >
          + Tambah Akun
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Role</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr
                  key={u.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{u.id}</td>
                  <td className="p-3 font-medium">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.role === "admin"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
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
                  Belum ada user
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DETAIL MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[380px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">User Detail</h3>

            <div className="space-y-2 text-sm">
              <p><strong>ID:</strong> {selectedUser.id}</p>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
            </div>

            <button
              className="mt-6 w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ADD USER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Tambah User</h3>

            <form onSubmit={handleCreate} className="space-y-3">
              <input
                name="name"
                placeholder="Nama"
                className="w-full p-2 border rounded-lg"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded-lg"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border rounded-lg"
                value={form.password}
                onChange={handleChange}
                required
              />

              <select
                name="role"
                className="w-full p-2 border rounded-lg"
                value={form.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg"
                  onClick={() => setShowAddModal(false)}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;

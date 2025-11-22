import React, { useEffect, useState } from "react";
import api from "../../../_api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showAddModal, setShowAddModal] = useState(false);

  // GET USERS
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE USER
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", form);
      setShowAddModal(false);
      setForm({ name: "", email: "", password: "", role: "user" });
      fetchUsers();
    } catch (err) {
      console.error("Gagal membuat user:", err);
    }
  };

  // DELETE USER
  const handleDelete = async (id) => {
    if (!confirm("Anda Yakin menghapus User ini?")) return;

    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Gagal menghapus user:", err);
    }
  };

  return (
    <section className="p-4 sm:p-6">
      <div className="shadow-md rounded-lg bg-white">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold">All Users</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setShowAddModal(true)}
          >
            + Tambah Akun
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-white bg-blue-700">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-blue-50">
                    <td className="px-4 py-3">{u.id}</td>
                    <td className="px-4 py-3">{u.name}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3">{u.role}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded"
                        onClick={() => setSelectedUser(u)}
                      >
                        Detail
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded"
                        onClick={() => handleDelete(u.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    No users found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md min-w-[350px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">User Detail</h3>

            <p><strong>ID:</strong> {selectedUser.id}</p>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>

            <button
              className="mt-4 w-full bg-gray-700 text-white py-2 rounded"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ADD USER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-[400px] shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Add New User</h3>

            <form onSubmit={handleCreate} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-2 border rounded"
                value={form.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                value={form.email}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                value={form.password}
                onChange={handleChange}
              />

              <select
                name="role"
                className="w-full p-2 border rounded"
                value={form.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                Save User
              </button>

              <button
                type="button"
                className="w-full bg-gray-600 text-white py-2 rounded"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminUsers;

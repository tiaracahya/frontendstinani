import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { logout, useDecodeToken } from "../_services/auth";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const rawUserInfo = localStorage.getItem("userInfo");
  const userInfo =
    rawUserInfo && rawUserInfo !== "undefined"
      ? JSON.parse(rawUserInfo)
      : null;

  const decodedData = useDecodeToken(token);

  useEffect(() => {
    // Jika token tidak valid, redirect ke login
    if (!token || !decodedData || !decodedData.success) {
      navigate("/login");
      return;
    }

    // Jika bukan admin, redirect ke halaman utama
    const role = userInfo?.role;
    if (role !== "admin") {
      navigate("/");
    }
  }, [token, decodedData, navigate, userInfo]);

  const handleLogout = async () => {
    if (token) {
      localStorage.removeItem("userInfo");
      await logout({ token });
    }
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-30 w-64 bg-white border-r shadow-md transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-xl font-semibold text-green-600">Sitani</h2>
          <button
            className="text-gray-500 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="p-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-green-100"
              >
                <span className="ml-2">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/products"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-green-100"
              >
                <span className="ml-2">Produk</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/sales"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-green-100"
              >
                <span className="ml-2">Pembeli</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/expenses"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-green-100"
              >
                <span className="ml-2">Pengeluaran</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/transactions"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-green-100"
              >
                <span className="ml-2">Transaksi</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/users"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-green-100"
              >
                <span className="ml-2">Pengguna</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/reports"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-green-100"
              >
                <span className="ml-2">Laporan</span>
              </Link>
            </li>
          </ul>

          {/* Logout */}
          <div className="mt-8 border-t pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 text-red-600 rounded-lg hover:bg-red-100"
            >
              <span className="ml-2 font-semibold">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-white border-b p-4 shadow-sm">
          <button
            className="text-gray-600 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>

          {/* User info */}
          <div className="flex items-center gap-2">
            <img
              src={`https://ui-avatars.com/api/?name=${userInfo?.name}&background=FF6B35&color=fff`}
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-orange-500"
            />
            <span className="text-gray-700 text-sm font-medium">
              {userInfo?.name}
            </span>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

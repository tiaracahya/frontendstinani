import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
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
                <span className="ml-2">Products</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/sales"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-green-100"
              >
                <span className="ml-2">Sales</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/expenses"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-green-100"
              >
                <span className="ml-2">Expenses</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/transactions"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-green-100"
              >
                <span className="ml-2">Transactions</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/users"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-green-100"
              >
                <span className="ml-2">Users</span>
              </Link>
            </li>

            {/* ✅ Reports Page */}
            <li>
              <Link
                to="/admin/reports"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-green-100"
              >
                <span className="ml-2">Reports</span>
              </Link>
            </li>
          </ul>

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

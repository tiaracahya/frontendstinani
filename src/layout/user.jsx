import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="text-xl font-bold text-green-600">Sitani - User</h2>

        <ul className="mt-4 space-y-2">
          <li>
            <Link to="/user/reports" className="block p-2 hover:bg-green-100">
              Reports
            </Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}

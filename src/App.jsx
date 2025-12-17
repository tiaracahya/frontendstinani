import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layouts
import PublicLayout from "./layout/public";
import AdminLayout from "./layout/admin";

// Public Pages
import Home from "./pages/public/index";
import About from "./pages/public/about";
import Contact from "./pages/public/contact";

// Auth
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

// Admin Pages
import ProductPage from "./pages/admin/product/index";
import SalesPage from "./pages/admin/customer/index";
import ExpensePage from "./pages/admin/expense/index";
import TransactionPage from "./pages/admin/transactions/index";
import UserPage from "./pages/admin/users/index";
import ReportsPage from "./pages/admin/reports/index";

// User Pages (public layout juga)
import UserReports from "./pages/user/reports";
import Product from "./pages/public/product";
import Report from "./pages/public/report";
import Transaction from "./pages/public/transaction";
import Customer from "./pages/public/customer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 Public Routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Product />} />
          <Route path="transactions" element={<Transaction />} />
          <Route path="customers" element={<Customer />} />
          <Route path="reports" element={<Report />} />
          <Route path="abouts" element={<About />} />
          <Route path="contacts" element={<Contact />} />
        </Route>

        {/* 🔐 Auth */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* ⚙️ Admin Routes */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<ReportsPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="expenses" element={<ExpensePage />} />
          <Route path="transactions" element={<TransactionPage />} />
          <Route path="users" element={<UserPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;





import React, { useEffect, useState } from "react";
import { getTransactions } from "../../../_services/transaction";
import { getProduct } from "../../../_services/product";
import { getCustomer } from "../../../_services/customer";
import { getExpenses } from "../../../_services/expense";

function ReportPage() {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // =============================
  // FETCH SEMUA DATA
  // =============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const t = await getTransactions();
        const p = await getProduct();
        const c = await getCustomer();
        const e = await getExpenses();

        setTransactions(t || []);
        setProducts(p || []);
        setCustomers(c || []);
        setExpenses(e || []);
      } catch (err) {
        console.error("Gagal memuat laporan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // =============================
  // PERHITUNGAN LAPORAN
  // =============================
  const totalTransaksi = transactions.length;

  const totalPemasukan = transactions.reduce(
    (sum, t) => sum + Number(t.total || 0),
    0
  );

  const totalPengeluaran = expenses.reduce(
    (sum, e) => sum + Number(e.total || 0),
    0
  );

  const totalProdukTerjual = transactions.reduce(
    (sum, t) => sum + Number(t.quantity || 0),
    0
  );

  const getProductName = (id) =>
    products.find((p) => p.id === Number(id))?.name || "-";

  const getCustomerName = (id) =>
    customers.find((c) => c.id === Number(id))?.name || "-";

  if (loading) {
    return <p className="text-center mt-10">Memuat laporan...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Laporan Penjualan</h1>
          <p className="text-slate-500">
            Ringkasan pemasukan, pengeluaran, dan aktivitas penjualan
          </p>
        </div>

        {/* SUMMARY CARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Summary title="Total Transaksi" value={totalTransaksi} />
          <Summary
            title="Total Pemasukan"
            value={`Rp ${totalPemasukan.toLocaleString("id-ID")}`}
          />
          <Summary
            title="Total Pengeluaran"
            value={`Rp ${totalPengeluaran.toLocaleString("id-ID")}`}
          />
          <Summary title="Produk Terjual" value={`${totalProdukTerjual} item`} />
          <Summary title="Total Produk" value={products.length} />
          <Summary title="Total Customer" value={customers.length} />
        </div>

        {/* TRANSAKSI */}
        <Section title="Daftar Transaksi">
          <Table
            headers={["Customer", "Produk", "Jumlah", "Total", "Tanggal"]}
            data={transactions.map((t) => [
              getCustomerName(t.customer_id),
              getProductName(t.product_id),
              t.quantity,
              `Rp ${Number(t.total).toLocaleString("id-ID")}`,
              t.date,
            ])}
          />
        </Section>

        {/* PRODUK TERJUAL */}
        <Section title="Produk Terjual">
          <Table
            headers={["Nama Produk", "Stok", "Harga"]}
            data={products.map((p) => [
              p.name,
              p.stock,
              `Rp ${Number(p.price).toLocaleString("id-ID")}`,
            ])}
          />
        </Section>

        {/* EXPENSE */}
        <Section title="Pengeluaran">
          <Table
            headers={["Nama", "Tanggal", "Qty", "Total"]}
            data={expenses.map((e) => [
              e.name,
              e.date,
              e.quantity,
              `Rp ${Number(e.total).toLocaleString("id-ID")}`,
            ])}
          />
        </Section>
      </div>
    </div>
  );
}

/* =============================
   KOMPONEN BANTUAN
============================= */

const Summary = ({ title, value }) => (
  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
    <h3 className="text-sm text-blue-700 font-medium">{title}</h3>
    <p className="text-2xl font-bold text-blue-800 mt-2">{value}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-semibold text-slate-700 mb-4">{title}</h2>
    {children}
  </div>
);

const Table = ({ headers, data }) => (
  <div className="overflow-x-auto border rounded-xl">
    <table className="w-full text-sm">
      <thead className="bg-slate-100">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="p-3 text-left">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={headers.length} className="p-4 text-center text-gray-500">
              Tidak ada data
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={i} className="border-t hover:bg-slate-50">
              {row.map((cell, j) => (
                <td key={j} className="p-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default ReportPage;

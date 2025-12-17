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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTransactions(await getTransactions() || []);
        setProducts(await getProduct() || []);
        setCustomers(await getCustomer() || []);
        setExpenses(await getExpenses() || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalTransaksi = transactions.length;
  const totalPemasukan = transactions.reduce((s, t) => s + Number(t.total || 0), 0);
  const totalPengeluaran = expenses.reduce((s, e) => s + Number(e.total || 0), 0);
  const totalProdukTerjual = transactions.reduce((s, t) => s + Number(t.quantity || 0), 0);

  const getProductName = (id) =>
    products.find((p) => p.id === Number(id))?.name || "-";

  const getCustomerName = (id) =>
    customers.find((c) => c.id === Number(id))?.name || "-";

  if (loading) {
    return <p className="text-center mt-20 text-slate-500">Memuat laporan...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">
            Laporan Penjualan
          </h1>
          <p className="text-slate-500 mt-1">
            Ringkasan aktivitas penjualan dan keuangan
          </p>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Summary title="Total Transaksi" value={totalTransaksi} />
          <Summary title="Produk Terjual" value={`${totalProdukTerjual} item`} />
          <Summary title="Total Pemasukan" value={`Rp ${totalPemasukan.toLocaleString("id-ID")}`} />
          <Summary title="Total Pengeluaran" value={`Rp ${totalPengeluaran.toLocaleString("id-ID")}`} />
          <Summary title="Jumlah Produk" value={products.length} />
          <Summary title="Jumlah Customer" value={customers.length} />
        </div>

        {/* TRANSAKSI */}
        <Section title="Transaksi">
          <Table
            headers={["Tanggal", "Customer", "Produk", "Qty", "Total"]}
            data={transactions.map((t) => [
              t.date,
              getCustomerName(t.customer_id),
              getProductName(t.product_id),
              t.quantity,
              `Rp ${Number(t.total).toLocaleString("id-ID")}`,
            ])}
          />
        </Section>

        {/* PRODUK */}
        <Section title="Produk">
          <Table
            headers={["Nama Produk", "Stok", "Harga"]}
            data={products.map((p) => [
              p.name,
              p.stock,
              `Rp ${Number(p.price).toLocaleString("id-ID")}`,
            ])}
          />
        </Section>

        {/* PENGELUARAN */}
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

/* ======================
   COMPONENTS
====================== */

const Summary = ({ title, value }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
    <p className="text-sm text-slate-500">{title}</p>
    <h3 className="text-2xl font-semibold text-slate-800 mt-2">{value}</h3>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-slate-700 mb-4">{title}</h2>
    {children}
  </div>
);

const Table = ({ headers, data }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead className="border-b bg-slate-50">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="p-3 text-left font-medium text-slate-600">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={headers.length} className="p-4 text-center text-slate-400">
              Tidak ada data
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={i} className="border-b hover:bg-slate-50">
              {row.map((cell, j) => (
                <td key={j} className="p-3 text-slate-700">
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

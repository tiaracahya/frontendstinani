import React, { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function UserReports() {
  // Ringkasan — disesuaikan produk
  const [summary] = useState({
    transaksi: 20,
    berasTerjual: 320,      // kg
    dedakTerjual: 150,      // kg
    pemasukan: 8200000,
    pengeluaran: 3100000,
  });

  // Grafik — pemasukan/pengeluaran
  const [chartData] = useState([
    { month: "Jan", pemasukan: 1200000, pengeluaran: 400000 },
    { month: "Feb", pemasukan: 1500000, pengeluaran: 350000 },
    { month: "Mar", pemasukan: 1000000, pengeluaran: 300000 },
    { month: "Apr", pemasukan: 1800000, pengeluaran: 600000 },
    { month: "Mei", pemasukan: 2700000, pengeluaran: 550000 },
  ]);

  // Grafik — perbandingan beras & dedak
  const [produkData] = useState([
    { month: "Jan", beras: 60, dedak: 25 },
    { month: "Feb", beras: 80, dedak: 30 },
    { month: "Mar", beras: 40, dedak: 20 },
    { month: "Apr", beras: 90, dedak: 35 },
    { month: "Mei", beras: 50, dedak: 40 },
  ]);

  // Riwayat transaksi
  const [history] = useState([
    { tanggal: "10 Nov 2025", produk: "Beras", jumlah: "50 kg", total: 750000 },
    { tanggal: "09 Nov 2025", produk: "Dedak", jumlah: "30 kg", total: 180000 },
    { tanggal: "08 Nov 2025", produk: "Beras", jumlah: "40 kg", total: 600000 },
    { tanggal: "05 Nov 2025", produk: "Dedak", jumlah: "20 kg", total: 120000 },
  ]);

  return (
    <div className="space-y-6">

      {/* Judul */}
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        📊 Laporan Penjualan Beras & Dedak
      </h1>

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="p-5 bg-green-50 border-l-4 border-green-600 rounded shadow">
          <p className="text-sm text-gray-600">Total Transaksi</p>
          <h2 className="text-2xl font-bold">{summary.transaksi}</h2>
        </div>

        <div className="p-5 bg-yellow-50 border-l-4 border-yellow-600 rounded shadow">
          <p className="text-sm text-gray-600">Beras Terjual</p>
          <h2 className="text-2xl font-bold">{summary.berasTerjual} kg</h2>
        </div>

        <div className="p-5 bg-orange-50 border-l-4 border-orange-600 rounded shadow">
          <p className="text-sm text-gray-600">Dedak Terjual</p>
          <h2 className="text-2xl font-bold">{summary.dedakTerjual} kg</h2>
        </div>

        <div className="p-5 bg-blue-50 border-l-4 border-blue-600 rounded shadow">
          <p className="text-sm text-gray-600">Total Pemasukan</p>
          <h2 className="text-2xl font-bold">Rp {summary.pemasukan.toLocaleString()}</h2>
        </div>
      </div>

      {/* Grafik Keuangan */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3">Grafik Pemasukan & Pengeluaran</h2>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Area type="monotone" dataKey="pemasukan" stroke="#16a34a" fill="#86efac" />
              <Area type="monotone" dataKey="pengeluaran" stroke="#dc2626" fill="#fca5a5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grafik Perbandingan Produk */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3">
          Perbandingan Penjualan Beras vs Dedak (kg)
        </h2>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={produkData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="beras" fill="#16a34a" name="Beras (kg)" />
              <Bar dataKey="dedak" fill="#f59e0b" name="Dedak (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Riwayat Transaksi */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3">Riwayat Penjualan</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100">
              <th className="p-2 border">Tanggal</th>
              <th className="p-2 border">Produk</th>
              <th className="p-2 border">Jumlah</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item, i) => (
              <tr key={i} className="text-sm hover:bg-gray-50">
                <td className="p-2 border">{item.tanggal}</td>
                <td className="p-2 border">{item.produk}</td>
                <td className="p-2 border">{item.jumlah}</td>
                <td className="p-2 border">Rp {item.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}


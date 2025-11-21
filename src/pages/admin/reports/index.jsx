import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ReportsPage = () => {
  const [filter, setFilter] = useState("daily");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // contoh data dummy (nanti bisa diganti dari API)
  const dummyData = {
    daily: [
      { name: "Sen", sales: 300000, expense: 150000 },
      { name: "Sel", sales: 400000, expense: 180000 },
      { name: "Rab", sales: 350000, expense: 160000 },
      { name: "Kam", sales: 500000, expense: 220000 },
      { name: "Jum", sales: 450000, expense: 190000 },
      { name: "Sab", sales: 550000, expense: 250000 },
      { name: "Min", sales: 600000, expense: 270000 },
    ],
    weekly: [
      { name: "Minggu 1", sales: 3200000, expense: 1500000 },
      { name: "Minggu 2", sales: 4500000, expense: 2000000 },
      { name: "Minggu 3", sales: 5000000, expense: 2400000 },
      { name: "Minggu 4", sales: 4200000, expense: 2100000 },
    ],
    monthly: [
      { name: "Jan", sales: 15000000, expense: 7000000 },
      { name: "Feb", sales: 17000000, expense: 8000000 },
      { name: "Mar", sales: 16000000, expense: 7800000 },
      { name: "Apr", sales: 18000000, expense: 8200000 },
    ],
    yearly: [
      { name: "2021", sales: 120000000, expense: 70000000 },
      { name: "2022", sales: 140000000, expense: 80000000 },
      { name: "2023", sales: 150000000, expense: 90000000 },
      { name: "2024", sales: 170000000, expense: 95000000 },
    ],
  };

  useEffect(() => {
    setLoading(true);
    // simulasi ambil data dari API
    setTimeout(() => {
      setData(dummyData[filter]);
      setLoading(false);
    }, 500);
  }, [filter]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Laporan Penjualan & Pengeluaran</h1>

      {/* Filter */}
      <div className="flex items-center space-x-3">
        <label className="text-gray-600 font-semibold">Filter Laporan:</label>
        <select
          className="p-2 border rounded-md bg-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="daily">Harian</option>
          <option value="weekly">Mingguan</option>
          <option value="monthly">Bulanan</option>
          <option value="yearly">Tahunan</option>
        </select>
      </div>

      {/* Chart */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        {loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#16a34a"
                strokeWidth={3}
                name="Penjualan"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#dc2626"
                strokeWidth={3}
                name="Pengeluaran"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Table Summary */}
      {!loading && (
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Rangkuman {filter}</h2>
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="p-2 border">Periode</th>
                <th className="p-2 border">Total Penjualan</th>
                <th className="p-2 border">Total Pengeluaran</th>
                <th className="p-2 border">Keuntungan</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const profit = item.sales - item.expense;
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border">Rp {item.sales.toLocaleString()}</td>
                    <td className="p-2 border text-red-600">
                      Rp {item.expense.toLocaleString()}
                    </td>
                    <td
                      className={`p-2 border font-semibold ${
                        profit >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      Rp {profit.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;




import React, { useEffect, useState } from "react";

function Report() {
  const [reports, setReports] = useState([]);
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalItems: 0,
    totalIncome: 0,
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reports"); 
      const data = await res.json();
      setReports(data.reports);
      setSummary(data.summary);
    } catch (err) {
      console.error("Error fetching report:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-200 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📄 Sales & Stock Report
        </h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-xl p-5 text-center border-l-8 border-blue-400">
            <h4 className="text-lg font-semibold text-gray-700">Total Transaksi</h4>
            <p className="text-3xl font-bold text-blue-600">{summary.totalSales}</p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-5 text-center border-l-8 border-green-400">
            <h4 className="text-lg font-semibold text-gray-700">Produk Terjual</h4>
            <p className="text-3xl font-bold text-green-600">{summary.totalItems}</p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-5 text-center border-l-8 border-blue-600">
            <h4 className="text-lg font-semibold text-gray-700">Total Income</h4>
            <p className="text-3xl font-bold text-blue-700">
              Rp {summary.totalIncome.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white p-6 shadow-xl rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-700">Detail Transaksi</h3>

            <div className="space-x-3">
              <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition">
                Export PDF
              </button>
              <button className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-700 transition">
                Export Excel
              </button>
            </div>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-200 text-gray-700">
                <th className="p-3 border">Tanggal</th>
                <th className="p-3 border">Customer</th>
                <th className="p-3 border">Produk</th>
                <th className="p-3 border">Qty</th>
                <th className="p-3 border">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((item, index) => (
                  <tr key={index} className="text-center hover:bg-gray-100">
                    <td className="p-3 border">{item.date}</td>
                    <td className="p-3 border">{item.customerName}</td>
                    <td className="p-3 border">{item.productName}</td>
                    <td className="p-3 border">{item.quantity}</td>
                    <td className="p-3 border text-green-700 font-semibold">
                      Rp {item.total.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 border text-center text-gray-500" colSpan="5">
                    Tidak ada data laporan 📉
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Report;

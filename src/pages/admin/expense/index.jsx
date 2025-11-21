import React, { useEffect, useState } from "react";
import api from "../../../_api";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    api.get("/expenses")
      .then(res => setExpenses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Catatan Pengeluaran</h1>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>No</th>
            <th>Nama Pengeluaran</th>
            <th>Qty</th>
            <th>Harga</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e, i) => (
            <tr key={e.id} className="text-center border-b">
              <td>{i + 1}</td>
              <td>{e.product_name}</td>
              <td>{e.quantity}</td>
              <td>Rp {e.price}</td>
              <td>{e.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensePage;


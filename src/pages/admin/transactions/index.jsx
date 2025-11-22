import React, { useState } from "react";

function Transaction() {
  const [transaction, setTransaction] = useState({
    date: "",
    quantity: "",
    price: "",
    total: 0,
  });

  const handleChange = (e) => {
    const updated = { ...transaction, [e.target.name]: e.target.value };
    updated.total = (updated.quantity || 0) * (updated.price || 0);
    setTransaction(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Saved Transaction! (Integrate backend soon)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-green-100 flex justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Add Transaction
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input name="date" type="date" className="input-field"
            value={transaction.date} onChange={handleChange} />

          <input name="quantity" className="input-field"
            placeholder="Quantity" value={transaction.quantity} 
            onChange={handleChange} />

          <input name="price" className="input-field"
            placeholder="Price" value={transaction.price}
            onChange={handleChange} />

          <div className="p-3 font-semibold rounded-xl bg-green-50 border text-blue-700">
            Total: Rp. {transaction.total || 0}
          </div>

          <button className="btn-primary w-full">Save Transaction</button>
        </form>
      </div>
    </div>
  );
}

export default Transaction;






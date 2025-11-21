import React, { useEffect, useState } from "react";
import api from "../../../_api";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manajemen Stok Produk</h1>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>No</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Deskripsi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id} className="text-center border-b">
              <td>{i + 1}</td>
              <td>{p.name}</td>
              <td>Rp {p.price}</td>
              <td>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;






    

import React, { useState } from "react";

export default function OrderSummary() {
  const [products, setProducts] = useState([
    { id: 1, name: "Wireless Headphones", price: 2499, qty: 1 },
    { id: 2, name: "Smart Watch", price: 3999, qty: 1 },
    { id: 3, name: "Bluetooth Speaker", price: 1999, qty: 1 },
  ]);

  const shippingFee = 49;
  const discount = 200;
  const updateQty = (id, newQty) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, qty: newQty } : p
      )
    );
  };
  const subtotal = products.reduce(
    (total, p) => total + p.price * p.qty,
    0
  );
  const finalAmount = subtotal - discount + shippingFee;
  return (
    <div className="w-full max-w-md mx-auto p-5 bg-white rounded-xl shadow-lg mt-5">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      {products.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center mb-4"
        >
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-gray-600">₹{item.price}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded"
              onClick={() =>
                updateQty(item.id, Math.max(1, item.qty - 1))
              }
              
            >
                -
            </button>
            <span className="font-bold">{item.qty}</span>
            <button
              className="px-3 py-1 bg-gray-200 rounded"
              onClick={() => updateQty(item.id, item.qty + 1)}
            >
                 +
            </button>
          </div>
        </div>
      ))}
      <div className="border-t pt-4 mt-4 space-y-2">
        <p className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{subtotal}</span>
        </p>
        <p className="flex justify-between text-green-600">
          <span>Discount:</span>
          <span>-₹{discount}</span>
        </p>
        <p className="flex justify-between text-blue-600">
          <span>Shipping Fee:</span>
          <span>₹{shippingFee}</span>
        </p>
        <h3 className="flex justify-between font-bold text-lg mt-3">
          <span>Total:</span>
          <span>₹{finalAmount}</span>
        </h3>
      </div>
    </div>
  );
}


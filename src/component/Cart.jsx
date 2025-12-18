import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCartDetails();
  }, []);

  const fetchCartDetails = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("Please login to view your cart");
        setLoading(false);
        return;
      }
      const response = await axios.get("http://localhost:2000/cart", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCartItems(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };
  const shippingFee = 49;
  const discount = 200;
  const updateQty = async (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(`http://localhost:2000/cart/${id}`, { quantity: newQty }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error("Error updating cart:", err);
      // Revert on error
      fetchCartDetails();
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const finalAmount = subtotal;

  const placeOrder = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error('Please login to place an order');
        return;
      }
      await axios.post("http://localhost:2000/orders", {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Order placed successfully!');
      fetchCartDetails(); // Refresh cart (should be empty now)
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error('Failed to place order');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading cart...</div>;
  if (error) return <div className="text-center mt-5 text-red-600">Error: {error}</div>;

  return (
    <div className="w-full max-w-md mx-auto p-5 bg-white rounded-xl shadow-lg mt-5">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center mb-4"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded"
                onClick={() =>
                  updateQty(item.id, Math.max(1, item.quantity - 1))
                }
              >
                -
              </button>
              <span className="font-bold">{item.quantity}</span>
              <button
                className="px-3 py-1 bg-gray-200 rounded"
                onClick={() => updateQty(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        ))
      )}
      <div className="border-t pt-4 mt-4 space-y-2">
        <h3 className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${finalAmount}</span>
        </h3>
        {cartItems.length > 0 && (
          <button
            onClick={placeOrder}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Place Order
          </button>
        )}
      </div>
    </div>
  );
}


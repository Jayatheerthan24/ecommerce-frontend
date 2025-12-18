import React, { useState, useEffect } from "react";
import axios from 'axios';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem("token");
            if (!token) {
                setError("Please login to view your orders");
                setLoading(false);
                return;
            }
            const response = await axios.get("http://localhost:2000/orders", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setOrders(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-10 text-white">Loading orders...</div>;
    if (error) return <div className="text-center mt-10 text-red-400">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white text-center mb-8">My Orders</h1>
            {orders.length === 0 ? (
                <p className="text-center text-gray-300">You have no orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Order #{order._id.slice(-8)}</h2>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                            'bg-green-100 text-green-800'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="space-y-2 mb-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <span className="text-gray-700">{item.productId.name} (x{item.quantity})</span>
                                        <span className="font-medium">${item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4 flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    Ordered on {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                                <span className="text-xl font-bold text-green-600">Total: ${order.total}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Order;
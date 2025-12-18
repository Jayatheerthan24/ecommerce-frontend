import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:2000/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!product) return <div className="text-center mt-10">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8">
                <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-6" />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                <p className="text-gray-600 mb-4">Category: {product.category || 'General'}</p>
                <p className="text-2xl font-semibold text-green-600 mb-6">${product.price}</p>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
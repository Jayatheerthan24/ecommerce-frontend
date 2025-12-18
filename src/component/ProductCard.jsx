import { Link } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductCard = (props) => {
    const { name, price, image, id } = props

    const handleAddToCart = async () => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                toast.error('Please login to add items to cart');
                return;
            }
            const response = await axios.post('http://localhost:2000/cart', {
                productId: id,
                quantity: 1
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('Added to cart!');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to add to cart');
        }
    };

    return (
        <Link to={`/products/${id}`}>
            <div className="p-4">
                <div className="w-[300px] bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img src={image || 'https://via.placeholder.com/300'} alt={name} className="w-full h-[200px] object-cover rounded-t-xl" />
                    <div className="p-6">
                        <h1 className="font-bold text-gray-800 text-xl">{name}</h1>
                        <p className="text-gray-600 text-sm mt-2">High-quality product with excellent features.</p>
                        <div className="flex justify-between items-center mt-4">
                            <h3 className="font-semibold text-2xl text-green-600">${price}</h3>
                            <button
                                onClick={(e) => { e.preventDefault(); handleAddToCart(); }}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default ProductCard;


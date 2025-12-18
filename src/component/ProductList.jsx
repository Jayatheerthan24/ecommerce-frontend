import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import axios from "axios"
const ProductList = () => {
    const [products, setproducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:2000/products");
            console.log(res.data);
            setproducts(res.data);
        }
        fetchData()
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white text-center mb-8">Our Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                {products.map((product) => {
                    return (
                        <ProductCard key={product._id} id={product._id}
                            name={product.name}
                            price={product.price}
                            image={product.image} />
                    )
                })}
            </div>
        </div>
    )
}
export default ProductList;
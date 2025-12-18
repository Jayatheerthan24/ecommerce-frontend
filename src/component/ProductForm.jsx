import { useState } from "react";
import axios from "axios";

const ProductForm = () => {
    const [productName, setProductname] = useState('')
    const [image, setimage] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');

    const handleProductname = (e) => {
        setProductname(e.target.value)
    }
    const handleImage = (e) => {
        setimage(e.target.value)
    }
    const handlePrice = (e) => {
        setprice(e.target.value)
    }
    const handleCategory = (e) => {
        setcategory(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(productName, image, price, category);
        const res = await axios.post("http://localhost:2000/products", {
            name: productName,
            price: price,
            image: image

        })
        console.log('axios=>', res)
    }

    return (
        <>
            <div className="mt-10 w-[400px] flex flex-col justify-center items-center mx-auto p-10 bg-black-200 shadow-lg rounded-xl">
                <h1 className="font-bold text-2xl mb-5">Add to Cart</h1>
                <label className="font-bold mt-5">Product Name:</label>
                <input type="text" placeholder="Product Name" className="border p-2 rounded-sm w-[70%]"
                    value={productName} onChange={handleProductname} />
                <label className="font-bold mt-5">Image-url:</label>
                <input type="text" placeholder="Image-url" className="border p-2 rounded-sm my-5 w-[70%]"
                    value={image} onChange={handleImage} />
                <label className="font-bold mt-5">Original-price:</label>
                <input type="number" placeholder="Original-price" className="border p-2 rounded-sm my-5 w-[70%]"
                    value={price} onChange={handlePrice} />
                <label className="font-bold mt-5">Category</label>
                <input type="text" placeholder="Category" className="border p-2 rounded-sm my-5 w-[70%]"
                    value={category} onChange={handleCategory} />
                <button className="bg-blue-600 text-white text-lg px-3 py-1 rounded-lg" onClick={handleSubmit}>Add Product</button>
            </div>
        </>
    )
}
export default ProductForm;
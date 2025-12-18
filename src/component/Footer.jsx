const Footer = () => {
    return (
        <footer className="w-full bg-gray-800 text-gray-300 mt-16 py-12">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Brand Section */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-3">ShopNow</h2>
                    <p className="mb-4">
                        Your one-stop shop for the latest products with best deals from top brands.
                    </p>
                    <p><strong>Email:</strong> support@shopnow.com</p>
                    <p><strong>Phone:</strong> +1 (123) 456-7890</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
                        <li><a href="/products" className="hover:text-blue-400 transition">Shop</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">New Arrivals</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Offers</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Customer Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/contact" className="hover:text-blue-400 transition">Contact Us</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">FAQs</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Shipping & Returns</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Warranty</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-8 border-t border-gray-700 pt-4">
                <p>&copy; 2025 ShopNow. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;
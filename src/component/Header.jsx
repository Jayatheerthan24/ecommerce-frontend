import { Link } from 'react-router'

const Header = () => {
    const isLogged = sessionStorage.getItem('isLogged') === 'true';
    const userName = sessionStorage.getItem('name');
    const userRole = sessionStorage.getItem('role');

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/';
    };

    return (
        <header className="w-full bg-linear-to-r from-blue-600 to-purple-600 p-4 shadow-lg">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">ShopNow</h1>
                <ul className="flex gap-6 text-white font-medium">
                    <li><Link to='/' className="hover:text-gray-200 transition">Home</Link></li>
                    <li><Link to='/products' className="hover:text-gray-200 transition">Products</Link></li>
                    <li><Link to='/cart' className="hover:text-gray-200 transition">Cart</Link></li>
                    <li><Link to='/orders' className="hover:text-gray-200 transition">Orders</Link></li>
                    {userRole === 'admin' && (
                        <li><Link to='/admin' className="hover:text-gray-200 transition">Admin</Link></li>
                    )}
                    {isLogged ? (
                        <>
                            <li><Link to='/profile' className="hover:text-gray-200 transition">Profile</Link></li>
                            <li className="text-yellow-300 font-bold">
                                {userName} ({userRole})
                            </li>
                            <li>
                                <button onClick={handleLogout} className="hover:text-gray-200 transition">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li><Link to='/login' className="hover:text-gray-200 transition">Login</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header;
const NavBar=()=>{
    return (  
        <nav className="bg-linear-to-r from-indigo-500 to-purple-500 px-6 py-4 shadow-lg flex justify-between items-center">
      <h1 className="text-2xl font-extrabold text-white tracking-wide">Products</h1>
      <ul className="flex gap-8 text-white font-medium">
        <li className="cursor-pointer hover:opacity-80 transition">Home</li>
        <li className="cursor-pointer hover:opacity-80 transition">Products</li>
        <li className="cursor-pointer hover:opacity-80 transition">Cart</li>
        <li className="cursor-pointer hover:opacity-80 transition">About</li>
         <button className="cursor-pointer w-full hover:opacity-80 transition">Login</button>
         <button className="cursor-pointer w-full hover:opacity-90 transition">Signup</button>
      </ul>
    </nav>
    )
}
export default NavBar;

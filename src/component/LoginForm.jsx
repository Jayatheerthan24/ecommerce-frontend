import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:2000/auth/login",
        {
          email: username,
          password: passwordRef.current.value,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(data.message);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("isLogged", "true");
      sessionStorage.setItem("role", data.role);
      sessionStorage.setItem("name", data.name);
      navigate("/products");

    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm w-[400px] flex flex-col justify-center items-center mx-auto p-10 shadow-xl rounded-xl border border-gray-200"
      >
        <h1 className="font-bold text-3xl mb-6 text-gray-800">Login</h1>

        <input
          type="text"
          placeholder="Email"
          className="border border-gray-300 p-3 rounded-lg w-[80%] mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-3 rounded-lg w-[80%] mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={passwordRef}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white text-lg px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Login
        </button>
        <p className="mt-5 text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

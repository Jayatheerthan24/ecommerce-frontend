import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                "http://localhost:2000/auth/register",
                {
                    name,
                    email,
                    password: passwordRef.current.value,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            toast.success(data.message);

            // After register, login automatically
            const loginRes = await axios.post(
                "http://localhost:2000/auth/login",
                {
                    email,
                    password: passwordRef.current.value,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            toast.success(loginRes.data.message);
            sessionStorage.setItem("token", loginRes.data.token);
            sessionStorage.setItem("isLogged", "true");
            navigate("/products");

        } catch (err) {
            toast.error(err.response?.data?.error || "Registration failed");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white/90 backdrop-blur-sm w-[400px] flex flex-col justify-center items-center mx-auto p-10 shadow-xl rounded-xl border border-gray-200"
            >
                <h1 className="font-bold text-3xl mb-6 text-gray-800">Register</h1>

                <input
                    type="text"
                    placeholder="Name"
                    className="border border-gray-300 p-3 rounded-lg w-[80%] mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="border border-gray-300 p-3 rounded-lg w-[80%] mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-300 p-3 rounded-lg w-[80%] mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
                    ref={passwordRef}
                    required
                />

                <button
                    type="submit"
                    className="bg-green-600 text-white text-lg px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                    Register
                </button>
                <p className="mt-5 text-gray-600">
                    Already have an account? <a href="/login" className="text-green-500 hover:underline">Login here</a>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
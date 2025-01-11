import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://elysian-feast.onrender.com/user/login", {
        identifier: email,
        password,
      });
      if (response.data) {
        toast.success("Login successful! 🚀");
        localStorage.setItem("token", response.data.token); // Save token
        navigate("/admin-dashboard"); // Redirect to admin dashboard
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-black text-white">
      <div className="w-96 bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">Admin Login</h1>
        <p className="text-gray-400 text-center">
          Welcome back! Please log in to manage the admin panel. ✨
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-900 rounded-md p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-900 rounded-md p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-md hover:bg-yellow-600 transition duration-200"
          >
            {loading ? 
            <span className="loading loading-dots loading-md"></span>

            : "Log In"}
          </button>
        </form>
        <p className="text-center text-gray-400">
          Forgot password?{" "}
          <span className="text-yellow-500 hover:underline cursor-pointer">
            Reset here
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

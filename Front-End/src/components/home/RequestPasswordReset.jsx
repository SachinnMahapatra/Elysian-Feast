import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function RequestPasswordReset() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://elysian-feast.onrender.com/user/request-reset", { email });
      toast.success("Password reset link sent!");
      setTimeout(() => navigate("/"), 2000); // Redirect to the home page after 2 seconds
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F5F0E6] via-[#D6A75C] to-[#2F5233]">
    <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-xl p-8">
      <h2 className="text-2xl font-bold text-center text-[#2F5233]">
        Reset Your Password 🔒
      </h2>
      <p className="text-center text-[#7C6145] mt-2">
        Enter your email, and we’ll send you a reset link.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <div className="relative">
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="peer w-full px-4 py-2 border-b-2 border-[#2F5233] focus:border-[#D6A75C] rounded-lg bg-transparent text-[#7C6145] focus:outline-none"
          />
         
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-[#2F5233] text-white rounded-lg hover:bg-[#D6A75C] shadow-md transition duration-200"
        >
          Send Reset Link
        </button>
      </form>
      <p className="text-center mt-4 text-[#7C6145]">
        Remember your password?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-[#D16A48] hover:underline cursor-pointer"
        >
          Login here
        </span>
      </p>
    </div>
  </div>
  
  );
}

export default RequestPasswordReset;

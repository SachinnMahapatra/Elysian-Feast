import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const userInfo = {
      identifier: data.identifier,
      password: data.password,
    };

    try {
      const response = await axios.post("https://elysian-feast.onrender.com/user/login", userInfo);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        toast.success('Logged in successfully');
        setTimeout(() => {
          navigate("/"); 
        }, 500);
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <dialog
        id="loginmodal"
        className="flex items-center justify-center w-screen min-h-screen p-4 bg-gradient-to-b from-[#F5F0E6] via-[#D6A75C] to-[#2F5233]"
      >
        <div
          className="max-w-lg w-full bg-[#ffffff93]  rounded-xl shadow-lg overflow-hidden p-10 space-y-8"
          style={{ animation: 'fadeIn 1s ease-out' }}
        >
          <Link to="/">
            <h2
              className="text-center text-4xl font-bold text-[#2F5233]"
              style={{ animation: "fadeIn 1s ease-out" }}
            >
              ElysianFeast
            </h2>
          </Link>
          <p
            className="text-center text-[#7C6145]"
            style={{ animation: "fadeIn 1.5s ease-out" }}
          >
            Log in to your account
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email or Phone Number Field */}
            <div className="relative">
              <input
                placeholder="Email or Phone Number"
                className="peer h-12 w-full border-b-2 border-[#2F5233] text-[#7C6145] bg-transparent placeholder-transparent focus:outline-none focus:border-[#D6A75C] rounded-lg py-2 px-4"
                required
                id="identifier"
                type="text"
                {...register("identifier", { required: true })}
              />
              <label
                className="absolute left-0 -top-3.5 text-[#7C6145] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#7C6145] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#D16A48] peer-focus:text-sm"
                htmlFor="identifier"
              >
                Email or Phone Number
              </label>
            </div>

            {/* Password Field with show/hide icon */}
            <div className="relative">
              <input
                placeholder="Password"
                className="peer h-12 w-full border-b-2 border-[#2F5233] text-[#7C6145] bg-transparent placeholder-transparent focus:outline-none focus:border-[#D6A75C] rounded-lg py-2 px-4"
                required
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
              />
              <label
                className="absolute left-0 -top-3.5 text-[#7C6145] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#7C6145] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#D16A48] peer-focus:text-sm"
                htmlFor="password"
              >
                Password
              </label>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7C6145]">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xl"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <div className="text-left text-[#7C6145] mt-2">
                <Link to="/request-reset" className="text-[#D16A48] hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              className="w-full py-3 px-6 bg-[#2F5233] hover:bg-[#D6A75C] rounded-lg shadow-md text-white font-semibold transition duration-200"
              type="submit"
            >
              Log In
            </button>
          </form>
          <div className="text-center text-[#7C6145]">
            Don't have an account?
            <Link to="/register" className="text-[#D16A48] hover:underline">
              Register
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Login;

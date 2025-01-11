import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for showing/hiding the password

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const userInfo = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      password: data.password,
      dateOfBirth: data.dateOfBirth,
    };
  
    try {
      const response = await axios.post("https://elysian-feast.onrender.com/user/signup", userInfo);
  
      if (response.data.message === "User already exists") {
        toast.error("A user with this email already exists. Please log in.");
      } else if (response.data.message === "The provided email is invalid or does not exist. Please enter a valid email.") {
        toast.error("The provided email is invalid or does not exist. Please enter a valid email.");
      } else if (response.data.message === "User created successfully. Please verify your email to activate your account.") {
        toast.success('Verification email sent! Please check your inbox.');
        setTimeout(() => {
          navigate("/login"); // Redirect to the login page after a delay
        }, 2000);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <>
      <dialog
        id="signupmodal"
        className="flex items-center justify-center w-full min-h-screen p-4 bg-gradient-to-b from-[#F5F0E6] via-[#D6A75C] to-[#2F5233]"
      >
        <div
          className="max-w-lg w-full bg-[#ffffff93] rounded-xl shadow-lg overflow-hidden p-10 space-y-8"
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
            Create your account
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name Field */}
            <div className="relative">
              <input
                placeholder="First Name"
                className="peer h-12 w-full border-b-2 border-[#2F5233] text-[#7C6145] bg-transparent placeholder-transparent focus:outline-none focus:border-[#D6A75C] rounded-lg py-2 px-4"
                required
                id="firstName"
                type="text"
                {...register("firstName", { required: true })}
              />
              <label
                className="absolute left-0 -top-3.5 text-[#7C6145] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#7C6145] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#D16A48] peer-focus:text-sm"
                htmlFor="firstName"
              >
                First Name
              </label>
            </div>

            {/* Last Name Field */}
            <div className="relative">
              <input
                placeholder="Last Name"
                className="peer h-12 w-full border-b-2 border-[#2F5233] text-[#7C6145] bg-transparent placeholder-transparent focus:outline-none focus:border-[#D6A75C] rounded-lg py-2 px-4"
                required
                id="lastName"
                type="text"
                {...register("lastName", { required: true })}
              />
              <label
                className="absolute left-0 -top-3.5 text-[#7C6145] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#7C6145] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#D16A48] peer-focus:text-sm"
                htmlFor="lastName"
              >
                Last Name
              </label>
            </div>

            {/* Phone Number Field */}
            <div className="relative">
              <input
                placeholder="Phone Number"
                className="peer h-12 w-full border-b-2 border-[#2F5233] text-[#7C6145] bg-transparent placeholder-transparent focus:outline-none focus:border-[#D6A75C] rounded-lg py-2 px-4"
                required
                id="phoneNumber"
                type="text"
                {...register("phoneNumber", { required: true })}
              />
              <label
                className="absolute left-0 -top-3.5 text-[#7C6145] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#7C6145] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#D16A48] peer-focus:text-sm"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                placeholder="Email"
                className="peer h-12 w-full border-b-2 border-[#2F5233] text-[#7C6145] bg-transparent placeholder-transparent focus:outline-none focus:border-[#D6A75C] rounded-lg py-2 px-4"
                required
                id="email"
                type="email"
                {...register("email", { required: true })}
              />
              <label
                className="absolute left-0 -top-3.5 text-[#7C6145] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#7C6145] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#D16A48] peer-focus:text-sm"
                htmlFor="email"
              >
                Email address
              </label>
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                placeholder="Password"
                className="peer h-12 w-full border-b-2 border-[#2F5233] text-[#7C6145] bg-transparent placeholder-transparent focus:outline-none focus:border-[#D6A75C] rounded-lg py-2 px-4"
                required
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
              />
              <label
                className="absolute left-0 -top-3.5 text-[#7C6145] text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#7C6145] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#D16A48] peer-focus:text-sm"
                htmlFor="password"
              >
                Password
              </label>
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7C6145]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              className="w-full py-3 px-6 bg-[#2F5233] hover:bg-[#D6A75C] rounded-lg shadow-md text-white font-semibold transition duration-200"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="text-center text-[#7C6145]">
            Already have an account?
            <Link to="/login" className="text-[#D16A48] hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Signup;

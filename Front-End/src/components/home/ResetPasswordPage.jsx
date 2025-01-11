import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // For the eye icon toggle

const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Extract token from URL query parameters
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  // Handle password reset form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('❗ Passwords do not match');
      toast.error('❗ Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://elysian-feast.onrender.com/user/reset-password', {
        token,
        newPassword,
      });

      if (response.status === 200) {
        toast.success('✅ Password reset successfully');
        navigate('/login'); // Redirect to the login page after success
      }
    } catch (error) {
      setError('🚨 Error resetting password. Please try again.');
      toast.error('🚨 Error resetting password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md bg-white/40 backdrop-blur-lg rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-[#2F5233] text-center mb-6">
          🔒 Reset Your Password
        </h2>
        {error && <p className="text-red-600 mb-4 text-lg font-semibold text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="newPassword"
              className="block text-[#7C6145] font-medium mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border border-[#D6A75C] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D6A75C] text-[#7C6145]"
              />
              <button
                type="button"
                className="absolute top-3 right-4 text-[#7C6145] hover:text-[#D16A48]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
              </button>
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block text-[#7C6145] font-medium mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border border-[#D6A75C] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D6A75C] text-[#7C6145]"
              />
              <button
                type="button"
                className="absolute top-3 right-4 text-[#7C6145] hover:text-[#D16A48]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
              </button>
            </div>
          </div>
          <button
  type="submit"
  className="w-full py-3 bg-[#F5F0E6] text-[#2F5233] font-semibold rounded-lg shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.7)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(255,255,255,0.7)] active:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] transition-shadow duration-300"
>
  Reset Password 🚀
</button>

        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState(null);
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (!token) {
        setVerificationStatus("error");
        toast.error("Verification token is missing.");
        return;
      }

      try {
        const response = await axios.get(`https://elysian-feast.onrender.com/user/verify-email/${token}`);
        if (response.status === 200) {
          setVerificationStatus("success");
          toast.success("Email verified successfully. You can now log in.");
        }
      } catch (error) {
        setVerificationStatus("error");
        toast.error("Invalid or expired verification token.");
      }
    };

    verifyUserEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
      <h2 className="text-4xl font-bold mb-6">Verify Your Email</h2>
      {verificationStatus === "success" && (
        <div className="bg-green-500 p-4 rounded-md shadow-md text-center">
          <p>Your email has been successfully verified!</p>
          <Link to= "/login">Log In</Link>
        </div>
      )}
      {verificationStatus === "error" && (
        <div className="bg-red-500 p-4 rounded-md shadow-md text-center">
          <p>Verification failed. The token may be invalid or expired.</p>
        </div>
      )}
      {!verificationStatus && (
        <div className="text-center">
          <p>Verifying your email, please wait...</p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;

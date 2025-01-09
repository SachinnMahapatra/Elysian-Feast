import HomePage from "./Home";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import Contact from "./components/Contact";
import Monsoon from "./components/Monsoon";
import RequestResetPassword from "./components/home/RequestPasswordReset";
import ResetPasswordPage from "./components/home/ResetPasswordPage";
import About from "./components/About";
import TableBooking from "./components/TableBooking";
import VerifyEmail from "./components/VerifyEmail";
import Checkout from "./components/Checkout";
import ProductDetails from "./components/ProductDetails";
import Category from "./components/category/Category";

export default function App() {
  return (
    <>
    <Routes >
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/request-reset" element={<RequestResetPassword />}/>
    <Route path="/Register" element={<Signup />}/>
    <Route path="/Contact" element={<Contact />}/>
    <Route path="/reset-password" element={<ResetPasswordPage />} />
    <Route path="/about" element={<About />} />
    <Route path="/table-booking" element={<TableBooking />} />
    <Route path="/verify-email" element={<VerifyEmail />} />
    <Route path="/checkout/:userId" element={<Checkout />} />
    <Route path="/product/:productId" element={<ProductDetails />} />
    <Route path="/category" element={<Category />} />
    {/* <Route path="/products" element={<Monsoon />}/> */}
    </Routes>
    <Toaster/>
    
    
    </>
  )
}
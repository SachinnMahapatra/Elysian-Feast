import React, { useState } from 'react';
import myimag from '/Hero@2x.png'; // First image (Hero)
import secondImage from '../assets/map.jpg'; // Second image
import Header from './home/Header';

function ContactAkash() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if all fields are filled
    if (!formData.fullName || !formData.email || !formData.message) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    // Validate the email format
    if (!validateEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage(''); // Clear any previous error messages

    // If validation passes, log the form data
    console.log('Form Submitted:', formData);
  };

  return ( 
    <>
    <Header />
    <div className="relative bg-white flex items-center justify-center min-h-screen px-4 sm:px-8 lg:px-16">
      {/* Content container */}
      <div className="relative p-6 md:p-8 lg:p-12 rounded-lg text-left z-10 flex flex-col items-center w-full max-w-4xl">
        
        {/* First image (Hero) */}
        <div className="relative w-full mb-6">
          <img className="opacity-75 w-full rounded-lg" src={myimag} alt="Hero" />
          <h1 className="absolute inset-0 flex items-center justify-center text-amber-300 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl z-10">
            Contact Us
          </h1>
        </div>

        {/* Second image wrapped in an anchor tag */}
        <a href="https://maps.windows.com/?form=WNAMSH&entity=local_ypid%3AYN4070x3495116214939042959&collection=point.22.613914_88.429955_Absolute%20Barbecues%20-%20Baguiati"
           target="_blank" rel="noopener noreferrer" className="w-full text-center">
          <img
            className="opacity-75 mb-6 w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto"
            src={secondImage} alt="Map"
            />
        </a>

        {/* Form for user input */}
        <form id="notify-form" className="relative z-10 flex flex-col items-center mt-4 w-full space-y-4" onSubmit={handleSubmit}>
          
          {/* Full Name Input */}
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="p-2 w-full rounded border border-black focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:max-w-md"
            />
          
          {/* Email ID Input */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email ID"
            className="p-2 w-full rounded border border-black focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:max-w-md"
            />
          
          {/* Message Textarea */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="p-2 w-full rounded border border-black  focus:outline-none focus:ring-2 focus:ring-yellow-500 h-32 sm:max-w-md"
            />
          
          {/* Error message */}
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-6 rounded text-sm sm:text-base"
            >
            Subscribe
          </button>
        </form>
      </div>

      {/* Optional overlay for dark background */}
      <div className="absolute inset-0 bg-white z-0"></div>
    </div>
            </>
  );
}

export default ContactAkash;
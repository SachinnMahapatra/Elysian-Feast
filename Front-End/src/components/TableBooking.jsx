import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "./home/Header";
// import ElegantTableImage from "../assets/ElegantTable.png"; // Import the image

const TableBooking = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    timeSlot: "",
    guests: "",
    specialRequest: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //("Table Booking Details:", formData);
    toast.success("Your table has been successfully booked!");

    // Reset form data
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      timeSlot: "",
      guests: "",
      specialRequest: "",
    });
   
  };

  return ( 
    <>
    <Header />
    <section className="bg-gradient-to-r from-purple-300 via-blue-400 to-indigo-600 text-white py-16">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center">
        {/* Left Side Text */}
        <div className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Reserve Your Table with Elegance ✨
          </h2>
          <p className="text-lg mb-6">
            Experience the magic of Elysian Feast, where every meal is a
            celebration. Reserve your table now and create unforgettable
            moments with your loved ones.
          </p>
          <p className="text-lg italic">
            "Great food, good company, and a perfect ambiance await you!"
          </p>
        </div>

        {/* Right Side Image */}
        <div className="lg:w-1/2">
          <img
            src="ElegantTable.png"
            alt="Elegant Dining"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Booking Form */}
      <div className="container mx-auto mt-16 bg-gradient-to-bl from-[#7e87e569]  to-[#a872b47c] rounded-lg shadow-lg p-8">
  <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Book a Table 🪑</h3>
  <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Name Field */}
    <div className="relative">
      <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-purple-900 text-black "
        placeholder="Enter your full name"
        required
      />
      <label
        htmlFor="name"
        className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:-top-3.5 peer-focus:text-purple-800 peer-focus:text-sm"
      >
        Full Name
      </label>
    </div>

    {/* Email Field */}
    <div className="relative">
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-purple-900 text-black"
        placeholder="Enter your email"
        required
      />
      <label
        htmlFor="email"
        className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:-top-3.5 peer-focus:text-purple-800 peer-focus:text-sm"
      >
        Email Address
      </label>
    </div>

    {/* Phone Field */}
    <div className="relative">
      <input
        id="phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-purple-900 text-black"
        placeholder="Enter your phone number"
        required
      />
      <label
        htmlFor="phone"
        className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:-top-3.5 peer-focus:text-purple-800 peer-focus:text-sm"
      >
        Phone Number
      </label>
    </div>

    {/* Date Field */}
    <div className="relative">
      <input
        id="date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-purple-900 text-black"
        required
      />
      <label
        htmlFor="date"
        className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:-top-3.5 peer-focus:text-purple-800 peer-focus:text-sm"
      >
        Date
      </label>
    </div>

    {/* Guests Dropdown */}
    <div className="relative">
      <select
        id="guests"
        name="guests"
        value={formData.guests}
        onChange={handleChange}
        className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-purple-900 text-black"
        required
      >
        <option value="" disabled>Select number of guests</option>
        <option value="1">1 Guest</option>
        <option value="2">2 Guests</option>
        <option value="3">3 Guests</option>
        <option value="4">4 Guests</option>
      </select>
      <label
        htmlFor="guests"
        className="absolute left-0 -top-3.5 text-gray-200 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:-top-3.5 peer-focus:text-purple-800 peer-focus:text-sm"
      >
        Number of Guests
      </label>
    </div>

    {/* Time Slot Dropdown */}
    <div className="relative">
      <select
        id="timeSlot"
        name="timeSlot"
        value={formData.timeSlot}
        onChange={handleChange}
        className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-purple-900 text-black"
        required
      >
        <option value="" disabled>Choose a time slot</option>
        <option value="1-3">1:00 PM - 3:00 PM</option>
        <option value="3-5">3:00 PM - 5:00 PM</option>
        <option value="5-7">5:00 PM - 7:00 PM</option>
        <option value="7-9">7:00 PM - 9:00 PM</option>
        <option value="9-11">9:00 PM - 11:00 PM</option>
      </select>
      <label
        htmlFor="timeSlot"
        className="absolute left-0 -top-3.5 text-gray-200 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-900 peer-focus:-top-3.5 peer-focus:text-purple-800 peer-focus:text-sm"
      >
        Select Time Slot
      </label>
    </div>

    {/* Special Requests */}
    <div className="relative col-span-1 lg:col-span-2">
      <textarea
        id="specialRequest"
        name="specialRequest"
        value={formData.specialRequest}
        onChange={handleChange}
        className="peer w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-purple-900 text-black"
        placeholder="Any special requests or preferences"
        rows="3"
      ></textarea>
      <label
        htmlFor="specialRequest"
        className="absolute left-0 -top-3.5 text-gray-950 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-000 peer-focus:-top-3.5 peer-focus:text-purple-800 peer-focus:text-sm"
      >
        Special Requests
      </label>
    </div>

    {/* Submit Button */}
    <div className="col-span-1 lg:col-span-2 flex justify-center">
    <button
  type="submit"
  className="text-black px-6 py-2 rounded-[49px] bg-[#e5bae9b6] 
  shadow-[5px_5px_22px_#8b8b8b,-5px_-5px_22px_#ffffff] 
  hover:shadow-[7px_7px_28px_#8b8b8b,-7px_-7px_28px_#ffffff] 
  hover:bg-[#f0f0f0] 
  active:shadow-[inset_5px_5px_22px_#8b8b8b,inset_-5px_-5px_22px_#ffffff] 
  active:scale-99 
  active:text-[99%] 
  transition-all duration-300 ease-in-out"
>
  Book Now
</button>

    </div>
  </form>
</div>
    </section>
</>
  );
};

export default TableBooking;

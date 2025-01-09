import React from 'react';
import { useNavigate } from 'react-router-dom';

function BookingSection() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/table-booking'); // Navigate to the table booking page
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between h-screen p-4 md:p-40 bg-gradient-to-t from-[#F5F0E6] via-[#D6A75C] to-[#D16A48]">
      {/* Left Side Quote */}
      <div className="w-full md:w-1/2 text-[#5a4125] mb-10 md:mb-0 flex flex-col justify-center md:translate-y-0 translate-y-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
          "A table is not just a place to eat, <br />
          it's where memories are made."
        </h2>
        <p className="text-sm sm:text-md md:text-lg lg:text-xl font-light">
          Reserve your table today and indulge in the extraordinary dining experience 
          we offer. Let us turn your meals into unforgettable moments.
        </p>
      </div>

      {/* Right Side Image */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-end mt-6 md:mt-0">
        <img
          src="ElegantTable.png" // Replace with the actual path to your image
          alt="Elegant Dining"
          className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 rounded-lg shadow-lg object-cover transition-transform duration-300 ease-in-out md:translate-y-0 -translate-y-52"
          // Move image up on smaller screens
        />
      </div>

      {/* Button Positioned at the Center-Bottom */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full md:w-auto">
        <button
          onClick={handleNavigate}
          className="text-[#7C6145] font-semibold px-6 py-3 rounded-[49px] bg-[#e0e0e0] 
          shadow-[5px_5px_22px_#8b8b8b,-5px_-5px_22px_#ffffff] 
          hover:shadow-[7px_7px_28px_#8b8b8b,-7px_-7px_28px_#ffffff] 
          hover:bg-[#f0f0f0] 
          active:shadow-[inset_5px_5px_22px_#8b8b8b,inset_-5px_-5px_22px_#ffffff] 
          active:scale-99 
          active:text-[99%] 
          transition-all duration-300 ease-in-out 
          w-full md:w-auto md:-translate-y-10 -translate-y-14"
        >
          Book Your Table Now
        </button>
      </div>
    </div>
  );
}

export default BookingSection;

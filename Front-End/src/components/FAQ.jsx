import React from 'react';
import myimag from '/Hero@2x.png'; // First image (Hero)
import secondImage from '/1.jpg'; // Second image
// import thirdImage from '../../1.jpg'; // Third image (newly added)

function FAQ() {
  return (
    <>
      <div className="relative bg-white flex items-center justify-center min-h-screen px-4 sm:px-8"> {/* Set a black background */}
        
        {/* Content container */}
        <div className="relative p-4 sm:p-8 rounded-lg text-left z-10 flex flex-col items-center w-full max-w-[1200px]"> {/* Responsive width */}
          
          {/* First image (Hero) */}
          <div className="relative w-full mb-8"> {/* Container for the first image */}
            <img 
              className="opacity-75 w-full h-auto" 
              style={{
                maxHeight: '500px', // Optimized height
              }} 
              src={myimag} 
              alt="Hero" 
            /> 
            
            {/* Smaller Text for FAQ with Dimmed Color */}
            <h1 
              className="absolute text-center text-amber-300 font-semibold z-10 w-full"
              style={{
                top: '60%',  // Position the text slightly lower for single line
                left: '50%',
                transform: 'translate(-50%, -50%)', // Center text
                fontSize: 'calc(1.2rem + 1vw)', // Responsive font size
                whiteSpace: 'nowrap', // Ensure text stays on one line
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Frequently Asked Questions
            </h1>
          </div>
          
          {/* Second image and FAQ section */}
          <div className="relative flex flex-col lg:flex-row items-start justify-between gap-8 w-full mt-8"> {/* Flex row layout for larger screens */}
            {/* Second image */}
            <img 
              className="relative z-10 opacity-75 w-full h-auto max-w-full lg:max-w-[40%]" 
              style={{
                maxHeight: '300px', // Optimized height
              }} 
              src={secondImage} 
              alt="Map" 
            /> 

            {/* FAQ section */}
            <div className="text-black text-left flex-grow">
              <h2 className="font-semibold text-lg sm:text-xl mb-4">How do I reach to the restaurant?</h2>
              <p className="text-sm sm:text-base mb-6">
                1st Floor, MOB-7337336828, OMEGA, GP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091
              </p>
              <h2 className="font-semibold text-lg sm:text-xl mb-4">Is there a reservation required?</h2>
              <p className="text-sm sm:text-base mb-6">
                Reservations are not mandatory but highly recommended, especially for weekends to ensure you have a table.
              </p>

              <h2 className="font-semibold text-lg sm:text-xl mb-4">Can I host an event at the restaurant?</h2>
              <p className="text-sm sm:text-base mb-6">
                Yes, Elysian Feast offers event hosting for private gatherings, birthdays. Please contact us for details and booking.
              </p>

              <h2 className="font-semibold text-lg sm:text-xl mb-4">Is valet parking available at the restaurant?</h2>
              <p className="text-sm sm:text-base mb-6">
                Yes, valet parking is available for your convenience.
              </p>

              <h2 className="font-semibold text-lg sm:text-xl mb-4">Is seafood available at the restaurant?</h2>
              <p className="text-sm sm:text-base">
                Yes, we offer a variety of fresh seafood options, prepared with gourmet techniques.
              </p>
            </div>
          </div>
        </div>

        {/* Optional overlay for dark background */}
        <div className="absolute inset-0 bg-white  z-0"></div> {/* If you want to darken the background further */}
      </div>
    </>
  );
}

export default FAQ;
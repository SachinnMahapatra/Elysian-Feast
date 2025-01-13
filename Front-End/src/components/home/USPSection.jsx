import React from 'react';
import { Link } from 'react-router-dom';

function USPSection() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center h-screen bg-gradient-to-b from-[#F5F0E6] via-[#D6A75C] to-[#D16A48] p-6">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto space-y-8 md:space-y-0 md:space-x-4 px-4">
        {/* About Us section */}
        <div className="flex-1 text-center text-[#7C6145]">
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="mb-4">
            Elysian Feast is dedicated to the art of gourmet dining, where each dish is meticulously crafted for connoisseurs. Our passion for excellence shines through in every flavor, made with the finest ingredients.
          </p>
          <Link to="about"
            className="px-6 py-3 text-[#7C6145] rounded-[49px] bg-[#e0e0e0] 
            shadow-[5px_5px_22px_#8b8b8b,-5px_-5px_22px_#ffffff] 
            hover:shadow-[7px_7px_28px_#8b8b8b,-7px_-7px_28px_#ffffff] 
            hover:bg-[#f0f0f0] 
            active:shadow-[inset_5px_5px_22px_#8b8b8b,inset_-5px_-5px_22px_#ffffff] 
            active:scale-99 
            active:text-[99%]  
            transition-all duration-300 ease-in-out"
          >
            Know More
          </Link>
        </div>

        {/* Knife Image */}
        <div className="flex-shrink-0 my-8 md:my-0">
          <img src="usp.jpg" alt="Knife" className="h-48 md:h-96 w-auto object-contain mx-auto rounded-lg shadow-lg" />
        </div>

        {/* About Food section */}
        <div className="flex-1 text-center text-[#7C6145]">
          <h2 className="text-4xl font-bold mb-4">About Food</h2>
          <p className="mb-4">
            Each dish is thoughtfully curated to deliver bold flavors and refined textures, offering a gourmet experience that delights the senses. Every plate is a celebration of taste and artistry.
          </p>
          <Link to="category"
            className=" px-6 mt-7 py-3 text-[#7C6145] rounded-[49px] bg-[#e0e0e0] 
            shadow-[5px_5px_22px_#8b8b8b,-5px_-5px_22px_#ffffff] 
            hover:shadow-[7px_7px_28px_#8b8b8b,-7px_-7px_28px_#ffffff] 
            hover:bg-[#f0f0f0] 
            active:shadow-[inset_5px_5px_22px_#8b8b8b,inset_-5px_-5px_22px_#ffffff] 
            active:scale-99 
            active:text-[99%] 
            transition-all duration-300 ease-in-out"
          >
            Know More
          </Link>
        </div>
      </div>
    </section>
  );
}

export default USPSection;

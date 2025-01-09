import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col md:flex-row items-center justify-center bg-[#F5F0E6] bg-cover bg-center p-6">
      <div className="text-center md:text-left max-w-xl w-full md:w-1/2 p-4">
        <h2 className="pt-8 md:pt-0 text-4xl md:text-5xl font-bold mb-4 text-[#2F5233]">
          Crafted For Connoisseurs
        </h2>
        <p className="text-lg md:text-xl mb-8 text-[#5A6E48]">
          Welcome to Elysian Feast, where every dish is an ode to culinary artistry. Crafted for connoisseurs, our menu showcases a symphony of flavors, curated with the finest ingredients and meticulous passion. Join us in indulging your senses in a dining experience beyond compare.
        </p>
        <Link to="/category"
          className="px-6 py-3 text-black font-semibold rounded-[49px] bg-[#e0e0e0] 
          shadow-[5px_5px_22px_#8b8b8b,-5px_-5px_22px_#ffffff] 
          hover:shadow-[7px_7px_28px_#8b8b8b,-7px_-7px_28px_#ffffff] 
          hover:bg-[#f0f0f0] 
          active:shadow-[inset_5px_5px_22px_#8b8b8b,inset_-5px_-5px_22px_#ffffff] 
          active:scale-98 
          active:text-[98%] 
          transition-all duration-300 ease-in-out"
        >
          Explore Menu
        </Link>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
        <img
          className="w-3/5 md:w-3/5 rounded-lg shadow-[7px_7px_22px_#8b8b8b,-7px_-7px_22px_#ffffff] hover:scale-105 transition-transform duration-300"
          src="src/assets/mainimage.webp"
          alt="Gourmet Dish"
        />
      </div>
    </section>
  );
}

export default HeroSection;

// src/components/Header.jsx
import React from 'react';

const Head = () => {
  return (
    <header className="relative w-full pr-4 bg-gray-50">
      <img src="categhead.jpeg" alt="Welcome to Elysian Feast" className="w-full h-96 object-cover" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-2xl sm:text-3xl font-bold">
        <h1>Our Categories</h1>
        <p className="mt-4 text-sm sm:text-base text-white">
          Where every dish is a masterpiece crafted from the finest seasonal ingredients, designed to delight your palate and create unforgettable memories. Bon appétit!
        </p>
      </div>
    </header>
  );
};

export default Head;

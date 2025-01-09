import React from 'react';

const Head = () => {
  return (
    <header className="relative w-full pr-4">
    <img
      src="categhead.jpeg"
      alt="Welcome to Elysian Feast"
      className="w-full h-64 sm:h-96 object-cover"
    />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-lg sm:text-2xl font-bold px-4">
      <h1 className="text-lg sm:text-3xl">Our Categories</h1>
      <p className="mt-4 text-sm sm:text-base text-white">
      Where every dish is a masterpiece crafted from the finest seasonal ingredients, designed to delight your palate and create unforgettable memories. Bon appétit!
      </p>
    </div>
  </header>
  );
};

export default Head;
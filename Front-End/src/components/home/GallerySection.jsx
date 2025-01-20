import React from "react";

function GallerySection() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#F5F0E6] via-[#D6A75C] to-[#2F5233] flex justify-center items-center">
      <div className="max-w-6xl mx-auto px-6 py-10 bg-white bg-opacity-20 backdrop-blur-md shadow-xl rounded-2xl">
        <h3 className="text-4xl font-extrabold text-[#7C6145] text-center mb-8 font-poppins">
          Photo Gallery
        </h3>
        <p className="text-lg text-[#7C6145] text-center mb-12">
          Explore our exquisite dishes prepared with love and passion.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Image Card 1 */}
          <div className="relative group">
            <img
              src="Fcombo.png"
              alt="Dish 1"
              className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-medium">Delicious Dish 1</p>
            </div>
          </div>

          {/* Image Card 2 */}
          <div className="relative group">
            <img
              src="Cpizza.png"
              alt="Dish 2"
              className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-medium">Delicious Dish 2</p>
            </div>
          </div>

          {/* Image Card 3 */}
          <div className="relative group">
            <img
              src="Dburger.png"
              alt="Dish 3"
              className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-medium">Delicious Dish 3</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GallerySection;

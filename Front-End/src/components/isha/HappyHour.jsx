import React from "react";

const HappyHours = () => (
  <section className="py-16 bg-[#7a5a3b] text-center">
    <div className="bg-[url('/fru.png')] h-full flex flex-col items-center justify-around p-8 sm:p-16 lg:p-28">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400 mb-4">
        Happy Hours
      </h2>
      {/* Subtitle */}
      <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6">
        Monday - Friday (4 PM - 7 PM)
      </p>
    </div>
  </section>
);

export default HappyHours;

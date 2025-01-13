import React from "react";
import { Link } from "react-router-dom";


const SpecialSection = () => {
  return (
    <div className="bg-gradient-to-b from-[#F5F0E6] via-[#D6A75C] to-[#D16A48] text-[#F5F5F5] font-serif flex justify-center items-center min-h-screen px-4">
      <div className="flex flex-col lg:flex-row justify-center items-center lg:w-4/5 gap-8">
        {/* Left Menu Section */}
        <div className="w-full lg:w-1/3 p-5 text-left">
          <h2 className="text-lg lg:text-2xl font-normal mb-5 text-center">
            Vegan Delicacies & Soup
          </h2>
          <ul className="list-none space-y-3">
            <li className="flex justify-between text-sm lg:text-lg">
              <span>Stuffed Zucchini Boats</span>
              <span>Rs.4000</span>
            </li>
            <li className="flex justify-between text-sm lg:text-lg">
              <span>Baked Tempeh With Soya Glaze</span>
              <span>Rs.4200</span>
            </li>
            <li className="flex justify-between text-sm lg:text-lg">
              <span>Cauliflower Steaks With Chimichurri</span>
              <span>Rs.4200</span>
            </li>
            <li className="flex justify-between text-sm lg:text-lg">
              <span>Butternut Squash Soup</span>
              <span>Rs.3400</span>
            </li>
            <li className="flex justify-between text-sm lg:text-lg">
              <span>Mushroom & Thyme Soup</span>
              <span>Rs.3800</span>
            </li>
          </ul>
        </div>

        {/* Center Menu Section */}
        <div className="w-full lg:w-1/3 text-center my-5 lg:my-0">
          <h3 className="text-sm lg:text-lg font-light mb-2">
            Menu That Fits Your Palate
          </h3>
          <h1 className="text-xl lg:text-3xl mb-5 font-bold text-[#7C6145]">
            Today's Special
          </h1>
          <div className="mb-5 flex justify-center">
            <img
              src="Heroimg.png"
              alt="Today's Special Cake"
              className="w-40 lg:w-64 rounded-lg shadow-lg object-cover transition-transform duration-300 ease-in-out"
            />
          </div>
          <Link to="/category" className="mt-5 px-4 py-2 bg-[#D16A48] text-white rounded-md text-sm lg:text-lg hover:bg-[#7C6145]">
            View More
          </Link>
        </div>

        {/* Right Menu Section */}
        <div className="w-full lg:w-1/3 p-5 text-left">
          <h2 className="text-lg lg:text-2xl font-normal mb-5 text-center">
            Dessert
          </h2>
          <ul className="list-none space-y-3">
            <li className="flex justify-between text-sm lg:text-lg">
              <span>Pistachio & White Chocolate Mousse</span>
              <span>Rs.4800</span>
            </li>
            <li className="flex justify-between text-sm lg:text-lg">
              <span>Chocolate Mousse</span>
              <span>Rs.4500</span>
            </li>
            <li className="flex justify-between text-sm lg:text-lg">
              <span>Raspberry Cheesecake</span>
              <span>Rs.4400</span>
            </li>
            <li className="flex justify-between text-sm lg:text-lg">
              <span>Mango Sticky Rice</span>
              <span>Rs.2500</span>
            </li>
            <li className="flex justify-between text-sm lg:text-lg">
              <span>Matcha Green Tea Cheesecake</span>
              <span>Rs.2600</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpecialSection;

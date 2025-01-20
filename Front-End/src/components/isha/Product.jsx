import React from "react";
import { Heart } from "lucide-react";

const fastFoodItems = [
  {
    id: 1,
    image: "public/Dburger.png",
    discount: "-25%",
    name: "Delicious Burger",
    originalPrice: "$60.00",
    discountedPrice: "$45.00",
  },
  {
    id: 2,
    image: "public/Gchicken.png",
    discount: "-7%",
    name: "Grilled Chicken",
    originalPrice: "$42.00",
    discountedPrice: "$39.00",
  },
  {
    id: 3,
    image: "public/wrapp.png",
    discount: "-10%",
    name: "Ruti With Chicken",
    originalPrice: "$29.00",
    discountedPrice: "$26.00",
  },
  {
    id: 4,
    image: "public/Fcombo.png",
    discount: "-18%",
    name: "Fast Food Combo",
    originalPrice: "$34.00",
    discountedPrice: "$28.00",
  },
  {
    id: 5,
    image: "public/Cpizza.png",
    discount: "-21%",
    name: "Chicago Deep Pizza",
    originalPrice: "$28.00",
    discountedPrice: "$22.00",
  },
  {
    id: 6,
    image: "public/Chinpasta.png",
    discount: "-15%",
    name: "Chinese Pasta",
    originalPrice: "$40.00",
    discountedPrice: "$34.00",
  },
  {
    id: 7,
    image: "public/Wburger.png",
    discount: "-13%",
    name: "Whopper Burger King",
    originalPrice: "$30.00",
    discountedPrice: "$26.00",
  },
  {
    id: 8,
    image: "public/Bwrap.png",
    discount: "-7%",
    name: "Ruti With Beef Slice",
    originalPrice: "$30.52",
    discountedPrice: "$28.52",
  },
];

const Product = () => {
  return (
    <div className="bg-[#7a5938fb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tagline */}
        <p className="text-green-600 text-sm font-semibold text-center">
          Crispy, Every Bite Taste
        </p>
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mt-2 text-center">
          Popular Fast Foods
        </h1>
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {fastFoodItems.map((item) => (
            <div
              key={item.id}
              className="relative bg-white shadow-md rounded-lg p-4 text-center hover:scale-105 transform transition duration-300"
            >
              <div className="absolute top-2 left-2  rounded-sm text-pink-700 p-2">
                <Heart size={20} />
              </div>
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 object-cover"
              />

              <p className="text-gray-500">
                <span className="mr-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                  {item.discount}
                </span>
                <s className="text-red-500">{item.originalPrice}</s>{" "}
                {item.discountedPrice}
              </p>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
        {/* View More Button */}
        <div className="text-center py-6">
          <button className="mt-2 px-6 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
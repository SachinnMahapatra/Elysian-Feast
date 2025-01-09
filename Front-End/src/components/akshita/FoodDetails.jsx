import React from "react";

const FoodDetails = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-6 sm:px-8 md:px-16 py-10">
      {/* Header */}
      <header className="w-full flex justify-center items-center bg-white p-4 sm:p-6 shadow-md">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
          Truffle Infused White Mushroom Risotto Balls
        </h1>
      </header>

      {/* Food Image */}
      <div className="w-full mt-6 px-2 sm:px-4">
        <img
          src="truffle.jpeg" // Replace with actual image URL
          alt="Truffle Infused White Mushroom Risotto Balls"
          className="rounded-lg w-full object-cover h-64 sm:h-80 md:h-96"
        />
      </div>

      {/* Food Details */}
      <div className="w-full bg-white p-6 sm:p-8 mt-6 rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Truffle Infused White Mushroom Risotto Balls
        </h2>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
          Creamy risotto infused with the earthy flavors of wild mushrooms and
          finished with aromatic truffle oil, offering a luxurious taste
          experience. Each bite is enhanced by a crispy, golden-fried exterior,
          creating a delightful contrast of textures.
        </p>

        {/* Ingredients */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-2xl font-semibold mb-4">
            Ingredients
          </h3>
          <p className="text-gray-700 text-base leading-relaxed">
            Pasta, Eggs, Pancetta, Parmesan Cheese, Black Pepper, Salt
          </p>
        </div>

        {/* You Might Also Like */}
        <div>
          <h3 className="text-lg sm:text-2xl font-semibold mb-6">
            You Might Also Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {/* Grilled Zucchini */}
            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg flex flex-col items-center">
              <img
                src="zuchhini.jpg" // Replace with actual image URL
                alt="Grilled Zucchini and Herbed Ricotta"
                className="rounded-md object-cover w-32 h-32 sm:w-48 sm:h-48"
              />
              <h4 className="text-base sm:text-lg font-semibold mt-4 text-center">
                Grilled Zucchini with Herbed Ricotta
              </h4>
            </div>

            {/* Tempura Vegetables */}
            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg flex flex-col items-center">
              <img
                src="tempuraveg.jpeg" // Replace with actual image URL
                alt="Tempura Vegetables with Soy Ginger Dip"
                className="rounded-md object-cover w-32 h-32 sm:w-48 sm:h-48"
              />
              <h4 className="text-base sm:text-lg font-semibold mt-4 text-center">
                Tempura Vegetables with Soy Ginger Dip
              </h4>
            </div>

            {/* Another Item */}
            <div className="bg-gray-100 p-4 sm:p-6 rounded-lg flex flex-col items-center">
              <img
                src="tempuraveg.jpeg" // Replace with actual image URL
                alt="Tempura Vegetables with Soy Ginger Dip"
                className="rounded-md object-cover w-32 h-32 sm:w-48 sm:h-48"
              />
              <h4 className="text-base sm:text-lg font-semibold mt-4 text-center">
                Tempura Vegetables with Soy Ginger Dip
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <footer className="w-full flex flex-col sm:flex-row justify-between items-center bg-white p-6 mt-6 rounded-lg shadow-md gap-4">
        <button className="bg-orange-500 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-full text-base sm:text-lg">
          Buy now
        </button>
        <button className="bg-orange-500 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-full text-base sm:text-lg">
          Add to Cart
        </button>
      </footer>
    </div>
  );
};

export default FoodDetails;

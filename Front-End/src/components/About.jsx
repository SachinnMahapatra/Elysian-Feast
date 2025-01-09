import React from "react";
import a1 from '../assets/about/about1.jpg'
import a2 from '../assets/about/about2.jpg'
import a3 from '../assets/about/about3.jpg'
import a4 from '../assets/about/about4.jpg'
import a0 from '../assets/about/welcome.jpg'
import Header from "./home/Header";

const About = () => {
  return (
    <>
    <Header/>
    <div className="bg-gray-50">
      {/* Header */}
      
      <header className="relative w-full">
        <img
          src={a0}
          alt="Welcome to Elysian Feast"
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[400px] object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-shadow px-4">
          Welcome to Elysian Feast
        </div>
      </header>

      {/* Our History Section */}
      <section className="container mx-auto px-4 py-8 md:py-16 text-black">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Our History
        </h2>
        <h3 className="text-lg md:text-2xl font-bold text-center">
          Serving Customers For Over A Decade
        </h3>
        <div className="flex flex-col lg:flex-row items-center lg:items-start mt-8 space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="w-full lg:w-1/3 flex justify-center">
            <img
              src={a1}
              alt="Trattoria"
              className="w-3/4 lg:w-full object-cover"
            />
          </div>
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <p className="mb-4">
              Elysian Feast was founded with a single vision in mind – to bring
              exceptional food and unparalleled dining experiences to our
              customers.
            </p>
            <p className="mb-4">
              What started as a small, family-owned eatery has now grown into a
              thriving culinary destination with multiple locations, each
              offering a unique dining atmosphere.
            </p>
            <p className="mb-4">
              Our commitment to quality has never wavered, and we continue to
              innovate our menu, blending traditional flavors with modern twists
              to satisfy every palate.
            </p>
            <p className="mb-4">
              Over the years, we’ve focused on building lasting relationships
              with our guests, ensuring that every visit is memorable.
            </p>
          </div>
          <div className="w-full lg:w-1/3 flex justify-center">
            <img
              src={a2}
              alt="Restaurant Interior"
              className="w-3/4 lg:w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-around mt-8">
          <div className="text-center mx-4">
            <h3 className="text-lg md:text-2xl font-bold">30+</h3>
            <p className="text-sm md:text-base">Breakfast Options</p>
          </div>
          <div className="text-center mx-4">
            <h3 className="text-lg md:text-2xl font-bold">50+</h3>
            <p className="text-sm md:text-base">Dinner Options</p>
          </div>
          <div className="text-center mx-4">
            <h3 className="text-lg md:text-2xl font-bold">8</h3>
            <p className="text-sm md:text-base">New Locations</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="container mx-auto px-4 py-8 md:py-16 text-black">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Happy Hours With Us
        </h2>
        <p className="text-center mt-4 text-sm md:text-base">
          Our Happy Hours are the perfect blend of delicious food, refreshing
          drinks, and unbeatable prices. Join us after work to unwind and enjoy
          the best of what we offer.
        </p>
        <p className="text-center mt-4 text-sm md:text-base">
          Take advantage of our exclusive Happy Hour menu, featuring a
          selection of mouthwatering appetizers and signature cocktails at
          incredible prices.
        </p>
        <p className="text-center mt-4 text-sm md:text-base">
          Whether you’re catching up with friends or enjoying a relaxing evening
          after a busy day, our Happy Hour is designed to make every moment
          unforgettable.
        </p>
        <p className="text-center mt-4 text-sm md:text-base">
          Come for the food, stay for the fun – our Happy Hours are waiting for
          you! Don’t miss out on the best deals in town.
        </p>

        <img
          src={a3}
          alt="Restaurant Interior"
          className="w-3/4 md:w-1/2 lg:w-1/3 mx-auto mt-8 object-cover"
        />
      </section>

      {/* Chef's Section */}
      <section className="bg-gray-100 text-gray-800 py-8 md:py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center lg:space-x-8">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <img
              src={a4}
              alt="Chef Gordon Ramsay"
              className="w-4/5 md:w-2/3 object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 text-center lg:text-left">
            <h3 className="text-sm md:text-lg uppercase font-semibold tracking-wide text-yellow-500">
              Chef's Word
            </h3>
            <h2 className="text-2xl md:text-4xl font-bold mt-2">
              What We Believe In
            </h2>
            <p className="mt-4 italic">
              "I believe great food is art; every menu is a storytelling
              reflection of culture, passion, and creativity. Food fosters human
              bonds and allows memories to be shaped through unique
              experiences."
            </p>
            <p className="mt-6 font-medium text-gray-600">
              Gordon Ramsay <br />
              Chef & Founder
            </p>
            <p className="mt-4 text-2xl md:text-3xl text-yellow-500 font-handwriting">
              Gordon Ramsay
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2023 Elysian Feast. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>

  );
};

export default About;

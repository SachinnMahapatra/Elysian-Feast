import React, { useEffect, useState } from "react";
import axios from "axios";
// import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Monsoon() {   const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("https://shine-on-back-end.onrender.com/api/products/all");
        //("API Response:", res.data); // Check the full response structure
        if (res.data && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("Unexpected API response format:", res.data);
        }
      } catch (error) {
        //(error);
      }
    };
    getProducts();
  }, []);

  const getProductsByCategory = (category) =>
    Array.isArray(products) ? products.filter((product) => product.category === category) : [];

  return (
    <>
      {/* <Navbar /> */}

      <div>
        <header className="bg-[url('/monsoon2.jpg')] bg-no-repeat bg-center bg-cover text-white text-center py-24 px-5">
          <div className="header-content">
            <h1 className="text-5xl md:text-4xl sm:text-3xl mb-5">
              the monsoon solstice.
            </h1>
            <p className="text-lg md:text-base sm:text-sm max-w-2xl mx-auto">
              The Autumn Monsoon, arriving on September 22, 2024, symbolizes
              balance and transition as day and night achieve perfect harmony.
              For jewellers, this season of change presents a unique opportunity
              to showcase collections inspired by the rich hues and textures of
              autumn.
            </p>
          </div>
        </header>
        <main>
          <section className="py-10 px-5 text-left relative">
            <div className="section-header flex flex-col sm:flex-row justify-start items-start gap-2 mb-7">
              <h2 className="text-4xl md:text-3xl sm:text-2xl">Necklaces</h2>
              <p className="text-lg md:text-base sm:text-sm">
                With new beginnings come more pendants.
              </p>

              <button className="bg-beige text-gray-700 border border-black py-2 px-5 text-base cursor-pointer mt-5 sm:mt-0 sm:ml-auto text-center rounded-xl hover:bg-gray-300">
                <Link to="/necklaces">SHOP ALL NECKLACES</Link>
              </button>
            </div>
            <div className="products flex flex-wrap md:flex-nowrap justify-around">
              {getProductsByCategory("Necklace").slice(0,3).map((product) => (
                <div key={product._id} className="product w-52 md:w-1/5 sm:w-full m-5 text-center">
                  <Link to={`/${product._id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-auto mb-2.5"
                    />
                    </Link>

                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-10 px-5 text-left relative">
            <div className="section-header flex flex-col sm:flex-row justify-start items-start gap-2 mb-7">
              <h2 className="text-4xl md:text-3xl sm:text-2xl">Bracelets</h2>
              <p className="text-lg md:text-base sm:text-sm">
                With new beginnings come more bracelets.
              </p>

              <button className="bg-beige text-gray-700 border border-black py-2 px-5 text-base cursor-pointer mt-5 sm:mt-0 sm:ml-auto text-center rounded-xl hover:bg-gray-300">
                <Link to="/bracelets">SHOP ALL BRACELETS</Link>
              </button>
            </div>
            <div className="products flex flex-wrap md:flex-nowrap justify-around">
              {getProductsByCategory("Bracelets").slice(0,3).map((product) => (
                <div key={product._id} className="product w-52 md:w-1/5 sm:w-full m-5 text-center">
                   <Link to={`/${product._id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-auto mb-2.5"
                    />
                    </Link>

                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="py-10 px-5 text-left relative">
            <div className="section-header flex flex-col sm:flex-row justify-start items-start gap-2 mb-7">
              <h2 className="text-4xl md:text-3xl sm:text-2xl">EARINGS</h2>
              <p className="text-lg md:text-base sm:text-sm">
                With new beginnings come more EARINGS.
              </p>

              <button className="bg-beige text-gray-700 border border-black py-2 px-5 text-base cursor-pointer mt-5 sm:mt-0 sm:ml-auto text-center rounded-xl hover:bg-gray-300">
                <Link to="/earings">SHOP ALL EARINGS</Link>
              </button>
            </div>
            <div className="products flex flex-wrap md:flex-nowrap justify-around">
              {getProductsByCategory("Bracelets").slice(0,3).map((product) => (
                <div key={product._id} className="product w-52 md:w-1/5 sm:w-full m-5 text-center">
                  <Link to={`/${product._id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-auto mb-2.5"
                    />
                    </Link>

                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="py-10 px-5 text-left relative">
            <div className="section-header flex flex-col sm:flex-row justify-start items-start gap-2 mb-7">
              <h2 className="text-4xl md:text-3xl sm:text-2xl">RINGS</h2>
              <p className="text-lg md:text-base sm:text-sm">
                With new beginnings come more RINGS.
              </p>

              <button className="bg-beige text-gray-700 border border-black py-2 px-5 text-base cursor-pointer mt-5 sm:mt-0 sm:ml-auto text-center rounded-xl hover:bg-gray-300">
                <Link to="/bracelets">SHOP ALL RINGS</Link>
              </button>
            </div>
            <div className="products flex flex-wrap md:flex-nowrap justify-around">
              {getProductsByCategory("Earings").slice(0,3).map((product) => (
                <div key={product._id} className="product w-52 md:w-1/5 sm:w-full m-5 text-center">
                  <Link to={`/${product._id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-auto mb-2.5"
                    />
                    </Link>

                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Repeat for other categories as needed */}
        </main>
      </div>
    </>
  );
}

export default Monsoon;

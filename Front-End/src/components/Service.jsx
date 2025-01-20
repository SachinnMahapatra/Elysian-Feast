import React from 'react'
import Header from './home/Header'
import FAQ from './FAQ'
import HappyHours from './isha/HappyHour'
import Menu from './isha/Menu'
import Product from './isha/Product'

function Service() {
  return (
    <>
    <Header/>
     <section className="text-center py-16 bg-white">
    <div className="bg-[url('/Hero.png')] h-96 justify-around p-8 md:p-28"> 
      <h2 className="text-3xl sm:text-4xl py-8 font-bold text-yellow-400 mb-4">What We Offer</h2>
    </div>

    <div className="mx-4 sm:mx-16 my-12 sm:my-24 p-6 sm:p-8 border-dotted border-black border-2">
      <h3 className="text-red-900 text-xl sm:text-2xl font-semibold mb-4">Serving Quality</h3>
      <p className="py-4 sm:py-8 px-4 sm:px-16 text-2xl sm:text-5xl text-[#100f0e] rounded-md">
        We at Elysian Feast are serving our customers for over a decade. Learn more about our high-quality services and unique dining experiences that will exceed your expectations.
      </p>
      <div className="flex justify-center mt-6 sm:mt-12">
        <a href="#" className="px-6 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500">
          Contact Us
        </a>
      </div>
    </div>
  </section>
<HappyHours/>
<Product/>
  <FAQ/>
  </>
  )
}

export default Service
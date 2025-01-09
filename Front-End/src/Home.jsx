import React from 'react';
import Header from './components/home/Header';
import HeroSection from './components/home/HeroSection';
import USPSection from './components/home/USPSection';
import BookingSection from './components/home/BookingSection';
import SpecialsSection from './components/home/SpecialsSection';
import TestimonialsSection from './components/home/TestimonialSection';
import GallerySection from './components/home/GallerySection';
import NewsletterSection from './components/home/NewsletterSection';
import Footer from './components/home/Footer';
import Contact from './components/Contact';
import Profile from './components/Profile';
import Monsoon from './components/Monsoon';
import About from './components/About';
import Productss from './components/akshita/productss';
import TableBooking from './components/TableBooking';
import FoodDetails from './components/akshita/FoodDetails';
import Category from './components/category/Category';
import OrderConfirmationPage from './components/Modal/OrderConfirmationPage';



function HomePage() {
  return (
    <div className="bg-gradient-to-l from-purple-300 via-blue-400 to-indigo-300 text-white font-poppins">
      
      <Header />
      {/* <OrderConfirmationPage/> */}
      <HeroSection />
      <USPSection />
      <BookingSection />
      <SpecialsSection />
      <TestimonialsSection />
      <GallerySection />
      {/* <Category/> */}
      <NewsletterSection />
      {/* <About/> */}
      {/* <Productss/> */}
      {/* <TableBooking/> */}
      {/* <Monsoon/> */}
      {/* <Contact/> */}
      {/* <Profile/> */}
      {/* <FoodDetails/> */}
      <Footer />
    </div>
  );
}

export default HomePage;

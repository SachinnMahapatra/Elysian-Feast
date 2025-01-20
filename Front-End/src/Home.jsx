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
import FAQ from './components/FAQ';




function HomePage() {
  return (
    <div className="bg-gradient-to-l from-purple-300 via-blue-400 to-indigo-300 text-white font-poppins">
      
      <Header />

      <HeroSection />
      <USPSection />
      <BookingSection />
      <SpecialsSection />
      <TestimonialsSection />
      <GallerySection />

      {/* <NewsletterSection /> */}
      {/* <FAQ /> */}
     
      <Footer />
    </div>
  );
}

export default HomePage;

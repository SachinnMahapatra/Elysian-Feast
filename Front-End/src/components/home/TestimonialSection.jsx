import React from 'react';

function TestimonialsSection() {
  const testimonials = [
    { name: 'Manas', feedback: 'Amazing food and great service!' },
    { name: 'Riya', feedback: 'The atmosphere was incredible.' },
    { name: 'Souvik', feedback: 'Best dining experience I have ever had!' },
    { name: 'Rajesh', feedback: 'Highly recommended for food lovers.' },
  ];

  return (
    <section className="bg-gradient-to-t from-[#F5F0E6] via-[#D6A75C] to-[#D16A48] py-16 text-center px-4 md:px-8 w-full">
      <h3 className="text-3xl md:text-4xl font-bold mb-8 text-[#7C6145]">
        Happy Customers
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-[#2F5233] p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out w-full">
            <p className="mb-2 text-[#F5F5F5] font-light">{testimonial.feedback}</p>
            <p className="font-semibold text-[#D6A75C]">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;

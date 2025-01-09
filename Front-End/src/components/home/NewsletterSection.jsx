import React from 'react';

function NewsletterSection() {
  return (
    <section className="py-16 bg-gray-900 text-center">
      <h3 className="text-4xl font-bold mb-8">Subscribe to Our Newsletter</h3>
      <form className="max-w-md mx-auto flex">
        {/* <input type="email" className="flex-grow p-2 rounded-l bg-white text-black" placeholder="Enter your email" /> */}
        <button type="submit" className="px-6 py-2 bg-gold text-black rounded-r hover:bg-yellow-400">Subscribe</button>
      </form>
    </section>
  );
}

export default NewsletterSection;

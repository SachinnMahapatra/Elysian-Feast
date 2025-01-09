// src/components/ItemSection.jsx
import React from 'react';
import Product from './Product';
import Header from '../home/Header';
// import Product from './Product';

const ItemSection = ({ title, description, products }) => {
  return (
    <>
    <Header/>
    <div className="mt-6 px-4 pr-4 pl-6 bg-white">
      <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
      <p className="mt-1 mb-4 text-black text-sm sm:text-base">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
    </div>
    </>

  );
};

export default ItemSection;

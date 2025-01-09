// src/components/Product.jsx
import React from 'react';

const Product = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg text-center shadow-md pr-4">
      <img src={product.image} alt={product.name} className="mx-auto mb-4 max-w-full h-auto pr-4" />
      <h3 className="font-medium text-base pr-4">{product.name}</h3>
      <p className="text-sm text-black mt-2 pr-4">{product.description}</p>
      <p className="text-yellow-400 font-bold pr-4">{product.price}</p>
    </div>
  );
};

export default Product;

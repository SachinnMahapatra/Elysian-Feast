
// src/components/Product.jsx
import React from 'react';

const Product = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg text-center shadow-md">
    <img
      src={product.imageUrl}
      alt={product.name}
      className="mx-auto mb-4 max-w-full h-auto"
    />
    <h3 className="font-medium text-base">{product.name}</h3>
    <p className="text-sm text-black mt-2">{product.description}</p>
    <p className="text-yellow-400 font-bold">{product.price}</p>
    <p className="text-xs text-gray-500 mt-2">Category: {product.category}</p>
  </div>
  );
};

export default Product;

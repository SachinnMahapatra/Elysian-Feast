
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState('all'); // Default to 'all' category
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter products based on the selected category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim() // Normalize and trim
      );
      console.log('Filtered Products:', filtered); // Log filtered products for debugging
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  return (
    <div>
      {/* Category filter buttons */}
      <div className="mb-4 text-center flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className="px-3 py-2 bg-gray-50 rounded hover:bg-gray-300 text-green-700"
        >
          All
        </button>
        <button
          onClick={() => setSelectedCategory('necklace')}
          className="px-3 py-2 bg-gray-50 rounded hover:bg-gray-300 text-green-700"
        >
          Necklace
        </button>
        <button
          onClick={() => setSelectedCategory('earings')}
          className="px-3 py-2 bg-gray-50 rounded hover:bg-gray-300 text-green-700"
        >
          Earrings
        </button>
        <button
          onClick={() => setSelectedCategory('bracelets')}
          className="px-3 py-2 bg-gray-50 rounded hover:bg-gray-300 text-green-700"
        >
          Bracelets
        </button>
      </div>

      {/* Display filtered products */}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product.id} className="border p-4 rounded shadow-lg bg-white">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="mt-2 text-lg font-semibold text-gray-800">{product.price}</p>
              <img 
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover mt-4 rounded"
              />
            </Link>
          ))
        ) : (
          <p className="col-span-3 text-center text-lg text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
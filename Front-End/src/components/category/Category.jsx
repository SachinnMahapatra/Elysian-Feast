import React, { useEffect, useState } from 'react';
// import Header from './components/category/Header';
// import ProductList from './ProductList';
import Head from './Head';
import ProductList from './ProductList';
import Header from '../home/Header';
// Import ProductList component

const Category = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_LINK = 'https://elysian-feast.onrender.com/product/all';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_LINK);
        const data = await response.json();
        //('API Response:', data); // Debug log
        setProducts(data.products || []); // Adjust based on response structure
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_LINK]);

  if (loading) return <div className="text-center text-lg">Loading products...</div>;
  if (error) return <div className="text-center text-lg text-red-500">Error: {error}</div>;

  if (!Array.isArray(products)) {
    return <div className="text-center text-lg text-red-500">Invalid products data</div>;
  }

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-yellow-50">
      <Head />
      <main className="container mx-auto px-4 py-8">
        <ProductList products={products} />
      </main>
    </div>
    </>
  );
};

export default Category;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import Header from './home/Header';
import toast from 'react-hot-toast';

const ProudctDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/product/${productId}`);
        setProduct(response.data.product);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token'); // Replace with your token retrieval logic
      if (!token) {
        console.error('No token found. User may not be logged in.');
        return;
      }
  
      const response = await axios.post(
        'http://localhost:4001/cart',
        { productId: product._id, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      toast.success('Product added to cart successfully!');
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error || 'Product not found'}</div>
      </div>
    );
  }

  const nextImage = () => {
    const totalImages = [product.imageUrl, ...(product.images || [])];
    setSelectedImage((prev) => (prev + 1) % totalImages.length);
  };

  const previousImage = () => {
    const totalImages = [product.imageUrl, ...(product.images || [])];
    setSelectedImage((prev) => (prev - 1 + totalImages.length) % totalImages.length);
  };

  const allImages = [product.imageUrl, ...(product.images || [])];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white mt-10">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="relative aspect-square">
                <img
                  src={allImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={previousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                  </>
                )}
              </div>
              {allImages.length > 1 && (
                <div className="flex space-x-4 overflow-x-auto py-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-none w-20 h-20 rounded-md overflow-hidden ${
                        selectedImage === idx ? 'ring-2 ring-black' : ''
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-medium text-gray-500">{product.category}</h2>
                <h1 className="mt-2 text-3xl font-light tracking-tight text-gray-900">{product.name}</h1>
                <div className="mt-4 flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{product.rating} rating</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <p className="text-2xl font-light text-gray-900">₹{product.price.toLocaleString()}</p>
                {product.discount > 0 && (
                  <>
                    <p className="text-lg text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </p>
                    <span className="text-green-600 font-medium">{product.discount}% OFF</span>
                  </>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">{product.quantity} units available</div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={addToCartLoading}
                  className={`w-full flex items-center justify-center space-x-2 px-8 py-4 rounded-lg transition-colors ${
                    addToCartLoading ? 'bg-gray-400' : 'bg-black text-white hover:bg-gray-900'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>{addToCartLoading ? 'Adding...' : 'Add to Cart'}</span>
                </button>

                {cartSuccess && (
                  <div className="text-green-600 text-sm mt-2">Item added to cart successfully!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProudctDetails;

import React, { useState, useEffect } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartModal = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Get user token from localStorage

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user)._id : null; // Axios configuration
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      if (!isOpen) return;

      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4001/cart/${userId}`,
          axiosConfig
        );

        if (!response.data.cart) {
          setError("Cart not found");
        } else {
          setCartItems(response.data.cart.items || []);
          setError(null);
        }
      } catch (err) {
        setError("Failed to fetch cart items");
        console.error(
          "Error fetching cart:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isOpen]);

  // Update quantity
  const updateQuantity = async (productId, newQuantity) => {
    if (actionLoading) return;

    setActionLoading(true);

    // Save the current quantity for rollback if necessary
    const previousQuantity = cartItems.find(
      (item) => item.product._id === productId
    )?.quantity;

    try {
      // Optimistic Update
      const updatedItems = cartItems.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      setCartItems(updatedItems);

      await axios.put(
        `http://localhost:4001/cart/${productId}`,
        { quantity: newQuantity },
        axiosConfig
      );
    } catch (err) {
      // Revert the optimistic update in case of error
      setCartItems((previousState) => {
        return previousState.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: previousQuantity }
            : item
        );
      });
      setError("Failed to update quantity");
      console.error("Error updating cart:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // Remove item from cart

  const removeItem = async (productId) => {
    if (!userId || !productId || actionLoading) {
      console.error(
        "Missing userId or productId or action already in progress"
      );
      return;
    }

    setActionLoading(true); // Set loading state to true

    try {
      console.log("Removing item:", { userId, productId });

      const response = await axios.post(
        "http://localhost:4001/cart/remove",
        { userId, productId },
        axiosConfig
      );

      if (response.data.success) {
        const updatedCartResponse = await axios.get(
          `http://localhost:4001/cart/${userId}`,
          axiosConfig
        );
        setCartItems(updatedCartResponse.data.cart.items); // Update the cart items
      } else {
        console.error("Failed to remove product:", response.data.message);
      }
    } catch (err) {
      console.error(
        "Error removing product:",
        err.response?.data || err.message
      );
    } finally {
      setActionLoading(false); // Reset loading state
    }
  };

  if (!isOpen) return null;

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Handle Checkout
  const handleCheckout = () => {
    if (!token) {
      alert("Please log in first.");
      navigate("/login"); // redirect to login page if not logged in
    } else {
      navigate(`/checkout/${userId}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md">
        <div className="h-full bg-white shadow-xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">
              Shopping Cart
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              tabIndex={0}
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="text-center py-8">
                <p>Loading cart...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>{error}</p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-16 h-16 mx-auto text-gray-400" />
                <p className="mt-4 text-gray-500">Your cart is empty</p>
                <button
                  className="mt-4 text-indigo-600 underline"
                  onClick={() => {
                    onClose();
                    navigate("/category");
                  }}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-medium">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-600">₹{item.product.price}</p>
                      <div className="flex items-center space-x-2 mt-2 text-black">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product._id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="p-1 rounded-full hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity + 1)
                          }
                          className="p-1 rounded-full hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.product._id)}
                          className={`ml-4 text-red-500 hover:text-red-600 text-sm ${
                            actionLoading ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          disabled={actionLoading}
                        >
                          {actionLoading ? "Removing..." : "Remove"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p>₹{total.toLocaleString()}</p>
              </div>
              <button
                className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;

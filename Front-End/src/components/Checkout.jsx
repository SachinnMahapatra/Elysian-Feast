import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingBag, MapPin, CreditCard, Truck } from "lucide-react";
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    alternativeNumbers: [],
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productError, setProductError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData({
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phoneNumber: user.phoneNumber,
        alternativeNumbers: [],
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        },
      });
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user._id : null;
    const token = localStorage.getItem("token");

    if (userId) {
      const fetchCartItems = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4001/cart/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCartItems(response.data.cart.items || []);
        } catch (error) {
          console.error("Error fetching cart items:", error);
          setProductError("Failed to load cart items.");
        }
      };
      fetchCartItems();
    }
  }, []);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const totalAmount =
      cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ) + 15;

    const orderData = {
      user: JSON.parse(localStorage.getItem("user")),
      products: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount: totalAmount.toFixed(2),
      address: {
        street: userData.address.street.trim(),
        city: userData.address.city.trim(),
        state: userData.address.state.trim(),
        zipCode: userData.address.zipCode.trim(),
        country: userData.address.country.trim(),
      },
      phoneNumbers: [
        userData.phoneNumber.trim(),
        ...userData.alternativeNumbers.map((num) => num.trim()),
      ],
      paymentMethod: paymentMethod,
    };
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:4001/order/create",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // toast.success("Order placed successfully! Check your email for details.");
      console.log("Order Response:", response.data);
      navigate("/Order-Confirmation");
      // iff checkout is successfull
   
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  
  };

  if (productError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-4 rounded-lg bg-red-50 text-red-700">
          Error: {productError}
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex space-x-2">
          <div className="text-lg">Loading cart items</div>
          <div className="text-lg">...</div>
        </div>
      </div>
    );
  }

  const totalAmount =
    cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    ) + 15;

  return (
    <div className="min-h-screen bg-[#f5f0e6] text-[#8B7355]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-12">
          <ShoppingBag className="w-10 h-10 text-[#8B7355] mr-3" />
          <h1 className="text-4xl font-light tracking-wide">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Details Section */}
          <div className="backdrop-blur-md bg-white/30 rounded-2xl shadow-[8px_8px_16px_#d0ccbf,-8px_-8px_16px_#ffffff] p-8">
            <div className="flex items-center mb-8">
              <MapPin className="w-6 h-6 text-[#8B7355] mr-3" />
              <h2 className="text-2xl font-light tracking-wide">
                Shipping Details
              </h2>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <input
                    type="text"
                    value={userData.fullName}
                    readOnly
                    className="w-full px-4 py-3 bg-white/50 rounded-lg text-[#8B7355] placeholder-[#8B7355]/60 focus:outline-none shadow-[inset_4px_4px_8px_#d0ccbf,inset_-4px_-4px_8px_#ffffff]"
                    placeholder="Full Name"
                  />
                </div>

                <div className="col-span-2">
                  <input
                    type="email"
                    value={userData.email}
                    readOnly
                    className="w-full px-4 py-3 bg-white/50 rounded-lg text-[#8B7355] placeholder-[#8B7355]/60 focus:outline-none shadow-[inset_4px_4px_8px_#d0ccbf,inset_-4px_-4px_8px_#ffffff]"
                    placeholder="Email"
                  />
                </div>

                {/* Form Inputs with Neumorphic Style */}
                {Object.entries(userData.address).map(([key, value]) => (
                  <input
                    key={key}
                    type="text"
                    value={value}
                    required
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        address: { ...userData.address, [key]: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-white/50 rounded-lg text-[#8B7355] placeholder-[#8B7355]/60 focus:outline-none shadow-[inset_4px_4px_8px_#d0ccbf,inset_-4px_-4px_8px_#ffffff]"
                    placeholder={
                      key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, " $1")
                    }
                  />
                ))}

                {/* Alternative Numbers */}
                {userData.alternativeNumbers.map((num, index) => (
                  <input
                    key={index}
                    type="text"
                    value={num}
                    onChange={(e) => {
                      const updatedNumbers = [...userData.alternativeNumbers];
                      updatedNumbers[index] = e.target.value;
                      setUserData({
                        ...userData,
                        alternativeNumbers: updatedNumbers,
                      });
                    }}
                    className="w-full px-4 py-3 bg-white/50 rounded-lg text-[#8B7355] placeholder-[#8B7355]/60 focus:outline-none shadow-[inset_4px_4px_8px_#d0ccbf,inset_-4px_-4px_8px_#ffffff]"
                    placeholder="Alternative Number"
                  />
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setUserData({
                      ...userData,
                      alternativeNumbers: [...userData.alternativeNumbers, ""],
                    })
                  }
                  className="text-[#8B7355] hover:text-[#6B5335] font-medium text-sm flex items-center"
                >
                  + Add Alternative Number
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            {/* Order Summary Section */}
            <div className="backdrop-blur-md bg-white/30 rounded-2xl shadow-[8px_8px_16px_#d0ccbf,-8px_-8px_16px_#ffffff] p-8">
              <div className="flex items-center mb-8">
                <ShoppingBag className="w-6 h-6 text-[#8B7355] mr-3" />
                <h2 className="text-2xl font-light tracking-wide">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-white/50 rounded-lg shadow-[inset_4px_4px_8px_#d0ccbf,inset_-4px_-4px_8px_#ffffff]"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-[4px_4px_8px_#d0ccbf,-4px_-4px_8px_#ffffff]"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">
                        {item.product.name}
                      </h3>
                      <p className="text-[#8B7355]/70">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-lg font-medium">
                        ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="space-y-4 pt-6">
                  <div className="flex justify-between text-[#8B7355]/80">
                    <span>Subtotal</span>
                    <span>₹{(totalAmount - 15).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#8B7355]/80">
                    <span>Shipping</span>
                    <span>₹15.00</span>
                  </div>
                  <div className="h-px bg-[#8B7355]/20"></div>
                  <div className="flex justify-between text-xl font-medium">
                    <span>Total</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="backdrop-blur-md bg-white/30 rounded-2xl shadow-[8px_8px_16px_#d0ccbf,-8px_-8px_16px_#ffffff] p-8">
              <div className="flex items-center mb-6">
                <CreditCard className="w-6 h-6 text-[#8B7355] mr-3" />
                <h2 className="text-2xl font-light tracking-wide">
                  Payment Method
                </h2>
              </div>

              <label className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg cursor-pointer shadow-[inset_4px_4px_8px_#d0ccbf,inset_-4px_-4px_8px_#ffffff] hover:bg-white/60 transition-colors">
                <input
                  type="radio"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="w-4 h-4 text-[#8B7355] border-[#8B7355]/30 focus:ring-[#8B7355]"
                />
                <span>Cash on Delivery</span>
              </label>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={
                isSubmitting ||
                !userData.address.street ||
                !userData.address.city ||
                !userData.address.state ||
                !userData.address.zipCode ||
                !userData.address.country
              }
              className="w-full bg-[#8B7355] text-white py-4 rounded-lg font-medium hover:bg-[#6B5335] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[8px_8px_16px_#d0ccbf,-8px_-8px_16px_#ffffff]"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

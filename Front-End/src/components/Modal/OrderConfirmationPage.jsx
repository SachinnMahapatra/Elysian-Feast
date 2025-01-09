import { useState, useEffect } from "react";

const OrderConfirmationPage = () => {
  const [loading, setLoading] = useState(true);
  const [truckPosition, setTruckPosition] = useState(-100);
  const [isDelivered, setIsDelivered] = useState(false);

  // Truck Animation using setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      setTruckPosition((prevPosition) => (prevPosition >= 1100 ? -100 : prevPosition + 5));
    }, 50);

    // Simulate loading for 3 seconds before showing the confirmation
    setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#F5F0E6] to-[#E4D5B7] flex items-center justify-center py-20 px-6">
      {loading ? (
        // Loading Screen
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-2xl font-bold text-[#2F5233] mb-6">Please wait...</div>
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        </div>
      ) : (
        // Order Confirmation Screen
        <div className="relative max-w-4xl w-full bg-white p-12 rounded-2xl shadow-2xl border border-[#D6A75C]">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-[#2F5233] mb-4">Order Confirmed!</h1>
            <p className="text-lg font-medium text-[#5A6E48]">Your order is being processed and will be delivered shortly.</p>
          </div>

          {/* Truck Animation Section */}
          <div className="relative flex justify-center items-center">
            

            {/* Road Design */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#7C6145] rounded-t-lg shadow-md"></div>
          </div>

          {/* Order Details */}
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex justify-between text-[#5A6E48] text-lg">
                <span>Order Number</span>
                <span className="font-semibold">#123456789</span>
              </div>

              <div className="flex justify-between text-[#5A6E48] text-lg">
                <span>Shipping Address</span>
                <span className="font-semibold">1234 Elm Street, Springfield, IL</span>
              </div>

              <div className="flex justify-between text-[#5A6E48] text-lg">
                <span>Estimated Delivery</span>
                <span className="font-semibold">3-5 Business Days</span>
              </div>
            </div>
          </div>

          {/* Delivery Status */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-[#2F5233]">Delivery Status:</h3>
            <div className="flex items-center mt-2">
              {isDelivered ? (
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <p className="text-lg text-[#5A6E48]">Delivered</p>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <p className="text-lg text-[#5A6E48]">In Transit</p>
                </div>
              )}
            </div>
          </div>

          {/* Thank You Message */}
          <div className="mt-10 text-center">
            <p className="text-lg font-medium text-[#5A6E48]">
              Thank you for choosing us. We hope you enjoy your order! You’ll receive an email once it’s on its way.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;

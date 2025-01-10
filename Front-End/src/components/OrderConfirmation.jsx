import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = ({ orderNumber = "ORD" + Math.random().toString(36).substr(2, 9) }) => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  const checkmarkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.6
      }
    }
  };

  const progressVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: { duration: 1.5, delay: 1 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.8 }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0e6] flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl backdrop-blur-md bg-white/30 rounded-2xl shadow-[8px_8px_16px_#d0ccbf,-8px_-8px_16px_#ffffff] p-8 space-y-8"
      >
        {/* Success Icon */}
        <motion.div
          variants={checkmarkVariants}
          className="flex justify-center"
        >
          <div className="relative">
            <CheckCircle className="w-24 h-24 text-green-600" />
            <motion.div
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute inset-0 bg-green-200 rounded-full"
            />
          </div>
        </motion.div>

        {/* Order Success Message */}
        <motion.div
          variants={fadeInUp}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-light text-[#8B7355]">Order Placed Successfully!</h1>
          <p className="text-[#8B7355]/70">
            Thank you for your purchase. Your order number is:
          </p>
          <p className="text-xl font-medium text-[#8B7355]">{orderNumber}</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-[#8B7355]/20 rounded-full overflow-hidden">
          <motion.div
            variants={progressVariants}
            className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
          />
        </div>

        {/* Order Status */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center space-x-8 text-[#8B7355]/70"
        >
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Processing</span>
          </div>
          <div className="h-4 w-px bg-[#8B7355]/20" />
          <div>Estimated Delivery: 30-40 minutues</div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center space-x-2 px-8 py-3 bg-[#8B7355] text-white rounded-lg hover:bg-[#6B5335] transition-colors duration-200 shadow-[4px_4px_8px_#d0ccbf,-4px_-4px_8px_#ffffff]"
          >
            <Home className="w-5 h-5" />
            <span>Return Home</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
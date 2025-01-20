import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ShieldCheck, Mail, Phone, MapPin, ShoppingCart, Box, Package, ClipboardList } from "lucide-react";

const UserDetailPage = () => {
  const { userId } = useParams(); // Get the user ID from the route
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const userResponse = await axios.get(`https://elysian-feast.onrender.com/user/${userId}`);
        setUser(userResponse.data.user);

        // Fetch user orders
        const ordersResponse = await axios.get(`https://elysian-feast.onrender.com/order/all?userId=${userId}`);
        setOrders(ordersResponse.data.orders);

        // Fetch user cart (if cart feature exists)
        const cartResponse = await axios.get(`https://elysian-feast.onrender.com/cart/${userId}`);
        setCart(cartResponse.data.cart);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Details</h1>

        {/* User Profile */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <div className="flex items-center gap-6">
            <img
              src={user.profilePicture || "/api/placeholder/64/64"}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phoneNumber}</p>
              <div className="mt-2">
                {user.isVerified ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Verified
                  </span>
                ) : (
                  <span className="text-gray-400 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Not Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Address</h3>
          {user.address ? (
            <div className="text-gray-600">
              <p>
                <MapPin className="w-4 h-4 inline-block mr-2" />
                {user.address.street}, {user.address.city}, {user.address.state},{" "}
                {user.address.zipCode}, {user.address.country}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No address available</p>
          )}
        </div>

        {/* Orders */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Orders</h3>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Order #{order._id}
                  </h4>
                  <p className="text-gray-600">
                    <ClipboardList className="w-4 h-4 inline-block mr-2" />
                    <strong>Status:</strong> {order.status}
                  </p>
                  <p className="text-gray-600">
                    <Package className="w-4 h-4 inline-block mr-2" />
                    <strong>Total Amount:</strong> ${order.totalAmount}
                  </p>
                  <p className="text-gray-600">
                    <Box className="w-4 h-4 inline-block mr-2" />
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <ul className="mt-2 text-gray-600">
                    <strong>Products:</strong>
                    {order.products.map((product) => (
                      <li key={product.product._id}>
                        - {product.product.name} x {product.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No orders found</p>
          )}
        </div>

        {/* Cart */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Cart</h3>
          {cart.items && cart.items.length > 0 ? (
            <ul className="space-y-2">
              {cart.items.map((item) => (
                <li key={item.product._id} className="flex items-center gap-4">
                  <img
                    src={item.product.image || "/api/placeholder/32/32"}
                    alt={item.product.name}
                    className="w-8 h-8 rounded object-cover"
                  />
                  <span className="text-gray-800">{item.product.name}</span>
                  <span className="text-gray-600">x {item.quantity}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No items in cart</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Bell,
  Menu,
  Settings,
  User,
  LogOut,
  Package,
  Users,
  ShoppingCart,
  BarChart2,
  LogIn,
} from "lucide-react";

const AdminNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin/login"); // Redirect to login if not logged in
      return;
    }
  }, [isLoggedIn, navigate]);

  const navItems = [
    { title: "Products", icon: Package, path: "/dashboard/products" },
    { title: "Users", icon: Users, path: "/dashboard/users" },
    { title: "Orders", icon: ShoppingCart, path: "/dashboard/orders" },
    { title: "Analytics", icon: BarChart2, path: "/analytics" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left section - Logo and Menu Toggle */}
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/admin-dashboard" className="ml-4 text-xl font-semibold text-gray-800">
              
              Admin Dashboard
            </Link>
          </div>

          {/* Center section - Navigation Items */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  onClick={() => navigate(item.path)} // Navigate to the route
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Right section - Notifications, Settings, and Profile */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <Settings className="h-6 w-6" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
              >
                <User className="h-5 w-5 text-gray-600" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 text-sm text-gray-700 font-semibold border-b border-gray-200">
                    My Account
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </button>
                  <div className="border-t border-gray-200">
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                      {isLoggedIn ? (
                        <button onClick={handleLogout}>
                          <LogOut className="h-4 w-4 mr-2" />
                          Log out
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate("/admin/login")}
                          className="px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700"
                        >
                          <LogIn className="h-4 w-4 mr-2" />
                          Login
                        </button>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.title}
                    onClick={() => navigate(item.path)} // Navigate to the route
                    className="flex items-center space-x-2 w-full px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;

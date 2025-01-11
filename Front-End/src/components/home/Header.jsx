import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import CartModal from "../Modal/CartModal";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAuthenticated(true);
      setUserName(user.firstName || "User");
      fetchCartCount(user._id); // Fetch cart count when user is authenticated
    } else {
      setIsAuthenticated(false);
      setCartCount(0);
    }
  }, []);

  const fetchCartCount = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch(`https://elysian-feast.onrender.com/cart/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          window.location.href = '/login';
          return;
        }
        throw new Error('Failed to fetch cart');
      }
  
      const cartData = await response.json();
      //('Cart Data:', cartData); // Add this log to see the response structure
      
      // Let's try different possible structures
      const count = cartData.items?.length || 
                   cartData.cart?.items?.length || 
                   cartData.length ||
                   0;
      
      //('Cart Count:', count); // Add this log to see the calculated count
      setCartCount(count);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Also remove the token
    setIsAuthenticated(false);
    setCartCount(0);
    window.location.href = "/";
  };

  // Cart icon component to avoid repetition
  const CartIcon = () => (
    <button
      onClick={() => setIsCartOpen(true)}
      className="relative hover:text-[#D16A48] transition-all"
    >
      <FaShoppingCart className="text-2xl" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#D16A48] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </button>
  );

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#f5f0e663] text-[#7C6145] backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-[#7C6145]">
            <Link to="/">Elysian Feast</Link>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-lg">
            <Link to="/" className="hover:text-[#D16A48] transition-all">
              Home
            </Link>
            <Link to="/about" className="hover:text-[#D16A48] transition-all">
              About
            </Link>
            <Link to="/services" className="hover:text-[#D16A48] transition-all">
              Services
            </Link>
            <Link to="/contact" className="hover:text-[#D16A48] transition-all">
              Contact
            </Link>
          </nav>

          {/* Auth Section for Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart Icon */}
            <CartIcon />

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-[#2F5233] font-medium">Hi, {userName}</span>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="focus:outline-none"
                  >
                    <FaUserCircle className="text-3xl text-[#2F5233] hover:text-[#D6A75C]" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 flex flex-col space-y-2">
                      <Link
                        to="/profile"
                        className="px-4 py-2 text-[#5A6E48] hover:bg-[#D6A75C] rounded-lg transition-all"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-[#5A6E48] hover:bg-[#D6A75C] rounded-lg transition-all"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-[#2F5233] text-white px-6 py-2 rounded-full font-medium hover:bg-[#D6A75C] transition-all"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="border border-[#2F5233] px-6 py-2 rounded-full font-medium hover:bg-[#2F5233] hover:text-white transition-all"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden flex items-center space-x-4">
            <CartIcon />
            <button
              className="text-[#7C6145] text-2xl focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <span>&times;</span> : <span>&#9776;</span>}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {menuOpen && (
          <nav
            className="bg-[#2F5233] text-white text-center p-4 space-y-4 md:hidden"
            ref={menuRef}
          >
            <Link to="/" className="block hover:text-[#D6A75C] transition-all">
              Home
            </Link>
            <Link to="/about" className="block hover:text-[#D6A75C] transition-all">
              About
            </Link>
            <Link to="/services" className="block hover:text-[#D6A75C] transition-all">
              Services
            </Link>
            <Link to="/contact" className="block hover:text-[#D6A75C] transition-all">
              Contact
            </Link>

            <div className="mt-4">
              {isAuthenticated ? (
                <>
                  <p className="text-[#D6A75C] font-medium">Hi, {userName}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-2 bg-[#2F5233] text-white px-6 py-2 rounded-full font-medium hover:bg-[#D6A75C] transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block bg-[#2F5233] text-white px-6 py-2 rounded-full font-medium hover:bg-[#D6A75C] transition-all"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="block mt-4 border border-white px-6 py-2 rounded-full font-medium hover:bg-[#D6A75C] transition-all"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </header>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Header;
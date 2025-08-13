import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">E-Shop</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 transition-colors">
                Products
              </a>
              <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 transition-colors">
                Categories
              </a>
              <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 transition-colors">
                About
              </a>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <User size={24} />
              </button>
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <a href="#" className="block px-3 py-2 text-gray-900 hover:text-blue-600">Home</a>
                <a href="#" className="block px-3 py-2 text-gray-900 hover:text-blue-600">Products</a>
                <a href="#" className="block px-3 py-2 text-gray-900 hover:text-blue-600">Categories</a>
                <a href="#" className="block px-3 py-2 text-gray-900 hover:text-blue-600">About</a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to E-Shop
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover amazing products with real-time tracking and secure checkout
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="text-blue-600" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-2">Easy Shopping</h4>
              <p className="text-gray-600">Intuitive interface for seamless shopping experience</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-green-600" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-2">Real-time Tracking</h4>
              <p className="text-gray-600">Track your orders in real-time with live updates</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-purple-600" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-2">Social Login</h4>
              <p className="text-gray-600">Quick login with Google, Facebook, or GitHub</p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-8">Getting Started</h3>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-4">Backend Setup Required</h4>
            <p className="text-gray-600 mb-6">
              To fully experience this e-commerce platform, please start the backend server first.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg text-left">
              <code className="text-sm">
                cd backend<br/>
                npm install<br/>
                npm run dev
              </code>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Backend should be running on http://localhost:5000
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 E-Shop. Built with React, Node.js, and MongoDB.</p>
          <p className="text-gray-400 mt-2">Complete e-commerce solution with real-time features</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
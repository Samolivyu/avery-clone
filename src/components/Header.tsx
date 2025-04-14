
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, Clock } from 'lucide-react';
import TimeLogger from './TimeLogger';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTimeLoggerOpen, setIsTimeLoggerOpen] = useState(false);

  return (
    <header className="bg-weightech-black text-white">
      {/* Top bar */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div>
          <span className="text-sm">Call us: 0800 123 4567</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/contact" className="text-sm header-nav-link">Contact</Link>
          <Link to="/about" className="text-sm header-nav-link">About Us</Link>
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-weightech-red">
          WEIGHTECH
        </Link>
        
        {/* Search bar - visible only on desktop */}
        <div className="hidden md:flex relative w-1/3">
          <input 
            type="text" 
            placeholder="Search for products" 
            className="w-full px-4 py-2 rounded-md text-black" 
          />
          <button className="absolute right-2 top-2 text-gray-500">
            <Search size={20} />
          </button>
        </div>
        
        {/* Navigation for desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/products" className="header-nav-link">Products</Link>
          <Link to="/sectors" className="header-nav-link">Sectors</Link>
          <Link to="/services" className="header-nav-link">Services</Link>
          <Link to="/news" className="header-nav-link">News</Link>
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsTimeLoggerOpen(!isTimeLoggerOpen)} className="flex items-center text-white hover:text-weightech-red transition-colors">
              <Clock size={20} className="mr-1" />
              <span>Staff</span>
            </button>
            <Link to="/cart" className="flex items-center text-white hover:text-weightech-red transition-colors">
              <ShoppingCart size={20} className="mr-1" />
              <span>Cart (0)</span>
            </Link>
          </div>
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={() => setIsTimeLoggerOpen(!isTimeLoggerOpen)} className="text-white p-2">
            <Clock size={20} />
          </button>
          <Link to="/cart" className="text-white p-2">
            <ShoppingCart size={20} />
          </Link>
          <button 
            className="text-white p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden w-full mt-4">
            <div className="flex mb-4 relative">
              <input 
                type="text" 
                placeholder="Search for products" 
                className="w-full px-4 py-2 rounded-md text-black" 
              />
              <button className="absolute right-2 top-2 text-gray-500">
                <Search size={20} />
              </button>
            </div>
            <nav className="flex flex-col space-y-3 pb-4">
              <Link to="/products" className="header-nav-link py-1">Products</Link>
              <Link to="/sectors" className="header-nav-link py-1">Sectors</Link>
              <Link to="/services" className="header-nav-link py-1">Services</Link>
              <Link to="/news" className="header-nav-link py-1">News</Link>
            </nav>
          </div>
        )}
      </div>

      {/* Time Logger Popover */}
      {isTimeLoggerOpen && (
        <div className="absolute top-20 right-4 z-50">
          <TimeLogger onClose={() => setIsTimeLoggerOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;

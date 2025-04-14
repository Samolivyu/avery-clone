
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Clock } from 'lucide-react';
import TimeLogger from './TimeLogger';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTimeLoggerOpen, setIsTimeLoggerOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-weightech-black text-white">
      {/* Top bar */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div>
          <span className="text-sm">Call us: 0800 123 4567</span>
        </div>
        <div className="flex items-center">
          <button onClick={() => setIsTimeLoggerOpen(!isTimeLoggerOpen)} className="flex items-center text-white hover:text-weightech-red transition-colors ml-4">
            <Clock size={16} className="mr-1" />
            <span className="text-sm">Staff Login</span>
          </button>
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
          <Link 
            to="/" 
            className={`header-nav-link ${location.pathname === '/' ? 'text-weightech-red' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`header-nav-link ${location.pathname === '/products' ? 'text-weightech-red' : ''}`}
          >
            Products
          </Link>
          <Link 
            to="/services" 
            className={`header-nav-link ${location.pathname === '/services' ? 'text-weightech-red' : ''}`}
          >
            Services
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={() => setIsTimeLoggerOpen(!isTimeLoggerOpen)} className="text-white p-2">
            <Clock size={20} />
          </button>
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
              <Link 
                to="/" 
                className={`header-nav-link py-1 ${location.pathname === '/' ? 'text-weightech-red' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`header-nav-link py-1 ${location.pathname === '/products' ? 'text-weightech-red' : ''}`}
              >
                Products
              </Link>
              <Link 
                to="/services" 
                className={`header-nav-link py-1 ${location.pathname === '/services' ? 'text-weightech-red' : ''}`}
              >
                Services
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Time Logger Popover */}
      {isTimeLoggerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full">
            <TimeLogger onClose={() => setIsTimeLoggerOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

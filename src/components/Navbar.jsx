import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../store/slices/authSlice';
import { mockAuth } from '../utils/auth';


const handleLogout = () => {
  mockAuth.logout(); 
  dispatch(logoutSuccess());
  navigate('/login');
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed w-full z-50 top-0 start-0 bg-white">
      {/* Top Nav */}
      <nav className="bg-gray-50 border-b border-gray-200" aria-label="Top Navigation">
        <div className="max-w-screen-xl flex flex-wrap justify-between items-center mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/images/aea-logo.webp" className="h-7" alt="AEA Logo" />
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="tel:5541251234" className="text-sm text-gray-500 hover:underline hidden sm:block">+254 558 506</a>
            <Link to="/login" className="text-sm font-medium text-avery-red hover:underline">Staff Login</Link>
          </div>
        </div>
      </nav>

      {/* Bottom Nav */}
      <nav className="bg-white border-b border-gray-200" aria-label="Main Navigation">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-between">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm list-none m-0 p-0">
              <li><Link to="/" className="text-gray-700 hover:text-avery-red transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-700 hover:text-avery-red transition-colors">Services</Link></li>
              <li><Link to="/products" className="text-gray-700 hover:text-avery-red transition-colors">Products</Link></li>
            </ul>
            <button 
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 pb-4 px-4 shadow-lg animate-fadeIn">
           <Link to="/" onClick={closeMobileMenu} className="block py-2 text-gray-700 hover:text-avery-red">Home</Link>
           <Link to="/services" onClick={closeMobileMenu} className="block py-2 text-gray-700 hover:text-avery-red">Services</Link>
           <Link to="/products" onClick={closeMobileMenu} className="block py-2 text-gray-700 hover:text-avery-red">Products</Link>
           <div className="flex items-center space-x-6 pt-4 border-t border-gray-100 mt-4">
             <button type="button" className="text-gray-700 hover:text-avery-red p-2" aria-label="Search"><Search size={20} /></button>
             <Link to="/cart" className="text-gray-700 hover:text-avery-red p-2" aria-label="Shopping Cart"><ShoppingCart size={20} /></Link>
           </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

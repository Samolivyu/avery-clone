
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-weightech-black text-white">
      <div className="container mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">WEIGHTECH</h3>
            <p className="text-gray-300 mb-4">
              Providing precision weighing solutions for over 50 years, with expertise across industrial, 
              laboratory, vehicle and inspection sectors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-weightech-red transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-weightech-red transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-weightech-red transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-weightech-red transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-weightech-red transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/sectors" className="text-gray-300 hover:text-weightech-red transition-colors">
                  Sectors
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-weightech-red transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-weightech-red transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-weightech-red transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-weightech-red" />
                <span className="text-gray-300">
                  123 Weighbridge Road, Scaleford, SF1 2WE, United Kingdom
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0 text-weightech-red" />
                <a href="tel:08001234567" className="text-gray-300 hover:text-weightech-red transition-colors">
                  0800 123 4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-weightech-red" />
                <a href="mailto:info@weightech.com" className="text-gray-300 hover:text-weightech-red transition-colors">
                  info@weightech.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest news and product updates.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 rounded-l-md w-full focus:outline-none text-black"
              />
              <button 
                type="submit" 
                className="bg-weightech-red px-4 py-2 rounded-r-md hover:bg-red-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Weightech. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 text-sm hover:text-weightech-red transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 text-sm hover:text-weightech-red transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 text-sm hover:text-weightech-red transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

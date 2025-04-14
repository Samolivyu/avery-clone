
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative bg-weightech-darkblue text-white">
      <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Weighing Equipment Specialists for Over 50 Years
          </h1>
          <p className="text-lg mb-6">
            We are experts in precision weighing solutions for industrial, laboratory, vehicle, and inspection sectors, 
            providing cutting-edge technology and exceptional service.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
            <Link to="/contact" className="border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-weightech-darkblue transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-weightech-red rounded-lg transform rotate-12 translate-x-4 -translate-y-4 opacity-20"></div>
            <div className="absolute inset-0 bg-white rounded-lg transform -rotate-6 translate-x-1 translate-y-1 opacity-20"></div>
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-white p-2">
              <img 
                src="/public/lovable-uploads/36940499-bbb4-4a72-beee-59fb6a6e4e76.png" 
                alt="Weighing equipment" 
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Clock } from 'lucide-react';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTimeLoggerOpen, setIsTimeLoggerOpen] = useState(false);
  const location = useLocation();

  const ProductCard = ({ id, name, description, imagePath, price }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
      <div className="h-48 overflow-hidden">
        <img src={imagePath} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-avery-red font-bold">{price}</span>
          <Link to={`/products/${id}`} className="text-sm font-medium text-avery-black hover:text-avery-red transition-colors">View Details</Link>
        </div>
      </div>
    </div>
  );

  const SectorCard = ({ title, description, imagePath, link }) => (
    <Link to={link} className="sector-card group">
      <div className="h-64 overflow-hidden rounded-lg relative">
        <img src={imagePath} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );

  const featuredProducts = [
    {
      id: 1,
      name: "Valor 7000 Compact Scale",
      description: "High precision compact bench scale with advanced features.",
      imagePath: "/images/Prod1.jpeg",
      price: "£849.99"
    },
    {
      id: 2,
      name: "Explorer Analytical Balance",
      description: "Superior analytical performance with intuitive operation.",
      imagePath: "/images/Prod2.jpeg",
      price: "£2,349.00"
    }
  ];

  const sectors = [
    {
      title: "Industrial",
      description: "Robust weighing solutions for manufacturing and production environments.",
      imagePath: "/images/Prod3.jpeg",
      link: "/sectors/industrial"
    }
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-avery-black text-black">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        </div>

        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`header-nav-link ${location.pathname === '/' ? 'text-avery-red' : ''}`}>Home</Link>
            <Link to="/products" className={`header-nav-link ${location.pathname === '/products' ? 'text-avery-black' : ''}`}>Products</Link>
            <Link to="/services" className={`header-nav-link ${location.pathname === '/services' ? 'text-avery-black' : ''}`}>Services</Link>
          </nav>
          </div>
          
      </header>

      {/* Banner Image */}
      <div className="w-full">
        <img
          src="/images/Prod6.jpeg"
          alt="Weighing equipment"
          className="banner-image"
        />
      </div>

      {/* Company Info Section */}
      <section className="relative bg-avery-darkblue text-black">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
              Professional Engineering Services
            </h1>
            <p className="text-lg mb-6 text-center font-medium">
              AEA provides key market solutions in Weighing, Power, Industrial, Infrastructure, Agriculture, Software, Construction and After Sale Support with an innovative approach into the future.
            </p>
            <h2 className="text-xl font-bold text-center mb-2 text-avery-darkblue">For Africa by Africans</h2>
            <p className="mb-2 text-center">
              AEA Limited is a Pan African company that was incorporated 1970. The company was initially established primarily with a focus on the supply, manufacture and maintenance of industrial and domestic weighing equipment.
            </p>
            <p className="mb-2 text-center">
              AEA has consistently remained as the largest supplier of weighing solutions in East Africa to date. Over the years, the company has continuously diversified its activities and product offering due to the strong aftermarket support.
            </p>
            <p className="text-center">
              AEA has footprints in Kenya, Uganda and Tanzania with an extension to Zambia. We provide key market solutions in Weighing, Power, Industrial, Infrastructure, Agriculture, Software, Construction and After Sale Support with an innovative approach into the future.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link to="/products" className="btn-primary">Browse Products</Link>
              <Link to="/contact" className="border border-white text-black px-4 py-2 rounded-md hover:bg-white hover:text-avery-darkblue transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => <ProductCard key={product.id} {...product} />)}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Sectors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sector, index) => <SectorCard key={index} {...sector} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
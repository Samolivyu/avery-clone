
import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  imagePath: string;
  price: string;
}

const ProductCard = ({ id, name, description, imagePath, price }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
      <div className="h-48 overflow-hidden">
        <img 
          src={imagePath} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-weightech-red font-bold">{price}</span>
          <Link 
            to={`/products/${id}`} 
            className="text-sm font-medium text-weightech-black hover:text-weightech-red transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProductsSection = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Valor 7000 Compact Scale",
      description: "High precision compact bench scale with advanced features.",
      imagePath: "/public/lovable-uploads/36940499-bbb4-4a72-beee-59fb6a6e4e76.png",
      price: "£849.99"
    },
    {
      id: 2,
      name: "Explorer Analytical Balance",
      description: "Superior analytical performance with intuitive operation.",
      imagePath: "/public/lovable-uploads/36940499-bbb4-4a72-beee-59fb6a6e4e76.png",
      price: "£2,349.00"
    },
    {
      id: 3,
      name: "Defender 3000 Platform Scale",
      description: "Durable industrial platform scale for demanding environments.",
      imagePath: "/public/lovable-uploads/36940499-bbb4-4a72-beee-59fb6a6e4e76.png",
      price: "£1,199.50"
    },
    {
      id: 4,
      name: "CKW Checkweigher",
      description: "Versatile checkweighing scale for production and quality control.",
      imagePath: "/public/lovable-uploads/36940499-bbb4-4a72-beee-59fb6a6e4e76.png",
      price: "£1,499.99"
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="section-title">Featured Products</h2>
          <Link 
            to="/products" 
            className="text-weightech-red font-medium hover:underline"
          >
            View All Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              imagePath={product.imagePath}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;


import React from 'react';
import { Link } from 'react-router-dom';

interface SectorCardProps {
  title: string;
  description: string;
  imagePath: string;
  link: string;
}

const SectorCard = ({ title, description, imagePath, link }: SectorCardProps) => {
  return (
    <Link to={link} className="sector-card group">
      <div className="h-64 overflow-hidden rounded-lg relative">
        <img 
          src={imagePath} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
};

const SectorsSection = () => {
  const sectors = [
    {
      title: "Industrial",
      description: "Robust weighing solutions for manufacturing and production environments.",
      imagePath: "/public/lovable-uploads/507cf1c2-7491-4a8d-9d22-4d87710f493e.png",
      link: "/sectors/industrial"
    },
    {
      title: "Laboratory",
      description: "Precision balances and scales for research and analytical applications.",
      imagePath: "/public/lovable-uploads/507cf1c2-7491-4a8d-9d22-4d87710f493e.png",
      link: "/sectors/laboratory"
    },
    {
      title: "Vehicle",
      description: "Weighbridges and axle weighers for logistics and transportation sectors.",
      imagePath: "/public/lovable-uploads/507cf1c2-7491-4a8d-9d22-4d87710f493e.png",
      link: "/sectors/vehicle"
    },
    {
      title: "Inspection",
      description: "Quality control weighing systems for production lines and compliance.",
      imagePath: "/public/lovable-uploads/507cf1c2-7491-4a8d-9d22-4d87710f493e.png",
      link: "/sectors/inspection"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Sectors</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            We offer specialized weighing solutions for various industries and applications,
            providing precise measurements tailored to your specific needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector, index) => (
            <SectorCard
              key={index}
              title={sector.title}
              description={sector.description}
              imagePath={sector.imagePath}
              link={sector.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorsSection;

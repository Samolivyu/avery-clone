
import React from 'react';
import { Scale, Wrench, Award } from 'lucide-react';

const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-weightech-red mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Services</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Beyond providing quality weighing equipment, we offer comprehensive services
            to ensure your weighing systems operate at peak performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Scale size={32} />}
            title="Sales"
            description="Expert consultation to help you select the right weighing equipment for your specific application and industry requirements."
          />
          <ServiceCard 
            icon={<Wrench size={32} />}
            title="Support"
            description="Technical assistance, maintenance services, and calibration to ensure your weighing equipment remains accurate and reliable."
          />
          <ServiceCard 
            icon={<Award size={32} />}
            title="Calibration"
            description="UKAS-accredited calibration services for all types of weighing equipment, ensuring compliance with industry standards."
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

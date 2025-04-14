
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Check, Scale, Wrench, Award, Monitor, Truck, Calculator } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard = ({ icon, title, description, features }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="p-6 flex-grow">
        <div className="text-weightech-red mb-4 flex justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-center">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-weightech-red shrink-0 mr-2 mt-0.5" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 pt-0">
        <Button className="w-full bg-weightech-red hover:bg-red-700 text-white">
          Learn More
        </Button>
      </div>
    </div>
  );
};

const Services = () => {
  const services: ServiceCardProps[] = [
    {
      icon: <Scale size={48} />,
      title: "Sales",
      description: "Expert consultation to help you select the right weighing equipment for your specific application and industry requirements.",
      features: [
        "Complete product range from laboratory to industrial scales",
        "Customized weighing solutions",
        "Competitive pricing and financing options",
        "Trade-in and upgrade programs"
      ]
    },
    {
      icon: <Wrench size={48} />,
      title: "Support",
      description: "Technical assistance, maintenance services, and calibration to ensure your weighing equipment remains accurate and reliable.",
      features: [
        "24/7 technical helpline",
        "Remote diagnostics",
        "Preventative maintenance programs",
        "Emergency repair service"
      ]
    },
    {
      icon: <Award size={48} />,
      title: "Calibration",
      description: "UKAS-accredited calibration services for all types of weighing equipment, ensuring compliance with industry standards.",
      features: [
        "Traceable certificates",
        "On-site calibration",
        "Regular recalibration scheduling",
        "Compliance with ISO standards"
      ]
    },
    {
      icon: <Monitor size={48} />,
      title: "Software Solutions",
      description: "Comprehensive software solutions that integrate with your weighing equipment for enhanced functionality and data management.",
      features: [
        "Custom interface development",
        "Data collection and reporting",
        "ERP system integration",
        "Cloud-based monitoring"
      ]
    },
    {
      icon: <Truck size={48} />,
      title: "Installation",
      description: "Professional installation services ensuring your weighing equipment is set up correctly for optimal performance.",
      features: [
        "Site preparation guidance",
        "Expert equipment installation",
        "Staff training",
        "Post-installation follow-up"
      ]
    },
    {
      icon: <Calculator size={48} />,
      title: "Consultancy",
      description: "Expert advice on weighing processes, regulations, and optimization to improve efficiency and compliance.",
      features: [
        "Workflow optimization",
        "Regulatory compliance consultation",
        "Industry-specific guidance",
        "Cost reduction strategies"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative bg-weightech-black text-white">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl max-w-2xl">
              Beyond providing quality weighing equipment, we offer comprehensive services
              to ensure your weighing systems operate at peak performance.
            </p>
          </div>
        </div>

        {/* Services Overview */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="bg-weightech-red text-white p-4 mb-8">
              <h2 className="text-xl font-semibold">Overview</h2>
            </div>
            
            <div className="mb-12">
              <p className="text-gray-800 mb-4">
                At WEIGHTECH, we understand that reliable weighing solutions require more than just quality equipment. 
                Our comprehensive services ensure that your systems operate optimally, comply with all relevant standards, 
                and continue to meet your evolving business needs.
              </p>
              <p className="text-gray-700 mb-6">
                From initial consultation and installation to ongoing maintenance, calibration, and technical support, 
                our team of experienced professionals is committed to providing exceptional service throughout the entire 
                lifecycle of your weighing equipment.
              </p>
            </div>
            
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                />
              ))}
            </div>
            
            {/* Call to Action */}
            <div className="mt-16 bg-weightech-black text-white p-8 rounded-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                <p className="mb-6">
                  Contact our team today to discuss your weighing equipment needs and 
                  discover how our services can support your business operations.
                </p>
                <Button className="bg-weightech-red hover:bg-red-700 text-white">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;

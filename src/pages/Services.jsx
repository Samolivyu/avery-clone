import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "../components/ui/button";
import { Check, Scale, Wrench, Award, Monitor} from 'lucide-react';

const ServiceCard = ({ icon, title, description, features }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
    <div className="p-6 flex-grow">
      <div className="text-avery-red mb-2 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-center">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-avery-red shrink-0 mr-2 mt-0.5" />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="p-6 pt-0">
      <Button className="w-full bg-avery-red hover:bg-red-700 text-black">
        Learn More
      </Button>
    </div>
  </div>
);

ServiceCard.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string)
};

const Services = () => {
  const services = [
    {
      icon: <Scale size={48} />,
      title: "Weighing Solutions",
      description: " Specialists in power generation, transmission and distribution.",
      features: [
        "We offer state of Art weighing solutions in both Electrical and mechanical fields.",
        "Local weighing solutions for Kadogo economy and innovative weighing software solutions, under Kilo sahihi brand.",
        "Representing world class brands like Avery Weightronix from UK, Camea from Czech Republic—world leaders in high speed Weigh in Motion.",
      ]
    },
    {
      icon: <Wrench size={48} />,
      title: "Energy Solutions",
      description: "Technical assistance, maintenance services, and calibration to ensure your weighing equipment remains accurate and reliable.",
      features: [
        "Products range from 5KVA to 3000KVA single units",
        "Include Power Generators to solar and Renewable Power Solutions.",
        "Building of substations and power automation systems, distribution lines and innovative street lighting systems.",
      ]
    },
    {
      icon: <Award size={48} />,
      title: "Coding and Marking",
      description: "Whatever your requirements, AEA has coding and marking solutions to meet your many production needs. Offering a wide variety of coding technologies, specialized inks and fluids, advanced software and a dedicated service team.",
      features: [
        "Diverse printing technologies enable precise product marking across various materials and production speeds.",
        "Specialized inks and fluids ensure optimal visibility and compliance with industry regulations.",
        "Intuitive software platforms integrate seamlessly with existing systems for efficient operation.",
        "Dedicated service teams provide technical support and customized solutions for specific needs.",
        "Advanced marking solutions deliver consistent quality through innovative hardware and software."
      ]
    },
    {
      icon: <Monitor size={48} />,
      title: "Power Projects",
      description: "Avery EA provides engineering, procuring and construction solutions along with turnkey solutions for medium and high voltage electrical systems. Avery provides the management and logistics services for the supply and installation of transformers, switchgear and ring mains unit.",
      features: [
        "Comprehensive engineering, procurement, and construction (EPC) solutions for electrical systems",
        "Specialized expertise in medium and high voltage electrical infrastructure",
        "Turnkey project delivery from design through installation and commissioning",
        "Supply and installation management for critical electrical equipment including transformers, switchgear, and ring main units",
        "Complete logistics services coordinating equipment delivery and installation",
        "Project management capabilities to oversee complex electrical system implementations"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative bg-avery-black text-white">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Our Services</h1>
            <p className="text-xl max-w-2xl">
            Proper maintenance and servicing of your equipment is vital to the profitability of your business.
            </p>
          </div>
        </div>

        {/* Solutions Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="mb-10">
              <p className="mb-2 text-gray-800">
              With competitively priced contracts and flexible payment plans we offer maintenance cover & technical support for any make of weighing or coding equipment and for any size business. Our wide range of standard maintenance contracts allow you to choose the level of support, response/fix times and hours of cover you need for your business.              </p>
              <p className="mb-2 text-gray-800">
              We can tailor a maintenance package to suit your specific needs and if a contract is not for you and you simply need a one off repair we can offer fixed cost call outs and a free quotation for any parts required.              </p>
            </div>
            <div className="mb-10">
              <p className="mb-2 text-gray-800">
              When you choose AEA Limited as your service provider you will have access to over 20 highly trained and accredited field based technicians, a fleet of over fifteen service pick ups and a dedicated local service manager who will personally monitor your account.
              </p>
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="bg-avery-red text-black p-4 mb-8">
              <h2 className="text-xl font-semibold">Overview</h2>
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
            <div className="mt-16 bg-avery-black text-white p-8 rounded-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Ready to get started?</h3>
                <p className="mb-6">
                  Contact our team today to discuss your weighing equipment needs and 
                  discover how our services can support your business operations.
                </p>
                <Button className="bg-avery-red hover:bg-red-700 text-white">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;
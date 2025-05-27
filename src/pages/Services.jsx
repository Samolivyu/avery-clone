import React, { useState } from 'react';
import { Scale, Wrench, BadgeCheck, Code, ArrowRight, X } from 'lucide-react';

// Button component fallback if not using your own UI library
const Button = ({ children, className = '', ...props }) => (
  <button
    className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const ServiceCard = ({ icon, title, description, features, onLearnMore }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-200">
    <div className="p-6 flex-1 flex flex-col">
      <div className="mb-4 text-avery-red">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
    <div className="mt-auto p-6 pt-0">
      <Button
        className="w-full border border-red-700 text-red-700 bg-white hover:bg-red-50"
        onClick={onLearnMore}
        type="button"
      >
        Learn More
      </Button>
    </div>
  </div>
);

const ServiceModal = ({ open, onClose, service }) => {
  if (!open || !service) return null;
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-start justify-start w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-30"
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      style={{ backdropFilter: 'blur(2px)' }}
    >
      <div className="relative w-full max-w-2xl max-h-full mx-auto">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-xl font-medium text-gray-900">{service.title}</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-7 space-y-4">
            <div className="flex items-start gap-3">{service.icon}<span className="font-semibold">{service.description}</span></div>
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
              {service.features.map((feature, idx) => (
                <li key={idx}>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          {/* Modal footer */}
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
            <button
              type="button"
              onClick={onClose}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const divisions = [
  {
    image: "images/weighing-equipment.jpeg",
    title: "Weighing Systems",
    description: "Market leader in weighing technology solutions for retail and industrial applications. Products include bench scales, platform scales, weighbridges, and custom software solutions.",
    links: [
      { label: "View Products", url: "https://averytronix.com" },
      { label: "Software Solutions", url: "https://averytronix.com/software" }
    ],
    popover: {
      title: "Weighing Systems Details",
      content: (
        <>
          <p className="mb-2">Our weighing systems include:</p>
          <ul className="list-disc pl-5 mb-2">
            <li>Retail scales with receipt printing</li>
            <li>Industrial platform scales (150kg-3000kg)</li>
            <li>Precision laboratory balances</li>
            <li>Truck weighbridges and axle weighers</li>
            <li>Custom weighing software solutions</li>
          </ul>
          <p>All systems come with calibration certificates and maintenance options.</p>
        </>
      )
    }
  },
  {
    image: "/images/coding-marking.webp",
    title: "Coding & Marking",
    description: "Comprehensive coding technologies including CIJ, TIJ, laser marking, and label applicators. Specialized inks and dedicated service support.",
    links: [
      { label: "Continuous Ink Jet", url: "https://www.videojet.co.uk/uk/homepage/products/find-and-compare-products.html?filter_group=filter_group%255Btechnology%255D%255Bcontinuous%255D%253Dcontinuous" },
      { label: "Thermal Ink Jet", url: "https://www.videojet.co.uk/uk/homepage/products/find-and-compare-products.html?filter_group=filter_group%255Btechnology%255D%255Bthermalinkjet%255D%253Dthermalinkjet" }
    ],
    popover: {
      title: "Coding & Marking Solutions",
      content: (
        <>
          <p className="mb-2">Our coding technologies include:</p>
          <ul className="list-disc pl-5 mb-2">
            <li>Continuous Ink Jet (CIJ) for high-speed production</li>
            <li>Thermal Ink Jet (TIJ) for clean, cartridge-based printing</li>
            <li>Laser marking systems for permanent coding</li>
            <li>Label applicators for automated labeling</li>
            <li>Specialized food-grade and industrial inks</li>
          </ul>
          <p>All systems are backed by our 24/7 technical support team.</p>
        </>
      )
    }
  },
  {
    image: "images/power-solutions.jpeg",
    title: "Power Solutions",
    description: "Turnkey power projects with TCL generators (10kVA-1000kVA), substation development, and high-voltage system installations.",
    links: [
      { label: "Generator Models", url: "#generators" },
      { label: "Substation Projects", url: "#substations" }
    ],
    popover: {
      title: "Power Solutions Details",
      content: (
        <>
          <p className="mb-2">Our power solutions include:</p>
          <ul className="list-disc pl-5 mb-2">
            <li>TCL Generators from 10kVA to 1000kVA</li>
            <li>Diesel and natural gas generator options</li>
            <li>Automatic transfer switches and control systems</li>
            <li>Substation development and maintenance</li>
            <li>High-voltage system installations</li>
            <li>Power transmission infrastructure projects</li>
          </ul>
          <p>All power solutions come with comprehensive warranties and maintenance plans.</p>
        </>
      )
    }
  },
  {
    image: "images/industrial-bearings.jpg",
    title: "Industrial Solutions",
    description: "INA/FAG bearing technology for heavy industrial applications, power transmission, and wind turbine equipment.",
    links: [
      { label: "Bearing Selection", url: "https://www.schaeffler.de/en/products-and-solutions/industrial/" },
      { label: "Service & Support", url: "https://partner-portal.schaeffler/de/_/anmelden?login.redirectlogin=/de" }
    ],
    popover: {
      title: "Industrial Solutions Details",
      content: (
        <>
          <p className="mb-2">Our industrial solutions include:</p>
          <ul className="list-disc pl-5 mb-2">
            <li>INA/FAG bearings for heavy industrial applications</li>
            <li>Specialized bearings for extreme environments</li>
            <li>Power transmission components and systems</li>
            <li>Wind turbine bearings and maintenance</li>
            <li>Bearing housing solutions and lubrication systems</li>
            <li>Condition monitoring and predictive maintenance</li>
          </ul>
          <p>All industrial components come with technical support and installation guidance.</p>
        </>
      )
    }
  }
];

const serviceDetails = [
  {
    icon: <Scale size={48} />,
    title: "Weighing Solutions",
    description: "Specialists in power generation, transmission and distribution.",
    features: [
      "State-of-the-art weighing solutions in both electrical and mechanical fields.",
      "Local weighing solutions for Kadogo economy and innovative weighing software solutions, under Kilo sahihi brand.",
      "Weighing equipment for retail, industrial, and laboratory applications.",
      "Customized weighing solutions for specific industry needs."
    ]
  },
  {
    icon: <Wrench size={48} />,
    title: "Maintenance Services",
    description: "Expert maintenance and calibration for all weighing equipment.",
    features: [
      "Regular maintenance schedules to ensure accuracy and reliability.",
      "Calibration services with certification for compliance requirements.",
      "Rapid response repair services to minimize downtime.",
      "Preventative maintenance programs to extend equipment life."
    ]
  },
  {
    icon: <BadgeCheck size={48} />,
    title: "Quality Assurance",
    description: "Ensuring accuracy and compliance with industry standards.",
    features: [
      "Comprehensive quality control procedures for all equipment.",
      "Compliance with international weighing standards and regulations.",
      "Documentation and certification for audit requirements.",
      "Training programs for proper equipment use and maintenance."
    ]
  },
  {
    icon: <Code size={48} />,
    title: "Software Solutions",
    description: "Integrated software for data management and analysis.",
    features: [
      "Custom software development for specific weighing applications.",
      "Data collection and analysis tools for process improvement.",
      "Integration with existing business systems and ERP solutions.",
      "Cloud-based monitoring and reporting capabilities."
    ]
  }
];

const Services = () => {
  const [openModalIdx, setOpenModalIdx] = useState(null);
  const [openDivisionPopover, setOpenDivisionPopover] = useState(null);

  // Contact form state
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    // JWT authentication will be implemented here instead of emailjs
    console.log("Form submitted:", form);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-20 relative z-10">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Proper maintenance and servicing of your equipment is vital to the profitability of your business.
            </h1>
          </div>
        </div>

        {/* Services Description */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-2">
            <div className="mb-3">
              <p className="text-justify text-gray-500">
                With competitively priced contracts and flexible payment plans, we offer maintenance cover &amp; technical support for any make of weighing or coding equipment and for any size business. Our wide range of standard maintenance contracts allow you to choose the level of support, response/fix times, and hours of cover you need for your business.
                <br /><br />
                We can tailor a maintenance package to suit your specific needs, and if a contract is not for you and you simply need a one-off repair, we can offer fixed cost call outs and a free quotation for any parts required.
                <br /><br />
                When you choose AEA Limited as your service provider, you will have access to over 20 highly trained and accredited field-based technicians, a fleet of over fifteen service pick-ups, and a dedicated local service manager who will personally monitor your account.
                <br /><br />
                Detailed management reports, including breakdowns of machines, call-to-fix details, and planned maintenance reports will be provided on a regular basis.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Service Offerings</h2>
              <p className="text-justify text-gray-500">
                We provide comprehensive services to ensure your weighing equipment operates at peak performance, maintaining accuracy and reliability.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {serviceDetails.map((service, idx) => (
                <ServiceCard
                  key={service.title}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  onLearnMore={() => setOpenModalIdx(idx)}
                />
              ))}
              <ServiceModal
                open={openModalIdx !== null}
                onClose={() => setOpenModalIdx(null)}
                service={openModalIdx !== null ? serviceDetails[openModalIdx] : null}
              />
            </div>
          </div>
        </div>

        {/* Divisions Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 flex justify-between items-center mb-12">
            <div className="max-w-lg">
              <div className="mb-6">
                <span className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">OUR DIVISIONS</span>
                <h2 className="text-justify text-gray-500">Specialized Solutions for Industrial Excellence</h2>
              </div>
            </div>
            <div className="hidden md:block"></div>
          </div>
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {divisions.map((division, idx) => (
              <div key={division.title} className="flex flex-col h-full">
                <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <img
                    src={division.image}
                    alt={division.title}
                    className="w-full h-40 object-cover"
                  />
                  
                  {/* Styled links block */}
                  <div
                    className="p-4 bg-white rounded-lg md:p-8 mt-auto"
                    id={`division-links-panel-${idx}`}
                    role="tabpanel"
                    aria-labelledby={`division-links-tab-${idx}`}
                  >
                    <h4 className="mb-3 text-lg font-semibold tracking-tight text-gray-900">
                      {division.title} Links
                    </h4>
                    <p className="mb-3 text-gray-500">
                      {division.description}
                    </p>
                    <button
                        type="button"
                        className="inline-flex items-center font-medium px-4 py-3 rounded-lg text-red-700 border border-red-700 bg-white hover:bg-red-50 focus:ring-4 focus:outline-none focus:ring-red-800"
                        onClick={() => setOpenDivisionPopover(idx)}
                      >
                        Learn More
                        <ArrowRight size={16} className="ml-2" />
                      </button>
                    <div className="flex flex-col space-y-2">
                      {division.links.map((link, linkIdx) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target={link.url.startsWith('http') ? "_blank" : undefined}
                          rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
                          className={
                            "inline-flex items-center font-medium px-4 py-3 rounded-lg transition-colors " +
                            (linkIdx === 0
                              ? "text-white bg-red-700 hover:bg-red-800"
                              : "text-red-700 border border-red-700 bg-white hover:bg-red-50 hover:text-red-800")
                          }
                          aria-current={linkIdx === 0 ? "page" : undefined}
                        >
                          {link.label}
                          <ArrowRight size={16} className="ml-2" />
                        </a>
                      ))}
                      
                    </div>
                  </div>
                  {/* Modal for division */}
                  {openDivisionPopover === idx && (
                    <div
                      className="fixed top-0 left-0 right-0 z-50 flex items-start justify-start w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-30"
                      tabIndex={-1}
                      aria-modal="true"
                      role="dialog"
                      style={{ backdropFilter: 'blur(2px)' }}
                    >
                      <div className="relative w-full max-w-2xl max-h-full mx-auto">
                        <div className="relative bg-white rounded-lg shadow-sm">
                          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <h3 className="text-xl font-medium text-gray-900">{division.popover.title}</h3>
                            <button
                              type="button"
                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                              onClick={() => setOpenDivisionPopover(null)}
                              aria-label="Close modal"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="p-4 md:p-5 space-y-4">
                            {division.popover.content}
                          </div>
                          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                            <button
                              type="button"
                              onClick={() => setOpenDivisionPopover(null)}
                              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" id="contact">Contact Our Service Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have questions about our services? Need a quote for maintenance or repair? 
                Our team is ready to assist you with any inquiries.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-avery-red"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-avery-red"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-avery-red"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                <div className="text-right">
                  <Button type="submit" className="bg-avery-red hover:bg-red-700 text-black">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;
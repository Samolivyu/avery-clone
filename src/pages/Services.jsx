// src/pages/Services.jsx
import React, { useState } from 'react';
import { Scale, Wrench, BadgeCheck, Code, ArrowRight, X } from 'lucide-react';
import ContactSection from '../components/Home';

const services = [
  { icon: <Scale size={48} />, title: "Weighing Solutions", desc: "Specialists in power generation, transmission and distribution.", features: ["State-of-the-art weighing solutions", "Local weighing solutions for Kadogo economy", "Equipment for retail, industrial, and laboratory", "Customized solutions for specific industry needs"] },
  { icon: <Wrench size={48} />, title: "Maintenance Services", desc: "Expert maintenance and calibration for all weighing equipment.", features: ["Regular maintenance schedules", "Calibration with certification", "Rapid response repair", "Preventative maintenance programs"] },
  { icon: <BadgeCheck size={48} />, title: "Quality Assurance", desc: "Ensuring accuracy and compliance with industry standards.", features: ["Comprehensive quality control", "Compliance with international standards", "Documentation for audits", "Training programs for proper use"] },
  { icon: <Code size={48} />, title: "Software Solutions", desc: "Integrated software for data management and analysis.", features: ["Custom software development", "Data collection and analysis tools", "Integration with ERP solutions", "Cloud-based monitoring and reporting"] }
];

const divisions = [
  { img: "/images/weighing-equipment.jpeg", title: "Weighing Systems", desc: "Market leader in weighing technology solutions for retail and industrial applications.", popover: { title: "Weighing Systems Details", content: "Retail scales, industrial platform scales, laboratory balances, truck weighbridges, custom software." } },
  { img: "/images/coding-marking.webp", title: "Coding & Marking", desc: "Comprehensive coding technologies including CIJ, TIJ, laser marking, and label applicators.", popover: { title: "Coding Solutions", content: "Continuous Ink Jet, Thermal Ink Jet, Laser marking, Label applicators, Specialized inks." } },
  { img: "/images/power-solutions.jpeg", title: "Power Solutions", desc: "Turnkey power projects with TCL generators (10kVA-1000kVA), substation development.", popover: { title: "Power Solutions Details", content: "TCL Generators, Diesel/Natural gas options, Automatic transfer switches, Substation development, High-voltage installations." } },
  { img: "/images/industrial-bearings.jpg", title: "Industrial Solutions", desc: "INA/FAG bearing technology for heavy industrial applications and power transmission.", popover: { title: "Industrial Solutions Details", content: "INA/FAG bearings, Specialized bearings for extreme environments, Power transmission components, Wind turbine bearings, Condition monitoring." } }
];

const Services = () => {
  const [activeServiceModal, setActiveServiceModal] = useState(null);
  const [activeDivisionModal, setActiveDivisionModal] = useState(null);

  return (
<div id="services-view" className="page-view min-h-screen bg-gray-50">
<section className="bg-white">
  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
    <div className="grid md:grid-cols-2 gap-8 xl:gap-20 md:items-center">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-6xl lg:leading-tight text-black">
          Proper maintenance and servicing of your equipment is vital to the profitability of your business.
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          We provide comprehensive services to ensure your weighing equipment operates at peak performance, maintaining accuracy and reliability.
        </p>
      </div>
      <div className="relative">
        <img
          className="w-full rounded-lg shadow-xl object-cover h-[400px]"
          src="/images/weighing-equipment.jpeg"
          alt="Services Hero"
        />
        <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-tr from-gray-100 via-transparent to-transparent mt-4 -mb-4 mr-4 -ml-4"></div>
      </div>
    </div>
  </div>

  <div className="py-12 bg-gray-50">
    <div className="container mx-auto px-2 max-w-screen-lg">
      <p className="text-justify text-gray-600 mb-6">
        With competitively priced contracts and flexible payment plans, we offer maintenance cover & technical support for any make of weighing or coding equipment and for any size business. Our wide range of standard maintenance contracts allow you to choose the level of support, response/fix times, and hours of cover you need for your business.
        <br /><br />
        We can tailor a maintenance package to suit your specific needs, and if a contract is not for you and you simply need a one-off repair, we can offer fixed cost call outs and a free quotation for any parts required.
        <br /><br />
        When you choose AEA Limited as your service provider, you will have access to over 20 highly trained and accredited field-based technicians, a fleet of over fifteen service pick-ups, and a dedicated local service manager who will personally monitor your account.
        <br /><br />
        Detailed management reports, including breakdowns of machines, call-to-fix details, and planned maintenance reports will be provided on a regular basis.
      </p>
    </div>
  </div>
</section>

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Service Offerings</h2>
            <p className="text-justify text-gray-600 max-w-3xl mx-auto">We provide comprehensive services to ensure your weighing equipment operates at peak performance, maintaining accuracy and reliability.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-200">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4 text-avery-red">{s.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-gray-600 mb-4">{s.desc}</p>
                </div>
                <div className="mt-auto p-6 pt-0">
                  <button onClick={() => setActiveServiceModal(i)} className="w-full border border-red-700 text-red-700 bg-white bg-red-50 inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition">Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-black text-center">OUR DIVISIONS</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">Specialized Solutions for Industrial Excellence</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {divisions.map((d, i) => (
              <div key={i} className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <img src={d.img} alt={d.title} className="w-full h-40 object-cover"/>
                <div className="p-6 mt-auto">
                  <h4 className="mb-2 text-lg font-semibold">{d.title}</h4>
                  <p className="mb-3 text-gray-500 text-sm">{d.desc}</p>
                  <button onClick={() => setActiveDivisionModal(i)} className="inline-flex items-center font-medium px-4 py-2 rounded-lg text-red-700 border border-red-700 bg-white bg-red-50">Learn More <ArrowRight size={16} className="ml-2" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ContactSection id="services-contact" />

      {/* Modals */}
      {activeServiceModal !== null && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 bg-black bg-opacity-30 modal-backdrop">
          <div className="relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-medium">{services[activeServiceModal].title}</h3>
              <button onClick={() => setActiveServiceModal(null)} className="text-gray-400 hover:text-gray-900"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">{services[activeServiceModal].icon}<span className="font-semibold">{services[activeServiceModal].desc}</span></div>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                {services[activeServiceModal].features.map((f, idx) => <li key={idx}>{f}</li>)}
              </ul>
            </div>
            <div className="flex justify-end p-4 border-t">
              <button onClick={() => setActiveServiceModal(null)} className="text-white bg-red-700 bg-red-800 px-5 py-2 rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}

      {activeDivisionModal !== null && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 bg-black bg-opacity-30 modal-backdrop">
          <div className="relative w-full max-w-2xl max-h-full bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-medium">{divisions[activeDivisionModal].popover.title}</h3>
              <button onClick={() => setActiveDivisionModal(null)} className="text-gray-400 hover:text-gray-900"><X size={20} /></button>
            </div>
            <div className="p-6">
              <p>{divisions[activeDivisionModal].popover.content}</p>
            </div>
            <div className="flex justify-end p-4 border-t">
              <button onClick={() => setActiveDivisionModal(null)} className="text-white bg-red-700 bg-red-800 px-5 py-2 rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;

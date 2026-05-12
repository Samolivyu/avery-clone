// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

const Home = () => {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState('mission');

  const toggleAccordion = (id) => setActiveAccordion(activeAccordion === id ? null : id);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:items-center">
              <div>
                <h1 className="block text-3xl font-bold text-gray-900 sm:text-4xl lg:text-6xl lg:leading-tight">
                  Professional <span className="text-avery-red">Engineering Services</span>
                </h1>
                <p className="mt-4 text-lg text-gray-500">
                  AEA provides key market solutions in Weighing, Power, Industrial, Infrastructure, Agriculture, Software, Construction and After Sale Support.
                </p>
                <div className="mt-7 grid gap-3 w-full sm:inline-flex">
                  <Link to="/products" className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-avery-red text-white bg-red-700 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
                    Browse Products
                    <ArrowRight size={16} />
                  </Link>
                  <a href="#contact" className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-gray-100 border border-gray-200 text-black hover:bg-gray-200 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
                    Get In Touch
                  </a>
                </div>
              </div>
              <div className="relative ms-4">
                <img className="w-full rounded-md" src="/images/Prod6.jpeg" alt="Hero Image" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-gray-100 via-transparent to-transparent size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6"></div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-screen-lg mx-auto px-4 lg:px-8">
            {!showFullAbout ? (
              <div className="max-w-screen-lg text-gray-500 sm:text-lg">
                <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900">About AEA Limited</h2>
                <p className="mb-4 font-light">
                  AEA Limited is a Pan African company that was incorporated in 1970. The Company was initially established primarily with a focus on the supply, manufacture and maintain Industrial and domestic weighing scales.
                </p>
                <p className="mb-4 font-medium">
                  AEA has consistently remained as the largest supplier of weighing equipment in East Africa to date.
                </p>
                <button onClick={() => setShowFullAbout(true)} className="inline-flex items-center font-medium text-avery-red hover:text-red-800">
                  Read more <ArrowRight size={16} className="ml-1" />
              </button>
              </div>
            ) : (
              <div className="max-w-screen-lg">
                <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900">About AEA Limited</h2>
                <p className="mb-8 text-gray-500 sm:text-lg">
                  AEA Limited is a Pan African company that was incorporated in 1970. Over the years, the company has continuously diversified its activities and product offerings due to the strong aftermarket support with a key focus on power and infrastructure.
                </p>

                <div className="hs-accordion-group space-y-2">
                  {/* Mission */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className="hs-accordion-toggle w-full px-4 py-3 inline-flex items-center gap-x-3 font-semibold text-gray-900 hover:text-gray-600 focus:outline-none"
                      onClick={() => toggleAccordion('mission')}
                    >
                      {activeAccordion === 'mission' ? <Minus size={16} /> : <Plus size={16} />}
                      Mission
                    </button>
                    {activeAccordion === 'mission' && (
                      <div className="p-4 text-gray-600 border-t border-gray-100">
                        To be a leader in the provision of high-quality equipment, parts, and solutions for industries, construction sector, and power sector.
                      </div>
                    )}
                  </div>

                  {/* Vision */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className="hs-accordion-toggle w-full px-4 py-3 inline-flex items-center gap-x-3 font-semibold text-gray-900 hover:text-gray-600 focus:outline-none"
                      onClick={() => toggleAccordion('vision')}
                    >
                      {activeAccordion === 'vision' ? <Minus size={16} /> : <Plus size={16} />}
                      Vision
                    </button>
                    {activeAccordion === 'vision' && (
                      <div className="p-4 text-gray-600 border-t border-gray-100">
                        To become an innovative, responsive, and dominant player in the sectors or markets where we operate or have a presence.
                      </div>
                    )}
                  </div>

                  {/* Core Values */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className="hs-accordion-toggle w-full px-4 py-3 inline-flex items-center gap-x-3 font-semibold text-gray-900 hover:text-gray-600 focus:outline-none"
                      onClick={() => toggleAccordion('values')}
                    >
                      {activeAccordion === 'values' ? <Minus size={16} /> : <Plus size={16} />}
                      Core Values
                    </button>
                    {activeAccordion === 'values' && (
                      <div className="p-4 text-gray-600 border-t border-gray-100">
                        <ul className="list-disc pl-5 space-y-2">
                          <li><strong>Quality:</strong> Outstanding products and services.</li>
                          <li><strong>Integrity:</strong> Ethical dealings with respect and fairness.</li>
                          <li><strong>Accountability:</strong> Responsibility in all we do.</li>
                          <li><strong>Passion:</strong> Continuous pursuit of maximum productivity.</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              <button onClick={() => setShowFullAbout(false)} className="mt-6 text-avery-red hover:text-red-800 font-medium">Show Less</button>              </div>
            )}
          </div>
        </section>

        {/* Solutions Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Precision Weighing", desc: "Our weighing equipment provides consistent and accurate measurements for all your business needs.", img: "/images/Prod4.jpeg" },
                { title: "Robust Design", desc: "Built to withstand demanding industrial environments while maintaining precision and reliability.", img: "/images/Prod5.jpeg" },
                { title: "Smart Integration", desc: "Seamlessly integrate with your existing systems for streamlined operations and data management.", img: "/images/Prod7.jpeg" }
              ].map((sol, idx) => (
                <div key={idx} className="flex flex-col group bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden hover:shadow-lg focus:outline-hidden transition">
                  <div className="relative pt-[50%] sm:pt-[60%] lg:pt-[60%] rounded-t-xl overflow-hidden">
                    <img className="size-full absolute top-0 inset-s-0 object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-xl" src={sol.img} alt={sol.title} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl text-gray-900">{sol.title}</h3>
                    <p className="mt-2 text-gray-500">{sol.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { id: 1, name: "Valor 7000 Compact Scale", desc: "High precision compact bench scale with advanced features.", price: "£849.99", img: "/images/Prod1.jpeg" },
                { id: 2, name: "Explorer Analytical Balance", desc: "Superior analytical performance with intuitive operation.", price: "£2,349.00", img: "/images/Prod2.jpeg" }
              ].map((p) => (
                <div key={p.id} className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition">
                  <img src={p.img} alt={p.name} className="w-full h-48 object-cover p-4"/>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 flex-1">{p.desc}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-avery-red font-bold">{p.price}</span>
                      <Link to={`/products/${p.id}`} className="text-sm font-medium text-black hover:text-avery-red">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section className="py-16 bg-[#e93f3f]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-white text-center">Sectors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Industrial", desc: "Robust weighing solutions for manufacturing and production environments.", img: "/images/Prod3.jpeg" },
                { title: "Laboratory", desc: "Precision equipment for research and quality control applications.", img: "/images/Prod2.jpeg" },
                { title: "Agriculture", desc: "Weighing solutions tailored for agricultural produce and livestock.", img: "/images/Prod8.jpg" }
              ].map((sec, idx) => (
                <a key={idx} href="#" className="flex flex-col bg-white border border-white/20 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition group">
                  <div className="relative h-64 overflow-hidden">
                    <img src={sec.img} alt={sec.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{sec.title}</h3>
                      <p className="text-white text-sm">{sec.desc}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <div className="py-16 bg-white" id="contact">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Contact Our Service Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Have questions about our services? Our team is ready to assist you.</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" id="name" name="name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-avery-red" placeholder="Your name" required/>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-avery-red" placeholder="Your email" required/>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange} rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-avery-red" placeholder="How can we help you?" required></textarea>
                </div>
                <div className="text-right">
                  <button type="submit" className="inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition bg-avery-red bg-red-700 text-white">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

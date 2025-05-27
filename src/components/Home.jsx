import  { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Login from "./LoginForm.jsx";
import PinEntryForm from './PinEntryForm.jsx';
import Footer from './Footer.jsx';

const Button = ({ children, className = '', ...props }) => (
  <button
    className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Home = () => {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const location = useLocation();

  // Contact form state and logic
  const initialState = {
    name: "",
    email: "",
    message: "https://www.blackbox.ai/chat/FIZzyp1",
  };

  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setForm({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    // JWT authentication will be implemented here instead of emailjs
    console.log("Form submitted:", form);
    clearState();
    // Here you would typically send the data to your backend with JWT authentication
  };

  const toggleAboutSection = () => {
    setShowFullAbout(!showFullAbout);
  };

  // ProductCard, SectorCard, featuredProducts, sectors, productFeatures
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
      name: "Explorer AnalyticalBalance",
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

  const productFeatures = [
    {
      title: "Precision Weighing",
      description: "Our weighing equipment provides consistent and accurate measurements for all your business needs.",
      icon: "/images/Prod4.jpeg"
    },
    {
      title: "Robust Design",
      description: "Built to withstand demanding industrial environments while maintaining precision and reliability.",
      icon: "/images/Prod5.jpeg"
    },
    {
      title: "Smart Integration",
      description: "Seamlessly integrate with your existing systems for streamlined operations and data management.",
      icon: "/images/Prod7.jpeg"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white text-black py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-left">
              Professional Engineering Services
            </h1>
            <p className="text-lg mb-8 text-black-300 text-left">
              AEA provides key market solutions in Weighing, Power, Industrial, Infrastructure, Agriculture, Software, Construction and After Sale Support with an innovative approach into the future.
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              <Link to="/products" className="bg-avery-red hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                Browse Products
              </Link>
              <Link to="/contact" className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-md font-medium transition-colors">
                Get In Touch
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <img
                src="/images/Prod6.jpeg"
                alt="Weighing equipment"
                className="rounded-lg shadow-xl z-10 relative"
              />
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-avery-red/40 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-grey text-black py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-left">
            <h1 className="text-3xl font-bold mb-6">About Us</h1>
            {!showFullAbout ? (
              <>
                <p className="mb-4">
                  AEA Limited is a Pan African company that was incorporated in 1970. The Company was initially established primarily with a focus on the supply, manufacture and maintain Industrial and domestic weighing scales. AEA has consistently remained as the largest supplier of weighing equipment in East Africa to date.
                </p>
                <button 
                  onClick={toggleAboutSection} 
                  className="inline-block bg-avery-red hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition-colors mt-6"
                >
                  READ MORE
                </button>
              </>
            ) : (
              <div className="about-full-content">
                <p className="mb-4">
                  AEA Limited is a Pan African company that was incorporated in 1970. The company was initially established primarily with a focus on the supply, manufacture, and maintenance of industrial and domestic weighing scales.
                </p>
                <p className="mb-4">
                  AEA has consistently remained as the largest supplier of weighing equipment in East Africa to date. Over the years, the company has continuously diversified its activities and product offerings due to the strong aftermarket support with a key focus on power and infrastructure.
                </p>
                <p className="mb-4">
                  AEA provides key market leader products in coding equipment, power generation equipment, industrial products (bearings & related power transmission for production plants), and power infrastructure projects like substations and power plants.
                </p>
                <p className="mb-4">
                  AEA power generators are manufactured with the highest standards and carry manufacturer's defects warranty that cannot be matched by many. AEA is one of the only brands that prides itself on manufacturing generators with Africa in mind.
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4">Mission</h3>
                <p className="mb-4">
                  To be a leader in the provision of high-quality equipment, parts, and solutions for industries, construction sector, and power sector.
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4">Vision</h3>
                <p className="mb-4">
                  To become an innovative, responsive, and dominant player in the sectors or markets where we operate or have a presence.
                </p>
                <h3 className="text-2xl font-bold mt-8 mb-4">Core Values</h3>
                <ul className="list-disc pl-5 mb-6">
                  <li className="mb-2"><strong>Quality:</strong> We will provide high quality, innovative, and outstanding products and services that will guarantee satisfaction to our customers.</li>
                  <li className="mb-2"><strong>Integrity:</strong> We will be ethical and act with respect, integrity, fairness, and care in our dealings with all our partners.</li>
                  <li className="mb-2"><strong>Accountability:</strong> We shall act with responsibility and accountability in all we do, and accept resulting rewards and consequences.</li>
                  <li className="mb-2"><strong>Passion/Excellence:</strong> We shall take pride in what we do and continuously pursue maximum productivity in a safe environment. We shall be consistent in our aim to always meet or exceed expectations.</li>
                  <li className="mb-2"><strong>Valuing Employees:</strong> We shall constantly endeavor to improve employee welfare.</li>
                  <li className="mb-2"><strong>Profitability:</strong> We shall seek revenue growth and cost containment to earn profits for the shareholders.</li>
                </ul>
                <button 
                  onClick={toggleAboutSection} 
                  className="inline-block bg-avery-red hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition-colors mt-6"
                >
                  SHOW LESS
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-grey text-black py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productFeatures.map((feature, index) => (
              <div key={index} className="bg-[#e93f3f] p-8 rounded-lg relative group hover:shadow-xl transition-all duration-300 border border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-avery-red to-avery-red/70 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <img src={feature.icon} alt={feature.title} className="w-8 h-8 object-contain" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-left">{feature.title}</h3>
                <p className="text-black-400 text-left">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-700">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-white">Featured Products</h2>
          <div className ="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => <ProductCard key={product.id} {...product} />)}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-16 bg-[#e93f3f]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-white text-center">Sectors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sectors.map((sector, index) => <SectorCard key={index} {...sector} />)}
            <SectorCard 
              title="Laboratory" 
              description="Precision equipment for research and quality control applications."
              imagePath="/images/Prod2.jpeg" 
              link="/sectors/laboratory" 
            />
            <SectorCard 
              title="Agriculture" 
              description="Weighing solutions tailored for agricultural produce and livestock."
              imagePath="/images/Prod8.jpg" 
              link="/sectors/agriculture" 
            />
          </div>
        </div>
      </section>

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
    </>
  );
};

export default Home;
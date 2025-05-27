import React, { useState } from "react";
import Footer from "../components/Footer";

// Example categories based on the products array
const categories = [
  "All",
  "Display Units",
  "Printers",
  "Weighbridges",
  "Bench Scales",
  "Platform Scales"
];

const products = [
  // Display Units
  {
    id: 1,
    name: "Remote XR Display",
    description: "Large bright remote displays allow clear, comfortable viewing of scale information at considerable distances.",
    imagePath: "/images/remote_xr_display.jpeg",
    category: "Display Units",
    price: "Ksh. 45,000"
  },
  {
    id: 2,
    name: "ZM Kiosk Vehicle Scale Control",
    description: "Keep your truck scale operating safely, efficiently, and smoothly without a dedicated operator.",
    imagePath: "/images/zm_kiosk.jpeg",
    category: "Display Units",
    price: "Ksh. 150,000"
  },
  {
    id: 3,
    name: "ZM201 Series Indicator",
    description: "Ideal for applications that require a basic weighing indicator for performing Zero, Tare, and Print functions.",
    imagePath: "/images/zm201_indicator.jpeg",
    category: "Display Units",
    price: "Ksh. 70,000"
  },
  {
    id: 4,
    name: "ZM301 Weight Indicator",
    description: "An industry-leading, everyday indicator available in aluminum or IP69K stainless steel with a choice of display technologies.",
    imagePath: "/images/zm301_indicator.jpeg",
    category: "Display Units",
    price: "Ksh. 85,000"
  },
  {
    id: 5,
    name: "ZM303 Advanced Multi-Function Indicator",
    description: "High-performance indicator suitable for industrial applications requiring advanced weighing routines.",
    imagePath: "/images/zm303_indicator.jpeg",
    category: "Display Units",
    price: "Ksh. 95,000"
  },
  {
    id: 6,
    name: "ZM305 Multi-Function Indicator",
    description: "Ideal for floor scales, batching, vessels, and in-motion conveyors, offering versatile functionality.",
    imagePath: "/images/zm305_indicator.jpeg",
    category: "Display Units",
    price: "Ksh. 100,000"
  },
  {
    id: 7,
    name: "ZM400 Series Indicator",
    description: "Designed for industrial applications that require advanced weighing routines and high connectivity.",
    imagePath: "/images/zm400_series.jpeg",
    category: "Display Units",
    price: "Ksh. 120,000"
  },
  {
    id: 8,
    name: "ZM505 Weight Indicator",
    description: "A flexible and highly connective indicator with multiple built-in communication ports.",
    imagePath: "/images/zm505_indicator.jpeg",
    category: "Display Units",
    price: "Ksh. 110,000"
  },
  {
    id: 9,
    name: "ZM605 Weight Indicator",
    description: "A flexible and programmable weight indicator offering an ideal solution for custom requirements.",
    imagePath: "/images/zm605_indicator.jpeg",
    category: "Display Units",
    price: "Ksh. 130,000"
  },
  {
    id: 10,
    name: "ZM615 Weight Indicator",
    description: "High-performance weight indicator with a large graphical display, suitable for custom applications.",
    imagePath: "/images/zm615_indicator.jpeg",
    category: "Display Units",
    price: "Ksh. 140,000"
  },

  // Printers
  {
    id: 11,
    name: "Zebra ZT230 Industrial Printer",
    description: "Durable industrial printer suitable for high-volume label printing in industrial environments.",
    imagePath: "/images/zebra_zt230.jpeg",
    category: "Printers",
    price: "Ksh. 85,000"
  },
  {
    id: 12,
    name: "Epson TM-T88VI Thermal Receipt Printer",
    description: "High-speed thermal receipt printer ideal for retail and hospitality environments.",
    imagePath: "/images/epson_tm_t88vi.jpeg",
    category: "Printers",
    price: "Ksh. 40,000"
  },
  {
    id: 13,
    name: "Brother QL-820NWB Label Printer",
    description: "Versatile label printer with wireless connectivity, suitable for various labeling needs.",
    imagePath: "/images/brother_ql_820nwb.jpeg",
    category: "Printers",
    price: "Ksh. 30,000"
  },
  {
    id: 14,
    name: "TSC TE210 Desktop Barcode Printer",
    description: "Compact desktop barcode printer offering reliable performance for small to medium volumes.",
    imagePath: "/images/tsc_te210.jpeg",
    category: "Printers",
    price: "Ksh. 35,000"
  },
  {
    id: 15,
    name: "SATO CL4NX Industrial Printer",
    description: "Robust industrial printer designed for high-volume printing with advanced features.",
    imagePath: "/images/sato_cl4nx.jpeg",
    category: "Printers",
    price: "Ksh. 100,000"
  },
  {
    id: 16,
    name: "Honeywell PC42t Thermal Transfer Printer",
    description: "Affordable thermal transfer printer suitable for light-duty labeling applications.",
    imagePath: "/images/honeywell_pc42t.jpeg",
    category: "Printers",
    price: "Ksh. 25,000"
  },
  {
    id: 17,
    name: "Citizen CL-S621 Barcode Printer",
    description: "Reliable barcode printer with fast print speeds and easy media loading.",
    imagePath: "/images/citizen_cls621.jpeg",
    category: "Printers",
    price: "Ksh. 45,000"
  },
  {
    id: 18,
    name: "Datamax-O'Neil E-Class Mark III Printer",
    description: "Compact desktop printer offering industrial-class performance for a variety of applications.",
    imagePath: "/images/datamax_e_class_mark_iii.jpeg",
    category: "Printers",
    price: "Ksh. 50,000"
  },
  {
    id: 19,
    name: "Intermec PC43t Desktop Printer",
    description: "User-friendly desktop printer designed for quick setup and efficient printing.",
    imagePath: "/images/intermec_pc43t.jpeg",
    category: "Printers",
    price: "Ksh. 38,000"
  },
  {
    id: 20,
    name: "Godex G500 Barcode Printer",
    description: "Cost-effective barcode printer offering high-resolution printing for various needs.",
    imagePath: "/images/godex_g500.jpeg",
    category: "Printers",
    price: "Ksh. 28,000"
  },

  // Weighbridges
  {
    id: 21,
    name: "BMC Concrete Deck Weighbridge",
    description: "Trade-approved weighing up to 100 tonnes with improved surface traction and corrosion protection.",
    imagePath: "/images/bmc_concrete_deck.jpeg",
    category: "Weighbridges",
    price: "Ksh. 5,000,000"
  },
  {
    id: 22,
    name: "BridgeMont Steel Deck Weighbridge",
    description: "Versatile, dependable, long-lasting scales with unbeatable structural integrity.",
    imagePath: "/images/bridgemont_steel_deck.jpeg",
    category: "Weighbridges",
    price: "Ksh. 4,500,000"
  },
  {
    id: 23,
    name: "Axle Weighing System",
    description: "Ideal for both static and weigh-in-motion applications, weighing up to 40,000 kg per axle.",
    imagePath: "/images/axle_weighing_system.jpeg",
    category: "Weighbridges",
    price: "Ksh. 3,800,000"
  },
  {
    id: 24,
    name: "J-Series High-sided Weighbridge",
    description: "Heavy-duty weighbridge designed for harsh industrial environments.",
    imagePath: "/images/j_series_weighbridge.jpeg",
    category: "Weighbridges",
    price: "Ksh. 5,500,000"
  },
  {
    id: 25,
    name: "LS630 Portable Axle Weighers",
    description: "Portable in-motion axle weighers suitable for various vehicle types.",
    imagePath: "/images/ls630_portable_axle.jpeg",
    category: "Weighbridges",
    price: "Ksh. 3,200,000"
  },
  {
    id: 26,
    name: "CHEKLODE PT300 Axle Weigh Pads",
    description: "Self-contained portable axle weighing system with wireless connectivity.",
    imagePath: "/images/cheklode_pt300.jpeg",
    category: "Weighbridges",
    price: "Ksh. 2,800,000"
  },
  {
    id: 27,
    name: "Fixed Axle Weighing System",
    description: "High-accuracy, in-motion axle weighing system for vehicles up to 40,000 kg per axle.",
    imagePath: "/images/fixed_axle_weighing.jpeg",
    category: "Weighbridges",
    price: "Ksh. 4,000,000"
  },
  {
    id: 28,
    name: "Unmanned Weighbridge Terminal",
    description: "Allows drivers to complete weighing transactions 24/7 without leaving their vehicle.",
    imagePath: "/images/unmanned_weighbridge_terminal.jpeg",
    category: "Weighbridges",
    price: "Ksh. 1,500,000"
  },
  {
    id: 29,
    name: "Weighman 8 Weighbridge Software",
    description: "Total management reporting and control of your weighbridge operation across multiple sites.",
    imagePath: "/images/weighman_8_software.jpeg",
    category: "Weighbridges",
    price: "Ksh. 600,000"
  },
  {
    id: 30,
    name: "Steelbridge XT Concrete Deck Truck Scale",
    description: "Designed for high traffic and heavy loads, ensuring durability and accuracy.",
    imagePath: "/images/steelbridge_xt_concrete.jpeg",
    category: "Weighbridges",
    price: "Ksh. 5,200,000",
  }
];
// Themed Product Card
const ProductCard = ({ product }) => (
  <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
    <a href="#">
      <img className="p-8 rounded-t-lg" src={product.imagePath} alt={product.name} />
    </a>
    <div className="px-5 pb-5 flex flex-col flex-1">
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900">{product.name}</h5>
      </a>
      <p className="text-gray-500 text-sm mt-2 mb-4">{product.description}</p>
      <div className="flex items-center mt-2.5 mb-5">
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-gray-200" aria-hidden="true" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5 .051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
          </svg>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-3xl font-bold text-gray-900">{product.price}</p>
        </div>
        <br />
      </div>
        <a href="#" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add to cart</a>
    </div>
  </div>
);

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ? true : product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Products</h1>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                No products found.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
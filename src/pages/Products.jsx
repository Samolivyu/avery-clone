import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Search, Sliders } from "lucide-react";
import { Collapsible, CollapsibleContent } from "../components/ui/collapsible";
import { Checkbox } from "../components/ui/checkbox";

// ProductCard component
const ProductCard = ({ id, name, description, imagePath, category }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
    <div className="h-48 overflow-hidden">
      <img
        src={imagePath}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full">{category}</span>
      <h3 className="text-lg font-semibold mt-2 mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-4 flex-grow">{description}</p>
      <div className="flex justify-between items-center mt-auto">
        <Button variant="outline" className="text-sm">
          View Details
        </Button>
        <Button className="bg-primary hover:bg-primary-dark text-white">
          Get a Quote
        </Button>
      </div>
    </div>
  </div>
);

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const productCategories = [
    "Weighbridges",
    "Display Units",
    "Printers",
    "Accessories",
    "Platform Scales",
    "Bench Scales",
  ];

  const products = [
    {
      id: 1,
      name: "Remote XR Display",
      description: "Large bright remote displays allow clear comfortable viewing of scale information at considerable distances",
      imagePath: "/images/Prod5.jpeg",
      category: "Display Units"
    },
    {
      id: 2,
      name: "Industrial Printer",
      description: "Wide range of printers to complement your weighing system and meet the precise needs of your operation",
      imagePath: "/images/Prod5.jpeg",
      category: "Printers"
    },
    {
      id: 3,
      name: "Unmanned Weighbridge Terminal",
      description: "Allow drivers to complete weighing transactions 24/7 without leaving their vehicle",
      imagePath: "/images/Prod5.jpeg",
      category: "Weighbridges"
    },
    {
      id: 4,
      name: "Valor 7000 Compact Scale",
      description: "High precision compact bench scale with advanced features for industrial environments",
      imagePath: "/images/Prod5.jpeg",
      category: "Bench Scales"
    },
    {
      id: 5,
      name: "Explorer Analytical Balance",
      description: "Superior analytical performance with intuitive operation for laboratory applications",
      imagePath: "/images/Prod5.jpeg",
      category: "Bench Scales"
    },
    {
      id: 6,
      name: "Defender 3000 Platform Scale",
      description: "Durable industrial platform scale for demanding environments with high accuracy",
      imagePath: "/images/Prod5.jpeg",
      category: "Platform Scales"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative bg-primary text-white">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Products</h1>
            <p className="text-xl max-w-2xl">
              We offer a range of weighing accessories including printers, driver operated consoles and other peripherals
            </p>
          </div>
        </div>

        {/* Products Overview */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="bg-primary text-white p-4 mb-8">
              <h2 className="text-xl font-semibold">Overview</h2>
            </div>

            <div className="mb-10">
              <p className="text-gray-800 mb-4">
                We offer a range of weighing accessories including printers, driver operated consoles and other peripherals.
              </p>
              <p className="text-gray-700 mb-6">
                Take a look at the range of accessories below which includes remote LED displays, ticket printers, pre-fabricated foundations for your new truck scale, and our popular ZM kiosk range allowing you to keep your truck scale operating 24/7 without having a dedicated operator.
              </p>
              <Button className="bg-primary hover:bg-primary-dark text-white">
                Get a Price
              </Button>
            </div>

            {/* Filter and Search */}
            <div className="mb-8 flex flex-col md:flex-row items-start gap-4">
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="w-full md:w-2/3 md:flex justify-end">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full md:w-auto mb-4 md:mb-0"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                >
                  <Sliders className="h-4 w-4" /> Filters
                </Button>
              </div>
            </div>

            {/* Mobile/Tablet Filters */}
            <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen} className="md:hidden mb-6">
              <CollapsibleContent>
                <div className="border border-gray-200 rounded-md p-4 bg-white">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {productCategories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategory === category}
                          onCheckedChange={() => {
                            if (selectedCategory === category) {
                              setSelectedCategory(null);
                            } else {
                              setSelectedCategory(category);
                            }
                          }}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Desktop Filters */}
              <div className="hidden md:block w-1/4">
                <div className="bg-white shadow-md rounded-md overflow-hidden">
                  <div className="bg-primary text-white p-4">
                    <h3 className="font-semibold">Industries</h3>
                  </div>
                  <div className="p-4 border-b">
                    <ul className="space-y-2">
                      {productCategories.map(category => (
                        <li key={category}>
                          <button
                            className={`text-left w-full py-1 px-2 rounded-md transition ${selectedCategory === category ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                            onClick={() => {
                              if (selectedCategory === category) {
                                setSelectedCategory(null);
                              } else {
                                setSelectedCategory(category);
                              }
                            }}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-primary text-white p-4">
                    <h3 className="font-semibold">Applications</h3>
                  </div>
                  <div className="p-4 border-b">
                    <ul className="space-y-2 text-gray-600">
                      <li>Industrial</li>
                      <li>Commercial</li>
                      <li>Laboratory</li>
                      <li>Food Service</li>
                    </ul>
                  </div>

                  <div className="bg-primary text-white p-4">
                    <h3 className="font-semibold">Filters</h3>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium mb-2">Application</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>Vehicle Weighing</li>
                      <li>Pallet Weighing</li>
                      <li>Parts Counting</li>
                      <li>Quality Control</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="md:w-3/4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      description={product.description}
                      imagePath={product.imagePath}
                      category={product.category}
                    />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-600">No products match your search criteria.</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory(null);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
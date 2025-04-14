
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import SectorsSection from '../components/SectorsSection';
import ProductsSection from '../components/ProductsSection';
import ServicesSection from '../components/ServicesSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ProductsSection />
        <SectorsSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

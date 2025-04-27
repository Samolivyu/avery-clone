import React from 'react';
import { Header, Footer, HeroSection } from '../components/Home';
import ServicesSection from '../components/ServicesSection';
import Products from './Products';
import Services from './Services';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
      </main>
      
    </div>
  );
};

export default Index;
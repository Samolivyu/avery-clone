import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const HeroSection = () => (
  <section className="bg-white py-16 lg:py-24">
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8 md:items-center">
        <div>
          <h1 className="block text-3xl font-bold text-gray-900 sm:text-4xl lg:text-6xl lg:leading-tight">
            Professional <span className="text-avery-red">Engineering Services</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Hand-picked professionals and expertly crafted components, designed for any kind of entrepreneur. AEA provides key market solutions in Weighing, Power, Industrial, Infrastructure, Agriculture, Software, Construction and After Sale Support.
          </p>
          <div className="mt-7 grid gap-3 w-full sm:inline-flex">
            <Link to="/products" className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-avery-red border border-transparent text-white bg-red-700 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
              Get Started
              <ArrowRight size={16} />
            </Link>
            <a href="#contact" className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-gray-100 border border-gray-200 text-black hover:bg-gray-200 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none">
              Contact Sales Team
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
)
export default HeroSection
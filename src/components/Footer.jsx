import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="p-4 bg-white sm:p-6 border-t border-gray-200 mt-auto">
    <div className="mx-auto max-w-screen-xl">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <Link to="/" className="flex items-center">
            <img src="/images/aea-logo.webp" className="mr-3 h-8" alt="FlowBite Logo" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6">
          {/* Nairobi */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Nairobi</h2>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>(Central / Eastern region)</li>
              <li>Factory Street, Industrial area</li>
              <li>P. O Box 30417 - 00100, Nairobi</li>
              <li>Tel: +254 558 506 / 7, 559 004, 300 1675</li>
              <li>Cell: +254 (0) 724 259 815 / (0) 734 508 506</li>
              <li>Email: <a href="mailto:avery@averyafrica.com" className="hover:underline">avery@averyafrica.com</a></li>
            </ul>
          </div>
          {/* Mombasa */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Mombasa</h2>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>(Coastal region)</li>
              <li>Kenyatta avenue</li>
              <li>P. O Box 83368, Mombasa</li>
              <li>Tel/Fax: +254 (041) 249 0145</li>
              <li>Cell: +254 20 268 9517</li>
            </ul>
          </div>
          {/* Kisumu */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Kisumu</h2>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>(Western region)</li>
              <li>Gor Mahia street</li>
              <li>P. O Box 803 - 40100 Kisumu</li>
              <li>Tel/Fax: 057 202 4960</li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">© {new Date().getFullYear()} <Link to="/" className="hover:underline">AEA Limited</Link>. All Rights Reserved.</span>
      </div>
    </div>
  </footer>
)
export default Footer
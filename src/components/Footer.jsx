import React from "react";

const Footer = () => (
  <footer className="bg-white">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div className="flex flex-row justify-between items-start flex-wrap gap-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="https://AEA.com/" className="flex items-center">
            <img src="/images/aea-logo.webp" className="h-8 me-3" alt="AEA Logo" />
          </a>
        </div>
        {/* Contact Info - Horizontal Columns */}
        <div className="flex flex-row gap-8 flex-wrap">
          {/* Nairobi */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Nairobi</h2>
            <div className="text-gray-500 font-medium text-sm space-y-1">
              <div>(Central / Eastern region)</div>
              <div>Factory Street, Industrial area</div>
              <div>P. O Box 30417 - 00100, Nairobi</div>
              <div>Tel: +254 558 506 / 7, 559 004, 300 1675</div>
              <div>Cell: +254 (0) 724 259 815 / (0) 734 508 506</div>
              <div>
                Email: <a href="mailto:avery@averyafrica.com" className="hover:underline">avery@averyafrica.com</a>
              </div>
            </div>
          </div>
          {/* Mombasa */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Mombasa</h2>
            <div className="text-gray-500 font-medium text-sm space-y-1">
              <div>(Coastal region)</div>
              <div>Kenyatta avenue</div>
              <div>P. O Box 83368, Mombasa</div>
              <div>Tel/Fax: +254 (041) 249 0145</div>
              <div>Cell: +254 20 268 9517</div>
              
            </div>
          </div>
          {/* Kisumu */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Kisumu</h2>
            <div className="text-gray-500 font-medium text-sm space-y-1">
              <div>(Western region)</div>
              <div>Gor Mahia street</div>
              <div>P. O Box 803 - 40100 Kisumu</div>
              <div>Tel/Fax: 057 202 4960</div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
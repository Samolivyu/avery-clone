import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const AboutSection = () => {
  const [showFull, setShowFull] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState('mission') // Default open

  const toggle = (id) => setActiveAccordion(activeAccordion === id ? null : id)

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-screen-lg mx-auto px-4 lg:px-8">
        {!showFull ? (
          <div className="max-w-screen-lg text-gray-500 sm:text-lg">
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900">About AEA Limited</h2>
            <p className="mb-4 font-light">
              AEA Limited is a Pan African company that was incorporated in 1970. The Company was initially established primarily with a focus on the supply, manufacture and maintain Industrial and domestic weighing scales.
            </p>
            <p className="mb-4 font-medium">
              AEA has consistently remained as the largest supplier of weighing equipment in East Africa to date.
            </p>
            <button onClick={() => setShowFull(true)} className="inline-flex items-center font-medium text-avery-red hover:text-red-800">
              Learn more
              <ArrowRight size={20} className="ml-1" />
            </button>
          </div>
        ) : (
          <div className="max-w-screen-lg">
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900">About AEA Limited</h2>
            <p className="mb-8 text-gray-500 sm:text-lg">
              AEA Limited is a Pan African company that was incorporated in 1970. Over the years, the company has continuously diversified its activities and product offerings due to the strong aftermarket support with a key focus on power and infrastructure.
            </p>

            {/* Accordion Group */}
            <div className="hs-accordion-group space-y-2">
              {/* Mission */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="hs-accordion-toggle w-full px-4 py-3 inline-flex items-center gap-x-3 font-semibold text-gray-900 hover:text-gray-600 focus:outline-none"
                  onClick={() => toggle('mission')}
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
                  onClick={() => toggle('vision')}
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
                  onClick={() => toggle('values')}
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
            <button onClick={() => setShowFull(false)} className="mt-6 text-avery-red hover:text-red-800 font-medium">Show Less</button>
          </div>
        )}
      </div>
    </section>
  )
}
export default AboutSection
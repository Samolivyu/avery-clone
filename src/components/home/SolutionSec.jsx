import React from 'react'

const solutions = [
  { title: "Precision Weighing", desc: "Our weighing equipment provides consistent and accurate measurements for all your business needs.", img: "/images/Prod4.jpeg" },
  { title: "Robust Design", desc: "Built to withstand demanding industrial environments while maintaining precision and reliability.", img: "/images/Prod5.jpeg" },
  { title: "Smart Integration", desc: "Seamlessly integrate with your existing systems for streamlined operations and data management.", img: "/images/Prod7.jpeg" }
]

const SolutionsSection = () => (
  <section className="bg-gray-50 py-20">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Solutions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {solutions.map((sol, idx) => (
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
)
export default SolutionsSection
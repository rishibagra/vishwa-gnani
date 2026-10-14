import React from 'react';

export default function PillarsSection() {
  const pillars = [
    {
      title: "Vision",
      tag: "OUR VISION",
      // Clean, professional SVG icon for Vision (Eye)
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      description:
        "To build an inclusive, educated, empowered and compassionate society where every individual has the opportunity to live with dignity, equality and hope.",
    },
    {
      title: "Mission",
      tag: "OUR MISSION",
      // Clean SVG icon for Mission (Target)
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
      description:
        "Viswagnani Seva Trust is committed to serving society through education, community development, social welfare, skill development and support for economically and socially disadvantaged communities. We strive to create sustainable opportunities and encourage individuals to become responsible and contributing members of society.",
    },
    {
      title: "Objectives",
      tag: "CORE OBJECTIVE",
      // Clean SVG icon for Objectives (Check/List)
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description:
        "To promote cultural, social and educational activities for community development.",
    },
    {
      title: "Community Empowerment",
      tag: "PILLAR",
      // Clean SVG icon for Community (Users)
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description:
        "Fostering local engagement, youth development, and socio-economic support across rural and urban communities.",
    },
    {
      title: "Sustainable Impact",
      tag: "PILLAR",
      // Clean SVG icon for Impact (Growth/Leaf)
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      description:
        "Creating structured, transparent, and long-term programs designed to enable self-reliance and lasting growth.",
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
            Our Foundation
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
            Our Pillars & Objectives
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Governed by structured trust statutes for transparent community impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                index === 1 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
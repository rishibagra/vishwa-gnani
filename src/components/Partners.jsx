export default function Partners() {
  const partners = [
    { name: 'Schmidt Futures' },
    { name: 'Sulzer' },
    { name: 'Sarva Mangal Family Trust' },
    { name: 'Jaideep Khanna' },
    { name: 'Hemant Goradia' },
  ];

  // Duplicate the list so the infinite scroll loops without gaps
  const tickerItems = [...partners, ...partners];

  return (
    <section className="bg-white py-12 border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900">Our Partners</h2>
      </div>

      {/* Marquee Track Container with Gradient Edge Fades */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Moving Slider Track */}
        <div className="flex space-x-6 animate-marquee w-max">
          {tickerItems.map((partner, index) => (
            <div
              key={index}
              className="px-6 py-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm whitespace-nowrap text-gray-800 font-bold text-base tracking-wide flex-shrink-0 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
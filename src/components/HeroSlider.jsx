import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    badge: "कमाल की तैयारी 2026",
    title: "Bringing Hope To Children In Need  TESTING IMAGE UPDATE",
    description: "Vishwa Gnani's initiative ensuring every child entering Grade 1 gets a warm environment to learn, grow, and express themselves.",
    ctaText: "Explore Our Programs",
    ctaLink: "/programs",
    secondaryCtaText: "Get In Touch",
    secondaryCtaLink: "/contact",
    bgImage: "https://res.cloudinary.com/df93reijv/image/upload/v1791807173/copy_of_whatsapp_image_2026-10-12_at_51333_pm_suwqfa_silder.jpg"
  },
  {
    id: 2,
    badge: "Empowering Youth",
    title: "Vocational Skill Development",
    description: "Providing employment-oriented technical training, digital literacy, and entrepreneurship opportunities for youth.",
    ctaText: "Explore Courses",
    ctaLink: "/program/vocational-training",
    secondaryCtaText: "Get In Touch",
    secondaryCtaLink: "/contact",
    bgImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 3,
    badge: "Early Learning",
    title: "Childhood Care & Education",
    description: "Supporting community pre-school centers and Anganwadis to build strong foundational literacy and cognitive skills.",
    ctaText: "Learn More",
    ctaLink: "/program/early-childhood",
    secondaryCtaText: "Get In Touch",
    secondaryCtaLink: "/contact",
    bgImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[520px] md:h-[600px] overflow-hidden bg-[#2C3238]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.bgImage}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />

          {/* Strong Dual Gradient & Backdrop Blur Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50 backdrop-blur-[2px] flex items-center">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-white">
              
              {/* Badge Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/30 backdrop-blur-md mb-6 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#E57E51] animate-pulse" />
                <span className="text-xs md:text-sm font-bold tracking-wide uppercase text-white">
                  {slide.badge}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 max-w-2xl leading-tight uppercase tracking-tight drop-shadow-md">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-gray-100 text-base md:text-xl max-w-xl mb-8 leading-relaxed font-medium drop-shadow">
                {slide.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={slide.ctaLink}
                  className="bg-[#E57E51] hover:bg-[#EE9665] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 text-base md:text-lg"
                >
                  {slide.ctaText} →
                </Link>

                <Link
                  to={slide.secondaryCtaLink}
                  className="bg-white/10 hover:bg-white/20 border-2 border-white/80 text-white font-bold py-3 px-8 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg hover:-translate-y-0.5 text-base md:text-lg"
                >
                  {slide.secondaryCtaText}
                </Link>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* Auto-scroll Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === current
                ? 'bg-[#E57E51] w-8'
                : 'bg-white/50 hover:bg-white w-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
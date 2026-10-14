import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Background images array for Hero Slider
const heroImages = [
  "https://res.cloudinary.com/df93reijv/image/upload/v1791809463/WhatsApp_Image_2026-10-12_at_5.13.33_PM_olrdka.jpg",
  "https://res.cloudinary.com/df93reijv/image/upload/v1791809625/WhatsApp_Image_2026-10-12_at_5.13.05_PM_msci29.jpg",
  "https://res.cloudinary.com/df93reijv/image/upload/v1791960340/WhatsApp_Image_2026-10-14_at_12.08.08_PM_lv8let.jpg",
  "https://res.cloudinary.com/df93reijv/image/upload/v1791809656/WhatsApp_Image_2026-10-12_at_5.13.30_PM_w7pgae.jpg",
  "https://res.cloudinary.com/df93reijv/image/upload/v1791960341/WhatsApp_Image_2026-10-14_at_12.08.07_PM_2_wvvzrl.jpg",
  "https://res.cloudinary.com/df93reijv/image/upload/v1791960819/WhatsApp_Image_2026-10-14_at_12.08.07_PM_fdp9bv.jpg",
  "https://res.cloudinary.com/df93reijv/image/upload/v1791960340/WhatsApp_Image_2026-10-14_at_12.08.07_PM_1_o6wrxo.jpg",
];

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-change background image every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-[#FBF6F0] text-[#2C3238] font-sans min-h-screen relative selection:bg-[#EE9665]/20 selection:text-[#E57E51] overflow-x-hidden">
      
      {/* FLOATING DIRECT DONATE CTA BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          to="/donate"
          className="group flex items-center gap-3 bg-[#EE9665] hover:bg-[#E57E51] text-white font-bold text-sm tracking-wide px-6 py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 border border-white/20 cursor-pointer"
          aria-label="Make a Donation"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <span>Support Our Cause</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* 1. HERO SECTION WITH AUTO BACKGROUND IMAGE CHANGER */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center bg-[#2C3238] text-white overflow-hidden py-16">
        {heroImages.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            alt={`Hero Background ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-25' : 'opacity-0'
            }`}
          />
        ))}

        <div className="absolute top-12 left-10 w-48 h-48 rounded-full bg-[#95CBE7]/20 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-16 right-12 w-64 h-64 rounded-full bg-[#EE9665]/20 blur-3xl pointer-events-none animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight text-white drop-shadow-md">
            BRINGING <span className="relative inline-block text-[#EE9665] border-b-4 border-[#C5A55D] pb-1">HOPE TO</span> CHILDREN IN NEED
          </h1>
          
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
            Every child deserves a warm environment to learn, grow, and express themselves. Discover how we empower communities together.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/about"
              className="inline-block bg-[#E57E51] hover:bg-[#EE9665] text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Know More About Us
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase px-8 py-3.5 rounded-full border border-white/30 backdrop-blur-md hover:border-white/60 transition-all duration-200"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THREE-COLORED IMPACT, ROADMAP & VOLUNTEER BANNER */}
      <section className="max-w-7xl mx-auto px-4 -mt-14 sm:-mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 rounded-2xl overflow-hidden shadow-xl border border-white/40">
          
          {/* Left Card: Light Teal Blue */}
          <div className="bg-[#6BB5C8] p-6 sm:p-8 text-white flex flex-col justify-center space-y-3 hover:brightness-105 transition-all">
            <span className="text-xs font-extrabold uppercase tracking-widest text-white/80">
              Our Commitment
            </span>
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight leading-snug">
              Empowering Student Academic & Personal Growth
            </h2>
            <p className="text-xs text-white/90 leading-relaxed font-medium">
              We provide structured academic coaching, entrance test preparation, and holistic curriculum activities to ensure every student reaches their full potential.
            </p>
          </div>

          {/* Middle Card: Vision Roadmap & Annual Goals */}
          <div className="bg-[#BDC3E8] p-6 sm:p-8 text-[#2C3238] flex flex-col justify-between space-y-4 hover:brightness-105 transition-all border-y md:border-y-0 md:border-x border-white/30">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2C3238]/70">
                Vision Roadmap
              </span>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#2C3238]">
                Our Annual Goals
              </h2>
            </div>

            <div className="space-y-2.5 text-xs leading-relaxed font-medium text-[#2C3238]/95">
              <div className="bg-white/40 p-3 rounded-xl border border-white/40">
                <strong className="font-extrabold block text-[#2C3238] mb-0.5">
                  Special Coaching Classes:
                </strong>
                Tailored entrance exam training for <span className="font-bold">Navodaya, Morarji Desai, Sainik, Military,</span> and other prestigious schools.
                <strong className="font-extrabold block text-[#2C3238] mt-2 mb-0.5">
                  Curriculum & Skill Activities:
                </strong>
                Comprehensive support for school curriculum, foundational learning, and student engagement.
              </div>
            </div>
          </div>

          {/* Right Card: Soft Apricot / Peach Orange */}
          <div id="volunteer" className="bg-[#EE9665] p-6 sm:p-8 text-white flex flex-col justify-between space-y-5 hover:brightness-105 transition-all">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-white/80">
                Get Involved
              </span>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight">
                Become A Volunteer
              </h2>
              <p className="text-xs leading-relaxed text-white/90 font-medium">
                We believe every child deserves a chance to thrive. Sign up to volunteer with us today and help us bring joy to young lives.
              </p>
            </div>
            <div>
              <Link
                to="/contact"
                className="inline-block bg-[#FBF6F0] hover:bg-white text-[#2C3238] text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                Join Team
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. OUR VISION SECTION */}
      <section className="py-20 px-4 sm:px-8 bg-[#FBF6F0] flex justify-center text-center">
        <div className="max-w-4xl w-full">
          <div className="inline-flex items-center gap-2 bg-[#E57E51]/10 px-4 py-1.5 rounded-full text-[#E57E51] font-bold text-xs uppercase tracking-widest border border-[#E57E51]/20 mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E57E51] animate-pulse" />
            <span>Our Guiding Light</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-8 bg-gradient-to-r from-[#E57E51] via-[#EE9665] to-[#6BB5C8] bg-clip-text text-transparent">
            Our Vision
          </h2>
          
          <p className="text-lg sm:text-2xl font-sans font-normal text-[#2C3238]/90 leading-relaxed max-w-3xl mx-auto">
            Vishwagnani Seva Trust is dedicated to building an inclusive society where every{' '}
            <span className="font-semibold text-[#2C3238] underline decoration-[#E57E51] decoration-2 underline-offset-8">
              child, student, and family
            </span>{' '}
            gains access to{' '}
            <span className="font-serif font-bold italic bg-gradient-to-r from-[#E57E51] to-[#EE9665] bg-clip-text text-transparent">
              quality education, specialized guidance,
            </span>{' '}
            and essential life resources needed to transform aspirations into reality.
          </p>
        </div>
      </section>

      {/* 4. HELP US SUPPORT CHARITY CAMPAIGNS */}
      <section className="pb-20 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#E57E51]/10 px-3.5 py-1 rounded-full text-[#E57E51] font-bold text-xs uppercase tracking-widest border border-[#E57E51]/20">
              <span className="w-2 h-2 rounded-full bg-[#E57E51]" />
              First Day & Community Growth
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#2C3238] tracking-tight leading-tight">
              Help Us Support Essential Community Programs
            </h2>
            
            <p className="text-xs sm:text-sm text-[#2C3238]/80 leading-relaxed font-medium">
              We provide structured educational resources, nutritional support, and immediate community care to children across rural and urban communities.
            </p>

            <ul className="space-y-3.5 pt-2">
              {[
                "Invest directly in your immediate neighborhood",
                "Support children and families facing extreme need",
                "Join a global community driving positive local change",
                "Share your love and passion for early care & development"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-bold text-[#2C3238]">
                  <span className="w-6 h-6 rounded-full bg-[#BDC3E8] text-[#2C3238] flex items-center justify-center text-xs font-black flex-shrink-0 shadow-xs">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center">
            <div className="relative group rounded-3xl overflow-hidden max-w-md w-full border-4 border-[#C5A55D] shadow-2xl">
              <img
                src="https://res.cloudinary.com/df93reijv/image/upload/v1791903706/photo-collage.png_cvrr6s.png"
                alt="Child learning at chalkboard"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C3238]/50 via-transparent to-transparent" />
            </div>
          </div>

        </div>
      </section>

      {/* 5. UPCOMING SCHOOL ACTIVITIES BANNER */}
      <section className="py-20 bg-gradient-to-r from-[#6BB5C8] to-[#59A3B6] text-white shadow-inner">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
            Upcoming Activities
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Your Dedicated Engagement Can Transform Futures Today
          </h2>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto leading-relaxed font-medium">
            Partner with Vishwa Gnani Trust in organizing interactive workshops, sports programs, and learning sessions for our kids.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-block bg-[#2C3238] hover:bg-[#1f2429] text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
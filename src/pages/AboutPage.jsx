import React from 'react';
import PillarsSection from '../components/PillarsSection';

const galleryImages = [
  {
    id: 1,
    url: "https://res.cloudinary.com/df93reijv/image/upload/v1791899325/1_x02n3r.jpg",
    title: "Community Learning Session"
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/df93reijv/image/upload/v1791900206/community_learning_session_1_jkbayp.jpg",
    title: "Student Support Drive"
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/df93reijv/image/upload/v1791900330/childhood_care_zwtwba.jpg",
    title: "Childhood Care"
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/df93reijv/image/upload/v1791900434/workshops_and_activities_bd8rcl.jpg",
    title: "Workshops & Activities"
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/df93reijv/image/upload/v1791900546/volunteering_and_community_meetup_erlof0.jpg",
    title: "Volunteering & Community Meetup"
  }
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Pratham-Styled About Us Hero Section */}
        <section>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-10">
            About Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left Column: Main Photo Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 group bg-gray-900">
              <img
                src="https://res.cloudinary.com/df93reijv/image/upload/v1791899325/1_x02n3r.jpg"
                alt="Vishwa Gnani Learning Program"
                className="w-full h-[320px] md:h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Right Column: About Content */}
            <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg">
              <p>
                <strong className="text-gray-900">Vishwa Gnani Trust</strong> is a grassroots organization dedicated to improving education quality and vocational opportunities across India. Inspired by pioneering work in community learning, our mission centers on a foundational goal: <em className="font-semibold text-amber-700">"Every Child in School and Learning Well."</em>
              </p>
              <p>
                From rural hamlets to urban centers, our journey focuses on scalable learning solutions—ranging from foundational literacy and numeracy to youth skilling and digital empowerment.
              </p>
              <p>
                We reach thousands of children and youth annually through direct community interventions and collaborative partnerships with local institutions and state governments.
              </p>
              
              <div className="pt-2">
                <a
                  href="#objectives"
                  className="inline-flex items-center text-amber-600 font-bold hover:text-amber-700 text-lg transition-colors"
                >
                  Read More <span className="ml-1">›</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE PHOTO CAROUSEL / SLIDER SECTION */}
        <section className="py-8 border-t border-b border-gray-100">
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Moments & Memories
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Glimpses From Our Community Programs
            </h2>
            <p className="text-sm text-gray-500">
              Swipe or scroll horizontally to explore moments from our field work.
            </p>
          </div>

          {/* Horizontal Scrolling Track */}
          <div className="relative w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent">
            <div className="flex gap-6 w-max px-2">
              {galleryImages.map((photo) => (
                <div 
                  key={photo.id}
                  className="group relative w-[280px] sm:w-[340px] h-[220px] sm:h-[250px] rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-gray-100 flex-shrink-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <h3 className="text-white font-bold text-sm sm:text-base tracking-wide drop-shadow">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Objectives & Governance Section */}
        <div id="objectives">
          <PillarsSection />
        </div>

      </div>
    </div>
  );
}
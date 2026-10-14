import { Link } from 'react-router-dom';

export default function ProgramCard({ program }) {
  // Support both MongoDB (_id) and mock (id) formats
  const progId = program._id || program.id;
  const { title, category, description, image, stats } = program;
  const imgUrl = image || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop';
  const badgeText = category || 'ACTIVE PROGRAM';

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between p-3">
      <div>
        {/* Program Header Image with Badge */}
        <div className="relative h-56 w-full rounded-[1.5rem] overflow-hidden bg-gray-100">
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          {badgeText && (
            <span className="absolute top-3 right-3 bg-[#A4D8EC] text-[#1E3A4A] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {badgeText}
            </span>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-black text-[#2C3238] uppercase tracking-tight leading-snug">
            {title}
          </h3>

          <p className="text-xs text-[#2C3238]/70 leading-relaxed font-medium line-clamp-3">
            {description}
          </p>

          {/* Impact Badge (if available) */}
          {stats && (
            <div className="bg-amber-50 border-l-4 border-amber-600 p-2.5 rounded-r-md">
              <p className="text-xs font-semibold text-amber-950">
                Impact: <span className="font-bold text-amber-700">{stats}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pill Button for Learn More */}
      <div className="px-5 pb-3 pt-1">
        <Link
          to={`/program/${progId}`}
          className="block w-full text-center bg-[#FBF6F0] hover:bg-[#E57E51] text-[#2C3238] hover:text-white font-black text-xs py-3 rounded-full transition-colors uppercase tracking-wider"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}s
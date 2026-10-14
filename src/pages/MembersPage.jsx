import React, { useState, useEffect } from 'react';
import API_URL from '../config';

export default function MembersPage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/admin/members`)
      .then(res => res.json())
      .then(data => {
        const roleHierarchy = {
          'President': 1,
          'Vice President': 2,
          'Secretary': 3,
          'Treasurer': 4,
          'Director': 5,
          'Member': 6,
          'Other': 7
        };

        const sorted = data.sort((a, b) => {
          return (roleHierarchy[a.role] || 99) - (roleHierarchy[b.role] || 99);
        });

        setMembers(sorted);
      })
      .catch(err => console.error('Error fetching members:', err));
  }, []);

  const getImageUrl = (imagePath, name) => {
    if (!imagePath) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Member')}&background=EE9665&color=fff&size=200`;
    }

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    let cleanPath = imagePath.replace(/\\/g, '/');
    cleanPath = cleanPath.replace(/^server\//, '');

    if (!cleanPath.startsWith('/')) {
      cleanPath = `/${cleanPath}`;
    }

    if (!cleanPath.startsWith('/uploads/')) {
      cleanPath = `/uploads${cleanPath}`;
    }

    return `${API_URL}${cleanPath}`;
  };

  return (
    <div className="min-h-screen bg-[#FBF6F0] py-10 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#95CBE7]/20 text-[#2C3238] text-[11px] sm:text-xs font-bold uppercase tracking-widest border border-[#95CBE7]/40">
            Leadership & Guidance
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2C3238] tracking-tight">
            Our Team Members
          </h2>
          <div className="w-16 h-1 bg-[#EE9665] mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-[#2C3238]/80 leading-relaxed pt-1 sm:pt-2">
            Meet the dedicated leaders and passionate team behind Vishwa Gnani Trust. Together, we are committed to driving positive change, empowering communities, and ensuring impactful governance across all our educational and social initiatives.
          </p>
        </div>

        {members.length === 0 ? (
          <p className="text-center text-[#2C3238]/60 font-medium text-sm">No team members added yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {members.map((member) => {
              const rawImagePath = member.image || member.photo || '';

              return (
                <div 
                  key={member._id || member.id} 
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  {/* Image Container: Using object-contain to ensure nothing is cut */}
                  <div className="w-full aspect-[4/5] sm:h-72 bg-white rounded-xl sm:rounded-2xl overflow-hidden mb-3 border border-[#BDC3E8]/50 shadow-sm flex items-center justify-center p-2 transition-all duration-300 ease-out group-hover:border-[#E57E51] group-hover:shadow-md">
                    <img 
                      src={getImageUrl(rawImagePath, member.name)} 
                      alt={member.name || 'Member'} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || 'Member')}&background=EE9665&color=fff&size=200`;
                      }}
                      className="w-full h-full object-contain rounded-lg sm:rounded-xl transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Member Name */}
                  <h3 className="text-xs sm:text-base font-bold text-[#2C3238] leading-tight transition-colors duration-200 group-hover:text-[#E57E51]">
                    {member.name}
                  </h3>
                  
                  {/* Role Badge */}
                  <span className="mt-1 px-2.5 py-0.5 rounded-full bg-[#EE9665]/15 text-[#E57E51] text-[10px] sm:text-xs font-semibold tracking-wide border border-[#EE9665]/30">
                    {member.role}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
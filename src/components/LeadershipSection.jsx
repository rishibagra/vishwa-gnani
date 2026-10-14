import React, { useState, useEffect } from 'react';
import API_URL from '../config';

export default function LeadershipSection() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/members`);
        if (!response.ok) throw new Error('Failed to fetch leadership data');
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching leadership data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadership();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;

    // Convert Windows backslashes (\) to standard forward slashes (/)
    let cleanPath = imagePath.replace(/\\/g, '/');

    // Strip leading 'server/' if Multer stored paths relative to the root
    if (cleanPath.startsWith('server/')) {
      cleanPath = cleanPath.replace('server/', '');
    }

    // Ensure clean leading slash
    if (!cleanPath.startsWith('/')) {
      cleanPath = `/${cleanPath}`;
    }

    return `${API_URL}${cleanPath}`;
  };

  // Define strict role display order priority matching the admin dropdown options
  const rolePriority = {
    'president': 1,
    'vice president': 2,
    'secretary': 3,
    'treasurer': 4,
    'director': 5,
    'member': 6,
    'other': 7
  };

  const getRoleWeight = (role) => {
    if (!role) return 8;
    const normalized = role.toLowerCase().trim();
    return rolePriority[normalized] || 8;
  };

  // Sort members automatically based on hierarchy priority
  const sortedMembers = [...members].sort((a, b) => getRoleWeight(a.role) - getRoleWeight(b.role));

  if (loading) {
    return <div className="text-center py-12 text-slate-500">Loading leadership data...</div>;
  }

  return (
    <section className="pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
          Our Leadership & Governance
        </h1>
        <div className="w-14 h-1 bg-amber-500 mx-auto rounded-full" />
        <p className="text-sm text-slate-600 pt-1">
          Meet the dedicated visionaries and trustees driving Vishwa Gnani Trust forward.
        </p>
      </div>

      {/* Dynamic Member Grid Sorted by Priority */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {sortedMembers.map((member, idx) => {
          const rawImagePath = member.image || member.photo || '';
          return (
            <div 
              key={member._id || idx} 
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center group flex flex-col items-center"
            >
              <div className="w-40 h-48 mx-auto mb-4 overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
                <img
                  src={getImageUrl(rawImagePath)}
                  alt={member.name || 'Team Member'}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/160x192?text=No+Image';
                  }}
                />
              </div>
              <span className="inline-block mb-2 bg-amber-500 text-white text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm">
                {member.role}
              </span>
              <h2 className="text-lg font-extrabold text-slate-900">
                {member.name}
              </h2>
            </div>
          );
        })}
      </div>

    </section>
  );
}
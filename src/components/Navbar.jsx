import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load GTranslate dynamically on mount safely
  useEffect(() => {
    window.gtranslateSettings = {
      default_language: 'en',
      languages: ['en', 'kn'],
      wrapper_selector: '.gtranslate_wrapper',
      native_language_names: true,
      flag_style: '3d',
    };

    const initGTranslate = () => {
      if (window.GTranslate && typeof window.GTranslate === 'function') {
        try {
          new window.GTranslate(window.gtranslateSettings);
        } catch (e) {
          // Suppresses non-critical GTranslate internal callback errors
        }
      }
    };

    const existingScript = document.getElementById('gtranslate-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'gtranslate-script';
      script.src = 'https://cdn.gtranslate.net/widgets/latest/dropdown.js';
      script.defer = true;
      script.onload = initGTranslate;
      document.body.appendChild(script);
    } else {
      initGTranslate();
    }
  }, []);

  const handleLogoutConfirm = () => {
    logout();
    setShowConfirm(false);
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const getDesktopNavLinkClass = ({ isActive }) =>
    `relative py-1 font-semibold text-xs lg:text-sm xl:text-base transition-colors whitespace-nowrap shrink-0 ${
      isActive ? 'text-[#E57E51]' : 'text-[#2C3238] hover:text-[#EE9665]'
    }`;

  const getMobileNavLinkClass = ({ isActive }) =>
    `relative py-1.5 font-semibold text-base transition-colors ${
      isActive ? 'text-[#E57E51] font-bold' : 'text-[#2C3238] hover:text-[#EE9665]'
    }`;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Members', path: '/members' },
    { name: 'Events', path: '/events' },
    { name: 'Donate', path: '/donate' },
    { name: 'Contact', path: '/contact' },
  ];

  const isAdminUser = user && (
    (user.email && user.email.toLowerCase() === 'admin@vishwagnani.com') ||
    user.role === 'admin' || 
    user.isAdmin === true
  );

  return (
    <>
      <nav className="bg-[#FBF6F0] border-b border-[#BDC3E8]/40 sticky top-0 z-50 shadow-sm py-2.5 sm:py-3.5 px-3 sm:px-6 lg:px-8 w-full overflow-x-hidden">
        {/* Added flex-wrap and gap controls */}
        <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group shrink-0">
            <div className="bg-[#BDC3E8]/40 p-1.5 rounded-full shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img 
                src={logoImg} 
                alt="VISHWAGNANI SEVA TRUST Logo" 
                className="h-9 w-9 sm:h-11 sm:w-11 object-contain"
              />
            </div>
            
            <div className="flex flex-col text-left">
              <span className="text-sm sm:text-base lg:text-lg font-black text-[#2C3238] tracking-tight leading-none uppercase group-hover:text-[#E57E51] transition-colors">
                VISHWAGNANI
              </span>
              <span className="text-[10px] sm:text-xs lg:text-sm font-extrabold text-[#E57E51] tracking-wider leading-tight uppercase group-hover:text-[#EE9665] transition-colors">
                SEVA TRUST
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-6 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={getDesktopNavLinkClass}>
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#E57E51] rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Controls Container - Fixed shrink-0 to prevent right-edge overflow */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* GTranslate Wrapper Container */}
            <div className="gtranslate_wrapper flex items-center min-w-[80px] sm:min-w-[90px] shrink-0" />

            {/* Desktop Auth & Compact Admin Actions */}
            <div className="hidden md:flex items-center space-x-2 sm:space-x-3 shrink-0">
              {isAdminUser && (
                <Link 
                  to="/admin" 
                  className="inline-flex items-center gap-1.5 bg-[#6BB5C8]/15 hover:bg-[#6BB5C8]/25 text-[#2C3238] border border-[#6BB5C8]/40 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 shadow-2xs hover:scale-[1.02] whitespace-nowrap"
                  title="Open Admin Dashboard"
                >
                  <span className="w-2 h-2 rounded-full bg-[#6BB5C8] animate-pulse" />
                  <span>Admin Dashboard</span>
                </Link>
              )}

              {user ? (
                <button 
                  onClick={() => setShowConfirm(true)}
                  className="border-2 border-[#E57E51] text-[#E57E51] px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white/80 hover:bg-[#E57E51] hover:text-white transition-all duration-300 shadow-sm whitespace-nowrap shrink-0"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  to="/login" 
                  className="border-2 border-[#E57E51] text-[#E57E51] px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-white/80 hover:bg-[#E57E51] hover:text-white transition-all duration-300 shadow-sm whitespace-nowrap shrink-0"
                >
                  Login / Signup
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#2C3238] hover:bg-[#BDC3E8]/30 focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.293 5.293a1 1 0 011.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 011.414-1.414L12 10.586l6.293-6.293z" />
                  ) : (
                    <path fillRule="evenodd" clipRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
                  )}
                </svg>
              </button>
            </div>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#BDC3E8]/40 flex flex-col space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={getMobileNavLinkClass}
              >
                {({ isActive }) => (
                  <div className="flex items-center justify-between w-full px-1">
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#E57E51]" />
                    )}
                  </div>
                )}
              </NavLink>
            ))}

            <div className="pt-2 flex flex-col space-y-2">
              {isAdminUser && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full bg-[#6BB5C8]/20 text-[#2C3238] border border-[#6BB5C8]/50 py-2 rounded-full font-bold transition-all text-xs"
                >
                  ⚙️ Admin Dashboard
                </Link>
              )}

              {user ? (
                <button 
                  onClick={() => setShowConfirm(true)}
                  className="w-full border-2 border-[#E57E51] text-[#E57E51] py-2 rounded-full font-bold bg-white/80 hover:bg-[#E57E51] hover:text-white transition-all text-sm"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full border-2 border-[#E57E51] text-[#E57E51] py-2 rounded-full font-bold bg-white/80 hover:bg-[#E57E51] hover:text-white transition-all text-sm"
                >
                  Login / Signup
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-[#2C3238]/40 backdrop-blur-xs flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full border border-[#BDC3E8]/40">
            <h3 className="text-lg font-bold text-[#2C3238] mb-2">Confirm Logout</h3>
            <p className="text-[#2C3238]/70 mb-6 text-sm">Are you sure you want to log out of your account?</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-[#2C3238] hover:bg-[#FBF6F0] font-medium text-sm transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-[#E57E51] text-white rounded-xl hover:bg-[#EE9665] font-medium text-sm transition shadow-sm"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
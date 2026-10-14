import React from 'react';
import logoImg from '../assets/logo.png'; // Make sure the image path matches your project structure

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 border-t-4 border-[#f58f1b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Adjusted Grid Layout: 2 Columns for Clean Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 border-b border-gray-800">
          
          {/* Column 1: Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={logoImg} 
                alt="VISHWAGNANI SEVA TRUST Logo" 
                className="w-12 h-12 object-contain shrink-0"
              />
              <span className="text-2xl font-black text-white tracking-tight uppercase">
                VISHWAGNANI SEVA TRUST
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Dedicated to improving the quality of education and providing foundational learning support to underprivileged children across India. Every child in school and learning well.
            </p>
          </div>

          {/* Column 2: Contact Information */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-lg mb-4 border-b-2 border-[#f58f1b] inline-block pb-1">
              Contact Us
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              <strong className="text-white block mb-1">Location:</strong>
              #43, Mallathahalli Village, Near T B Narayanappa Lay Out 3rd Cross, Doddaballapur Town, Bangalore Rural District. 561203.
            </p>
            <p className="text-sm text-gray-400">
              <strong className="text-white">Phone:</strong>+91 9742134767
            </p>
            <p className="text-sm text-gray-400">
              <strong className="text-white">E-mail:</strong>{' '}
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=vishwagnani@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#f58f1b] hover:underline"
              >
                vishwagnanisevatrust@gmail.com
              </a>
            </p>
          </div>

        </div>

        {/* Bottom Bar: Credit Line */}
        <div className="pt-6 flex flex-col items-center justify-center text-center text-xs text-gray-400 space-y-2">
          <p className="text-sm font-semibold text-gray-300">
            Contributed by Rishi Bagra, Shivam Purbey, Akash Kumar Mahato, Ankur Singh — NIT Silchar - Electronics and Communication Engineer Batch of 2028 
          </p>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} VISHWAGNANI SEVA TRUST. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
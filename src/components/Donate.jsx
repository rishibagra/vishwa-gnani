import React, { useState } from 'react';

export default function DonationPage() {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('42267904487');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('vishwagnanisevatrust@sbi'); // Example UPI ID
    alert('UPI ID Copied to Clipboard!');
  };

  return (
    <div className="bg-[#FBF6F0] min-h-screen py-12 px-4 sm:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-[#2C3238] uppercase tracking-tight">
            Support Our Cause & Donate
          </h1>
          <p className="text-xs sm:text-sm text-[#2C3238]/70 font-medium max-w-2xl mx-auto leading-relaxed">
            Your contributions help Vishwa Gnani Seva Trust empower communities and support foundational learning & social welfare initiatives.
          </p>
        </div>

        {/* Two Direct Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Card 1: Instant UPI / QR Code Donation */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col justify-between space-y-6">
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-[#FBF6F0] rounded-2xl mx-auto flex items-center justify-center text-2xl shadow-xs">
                📱
              </div>
              <div className="space-y-2">
                <h2 className="text-lg sm:text-xl font-black text-[#2C3238] uppercase tracking-wide">
                  Instant UPI / QR Code Donation
                </h2>
                <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-md mx-auto">
                  Donate directly via GPay, PhonePe, Paytm, or any UPI app. Scan the QR code or use the official UPI ID below.
                </p>
              </div>
            </div>

            {/* Inline QR / UPI View */}
            <div className="bg-[#FBF6F0] rounded-2xl p-6 text-center space-y-4 border border-gray-200/60">
              <div className="bg-white p-3 rounded-2xl inline-block shadow-sm border border-gray-200">
                {/* Simulated QR Box - Aap yahan apna actual QR image tag <img src="..." /> bhi laga sakte hain */}
                <div className="w-36 h-36 bg-[#2C3238] text-white flex flex-col items-center justify-center text-center p-2 rounded-xl font-mono text-[10px] space-y-1">
                  <span>[ TRUST UPI QR CODE ]</span>
                  <span className="text-emerald-400 font-bold">GPay / PhonePe / Paytm</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Official UPI ID:</span>
                <div className="flex items-center justify-center space-x-2">
                  <span className="font-mono text-xs font-bold text-[#2C3238] bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                    vishwagnanisevatrust@sbi
                  </span>
                  <button
                    onClick={handleCopyUpi}
                    className="bg-[#2C3238] hover:bg-black text-white text-[10px] font-bold uppercase px-3 py-2 rounded-lg transition-all cursor-pointer"
                  >
                    Copy UPI
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="upi://pay?pa=vishwagnanisevatrust@sbi&pn=Vishwa%20Gnani%20Seva%20Trust"
                className="block text-center bg-[#E57E51] hover:bg-[#EE9665] text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Pay via UPI App Directly →
              </a>
            </div>
          </div>

          {/* Card 2: Direct Bank Transfer */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-[#FBF6F0] rounded-2xl mx-auto flex items-center justify-center text-2xl shadow-xs">
                🏛️
              </div>
              <div className="text-center space-y-1">
                <h2 className="text-lg sm:text-xl font-black text-[#2C3238] uppercase tracking-wide">
                  Direct Bank Transfer (NEFT / IMPS)
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Official Institutional SBI Account Details
                </p>
              </div>

              <div className="bg-[#FBF6F0] rounded-2xl p-5 space-y-3 text-xs font-medium text-[#2C3238] border border-gray-200/60">
                <div className="flex justify-between border-b border-gray-200 pb-2.5">
                  <span className="text-gray-500 font-bold">Account Name:</span>
                  <span className="font-extrabold text-right">VISHWA GNANI SEVA TRUST (R)</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2.5">
                  <span className="text-gray-500 font-bold">Account No:</span>
                  <span className="font-black text-[#E57E51] text-sm">42267904487</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2.5">
                  <span className="text-gray-500 font-bold">IFSC Code:</span>
                  <span className="font-mono font-bold">SBIN0040026</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2.5">
                  <span className="text-gray-500 font-bold">Bank Name:</span>
                  <span className="font-bold">State Bank of India (SBI)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">Branch:</span>
                  <span className="font-bold">Doddaballapur (40026)</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleCopyAccount}
                className="w-full bg-[#2C3238] hover:bg-black text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                {copied ? '✓ Account Number Copied!' : 'Copy Account Number'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
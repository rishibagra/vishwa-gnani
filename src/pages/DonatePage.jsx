import React, { useState } from 'react';

export default function DonationPage() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    job: '',
    phone: '',
    email: '',
    address: '',
    transactionId: ''
  });

  const selectedFinalAmount = amount === 'custom' ? customAmount : amount;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceed = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please fill in required fields (Name, Phone, Email).');
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!formData.transactionId) {
      alert('Please enter your transaction UTR / Ref number.');
      return;
    }
    setStep(3);
  };

  return (
    <div className="bg-[#FBF6F0] min-h-screen py-12 px-4 sm:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black text-[#2C3238] uppercase tracking-tight">
            Support Our Cause & Donate
          </h1>
          <p className="text-xs sm:text-sm text-[#2C3238]/70 font-medium max-w-lg mx-auto leading-relaxed">
            Your contributions help Vishwa Gnani Seva Trust empower communities and support foundational learning & social welfare initiatives.
          </p>
        </div>

        {/* Main Dedicated Donation Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Form Header Banner */}
          <div className="bg-[#2C3238] text-white p-6 sm:p-8 text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider">
              {step === 1 && "Make a Donation"}
              {step === 2 && "Official Bank Transfer Details"}
              {step === 3 && "Donation Submitted"}
            </h2>
            <p className="text-xs text-white/70 font-medium">
              Vishwa Gnani Seva Trust (R) Official Portal
            </p>
          </div>

          {/* Stepper Bar */}
          <div className="bg-gray-100 px-6 sm:px-10 py-3.5 border-b border-gray-200 flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
            <span className={step === 1 ? 'text-[#E57E51] font-black' : ''}>1. Basic Details</span>
            <span>&gt;</span>
            <span className={step === 2 ? 'text-[#E57E51] font-black' : ''}>2. Bank Account Info</span>
            <span>&gt;</span>
            <span className={step === 3 ? 'text-[#00b4a2] font-black' : ''}>3. Confirmation</span>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-10 space-y-6">
            
            {/* STEP 1: Basic Details & Amount */}
            {step === 1 && (
              <form onSubmit={handleProceed} className="space-y-6 animate-fadeIn">
                
                {/* Amount Selector */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#2C3238] mb-2.5">
                    Select Donation Amount (₹)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {['500', '1000', '2500', '5000'].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => { setAmount(amt); setCustomAmount(''); }}
                        className={`py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                          amount === amt && !customAmount
                            ? 'bg-[#E57E51] text-white border-[#E57E51] shadow-md scale-[1.02]' 
                            : 'bg-white text-[#2C3238] border-gray-200 hover:border-[#E57E51]'
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder="Or Enter Custom Amount (₹)"
                    value={customAmount}
                    onChange={(e) => { setCustomAmount(e.target.value); setAmount('custom'); }}
                    className="w-full px-4 py-3 bg-white text-xs font-medium rounded-xl border border-gray-200 focus:outline-none focus:border-[#E57E51] transition-colors"
                  />
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#2C3238] mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 bg-white text-xs font-medium rounded-xl border border-gray-200 focus:outline-none focus:border-[#E57E51] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#2C3238] mb-1.5">Date of Birth *</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white text-xs font-medium rounded-xl border border-gray-200 focus:outline-none focus:border-[#E57E51] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#2C3238] mb-1.5">Job / Profession *</label>
                    <input
                      type="text"
                      name="job"
                      value={formData.job}
                      onChange={handleInputChange}
                      placeholder="e.g. Engineer / Business"
                      className="w-full px-4 py-3 bg-white text-xs font-medium rounded-xl border border-gray-200 focus:outline-none focus:border-[#E57E51] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-[#2C3238] mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 9876543210"
                      className="w-full px-4 py-3 bg-white text-xs font-medium rounded-xl border border-gray-200 focus:outline-none focus:border-[#E57E51] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#2C3238] mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. rahul@example.com"
                    className="w-full px-4 py-3 bg-white text-xs font-medium rounded-xl border border-gray-200 focus:outline-none focus:border-[#E57E51] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-[#2C3238] mb-1.5">Full Residential Address *</label>
                  <textarea
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House No, Street, City, State, Pincode"
                    className="w-full px-4 py-3 bg-white text-xs font-medium rounded-xl border border-gray-200 focus:outline-none focus:border-[#E57E51] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E57E51] hover:bg-[#EE9665] text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-4 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Proceed to Bank Info (₹{selectedFinalAmount || '1000'}) →
                </button>
              </form>
            )}

            {/* STEP 2: Bank Account Info Display (Matching Screenshot Exact Design) */}
            {step === 2 && (
              <form onSubmit={handlePaymentSubmit} className="space-y-5 animate-fadeIn">
                
                {/* Contributing Banner */}
                <div className="bg-[#FFF9E6] border border-[#F3E3B3] p-3 rounded-lg text-xs text-[#8C6512] font-semibold text-center">
                  Contributing <span className="text-[#E57E51] font-extrabold">₹{selectedFinalAmount || '1000'}</span> as <span className="font-bold">{formData.name || 'Donor'}</span>
                </div>

                {/* Bank Details Card */}
                <div className="bg-[#F8FAFC] border border-gray-200 p-5 rounded-2xl text-xs space-y-3.5 text-[#2C3238]">
                  <div className="text-center font-bold text-[#E57E51] uppercase tracking-wider pb-2 border-b border-gray-200 text-[11px]">
                    Official State Bank of India Account
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Account Name:</span>
                    <span className="font-black text-right text-[#2C3238]">VISHWA GNANI SEVA TRUST (R)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Account Number:</span>
                    <span className="font-black text-[#00A896] text-base tracking-wide">42267904487</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">IFSC Code:</span>
                    <span className="font-mono font-black text-[#2C3238]">SBIN0040026</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Branch Name:</span>
                    <span className="font-semibold text-gray-700">Doddaballapur (40026)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium">Account Type:</span>
                    <span className="font-semibold text-gray-700">CURRENT A/C</span>
                  </div>
                </div>

                {/* Transaction UTR Input Field */}
                <div>
                  <label className="block text-xs font-extrabold text-[#2C3238] uppercase tracking-wider mb-1.5">
                    Enter Transaction UTR / Ref Number *
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    required
                    value={formData.transactionId}
                    onChange={handleInputChange}
                    placeholder="Enter NEFT/IMPS/UPI transaction reference number"
                    className="w-full text-xs px-3.5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00A896] bg-white font-medium"
                  />
                  <p className="text-[11px] text-gray-500 mt-1.5 leading-normal">
                    Please transfer to the above official bank account using your net banking or banking app and enter the reference number here.
                  </p>
                </div>

                {/* Buttons Row */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-gray-600 hover:text-gray-900 uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    ← Edit Details
                  </button>
                  <button
                    type="submit"
                    className="bg-[#00A896] hover:bg-[#009182] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Submit Transaction ✓
                  </button>
                </div>

              </form>
            )}

            {/* STEP 3: Thank You / Confirmation */}
            {step === 3 && (
              <div className="py-8 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-[#2C3238] uppercase">Thank You for Your Support!</h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  We have received your donation details for <strong className="text-[#E57E51]">₹{selectedFinalAmount}</strong> (Ref: {formData.transactionId}). Our team will verify the transfer and send the official 80G tax receipt to <strong className="text-[#2C3238]">{formData.email}</strong> shortly.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setFormData({ name: '', dob: '', job: '', phone: '', email: '', address: '', transactionId: '' });
                    }}
                    className="bg-[#2C3238] hover:bg-black text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all cursor-pointer"
                  >
                    Make Another Donation
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
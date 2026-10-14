import React, { useState } from 'react';

export default function DonateModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    job: '',
    phone: '',
    email: '',
    address: '',
    amount: '1000',
    customAmount: '',
    transactionId: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const resetAndClose = () => {
    setStep(1);
    setFormData({
      name: '',
      dob: '',
      job: '',
      phone: '',
      email: '',
      address: '',
      amount: '1000',
      customAmount: '',
      transactionId: ''
    });
    onClose();
  };

  const effectiveAmount = formData.amount === 'custom' ? formData.customAmount : formData.amount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white rounded shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#242b35] text-white px-6 py-4 flex items-center justify-between border-b-4 border-[#f37847]">
          <div>
            <h3 className="text-lg font-black uppercase tracking-wide">
              {step === 1 && "Make a Donation"}
              {step === 2 && "Official Bank Transfer Details"}
              {step === 3 && "Donation Submitted"}
            </h3>
            <p className="text-xs text-slate-400">Vishwa Gnani Seva Trust (R) Official Portal</p>
          </div>
          <button
            onClick={resetAndClose}
            className="text-slate-400 hover:text-white text-2xl font-bold leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Progress Tracker Bar */}
        <div className="bg-slate-100/80 border-b border-slate-200 px-6 py-3 flex items-center justify-between text-xs font-bold tracking-wider">
          <span className={step >= 1 ? "text-[#f37847]" : "text-slate-400"}>1. BASIC DETAILS</span>
          <span className="text-slate-300">›</span>
          <span className={step >= 2 ? "text-[#f37847]" : "text-slate-400"}>2. BANK ACCOUNT INFO</span>
          <span className="text-slate-300">›</span>
          <span className={step === 3 ? "text-[#00b4a2]" : "text-slate-400"}>3. CONFIRMATION</span>
        </div>

        {/* STEP 1: BASIC DETAILS FORM */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                Select Donation Amount (₹)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {['500', '1000', '2500', '5000'].map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setFormData({ ...formData, amount: amt, customAmount: '' })}
                    className={`py-2.5 text-xs font-bold rounded border transition-all cursor-pointer ${
                      formData.amount === amt
                        ? 'bg-[#e06d41] text-white border-[#e06d41]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Or Enter Custom Amount (₹)"
                value={formData.customAmount}
                onChange={(e) => setFormData({ ...formData, amount: 'custom', customAmount: e.target.value })}
                className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded focus:outline-none focus:border-[#f37847]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-[#f37847]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-[#f37847]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">Job / Profession *</label>
                <input
                  type="text"
                  name="job"
                  required
                  value={formData.job}
                  onChange={handleChange}
                  placeholder="e.g. Engineer / Business"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-[#f37847]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 9876543210"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-[#f37847]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. rahul@example.com"
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-[#f37847]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-700 uppercase mb-1">Full Residential Address *</label>
              <textarea
                name="address"
                required
                rows="2"
                value={formData.address}
                onChange={handleChange}
                placeholder="House No, Street, City, State, Pincode"
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded focus:outline-none focus:border-[#f37847]"
              ></textarea>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-[#e06d41] hover:bg-[#d05c30] text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded shadow transition-all cursor-pointer"
              >
                Proceed To Bank Info (₹{effectiveAmount || '0'}) →
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: OFFICIAL SBI BANK DETAILS DISPLAY */}
        {step === 2 && (
          <form onSubmit={handlePaymentSubmit} className="p-6 space-y-5">
            <div className="bg-[#fff9e6] border border-[#f3e3b3] p-3 rounded text-xs text-[#8c6512] font-semibold text-center">
              Contributing <span className="text-[#f37847] font-extrabold">₹{effectiveAmount}</span> as <span className="font-bold">{formData.name}</span>
            </div>

            <div className="bg-[#f8fafc] border border-slate-200 p-5 rounded-xl text-xs space-y-3.5 text-slate-800">
              <div className="text-center font-bold text-[#e06d41] uppercase tracking-wider pb-2 border-b border-slate-200/80 text-[11px]">
                Official State Bank of India Account
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Account Name:</span>
                <span className="font-black text-right text-slate-800">VISHWA GNANI SEVA TRUST (R)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Account Number:</span>
                <span className="font-black text-[#00a896] text-base tracking-wide">42267904487</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">IFSC Code:</span>
                <span className="font-mono font-black text-slate-800">SBIN0040026</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Branch Name:</span>
                <span className="font-semibold text-slate-700">Doddaballapur (40026)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Account Type:</span>
                <span className="font-semibold text-slate-700">CURRENT A/C</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5">
                Enter Transaction UTR / Ref Number *
              </label>
              <input
                type="text"
                name="transactionId"
                required
                value={formData.transactionId}
                onChange={handleChange}
                placeholder="Enter NEFT/IMPS/UPI transaction reference number"
                className="w-full text-xs px-3.5 py-2.5 border border-slate-200 rounded focus:outline-none focus:border-[#00a896] bg-white"
              />
              <p className="text-[11px] text-slate-500 mt-1.5 leading-normal">
                Please transfer to the above official bank account using your net banking or banking app and enter the reference number here.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider transition-colors cursor-pointer"
              >
                ← Edit Details
              </button>
              <button
                type="submit"
                className="bg-[#00a896] hover:bg-[#009182] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded shadow transition-all cursor-pointer"
              >
                Submit Transaction ✓
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION */}
        {step === 3 && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-teal-50 text-[#00a896] border border-teal-200 rounded-full flex items-center justify-center mx-auto text-3xl font-bold shadow-sm">
              ✓
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                Donation Details Submitted!
              </h4>
              <p className="text-sm font-semibold text-[#e06d41]">
                Within 3 days our organisation will contact you.
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto bg-slate-50 p-4 border border-slate-200 rounded">
              Thank you, <strong>{formData.name}</strong>, for supporting Vishwa Gnani Seva Trust (R). Your contribution of <strong>₹{effectiveAmount}</strong> (Ref: {formData.transactionId}) is being verified against our official SBI account. An official receipt will be sent to <strong>{formData.email}</strong>.
            </p>

            <button
              onClick={resetAndClose}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
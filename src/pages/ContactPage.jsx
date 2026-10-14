import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formType, setFormType] = useState('contact'); // 'contact' or 'member'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [memberData, setMemberData] = useState({
    name: '',
    email: '',
    phone: '',
    occupation: '',
    memberType: 'Active Member',
    address: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (e) => {
    setMemberData({ ...memberData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      await emailjs.send(
        'service_8501hvk',
        'template_4sbv4x8',
        templateParams,
        '8qt_jhlvRSTO3ibye'
      );

      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('Failed to send message. Please try again.');
    }
  };

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting application...');

    const templateParams = {
      name: memberData.name,
      email: memberData.email,
      phone: memberData.phone,
      occupation: memberData.occupation,
      memberType: memberData.memberType,
      address: memberData.address,
      subject: 'New Membership Application'
    };

    try {
      await emailjs.send(
        'service_8501hvk',
        'template_4sbv4x8',
        templateParams,
        '8qt_jhlvRSTO3ibye'
      );
      setStatus('Membership application submitted successfully!');
      setMemberData({ name: '', email: '', phone: '', occupation: '', memberType: 'Active Member', address: '' });
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to submit application. Please try again.');
    }
  };

  return (
    <div style={{ padding: '40px 20px', background: '#fdfbf7', minHeight: '80vh' }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>
          CONTACT & MEMBERSHIP
        </h1>
        <p style={{ color: '#4b5563', fontSize: '1rem' }}>
          Reach out directly to Vishwagnani Seva Trust or apply to become a valued member.
        </p>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button 
            onClick={() => { setFormType('contact'); setStatus(''); }}
            style={{ 
              background: formType === 'contact' ? '#f97316' : '#fff', 
              color: formType === 'contact' ? '#fff' : '#374151', 
              border: formType === 'contact' ? 'none' : '1px solid #d1d5db', 
              padding: '10px 24px', 
              borderRadius: '25px', 
              fontWeight: 'bold', 
              cursor: 'pointer' 
            }}
          >
            GET IN TOUCH
          </button>
          <button 
            onClick={() => { setFormType('member'); setStatus(''); }}
            style={{ 
              background: formType === 'member' ? '#f97316' : '#fff', 
              color: formType === 'member' ? '#fff' : '#374151', 
              border: formType === 'member' ? 'none' : '1px solid #d1d5db', 
              padding: '10px 24px', 
              borderRadius: '25px', 
              fontWeight: 'bold', 
              cursor: 'pointer' 
            }}
          >
            BECOME A MEMBER
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Left Column: Location & Map */}
        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '15px' }}>LOCATION</h3>
          <h4 style={{ fontWeight: 'bold', color: '#111827', marginBottom: '10px' }}>Vishwagnani Seva Trust</h4>
          <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
            #43, Mallathahalli Village, Near T B Narayanappa Lay Out 3rd Cross, Doddaballapur Town, Bangalore Rural District. 561203.
          </p>
          <p style={{ color: '#111827', marginBottom: '8px' }}>
            <strong style={{ color: '#ea580c' }}>Email:</strong> vishwagnanisevatrust@gmail.com
          </p>
          <p style={{ color: '#111827', marginBottom: '20px' }}>
            <strong style={{ color: '#ea580c' }}>Phone:</strong>+91 9742134767
          </p>
          
          <div style={{ width: '100%', height: '200px', background: '#e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0!2d77.5!3d13.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDE3JzI0LjAiTiA3N8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Right Column: Dynamic Form (Get In Touch vs Become A Member) */}
        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          
          {formType === 'contact' ? (
            <>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '20px' }}>GET IN TOUCH</h3>
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>FULL NAME</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Write your name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>EMAIL ADDRESS</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Email address" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>PHONE NUMBER</label>
                    <input 
                      type="text" 
                      name="phone" 
                      placeholder="Phone number" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      required 
                      style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>SUBJECT</label>
                  <input 
                    type="text" 
                    name="subject" 
                    placeholder="How can we help?" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>MESSAGE</label>
                  <textarea 
                    name="message" 
                    placeholder="Write your message here..." 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    rows={4}
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button 
                  type="submit" 
                  style={{ width: '100%', padding: '14px', background: '#f97316', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', marginTop: '10px' }}
                >
                  SEND MESSAGE
                </button>

                {status && <p style={{ textAlign: 'center', fontWeight: '500', color: status.includes('success') ? '#16a34a' : '#dc2626', marginTop: '10px' }}>{status}</p>}
              </form>
            </>
          ) : (
            <>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '20px' }}>BECOME A MEMBER</h3>
              <form onSubmit={handleMemberSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>FULL NAME</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Write your name" 
                    value={memberData.name} 
                    onChange={handleMemberChange} 
                    required 
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>EMAIL ADDRESS</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Email address" 
                      value={memberData.email} 
                      onChange={handleMemberChange} 
                      required 
                      style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>PHONE NUMBER</label>
                    <input 
                      type="text" 
                      name="phone" 
                      placeholder="Phone number" 
                      value={memberData.phone} 
                      onChange={handleMemberChange} 
                      required 
                      style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>OCCUPATION</label>
                    <input 
                      type="text" 
                      name="occupation" 
                      placeholder="Your occupation" 
                      value={memberData.occupation} 
                      onChange={handleMemberChange} 
                      style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>MEMBER TYPE</label>
                    <select 
                      name="memberType"
                      value={memberData.memberType}
                      onChange={handleMemberChange}
                      style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', background: '#fff' }}
                    >
                      <option value="Active Member">Active Member</option>
                      <option value="Volunteer">Volunteer</option>
                      <option value="Donor">Donor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>ADDRESS</label>
                  <textarea 
                    name="address" 
                    placeholder="Enter your address..." 
                    value={memberData.address} 
                    onChange={handleMemberChange} 
                    required 
                    rows={3}
                    style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button 
                  type="submit" 
                  style={{ width: '100%', padding: '14px', background: '#f97316', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', marginTop: '10px' }}
                >
                  SUBMIT APPLICATION
                </button>

                {status && <p style={{ textAlign: 'center', fontWeight: '500', color: status.includes('success') ? '#16a34a' : '#dc2626', marginTop: '10px' }}>{status}</p>}
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default Contact;
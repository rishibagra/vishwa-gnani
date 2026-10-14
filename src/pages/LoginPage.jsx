import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config';

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isSignup 
      ? `${API_URL}/api/auth/register` 
      : `${API_URL}/api/auth/login`;

    const payload = isSignup 
      ? { name, email, phone, aadhar, password } 
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || (isSignup ? 'Registration failed' : 'Login failed'));
      }

      if (isSignup) {
        alert('Registration successful! Please log in.');
        setIsSignup(false);
        return;
      }

      login(data.user);
      if (data.user.email === 'admin@vishwagnani.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] py-8 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {isSignup ? 'Create Account' : 'Member / Admin Login'}
        </h2>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">{error}</div>}
        
        {isSignup && (
          <div className="mb-4">
            <label className="block text-gray-600 mb-2 text-sm font-medium">Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-2 border rounded focus:outline-none focus:border-orange-500" 
              required 
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-600 mb-2 text-sm font-medium">Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-2 border rounded focus:outline-none focus:border-orange-500" 
            required 
          />
        </div>

        {isSignup && (
          <>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2 text-sm font-medium">Phone Number</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className="w-full p-2 border rounded focus:outline-none focus:border-orange-500" 
                required 
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2 text-sm font-medium">Aadhar ID</label>
              <input 
                type="text" 
                value={aadhar} 
                onChange={(e) => setAadhar(e.target.value)} 
                className="w-full p-2 border rounded focus:outline-none focus:border-orange-500" 
                placeholder="Enter ID number"
                required 
              />
            </div>
          </>
        )}
        
        <div className="mb-6 relative">
          <label className="block text-gray-600 mb-2 text-sm font-medium">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-2 pr-10 border rounded focus:outline-none focus:border-orange-500" 
              required 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye Slash Icon (Hide)
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                // Eye Icon (Show)
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition font-semibold cursor-pointer">
          {isSignup ? 'Sign Up' : 'Login'}
        </button>

        <div className="mt-4 text-center">
          <button 
            type="button" 
            onClick={() => setIsSignup(!isSignup)} 
            className="text-sm text-orange-600 hover:underline font-medium cursor-pointer"
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}
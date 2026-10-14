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
        
        <div className="mb-6">
          <label className="block text-gray-600 mb-2 text-sm font-medium">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-2 border rounded focus:outline-none focus:border-orange-500" 
            required 
          />
        </div>
        
        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition font-semibold">
          {isSignup ? 'Sign Up' : 'Login'}
        </button>

        <div className="mt-4 text-center">
          <button 
            type="button" 
            onClick={() => setIsSignup(!isSignup)} 
            className="text-sm text-orange-600 hover:underline font-medium"
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}
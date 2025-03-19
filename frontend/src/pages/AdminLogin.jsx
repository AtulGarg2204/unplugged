import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  // Hardcoded credentials for now
  const ADMIN_EMAIL = 'admin@unplugged.com';
  const ADMIN_PASSWORD = 'admin123';
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }
    
    // Check against hardcoded credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Set a flag in localStorage to indicate admin is logged in
      localStorage.setItem('adminAuthenticated', 'true');
      
      // Navigate to admin page
      navigate('/admin/dashboard');
      
    } else {
      setError('Invalid email or password');
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-700 w-16 h-16 rounded-2xl flex items-center justify-center transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 float-icon">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 
            style={{ 
              background: "linear-gradient(to bottom, #ffffff, #999999)",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              fontFamily: "'DM Serif Display', serif",
              fontWeight: "bolder",
              textTransform: "uppercase",
            }}
            className="text-4xl tracking-wide mb-4 animate-glow"
          >
            Admin Login
          </h2>
          <p 
            className="text-gray-400"
            style={{ 
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              letterSpacing: '0.3px'
            }}
          >
            Enter your credentials to access the admin dashboard
          </p>
        </div>
        
        <div className="bg-[#0a0a13] p-8 rounded-xl shadow-lg transition-all duration-500 hover:shadow-purple-500/20 hover:shadow-xl border border-gray-800">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="email-address" 
                  className="block text-sm text-gray-300 mb-2"
                  style={{ 
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    letterSpacing: '0.3px'
                  }}
                >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-800 bg-black text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  style={{ 
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300
                  }}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm text-gray-300 mb-2"
                  style={{ 
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 400,
                    letterSpacing: '0.3px'
                  }}
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-800 bg-black text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  style={{ 
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300
                  }}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            {error && (
              <div 
                className="text-red-400 text-sm text-center"
                style={{ 
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  letterSpacing: '0.3px'
                }}
              >
                {error}
              </div>
            )}
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-3 px-4 rounded-lg text-white transition-all duration-300 transform hover:scale-105 ${
                  loading 
                    ? 'bg-purple-800 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg pulse-button'
                }`}
                style={{ 
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { motion } from 'framer-motion';
import { IoLockClosedOutline, IoPersonOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simple validation
    if (!username || !password) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }
    
    // Try to login
    const success = login(username, password);
    
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-dark py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div>
          <div className="flex justify-center">
            <img src="/logos/balitech-logo.png" alt="BaliTech Logo" className="h-16" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Admin Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your credentials to access the admin area
          </p>
        </div>
        
        <div className="mt-8 bg-[#0f172a] rounded-xl p-8 shadow-lg border border-gray-800">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoPersonOutline className="text-gray-500" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#1e293b] border border-gray-700 rounded-lg pl-10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange"
                  placeholder="Admin username"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoLockClosedOutline className="text-gray-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1e293b] border border-gray-700 rounded-lg pl-10 pr-10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange"
                  placeholder="Admin password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-300 focus:outline-none"
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange hover:bg-orange/90 disabled:bg-orange/50 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Logging in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <a href="/" className="text-orange hover:text-orange/80 text-sm">
                Return to homepage
              </a>
            </div>
          </form>
        </div>
        
        <div className="text-center text-xs text-gray-500 mt-8">
          <p>© {new Date().getFullYear()} BaliTech. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login; 
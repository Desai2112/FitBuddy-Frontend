import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaDumbbell } from 'react-icons/fa';
import axiosInstance from '../../api/axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'user'
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '','','']);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const slideVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      x: -50,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 8) {
      setError('Password should be at least 8 characters long');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      // Call the register endpoint
      await axiosInstance.post('/api/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.accountType.toLowerCase() // Convert to lowercase to match backend expectations
      });
      
      // If successful, move to OTP verification step
      setStep(2);
    } catch (error) {
      setError(
        error.response?.data?.message || 
        'An error occurred during registration. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Call the verify endpoint
      const response = await axiosInstance.post('/api/auth/verify', {
        email: formData.email,
        password: formData.password,
        name:formData.firstName + formData.lastName,
        role:formData.accountType.toLowerCase(),
        otp: otp.join(''),
      });
      
      if (response.data.success) {
        // Redirect based on account type
        if (formData.accountType.toLowerCase() === 'user') {
          navigate('/'); // Or wherever you want users to go
        } else {
          navigate('/doctor-dashboard'); // Or wherever you want doctors to go
        }
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 
        'Invalid verification code. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-20"
          style={{ background: 'linear-gradient(135deg, #0eab8f 0%, #0ba380 100%)' }}
          animate={{
            scale: [1, 1.2, 1],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute bottom-16 left-40 w-72 h-72 rounded-full opacity-15"
          style={{ background: 'linear-gradient(135deg, #0ba380 0%, #0eab8f 100%)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            transition: { duration: 7, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute top-1/4 left-20 w-32 h-32 rounded-full bg-gray-200 opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Dotted pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #0ba380 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.05
        }} />
      </div>
      
      <motion.div 
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="flex justify-center mb-6" variants={itemVariants}>
          <div className="text-3xl flex items-center gap-2 font-bold uppercase">
            <FaDumbbell style={{ color: '#0eab8f' }} />
            <p>FIT</p>
            <p style={{ color: '#0eab8f' }}>BUDDY</p>
          </div>
        </motion.div>
        
        {step === 1 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h2 className="mt-2 text-center text-3xl font-bold text-gray-800">
                Create Your Account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold" style={{ color: '#0eab8f' }}>
                  Sign in
                </Link>
              </p>
            </motion.div>
            
            {error && (
              <motion.div 
                className="bg-red-50 border-l-4 border-red-500 p-4 rounded"
                variants={itemVariants}
              >
                <p className="text-red-700 text-sm">{error}</p>
              </motion.div>
            )}
            
            <motion.form 
              className="mt-4 space-y-5" 
              onSubmit={handleSubmit}
              variants={containerVariants}
            >
              <motion.div className="space-y-4" variants={containerVariants}>
                <motion.div className="grid grid-cols-2 gap-4" variants={itemVariants}>
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ 
                        focusRing: '#0eab8f',
                        '--tw-ring-color': 'rgba(14, 171, 143, 0.5)'
                      }}
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ 
                        focusRing: '#0eab8f',
                        '--tw-ring-color': 'rgba(14, 171, 143, 0.5)'
                      }}
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ 
                      focusRing: '#0eab8f',
                      '--tw-ring-color': 'rgba(14, 171, 143, 0.5)'
                    }}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ 
                      focusRing: '#0eab8f',
                      '--tw-ring-color': 'rgba(14, 171, 143, 0.5)'
                    }}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ 
                      focusRing: '#0eab8f',
                      '--tw-ring-color': 'rgba(14, 171, 143, 0.5)'
                    }}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
                    Account Type
                  </label>
                  <select
                    id="accountType"
                    name="accountType"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ 
                      focusRing: '#0eab8f',
                      '--tw-ring-color': 'rgba(14, 171, 143, 0.5)'
                    }}
                    value={formData.accountType}
                    onChange={handleChange}
                  >
                    <option value="User">User</option>
                    <option value="Doctor">Doctor</option>
                  </select>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #0eab8f 0%, #0ba380 100%)' }}
                >
                  <motion.span
                    className="absolute inset-0 z-0"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
                      backgroundSize: '200% 100%'
                    }}
                  />
                  <span className="relative z-10">
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </span>
                </button>
              </motion.div>

              <motion.div 
                className="mt-4 text-center text-xs text-gray-500"
                variants={itemVariants}
              >
                By creating an account, you agree to FitBuddy's{' '}
                <a href="#" className="font-medium" style={{ color: '#0eab8f' }}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium" style={{ color: '#0eab8f' }}>
                  Privacy Policy
                </a>
              </motion.div>
            </motion.form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideVariants}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h2 className="mt-2 text-center text-3xl font-bold text-gray-800">
                Verify Your Email
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                We've sent a code to <span className="font-semibold">{formData.email}</span>
              </p>
            </motion.div>
            
            <motion.form 
              className="mt-4 space-y-5" 
              onSubmit={handleOtpSubmit}
              variants={containerVariants}
            >
              <motion.div 
                className="flex justify-center space-x-3"
                variants={itemVariants}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-14 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ 
                      focusRing: '#0eab8f',
                      '--tw-ring-color': 'rgba(14, 171, 143, 0.5)'
                    }}
                  />
                ))}
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={loading || otp.some(digit => !digit)}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 relative overflow-hidden disabled:opacity-70"
                  style={{ background: 'linear-gradient(135deg, #0eab8f 0%, #0ba380 100%)' }}
                >
                  <motion.span
                    className="absolute inset-0 z-0"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
                      backgroundSize: '200% 100%'
                    }}
                  />
                  <span className="relative z-10">
                    {loading ? 'Verifying...' : 'Verify & Continue'}
                  </span>
                </button>
              </motion.div>

              <motion.div 
                className="text-center mt-4"
                variants={itemVariants}
              >
                <p className="text-sm text-gray-600">
                  Didn't receive a code?{' '}
                  <button 
                    type="button" 
                    className="font-semibold hover:text-opacity-80"
                    style={{ color: '#0eab8f' }}
                  >
                    Resend
                  </button>
                </p>
              </motion.div>

              <motion.div 
                className="text-center"
                variants={itemVariants}
              >
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm font-medium hover:underline"
                  style={{ color: '#0eab8f' }}
                >
                  ← Back to signup
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Signup;
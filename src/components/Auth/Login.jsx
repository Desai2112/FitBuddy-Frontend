import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaDumbbell } from 'react-icons/fa';
import axiosInstance from '../../api/axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call the login endpoint
      const response = await axiosInstance.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      // console.log("login")
      // console.log(response.data.data)

      if (response.data.success) {
        // Redirect to appropriate dashboard based on user role
        if(response.data.data.profileCompleted){
          if (response.data.data.role == "user") {
            navigate('/dashboard');
          } else {
            navigate('/doctor');
          }
        }
        else{
          if(response.data.data.role=="user"){
            navigate('/userProfile/create');
          }
          else{
            navigate('/doctor');
          }
        }
        
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Invalid email or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-20 w-48 h-48 rounded-full opacity-30"
          style={{ background: 'linear-gradient(135deg, #0dcfcf 0%, #0fa2b2 100%)' }}
          animate={{
            scale: [1, 1.2, 1],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute bottom-16 left-40 w-64 h-64 rounded-full opacity-20"
          style={{ background: 'linear-gradient(135deg, #0fa2b2 0%, #0dcfcf 100%)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            transition: { duration: 7, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute top-40 right-40 w-32 h-32 rounded-full bg-gray-200 opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Dotted pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #0fa2b2 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.05
        }} />
      </div>

      <motion.div
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="flex justify-center mb-6" variants={itemVariants}>
          <div className="text-3xl flex items-center gap-2 font-bold uppercase">
            <FaDumbbell style={{ color: '#0dcfcf' }} />
            <p>FIT</p>
            <p style={{ color: '#0dcfcf' }}>BUDDY</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="mt-2 text-center text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold" style={{ color: '#0fa2b2' }}>
              Sign up for free
            </Link>
          </p>
        </motion.div>

        {error && (
          <motion.div
            className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded"
            variants={itemVariants}
          >
            <p className="text-red-700 text-sm">{error}</p>
          </motion.div>
        )}

        <motion.form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          variants={containerVariants}
        >
          <motion.div className="space-y-4" variants={containerVariants}>
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
                  focusRing: '#0dcfcf',
                  '--tw-ring-color': 'rgba(13, 207, 207, 0.5)'
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
                  focusRing: '#0dcfcf',
                  '--tw-ring-color': 'rgba(13, 207, 207, 0.5)'
                }}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center justify-between"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 border-gray-300 rounded"
                style={{ color: '#0dcfcf' }}
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium hover:text-opacity-80" style={{ color: '#0fa2b2' }}>
                Forgot password?
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0dcfcf 0%, #0fa2b2 100%)' }}
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
                {loading ? 'Signing in...' : 'Sign in'}
              </span>
            </button>
          </motion.div>

          <motion.div
            className="mt-6 text-center text-sm text-gray-500"
            variants={itemVariants}
          >
            By continuing, you agree to FitBuddy's{' '}
            <a href="#" className="font-medium" style={{ color: '#0fa2b2' }}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium" style={{ color: '#0fa2b2' }}>
              Privacy Policy
            </a>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
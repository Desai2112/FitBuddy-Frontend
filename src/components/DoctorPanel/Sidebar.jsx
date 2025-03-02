import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaQrcode, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: FaCalendarAlt, text: 'Appointments', path: '/doctor/appointments' },
    { icon: FaQrcode, text: 'Scanner', path: '/doctor/scanner' },
    { icon: FaUser, text: 'Profile', path: '/doctor/profile' },
  ];

  const handleLogout = () => {
    // Clear any stored tokens/data
    localStorage.removeItem('token');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <motion.div 
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="h-screen w-64 bg-white shadow-lg fixed left-0 top-0"
    >
      <div className="p-6">
        <div className="text-2xl font-bold text-teal-600 mb-10">
          Doctor Panel
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-teal-500 text-white' 
                    : 'text-gray-600 hover:bg-teal-50 hover:text-teal-600'
                }`}
              >
                <Icon className="text-xl" />
                <span>{item.text}</span>
              </Link>
            );
          })}
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar; 
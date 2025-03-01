import React, { useState, useRef, useEffect } from "react";
import { FaDumbbell } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import ResponsiveMenu from "./ResponsiveMenu";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../api/axios"; // Use your configured axios instance
import { GiWeightLiftingUp } from "react-icons/gi";
import { AiFillHome } from "react-icons/ai";
import { RiMentalHealthFill } from "react-icons/ri";
import { FaRobot, FaUserCircle, FaUtensils } from "react-icons/fa";
import { MdOutlineCalculate } from "react-icons/md";
import TrainingPage from "../../pages/Training Page/TrainingPage";

const dashboardMenu = [
  { id: 1, title: "Home", link: "/dashboard", icon: <AiFillHome /> },
  { id: 2, title: "Doctor Appointment", link: "/consultation", icon: <RiMentalHealthFill /> },
  // { id: 3, title: "3D Exercise", link: "/3d-training", icon: <TrainingPage /> },
  { id: 4, title: "Recipe Generator", link: "/recipes", icon: <FaUtensils /> },
  { id: 5, title: "BMI Calculator", link: "/bmi-calculator", icon: <MdOutlineCalculate /> },
];

const AuthenticatedNavbar = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  
  // Updated menu list
  const menuItems = [
    { path: "/dashboard", label: "Home" },
    { path: "/chatbot", label: "AI Coach" },
    { path: "/3d-training", label: "3D Training" },
    { path: "/bmi-calculator", label: "BMI Calculator" },
    { path: "/recipes", label: "Meal Planning" },
  ];
  
  // Handle click outside to close dropdown
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };
  
  // Logout function with axios request
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to logout...");
      const response = await axiosInstance.post('/api/auth/logout');
      console.log("Logout response:", response.data);
      
      // Clear any local storage/state
      localStorage.removeItem('token');
      sessionStorage.clear();
      
      // Force redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
      alert("Logout failed. Please try again.");
    }
  };
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white shadow-lg backdrop-blur-sm bg-opacity-80" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              <motion.div
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                }}
                transition={{ duration: 0.8 }}
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0dcfcf] to-[#0fa2b2] flex items-center justify-center shadow-md overflow-hidden"
              >
                <GiWeightLiftingUp className="text-3xl text-white transform -rotate-12" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-[#0dcfcf] to-[#0fa2b2] bg-clip-text text-transparent">
                  FitBuddy
                </span>
                <span className="text-sm text-gray-500 -mt-1">Your Fitness Partner</span>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {dashboardMenu.map((item) => {
                const isActive = location.pathname === item.link;
                return (
                  <motion.div
                    key={item.id}
                    onClick={() => navigate(item.link)}
                    className={`relative group flex items-center gap-2 text-base font-medium cursor-pointer ${
                      scrolled ? "text-gray-700" : "text-gray-800"
                    } ${isActive ? 'text-[#0dcfcf]' : ''}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className={`text-xl ${
                      isActive 
                        ? "text-[#0dcfcf]" 
                        : scrolled 
                          ? "text-[#0fa2b2]" 
                          : "text-[#0dcfcf]"
                    }`}>
                      {item.icon}
                    </span>
                    {item.title}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#0dcfcf]"
                        layoutId="activeTab"
                      />
                    )}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0dcfcf] to-[#0fa2b2] group-hover:w-full"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* User Profile */}
            <div className="hidden md:block">
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(13, 207, 207, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/profile')}
                className={`flex items-center gap-2 px-7 py-3 rounded-full text-base font-medium cursor-pointer transition-all duration-300 ${
                  scrolled
                    ? "bg-gradient-to-r from-[#0dcfcf] to-[#0fa2b2] text-white"
                    : "bg-white text-[#0fa2b2] shadow-md hover:shadow-lg"
                }`}
              >
                <FaUserCircle className="text-xl" />
                Profile
              </motion.div>
            </div>

            {/* Mobile Menu Icon */}
            <motion.div
              className="md:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`p-2.5 rounded-lg ${
                scrolled
                  ? "bg-gradient-to-r from-[#0dcfcf] to-[#0fa2b2] text-white"
                  : "bg-white shadow-md text-[#0fa2b2]"
              }`}>
                <MdMenu className="text-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />

      {/* Mobile Sidebar section */}
      <ResponsiveMenu 
        open={open} 
        setOpen={setOpen}
        isAuthenticated={true} 
        user={user} 
        navItems={menuItems} 
        handleLogout={handleLogout}
      />
    </>
  );
};

export default AuthenticatedNavbar;
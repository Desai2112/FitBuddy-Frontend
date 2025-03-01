import React, { useState } from "react";
import { FaDumbbell } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import ResponsiveMenu from "./ResponsiveMenu";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AuthenticatedNavbar = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
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
    if (dropdownOpen) setDropdownOpen(false);
  };
  
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);
  
  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white z-40 shadow-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="container flex justify-between items-center py-4"
        >
          {/* Logo section */}
          <div className="text-2xl flex items-center gap-2 font-bold uppercase">
            <FaDumbbell />
            <p>FIT</p>
            <p className="text-secondary">BUDDY</p>
          </div>
          
          {/* Menu section with updated menu items */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="inline-block py-1 px-3 hover:text-primary font-semibold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Icons section - for authenticated users */}
          <div className="flex items-center gap-4">
            {/* User Profile Dropdown */}
            <div className="relative hidden md:block">
              <div 
                className="flex items-center gap-2 cursor-pointer" 
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  {user?.avatar || <CgProfile className="text-xl" />}
                </div>
                <span className="font-semibold">{user?.name || "User"}</span>
                <IoMdArrowDropdown className={`text-xl transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </div>
              
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Dashboard
                  </a>
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                  <hr className="my-1" />
                  <a href="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile hamburger Menu section */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <MdMenu className="text-4xl" />
          </div>
        </motion.div>
      </nav>

      {/* Mobile Sidebar section */}
      <ResponsiveMenu 
        open={open} 
        setOpen={setOpen}
        isAuthenticated={true} 
        user={user} 
        navItems={menuItems} 
      />
    </>
  );
};

export default AuthenticatedNavbar;
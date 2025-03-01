import React from "react";
import { FaDumbbell } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { motion } from "framer-motion";
import ResponsiveMenu from "./ResponsiveMenu";

// Updated navigation menu to match the landing page sections
const updatedNavbarMenu = [
  { id: 1, title: "Home", link: "#home" },
  { id: 2, title: "Features", link: "#features" },
  { id: 3, title: "Banner", link: "#banner" },
  { id: 4, title: "Reviews", link: "#review" }
];

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  // Function to handle smooth scrolling
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    
    // Special case for home - scroll to top
    if (targetId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Get the navbar height to offset the scrolling
        const navbarHeight = document.querySelector('nav').offsetHeight;
        
        window.scrollTo({
          // Subtract navbar height from the scroll position to prevent content hiding behind navbar
          top: targetElement.offsetTop - navbarHeight,
          behavior: "smooth"
        });
      }
    }
    
    // Close mobile menu if open
    if (open) setOpen(false);
  };

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
          {/* Menu section */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-gray-600">
              {updatedNavbarMenu.map((item) => {
                // Extract the id without the # for the scrolling function
                const targetId = item.link.replace('#', '');
                return (
                  <li key={item.id}>
                    <a
                      href={item.link}
                      onClick={(e) => handleScrollTo(e, targetId)}
                      className="inline-block py-1 px-3 hover:text-primary font-semibold"
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Icons section */}
          <div className="flex items-center gap-4">
            <button className="hover:bg-primary text-primary font-semibold hover:text-white rounded-md border-2 border-primary px-6 py-2 duration-200 hidden md:block">
              Login
            </button>
          </div>
          {/* Mobile hamburger Menu section */}
          <div className="md:hidden" onClick={() => setOpen(!open)}>
            <MdMenu className="text-4xl" />
          </div>
        </motion.div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20"></div>

      {/* Mobile Sidebar section */}
      <ResponsiveMenu open={open} navItems={updatedNavbarMenu} handleScrollTo={handleScrollTo} />
    </>
  );
};

export default Navbar;
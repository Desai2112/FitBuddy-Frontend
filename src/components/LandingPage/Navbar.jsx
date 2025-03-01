import React from "react";
import { Link } from "react-router-dom";
import { GiWeightLiftingUp } from "react-icons/gi";
import { MdMenu } from "react-icons/md";
import { IoFitnessOutline, IoNewspaperOutline } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { HiOutlineLogin } from "react-icons/hi";
import { motion } from "framer-motion";
import ResponsiveMenu from "./ResponsiveMenu";

const professionalMenu = [
  { id: 1, title: "Home", link: "#home", icon: <AiFillHome /> },
  { id: 2, title: "Features", link: "#features", icon: <IoFitnessOutline /> },
  { id: 3, title: "Blog", link: "#banner", icon: <IoNewspaperOutline /> },
  { id: 4, title: "Review", link: "#review", icon: <FaRegComments /> }
];

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

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

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector("nav").offsetHeight;
        window.scrollTo({
          top: targetElement.offsetTop - navbarHeight,
          behavior: "smooth"
        });
      }
    }
    if (open) setOpen(false);
  };

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
            <div className="hidden md:flex items-center gap-14">
              {professionalMenu.map((item) => {
                const targetId = item.link.replace("#", "");
                return (
                  <motion.a
                    key={item.id}
                    href={item.link}
                    onClick={(e) => handleScrollTo(e, targetId)}
                    className={`relative group flex items-center gap-2 text-base font-medium ${
                      scrolled ? "text-gray-700" : "text-gray-800"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className={`text-xl ${
                      scrolled ? "text-[#0fa2b2]" : "text-[#0dcfcf]"
                    }`}>
                      {item.icon}
                    </span>
                    {item.title}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0dcfcf] to-[#0fa2b2] group-hover:w-full"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                );
              })}
            </div>

            {/* Login Button */}
            <div className="hidden md:block">
              <Link to="/login">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 15px -3px rgba(13, 207, 207, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-7 py-3 rounded-full text-base font-medium transition-all duration-300 ${
                    scrolled
                      ? "bg-gradient-to-r from-[#0dcfcf] to-[#0fa2b2] text-white"
                      : "bg-white text-[#0fa2b2] shadow-md hover:shadow-lg"
                  }`}
                >
                  <HiOutlineLogin className="text-xl" />
                  Login
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Icon */}
            <motion.div
              className="md:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(!open)}
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

      {/* Mobile Sidebar */}
      <ResponsiveMenu open={open} navItems={professionalMenu} handleScrollTo={handleScrollTo} />
    </>
  );
};

export default Navbar;

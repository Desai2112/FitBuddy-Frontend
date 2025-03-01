import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Clock, Users, MessageSquare, Info, Heart, Award } from 'lucide-react';

const Footer = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Enhanced snake-like path for animated lines
  const snakePath = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.7,
      transition: { 
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated floating bubbles */}
        <motion.div 
          className="w-24 h-24 rounded-full bg-opacity-10 absolute"
          style={{ backgroundColor: '#0dcfcf', top: '15%', left: '5%' }}
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="w-32 h-32 rounded-full bg-opacity-10 absolute"
          style={{ backgroundColor: '#0fa2b2', top: '60%', right: '10%' }}
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="w-20 h-20 rounded-full bg-opacity-10 absolute"
          style={{ backgroundColor: '#FF4D6D', bottom: '10%', left: '25%' }}
          animate={{
            x: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Snaking lines */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path
            d="M0,100 C150,50 250,150 400,100 C550,50 650,150 800,100"
            stroke="#0dcfcf"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.3"
            fill="transparent"
            initial="hidden"
            animate="visible"
            variants={snakePath}
          />
          <motion.path
            d="M0,200 C150,250 250,150 400,200 C550,250 650,150 800,200"
            stroke="#0fa2b2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.3"
            fill="transparent"
            initial="hidden"
            animate="visible"
            variants={snakePath}
            style={{ animationDelay: "1s" }}
          />
          <motion.path
            d="M0,300 C100,350 300,250 500,300 C700,350 800,250 900,300"
            stroke="#FF4D6D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.3"
            fill="transparent"
            initial="hidden"
            animate="visible"
            variants={snakePath}
            style={{ animationDelay: "2s" }}
          />
          <motion.path
            d="M100,350 C200,300 300,400 400,350 C500,300 600,400 700,350"
            stroke="#0dcfcf"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.3"
            fill="transparent"
            initial="hidden"
            animate="visible"
            variants={snakePath}
            style={{ animationDelay: "3s" }}
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {/* Logo and Social */}
          <motion.div variants={fadeInUp} className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">FitBuddy</h2>
            <p className="text-gray-400 mb-4">Your personal companion on the journey to a healthier, stronger you.</p>
            <motion.div 
              className="flex space-x-4"
              variants={staggerContainer}
            >
              <motion.a variants={fadeInUp} href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </motion.a>
              <motion.a variants={fadeInUp} href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </motion.a>
              <motion.a variants={fadeInUp} href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* About Column */}
          <motion.div variants={fadeInUp} className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-400">
                <Info size={16} className="mt-1 mr-2 flex-shrink-0" style={{ color: '#0dcfcf' }} />
                <span className="text-sm">Founded in 2018 with a mission to make fitness accessible to everyone</span>
              </li>
              <li className="flex items-start text-gray-400">
                <Heart size={16} className="mt-1 mr-2 flex-shrink-0" style={{ color: '#FF4D6D' }} />
                <span className="text-sm">Committed to improving the health and wellbeing of our community</span>
              </li>
              <li className="flex items-start text-gray-400">
                <Award size={16} className="mt-1 mr-2 flex-shrink-0" style={{ color: '#0fa2b2' }} />
                <span className="text-sm">Award-winning fitness programs designed by certified experts</span>
              </li>
              <li>
                <motion.a 
                  href="#"
                  className="text-sm inline-block mt-3 text-white"
                  style={{ color: '#0dcfcf' }}
                  whileHover={{ x: 5 }}
                >
                  Learn more about our story →
                </motion.a>
              </li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp} className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Programs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Nutrition</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp} className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" style={{ color: '#0dcfcf' }} />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" style={{ color: '#0dcfcf' }} />
                <span>info@fitbuddy.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2" style={{ color: '#0dcfcf' }} />
                <span>123 Fitness Street, Workout City</span>
              </li>
              <li className="flex items-center text-gray-400 mt-4">
                <Clock size={16} className="mr-2" style={{ color: '#0dcfcf' }} />
                <span>Monday-Friday: 8am-8pm<br />Weekends: 9am-6pm</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Simple copyright footer with updated colors */}
        <div className="text-sm text-gray-400 text-center mt-12 pt-6 border-t border-gray-800">
          © {new Date().getFullYear()} FitBuddy. All rights reserved. 
          <span className="mx-2">•</span>
          <a href="#" className="hover:text-white" style={{ color: '#0dcfcf' }}>Privacy</a>
          <span className="mx-2">•</span>
          <a href="#" className="hover:text-white" style={{ color: '#0dcfcf' }}>Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
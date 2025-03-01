import React, { useState } from "react";
import AuthenticatedNavbar from "../../components/LandingPage/AuthenticatedNavbar";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { GiBiceps, GiWeightLiftingUp } from "react-icons/gi";
import { FaRobot, FaCalculator, FaUtensils, FaVideo, FaLanguage, FaWhatsapp, FaBookMedical } from "react-icons/fa";
import { MdVideoCall, MdCalendarToday } from "react-icons/md";
import { IoFitnessOutline, IoFootstepsOutline } from "react-icons/io5";
import { BiFoodMenu } from "react-icons/bi";
import { RiCommunityLine } from "react-icons/ri";
import Footer from "../../components/LandingPage/Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      id: 1,
      title: "AI FitBuddy Chat",
      icon: <FaRobot className="text-4xl" />,
      description: "Get instant wellness guidance from our AI assistant",
      color: "#0dcfcf",
      link: "/chatbot"
    },
    {
      id: 2,
      title: "Video Consultation",
      icon: <MdVideoCall className="text-4xl" />,
      description: "Connect with healthcare professionals virtually",
      color: "#0fa2b2",
      link: "/consultation"
    },
    {
      id: 3,
      title: "BMI Calculator",
      icon: <FaCalculator className="text-4xl" />,
      description: "Track your Body Mass Index and health metrics",
      color: "#FF4D6D",
      link: "/bmi-calculator"
    },
    {
      id: 4,
      title: "Exercise Guide",
      icon: <IoFitnessOutline className="text-4xl" />,
      description: "Follow personalized workout plans",
      color: "#0dcfcf",
      link: "/exercise-guide"
    },
    {
      id: 5,
      title: "3D Exercise Models",
      icon: <GiBiceps className="text-4xl" />,
      description: "Interactive 3D demonstrations of exercises",
      color: "#0fa2b2",
      link: "/3d-models"
    },
    {
      id: 6,
      title: "Meal Planner",
      icon: <BiFoodMenu className="text-4xl" />,
      description: "Get customized diet and nutrition plans",
      color: "#FF4D6D",
      link: "/meal-planner"
    },
    {
      id: 7,
      title: "Recipe Generator",
      icon: <FaUtensils className="text-4xl" />,
      description: "Discover healthy and delicious recipes",
      color: "#0fa2b2",
      link: "/recipes"
    }
  ];

  const additionalFeatures = [
    {
      id: 9,
      title: "Community",
      icon: <RiCommunityLine className="text-3xl" />,
      description: "Join our wellness community",
      color: "#0dcfcf"
    },
    {
      id: 10,
      title: "FitSnaps",
      icon: <FaVideo className="text-3xl" />,
      description: "Quick video tips from experts",
      color: "#0fa2b2"
    },
    {
      id: 11,
      title: "Multi-Language",
      icon: <FaLanguage className="text-3xl" />,
      description: "Available in multiple languages",
      color: "#FF4D6D"
    },
    {
      id: 12,
      title: "WhatsApp Reminders",
      icon: <FaWhatsapp className="text-3xl" />,
      description: "Stay on track with reminders",
      color: "#0dcfcf"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <AuthenticatedNavbar />
      
      {/* Enhanced Hero Section with Amazing Animations */}
      <section className="relative min-h-[30vh] bg-gradient-to-br from-[#0dcfcf] via-[#0fa2b2] to-[#0dcfcf] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Animated 3D Grid */}
          <div className="absolute inset-0 perspective-1000">
            <motion.div 
              className="absolute inset-0"
              style={{ 
                backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                transformStyle: 'preserve-3d'
              }}
              animate={{
                rotateX: [0, 10, 0],
                rotateY: [0, 15, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Dynamic Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: 0.3
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-20, 20, -20],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}

          {/* Enhanced Animated Circles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full mix-blend-overlay backdrop-blur-sm"
              style={{
                width: `${Math.random() * 400 + 200}px`,
                height: `${Math.random() * 400 + 200}px`,
                background: `radial-gradient(circle, ${
                  i % 3 === 0 ? '#0dcfcf' : i % 3 === 1 ? '#0fa2b2' : '#FF4D6D'
                } 0%, transparent 70%)`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.2
              }}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                rotate: [0, 360, 0]
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Animated Wave Lines */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {[...Array(5)].map((_, i) => (
              <motion.path
                key={i}
                d={`M0,${50 + i * 30} C${300 + i * 50},${150 + i * 20} ${600 + i * 30},${50 - i * 30} 1000,${100 + i * 40}`}
                stroke={`rgba(255,255,255,${0.3 - i * 0.05})`}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1],
                  opacity: [0, 0.5, 0],
                  y: [0, -20, 0]
                }}
                transition={{ 
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </svg>
        </div>

        {/* Enhanced Content with 3D Animations */}
        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              className="mb-8 inline-block perspective-1000"
            >
              <motion.div 
                className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-6 relative"
                animate={{
                  rotateY: [0, 360],
                  boxShadow: [
                    "0 0 20px rgba(255,255,255,0.2)",
                    "0 0 40px rgba(255,255,255,0.4)",
                    "0 0 20px rgba(255,255,255,0.2)"
                  ]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <GiWeightLiftingUp className="text-6xl text-white" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "2px solid rgba(255,255,255,0.2)"
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.h1 
              className="text-7xl font-bold mb-6 relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="inline-block">
                Your Digital Wellness Journey
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </span>
            </motion.h1>

            <motion.p 
              className="text-2xl mb-12 text-white/90"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Experience comprehensive healthcare with AI-powered guidance,
              <br />personalized plans, and expert support.
            </motion.p>
            
            <motion.div 
              className="flex gap-8 justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(255,255,255,0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#0fa2b2] px-12 py-5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Chat with FitBuddy</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#0dcfcf] to-[#0fa2b2] opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                />
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(255,255,255,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-12 py-5 rounded-full font-semibold hover:bg-white hover:text-[#0fa2b2] transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Book Consultation</span>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-1"
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section with Adjusted Height */}
      <section className="py-16 relative overflow-hidden bg-white">
        {/* Enhanced Background Animations */}
        <div className="absolute inset-0">
          {/* Animated Grid */}
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(13,207,207,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />

          {/* Floating Shapes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: `${Math.random() * 60 + 20}px`,
                height: `${Math.random() * 60 + 20}px`,
                borderRadius: i % 2 === 0 ? '50%' : '30%',
                border: `2px solid ${i % 3 === 0 ? '#0dcfcf' : i % 3 === 1 ? '#0fa2b2' : '#FF4D6D'}`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.2
              }}
              animate={{
                y: [0, -30 * (i + 1), 0],
                x: [0, 20 * (i + 1), 0],
                rotate: [0, 360, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Animated Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {[...Array(5)].map((_, i) => (
              <motion.path
                key={i}
                d={`M${-100 + i * 50},${200 + i * 30} C${300 + i * 50},${100 + i * 20} ${600 + i * 30},${300 - i * 30} ${1000 + i * 50},${200 + i * 40}`}
                stroke={i % 3 === 0 ? '#0dcfcf' : i % 3 === 1 ? '#0fa2b2' : '#FF4D6D'}
                strokeWidth="1"
                strokeOpacity="0.2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity }}
              />
            ))}
                  </svg>

          {/* Particle Effect */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#0dcfcf]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.3
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
            </div>

        {/* Content */}
        <div className="container mx-auto text-center mb-12 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 text-[#040404]"
          >
            Comprehensive Wellness Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Transform your wellness journey with our powerful features
          </motion.p>
            </div>

        <div className="relative w-full h-[450px] overflow-hidden">
          {/* Main curved path */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 600">
            <motion.path
              d="M0,300 C300,500 900,100 1200,300"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeDasharray="8,8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0dcfcf" />
                <stop offset="50%" stopColor="#0fa2b2" />
                <stop offset="100%" stopColor="#FF4D6D" />
              </linearGradient>
            </defs>
                  </svg>

          {/* Feature icons along the curve */}
          {features.map((feature, index) => {
            const progress = index / (features.length - 1);
            const x = 100 + (progress * 1000);
            const y = 300 + Math.sin(progress * Math.PI) * (-200 + (index % 2) * 40);

            return (
              <motion.div
                key={feature.id}
                className="absolute"
                style={{ 
                  left: `${x}px`, 
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.2 }}
                whileHover={{ scale: 1.1 }}
              >
                <div 
                  className="relative group cursor-pointer"
                  onClick={() => navigate(feature.link)}
                >
                  {/* Feature icon circle */}
                  <div 
                    className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center relative z-10"
                    style={{ color: feature.color }}
                  >
                    {feature.icon}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ 
                        background: `linear-gradient(135deg, ${feature.color}22, ${feature.color}11)`,
                        border: `2px solid ${feature.color}33`
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0.5, 0.7]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>

                  {/* Tooltip */}
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-4 rounded-xl shadow-xl -translate-x-1/2 left-1/2 min-w-[200px] z-20"
                    style={{ 
                      top: index % 2 === 0 ? '120%' : '-120%',
                      border: `2px solid ${feature.color}22`
                    }}
                  >
                    <h3 className="font-bold text-lg mb-1" style={{ color: feature.color }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
                </div>
              </motion.div>
            );
          })}

          {/* Featured box */}
          <motion.div
            className="absolute right-12 top-12 bg-white p-6 rounded-xl shadow-xl max-w-xs"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex items-center mb-3">
              <div className="text-3xl mr-3" style={{ color: "#0dcfcf" }}>
                <FaRobot />
              </div>
              <h3 className="font-bold text-lg text-gray-800">AI FitBuddy</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Get personalized wellness guidance, track your progress, and achieve your fitness goals with our AI-powered assistant.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 w-full py-2 rounded-lg font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #0dcfcf, #0fa2b2)" }}
              onClick={() => navigate('/chatbot')}
            >
              Try Now
            </motion.button>
          </motion.div>
              </div>
      </section>

      {/* Lighter Community Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#b4f3f3] to-[#aee6ee]">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)"
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          {/* Floating Elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 150 + 50}px`,
                height: `${Math.random() * 150 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.1
              }}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, Math.random() * 30 - 15, 0],
                y: [0, Math.random() * 30 - 15, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
                ))}
              </div>

        {/* Rest of community section content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div className="text-[#2a5757]"> {/* Darker text for better contrast */}
              <h2 className="text-4xl font-bold mb-6">Join Our Fitness Community</h2>
              <p className="text-xl mb-8">Connect with fitness enthusiasts, share your journey, and get inspired by success stories.</p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-2">10K+</h3>
                  <p className="text-sm">Active Members</p>
            </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-2">5K+</h3>
                  <p className="text-sm">Success Stories</p>
          </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-2">500+</h3>
                  <p className="text-sm">Expert Trainers</p>
                </div>
                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-2">1000+</h3>
                  <p className="text-sm">Daily Posts</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#0fa2b2] px-8 py-3 rounded-full font-semibold shadow-lg"
              >
                Join Community
              </motion.button>
            </motion.div>

            {/* Right Column - Interactive Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px]"
            >
              {/* Floating Cards */}
              <motion.div
                className="absolute top-0 right-0 bg-white p-6 rounded-xl shadow-xl w-64"
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0dcfcf] flex items-center justify-center text-white">
                    <FaVideo className="text-xl" />
              </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">Live Sessions</h4>
                    <p className="text-sm text-gray-600">Join daily workouts</p>
                      </div>
                    </div>
              </motion.div>

              <motion.div
                className="absolute top-1/3 left-0 bg-white p-6 rounded-xl shadow-xl w-64"
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FF4D6D] flex items-center justify-center text-white">
                    <RiCommunityLine className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">Community Posts</h4>
                    <p className="text-sm text-gray-600">Share your progress</p>
              </div>
            </div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 right-1/4 bg-white p-6 rounded-xl shadow-xl w-64"
                animate={{ y: [0, 15, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 7, repeat: Infinity }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#0fa2b2] flex items-center justify-center text-white">
                    <IoFitnessOutline className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">Fitness Challenges</h4>
                    <p className="text-sm text-gray-600">Weekly competitions</p>
              </div>
            </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
        
      <Footer />
    </div>
  );
};

export default Dashboard;
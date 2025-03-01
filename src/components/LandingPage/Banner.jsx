import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <motion.div 
      className="w-full bg-gradient-to-br from-slate-50 to-green-50 py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="w-full max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side with image and animated elements */}
          <motion.div 
            className="relative w-full md:w-1/2 h-96 md:h-[500px]"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
          >
            {/* Animated background elements */}
            <motion.div className="absolute inset-0 z-0">
              <motion.div 
                className="absolute top-0 left-10 w-4/5 h-4/5 rounded-full border-8 border-slate-200 opacity-50"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                  scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              <motion.div 
                className="absolute top-20 right-10 w-3/5 h-3/5 rounded-full border-8 border-blue-100 opacity-40"
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              <motion.div 
                className="absolute bottom-10 left-20 w-2/5 h-2/5 rounded-full border-8 border-emerald-100 opacity-30"
                animate={{ 
                  rotate: 180,
                  scale: [1, 1.15, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </motion.div>
            
            {/* Workout Completion indicator */}
            <motion.div 
              className="absolute top-10 left-10 bg-white p-4 rounded-xl shadow-lg z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, type: "spring" }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
            >
              <div className="flex items-center justify-center">
                <div className="relative h-16 w-16">
                  <div className="text-xs text-gray-500 text-center mb-1">Workout</div>
                  <svg viewBox="0 0 36 36" className="h-14 w-14">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="3"
                    />
                    <motion.path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      strokeDasharray="100, 100"
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
                    />
                  </svg>
                  <motion.div 
                    className="absolute top-1/2 left-0 w-full h-full flex items-center justify-center font-bold text-blue-600 text-lg mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                  >
                    100%
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Fitness Analytics card */}
            <motion.div 
              className="absolute bottom-10 right-10 bg-white p-4 rounded-xl shadow-lg z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7, type: "spring" }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
            >
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Fitness Stats</span>
                <span className="text-sm font-semibold text-gray-700">Weekly Progress</span>
                <svg className="h-10 w-24 mt-1" viewBox="0 0 100 30">
                  <motion.path 
                    d="M0,15 L10,18 L20,10 L30,20 L40,15 L50,25 L60,5 L70,15 L80,10 L90,5 L100,15" 
                    fill="none" 
                    stroke="#4F46E5" 
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                </svg>
              </div>
            </motion.div>
            
            {/* Main image container */}
            <motion.div 
              className="relative z-0 rounded-full bg-gradient-to-br from-slate-100 to-blue-50 w-4/5 h-4/5 overflow-hidden mx-auto shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)" 
              }}
            >
              <div className="h-full w-full flex items-center justify-center">
                <motion.div
                  className="w-full h-full bg-gradient-to-r from-slate-200/20 to-blue-200/20 absolute"
                  animate={{ 
                    background: [
                      "linear-gradient(to right, rgba(226, 232, 240, 0.2), rgba(191, 219, 254, 0.2))",
                      "linear-gradient(to right, rgba(191, 219, 254, 0.2), rgba(226, 232, 240, 0.2))",
                      "linear-gradient(to right, rgba(226, 232, 240, 0.2), rgba(191, 219, 254, 0.2))"
                    ]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zml0bmVzcyUyMHRyYWluZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
                  alt="Fitness person stretching" 
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right side with text content */}
          <motion.div 
            className="w-full md:w-1/2 text-left"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-800"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"
                animate={{ 
                  backgroundPosition: ['0% center', '100% center', '0% center'] 
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                The Importance Of Taking Care Of Yourself
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-gray-700 text-xl mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Your body is your temple and taking care of it should be your top priority. 
              Our fitness programs are designed to help you achieve your personal health goals 
              while maintaining balance in your life. With customized workouts and nutrition plans, 
              we guide you toward a healthier lifestyle that fits your unique needs.
            </motion.p>
            
            <motion.button 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-4 px-10 rounded-lg shadow-xl text-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                backgroundPosition: '100% center',
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.6, 
                duration: 0.8,
                backgroundPosition: {
                  duration: 0.8,
                  ease: "easeInOut"
                }
              }}
            >
              Explore More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
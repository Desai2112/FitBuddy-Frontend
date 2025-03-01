import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  // Simplified container animation with reduced timing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };
  
  // Left side content animation - simplified
  const leftContentVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  const textBackgroundVariants = {
    hidden: { width: "0%" },
    visible: { 
      width: "100%",
      transition: { duration: 0.8, ease: "easeInOut", delay: 0.3 }
    }
  };
  
  // Right side image animation - simplified
  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.2 }
    }
  };
  
  // Card variants with reduced animation
  const cardVariants = (delay = 0) => ({
    hidden: { y: 15, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut", delay: 0.5 + delay }
    }
  });
  
  // Simplified floating animations with reduced movement
  const createFloatingAnimation = (yRange, duration, delay = 0) => ({
    y: yRange,
    transition: {
      duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay
    }
  });

  // Distinct floating animations for each card - reduced movement
  const floatingAnimations = {
    aiCoach: createFloatingAnimation([-3, 0, -3], 4, 0),
    mealPlans: createFloatingAnimation([0, 3, 0], 4.5, 1.2),
    bmiCalculator: createFloatingAnimation([-3, 1, -3], 4.2, 0.8),
    community: createFloatingAnimation([1, -2, 1], 3.8, 1.5),
    recipeGenerator: createFloatingAnimation([-2, 2, -2], 4.7, 0.5),
  };

  // Reduced number of background particles
  const generateParticles = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
  };

  const particles = generateParticles(15); // Reduced from 30 to 15

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Reduced abstract shapes with simpler animations */}
        <motion.div 
          className="absolute top-20 left-20 w-48 h-48 rounded-full opacity-15"
          style={{ background: 'linear-gradient(135deg, #0eab8f 0%, #0ba380 100%)' }}
          animate={{
            scale: [1, 1.05, 1],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute bottom-16 left-40 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'linear-gradient(135deg, #0ba380 0%, #0eab8f 100%)' }}
          animate={{
            scale: [1.05, 1, 1.05],
            transition: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        />
        
        {/* Reduced geometric elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-32 h-32 opacity-10"
          style={{ 
            background: 'linear-gradient(135deg, #0eab8f 0%, #0ba380 100%)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
          }}
          animate={{
            borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '50% 50% 50% 50% / 50% 50% 50% 50%', '30% 70% 70% 30% / 30% 30% 70% 70%'],
            rotate: [0, 180, 360],
            transition: { duration: 20, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Simplified particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.size > 2 ? 'linear-gradient(135deg, #0eab8f 0%, #0ba380 100%)' : '#0ba380',
              opacity: particle.size > 2 ? 0.15 : 0.1
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Enhanced dotted pattern with animation - reduced opacity */}
        <motion.div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle, #0ba380 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.03
          }}
          animate={{
            backgroundPosition: ['0% 0%', '1% 1%', '0% 0%'],
            transition: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Animated wave pattern - simplified */}
        <svg className="absolute bottom-0 left-0 w-full opacity-8" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <motion.path 
            initial={{ d: "M0,320L48,288C96,256,192,192,288,186.7C384,181,480,235,576,245.3C672,256,768,224,864,224C960,224,1056,256,1152,261.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
            animate={{ 
              d: [
                "M0,320L48,288C96,256,192,192,288,186.7C384,181,480,235,576,245.3C672,256,768,224,864,224C960,224,1056,256,1152,261.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,320L48,304C96,288,192,256,288,234.7C384,213,480,203,576,213.3C672,224,768,256,864,261.3C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ],
              transition: { duration: 30, repeat: Infinity, ease: "easeInOut" }
            }}
            fill="#0ba380"
          />
        </svg>
        
        {/* Removed animated grid lines */}
      </div>
      
      {/* Hero Section with adjusted padding */}
      <div className="container mx-auto px-10 md:px-16 py-16 flex flex-col lg:flex-row items-center min-h-screen relative z-10">
        {/* Left Content with adjusted padding */}
        <motion.div 
          className="w-full lg:w-1/2 lg:pr-8 mb-12 lg:mb-0 pl-2 md:pl-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="relative mb-8" variants={leftContentVariants}>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight relative z-10 text-gray-800"
            >
              Eat clean, <br/>
              <span className="relative inline-block">
                <motion.div 
                  className="absolute inset-0 opacity-50 -z-10 rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #0eab8f 0%, #0ba380 100%)' }}
                  variants={textBackgroundVariants}
                />
                <span style={{ color: '#0ba380' }}>stay lean</span>
              </span> <br className="hidden md:block" />live the dream!
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-gray-600 mb-10 max-w-md text-lg"
            variants={leftContentVariants}
          >
            Transform your wellness journey with FitBuddy - personalized AI coaching that adapts to your unique fitness goals.
          </motion.p>
          
          <motion.div 
            className="flex items-center gap-4 flex-wrap mb-12"
            variants={leftContentVariants}
          >
            <motion.button 
              className="px-6 py-3 text-white font-bold rounded-md transition duration-300 text-base"
              style={{ background: 'linear-gradient(135deg, #0eab8f 0%, #0ba380 100%)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Today
            </motion.button>
            
            <motion.div 
              className="flex items-center gap-3 font-medium cursor-pointer text-base"
              whileHover={{ scale: 1.05 }}
            >
              <span 
                className="flex items-center justify-center w-10 h-10 rounded-full text-lg"
                style={{ 
                  background: 'rgba(14, 171, 143, 0.1)',
                  color: '#0eab8f'
                }}
              >
                &#9658;
              </span>
              <span className="text-gray-700">Watch Demo</span>
            </motion.div>
          </motion.div>
          
          {/* Info card with reduced animation */}
          <motion.div 
            className="bg-white p-5 rounded-lg shadow-lg max-w-md relative overflow-hidden"
            variants={cardVariants(0)}
            whileHover={{
              boxShadow: "0px 10px 15px rgba(14, 171, 143, 0.15)",
              transition: { duration: 0.3 }
            }}
          >
            {/* Card background accent - simplified */}
            <motion.div 
              className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-10"
              style={{ background: 'linear-gradient(135deg, #0eab8f 0%, #0ba380 100%)' }}
            />
            
            <div className="flex items-center gap-3 mb-3 relative z-10">
              <div 
                className="p-2 rounded-full" 
                style={{ background: 'rgba(14, 171, 143, 0.1)' }}
              >
                <span className="text-xl inline-block">⚡</span>
              </div>
              <div className="font-semibold" style={{ color: '#0eab8f' }}>Get Started in Minutes</div>
            </div>
            <p className="text-gray-600 text-sm relative z-10">
              Sign up, answer a few questions about your goals, and receive your personalized fitness plan instantly.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Right Image with Cards - adjusted positioning */}
        <motion.div 
          className="w-full lg:w-1/2 relative pr-2 md:pr-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Simplified Background Circle */}
          <motion.div 
            className="absolute w-72 h-72 rounded-full z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            variants={imageVariants}
            style={{ 
              background: 'linear-gradient(135deg, #0eab8f 0%, #0ba380 100%)',
              opacity: 0.2
            }}
          />
          
          {/* Single animated ring around the main image */}
          <motion.div 
            className="absolute w-80 h-80 rounded-full border-2 border-dashed z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ borderColor: 'rgba(14, 171, 143, 0.1)' }}
            animate={{ 
              rotate: [0, 360],
              transition: { duration: 50, repeat: Infinity, ease: "linear" }
            }}
          />
          
          {/* Main Image with simplified animation */}
          <motion.div 
            className="relative z-10 flex justify-center"
            variants={imageVariants}
          >
            <motion.div 
              className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-xl"
              whileHover={{ 
                boxShadow: "0px 0px 20px rgba(14, 171, 143, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zml0bmVzcyUyMHRyYWluZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                alt="Fitness Trainer" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
          
          {/* REPOSITIONED CARDS WITH PROPER SPACING */}
          {/* AI Coach Card */}
          <motion.div 
            className="absolute top-0 right-8 md:right-12 bg-white p-3 rounded-lg shadow-lg z-20"
            variants={cardVariants(0.2)}
            animate={floatingAnimations.aiCoach}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 15px rgba(14, 171, 143, 0.15)",
              transition: { duration: 0.3 }
            }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{ background: 'rgba(14, 171, 143, 0.1)' }}
              >
                <span style={{ color: '#0eab8f' }} className="text-lg">🤖</span>
              </div>
              <div>
                <div className="font-bold text-gray-800 text-sm">AI Coach</div>
                <div className="text-xs text-gray-500">Book Appointment</div>
              </div>
            </div>
          </motion.div>
          
          {/* Meal Plans Card - repositioned to avoid overlap */}
          <motion.div 
            className="absolute bottom-24 left-0 md:left-4 bg-white p-3 rounded-lg shadow-lg z-20 w-44"
            variants={cardVariants(0.4)}
            animate={floatingAnimations.mealPlans}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 15px rgba(14, 171, 143, 0.15)",
              transition: { duration: 0.3 }
            }}
          >
            <div className="text-gray-800 font-medium text-sm mb-2">Meal Plans</div>
            <div className="flex flex-wrap gap-1">
              <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs"
                 style={{ background: 'rgba(14, 171, 143, 0.1)' }}>
                🥗
              </div>
              <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs"
                 style={{ background: 'rgba(14, 171, 143, 0.2)' }}>
                🍎
              </div>
              <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs"
                 style={{ background: 'rgba(14, 171, 143, 0.1)' }}>
                🍗
              </div>
              <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs"
                 style={{ background: 'rgba(14, 171, 143, 0.2)' }}>
                🥚
              </div>
              <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs"
                 style={{ background: 'rgba(14, 171, 143, 0.1)' }}>
                🥑
              </div>
              <div className="w-7 h-7 rounded-md flex items-center justify-center text-xs"
                 style={{ background: 'rgba(14, 171, 143, 0.2)' }}>
                🍓
              </div>
            </div>
          </motion.div>
          
          {/* BMI Calculator Card */}
          <motion.div 
            className="absolute bottom-4 right-4 md:right-8 bg-white p-3 rounded-lg shadow-lg z-20 w-44"
            variants={cardVariants(0.6)}
            animate={floatingAnimations.bmiCalculator}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 15px rgba(14, 171, 143, 0.15)",
              transition: { duration: 0.3 }
            }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(14, 171, 143, 0.1)' }}
              >
                <span style={{ color: '#0ba380' }} className="text-sm">📊</span>
              </div>
              <div>
                <div className="font-medium text-sm">BMI Calculator</div>
                <div className="text-xs text-gray-500">Personalized</div>
              </div>
            </div>
            <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full w-3/5"
                style={{ background: 'linear-gradient(90deg, #0eab8f 0%, #0ba380 100%)' }}
              />
            </div>
          </motion.div>
          
          {/* Community Card */}
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 bg-white p-3 rounded-lg shadow-lg z-20"
            variants={cardVariants(0.8)}
            animate={floatingAnimations.community}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 15px rgba(14, 171, 143, 0.15)",
              transition: { duration: 0.3 }
            }}
          >
            <div className="text-sm font-medium mb-1" style={{ color: '#0eab8f' }}>FitBuddy Community</div>
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white text-xs" 
                     style={{ background: '#0eab8f' }}>JM</div>
              </div>
              <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white text-xs"
                     style={{ background: '#0ba380' }}>KL</div>
              </div>
              <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white text-xs"
                     style={{ background: '#0eab8f' }}>TW</div>
              </div>
              <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden">
                <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white text-xs">+5</div>
              </div>
            </div>
          </motion.div>
          
          {/* Recipe Generator Card */}
          <motion.div 
            className="absolute top-12 left-4 md:left-8 bg-white p-3 rounded-lg shadow-lg z-20"
            variants={cardVariants(1.0)}
            animate={floatingAnimations.recipeGenerator}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 15px rgba(14, 171, 143, 0.15)",
              transition: { duration: 0.3 }
            }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(14, 171, 143, 0.1)' }}
              >
                <span className="text-sm">🍽</span>
              </div>
              <div className="text-xs">
                <div className="font-medium">Recipe Generator</div>
                <div className="text-gray-500 text-xs">AI-Powered</div>
              </div>
            </div>
          </motion.div>
          
          {/* Activity Tracker Card - removed as requested */}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
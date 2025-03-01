import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Review = () => {
  // Sample review data
  const reviews = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "6-Month Member",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop",
        rating: 5,
        text: "FitBuddy transformed my fitness journey. The personalized workout plans and supportive community helped me lose 25 pounds and gain confidence I never thought possible!",
        program: "Weight Loss Program"
    },
    {
        id: 2,
        name: "Michael Rodriguez",
        role: "1-Year Member",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
        rating: 5,
        text: "As someone who struggled with consistency, the accountability features and trainer check-ins have been game-changing. I've never stuck with a fitness program this long before.",
        program: "Strength Training"
    },
    {
        id: 3,
        name: "Emma Chang",
        role: "3-Month Member",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
        rating: 4,
        text: "The nutrition guidance alongside the workouts makes this program complete. I've learned so much about fueling my body properly while building muscle.",
        program: "Hybrid Program"
    },
    {
        id: 4,
        name: "David Wilson",
        role: "9-Month Member",
        image: "https://images.unsplash.com/photo-1484863137850-59afcfe05386?w=80&h=80&fit=crop",
        rating: 5,
        text: "After trying countless fitness apps, FitBuddy stands out for its community aspect. The group challenges keep me motivated and the trainers actually care about your progress.",
        program: "Athletic Performance"
    }
];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, reviews.length]);

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const handleDotClick = (index) => {
    setAutoplay(false);
    setCurrentIndex(index);
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const cardVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3 } }
  };

  // Background animation elements - using subtle elements on white
  const backgroundElements = [
    { size: "w-40 h-40", color: "bg-gray-50", opacity: "opacity-30", position: "top-24 left-8", duration: 18 },
    { size: "w-64 h-64", color: "bg-gray-50", opacity: "opacity-20", position: "bottom-12 right-16", duration: 22 },
    { size: "w-48 h-48", color: "bg-gray-50", opacity: "opacity-20", position: "top-48 right-12", duration: 15 },
    { size: "w-32 h-32", color: "bg-gray-50", opacity: "opacity-30", position: "bottom-36 left-24", duration: 20 },
    { size: "w-24 h-24", color: "bg-gray-50", opacity: "opacity-20", position: "top-56 left-40", duration: 16 },
  ];

  return (
    <motion.section 
      className="py-16 overflow-hidden relative bg-white"
      initial={{ backgroundColor: "#FFFFFF" }}
      animate={{ 
        backgroundColor: "#FFFFFF",
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      }}
      transition={{ 
        duration: 25, 
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {backgroundElements.map((el, index) => (
          <motion.div 
            key={index}
            className={`rounded-full ${el.size} ${el.color} ${el.opacity} absolute ${el.position}`}
            animate={{
              scale: [1, 1.05, 1],
              x: [0, index % 2 === 0 ? 30 : -30, 0],
              y: [0, index % 3 === 0 ? 20 : -20, 0],
            }}
            transition={{ 
              duration: el.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        <motion.div 
          className="w-full h-full absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(249, 250, 251, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
              "radial-gradient(circle at 80% 70%, rgba(249, 250, 251, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
              "radial-gradient(circle at 20% 30%, rgba(249, 250, 251, 0.4) 0%, rgba(255, 255, 255, 0) 70%)"
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Additional subtle wave patterns */}
        <svg className="absolute w-full h-32 bottom-0 left-0 opacity-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <motion.path 
            fill="#f9fafb" 
            d="M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,176C672,181,768,171,864,181.3C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            animate={{
              d: [
                "M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,176C672,181,768,171,864,181.3C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,192L48,197.3C96,203,192,213,288,224C384,235,480,245,576,234.7C672,224,768,192,864,176C960,160,1056,160,1152,165.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,176C672,181,768,171,864,181.3C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
        
        <svg className="absolute w-full h-32 top-0 left-0 opacity-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <motion.path 
            fill="#f9fafb" 
            d="M0,128L48,133.3C96,139,192,149,288,144C384,139,480,117,576,112C672,107,768,117,864,144C960,171,1056,213,1152,208C1248,203,1344,149,1392,122.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            animate={{
              d: [
                "M0,128L48,133.3C96,139,192,149,288,144C384,139,480,117,576,112C672,107,768,117,864,144C960,171,1056,213,1152,208C1248,203,1344,149,1392,122.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
                "M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,144C672,139,768,149,864,128C960,107,1056,53,1152,42.7C1248,32,1344,64,1392,80L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
                "M0,128L48,133.3C96,139,192,149,288,144C384,139,480,117,576,112C672,107,768,117,864,144C960,171,1056,213,1152,208C1248,203,1344,149,1392,122.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              ]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-3 text-gray-800"
            variants={itemVariants}
          >
            Success Stories
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-green-500 mx-auto mb-6"
            variants={itemVariants}
          />
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Hear from our community members who have transformed their lives through consistent training and support.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Testimonial Cards */}
          <div className="relative overflow-hidden h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                whileHover={{
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-5">
                  {/* Left side with image - Now with white background */}
                  <div className="col-span-2 bg-white p-8 flex flex-col justify-center items-center text-gray-800">
                    <motion.div 
                      className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-md mb-4"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <img 
                        src={reviews[currentIndex].image} 
                        alt={reviews[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <motion.h3 
                      className="text-xl font-bold text-center"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {reviews[currentIndex].name}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-gray-600 mb-2"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {reviews[currentIndex].role}
                    </motion.p>
                    <motion.div 
                      className="flex justify-center mb-2"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < reviews[currentIndex].rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                        />
                      ))}
                    </motion.div>
                    <motion.span 
                      className="text-xs text-center text-gray-700 font-medium px-3 py-1 bg-gray-100 rounded-full"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {reviews[currentIndex].program}
                    </motion.span>
                  </div>
                  
                  {/* Right side with testimonial */}
                  <div className="col-span-3 p-8 md:p-12 flex flex-col justify-center bg-white border-l border-gray-100">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.2, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Quote className="text-gray-200 w-12 h-12 mb-4" />
                    </motion.div>
                    <motion.p 
                      className="text-gray-700 mb-6 italic leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      "{reviews[currentIndex].text}"
                    </motion.p>
                    
                    {/* Navigation dots */}
                    <div className="flex justify-center md:justify-start space-x-2 mt-auto">
                      {reviews.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handleDotClick(index)}
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${
                            index === currentIndex ? "bg-green-500" : "bg-gray-300"
                          }`}
                          aria-label={`Go to review ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <motion.button
            onClick={handlePrev}
            className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 z-10"
            whileHover={{ scale: 1.1, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          <motion.button
            onClick={handleNext}
            className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 z-10"
            whileHover={{ scale: 1.1, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Call to action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Ready to Start Your Fitness Journey?</h3>
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium rounded-full shadow-md hover:shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Community
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Review;
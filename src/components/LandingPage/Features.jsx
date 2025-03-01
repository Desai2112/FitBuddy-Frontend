import React from "react";
import { FaRobot, FaCalculator, FaVideo, FaDumbbell, FaUsers, FaCalendarCheck, FaUtensils, FaComments } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FeaturesData = [
  {
    id: 1,
    title: "FitBuddy AI",
    description: "Your personal AI fitness assistant.",
    icon: <FaRobot className="w-6 h-6 text-blue-500" />,
    link: "/ai-assistant",
    delay: 0.3,
  },
  {
    id: 2,
    title: "Consultation",
    description: "Get expert advice on your fitness journey.",
    icon: <MdHealthAndSafety className="w-6 h-6 text-blue-500" />,
    link: "/consultation",
    delay: 0.4,
  },
  {
    id: 3,
    title: "Exercise Guide",
    description: "Step-by-step workouts tailored for you.",
    icon: <FaDumbbell className="w-6 h-6 text-blue-500" />,
    link: "/exercise-guide",
    delay: 0.5,
  },
  {
    id: 4,
    title: "BMI Calculator",
    description: "Check your BMI and stay on track.",
    icon: <FaCalculator className="w-6 h-6 text-blue-500" />,
    link: "/bmi-calculator",
    delay: 0.6,
  },
  {
    id: 5,
    title: "Meal Plan",
    description: "Personalized diet plans for your goals.",
    icon: <FaUtensils className="w-6 h-6 text-blue-500" />,
    link: "/meal-plan",
    delay: 0.7,
  },
  {
    id: 6,
    title: "Short Videos",
    description: "Quick and easy fitness tips.",
    icon: <FaVideo className="w-6 h-6 text-blue-500" />,
    link: "/videos",
    delay: 0.8,
  },
  {
    id: 7,
    title: "Appointment",
    description: "Book a session with a fitness expert.",
    icon: <FaCalendarCheck className="w-6 h-6 text-blue-500" />,
    link: "/appointment",
    delay: 0.9,
  },
  {
    id: 8,
    title: "Community",
    description: "Connect with fitness enthusiasts.",
    icon: <FaUsers className="w-6 h-6 text-blue-500" />,
    link: "/community",
    delay: 1.0,
  },
  {
    id: 9,
    title: "Recipe Generator",
    description: "Discover healthy meal recipes.",
    icon: <FaComments className="w-6 h-6 text-blue-500" />,
    link: "/recipes",
    delay: 1.1,
  },
];

const cardVariants = {
  hidden: { 
    opacity: 0,
    x: -50 
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const bgVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const Features = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white z-0"
        variants={bgVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          Features
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-600 mb-10"
        >
          Everything you need for your fitness journey
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {FeaturesData.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: feature.delay }}
            >
              <Link 
                to={feature.link}
                className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group flex flex-col h-full"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                <div className="text-teal-600 text-xs font-medium flex items-center mt-auto">
                  Explore
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight size={14} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaWeight, FaRulerVertical, FaAppleAlt, FaRunning } from "react-icons/fa";
import { BsGenderMale, BsGenderFemale, BsLightningCharge } from "react-icons/bs";
import { IoWaterOutline } from "react-icons/io5";
import { MdOutlineNightlight } from "react-icons/md";
import AuthenticatedNavbar from "./AuthenticatedNavbar";
import axiosInstance from "../../api/axios";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [bmiData, setBmiData] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("diet");

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/api/user/profile");
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const calculateBMI = async (e) => {
    e.preventDefault();
    if (!height || !weight) {
      setError("Please enter both height and weight.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(
        "http://localhost:5000/api/gemini/bmi",
        {
          height: height.toString(),
          weight: weight.toString(),
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        const { bmi, analysis } = response.data.data;
        setBmiData({
          bmi,
          category: analysis.bmi_category,
          healthImplications: analysis.health_implications,
          dietPlan: analysis.diet_plan,
          exercisePlan: analysis.exercise_plan,
          lifestyleChanges: analysis.lifestyle_changes,
        });
        setShowResult(true);

        if (user) {
          await saveBMICalculation(bmi, analysis.bmi_category);
        }
      } else {
        setError(response.data.message || "Failed to fetch BMI data.");
      }
    } catch (error) {
      console.error("Error fetching BMI:", error);
      setError("Failed to connect to the BMI service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveBMICalculation = async (bmiValue, category) => {
    try {
      await axiosInstance.post("/api/user/bmi-history", {
        bmi: bmiValue,
        category,
        height,
        weight,
        gender,
        date: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error saving BMI calculation:", error);
    }
  };

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setGender("male");
    setBmiData(null);
    setShowResult(false);
    setError(null);
  };

  const getBmiColor = () => {
    if (!bmiData) return "text-gray-700";
    switch (bmiData.category) {
      case "Underweight":
        return "text-blue-500";
      case "Normal":
        return "text-green-500";
      case "Overweight":
        return "text-orange-500";
      case "Obese":
        return "text-red-500";
      default:
        return "text-gray-700";
    }
  };

  const getBmiGradient = () => {
    if (!bmiData) return "from-gray-200 to-gray-300";
    switch (bmiData.category) {
      case "Underweight":
        return "from-blue-400 to-blue-500";
      case "Normal":
        return "from-green-400 to-green-500";
      case "Overweight":
        return "from-orange-400 to-orange-500";
      case "Obese":
        return "from-red-400 to-red-500";
      default:
        return "from-gray-200 to-gray-300";
    }
  };

  const tabData = {
    diet: {
      icon: <FaAppleAlt className="text-green-500" />,
      title: "Diet Plan",
      content: bmiData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="text-green-600 font-medium mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Recommended Foods
            </h4>
            <ul className="space-y-3">
              {bmiData.dietPlan.recommended_foods.map((food, index) => (
                <li key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <div className="bg-green-100 text-green-500 p-1 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{food}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <h4 className="text-red-600 font-medium mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Foods to Avoid
            </h4>
            <ul className="space-y-3">
              {bmiData.dietPlan.foods_to_avoid.map((food, index) => (
                <li key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <div className="bg-red-100 text-red-500 p-1 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{food}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    exercise: {
      icon: <FaRunning className="text-blue-500" />,
      title: "Exercise Plan",
      content: bmiData && (
        <div className="bg-blue-50 rounded-lg p-4">
          <ul className="space-y-3">
            {bmiData.exercisePlan.map((exercise, index) => (
              <li key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                <div className="bg-blue-100 text-blue-500 p-1 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">{exercise}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    lifestyle: {
      icon: <BsLightningCharge className="text-purple-500" />,
      title: "Lifestyle Changes",
      content: bmiData && (
        <div className="bg-purple-50 rounded-lg p-4">
          <ul className="space-y-3">
            {bmiData.lifestyleChanges.map((change, index) => (
              <li key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                <div className="bg-purple-100 text-purple-500 p-1 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">{change}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    }
  };

  return (
    <>
      <AuthenticatedNavbar user={user} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                  <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                    BMI Calculator
                  </span>
                  <div className="ml-3 bg-gradient-to-r from-teal-400 to-cyan-500 text-white text-xs px-2 py-1 rounded-full">
                    Vegetarian
                  </div>
                </h1>
                <p className="text-gray-600">
                  Calculate your Body Mass Index for personalized vegetarian health insights
                </p>
              </div>
              {user && (
                <div className="mt-4 sm:mt-0 bg-white py-2 px-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Logged in as</p>
                  <p className="font-medium text-gray-800">{user.name || user.email}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2"
              >
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Enter Your Details
                </h2>

                <form onSubmit={calculateBMI}>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-3">Gender</label>
                    <div className="flex gap-4">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setGender("male")}
                        className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
                          gender === "male"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <BsGenderMale size={20} />
                        <span>Male</span>
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setGender("female")}
                        className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
                          gender === "female"
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <BsGenderFemale size={20} />
                        <span>Female</span>
                      </motion.button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="height"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Height (cm)
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <FaRulerVertical />
                      </div>
                      <input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="170"
                        required
                        min="100"
                        max="250"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 transition"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="weight"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Weight (kg)
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <FaWeight />
                      </div>
                      <input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="60"
                        required
                        min="30"
                        max="300"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 transition"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Calculating...
                        </span>
                      ) : (
                        "Calculate BMI"
                      )}
                    </motion.button>

                    {showResult && (
                      <motion.button
                        type="button"
                        onClick={resetForm}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
                      >
                        Reset
                      </motion.button>
                    )}
                  </div>
                  {error && (
                    <div className="bg-red-50 text-red-500 text-sm mt-4 p-3 rounded-lg border border-red-100">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                      </div>
                    </div>
                  )}
                </form>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    BMI Categories:
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <span className="text-blue-600 font-medium">Underweight:</span> &lt; 18.5
                    </div>
                    <div className="bg-green-50 p-2 rounded-lg">
                      <span className="text-green-600 font-medium">Normal:</span> 18.5 - 24.9
                    </div>
                    <div className="bg-orange-50 p-2 rounded-lg">
                      <span className="text-orange-600 font-medium">Overweight:</span> 25 - 29.9
                    </div>
                    <div className="bg-red-50 p-2 rounded-lg">
                      <span className="text-red-600 font-medium">Obese:</span> ≥ 30
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Results Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6 lg:col-span-3"
              >
                {showResult && bmiData ? (
                  <div>
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">
                      Your BMI Result
                    </h2>

                    <div className="mb-8">
                      <div className="flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                          }}
                          className="relative mb-6"
                        >
                          <div className="w-44 h-44 rounded-full flex items-center justify-center bg-gray-50">
                            <div className={`w-40 h-40 rounded-full bg-gradient-to-r ${getBmiGradient()} flex items-center justify-center shadow-lg`}>
                              <span className="text-4xl font-bold text-white">
                                {parseFloat(bmiData.bmi).toFixed(1)}
                              </span>
                            </div>
                          </div>
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full shadow-md">
                            <span className={`font-semibold ${getBmiColor()}`}>
                              {bmiData.category}
                            </span>
                          </div>
                        </motion.div>

                        <div className="text-center mb-6">
                          <p className="text-gray-600 mb-2">
                            For a {gender === "male" ? "male" : "female"} with
                            height {height}cm and weight {weight}kg
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700">
                              {bmiData.healthImplications}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tabs */}
                      <div className="mt-6">
                        <div className="flex overflow-x-auto space-x-2 mb-4">
                          {Object.entries(tabData).map(([key, { icon, title }]) => (
                            <button
                              key={key}
                              onClick={() => setActiveTab(key)}
                              className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                                activeTab === key
                                  ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              <span className="mr-2">{icon}</span>
                              {title}
                            </button>
                          ))}
                        </div>

                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {tabData[activeTab].content}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-8">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1], 
                        rotate: [0, 3, 0, -3, 0],
                        opacity: [0.9, 1, 0.9] 
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="w-40 h-40 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 bg-opacity-10 mx-auto flex items-center justify-center mb-8"
                    >
                      <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 text-teal-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                      Discover Your Vegetarian Health Profile
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md">
                      Fill in your details to get personalized vegetarian-friendly diet plans, exercise recommendations, and lifestyle tips.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
                      <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center text-center">
                        <FaAppleAlt className="text-green-500 text-xl mb-2" />
                        <h4 className="font-medium text-gray-800 mb-1">Vegetarian Diet</h4>
                        <p className="text-sm text-gray-600">Get personalized plant-based nutrition advice</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center text-center">
                        <FaRunning className="text-blue-500 text-xl mb-2" />
                        <h4 className="font-medium text-gray-800 mb-1">Exercise Plan</h4>
                        <p className="text-sm text-gray-600">Activity recommendations for your body type</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg flex flex-col items-center text-center">
                        <IoWaterOutline className="text-purple-500 text-xl mb-2" />
                        <h4 className="font-medium text-gray-800 mb-1">Lifestyle Tips</h4>
                        <p className="text-sm text-gray-600">Simple changes for better well-being</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BMICalculator;
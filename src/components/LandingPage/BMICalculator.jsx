import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaWeight, FaRulerVertical } from "react-icons/fa";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import AuthenticatedNavbar from "./AuthenticatedNavbar";
import axiosInstance from "../../api/axios";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/api/user/profile');
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const calculateBMI = (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert height from cm to meters
    const heightInMeters = height / 100;
    
    // Calculate BMI: weight (kg) / (height (m) * height (m))
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    
    // Categorize BMI result
    let category = "";
    if (bmiValue < 18.5) {
      category = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal weight";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
    } else {
      category = "Obesity";
    }
    
    // Simulate processing time
    setTimeout(() => {
      setBmi(bmiValue);
      setBmiCategory(category);
      setShowResult(true);
      setLoading(false);

      // Optional: Save BMI calculation to user history
      if (user) {
        saveBMICalculation(bmiValue, category);
      }
    }, 800);
  };

  // Save BMI calculation to user history (optional)
  const saveBMICalculation = async (bmiValue, category) => {
    try {
      await axiosInstance.post('/api/user/bmi-history', {
        bmi: bmiValue,
        category,
        height,
        weight,
        gender,
        date: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving BMI calculation:', error);
    }
  };

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setGender("male");
    setBmi(null);
    setBmiCategory("");
    setShowResult(false);
  };

  // Health suggestions based on BMI category
  const getHealthSuggestions = () => {
    switch (bmiCategory) {
      case "Underweight":
        return [
          "Consider increasing your caloric intake with nutrient-dense foods",
          "Add strength training to your fitness routine to build muscle mass",
          "Consult with a nutritionist for a personalized meal plan",
          "Focus on protein-rich foods to support muscle growth"
        ];
      case "Normal weight":
        return [
          "Maintain your balanced diet and regular exercise routine",
          "Aim for 150 minutes of moderate aerobic activity weekly",
          "Include strength training exercises at least twice a week",
          "Stay hydrated and get adequate sleep for overall health"
        ];
      case "Overweight":
        return [
          "Focus on portion control and mindful eating habits",
          "Increase physical activity with a mix of cardio and strength training",
          "Reduce intake of processed foods and added sugars",
          "Consider tracking your daily calorie intake temporarily"
        ];
      case "Obesity":
        return [
          "Consult with a healthcare provider for personalized guidance",
          "Start with low-impact exercises like walking or swimming",
          "Make gradual, sustainable changes to your eating habits",
          "Consider working with a registered dietitian for support"
        ];
      default:
        return [];
    }
  };

  // BMI color based on category
  const getBmiColor = () => {
    switch (bmiCategory) {
      case "Underweight":
        return "text-[#0fa2b2]";
      case "Normal weight":
        return "text-[#0dcfcf]";
      case "Overweight":
        return "text-[#FF4D6D]";
      case "Obesity":
        return "text-[#D71646]";
      default:
        return "text-gray-700";
    }
  };

  return (
    <>
      {/* Include the authenticated navbar */}
      <AuthenticatedNavbar user={user} />
      
      <div className="pt-20 min-h-screen bg-[#f5f5f5]">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl font-bold text-[#040404] mb-2">BMI Calculator</h1>
            <p className="text-gray-600 mb-8">Calculate your Body Mass Index to check if your weight is healthy for your height</p>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-6 flex-1"
              >
                <h2 className="text-xl font-semibold mb-6">Enter Your Details</h2>
                
                <form onSubmit={calculateBMI}>
                  {/* Gender Selection */}
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-3">Gender</label>
                    <div className="flex gap-4">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setGender("male")}
                        className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${
                          gender === "male" 
                            ? "bg-[#0dcfcf] text-white" 
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <BsGenderMale size={20} />
                        <span>Male</span>
                      </motion.button>
                      
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setGender("female")}
                        className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${
                          gender === "female" 
                            ? "bg-[#0dcfcf] text-white" 
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <BsGenderFemale size={20} />
                        <span>Female</span>
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Height Input */}
                  <div className="mb-6">
                    <label htmlFor="height" className="block text-gray-700 mb-2">Height (cm)</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <FaRulerVertical />
                      </div>
                      <input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="175"
                        required
                        min="100"
                        max="250"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#0dcfcf] focus:ring focus:ring-[#0dcfcf] focus:ring-opacity-50 transition"
                      />
                    </div>
                  </div>
                  
                  {/* Weight Input */}
                  <div className="mb-6">
                    <label htmlFor="weight" className="block text-gray-700 mb-2">Weight (kg)</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <FaWeight />
                      </div>
                      <input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="70"
                        required
                        min="30"
                        max="300"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#0dcfcf] focus:ring focus:ring-[#0dcfcf] focus:ring-opacity-50 transition"
                      />
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-[#0dcfcf] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#0fa2b2] transition disabled:opacity-70"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
                        className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition"
                      >
                        Reset
                      </motion.button>
                    )}
                  </div>
                </form>
              </motion.div>

              {/* Results Section */}
              {showResult ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="bg-white rounded-lg shadow-lg p-6 flex-1"
                >
                  <h2 className="text-xl font-semibold mb-6">Your BMI Result</h2>
                  
                  <div className="mb-8 flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-40 h-40 rounded-full border-4 border-[#0dcfcf] flex items-center justify-center mb-4"
                    >
                      <span className={`text-4xl font-bold ${getBmiColor()}`}>{bmi}</span>
                    </motion.div>
                    
                    <div className="text-center">
                      <h3 className={`text-xl font-semibold ${getBmiColor()}`}>{bmiCategory}</h3>
                      <p className="text-gray-600 mt-1">For a {gender === "male" ? "male" : "female"} with height {height}cm and weight {weight}kg</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Health Suggestions:</h3>
                    <ul className="space-y-2">
                      {getHealthSuggestions().map((suggestion, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                          className="flex items-start"
                        >
                          <div className="bg-[#0dcfcf] bg-opacity-10 text-[#0dcfcf] p-1 rounded mr-3 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{suggestion}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-2">BMI Categories:</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-[#0fa2b2]">Underweight: &lt; 18.5</div>
                      <div className="text-[#0dcfcf]">Normal weight: 18.5 - 24.9</div>
                      <div className="text-[#FF4D6D]">Overweight: 25 - 29.9</div>
                      <div className="text-[#D71646]">Obesity: ≥ 30</div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="bg-white rounded-lg shadow-lg p-6 flex-1 flex flex-col items-center justify-center text-center"
                >
                  <div className="mb-6">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.9, 1, 0.9],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="w-32 h-32 rounded-full bg-[#0dcfcf] bg-opacity-10 mx-auto flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#0dcfcf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Ready to calculate your BMI?</h3>
                  <p className="text-gray-600 mb-4">Fill in your details on the left to get personalized health insights based on your BMI.</p>
                  <div className="text-sm text-gray-500">
                    <p>Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BMICalculator;
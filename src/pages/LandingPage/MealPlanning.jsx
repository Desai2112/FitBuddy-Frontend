import React, { useState, useEffect } from "react";
import AuthenticatedNavbar from "../../components/LandingPage/AuthenticatedNavbar";
import axios from "axios";

const MealPlanning = () => {
  const healthTips = [
    "Meal prep on weekends can save time and help you make healthier choices during busy weekdays.",
    "Adding colorful vegetables to your meals ensures you get a variety of nutrients.",
    "Herbs and spices not only enhance flavor but also provide additional health benefits.",
    "Eating slowly helps with digestion and allows your body to recognize when it's full.",
    "Drink water before meals to help with portion control and stay hydrated.",
  ];

  // State variables
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [ingredient, setIngredient] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dailyTip, setDailyTip] = useState("");
  const [error, setError] = useState(null);

  // Initialize on component mount
  useEffect(() => {
    const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
    setDailyTip(randomTip);

    const saved = localStorage.getItem("savedRecipes");
    if (saved) setSavedRecipes(JSON.parse(saved));

    const history = localStorage.getItem("searchHistory");
    if (history) setSearchHistory(JSON.parse(history));
  }, []);

  // Generate recipe using API
  const generateRecipe = async () => {
    if (!ingredient.trim()) {
      setError("Please enter an ingredient!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/gemini/recipe",
        {
          ingredients: ingredient.split(",").map((i) => i.trim()),
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        const meals = response.data.data.meals;
        if (meals.length > 0) {
          const randomIndex = Math.floor(Math.random() * meals.length);
          const recipe = {
            id: Date.now(), // Unique ID since API doesn't provide one
            name: meals[randomIndex].meal,
            description: `A delicious recipe combining ${ingredient}`,
            ingredients: meals[randomIndex].ingredients,
            instructions: meals[randomIndex].instructions.split(". ").filter(Boolean),
            nutrition: {
              calories: Math.floor(Math.random() * 400) + 200,
              protein: `${Math.floor(Math.random() * 15) + 5}g`,
              carbs: `${Math.floor(Math.random() * 50) + 20}g`,
              fat: `${Math.floor(Math.random() * 20) + 5}g`,
              fiber: `${Math.floor(Math.random() * 10) + 3}g`,
              sugar: `${Math.floor(Math.random() * 20) + 5}g`,
            },
            prepTime: "15 mins",
            cookTime: "15 mins",
            servings: 2,
            difficulty: "Medium",
            tags: ["custom"],
          };

          setCurrentRecipe(recipe);

          const saved = savedRecipes.some((r) => r.name === recipe.name);
          setIsSaved(saved);

          const normalizedIngredient = ingredient.toLowerCase().trim();
          const newHistory = [
            normalizedIngredient,
            ...searchHistory.filter((item) => item !== normalizedIngredient),
          ].slice(0, 5);
          setSearchHistory(newHistory);
          localStorage.setItem("searchHistory", JSON.stringify(newHistory));
        } else {
          setError("No recipes found for this ingredient combination.");
        }
      } else {
        setError(response.data.message || "Failed to fetch recipes.");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError("Failed to connect to the recipe service. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Quick search
  const quickSearch = (ingredient) => {
    setIngredient(ingredient);
    setTimeout(() => generateRecipe(), 0);
  };

  // Save recipe
  const saveRecipe = () => {
    if (!currentRecipe) return;

    if (!isSaved) {
      const newSavedRecipes = [...savedRecipes, currentRecipe];
      setSavedRecipes(newSavedRecipes);
      localStorage.setItem("savedRecipes", JSON.stringify(newSavedRecipes));
      setIsSaved(true);
    } else {
      const newSavedRecipes = savedRecipes.filter(
        (r) => r.id !== currentRecipe.id
      );
      setSavedRecipes(newSavedRecipes);
      localStorage.setItem("savedRecipes", JSON.stringify(newSavedRecipes));
      setIsSaved(false);
    }
  };

  // Clear recipe
  const clearRecipe = () => {
    setCurrentRecipe(null);
    setError(null);
  };

  // Load a saved recipe
  const loadSavedRecipe = (recipe) => {
    setCurrentRecipe(recipe);
    setIsSaved(true);
    setError(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 flex flex-col">
      <AuthenticatedNavbar />
      
      {/* Main Content */}
      <div className="container mx-auto p-4 max-w-6xl flex-1 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recipe Generator Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 relative">
              <div className="bg-gradient-to-r from-cyan-400 to-teal-500 h-1 w-full absolute top-0"></div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-teal-600 flex items-center mb-6">
                  <span className="mr-3">🍲</span>
                  Meal Recipe Generator
                </h2>

                <p className="text-gray-600 mb-6">
                  Enter ingredients (comma-separated) to discover healthy recipes!
                </p>

                <div className="mb-6">
                  <div className="flex mb-4">
                    <div className="flex-1 bg-gray-100 rounded-l-lg border-2 border-transparent focus-within:border-teal-400 overflow-hidden">
                      <input
                        type="text"
                        placeholder="e.g., banana, broccoli, chips"
                        className="w-full border-none bg-transparent p-3 outline-none"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && generateRecipe()}
                      />
                    </div>
                    <button
                      className="bg-gradient-to-r from-cyan-400 to-teal-500 text-white py-3 px-6 rounded-r-lg font-medium flex items-center hover:opacity-90 transition"
                      onClick={generateRecipe}
                    >
                      Generate Recipe
                    </button>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                  )}

                  {searchHistory.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-sm text-gray-500">Recent searches:</span>
                      {searchHistory.map((item, index) => (
                        <button
                          key={index}
                          className="text-teal-500 hover:underline"
                          onClick={() => quickSearch(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="text-sm text-gray-500 flex flex-wrap gap-2">
                    <span>Try these:</span>
                    <button
                      className="text-teal-500 hover:underline"
                      onClick={() => quickSearch("banana")}
                    >
                      banana
                    </button>
                    <button
                      className="text-teal-500 hover:underline"
                      onClick={() => quickSearch("apple")}
                    >
                      apple
                    </button>
                    <button
                      className="text-teal-500 hover:underline"
                      onClick={() => quickSearch("avocado")}
                    >
                      avocado
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 animate-pulse">
                <div className="p-6 text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl text-gray-500 mb-2">Finding your recipe...</h3>
                  <p className="text-gray-400">Please wait a moment</p>
                </div>
              </div>
            )}

            {/* Recipe Result */}
            {currentRecipe && !isLoading && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-cyan-400 to-teal-500 h-1 w-full"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-semibold text-teal-600">{currentRecipe.name}</h2>
                    <div className="flex space-x-2">
                      <button
                        className={
                          isSaved
                            ? "text-yellow-500 hover:text-gray-400 transition"
                            : "text-gray-400 hover:text-yellow-500 transition"
                        }
                        title={isSaved ? "Remove from favorites" : "Save to favorites"}
                        onClick={saveRecipe}
                      >
                        {isSaved ? "★" : "☆"}
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-500 transition"
                        title="Clear recipe"
                        onClick={clearRecipe}
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-600 mb-4">{currentRecipe.description}</p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center">
                        <span className="mr-2">⏱️</span>
                        <div>
                          <div className="text-sm text-gray-500">Prep Time</div>
                          <div className="font-semibold">{currentRecipe.prepTime}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">🔥</span>
                        <div>
                          <div className="text-sm text-gray-500">Cook Time</div>
                          <div className="font-semibold">{currentRecipe.cookTime}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">🍽️</span>
                        <div>
                          <div className="text-sm text-gray-500">Servings</div>
                          <div className="font-semibold">{currentRecipe.servings}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">📊</span>
                        <div>
                          <div className="text-sm text-gray-500">Difficulty</div>
                          <div className="font-semibold">{currentRecipe.difficulty}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-2">Nutrition Facts (per serving)</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(currentRecipe.nutrition).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-sm text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                            <div className="font-semibold">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-teal-600 mb-3">Ingredients</h3>
                      <ul className="space-y-2">
                        {currentRecipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-4 h-4 rounded-full bg-teal-100 text-teal-500 text-xs flex items-center justify-center mr-2 mt-1">•</span>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-teal-600 mb-3">Instructions</h3>
                      <ol className="space-y-3">
                        {currentRecipe.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-6 h-6 rounded-full bg-teal-500 text-white text-xs flex items-center justify-center mr-3 shrink-0">{index + 1}</span>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* No Recipe Selected */}
            {!currentRecipe && !isLoading && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="p-6 text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🥗</div>
                  <h3 className="text-xl text-gray-500 mb-2">No recipe selected</h3>
                  <p className="text-gray-400">Enter ingredients to generate a delicious recipe</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* Daily Tip */}
            <div className="bg-gradient-to-r from-cyan-400 to-teal-500 text-white rounded-xl shadow-md overflow-hidden relative">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <span className="mr-2">💡</span>Daily Nutrition Tip
                </h3>
                <p className="leading-relaxed">{dailyTip}</p>
              </div>
              <div className="absolute right-4 bottom-4 text-5xl opacity-20">💧</div>
            </div>

            {/* Saved Recipes */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-teal-500 h-1 w-full"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
                  <span className="mr-2">⭐</span>Saved Recipes
                </h3>
                {savedRecipes.length === 0 ? (
                  <div className="text-center py-6 text-gray-400">
                    <div className="text-4xl mb-2">📚</div>
                    <p>No saved recipes yet</p>
                    <p className="text-sm">Your favorites will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedRecipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                        onClick={() => loadSavedRecipe(recipe)}
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 line-clamp-1">{recipe.name}</h4>
                          <div className="flex text-xs text-gray-500">
                            <span className="mr-3">{recipe.nutrition.calories} cal</span>
                            <span>{recipe.prepTime} prep</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Nutritional Info */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-teal-500 h-1 w-full"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
                  <span className="mr-2">🥑</span>Why Healthy Eating Matters
                </h3>
                <p className="text-gray-600 mb-3">
                  A balanced diet supports overall health, boosts energy, and prevents disease.
                </p>
                <p className="text-gray-600 mb-3">
                  Our recipes focus on whole foods for optimal nutrition.
                </p>
                <a
                  href="#"
                  className="text-teal-500 hover:text-teal-600 transition flex items-center font-medium"
                >
                  Learn more about nutrition
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white p-6 text-center mt-10">
        <p className="mb-2">© 2025 HealthHub - Your partner in health and fitness</p>
        <p className="text-gray-400 text-sm">
          This recipe generator is for informational purposes only and is not a substitute for professional nutritional advice.
        </p>
      </div>
    </div>
  );
};

export default MealPlanning;
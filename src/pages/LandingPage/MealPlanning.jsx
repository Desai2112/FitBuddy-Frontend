import React, { useState, useEffect } from "react";
import AuthenticatedNavbar from "../../components/LandingPage/AuthenticatedNavbar";

const MealPlanning = () => {
  // Recipe database
  const recipeDatabase = {
    banana: [
      {
        id: 1,
        name: "Energizing Banana Breakfast Smoothie Bowl",
        image: "/api/placeholder/400/250",
        description:
          "Start your day with this nutrient-packed smoothie bowl featuring bananas and superfoods.",
        prepTime: "10 mins",
        cookTime: "0 mins",
        servings: 1,
        difficulty: "Easy",
        ingredients: [
          "2 ripe bananas (1 frozen)",
          "1/4 cup Greek yogurt",
          "1 tbsp honey or maple syrup",
          "1/2 cup almond milk",
          "1 tbsp chia seeds",
          "1/4 cup granola",
          "Fresh berries for topping",
          "Sliced almonds for garnish",
        ],
        instructions: [
          "Place the frozen banana, fresh banana, Greek yogurt, and almond milk in a blender.",
          "Blend until smooth and creamy, adding more almond milk if needed.",
          "Pour into a bowl and top with chia seeds, granola, fresh berries, and sliced almonds.",
          "Drizzle with honey or maple syrup and serve immediately.",
        ],
        nutrition: {
          calories: 385,
          protein: "12g",
          carbs: "65g",
          fat: "10g",
          fiber: "9g",
          sugar: "32g",
        },
        tags: ["breakfast", "vegetarian", "high-fiber", "quick"],
      },
      {
        id: 2,
        name: "Tropical Banana Chia Pudding",
        image: "/api/placeholder/400/250",
        description:
          "A refreshing and healthy dessert that can be prepared ahead for a quick snack or breakfast.",
        prepTime: "10 mins",
        cookTime: "4 hrs (chilling)",
        servings: 2,
        difficulty: "Easy",
        ingredients: [
          "1 ripe banana, mashed",
          "1/4 cup chia seeds",
          "1 cup coconut milk",
          "1 tbsp honey or agave syrup",
          "1/2 tsp vanilla extract",
          "1/4 tsp cinnamon",
          "Diced mango and pineapple for topping",
          "Toasted coconut flakes",
        ],
        instructions: [
          "In a bowl, mash the banana until smooth.",
          "Add chia seeds, coconut milk, honey, vanilla extract, and cinnamon.",
          "Stir well to combine, making sure there are no clumps.",
          "Cover and refrigerate for at least 4 hours or overnight.",
          "Before serving, stir again and top with diced tropical fruits and coconut flakes.",
        ],
        nutrition: {
          calories: 310,
          protein: "7g",
          carbs: "38g",
          fat: "16g",
          fiber: "14g",
          sugar: "18g",
        },
        tags: ["dessert", "make-ahead", "vegan", "gluten-free"],
      },
    ],
    apple: [
      {
        id: 3,
        name: "Apple Cinnamon Overnight Oats",
        image: "/api/placeholder/400/250",
        description:
          "Delicious and nutritious breakfast prepared the night before for busy mornings.",
        prepTime: "10 mins",
        cookTime: "8 hrs (chilling)",
        servings: 1,
        difficulty: "Easy",
        ingredients: [
          "1 apple, diced",
          "1/2 cup rolled oats",
          "1 cup almond milk",
          "1 tbsp maple syrup",
          "1/2 tsp cinnamon",
          "1/4 tsp nutmeg",
          "1 tbsp chia seeds",
          "2 tbsp chopped walnuts",
        ],
        instructions: [
          "In a jar or container, combine rolled oats, almond milk, maple syrup, cinnamon, nutmeg, and chia seeds.",
          "Stir well, then add in diced apple and walnuts, reserving some for topping.",
          "Cover and refrigerate overnight or for at least 8 hours.",
          "When ready to eat, stir well and add a splash of milk if desired.",
          "Top with remaining apple and walnuts.",
        ],
        nutrition: {
          calories: 340,
          protein: "8g",
          carbs: "55g",
          fat: "12g",
          fiber: "11g",
          sugar: "20g",
        },
        tags: ["breakfast", "make-ahead", "vegan", "heart-healthy"],
      },
    ],
    avocado: [
      {
        id: 4,
        name: "Avocado & Black Bean Salad",
        image: "/api/placeholder/400/250",
        description:
          "A protein-rich salad perfect for lunch or as a side dish.",
        prepTime: "15 mins",
        cookTime: "0 mins",
        servings: 2,
        difficulty: "Easy",
        ingredients: [
          "1 ripe avocado, diced",
          "1 cup black beans, drained and rinsed",
          "1 cup cherry tomatoes, halved",
          "1/4 cup red onion, finely chopped",
          "1/4 cup fresh cilantro, chopped",
          "1 lime, juiced",
          "2 tbsp olive oil",
          "1/2 tsp cumin",
          "Salt and pepper to taste",
        ],
        instructions: [
          "In a large bowl, combine black beans, cherry tomatoes, red onion, and cilantro.",
          "Gently fold in diced avocado.",
          "In a small bowl, whisk together lime juice, olive oil, cumin, salt, and pepper.",
          "Pour dressing over salad and toss gently to combine.",
          "Serve immediately or chill for 30 minutes to let flavors meld.",
        ],
        nutrition: {
          calories: 290,
          protein: "10g",
          carbs: "25g",
          fat: "18g",
          fiber: "12g",
          sugar: "3g",
        },
        tags: ["lunch", "vegetarian", "high-fiber", "high-protein"],
      },
    ],
  };

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

  // Initialize on component mount
  useEffect(() => {
    // Set random health tip
    const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
    setDailyTip(randomTip);

    // Load saved recipes from localStorage
    const saved = localStorage.getItem("savedRecipes");
    if (saved) {
      setSavedRecipes(JSON.parse(saved));
    }

    // Load search history from localStorage
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Generate recipe
  const generateRecipe = () => {
    if (!ingredient.trim()) return;

    setIsLoading(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      const normalizedIngredient = ingredient.toLowerCase().trim();

      // Update search history
      const newHistory = [
        normalizedIngredient,
        ...searchHistory.filter((item) => item !== normalizedIngredient),
      ].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));

      // Find recipes
      const recipes = recipeDatabase[normalizedIngredient] || [];

      if (recipes.length > 0) {
        const randomIndex = Math.floor(Math.random() * recipes.length);
        const recipe = recipes[randomIndex];

        setCurrentRecipe(recipe);

        // Check if recipe is saved
        const saved = savedRecipes.some((r) => r.id === recipe.id);
        setIsSaved(saved);
      }

      setIsLoading(false);
    }, 1500);
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
  };

  // Load a saved recipe
  const loadSavedRecipe = (recipe) => {
    setCurrentRecipe(recipe);
    setIsSaved(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 flex flex-col">
      <AuthenticatedNavbar />
      
      {/* Main Content with proper margin-top for navbar */}
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
                  Enter an ingredient below and discover delicious, healthy
                  recipes you can make today!
                </p>

                <div className="mb-6">
                  <div className="flex mb-4">
                    <div className="flex-1 bg-gray-100 rounded-l-lg border-2 border-transparent focus-within:border-teal-400 overflow-hidden">
                      <input
                        type="text"
                        placeholder="Enter an ingredient (e.g. banana, avocado)"
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
                      <span className="flex items-center">Generate Recipe</span>
                    </button>
                  </div>

                  {searchHistory.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-sm text-gray-500">
                        Recent searches:
                      </span>
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
                  <h3 className="text-xl text-gray-500 mb-2">
                    Finding your recipe...
                  </h3>
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
                    <h2 className="text-2xl font-semibold text-teal-600">
                      {currentRecipe.name}
                    </h2>
                    <div className="flex space-x-2">
                      <button
                        className={
                          isSaved
                            ? "text-yellow-500 hover:text-gray-400 transition"
                            : "text-gray-400 hover:text-yellow-500 transition"
                        }
                        title={
                          isSaved
                            ? "Remove from favorites"
                            : "Save to favorites"
                        }
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

                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <img
                      src={currentRecipe.image}
                      alt={currentRecipe.name}
                      className="rounded-lg w-full md:w-1/2 h-64 object-cover"
                    />

                    <div className="flex-1">
                      <p className="text-gray-600 mb-4">
                        {currentRecipe.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center">
                          <span className="mr-2">⏱️</span>
                          <div>
                            <div className="text-sm text-gray-500">
                              Prep Time
                            </div>
                            <div className="font-semibold">
                              {currentRecipe.prepTime}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">🔥</span>
                          <div>
                            <div className="text-sm text-gray-500">
                              Cook Time
                            </div>
                            <div className="font-semibold">
                              {currentRecipe.cookTime}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">🍽️</span>
                          <div>
                            <div className="text-sm text-gray-500">
                              Servings
                            </div>
                            <div className="font-semibold">
                              {currentRecipe.servings}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">📊</span>
                          <div>
                            <div className="text-sm text-gray-500">
                              Difficulty
                            </div>
                            <div className="font-semibold">
                              {currentRecipe.difficulty}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-700 mb-2">
                          Nutrition Facts (per serving)
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">
                              Calories
                            </div>
                            <div className="font-semibold">
                              {currentRecipe.nutrition.calories}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Protein</div>
                            <div className="font-semibold">
                              {currentRecipe.nutrition.protein}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Carbs</div>
                            <div className="font-semibold">
                              {currentRecipe.nutrition.carbs}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Fat</div>
                            <div className="font-semibold">
                              {currentRecipe.nutrition.fat}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Fiber</div>
                            <div className="font-semibold">
                              {currentRecipe.nutrition.fiber}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Sugar</div>
                            <div className="font-semibold">
                              {currentRecipe.nutrition.sugar}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-teal-600 mb-3">
                        Ingredients
                      </h3>
                      <ul className="space-y-2">
                        {currentRecipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-4 h-4 rounded-full bg-teal-100 text-teal-500 text-xs flex items-center justify-center mr-2 mt-1">
                              •
                            </span>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-teal-600 mb-3">
                        Instructions
                      </h3>
                      <ol className="space-y-3">
                        {currentRecipe.instructions.map(
                          (instruction, index) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-block w-6 h-6 rounded-full bg-teal-500 text-white text-xs flex items-center justify-center mr-3 shrink-0">
                                {index + 1}
                              </span>
                              <span>{instruction}</span>
                            </li>
                          )
                        )}
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
                  <h3 className="text-xl text-gray-500 mb-2">
                    No recipe selected
                  </h3>
                  <p className="text-gray-400">
                    Enter an ingredient to generate a delicious recipe
                  </p>
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
                  <span className="mr-2">💡</span>
                  Daily Nutrition Tip
                </h3>
                <p className="leading-relaxed">{dailyTip}</p>
              </div>
              <div className="absolute right-4 bottom-4 text-5xl opacity-20">
                💧
              </div>
            </div>

            {/* Saved Recipes */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-400 to-teal-500 h-1 w-full"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
                  <span className="mr-2">⭐</span>
                  Saved Recipes
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
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          className="w-12 h-12 rounded object-cover mr-3"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 line-clamp-1">
                            {recipe.name}
                          </h4>
                          <div className="flex text-xs text-gray-500">
                            <span className="mr-3">
                              {recipe.nutrition.calories} cal
                            </span>
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
                  <span className="mr-2">🥑</span>
                  Why Healthy Eating Matters
                </h3>
                <p className="text-gray-600 mb-3">
                  A balanced diet rich in nutrients supports overall health,
                  improves energy levels, and helps prevent disease.
                </p>
                <p className="text-gray-600 mb-3">
                  Our recipe generator focuses on whole foods and balanced
                  nutrition, ensuring you get the nutrients your body needs.
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
        <p className="mb-2">
          © 2025 HealthHub - Your partner in health and fitness
        </p>
        <p className="text-gray-400 text-sm">
          This recipe generator is for informational purposes only and is not a
          substitute for professional nutritional advice.
        </p>
      </div>
    </div>
  );
};

export default MealPlanning;
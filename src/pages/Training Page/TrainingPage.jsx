import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  Environment,
  Float,
  ContactShadows,
  useProgress,
  Html,
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import AuthenticatedNavbar from "../../components/LandingPage/AuthenticatedNavbar";
import { exercises } from "../../data/exercises.js";

// Preload models utility
const modelCache = {};

const preloadModel = (path) => {
  if (!modelCache[path]) {
    modelCache[path] = new Promise((resolve) => {
      useGLTF.preload(path);
      setTimeout(() => resolve(true), 100);
    });
  }
  return modelCache[path];
};

// Loading screen component
const LoadingScreen = ({ progress }) => (
  <Html center>
    <div className="flex flex-col items-center justify-center bg-gray-100/80 p-6 rounded-lg">
      <div className="w-48 h-2 bg-gray-300 rounded-full overflow-hidden mb-2">
        <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-gray-600 text-sm">Loading model... {Math.round(progress)}%</p>
    </div>
  </Html>
);

// Model component
const Model = ({ modelPath, isPlaying, setAnimationDuration }) => {
  const { scene, animations } = useGLTF(modelPath);
  const { actions, mixer } = useAnimations(animations, scene);
  const animationAction = useRef(null);
  const { progress } = useProgress();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.roughness = 0.5;
        child.material.metalness = 0.5;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    const animation = Object.values(actions)[0];
    if (animation) {
      animationAction.current = animation;
      if (animation.getClip()) {
        setAnimationDuration(animation.getClip().duration);
      }
      if (isPlaying) {
        animation.timeScale = 0.5;
        animation.reset().fadeIn(0.5).play();
      } else {
        animation.paused = true;
      }
    }
    return () => {
      if (mixer) {
        mixer.stopAllAction();
      }
    };
  }, [actions, mixer, setAnimationDuration]);

  useEffect(() => {
    if (animationAction.current && mixer) {
      const action = animationAction.current;
      if (isPlaying) {
        if (action.paused) {
          action.paused = false;
        }
        if (!action.isRunning()) {
          action.play();
        }
      } else {
        action.paused = true;
      }
    }
  }, [isPlaying, mixer]);

  if (progress < 100) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <>
      <Float speed={0.2} rotationIntensity={0.05} floatIntensity={0.1} floatingRange={[0, 0.03]}>
        <primitive object={scene} scale={0.8} position={[0, -0.8, 0]} visible={true} />
      </Float>
      <ContactShadows position={[0, -1.4, 0]} opacity={0.6} scale={10} blur={1} far={10} />
    </>
  );
};

// Model Viewer component
const ModelViewer = ({ modelPath, isPlaying, setAnimationDuration, toggleZoom }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    preloadModel(modelPath).then(() => setIsLoaded(true));
  }, [modelPath]);

  return (
    <Canvas camera={{ position: [0, 1, 2.5], fov: 50 }} shadows>
      <color attach="background" args={["#f8f9fa"]} />
      <fog attach="fog" args={["#f8f9fa", 5, 15]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <Suspense fallback={<LoadingScreen progress={0} />}>
        {isLoaded && (
          <Model
            key={modelPath}
            modelPath={modelPath}
            isPlaying={isPlaying}
            setAnimationDuration={setAnimationDuration}
          />
        )}
      </Suspense>
      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        enableZoom={true}
        enablePan={true}
        minDistance={2}
        maxDistance={5}
        autoRotate={false}
        target={[0, 0, 0]}
        enableDamping={true}
        dampingFactor={0.05}
        zoomSpeed={0.5}
        rotateSpeed={0.5}
      />
      <Environment preset="city" />
    </Canvas>
  );
};

// Exercise Card Component
const ExerciseCard = ({ exercise, isSelected, onClick, category }) => {
  return (
    <motion.div
      className={`relative bg-white rounded-lg shadow-md p-4 cursor-pointer transition-shadow hover:shadow-lg ${isSelected ? "border-2 border-blue-500" : ""}`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * (exercise.index % 10) }}
      role="button"
      aria-label={`Select ${exercise.name}`}
      viewport={{ once: true }}
    >
      <span className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
        {category}
      </span>
      <div className="flex flex-col gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: exercise.color || "#3b82f6" }}
        >
          <span>{exercise.name.charAt(0)}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{exercise.name}</h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-800">Benefits</h4>
            <ul className="list-disc pl-4 text-sm text-gray-600">
              {exercise.benefits &&
                exercise.benefits.slice(0, 2).map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
            </ul>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-800">Key Tips</h4>
            <ol className="list-decimal pl-4 text-sm text-gray-600">
              {exercise.tips.slice(0, 2).map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ol>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Difficulty:</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i < exercise.difficulty ? "bg-blue-500" : "bg-gray-300"}`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Player Controls Component
const PlayerControls = ({ isPlaying, togglePlay, toggleZoom }) => {
  return (
    <div className="sticky bottom-0 bg-white p-4 shadow-md">
      <div className="flex justify-center gap-4">
        <button
          onClick={togglePlay}
          className={`p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-colors ${isPlaying ? "bg-blue-600" : ""}`}
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M6 4v16a1 1 0 0 0 1.5.86l12-8a1 1 0 0 0 0-1.72l-12-8A1 1 0 0 0 6 4z" />
            </svg>
          )}
        </button>
        <button
          onClick={toggleZoom}
          className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-colors"
          aria-label="Toggle zoom"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M10 4h4v4h-4V4zm0 6h4v4h-4v-4zm6-6h4v4h-4V4zm0 6h4v4h-4v-4zM4 4h4v4H4V4zm0 6h4v4H4v-4zm6 10h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Main component
const TrainingPage = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(1);
  const [activeModelPath, setActiveModelPath] = useState("");
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState("intermediate");
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("instructions");
  const [isInstructionsCollapsed, setIsInstructionsCollapsed] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const modelViewerRef = useRef(null);

  const user = {
    name: "John Doe",
    email: "john@example.com",
  };

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const enhancedExercises = exercises.map((exercise, index) => ({
    ...exercise,
    index,
    color: ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"][index % 6],
    category:
      (exercise.primaryMuscle.toLowerCase().includes("chest") ||
        exercise.primaryMuscle.toLowerCase().includes("shoulder") ||
        exercise.primaryMuscle.toLowerCase().includes("tricep") ||
        exercise.primaryMuscle.toLowerCase().includes("bicep") ||
        exercise.primaryMuscle.toLowerCase().includes("back") ||
        exercise.secondaryMuscle.toLowerCase().includes("chest") ||
        exercise.secondaryMuscle.toLowerCase().includes("shoulder") ||
        exercise.secondaryMuscle.toLowerCase().includes("tricep") ||
        exercise.secondaryMuscle.toLowerCase().includes("bicep") ||
        exercise.secondaryMuscle.toLowerCase().includes("back"))
        ? "Upper Body"
        : (exercise.primaryMuscle.toLowerCase().includes("quad") ||
            exercise.primaryMuscle.toLowerCase().includes("hamstring") ||
            exercise.primaryMuscle.toLowerCase().includes("glute") ||
            exercise.primaryMuscle.toLowerCase().includes("calf") ||
            exercise.secondaryMuscle.toLowerCase().includes("quad") ||
            exercise.secondaryMuscle.toLowerCase().includes("hamstring") ||
            exercise.secondaryMuscle.toLowerCase().includes("glute") ||
            exercise.secondaryMuscle.toLowerCase().includes("calf"))
        ? "Lower Body"
        : (exercise.primaryMuscle.toLowerCase().includes("core") ||
            exercise.primaryMuscle.toLowerCase().includes("ab") ||
            exercise.primaryMuscle.toLowerCase().includes("oblique") ||
            exercise.secondaryMuscle.toLowerCase().includes("core") ||
            exercise.secondaryMuscle.toLowerCase().includes("ab") ||
            exercise.secondaryMuscle.toLowerCase().includes("oblique"))
        ? "Core"
        : "All",
  }));

  const filteredExercises = enhancedExercises.filter((exercise) => {
    const matchesCategory =
      filterCategory === "All" || exercise.category === filterCategory;
    const matchesSearch = exercise.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleZoom = () => {
    // Placeholder for zoom functionality (requires OrbitControls modification)
    console.log("Toggle zoom");
  };

  const handleCardSelect = (index) => {
    if (selectedExercise === index) return;
    setIsPlaying(false);
    setIsModelLoading(true);
    setSelectedExercise(index);
    setActiveModelPath(filteredExercises[index].modelPath);
    setActiveTab("instructions");
    setIsInstructionsCollapsed(false);
    setTimeout(() => {
      if (modelViewerRef.current) {
        modelViewerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const closeModelViewer = () => {
    setIsPlaying(false);
    setSelectedExercise(null);
    setIsInstructionsCollapsed(false);
  };

  const handleFilterChange = (category) => {
    setFilterCategory(category);
    setSelectedExercise(null);
  };

  const handleDifficultyChange = (level) => {
    setDifficultyLevel(level);
  };

  const copyTipsToClipboard = () => {
    const tips = filteredExercises[selectedExercise].tips.join("\n");
    navigator.clipboard.writeText(tips);
    alert("Tips copied to clipboard!");
  };

  useEffect(() => {
    if (selectedExercise !== null) {
      const modelPath = filteredExercises[selectedExercise].modelPath;
      preloadModel(modelPath).then(() => {
        setIsModelLoading(false);
      });
    }
  }, [selectedExercise, filteredExercises]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 font-sans">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-50 to-gray-100 shadow-md p-6">
        <AuthenticatedNavbar user={user} />
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              aria-label="Search exercises"
            />
            {searchQuery && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 h-5"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
            <div aria-live="polite" className="sr-only">
              {filteredExercises.length} exercises found
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-800">Filter by:</label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {["All", "Upper Body", "Lower Body", "Core"].map((category) => (
                  <motion.button
                    key={category}
                    className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium transition-colors relative ${
                      filterCategory === category
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-800 hover:bg-blue-500 hover:text-white"
                    }`}
                    onClick={() => handleFilterChange(category)}
                    aria-label={`Filter by ${category}`}
                    aria-describedby={`filter-${category}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                    <span id={`filter-${category}`} className="sr-only">
                      Filter exercises by {category}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-800">Difficulty:</label>
              <select
                value={difficultyLevel}
                onChange={(e) => handleDifficultyChange(e.target.value)}
                className="p-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select difficulty level"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          
          {/* Exercise Cards Grid */}
          <div className="exercise-grid">
            {filteredExercises.map((exercise, index) => (
              <ExerciseCard 
                key={index}
                exercise={exercise}
                isSelected={selectedExercise === index}
                onClick={() => handleCardSelect(index)}
              />
            ))}
          </div>
          
          {/* 3D Model Viewer */}
          <AnimatePresence>
  {selectedExercise !== null && (
    <motion.div
      className="model-viewer-container"
      ref={modelViewerRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Header */}
      <div className="model-header">
        <h2>{filteredExercises[selectedExercise].name}</h2>
        <button className="close-button" onClick={closeModelViewer}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Full-width Model */}
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] flex justify-center items-center bg-gray-50 p-4">
        {isModelLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading 3D model...</p>
          </div>
        ) : (
          <ModelViewer
            key={activeModelPath}
            modelPath={activeModelPath}
            isPlaying={isPlaying}
            setAnimationDuration={setAnimationDuration}
          />
        )}
      {/* Play Controls */}
      <div className="w-1/4 flex justify-center my-4">
        <PlayerControls isPlaying={isPlaying} togglePlay={togglePlay} />
      </div>
      </div>


      {/* Two Column Layout for Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pb-8">
        {/* Column 1 */}
        <div className="space-y-6">
          {/* How to perform */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-4">How to Perform</h3>
            <ol className="list-decimal list-inside space-y-2">
              {filteredExercises[selectedExercise].tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ol>
          </div>

          {/* Training Details */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-4">
              Training Details ({difficultyLevel})
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div><strong>Sets:</strong> {filteredExercises[selectedExercise].sets[difficultyLevel]}</div>
              <div><strong>Reps:</strong> {filteredExercises[selectedExercise].reps[difficultyLevel]}</div>
              <div><strong>Duration:</strong> {filteredExercises[selectedExercise].duration[difficultyLevel]}</div>
              <div><strong>Rest:</strong> {filteredExercises[selectedExercise].restPeriod}</div>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          {/* Muscles & Equipment */}
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-4">Muscles Worked</h3>
            <p><strong>Primary:</strong> {filteredExercises[selectedExercise].primaryMuscle || "Full body"}</p>
            <p><strong>Secondary:</strong> {filteredExercises[selectedExercise].secondaryMuscle || "Core stabilizers"}</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-4">Equipment</h3>
            <p>{filteredExercises[selectedExercise].equipment || "No equipment needed"}</p>
          </div>

          {/* Variations */}
          {filteredExercises[selectedExercise].variations && (
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-xl font-semibold mb-4">Variations</h3>
              <ul className="list-disc list-inside">
                {filteredExercises[selectedExercise].variations.map((variation, i) => (
                  <li key={i}>{variation}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

        </div>
      </PageWrapper>
    </div>
  );
};

export default TrainingPage;
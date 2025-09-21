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
import PageWrapper from "./PageWrapper.jsx";
import AuthenticatedNavbar from "../../components/LandingPage/AuthenticatedNavbar";
import "./TrainingPage.css";
// Import enhanced exercise data
import { exercises } from "../../data/exercises.js";

// Preload models utility - will only load when needed
const modelCache = {};

const preloadModel = (path) => {
  if (!modelCache[path]) {
    modelCache[path] = new Promise((resolve) => {
      useGLTF.preload(path);
      // Small delay to ensure model is loaded
      setTimeout(() => resolve(true), 100);
    });
  }
  return modelCache[path];
};

// Loading screen component
const LoadingScreen = ({ progress }) => (
  <Html center>
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading model... {Math.round(progress)}%</p>
    </div>
  </Html>
);

// Lazily loaded Model component
const Model = ({ modelPath, isPlaying, setAnimationDuration }) => {
  const { scene, animations } = useGLTF(modelPath);
  const { actions, mixer } = useAnimations(animations, scene);
  const animationAction = useRef(null);
  const { progress } = useProgress();
  
  // Add better material visibility
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
    // Get the first animation
    const animation = Object.values(actions)[0];
    if (animation) {
      animationAction.current = animation;
      
      // Set the animation duration for the parent component
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

  // Control animation play/pause
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
        <primitive 
          object={scene} 
          scale={0.8} 
          position={[0, -0.8, 0]} 
          visible={true}
        />
      </Float>
      <ContactShadows 
        position={[0, -1.4, 0]} 
        opacity={0.6} 
        scale={10} 
        blur={1} 
        far={10} 
      />
    </>
  );
};

// Lazy loaded 3D Scene component
const ModelViewer = ({ modelPath, isPlaying, setAnimationDuration }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Start preloading the model
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
          <>
            <Model
              key={modelPath}
              modelPath={modelPath}
              isPlaying={isPlaying}
              setAnimationDuration={setAnimationDuration}
            />
          </>
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
const ExerciseCard = ({ exercise, isSelected, onClick }) => {
  return (
    <motion.div
      className={`exercise-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      layoutId={`exercise-card-${exercise.name}`}
    >
      <div className="card-content">
        <div className="exercise-icon" style={{ backgroundColor: exercise.color || '#3b82f6' }}>
          <span>{exercise.name.charAt(0)}</span>
        </div>
        <h3>{exercise.name}</h3>
        <div className="card-details">
          <div className="benefits">
            <h4>Benefits</h4>
            <ul>
              {exercise.benefits && exercise.benefits.slice(0, 2).map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className="steps">
            <h4>Key Tips</h4>
            <ol>
              {exercise.tips.slice(0, 2).map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ol>
          </div>
        </div>
        <div className="difficulty">
          <span>Difficulty:</span>
          <div className="difficulty-level">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`difficulty-dot ${i < exercise.difficulty ? 'active' : ''}`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Simplified Player Controls Component
const PlayerControls = ({ isPlaying, togglePlay }) => {
  return (
    <div className="player-controls">
      <div className="control-buttons">
        <button
          onClick={togglePlay}
          className={`control-button play-pause ${isPlaying ? "playing" : ""}`}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4v16a1 1 0 0 0 1.5.86l12-8a1 1 0 0 0 0-1.72l-12-8A1 1 0 0 0 6 4z" />
            </svg>
          )}
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
  const [activeModelPath, setActiveModelPath] = useState('');
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState('intermediate');
  const [filterCategory, setFilterCategory] = useState('All');
  const modelViewerRef = useRef(null);
  
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
  };

  // Enhance exercises with additional properties
  const enhancedExercises = exercises.map((exercise, index) => ({
    ...exercise,
    color: [
      '#3b82f6', // blue
      '#ef4444', // red
      '#10b981', // green
      '#f59e0b', // amber
      '#8b5cf6', // purple
      '#ec4899', // pink
    ][index % 6],
  }));

  // Filter exercises by category
  const filteredExercises = enhancedExercises.filter(exercise => {
    if (filterCategory === 'All') return true;
    
    const muscles = (exercise.primaryMuscle + ' ' + exercise.secondaryMuscle).toLowerCase();
    
    switch(filterCategory) {
      case 'Upper Body':
        return muscles.includes('chest') || 
               muscles.includes('shoulder') || 
               muscles.includes('tricep') || 
               muscles.includes('bicep') ||
               muscles.includes('back');
      case 'Lower Body':
        return muscles.includes('quad') || 
               muscles.includes('hamstring') || 
               muscles.includes('glute') || 
               muscles.includes('calf');
      case 'Core':
        return muscles.includes('core') || 
               muscles.includes('ab') || 
               muscles.includes('oblique');
      default:
        return true;
    }
  });

  // Handle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle card selection
  const handleCardSelect = (index) => {
    if (selectedExercise === index) {
      return; // Already selected
    }
    
    // Reset player state and update model path
    setIsPlaying(false);
    setIsModelLoading(true);
    setSelectedExercise(index);
    setActiveModelPath(filteredExercises[index].modelPath);
    
    // Scroll to model viewer after selection
    setTimeout(() => {
      if (modelViewerRef.current) {
        modelViewerRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  // Handle close model viewer
  const closeModelViewer = () => {
    setIsPlaying(false);
    setSelectedExercise(null);
  };

  // Handle filter change
  const handleFilterChange = (category) => {
    setFilterCategory(category);
    setSelectedExercise(null);
  };

  // Handle difficulty change
  const handleDifficultyChange = (level) => {
    setDifficultyLevel(level);
  };

  // Pre-load models for smoother experience - only when selecting an exercise
  useEffect(() => {
    if (selectedExercise !== null) {
      const modelPath = filteredExercises[selectedExercise].modelPath;
      preloadModel(modelPath).then(() => {
        setIsModelLoading(false);
      });
    }
  }, [selectedExercise, filteredExercises]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <AuthenticatedNavbar user={user} />
      
      <PageWrapper title="Exercise Library">
        <div className="exercise-library">
          <div className="exercise-filter">
            <div className="filter-group">
              <label>Filter by:</label>
              <div className="filter-buttons">
                <button 
                  className={`filter-button ${filterCategory === 'All' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('All')}
                >
                  All
                </button>
                <button 
                  className={`filter-button ${filterCategory === 'Upper Body' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('Upper Body')}
                >
                  Upper Body
                </button>
                <button 
                  className={`filter-button ${filterCategory === 'Lower Body' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('Lower Body')}
                >
                  Lower Body
                </button>
                <button 
                  className={`filter-button ${filterCategory === 'Core' ? 'active' : ''}`}
                  onClick={() => handleFilterChange('Core')}
                >
                  Core
                </button>
              </div>
            </div>
            
            <div className="difficulty-selector">
              <label>Difficulty Level:</label>
              <select 
                value={difficultyLevel}
                onChange={(e) => handleDifficultyChange(e.target.value)}
                className="difficulty-dropdown"
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
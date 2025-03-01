import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  Environment,
  PresentationControls,
  Float,
  Detailed,
  ContactShadows,
  useProgress,
  Html,
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "./PageWrapper.jsx";
import AuthenticatedNavbar from "../../components/LandingPage/AuthenticatedNavbar";
import "./TrainingPage.css"
// Import exercise data
import exercises from "../../data/exercises.js";

// Model component with loading state
const Model = ({ modelPath, isPlaying, animationProgress, setAnimationDuration }) => {
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

  // Control animation progress manually
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
    return (
      <Html center>
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading model... {Math.round(progress)}%</p>
        </div>
      </Html>
    );
  }

  return (
    <>
      <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.2} floatingRange={[0, 0.05]}>
        <Detailed distances={[0, 10, 20]}>
          <primitive object={scene} scale={0.8} position={[0, -0.8, 0]} />
        </Detailed>
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
              {exercise.benefits && exercise.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className="steps">
            <h4>Key Tips</h4>
            <ol>
              {exercise.tips.map((tip, index) => (
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
  const [animationProgress, setAnimationProgress] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(1);
  const [activeModelPath, setActiveModelPath] = useState('');
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
    difficulty: Math.floor(Math.random() * 5) + 1, // Random difficulty 1-5
    benefits: [
      "Improves muscle strength",
      "Enhances flexibility",
      "Promotes better posture",
    ].slice(0, Math.floor(Math.random() * 3) + 1), // Random 1-3 benefits
  }));

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
    setAnimationProgress(0);
    setSelectedExercise(index);
    setActiveModelPath(enhancedExercises[index].modelPath);
    
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <AuthenticatedNavbar user={user} />
      
      <PageWrapper title="Exercise Library">
        <div className="exercise-library">
          <div className="exercise-filter">
            <div className="filter-group">
              <label>Filter by:</label>
              <div className="filter-buttons">
                <button className="filter-button active">All</button>
                <button className="filter-button">Upper Body</button>
                <button className="filter-button">Lower Body</button>
                <button className="filter-button">Core</button>
              </div>
            </div>
          </div>
          
          {/* Exercise Cards Grid */}
          <div className="exercise-grid">
            {enhancedExercises.map((exercise, index) => (
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
                <div className="model-header">
                  <h2>{enhancedExercises[selectedExercise].name}</h2>
                  <button className="close-button" onClick={closeModelViewer}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                <div className="model-content">
                  <div className="canvas-container">
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
                      
                      <PresentationControls
                        global
                        rotation={[0, 0, 0]}
                        polar={[-Math.PI / 4, Math.PI / 4]}
                        azimuth={[-Math.PI / 4, Math.PI / 4]}
                        config={{ mass: 2, tension: 400 }}
                        snap={{ mass: 4, tension: 400 }}
                      >
                        <Model
                          key={activeModelPath} // Add key prop to force re-render when model changes
                          modelPath={activeModelPath}
                          isPlaying={isPlaying}
                          animationProgress={animationProgress}
                          setAnimationDuration={setAnimationDuration}
                        />
                      </PresentationControls>
                      
                      <OrbitControls 
                        minPolarAngle={0} 
                        maxPolarAngle={Math.PI / 2} 
                        enableZoom={true} 
                        enablePan={true} 
                      />
                      <Environment preset="city" />
                    </Canvas>
                  </div>
                  
                  <div className="instructions-panel">
                    <div className="instruction-section">
                      <h3>How to perform</h3>
                      <ol className="instruction-steps">
                        {enhancedExercises[selectedExercise].tips.map((tip, index) => (
                          <li key={index}>
                            <div className="step-number">{index + 1}</div>
                            <div className="step-text">{tip}</div>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="info-section">
                      <div className="info-card">
                        <div className="info-icon muscles">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 3v18M18 3v18"></path>
                            <path d="M6 8h12"></path>
                            <path d="M6 16h12"></path>
                          </svg>
                        </div>
                        <div className="info-content">
                          <h4>Muscles worked</h4>
                          <p>Primary: {enhancedExercises[selectedExercise].primaryMuscle || "Full body"}</p>
                          <p>Secondary: {enhancedExercises[selectedExercise].secondaryMuscle || "Core stabilizers"}</p>
                        </div>
                      </div>
                      
                      <div className="info-card">
                        <div className="info-icon equipment">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                            <path d="M2 8h16v8H2z"></path>
                            <path d="M6 8v8"></path>
                            <path d="M10 8v8"></path>
                            <path d="M14 8v8"></path>
                          </svg>
                        </div>
                        <div className="info-content">
                          <h4>Equipment</h4>
                          <p>{enhancedExercises[selectedExercise].equipment || "No equipment needed"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <PlayerControls 
                  isPlaying={isPlaying}
                  togglePlay={togglePlay}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PageWrapper>
    </div>
  );
};

export default TrainingPage;
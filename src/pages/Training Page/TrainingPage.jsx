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
} from "@react-three/drei";
import { Link } from "react-router-dom";
import PageWrapper from "./PageWrapper.jsx";
import AuthenticatedNavbar from "../../components/LandingPage/AuthenticatedNavbar";

// Import exercise data
import exercises from "../../data/exercises.js";

// Import CSS
import "./TrainingPage.css";

const Model = ({ modelPath, isPlaying, animationProgress, setAnimationDuration }) => {
  const { scene, animations } = useGLTF(modelPath);
  const { actions, mixer } = useAnimations(animations, scene);
  const animationAction = useRef(null);
  
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
        // Set timeScale to control playback speed (0.5 = half speed)
        animation.timeScale = 0.5;
        animation.reset().fadeIn(0.5).play();
      } else {
        animation.paused = true;
      }
    }

    return () => {
      // Cleanup
      if (mixer) {
        mixer.stopAllAction();
      }
    };
  }, [actions, mixer, setAnimationDuration]);

  // Control animation progress manually regardless of playing state
  useEffect(() => {
    if (animationAction.current && mixer) {
      const action = animationAction.current;
      const clip = action.getClip();
      
      if (clip) {
        // Set the animation time directly regardless of playing state
        mixer.setTime(animationProgress * clip.duration);
        
        // When playing, ensure the animation is running
        if (isPlaying) {
          if (action.paused) {
            action.paused = false;
          }
          if (!action.isRunning()) {
            action.play();
          }
        } else {
          // When paused, ensure the animation is paused
          action.paused = true;
        }
      }
    }
  }, [animationProgress, isPlaying, mixer]);

  return (
    <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.2} floatingRange={[0, 0.05]}>
      <Detailed distances={[0, 10, 20]}>
        <primitive object={scene} scale={0.8} position={[0, -0.8, 0]} />
      </Detailed>
    </Float>
  );
};

const TrainingPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.5); // Default to half speed
  const progressInterval = useRef(null);

  // Mock user data - in a real app, this would come from your auth context or API
  const user = {
    name: "John Doe",
    email: "john@example.com",
    // You could include an avatar image URL here
  };

  const currentExercise = exercises[selectedExercise];

  // Handle play/pause
  const togglePlay = () => {
    // When toggling play state, preserve the current progress
    setIsPlaying(!isPlaying);
    
    // Only reset to beginning if it has completed and we're starting again
    if (animationProgress >= 0.99 && !isPlaying) {
      setAnimationProgress(0);
    }
  };

  // Update progress bar when playing
  useEffect(() => {
    if (isPlaying) {
      // Clear any existing interval
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      
      // Set a new interval to update the progress
      progressInterval.current = setInterval(() => {
        setAnimationProgress((prev) => {
          // Adjust increment based on playback speed
          const newProgress = prev + (0.005 * playbackSpeed);
          return newProgress >= 1 ? 0 : newProgress;
        });
      }, animationDuration * 20);
    } else {
      // Clear interval when paused
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, animationDuration, playbackSpeed]);

  // Change exercise
  const handleExerciseChange = (index) => {
    setIsPlaying(false);
    setAnimationProgress(0);
    setSelectedExercise(index);
  };

  // Handle speed change
  const changeSpeed = (newSpeed) => {
    setPlaybackSpeed(newSpeed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthenticatedNavbar user={user} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="training-container">
          {/* Exercise Selection Tabs */}
          <div className="exercise-tabs">
            {exercises.map((exercise, index) => (
              <button
                key={index}
                onClick={() => handleExerciseChange(index)}
                className={`exercise-tab ${selectedExercise === index ? "active" : ""}`}
              >
                {exercise.name}
              </button>
            ))}
          </div>

          {/* Main content */}
          <div className="main-content">
            {/* 3D Viewer */}
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
                    modelPath={currentExercise.modelPath}
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
              
              {/* Timeline scrubber overlay */}
              <div className="timeline-container">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.001"
                  value={animationProgress}
                  onChange={(e) => setAnimationProgress(parseFloat(e.target.value))}
                  className="timeline-scrubber"
                />
              </div>
            </div>
            
            <div className="controls">
              {/* Animation Controls */}
              <div className="control-panel">
                <button
                  onClick={togglePlay}
                  className={`control-button ${isPlaying ? "playing" : ""}`}
                >
                  {isPlaying ? "PAUSE" : "PLAY"}
                </button>
                
                {/* Speed Controls */}
                <div className="speed-controls">
                  <span className="speed-label">Speed:</span>
                  <div className="speed-buttons">
                    <button 
                      onClick={() => changeSpeed(0.25)} 
                      className={`speed-button ${playbackSpeed === 0.25 ? 'active' : ''}`}
                    >
                      0.25x
                    </button>
                    <button 
                      onClick={() => changeSpeed(0.5)} 
                      className={`speed-button ${playbackSpeed === 0.5 ? 'active' : ''}`}
                    >
                      0.5x
                    </button>
                    <button 
                      onClick={() => changeSpeed(2)} 
                      className={`speed-button ${playbackSpeed === 2 ? 'active' : ''}`}
                    >
                      2x
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Exercise Info */}
              <div className="exercise-info">
                <h3>{currentExercise.name}</h3>
                <ul>
                  {currentExercise.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
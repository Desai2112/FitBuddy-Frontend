// Enhanced exercise data with comprehensive details
export const exercises = [
  {
    name: "Squat",
    modelPath: "squat.glb",
    primaryMuscle: "Quadriceps",
    secondaryMuscle: "Glutes, Hamstrings, Core",
    equipment: "Bodyweight (optional: dumbbells, barbell)",
    tips: [
      "Keep your back straight throughout the movement",
      "Position feet shoulder-width apart and toes slightly turned out",
      "Lower until thighs are parallel to ground or as low as comfortable",
      "Keep knees aligned with toes, don't let them collapse inward",
      "Drive through your heels to return to standing position"
    ],
    duration: {
      beginner: "30 seconds",
      intermediate: "45 seconds",
      advanced: "60 seconds"
    },
    sets: {
      beginner: 2,
      intermediate: 3,
      advanced: 4
    },
    reps: {
      beginner: "8-10 reps",
      intermediate: "12-15 reps",
      advanced: "15-20 reps"
    },
    restPeriod: "60-90 seconds between sets",
    difficulty: 2,
    caloriesBurned: "5-8 calories per minute",
    benefits: [
      "Strengthens lower body muscles",
      "Improves mobility in hips and ankles",
      "Enhances core stability",
      "Boosts functional fitness for daily activities"
    ],
    variations: ["Sumo squat", "Goblet squat", "Jump squat", "Bulgarian split squat"],
    formCues: [
      "Imagine sitting back into a chair",
      "Keep chest up and proud",
      "Distribute weight through entire foot"
    ],
    breathingPattern: "Inhale as you lower, exhale as you stand up",
    recommendedFor: "All fitness levels, especially beginners"
  },
  {
    name: "Push-up",
    modelPath: "pushups.glb",
    primaryMuscle: "Chest (Pectorals)",
    secondaryMuscle: "Triceps, Shoulders, Core",
    equipment: "None",
    tips: [
      "Keep your core tight throughout the movement",
      "Position hands slightly wider than shoulders",
      "Lower chest to ground with controlled movement",
      "Keep elbows at 45-degree angle to reduce shoulder strain",
      "Maintain a straight line from head to heels"
    ],
    duration: {
      beginner: "20 seconds",
      intermediate: "30 seconds",
      advanced: "45 seconds"
    },
    sets: {
      beginner: 2,
      intermediate: 3,
      advanced: 4
    },
    reps: {
      beginner: "5-8 reps",
      intermediate: "10-12 reps",
      advanced: "15-20 reps"
    },
    restPeriod: "60 seconds between sets",
    difficulty: 3,
    caloriesBurned: "7-10 calories per minute",
    benefits: [
      "Builds upper body strength",
      "Develops core stability",
      "Improves posture",
      "Enhances pushing power for functional movements"
    ],
    variations: ["Knee push-ups", "Incline push-ups", "Decline push-ups", "Diamond push-ups"],
    formCues: [
      "Create tension throughout your body",
      "Think about screwing your hands into the floor",
      "Actively push the ground away from you"
    ],
    breathingPattern: "Inhale as you lower, exhale as you push up",
    recommendedFor: "All fitness levels with appropriate variations"
  },
  {
    name: "Bicycle Crunch",
    modelPath: "bicycle.glb",
    primaryMuscle: "Core (Rectus Abdominis, Obliques)",
    secondaryMuscle: "Hip Flexors, Lower Back, Quads",
    equipment: "None",
    tips: [
      "Lie on your back with knees bent and hands behind your head",
      "Lift shoulders off the ground and engage core",
      "Alternate bringing opposite elbow to opposite knee",
      "Extend the non-working leg out straight and parallel to the floor",
      "Focus on controlled, fluid movement rather than speed"
    ],
    duration: {
      beginner: "20-30 seconds",
      intermediate: "45-60 seconds",
      advanced: "90+ seconds"
    },
    sets: {
      beginner: 2,
      intermediate: 3,
      advanced: 4
    },
    reps: {
      beginner: "8-12 per side",
      intermediate: "15-20 per side",
      advanced: "25+ per side"
    },
    restPeriod: "30-45 seconds between sets",
    difficulty: 3,
    caloriesBurned: "6-8 calories per minute",
    benefits: [
      "Targets both rectus abdominis and oblique muscles",
      "Improves core strength and stability",
      "Enhances rotational strength for sports and daily activities",
      "Helps develop better mind-muscle connection in the core"
    ],
    variations: [
      "Seated bicycle crunch",
      "Slow-motion bicycle crunch",
      "Elevated bicycle crunch (feet off ground)",
      "Cross-body mountain climbers"
    ],
    formCues: [
      "Imagine bringing your armpit to your opposite hip",
      "Focus on the rotation and contraction in your obliques",
      "Keep your lower back pressed into the floor",
      "Maintain tension in your core throughout the movement"
    ],
    breathingPattern: "Exhale as you bring elbow to knee, inhale as you extend",
    recommendedFor: "All fitness levels with appropriate modifications"
  }
];

export default exercises;
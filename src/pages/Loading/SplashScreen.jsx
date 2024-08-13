import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0); // State for percentage progress

  // Gradual steps for progress (0, 17, 33, 50, 66, 83, 100)
  useEffect(() => {
    // Gradual increments for progress
    const steps = [0, 17, 33, 50, 66, 83, 100];
    let currentStep = 0;

    const interval = setInterval(() => {
      setProgress(steps[currentStep]);
      currentStep++;

      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(onComplete, 500); // Call onComplete when progress reaches 100
      }
    }, 300); // Increment every 300ms

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [onComplete]);

  // Split the website name into an array of letters
  const websiteName = "LODGIO";
  const letters = websiteName.split("");

  return (
    <div className="splash-screen fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50">
      {/* Website name in bottom-left corner */}
      <motion.div
        className="website-name absolute bottom-10 left-10 text-4xl font-medium text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5, // Complete in 1.5 seconds
        }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="letter"
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2 * index, // Stagger the animation of each letter
              duration: 0.5,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Percentage Counter in top-right corner */}
      <motion.div
        className="splash-content absolute top-10 right-10 flex items-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }} // Keep visible throughout the animation
      >
        {/* Percentage Counter */}
        <motion.div
          className="counter text-gray-800 text-5xl font-medium"
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {progress}%
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;

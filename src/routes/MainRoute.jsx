import { RouterProvider } from "react-router-dom";
import Router from "../routes/Router"; // Correct import for your custom router
import SplashScreen from "../pages/Loading/SplashScreen";
import { useEffect, useState } from "react";

const MainRoute = () => {
  const [showContent, setShowContent] = useState(false); // State to control content visibility

  useEffect(() => {
    setShowContent(false); // Initially, show splash screen
  }, []);

  const handleSplashComplete = () => {
    setShowContent(true); // After splash screen animation, show the main content
  };

  return (
    <div>
      {!showContent ? (
        // Show splash screen while waiting for animation to complete
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        // Show the router and main content after splash screen completes
        <RouterProvider router={Router} />
      )}
    </div>
  );
};

export default MainRoute;

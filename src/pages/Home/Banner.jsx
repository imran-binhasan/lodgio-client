import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const Banner = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const slides = [
    {
      type: "image",
      src: "https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/apartments/wp-content/uploads/sites/4/2022/05/parallax1.jpeg",
    },
    {
      type: "image",
      src: "https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/apartments/wp-content/uploads/sites/4/2022/05/parallax2.jpeg",
    },
    {
      type: "video",
      src: "https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/apartments/wp-content/uploads/sites/4/2022/05/video-home-6.mp4",
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const slides = container.querySelectorAll(".slide");

    const timeline = gsap.timeline();

    // Animate the first two slides quickly
    slides.forEach((slide, index) => {
      if (index < 2) {
        timeline
          .to(
            slide,
            {
              xPercent: -100 * index, // Full-slide transition
              opacity: 1, // Fade-in
              scale: 1.3, // Enhanced zoom effect
              duration: 0.6, // Much faster animation speed
              ease: "power3.inOut", // Smooth easing
            },
            `+=0.1` // Less delay between slides for quicker transitions
          )
          .to(
            slide,
            {
              opacity: 0, // Fade-out
              duration: 0.2, // Much faster fade-out
            },
            "+=0.1" // Hold the slide for a very short time
          );
      }
    });

    // Transition directly to video with no delay
    timeline
      .to(slides[2], {
        opacity: 1, // Make video appear immediately
        scale: 1.3, // Optional: Add zoom-in effect to the video
        duration: 0.6, // Faster duration for video fade-in
        ease: "power3.inOut",
      })
      .to(slides[2], {
        opacity: 1, // Keep the video visible permanently
        duration: 0, // Do not animate further
      });

    // Stop the animation once the video is displayed
    timeline.add("end");

    // Clean up the animation on unmount
    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[70vh] overflow-hidden">
      {/* Parallax Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide absolute inset-0 w-full h-full ${slide.type === "image" ? "bg-cover bg-center" : ""}`}
          style={{
            backgroundImage: slide.type === "image" ? `url(${slide.src})` : "",
            zIndex: slides.length - index, // Ensuring proper stacking order
            opacity: index === 2 ? 0 : 1, // Hide video initially
            transition: "opacity 0.3s ease-in-out", // Smooth transition for opacity change
          }}
        >
          {slide.type === "video" && (
            <video
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
              style={{ filter: "blur(4px)" }} // Stronger blur for video
            >
              <source src={slide.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Overlay Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
        <h1 className="text-4xl md:text-5xl mb-4">
          DISCOVER LUXURY STAYS
        </h1>
        <p className="text-lg md:text-xl mb-6">
          EXPERIENCE THE PERFECT BLEND OF ELEGANCE AND COMFORT IN THE HEART OF THE CITY.
        </p>
        <button
          onClick={() => navigate("/rooms")}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition duration-300"
        >
          EXPLORE ROOMS
        </button>
      </div>
    </div>
  );
};

export default Banner;

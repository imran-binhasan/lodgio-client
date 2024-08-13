import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBed, FaSwimmer, FaConciergeBell } from "react-icons/fa";

const images = [
  "https://i.ibb.co.com/9bLp66F/1-9.jpg", // Replace with your image paths
  "https://i.ibb.co.com/9bLp66F/1-9.jpg", // Replace with your image paths
  "https://i.ibb.co.com/9bLp66F/1-9.jpg", // Replace with your image paths
  "https://i.ibb.co.com/9bLp66F/1-9.jpg", // Replace with your image paths
  "https://i.ibb.co.com/9bLp66F/1-9.jpg", // Replace with your image paths
  "https://i.ibb.co.com/9bLp66F/1-9.jpg", // Replace with your image paths
];

const Gallery = () => {
  useEffect(() => {
    // Register ScrollTrigger plugin with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Scroll-based animations for sections
    gsap.from(".section-title", {
      scrollTrigger: {
        trigger: ".section-title",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false, // Set to true to debug
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });

    gsap.from(".gallery-item", {
      scrollTrigger: {
        trigger: ".gallery-item",
        start: "top 90%",
        end: "bottom 10%",
        scrub: true,
        markers: false, // Set to true to debug
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });

    gsap.from(".amenity-icon", {
      scrollTrigger: {
        trigger: ".amenity-icon",
        start: "top 90%",
        end: "bottom 10%",
        scrub: true,
        markers: false, // Set to true to debug
      },
      opacity: 0,
      x: -100,
      duration: 1,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">

      {/* Introduction Section */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-5xl font-extrabold section-title">Welcome to Our Luxury Hotel</h1>
        <p className="mt-4 text-lg text-gray-200">Experience the finest hospitality and world-class amenities. Explore our rooms, services, and more.</p>
      </section>

      {/* Gallery Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12 section-title">Explore Our Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-xl gallery-item"
            >
              <img
                src={image}
                alt={`Hotel Room ${index + 1}`}
                className="w-full h-64 object-cover transform transition-all duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 py-2">
                <h3 className="text-xl font-bold">Room {index + 1}</h3>
                <p className="mt-2">Luxury Experience</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-800 to-purple-900">
        <h2 className="text-4xl font-bold text-center text-white mb-12 section-title">Our Amenities</h2>
        <div className="flex justify-center gap-12">
          <div
            className="flex items-center flex-col text-white text-lg amenity-icon"
          >
            <FaBed className="text-6xl mb-2" />
            <p>Luxurious Rooms</p>
          </div>
          <div
            className="flex items-center flex-col text-white text-lg amenity-icon"
          >
            <FaSwimmer className="text-6xl mb-2" />
            <p>Swimming Pool</p>
          </div>
          <div
            className="flex items-center flex-col text-white text-lg amenity-icon"
          >
            <FaConciergeBell className="text-6xl mb-2" />
            <p>Concierge Service</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-br from-blue-900 to-purple-900">
        <h2 className="text-4xl font-bold text-white mb-12 section-title">Customer Testimonials</h2>
        <p className="text-lg text-gray-200">
          "Our stay was absolutely amazing! The service, the rooms, and the amenities exceeded all expectations."
        </p>
        <p className="mt-4 text-lg text-gray-200">
          - John Doe, Business Traveler
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-br from-blue-800 to-purple-900">
        <h2 className="text-4xl font-bold text-white mb-12 section-title">Ready to Book Your Stay?</h2>
        <button className="px-8 py-3 bg-yellow-500 text-black rounded-full text-xl">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default Gallery;

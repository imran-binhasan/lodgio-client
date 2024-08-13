import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedRooms = () => {
  const navigate = useNavigate();

  // Room data: Example rooms
  const rooms = [
    {
      id: 1,
      name: "Ocean View Suite",
      description: "A luxurious suite with a breathtaking ocean view.",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Mountain Retreat",
      description: "A peaceful room surrounded by beautiful mountain views.",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "City Skyline Room",
      description: "A modern room with an amazing city skyline view.",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 4,
      name: "Forest Hideaway",
      description: "A cozy room for nature lovers, nestled in the forest.",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 5,
      name: "Beachfront Paradise",
      description: "Stay steps away from the beach in this amazing room.",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 6,
      name: "Garden Oasis",
      description: "A room surrounded by lush greenery, perfect for relaxation.",
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center mb-8">Featured Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold">{room.name}</h3>
              <p className="text-gray-600 mt-2">{room.description}</p>
              <button
                onClick={() => navigate(`/rooms/${room.id}`)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;

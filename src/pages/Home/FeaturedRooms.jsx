import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FeaturedRooms = () => {
  const navigate = useNavigate();

  const [rooms,setRooms] = useState([]);
  useEffect(()=>{
    axios.get('https://lodgio-server.vercel.app/room/rated')
    .then(res => setRooms(res.data))
  },[])

  return (
    <div className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center mb-8">Featured Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img src={room.imageUrl} alt={room.roomName} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-medium">{room.roomName}</h3>
              <p className="text-gray-600 mt-2 line-clamp-2">{room.description}</p>
              <button
                onClick={() => navigate(`/room/${room._id}`)}
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

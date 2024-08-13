import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'



const Rooms = () => {
  const [roomData,setRoomData] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/rooms')
.then(res => {
  setRoomData(res.data),
  console.log(res.data)
})
  },[])
  const navigate = useNavigate();

  return (
    <div className="px-6 py-10">
      {/* Title and Description */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Our Rooms</h1>
        <p className="text-gray-600 mt-4">
          Indulge in the ultimate blend of elegance and comfort in our meticulously designed rooms. Choose your room today.
        </p>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomData.map((room, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => navigate(`/room/${room._id}`)}
          >
            {/* Room Image */}
            <img
              src={room.imageUrl}
              alt={room.name}
              className="w-full h-60 object-cover transform group-hover:scale-110 transition duration-300"
            />
            {/* Room Info */}
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{room.roomName}</h3>
                <p className="text-sm text-gray-500">{room.hotelName}</p>
              </div>
              <p className="text-lg font-semibold text-gray-800">${room.pricePerNight}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;

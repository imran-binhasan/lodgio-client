import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const Rooms = () => {
  const [roomData, setRoomData] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/rooms").then((res) => {
      setRoomData(res.data);
      console.log(res.data);
    });
  }, []);
  const navigate = useNavigate();

  const handleFilterChange = (event) => {
    setPriceFilter(event.target.value);
    console.log(event.target.value)
    axios
      .get(`http://localhost:5000/rooms?priceRange=${event.target.value}`)
      .then(() => {
        // Handle filtered data (response.data)
      })
      .catch((err) => console.error("Error fetching filtered rooms:", err));
  };

  return (
    <>
      <Helmet>
        <title>Rooms - Lodgio</title>
        <meta
          name="description"
          content="Explore our luxurious rooms at Lodgio."
        />
      </Helmet>

      <div className="px-6 py-10">
        {/* Title and Description */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">Our Rooms</h1>
          <p className="text-gray-600 mt-4">
            Indulge in the ultimate blend of elegance and comfort in our
            meticulously designed rooms. Choose your room today.
          </p>
        </div>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6 px-4">
            {/* Empty Spacer */}
            <div></div>

            {/* Price Range Filter */}
            <div className="w-full max-w-xs">
              <label
                htmlFor="price-filter"
                className="block text-lg font-medium text-gray-700"
              >
                Filter by Price Range:
              </label>
              <select
                id="price-filter"
                value={priceFilter}
                onChange={handleFilterChange}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm hover:border-gray-500 transition duration-300"
              >
                <option value="">Select Price Range</option>
                <option value="lowest">Lowest</option>
                <option value="100-200">$100 - $200</option>
                <option value="200-300">$200 - $300</option>
                <option value="300-400">$300 - $400</option>
                <option value="highest"> Highest</option>
               
              </select>
            </div>
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
                  <p className="text-lg font-semibold text-gray-800">
                    ${room.pricePerNight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;

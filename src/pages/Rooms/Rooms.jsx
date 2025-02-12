import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import AuthContext from "../../context/AuthContext";

const Rooms = () => {
  const [roomData, setRoomData] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);
  const { loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    // Fetch data whenever currentPage or priceFilter changes
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(
          `https://lodgio-server.vercel.app/rooms?page=${currentPage}&priceRange=${priceFilter}`
        );
        setRoomData(response.data.rooms);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [currentPage, priceFilter, setLoading]); // Add currentPage, priceFilter, and setLoading as dependencies

  const navigate = useNavigate();

  const handleFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          <h1 className="text-4xl font-medium">Our Rooms</h1>
          <p className="text-gray-600 mt-4">
            Indulge in the ultimate blend of elegance and comfort in our
            meticulously designed rooms. Choose your room today.
          </p>
        </div>

        {/* Content Container */}
        <div className="max-w-8xl mx-auto">
          {loading ? ( // Show loading spinner while loading
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
          ) : (
            <>
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
                    <option value="lowest-first">Lowest to Highest</option>
                    <option value="100-200">$100 - $200</option>
                    <option value="200-300">$200 - $300</option>
                    <option value="300-400">$300 - $400</option>
                    <option value="highest-first"> Highest to Lowest</option>
                  </select>
                </div>
              </div>

              {/* Room Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                        <h3 className="text-xl font-medium">{room.roomName}</h3>
                        <p className="text-sm text-gray-500">{room.hotelName}</p>
                      </div>
                      <p className="text-lg font-semibold text-gray-800">
                        ${room.pricePerNight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mx-2 bg-lime-200 disabled:bg-gray-100 text-gray-700 rounded-md"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-lg">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 mx-2 bg-lime-200 disabled:bg-gray-100 text-gray-700 rounded-md"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Rooms;

import { useContext, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { format } from "date-fns"; // For date formatting
import DatePicker from "react-datepicker"; // Install `react-datepicker` for the date picker
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import PrivateRoute from "../../routes/PrivateRoute";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RoomDetails = () => {
  const { user } = useContext(AuthContext);
  const param = useParams();
  const roomId = param.id;
  const roomData = useLoaderData();

  const {
    hotelName,
    roomName,
    pricePerNight,
    features,
    amenities,
    roomFeatures,
    extraServices,
    imageUrl,
    description,
    reviews,
    booked,
    _id,
  } = roomData;

  // State for modal and date selection
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [nights, setNights] = useState(1); // State for number of nights

  const totalCost = nights * pricePerNight;

  const handleBooking = () => {
    if (!selectedDate) {
      toast.error("Please select a date to proceed with the booking.");
      return;
    }

    const userEmail = user.email;
    const booking = {
      roomId,
      roomName,
      selectedDate: format(selectedDate, "yyyy-MM-dd"),
      nights,
      totalCost,
      userEmail,
    };

    // Post booking details
    axios
      .post("https://lodgio-server.vercel.app/bookings", booking,{withCredentials:true})
      .then(() => {
        // Update room status to booked
        return axios.patch(`https://lodgio-server.vercel.app/room/${_id}`, {
          booked: true,
        },{withCredentials:true});
      })
      .then(() => {
        setIsModalOpen(false);
        toast.success("Booked successfully")
        // Update local state to reflect the new booking status
        roomData.booked = true; // Direct modification of loader data
      })
      .catch((err) => {
        console.error("Error during booking:", err);
        toast.error("Booking failed. Please try again.");
      });
  };

  return (
    <>
      <Helmet>
        <title>{roomName} - Lodgio</title>
        <meta name="description" content="Room Details" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <ToastContainer/>
        {/* Image Section */}
        <div className="mb-6">
          <img
            src={imageUrl}
            alt={`${roomName}`}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Room Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2">
            <h1 className="text-4xl font-medium mb-2">{roomName}</h1>
            <p className="text-gray-500 text-sm mb-4">{hotelName}</p>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            <p className="text-gray-600 text-sm mb-4">
              <span>{features.guests} Guests</span> ·{" "}
              <span>{features.size} Room Size</span> ·{" "}
              <span>{features.type}</span> · <span>{features.bedType}</span>
            </p>

            {/* Amenities */}
            <h2 className="text-2xl font-semibold mb-4">Room Amenities</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <h2 className="text-2xl font-semibold mb-4">Room Features</h2>
            <ul className="space-y-4 mb-6">
              {roomFeatures.map((feature, index) => (
                <li key={index} className="text-gray-700">
                  <strong>{feature.title}:</strong> {feature.description}
                </li>
              ))}
            </ul>

            {/* Extra Services */}
            <h2 className="text-2xl font-semibold mb-4">Extra Services</h2>
            <ul className="space-y-4 mb-6">
              {extraServices.map((service, index) => (
                <li key={index} className="text-gray-700">
                  <strong>{service.name}:</strong> ${service.price}
                </li>
              ))}
            </ul>

            {/* Reviews */}
            <h2 className="text-2xl font-medium mb-4">
              Reviews{" "}
              <span className="text-gray-500 text-lg">
                ({reviews?.length || 0} total)
              </span>
            </h2>
            {reviews?.length > 0 ? (
              <ul className="space-y-4 mb-6">
                {reviews.map((review, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 p-4 rounded-md shadow-md"
                  >
                    <div className="flex items-center mb-2">
                      <img
                        src={review.userImage}
                        alt={review.username}
                        className="w-10 h-10 rounded-full mr-3"
                        onError={(e) => {
                          e.target.onerror = null; // Prevent looping
                          e.target.src =
                            "https://img.icons8.com/pulsar-gradient/48/guest-male.png"; // Fallback image
                        }}
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">
                          {review.username}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {new Date(review.timestamp).toLocaleDateString()} at{" "}
                          {new Date(review.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <span className="text-yellow-500">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </div>
                    <p className="text-gray-800">{review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                No reviews available for this room.
              </p>
            )}
          </div>

          {/* Booking Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Reserve{" "}
              <span className="text-gray-500">From ${pricePerNight}/night</span>
            </h2>
            <button
              disabled={booked}
              className={`w-full ${
                booked ? "bg-gray-400" : "hover:bg-gray-800 bg-gray-600"
              } text-white py-2 px-4 rounded-md transition duration-300`}
              onClick={() => setIsModalOpen(true)}
            >
              {booked ? "Unavailable" : "Book Now"}
            </button>
          </div>
        </div>

        {/* Booking Modal */}
        {isModalOpen && (
          <PrivateRoute>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
                <p className="text-gray-700 mb-2">
                  <strong>Room:</strong> {roomName}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Hotel:</strong> {hotelName}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Price Per Night:</strong> ${pricePerNight}
                </p>
                <label
                  htmlFor="booking-date"
                  className="block text-gray-600 mb-2"
                >
                  Select Booking Date
                </label>
                <DatePicker
                  id="booking-date"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={new Date()}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
                <label
                  htmlFor="nights"
                  className="block text-gray-600 mt-4 mb-2"
                >
                  Number of Nights
                </label>
                <input
                  type="number"
                  id="nights"
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value) || 1)}
                  min="1"
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
                <p className="text-gray-700 mt-4">
                  <strong>Total Cost:</strong> ${totalCost}
                </p>
                <div className="flex justify-between items-center mt-6">
                  <button
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
                    onClick={handleBooking}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </PrivateRoute>
        )}
      </div>
    </>
  );
};

export default RoomDetails;

import { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const BookingDetails = () => {
  const {user} = useContext(AuthContext)
  const bookingData = useLoaderData();
  const {
    imageUrl,
    nights,
    pricePerNight,
    roomName,
    selectedDate,
    totalCost,
    userEmail,
    _id,
    roomId
  } = bookingData;

  const [initialDate, setInitialDate] = useState(selectedDate);
  const [editableDate, setEditableDate] = useState(selectedDate);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [bookingStatus, setBookingStatus] = useState("active");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const loggedInUser = user.displayName || 'Guest' ;
  const email = user.email;
  const photoURL = user.photoURL;
  const reviewState = bookingData.isReviewed || false;
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setInitialDate(selectedDate);
    setEditableDate(selectedDate);
  }, [selectedDate]);

  const handleUpdateDate = async () => {
    await axios.patch(`http://localhost:5000/booking/${_id}`, { selectedDate: editableDate });
    setInitialDate(editableDate);
    setMessage("Date updated successfully!");
  };

  const handleCancelBooking = async () => {
    await axios.delete(`http://localhost:5000/booking/${_id}`);
    await axios.patch(`http://localhost:5000/room/${roomId}`, { booked: false });
    setBookingStatus("cancelled");
    setMessage("Booking cancelled successfully!");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    const reviewData = { username: loggedInUser,email,userImage: photoURL, rating, comment: review, timestamp, bookingId : _id};
    console.log(reviewData)
    await axios.post(`http://localhost:5000/room/${roomId}`, reviewData);
    await axios.patch(`http://localhost:5000/booking/review/${_id}`,{isReviewed : true})
    setMessage("Review submitted successfully!");
    setIsReviewModalOpen(false);
    setRating(0);
    setReview("");
  };

  const handleReviewDelete = async (e) => {
    e.preventDefault()
    await axios.delete(`http://localhost:5000/room/${roomId}`, { params: { _id } });

    await axios.patch(`http://localhost:5000/booking/review/${_id}`,{isReviewed : false})
  }

  console.log(reviewState)

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      {bookingStatus === "cancelled" ? (
        <div className="text-center text-red-600 text-xl font-semibold">
          Booking has been cancelled.
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <img
              src={imageUrl}
              alt={roomName}
              className="w-full lg:w-1/2 h-64 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {roomName}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-400 mb-2">
                <span className="font-medium">Price per Night:</span> ${pricePerNight}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-400 mb-2">
                <span className="font-medium">Nights:</span> {nights}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-400 mb-2">
                <span className="font-medium">Selected Date:</span> {initialDate}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-400">
                <span className="font-medium">Total Cost:</span> ${totalCost}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-400">
                <span className="font-medium">User Email:</span> {userEmail}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <input
              type="date"
              value={editableDate}
              onChange={(e) => setEditableDate(e.target.value)}
              className="w-full sm:w-auto p-3 border rounded-md dark:bg-gray-700 dark:text-gray-300"
              min={today}
            />
            <button
              onClick={handleUpdateDate}
              className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              Update Date
            </button>
            <button
              onClick={handleCancelBooking}
              className="flex-1 bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
            >
              Cancel Booking
            </button>
          </div>

          <div className="mt-12">
            <button
              disabled={reviewState == true}
              onClick={() => setIsReviewModalOpen(true)}
              className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition"
            >
              {reviewState?'Rated':'Rate Experience'}
            </button>
          </div>
          <div className="mt-12">
            <button
            onClick={handleReviewDelete}
              className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition"
            >
             delete
            </button>
          </div>
        </>
      )}

      

      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Write a Review
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-400 mb-2">
              <span className="font-medium">Username:</span> {loggedInUser}
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Your Rating:
              </p>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <button
                    key={index}
                    className={`text-2xl ${index < rating ? "text-yellow-500" : "text-gray-400"}`}
                    onClick={() => setRating(index + 1)}
                    aria-label={`Rate ${index + 1} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              rows="4"
              className="w-full p-4 border rounded-md dark:bg-gray-700 dark:text-gray-300 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}



      {message && (
        <div className="mt-4 p-3 text-center bg-gray-100 dark:bg-gray-700 rounded-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default BookingDetails;

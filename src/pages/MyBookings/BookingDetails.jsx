import { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { Helmet } from "react-helmet";
import moment from "moment";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiChatDeleteLine } from "react-icons/ri";

const BookingDetails = () => {
  const { user } = useContext(AuthContext);
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
    roomId,
  } = bookingData;

  const [initialDate, setInitialDate] = useState(selectedDate);
  const [editableDate, setEditableDate] = useState(selectedDate);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [bookingStatus, setBookingStatus] = useState("active");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [myReview, setMyReview] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false)

  const loggedInUser = user.displayName || "Guest";
  const email = user.email;
  const photoURL = user.photoURL;
  const reviewState = bookingData.isReviewed || false;
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setInitialDate(selectedDate);
    setEditableDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    const fetchReviews = async () => {
      await axios
       .get(`http://localhost:5000/review/${roomId}`, { params: { _id } })
      .then((res) => setMyReview(res.data));
    };
  
    fetchReviews();
  }, [roomId, shouldFetch]);
  

  const handleUpdateDate = async () => {
    try {
      await axios.patch(`http://localhost:5000/booking/${_id}`, {
        selectedDate: editableDate,
      });
      setInitialDate(editableDate);
      toast.success("Date updated successfully!");
    } catch (error) {
      console.error("Error updating date:", error);
      toast.error("Failed to update the date. Please try again.");
    }
  };

  const handleCancelBooking = async () => {
    const cancelLimitDate = moment(selectedDate).subtract(1, "days");
    const today = moment();

    if (today.isAfter(cancelLimitDate)) {
      toast.error(
        "Cancellation is no longer allowed. You can only cancel until one day before the booking date."
      );
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/booking/${_id}`);
          await axios.patch(`http://localhost:5000/room/${roomId}`, {
            booked: false,
          });
          setBookingStatus("cancelled");
          toast.success("Booking cancelled successfully!");
        } catch (error) {
          console.error("Error cancelling booking:", error);
          toast.error("Failed to cancel the booking. Please try again.");
        }
      }
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    const reviewData = {
      username: loggedInUser,
      email,
      userImage: photoURL,
      rating,
      comment: review,
      timestamp,
      bookingId: _id,
    };

    try {
      await axios.post(`http://localhost:5000/room/${roomId}`, reviewData);
      await axios.patch(`http://localhost:5000/booking/review/${_id}`, {
        isReviewed: true,
      });

      setShouldFetch((prev) => !prev);

      Swal.fire({
        title: "Success!",
        text: "Review submitted successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });

      setIsReviewModalOpen(false);
      setRating(0);
      setReview("");
      
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to submit the review. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleReviewDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/room/${roomId}`, {
            params: { _id },
          });
          await axios.patch(`http://localhost:5000/booking/review/${_id}`, {
            isReviewed: false,
          });
          toast.success("Review deleted successfully!");
          setMyReview('')
        } catch (error) {
          console.error("Error deleting review:", error);
          toast.error("Failed to delete the review. Please try again.");
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Booking Details - Lodgio</title>
        <meta
          name="description"
          content="View detailed information about your booking."
        />
      </Helmet>

      <div className="p-6 md:p-10 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <ToastContainer />

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
                  <span className="font-medium">Price per Night:</span> $
                  {pricePerNight}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-400 mb-2">
                  <span className="font-medium">Nights:</span> {nights}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-400 mb-2">
                  <span className="font-medium">Selected Date:</span>{" "}
                  {initialDate}
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
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Update Date
              </button>
              <button
                onClick={handleCancelBooking}
                className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
              >
                Cancel Booking
              </button>
            </div>

            <div className="mt-12 flex gap-4">
              <button
                disabled={reviewState === true}
                onClick={() => setIsReviewModalOpen(true)}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
              >
                {reviewState ? "Rated" : "Rate Experience"}
              </button>
            </div>

            {myReview ? (
              <div className="flex items-center my-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <img
                  src={myReview.userImage}
                  alt={myReview.username}
                  className="w-12 h-12 rounded-full mr-4"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent looping
                    e.target.src =
                      "https://img.icons8.com/pulsar-gradient/48/guest-male.png"; // Fallback image
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {myReview.username}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {new Date(myReview.timestamp).toLocaleDateString()} at{" "}
                    {new Date(myReview.timestamp).toLocaleTimeString()}
                  </p>
                  <div className="mb-2">
                    <span className="text-yellow-500">
                      {"★".repeat(myReview.rating)}
                      {"☆".repeat(5 - myReview.rating)}
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-300">
                    {myReview.comment}
                  </p>
                </div>
                <button
                  onClick={handleReviewDelete}
                  className="text-red-600 hover:text-red-700 transition"
                  aria-label="Delete Review"
                >
                  <RiChatDeleteLine size={24} className="hover:scale-105 cursor-pointer" />
                </button>
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                You haven't rated yet !
              </div>
            )}
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
                      className={`text-2xl ${
                        index < rating ? "text-yellow-500" : "text-gray-400"
                      }`}
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

      </div>
    </>
  );
};

export default BookingDetails;

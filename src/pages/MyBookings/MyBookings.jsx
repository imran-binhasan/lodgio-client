import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const MyBooking = () => {
  const [myBooking, setMyBooking] = useState([]);
  const { user} = useContext(AuthContext);
  // States for Modals and Inputs
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [myReview, setMyReview] = useState(null);

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [newDate, setNewDate] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    axios
      .get(`https://lodgio-server.vercel.app/bookings?email=${user.email}`,{withCredentials:true})
      .then((res) => setMyBooking(res.data));
  }, [user.email]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const timestamp = moment().toISOString();
    const reviewData = {
      username: user.displayName,
      email: user.email,
      userImage: user.photoURL,
      rating,
      comment: review,
      timestamp,
      bookingId: selectedBookingId,
    };

    try {
      await axios.post(
        `https://lodgio-server.vercel.app/room/${selectedRoomId}`,
        reviewData,{withCredentials:true}
      );
      await axios.patch(
        `https://lodgio-server.vercel.app/booking/review/${selectedBookingId}`,
        {
          isReviewed: true,
        },{withCredentials:true}
      );

      Swal.fire({
        title: "Success!",
        text: "Review submitted successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });

      setIsReviewModalOpen(false);
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

  const openDateModal = (booking) => {
    setSelectedBookingId(booking._id);
    setNewDate(moment().format("YYYY-MM-DD")); // Initialize with today's date
    setIsDateModalOpen(true);
  };
  
  const handleReviewClick = async (booking) => {
    setSelectedBookingId(booking._id);
    setSelectedRoomId(booking.roomId);

    try {
      const res = await axios.get(
        `https://lodgio-server.vercel.app/review/${booking.roomId}`,
        { params: { bId: booking._id } }
      );
      setMyReview(res.data);
    } catch (error) {
      console.error("Error fetching review:", error);
    }

    setIsReviewModalOpen(true);
  };

  const handleUpdateDate = async () => {
    try {
      await axios.patch(`https://lodgio-server.vercel.app/booking/${selectedBookingId}`, {
        selectedDate: moment(newDate).toISOString(),
      },{withCredentials:true});
      toast.success("Date updated successfully!");
  
      // Re-fetch updated bookings
      const res = await axios.get(`https://lodgio-server.vercel.app/bookings?email=${user.email}`,{withCredentials:true});
      setMyBooking(res.data);
  
      setIsDateModalOpen(false);
    } catch (error) {
      toast.error("Failed to update the date. Please try again.");
    }
  };

  const handleCancelBooking = async (booking) => {
    const cancelLimitDate = moment(booking.selectedDate).subtract(1, "days");
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
          await axios.delete(`https://lodgio-server.vercel.app/booking/${booking._id}`,{withCredentials:true});
          await axios.patch(`https://lodgio-server.vercel.app/room/${booking.roomId}`, {
            booked: false,
          },{withCredentials:true});
  
          // Update the state to remove the canceled booking
          setMyBooking((prevBookings) =>
            prevBookings.filter((b) => b._id !== booking._id)
          );
  
          toast.success("Booking cancelled successfully!");
        } catch (error) {
          console.error("Error cancelling booking:", error);
          toast.error("Failed to cancel the booking. Please try again.");
        }
      }
    });
  };
  
  
  return (
    <>
      <Helmet>
        <title>My Bookings - Lodgio</title>
        <meta
          name="description"
          content="View and manage your bookings at Lodgio."
        />
      </Helmet>
      <div className="lg:w-11/12 mx-auto px-4 py-8">
        <ToastContainer/>
        <h1 className="text-4xl font-medium text-center mb-8">My Bookings</h1>

        {myBooking.length === 0 ? (
          <p className="text-gray-500 text-center">You have no bookings yet.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-2 md:px-4 text-left text-sm font-semibold text-gray-700 hidden sm:table-cell">
                Image
              </th>
              <th className="py-3 px-2 md:px-4 text-left text-sm font-semibold text-gray-700">
                Room Name
              </th>
              <th className="py-3 px-2 md:px-4 text-left text-sm font-semibold text-gray-700 hidden sm:table-cell">
                Hotel Name
              </th>
              <th className="py-3 px-2 md:px-4 text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="py-3 px-2 md:px-4 text-left text-sm font-semibold text-gray-700">
                Booked Date
              </th>
              <th className="py-3 px-2 md:px-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {myBooking.map((booking) => (
              <tr
                key={booking._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="py-2 px-2 md:px-4 text-sm text-gray-700 hidden sm:table-cell">
                  <img
                    src={booking.imageUrl}
                    alt={`${booking.roomName}`}
                    className="w-16 xl:w-28 lg:w-24 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-2 px-2 md:px-4 text-sm text-gray-700 ">
                  {booking.roomName}
                </td>
                <td className="py-2 px-2 md:px-4 text-sm text-gray-700 hidden sm:table-cell">
                  {booking.hotelName}
                </td>
                <td className="py-2 px-2 md:px-4 text-sm text-gray-700">
                  ${booking.pricePerNight * booking.nights}
                </td>
                <td className="py-2 px-2 md:px-4 text-sm text-gray-700">
                  {moment(booking.selectedDate).format("MMMM Do YYYY")}
                </td>
                <td className="py-2 px-2 space-y-1 text-sm xl:space-x-4 xl:px-4">
                  <button
                    onClick={() => openDateModal(booking)}
                    className="bg-yellow-500 text-white py-2 sm:px-2  lg:px-4 rounded-md hover:bg-yellow-600 transition duration-300 w-full sm:w-auto whitespace-nowrap mr-1"
                  >
                    Update Date
                  </button>
                  <button
                    onClick={() => handleReviewClick(booking)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full sm:w-auto mr-1"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => handleCancelBooking(booking)}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}

        {/* Review Modal */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
              {myReview ? (
                <>
                  <h3 className="text-2xl font-semibold mb-4">Your Review</h3>
                  <p>
                    <strong>Rating:</strong> {myReview.rating} / 5
                  </p>
                  <p>
                    <strong>Comment:</strong> {myReview.comment}
                  </p>
                  <button
                    onClick={() => setIsReviewModalOpen(false)}
                    className="bg-gray-400 text-white py-2 px-4 mt-2  rounded-md"
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">
                    Write a Review
                  </h3>
                  <p className="md:text-lg">
                    Your Name: {user.displayName}
                  </p>
                  <div className="flex items-center space-x-2 mb-4">
                  
                    <p className="md:text-lg">Your Rating:</p>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setRating(index + 1)}
                        className={`text-2xl ${
                          index < rating ? "text-yellow-500" : "text-gray-400"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here..."
                    rows="4"
                    className="w-full p-4 border rounded-md mb-4"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsReviewModalOpen(false)}
                      className="bg-gray-400 text-white py-2 px-4 rounded-md mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReviewSubmit}
                      className="bg-green-600 text-white py-2 px-4 rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Date Picker Modal */}
        {isDateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Update Booking Date
              </h3>
              <input
                type="date"
                value={newDate}
                min={moment().format("YYYY-MM-DD")}
                onChange={(e) => setNewDate(e.target.value)}
                className="border rounded-md p-2 w-full"
              />

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setIsDateModalOpen(false)}
                  className="bg-gray-400 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateDate}
                  className="bg-green-600 text-white py-2 px-4 rounded-md"
                >
                  Update Date
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBooking;

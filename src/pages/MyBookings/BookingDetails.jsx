import { useState } from "react";
import { motion } from "framer-motion";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

const BookingDetails = () => {
  const bookingData = useLoaderData();
  const {
    imageUrl,
    nights,
    pricePerNight,
    roomName,
    selectedDate,
    totalCost,
    userEmail,
    _id
  } = bookingData;

  const [date, setDate] = useState(selectedDate);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");


  const handleUpdateDate = () => {
     axios.patch(
        `http://localhost:5000/booking/${_id}`,
        { selectedDate: date }) // Replace with the correct payload expected by your server
      
  };
  

  const handleCancelBooking = () => {
    setMessage("Booking canceled!");
    console.log(`Booking canceled.`);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!review.trim()) {
      setMessage("Please enter a review before submitting.");
      return;
    }
    if (!rating) {
      setMessage("Please select a rating before submitting.");
      return;
    }
    setMessage("Review submitted successfully!");
    console.log(`Review: ${review}, Rating: ${rating}`);
    setReview("");
    setRating(0);
  };

  const renderRatingStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <motion.button
        key={index}
        className={`text-2xl ${
          index < rating ? "text-yellow-500" : "text-gray-400"
        }`}
        onClick={() => setRating(index + 1)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        aria-label={`Rate ${index + 1} stars`}
      >
        ★
      </motion.button>
    ));
  };

  return (
    <motion.div
      className="p-6 md:p-10 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header Section */}
      <motion.div
        className="flex flex-col lg:flex-row items-center gap-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
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
            <span className="font-medium">Selected Date:</span> {selectedDate}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-400">
            <span className="font-medium">Total Cost:</span> ${totalCost}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-400">
            <span className="font-medium">User Email:</span> {userEmail}
          </p>
        </div>
      </motion.div>

      {/* Date and Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full sm:w-auto p-3 border rounded-md dark:bg-gray-700 dark:text-gray-300"
        />
        <button
          onClick={handleUpdateDate}
          className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Update Date
        </button>
        <motion.button
          onClick={handleCancelBooking}
          className="flex-1 bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
          whileHover={{ scale: 1.05 }}
        >
          Cancel Booking
        </motion.button>
      </div>

      {/* Review Section */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
      >
        <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Write a Review
        </h3>
        <div className="flex flex-col gap-4">
          {/* Rating */}
          <div className="flex items-center space-x-2">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
              Your Rating:
            </p>
            <div className="flex space-x-1">{renderRatingStars()}</div>
          </div>
          {/* Review Input */}
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            rows="4"
            className="w-full p-4 border rounded-md dark:bg-gray-700 dark:text-gray-300"
          />
          {/* Submit Button */}
          <motion.button
            onClick={handleReviewSubmit}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Review
          </motion.button>
        </div>
        {/* Feedback Message */}
        {message && (
          <motion.div
            className="mt-4 p-3 text-center bg-gray-100 dark:bg-gray-700 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {message}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BookingDetails;

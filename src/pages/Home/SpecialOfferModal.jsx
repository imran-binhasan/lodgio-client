import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion"; // For animation

const SpecialOffersModal = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const offerEndDate = new Date("2025-02-10T23:59:59").getTime(); // Deadline: January 10, 2025

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = offerEndDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft("OFFER EXPIRED");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}D ${hours}H ${minutes}M ${seconds}S`);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full flex overflow-hidden relative">
        {/* Left Image Section */}
        <div className="w-1/2">
          <img
            src="https://i.ibb.co.com/6mrSYbP/The-Peninsula-Bangkok-The-Pool-11-min-optimized-200.jpg"
            alt="Special Offer"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* Right Content Section */}
        <div
          className="w-1/2 p-6 relative bg-cover bg-center rounded-r-lg flex flex-col justify-between"
          style={{
            backgroundImage:
              "url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/ad8a7a119879081.60f70c7ef2c1d.gif')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-r-lg"></div>

          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white text-3xl transition-all hover:scale-110"
            >
              <AiOutlineClose />
            </button>

            {/* Header */}
            <h3 className="text-4xl  text-white text-center mb-4">
              SPECIAL OFFER!
            </h3>

            {/* Countdown Timer */}
            <div className="text-2xl font-medium text-white text-center mb-4">
              {timeLeft !== "OFFER EXPIRED" ? (
                <motion.p
                  className="bg-black bg-opacity-60 inline-block  px-4 rounded-md"
                  key={timeLeft}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {timeLeft}
                </motion.p>
              ) : (
                <p className="text-red-500 text-xl font-semibold">OFFER EXPIRED</p>
              )}
            </div>

            {/* Offer Description */}
            <p className="text-2xl text-white text-center font-medium">
              GET 20% OFF ON ALL BOOKINGS MADE THIS MONTH!
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpecialOffersModal;

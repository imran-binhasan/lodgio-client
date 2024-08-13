import React from 'react';
import { useNavigate } from 'react-router-dom';

const SpecialOffers = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Navigate to room page or other path
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Special Offers & Promotions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* First Booking */}
          <div
            className="relative bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer"
            onClick={() => handleNavigation('/rooms')} // Redirect to room page
          >
            <img
              src="https://i.ibb.co/YTxPJfZ/pexels-shvetsa-7258034-optimized-100.jpg"
              alt="First Booking Offer"
              className="w-full h-64 object-cover group-hover:scale-110 transition duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition duration-300"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">First Booking Offer</h3>
              <p className="text-sm mb-4">
                Get a special discount on your first booking with us!
              </p>
              <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition">
                Book Now
              </button>
            </div>
          </div>

          {/* Couples Booking */}
          <div
            className="relative bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer"
            onClick={() => handleNavigation('/rooms')} // Redirect to room page
          >
            <img
              src="https://i.ibb.co/92T8C90/pexels-pixabay-276671-1-optimized-100.jpg"
              alt="Couples Booking Offer"
              className="w-full h-64 object-cover group-hover:scale-110 transition duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition duration-300"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Couples Booking</h3>
              <p className="text-sm mb-4">
                Enjoy a romantic getaway with special packages for couples.
              </p>
              <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition">
                Book Now
              </button>
            </div>
          </div>

          {/* Family Tour */}
          <div
            className="relative bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer"
            onClick={() => handleNavigation('/rooms')} // Redirect to room page
          >
            <img
              src="https://i.ibb.co/GTNcfJH/pexels-pixabay-271624-optimized-100.jpg"
              alt="Family Tour Offer"
              className="w-full h-64 object-cover group-hover:scale-110 transition duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition duration-300"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Family Tour</h3>
              <p className="text-sm mb-4">
                Perfect family vacation packages with all-inclusive deals.
              </p>
              <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition">
                Book Now
              </button>
            </div>
          </div>

          {/* New Year Deal */}
          <div
            className="relative bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer"
            onClick={() => handleNavigation('/rooms')} // Redirect to room page
          >
            <img
              src="https://i.ibb.co.com/sjJ3445/pexels-asphotograpy-97083-optimized-100.jpg"
              className="w-full h-64 object-cover group-hover:scale-110 transition duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition duration-300"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">New Year Deal !</h3>
              <p className="text-sm mb-4">
                Limited time new year offer for valid till 31 January !
              </p>
              <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;

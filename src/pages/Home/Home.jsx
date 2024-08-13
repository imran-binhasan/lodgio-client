import Banner from "./Banner";
import FeaturedRooms from "./FeaturedRooms";
import Map from "./Map";
import { Helmet } from "react-helmet";
import ReviewsCarousel from "./ReviewsCarousel";
import { useEffect, useState } from "react";
import SpecialOffersModal from "./SpecialOfferModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Show modal when user visits the page
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Home - Lodgio</title>
        <meta
          name="description"
          content="Welcome to Lodgio, your home away from home."
        />
      </Helmet>
      <Banner />
      <FeaturedRooms />
      <div className="bg-gray-100 py-10">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-6">Special Offers</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img src="offer-image1.jpg" alt="Luxury Suite Offer" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h3 className="text-2xl font-bold">20% Off</h3>
          <p className="text-lg">Luxury Suites</p>
          <button className="mt-4 px-4 py-2 bg-red-500 rounded hover:bg-red-600">Book Now</button>
        </div>
      </div>
      {/* Add more cards as needed */}
    </div>
  </div>
</div>

      <Map />
      <ReviewsCarousel/>
      <SpecialOffersModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Home;

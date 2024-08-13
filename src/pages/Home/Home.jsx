import Banner from "./Banner";
import FeaturedRooms from "./FeaturedRooms";
import Map from "./Map";
import { Helmet } from "react-helmet";
import ReviewsCarousel from "./ReviewsCarousel";
import { useEffect, useState } from "react";
import AboutUs from "./AboutUs";
import { ToastContainer } from "react-toastify";
import Modal from "./Modal";

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
      <ToastContainer />
      <Banner />
      <FeaturedRooms />
      <AboutUs/>
      <Map />
      <ReviewsCarousel/>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Home;

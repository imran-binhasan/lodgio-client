
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const images = [
  "https://i.ibb.co/YTxPJfZ/pexels-shvetsa-7258034-optimized-100.jpg",
  "https://i.ibb.co/92T8C90/pexels-pixabay-276671-1-optimized-100.jpg",
  "https://i.ibb.co/GTNcfJH/pexels-pixabay-271624-optimized-100.jpg",
  "https://i.ibb.co/m5MdQ37/pexels-pixabay-164595-optimized-100.jpg",
  "https://i.ibb.co/HB6YVxK/pexels-naimbic-2029722-optimized-100.jpg",
  "https://i.ibb.co/fCdhRFJ/pexels-julieaagaard-2467285-optimized-100.jpg",
  "https://i.ibb.co/YRSSw88/pexels-hakimsatoso-3634741-optimized-100.jpg",
  "https://i.ibb.co/8KQMqhK/pexels-fotoaibe-1743231-optimized-100.jpg",
  "https://i.ibb.co/MsxbFL4/pexels-enginakyurt-3688261-optimized-100.jpg",
  "https://i.ibb.co/5nqY86n/pexels-enginakyurt-2952663-optimized-100.jpg",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Gallery = () => {
  return (
    <>
      <Helmet>
        <title>Gallery - Luxury Hotel</title>
        <meta name="description" content="Explore the stunning gallery of our luxury hotel." />
      </Helmet>
      <section className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-medium text-center text-gray-800 mb-8">Explore Our Gallery</h2>
            <p className="text-center text-gray-600 mb-12">
              A visual tour of our luxury spaces designed for comfort and style.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="gallery-item relative overflow-hidden rounded-lg shadow-md group"
                variants={fadeInUp}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-lg font-semibold text-white">Room {index + 1}</h3>
                  <p className="text-sm text-gray-300">Luxury Experience</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Gallery;

import { FaBed, FaMapMarkerAlt, FaRegSmileBeam } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-medium text-gray-800 dark:text-white">
            About Us
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            At <span className="font-semibold text-blue-600">Lodgio</span>, we redefine travel experiences by connecting travelers to their dream stays with seamless booking and unmatched service. 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center">
            <FaBed className="text-5xl text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Premium Stays
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Enjoy handpicked accommodations offering luxury, comfort, and a touch of local culture.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center">
            <FaMapMarkerAlt className="text-5xl text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Prime Locations
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Stay in the heart of every destination with access to top attractions and local experiences.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center">
            <FaRegSmileBeam className="text-5xl text-blue-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Exceptional Service
            </h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Our dedicated team ensures a hassle-free stay, making your comfort our top priority.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

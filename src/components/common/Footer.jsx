import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-8 mt-8"> {/* Increased py-8 for larger footer */}
      <div className="w-11/12 mx-auto">
        {/* Main Content Section */}
        <div className="flex flex-col sm:flex-row justify-between px-4 mb-8 space-y-6 sm:space-y-0"> {/* Increased mb-8 for more space */}
          {/* Address Section */}
          <div className="flex flex-col sm:w-1/3">
            <h2 className="font-medium text-xl mb-2">Address</h2>
            <p>Z3 Building, 03 Avenue</p>
            <p>Dhaka, Bangladesh</p>
            <p>Opening hours: 9:00 AM - 5:00 PM</p>
          </div>

          {/* Contact Info Section */}
          <div className="flex flex-col sm:w-1/3">
            <h2 className="font-medium text-xl mb-2">Contact Info</h2>
            <p>Email: support@lodgio.com</p>
            <p>Phone: +88 016-0126-2260</p>
          </div>

          {/* Social Links Section */}
          <div className="flex flex-col sm:w-1/3">
            <h2 className="font-medium text-xl mb-2">Follow Us</h2>
            <div className="flex space-x-6 text-xl">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors duration-300">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors duration-300">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 mt-8 border-t border-base-300 pt-4"> {/* Increased mt-8 */}
          <div className="flex gap-3 mb-2 sm:mb-0">
            <Link className="text-gray-600 hover:text-blue-500 transition-colors duration-300">Website Terms</Link>
            <p className="text-gray-600">|</p>
            <Link className="text-gray-600 hover:text-blue-500 transition-colors duration-300">Privacy Policy</Link>
          </div>
          <div>
            <p className=" text-gray-600">All rights reserved @ 2024</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

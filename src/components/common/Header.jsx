import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing React Icons

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track menu state (open/close)
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <h3 className="text-white text-2xl font-medium"><Link to={'/'}>LODGIO</Link></h3>

      {/* Hamburger Icon for mobile (using React Icons) */}
      <div className="md:hidden" onClick={toggleMenu}>
        <button className="text-white">
          {isMenuOpen ? (
            <FaTimes className="w-6 h-6" /> // Close icon when the menu is open
          ) : (
            <FaBars className="w-6 h-6" /> // Hamburger icon when the menu is closed
          )}
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6">
        <li>
          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            ROOMS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            GALLERY
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            MY BOOKINGS
          </NavLink>
        </li>
      </ul>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 right-0 bg-gray-800 md:hidden`}
      >
        <ul className="flex flex-col items-center py-4 gap-6">
          <li>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
              }
            >
              ROOMS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
              }
            >
              GALLERY
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
              }
            >
              MY BOOKINGS
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Login Button */}
      <button
        onClick={() => navigate("/auth/login")}
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 hidden md:block"
      >
        LOGIN
      </button>
    </nav>
  );
};

export default Header;

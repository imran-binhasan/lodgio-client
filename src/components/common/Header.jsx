import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import AuthContext from "../../context/AuthContext";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Animation variants for the menu
  const menuVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <h3 className="text-white text-2xl font-medium">
        <Link to="/" onClick={closeMenu}>
          LODGIO
        </Link>
      </h3>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 justify-center flex-grow">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-yellow-400 text-lg ${isActive ? "text-yellow-400" : ""}`
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            `hover:text-yellow-400 text-lg ${isActive ? "text-yellow-400" : ""}`
          }
        >
          ROOMS
        </NavLink>
        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            `hover:text-yellow-400 text-lg ${isActive ? "text-yellow-400" : ""}`
          }
        >
          GALLERY
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `hover:text-yellow-400 text-lg ${isActive ? "text-yellow-400" : ""}`
          }
        >
          CONTACT
        </NavLink>
        {user && (
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `hover:text-yellow-400 text-lg ${isActive ? "text-yellow-400" : ""}`
            }
          >
            MY BOOKINGS
          </NavLink>
        )}
      </div>

      {/* Desktop Login Button */}
      {user ? (
        <div className="hidden md:flex items-center gap-2">
          <img
            className="w-9 h-9 object-cover rounded-full"
            src={
              user.photoURL
                ? user.photoURL
                : "https://img.icons8.com/pulsar-gradient/48/guest-male.png"
            }
          />
          <button
            onClick={logoutUser}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            LOGOUT
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/auth/login")}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 hidden md:block"
        >
          LOGIN
        </button>
      )}

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden" onClick={toggleMenu}>
        <button className="text-white">
          {isMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
          className="absolute top-16 right-0 bg-gray-800 md:hidden w-2/3 shadow-lg"
        >
          <div className="flex flex-col items-start py-4 gap-6 px-6">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
              }
            >
              HOME
            </NavLink>
            <NavLink
              to="/rooms"
              onClick={closeMenu}
              className={({ isActive }) =>
                `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
              }
            >
              ROOMS
            </NavLink>
            <NavLink
              to="/gallery"
              onClick={closeMenu}
              className={({ isActive }) =>
                `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
              }
            >
              GALLERY
            </NavLink>
            {user && (
              <NavLink
                to="/bookings"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
                }
              >
                MY BOOKINGS
              </NavLink>
            )}
            {user ? (
              <button
                onClick={() => {
                  logoutUser();
                  closeMenu();
                }}
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 text-left w-full"
              >
                LOGOUT
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/auth/login");
                  closeMenu();
                }}
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 text-left w-full"
              >
                LOGIN
              </button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Header;

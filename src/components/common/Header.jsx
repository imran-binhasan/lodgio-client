import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";

const Header = () => {
  const { user, loading, logoutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <h3 className="text-white text-2xl font-medium">
        <Link to="/">LODGIO</Link>
      </h3>

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

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
          }
        >
          ROOMS
        </NavLink>
        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
          }
        >
          GALLERY
        </NavLink>
        {user && (
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            MY BOOKINGS
          </NavLink>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 right-0 bg-gray-800 md:hidden`}
      >
        <div className="flex flex-col items-center py-4 gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            ROOMS
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
            }
          >
            GALLERY
          </NavLink>
          {user && (
            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                `hover:text-yellow-400 ${isActive ? "text-yellow-400" : ""}`
              }
            >
              MY BOOKINGS
            </NavLink>
          )}
        </div>
      </div>

      {/* Login Button */}
      {user ? (
        <div className="flex items-center gap-2">
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
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 hidden md:block"
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
    </nav>
  );
};

export default Header;

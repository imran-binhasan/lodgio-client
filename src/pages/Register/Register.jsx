import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { toast, ToastContainer } from 'react-toastify'; // Import React Toastify
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import axios from "axios";

const Register = () => {
  const{handleGoogleLogin,createUser,updateNewUser,user} = useContext(AuthContext);
  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const {name, email, password, photoURL} = Object.fromEntries(formData.entries())
    const validatePassword = (password) => {
      // Password must have at least one uppercase letter, one lowercase letter, and 6 or more characters
      return /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/.test(password);
    };
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long!');
      return;
    }

    if (!validatePassword(password)) {
      toast.error('Password must contain at least one uppercase and one lowercase letter!');
      return;
    }
    createUser(email,password)
    .then(() => {
        // Request JWT token from the server
        axios.post("https://lodgio-server.vercel.app/jwt", user, {
          withCredentials: true, // Ensures cookies are included in the request
        });
        updateNewUser({
            displayName:name,
            photoURL:photoURL
        })
        Swal.fire({
          title: `Welcome ${user == null ? user.displayName : ''}`,
          text: "You have signed in successfully!",
          icon: "success"
        });
    })
    .catch(error => {
      toast.error(error.message); // Show error message with React Toastify
    });
  }
  return (
    <>
    <Helmet>
      <title>Register - Lodgio</title>
      <meta name="description" content="Create a new account on Lodgio and start your journey with us." />
    </Helmet>
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative">
      <ToastContainer/>
      {/* Video Background with Blur */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover filter blur-sm"
        autoPlay
        loop
        muted
      >
        <source src="https://i.imgur.com/lo5QA8W.mp4" type="video/mp4" />
      </video>

      {/* Transparent Navbar */}
      <div className="absolute top-0 left-0 w-full p-4 bg-transparent z-20">
        <div className="flex justify-between items-center">
        <h3 className="text-white text-2xl font-medium"><Link to={'/'}>LODGIO</Link></h3>
          <p className="text-gray-300 border rounded p-1">
            Already have an account?{" "}
            <Link className="text-white underline-offset-2 hover:text-yellow-400 hover:underline" to={"/auth/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Register Card Content */}
      <div className="relative w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-xl p-8 z-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900">Register</h2>
        </div>

        {/* Social login buttons */}
        <div className="flex justify-start items-center space-x-4 mb-6">
          <p className="text-sm text-gray-600">Continue with</p>
          <button onClick={handleGoogleLogin} className="w-2/3 flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-300">
            <span className="h-5 w-5 mr-2">G</span>
            Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mb-6">Or continue with email address</p>

        {/* Register Form */}
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              name="name"
              className="appearance-none rounded-lg w-full py-2 px-3 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Full Name"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              className="appearance-none rounded-lg w-full py-2 px-3 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
            />
          </div>

          <div>
            <input
              type="url"
              name="photoURL"
              className="appearance-none rounded-lg w-full py-2 px-3 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Profile Photo URL"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              className="appearance-none rounded-lg w-full py-2 px-3 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;

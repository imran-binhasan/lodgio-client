import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2'
const Login = () => {
  const {handleGoogleLogin,loginUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const formData =new FormData(e.target);
    const {email, password} = Object.fromEntries(formData.entries());
    loginUser(email, password)
    .then(()=>{
      Swal.fire({
        title: `Welcome`,
        text: "You have signed in successfully!",
        icon: "success"
      });
      navigate(`${location.state?location.state:'/'}`)
    })
  }
  
  return (
    <>
    <Helmet>
      <title>Login - Lodgio</title>
      <meta name="description" content="Log in to your Lodgio account to manage bookings and more." />
    </Helmet>
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative">
      {/* Video Background with Blur */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover filter blur-sm"
        autoPlay
        loop
        muted
      >
        <source src="https://i.imgur.com/VroAAPg.mp4" type="video/mp4" />
      </video>

      {/* Transparent Navbar */}
      <div className="absolute top-0 left-0 w-full p-4 bg-transparent z-20">
        <div className="flex justify-between items-center">
          <h3 className="text-white text-2xl font-medium"><Link to={'/'}>LODGIO</Link></h3>
          <p className="text-gray-300 border rounded p-1">
            Don't have an account?{" "}
            <Link className="text-white underline-offset-2 hover:text-yellow-400 hover:underline" to={"/auth/register"}>
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Sign-in Card Content */}
      <div className="relative w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-xl p-8 z-10">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900">Sign in</h2>
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

        {/* Sign-in Form */}
        <form onSubmit={handleLogin} className="space-y-6">
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
            Login
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;

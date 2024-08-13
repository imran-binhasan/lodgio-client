const Login = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-7xl space-x-6">
          {/* Left Side (Illustration) */}
          <div className="w-1/2">
            <img src="your-image-url.png" alt="Illustration" className="w-full h-auto" />
          </div>
  
          {/* Right Side (Sign In Form) */}
          <div className="w-1/2 space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Sign in</h2>
              <p className="mt-2 text-sm text-gray-500">Sign in with Open account</p>
            </div>
  
            {/* Social login buttons */}
            <div className="flex justify-between space-x-4">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                {/* Google Icon */}
                <span className="h-5 w-5 mr-2">G</span>
                Google
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                {/* Apple Icon */}
                <span className="h-5 w-5 mr-2">A</span>
                Apple ID
              </button>
            </div>
  
            <p className="text-center text-sm text-gray-500">Or continue with email address</p>
  
            <form className="space-y-6">
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
                className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Start trading
              </button>
            </form>
  
            <div className="text-center mt-4">
              <button className="text-blue-600 hover:text-blue-500">
                Don't have an account? Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;
  
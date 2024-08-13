
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 to-purple-900 text-white">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 border-8 border-t-8 border-white border-solid rounded-full animate-spin mx-auto"></div>
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;

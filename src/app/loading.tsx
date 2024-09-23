interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      {/* Custom Spinner */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>

      {/* Loading text */}
      <p className="mt-4 text-gray-600">{message || "Loading, please wait..."}</p>
    </div>
  );
};

export default LoadingScreen;

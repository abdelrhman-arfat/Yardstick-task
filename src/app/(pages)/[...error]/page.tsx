import React from "react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

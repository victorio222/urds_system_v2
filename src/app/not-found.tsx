'use client'; // Make it a Client Component

import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-6 py-12">
      {/* Large 404 text */}
      <div className="text-8xl font-extrabold text-blue-600 mb-4">
        404
      </div>
      
      {/* Subheading */}
      <p className="text-2xl text-gray-600 mb-2">
        PAGE NOT FOUND :(
      </p>

      {/* Error message */}
      <p className="text-lg text-gray-500 mb-6">
        An Error Has Occurred
      </p>

      {/* Back to home button */}
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Back to Home
      </Link>

      {/* Optional Line Divider */}
      <div className="mt-8 w-32 border-t-2 border-blue-600 mx-auto"></div>
    </div>
  );
};

export default NotFound;

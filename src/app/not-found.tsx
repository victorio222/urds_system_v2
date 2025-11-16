// // 'use client'; // Make it a Client Component

// // import Link from 'next/link';

// // const NotFound = () => {
// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
// //       <h1 className="text-6xl font-bold text-red-600">404</h1>
// //       <p className="text-xl text-slate-500">Oops! The page you're looking for doesn't exist.</p>
// //       <div className="mt-6">
// //         <Link href="/" className="text-blue-600 hover:text-blue-800">
// //           Go back to the homepage
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NotFound;


// 'use client'; // Make it a Client Component

// import Link from 'next/link';
// import { FaExclamationTriangle } from 'react-icons/fa'; // Exclamation icon for error

// const NotFound = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6 py-12">
//       {/* Icon Section */}
//       <div className="bg-blue-600 text-white p-6 rounded-full mb-6">
//         <FaExclamationTriangle className="text-6xl" />
//       </div>

//       {/* Title and Description */}
//       <h1 className="text-5xl font-extrabold text-gray-800 mb-4">404 - Page Not Found</h1>
//       <p className="text-lg text-gray-600 mb-4">Oops! It seems like the page you're looking for doesn't exist.</p>

//       <p className="text-sm text-gray-500 mb-6">
//         You may have typed the URL incorrectly, or the page may have been moved or deleted.
//       </p>

//       {/* Call-to-Action Button */}
//       <Link href="/" className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
//         Return to Homepage
//       </Link>

//       {/* Optional Decorative Icons */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500">
//         <p className="text-sm">Powered by Research Management System</p>
//       </div>
//     </div>
//   );
// };

// export default NotFound;


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

// 'use client'; // Make it a Client Component

// import Link from 'next/link';

// const NotFound = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-6 py-12">
//       {/* Large 404 text */}
//       <div className="text-8xl font-extrabold text-blue-600 mb-4">
//         404
//       </div>
      
//       {/* Subheading */}
//       <p className="text-2xl text-gray-600 mb-2">
//         PAGE NOT FOUND :(
//       </p>

//       {/* Error message */}
//       <p className="text-lg text-gray-500 mb-6">
//         An Error Has Occurred
//       </p>

//       {/* Back to home button */}
//       <Link
//         href="/"
//         className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
//       >
//         Back to Home
//       </Link>

//       {/* Optional Line Divider */}
//       <div className="mt-8 w-32 border-t-2 border-blue-600 mx-auto"></div>
//     </div>
//   );
// };

// export default NotFound;









'use client';

import Link from 'next/link';
import Image from 'next/image';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-sans">
      <div className="flex flex-row items-center gap-30">
        {/* Left Side: Illustration */}
        <div className="relative w-74 h-74">
          <img 
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696455.jpg?semt=ais_hybrid&w=740&q=80" 
            alt="Broken Lightbulb" 
            className="w-full h-full object-contain opacity-80"
          />
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col items-start text-left">
          <h1 className="text-[8rem] font-bold text-blue-600 leading-none tracking-tighter">
            404
          </h1>
          
          <h2 className="text-lg font-bold text-gray-700 tracking-widest mt-4 uppercase">
            Looks like you're lost
          </h2>

          <p className="text-gray-400 text-sm mt-2 font-medium">
            The page you are looking for not availble!
          </p>

          <Link
            href="/"
            className="group text-sm mt-12 flex items-center gap-4 text-black font-bold uppercase tracking-widest hover:text-blue-600 transition-colors"
          >
            Go To Home
            <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
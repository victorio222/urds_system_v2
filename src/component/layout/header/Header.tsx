// 'use client';
// import React, { useState } from 'react';
// import { BiBell, BiDownArrow, BiMoon, BiSearch, BiSolidDownArrow, BiUser } from 'react-icons/bi';
// import { FaHamburger } from 'react-icons/fa';
// import { GiHamburgerMenu } from 'react-icons/gi';
// import { PiHamburgerDuotone, PiHamburgerThin } from 'react-icons/pi';
// import { RxHamburgerMenu } from 'react-icons/rx';

// interface HeaderLayoutProps {
//   toggleSidebar: () => void;
// }

// const HeaderLayout: React.FC<HeaderLayoutProps> = ({ toggleSidebar }) => {
//   return (
//     <header className="bg-blue-50 px-5 pt-5 pb-2 text-slate-700 font-semibold flex items-center rounded-0">
//       <button
//         className="text-green rounded-md transition hidden"
//         onClick={toggleSidebar}
//       >
//         <RxHamburgerMenu />
//       </button>

//       <div>
//         <p className='font-light text-xs mb-1 text-slate-500'>Home / Dashboard</p>
//         <h1 className="text-2xl font-semibold">Dashboard</h1>
//       </div>

//       <nav className="bg-white py-3 px-4 rounded-4xl shadow-xs flex space-x-4 ml-auto md:block">
//         <ul className='flex flex-row items-center gap-6 text-xl'>
//           <li>
//             <div>
//               <input
//                 type="text"
//                 placeholder="Type here..."
//                 className="pl-10 pr-4 py-2 rounded-full border shadow- bg-blue-50 border-none focus:outline-none focus:ring-2 focus:ring-green-500 text-sm w-48 md:w-64"
//               />
//               <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//             </div>
//           </li>
//           <li>
//             <span className="text-green-500 hover:text-green-600 hidden">
//               <BiMoon />
//             </span>
//           </li>
//           <li>
//             <span className="text-green-500 hover:text-green-600">
//               <BiBell />
//             </span>
//           </li>
//           <li>
//             <a href="/profile" className="flex items-center text-slate-600 hover:text-green-600">
//               <span className='text-sm font-semibold pl-2 pr-3'>URDS Director</span>
//               <BiUser />
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default HeaderLayout;


'use client';
import React, { useState } from 'react';
import { BiBell, BiMoon, BiSearch, BiUser } from 'react-icons/bi';
import { BsBellFill } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import profile from '@/assets/images/profile.png';
import Image from 'next/image';

interface HeaderLayoutProps {
  toggleSidebar: () => void;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-blue-50 px-5 pt-3 pb-2 text-slate-700 font-semibold flex items-center rounded-0">
      <button
        className="text-green rounded-md transition hidden"
        onClick={toggleSidebar}
      >
        <RxHamburgerMenu />
      </button>

      <div>
        <p className="font-light text-xs mb-1 text-slate-500">Home / Dashboard</p>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      <nav className="bg-white p-2 rounded-4xl shadow-xs flex space-x-4 ml-auto md:block">
        <ul className="flex flex-row items-center gap-2 text-xl">
          <li>
            <div className="relative">
              <input
                type="text"
                placeholder="Type here..."
                className="pl-10 pr-4 py-2 rounded-full border bg-blue-50 border-slate-200 shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-300 text-xs placeholder:font-medium w-48 md:w-64"
              />
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            </div>
          </li>
          <li>
            <span className="text-blue-600 hover:text-blue-700 hidden">
              <BiMoon />
            </span>
          </li>
          <li>
            <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
              <BsBellFill />
            </span>
          </li>
          <li>
            <a href="/profile" className="flex items-center text-slate-600 hover:text-blue-600">
              <span className="text-sm font-semibold pl-2 pr-3">URDS Director</span>
              {/* Avatar container */}
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border border-slate-300">
                <Image
                  src={profile}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="object-cover"
                  priority
                />
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderLayout;

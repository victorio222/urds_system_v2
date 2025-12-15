// 'use client';
// import React from 'react';
// import { BiSearch } from 'react-icons/bi';
// import { BsBellFill } from 'react-icons/bs';
// import Image from 'next/image';
// import profile from '@/assets/images/profile.png';

// interface EvaluatorHeaderProps {
//   pageName?: string;
// }

// const EvaluatorHeader: React.FC<EvaluatorHeaderProps> = ({ pageName }) => {
//   return (
//     <header className="w-full bg-white px-6 py-3 shadow-sm rounded-b-3xl flex items-center">
      
//       {/* LEFT — TITLE */}
//       <div>
//         <p className="text-xs text-slate-500">Home / {pageName}</p>
//         <h1 className="text-xl font-semibold text-slate-700">{pageName}</h1>
//       </div>

//       {/* RIGHT — SEARCH + BELL + PROFILE */}
//       <div className="ml-auto flex items-center gap-4">
        
//         {/* SEARCH BAR */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Type here..."
//             className="pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-blue-50 
//                        text-xs w-48 md:w-64 shadow-inner focus:ring-1 focus:ring-blue-300"
//           />
//           <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//         </div>

//         {/* BELL */}
//         <button className="text-blue-600 text-xl hover:text-blue-700">
//           <BsBellFill />
//         </button>

//         {/* PROFILE */}
//         <a href="/profile" className="flex items-center hover:opacity-80">
//           <span className="text-sm font-semibold pr-3 text-slate-600">
//             Research Evaluator
//           </span>

//           <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-300">
//             <Image 
//               src={profile} 
//               alt="Profile"
//               width={48}
//               height={48}
//               className="object-cover"
//             />
//           </div>
//         </a>
//       </div>
//     </header>
//   );
// };

// export default EvaluatorHeader;













'use client';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsBellFill } from 'react-icons/bs';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import profile from '@/assets/images/logo.png';

const EvaluatorHeader = () => {
  return (
    <header className="w-full h-16 bg-white px-6 py-3 shadow-sm  flex items-center">
      
      {/* LEFT — TITLE */}
      <div className='flex items-center'>
        <Image
        src={logo}
        alt='uep-logo'
              width={48}
              height={48}
              className="object-cover"
         />
        <h1 className="ml-2 text-[26px] font-semibold text-blue-600">URDS</h1>
      </div>

      {/* RIGHT — SEARCH + BELL + PROFILE */}
      <div className="ml-auto flex items-center gap-4">
        
        {/* SEARCH BAR */}
        <div className="relative">
          <input
            type="text"
            placeholder="Type here..."
            className="pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-blue-50 
                       text-xs w-48 md:w-64 shadow-inner focus:ring-1 focus:ring-blue-300"
          />
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* BELL */}
        <button className="text-blue-600 text-xl hover:text-blue-700">
          <BsBellFill />
        </button>

        {/* PROFILE */}
        <a href="/profile" className="flex items-center hover:opacity-80">
          <span className="text-sm font-semibold pr-3 text-slate-600">
            Research Evaluator
          </span>

          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-300">
            <Image 
              src={profile} 
              alt="Profile"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        </a>
      </div>
    </header>
  );
};

export default EvaluatorHeader;
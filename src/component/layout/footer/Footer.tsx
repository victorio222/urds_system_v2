// 'use client';
// import React from "react";

// const FooterLayout = () => {
//   return (
//     <footer className="bg-white text-gray-400 font-thin flex items-center justify-center py-3 text-xs shadow-inner w-full border-t border-slate-100 mt-[-20px]">
//       <span>Copyright © 2025. All rights reserved.</span>
//     </footer>
//   );
// };

// export default FooterLayout;






'use client';
import React from "react";

const FooterLayout = () => {
  return (
    <footer className="bg-white text-gray-500 font-thin w-full border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center py-4 px-2 sm:px-6 text-xs sm:text-sm">
      <span className="text-center sm:text-left">
        © 2025. All rights reserved.
      </span>
      <span className="hidden sm:inline-block mx-2">|</span>
      <span className="text-center sm:text-left">
        Made by URDS Team
      </span>
    </footer>
  );
};

export default FooterLayout;

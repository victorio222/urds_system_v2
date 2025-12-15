// "use client";
// import { Divider } from "@mui/material";
// import React, { useEffect, FC, ReactNode } from "react";

// interface ModalProps {
//   opened: boolean;
//   onClose: () => void;
//   title?: ReactNode;
//   children: ReactNode;
// }

// const Modal: FC<ModalProps> = ({ opened, onClose, title, children }) => {
//   // Close on ESC key
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     if (opened) {
//       window.addEventListener("keydown", handleEsc);
//     }
//     return () => {
//         window.removeEventListener("keydown", handleEsc);
//     };
//   }, [onClose, opened]);

//   if (!opened) return null;

//   return (
//     <div
//       // 1. OUTER WRAPPER (This contains the SCROLLABLE content)
//       // fixed inset-0 ensures it covers the entire viewport.
//       className="fixed inset-0 z-[200] bg-black/50  backdrop-blur-sm transition-opacity flex justify-center p-4 h-full overflow-y-auto"
//       aria-modal="true"
//       role="dialog"
//       onClick={onClose} // Close on backdrop click
//     >
//       {/* 2. OVERLAY (Fixed Blur Background) */}
//       <div
//         // absolute inset-0 ensures it covers the entire fixed scroll container.
//         // bg-black/50 backdrop-blur-sm applies the visual effect.
//         className="absolute inset-0"
//       />

//       {/* 3. MODAL CONTENT BOX (The White Box) */}
//       <div 
//         // mt-8 for slight offset from the top. mb-auto ensures the bottom is filled by the overlay.
//         className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-xl mt-3 mb-auto animate-fadeIn"
//         onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
//       >
//         {/* Title */}
//         {title && (
//           <h2 className="text-lg ml-[-35px] mt-[-7px] font-semibold pb-2 text-slate-700">
//             {title}
//           </h2>
//         )}

//         <Divider />

//         {/* Content */}
//         <div className="p-5 mt-[-30px]">{children}</div>

//         {/* Close Button */}
//         <button
//           className="absolute top-3 right-[-15] text-slate-500 hover:text-black p-1"
//           onClick={onClose}
//         >
//           ✕
//         </button>
//       </div>

//       <style jsx>{`
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-8px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Modal;


// "use client";
// import { Divider } from "@mui/material";
// import React, { useEffect, FC, ReactNode } from "react";

// interface ModalProps {
//   opened: boolean;
//   onClose: () => void;
//   title?: ReactNode;
//   children: ReactNode;
// }

// const Modal: FC<ModalProps> = ({ opened, onClose, title, children }) => {
//   // Close on ESC key
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     if (opened) {
//       window.addEventListener("keydown", handleEsc);
//     }
//     return () => {
//         window.removeEventListener("keydown", handleEsc);
//     };
//   }, [onClose, opened]);

//   if (!opened) return null;

//   return (
//     <div
//       // 1. OUTER WRAPPER (This contains the SCROLLABLE content)
//       // fixed inset-0 ensures it covers the entire viewport.
//       className="fixed inset-0 z-[200] bg-black/50  backdrop-blur-sm transition-opacity flex justify-center p-4 h-full overflow-y-auto"
//       aria-modal="true"
//       role="dialog"
//       onClick={onClose} // Close on backdrop click
//     >
//       {/* 2. OVERLAY (Fixed Blur Background) */}
//       <div
//         // absolute inset-0 ensures it covers the entire fixed scroll container.
//         // bg-black/50 backdrop-blur-sm applies the visual effect.
//         className="absolute inset-0"
//       />

//       {/* 3. MODAL CONTENT BOX (The White Box) */}
//       <div 
//         // mt-8 for slight offset from the top. mb-auto ensures the bottom is filled by the overlay.
//         className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-xl mt-3 mb-auto animate-fadeIn"
//         onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
//       >
//         {/* Title */}
//         {title && (
//           <h2 className="text-lg ml-[-35px] mt-[-7px] font-semibold pb-2 text-slate-700">
//             {title}
//           </h2>
//         )}

//         <Divider />

//         {/* Content */}
//         <div className="p-5 mt-[-30px]">{children}</div>

//         {/* Close Button */}
//         <button
//           className="absolute top-3 right-[-15] text-slate-500 hover:text-black p-1"
//           onClick={onClose}
//         >
//           ✕
//         </button>
//       </div>

//       <style jsx>{`
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-8px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Modal;


"use client";

import { Divider } from "@mui/material";
import React, { FC, ReactNode, useEffect } from "react";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ opened, onClose, title, children }) => {
  useEffect(() => {
    if (!opened) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [opened, onClose]);

  if (!opened) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex justify-center p-5 overflow-y-auto"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl w-full max-w-full sm:max-w-md md:max-w-lg my-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="text-lg font-semibold text-slate-700 p-4 pb-2">
            {title}
          </h2>
        )}

        <Divider />

        <div className="p-5">{children}</div>

        <button
          className="absolute top-3 right-3 text-slate-500 hover:text-black p-1"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
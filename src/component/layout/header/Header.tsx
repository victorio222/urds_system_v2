// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { BiMoon, BiSearch, BiCog, BiLogOut } from "react-icons/bi";
// import { BsBellFill } from "react-icons/bs";
// import { RxHamburgerMenu } from "react-icons/rx";
// import profile from "@/assets/images/profile.png";
// import Image from "next/image";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";

// interface HeaderLayoutProps {
//   toggleSidebar: () => void;
//   pageName: string;
// }

// // Interface for the Dropdown components
// interface DropdownProps {
//   open: boolean;
//   onLogout: () => void;
// }

// // ---------------------------------------------
// // 1. Profile Dropdown Component (Enhanced Transition)
// // ---------------------------------------------
// const ProfileDropdown: React.FC<DropdownProps> = ({ open, onLogout }) => {
//   // Tailwind classes for smooth transition: Fade in (opacity 0 -> 100) and Grow (scale 95 -> 100)
//   const transitionClasses = open
//     ? "opacity-100 scale-100"
//     : "opacity-0 scale-95 pointer-events-none";

//   return (
//     <div
//       // Applying transition properties and transform origin
//       className={`absolute right-0 mt-3 w-56 rounded-lg shadow-lg bg-white ring-1 ring-slate-200 divide-y divide-gray-100 z-30 transform origin-top-right transition ease-out duration-200 ${transitionClasses}`}
//     >
//       <div className="px-4 py-3">
//         <p className="text-sm font-medium text-slate-800 truncate">
//           URDS Director
//         </p>
//         <p className="text-xs text-slate-500">director.urds@university.edu</p>
//       </div>
//       <div className="py-1">
//         <a
//           href="/settings"
//           className="flex items-center font-medium px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
//         >
//           <BiCog className="mr-3 h-5 w-5 opacity-70" />
//           Account Settings
//         </a>
//       </div>
//       <div className="py-1">
//         <button
//           onClick={onLogout}
//           className="flex items-center w-full font-medium text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
//         >
//           <BiLogOut className="mr-3 h-5 w-5 opacity-70" />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// // ---------------------------------------------
// // 2. Notifications Dropdown Component (Enhanced Transition)
// // ---------------------------------------------
// const NotificationsDropdown: React.FC<DropdownProps> = ({ open }) => {
//   const notifications = [
//     {
//       id: 1,
//       message: "New user application: John Doe",
//       time: "5m ago",
//       type: "new",
//     },
//     {
//       id: 2,
//       message: "Report A-2023 submitted successfully.",
//       time: "1h ago",
//       type: "success",
//     },
//     {
//       id: 3,
//       message: "Campus data update required.",
//       time: "1d ago",
//       type: "warning",
//     },
//   ];

//   // Tailwind classes for smooth transition
//   const transitionClasses = open
//     ? "opacity-100 scale-100"
//     : "opacity-0 scale-95 pointer-events-none";

//   return (
//     <div
//       // Applying transition properties and transform origin
//       className={`absolute right-0 mt-3 w-72 max-h-96 overflow-y-auto rounded-lg shadow-lg bg-white ring-1 ring-slate-200 z-30 transform origin-top-right transition ease-out duration-200 ${transitionClasses}`}
//     >
//       <div className="px-4 py-3 border-b border-gray-100">
//         <h3 className="text-md font-semibold text-slate-800">Notifications</h3>
//       </div>
//       <div className="divide-y divide-gray-100">
//         {notifications.map((notif) => (
//           <div
//             key={notif.id}
//             className="p-3 hover:bg-gray-50 cursor-pointer transition duration-100"
//           >
//             <p className="text-sm text-gray-800 leading-snug">
//               {notif.message}
//             </p>
//             <p
//               className={`text-xs mt-1 ${
//                 notif.type === "new"
//                   ? "text-blue-600 font-medium"
//                   : "text-slate-500"
//               }`}
//             >
//               {notif.time}
//             </p>
//           </div>
//         ))}
//       </div>
//       <div className="p-3 text-center border-t border-gray-100">
//         <a
//           href="/notifications"
//           className="text-sm text-blue-600 hover:text-blue-700 font-medium transition"
//         >
//           View All Notifications
//         </a>
//       </div>
//     </div>
//   );
// };

// // ---------------------------------------------
// // 3. Header Layout (Main Component)
// // ---------------------------------------------

// const HeaderLayout: React.FC<HeaderLayoutProps> = ({
//   toggleSidebar,
//   pageName,
// }) => {
//   const router = useRouter(); // 5. Initialize router
//   const { logout: contextLogout } = useAuth();

//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

//   // Refs for outside click detection
//   const profileRef = useRef<HTMLLIElement>(null);
//   const notificationRef = useRef<HTMLLIElement>(null);

//   const toggleProfile = () => {
//     setIsNotificationsOpen(false); // Close others
//     setIsProfileDropdownOpen((prev) => !prev);
//   };

//   const toggleNotifications = () => {
//     setIsProfileDropdownOpen(false); // Close others
//     setIsNotificationsOpen((prev) => !prev);
//   };

//   const handleLogout = () => {
//     // Close the dropdown first for better UX
//     setIsProfileDropdownOpen(false);

//     // 8. Call the context logout function (clears state and localStorage)
//     contextLogout();

//     // 9. Redirect the user to the login page (or whichever page handles unauthenticated users)
//     router.push("/auth/login");
//   };

//   // Hook to handle clicks outside the dropdowns
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         profileRef.current &&
//         !profileRef.current.contains(event.target as Node)
//       ) {
//         setIsProfileDropdownOpen(false);
//       }
//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(event.target as Node)
//       ) {
//         setIsNotificationsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // A simple function to render the dropdown only when needed, passing the 'open' state
//   const renderDropdown = (
//     Component: React.FC<DropdownProps>,
//     isOpen: boolean,
//     onLogout?: () => void
//   ) => {
//     // We always render the component but rely on CSS (opacity/scale/pointer-events-none)
//     // to handle the visual transition and interaction blocking when closed.
//     return <Component open={isOpen} onLogout={onLogout!} />;
//   };

//   return (
//     <header className="bg-white pt-7 px-4 sm:px-7 py-2 text-slate-700 font-semibold flex items-center shadow-sm sticky top-0 z-20">
//       {/* Hamburger Menu (Visible on Mobile/Tablet, HIDDEN on Desktop) */}
//       <button
//         className="text-2xl text-slate-600 hover:text-blue-600 mr-4 md:hidden"
//         onClick={toggleSidebar}
//         aria-label="Toggle Menu"
//       >
//         <RxHamburgerMenu />
//       </button>

//       {/* Page Title & Breadcrumb */}
//       <div>
//         <p className="font-light text-xs mb-1 text-slate-500">
//           Home / {pageName}
//         </p>
//         <h1 className="text-xl md:text-2xl font-semibold">{pageName}</h1>
//       </div>

//       {/* Nav/Actions (Flex control for responsiveness) */}
//       <nav className="p-1 flex space-x-4 ml-auto">
//         <ul className="flex flex-row items-center gap-2 sm:gap-4 text-xl">
//           {/* Search Input */}
//           <li>
//             <div className="relative hidden sm:block">
//               <input
//                 type="text"
//                 placeholder="Type here..."
//                 className="pl-10 pr-4 py-2 rounded-full border bg-blue-50 border-slate-200 shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-300 text-xs placeholder:font-medium w-32 sm:w-40 md:w-64 transition-all duration-200"
//               />
//               <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
//             </div>
//           </li>

//           {/* Notifications Dropdown Trigger */}
//           <li className="relative" ref={notificationRef}>
//             <button
//               onClick={toggleNotifications}
//               className={`p-2 rounded-full transition duration-150 text-slate-600 hover:bg-gray-100 hover:text-blue-600 ${
//                 isNotificationsOpen ? "bg-blue-100 text-blue-600" : ""
//               }`}
//               aria-expanded={isNotificationsOpen}
//             >
//               <BsBellFill className="text-xl" />
//             </button>
//             {/* Render Notifications Dropdown */}
//             {renderDropdown(NotificationsDropdown, isNotificationsOpen)}
//           </li>

//           {/* Profile Dropdown Trigger (Name & Avatar synchronized) */}
//           <li className="relative" ref={profileRef}>
//             <button
//               onClick={toggleProfile}
//               className={`flex items-center px-2 py-1 rounded-full transition duration-150 text-slate-600 hover:text-blue-500 ${
//                 isProfileDropdownOpen ? "text-blue-400" : ""
//               }`}
//               aria-expanded={isProfileDropdownOpen}
//             >
//               {/* Name */}
//               <span className="text-sm font-semibold pr-3 hidden md:block text-slate-800">
//                 URDS Director
//               </span>
//               {/* Avatar container */}
//               <div
//                 className={`w-9 h-9 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border ${
//                   isProfileDropdownOpen
//                     ? "border-blue-500 ring-2 ring-blue-200"
//                     : "border-slate-300"
//                 } shrink-0 transition-all duration-150`}
//               >
//                 <Image
//                   src={profile}
//                   alt="Profile"
//                   width={48}
//                   height={48}
//                   className="object-cover"
//                   priority
//                 />
//               </div>
//             </button>
//             {/* Render Profile Dropdown */}
//             {renderDropdown(ProfileDropdown, isProfileDropdownOpen, handleLogout)}
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default HeaderLayout;

"use client";
import React, { useState, useRef, useEffect } from "react";
import { BiSearch, BiCog, BiLogOut } from "react-icons/bi";
import { BsBellFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import profile from "@/assets/images/profile.png";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

/* =====================
   INTERFACES
===================== */

interface HeaderLayoutProps {
  toggleSidebar: () => void;
  pageName: string;
}

interface ProfileDropdownProps {
  open: boolean;
  onLogout: () => void;
  fullName: string;
  email: string;
}

interface NotificationsDropdownProps {
  open: boolean;
}

/* =====================
   PROFILE DROPDOWN
===================== */

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  open,
  onLogout,
  fullName,
  email,
}) => {
  const transitionClasses = open
    ? "opacity-100 scale-100"
    : "opacity-0 scale-95 pointer-events-none";

  return (
    <div
      className={`absolute right-0 mt-3 w-56 rounded-lg shadow-lg bg-white ring-1 ring-slate-200 divide-y divide-gray-100 z-30 transform origin-top-right transition ease-out duration-200 ${transitionClasses}`}
    >
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-slate-800 truncate">
          {fullName}
        </p>
        <p className="text-xs text-slate-500 truncate">{email}</p>
      </div>

      <div className="py-1">
        <a
          href="/settings"
          className="flex items-center font-medium px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
        >
          <BiCog className="mr-3 h-5 w-5 opacity-70" />
          Account Settings
        </a>
      </div>

      <div className="py-1">
        <button
          onClick={onLogout}
          className="flex items-center w-full font-medium text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
        >
          <BiLogOut className="mr-3 h-5 w-5 opacity-70" />
          Logout
        </button>
      </div>
    </div>
  );
};

/* =====================
   NOTIFICATIONS DROPDOWN
===================== */

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  open,
}) => {
  const transitionClasses = open
    ? "opacity-100 scale-100"
    : "opacity-0 scale-95 pointer-events-none";

  return (
    <div
      className={`absolute right-0 mt-3 w-72 max-h-96 overflow-y-auto rounded-lg shadow-lg bg-white ring-1 ring-slate-200 z-30 transform origin-top-right transition ease-out duration-200 ${transitionClasses}`}
    >
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-md font-semibold text-slate-800">Notifications</h3>
      </div>

      <div className="p-4 text-sm text-slate-500 text-center">
        No notifications
      </div>
    </div>
  );
};

/* =====================
   HEADER LAYOUT
===================== */

const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  toggleSidebar,
  pageName,
}) => {
  const router = useRouter();
  const { logout, user, userRole } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const profileRef = useRef<HTMLLIElement>(null);
  const notifRef = useRef<HTMLLIElement>(null);

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    router.push("/auth/login");
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const fullName = user ? `${user.first_name} ${user.last_name}` : "User";

  const email = user?.email ?? "—";

  const roleLabel =
    userRole === "admin"
      ? "URDS Director"
      : userRole === "staff"
      ? "URDS Staff"
      : userRole === "researcher"
      ? "Researcher"
      : "User";

  return (
    <header className="bg-white px-4 sm:px-7 py-2 flex items-center shadow-sm sticky top-0 z-20">
      <button
        className="text-2xl text-slate-600 hover:text-blue-600 mr-4 md:hidden"
        onClick={toggleSidebar}
      >
        <RxHamburgerMenu />
      </button>

      <div>
        <p className="font-light text-xs mb-1 text-slate-500">
          Home / {pageName}
        </p>
        <h1 className="text-xl md:text-2xl font-semibold">{pageName}</h1>
      </div>

      <nav className="ml-auto">
        <ul className="flex items-center gap-4 text-xl">
          <li className="hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Type here..."
                className="pl-10 pr-4 py-2 rounded-full border bg-blue-50 border-slate-200 shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-300 text-xs placeholder:font-medium w-32 sm:w-40 md:w-64 transition-all duration-200"
              />
              <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </li>

          <li className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className={`p-2 rounded-full hover:bg-gray-100 ${
                isNotifOpen ? "bg-blue-100 text-blue-600" : ""
              }`}
            >
              <BsBellFill />
            </button>
            <NotificationsDropdown open={isNotifOpen} />
          </li>

          <li className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`flex items-center ml-[-10px] px-2 py-1 rounded-full transition duration-150 text-slate-600 hover:text-blue-500 ${
                isProfileOpen ? "text-blue-400" : ""
              }`}
              aria-expanded={isProfileOpen}
            >
              <span className="text-sm font-semibold pr-3 hidden md:block">
                {roleLabel}
              </span>

              <div className="w-9 h-9 rounded-full overflow-hidden border">
                <Image
                  src={profile}
                  alt="Profile"
                  width={48}
                  height={48}
                  priority
                />
              </div>
            </button>

            <ProfileDropdown
              open={isProfileOpen}
              onLogout={handleLogout}
              fullName={fullName}
              email={email}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderLayout;

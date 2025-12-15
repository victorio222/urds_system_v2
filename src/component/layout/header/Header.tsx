"use client";
import React, { useState, useRef, useEffect } from "react";
import { BiSearch, BiCog, BiLogOut } from "react-icons/bi";
import { BsBellFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import profile from "@/assets/images/profile.png";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

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

  const handleLogout = async () => {
    setIsProfileOpen(false);
    await logout();
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

  const fullName = user
    ? `${user.first_name} ${user.last_name}`
    : "User";

  const email = user?.email ?? "—";

  /* ✅ ROLE NOW MATCHES AuthContext EXACTLY */
  const roleLabel = userRole ?? "User";

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
        <h1 className="text-xl text-slate-700 md:text-2xl font-semibold">
          {pageName}
        </h1>
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
              className={`p-2 rounded-full text-slate-500 hover:bg-gray-100 ${
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

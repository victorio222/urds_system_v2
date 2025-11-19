"use client";
import React, { useState } from "react";
import { BiBell, BiMoon, BiSearch, BiUser } from "react-icons/bi";
import { BsBellFill } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import profile from "@/assets/images/profile.png";
import Image from "next/image";

interface HeaderLayoutProps {
  toggleSidebar: () => void;
  pageName: string;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  toggleSidebar,
  pageName,
}) => {
  return (
    <header className="bg-blue-50 px-5 pt-3 pb-2 text-slate-700 font-semibold flex items-center rounded-0">
      <button
        className="text-green rounded-md transition hidden"
        onClick={toggleSidebar}
      >
        <RxHamburgerMenu />
      </button>

      <div>
        <p className="font-light text-xs mb-1 text-slate-500">
          Home / {pageName}
        </p>
        <h1 className="text-2xl font-semibold">{pageName}</h1>
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
            <a
              href="/profile"
              className="flex items-center text-slate-600 hover:text-blue-600"
            >
              <span className="text-sm font-semibold pl-2 pr-3">
                URDS Director
              </span>
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

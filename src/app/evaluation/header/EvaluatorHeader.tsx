'use client';
import React, { useState, useRef, useEffect } from 'react';
import { BiSearch, BiCog, BiLogOut, BiSolidHome } from 'react-icons/bi';
import { BsBellFill } from 'react-icons/bs';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import profile from '@/assets/images/logo.png';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const EvaluatorHeader = () => {
  const router = useRouter();
  const { logout, user } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    setIsProfileOpen(false);
    await logout();
    router.push('/auth/login');
  };

  const handleDashboard = () => {
    router.push('/dashboard')
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setIsProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setIsNotifOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const fullName = user ? `${user.first_name} ${user.last_name}` : 'Research Evaluator';
  const email = user?.email ?? '—';
  const roleLabel = 'Research Evaluator';

  const notifications = [
    { id: 1, title: 'Assigned Project', message: 'You have a new evaluation assigned.', time: '09:00', unread: true },
    { id: 2, title: 'Evaluation Submitted', message: 'A research proposal was submitted for review.', time: '12:30', unread: false },
    { id: 3, title: 'Upcoming Evaluation', message: 'Your evaluation session is scheduled tomorrow.', time: '15:00', unread: false },
  ];

  return (
    <header className="w-full h-16 bg-white px-4 sm:px-6 lg:px-8 shadow-sm flex items-center sticky top-0 z-30">
      {/* LEFT: LOGO */}
      <div onClick={handleDashboard} className="flex items-center gap-2">
        <Image src={logo} alt="uep-logo" width={48} height={48} className="object-cover" />
        <h1 className="text-[26px] font-semibold text-blue-600">URDS</h1>
      </div>

      {/* RIGHT */}
      <nav className="ml-auto flex items-center gap-4">
        {/* SEARCH */}
          <li className="hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Type here..."
                className="pl-10 pr-4 py-2 rounded-full border bg-blue-50 border-slate-200 shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-300 text-xs placeholder:font-medium w-32 sm:w-40 md:w-64"
              />
              <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </li>

        {/* NOTIFICATIONS */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={handleDashboard}
            className={`p-2 mr-2 rounded-full hover:bg-gray-100 ${isNotifOpen ? 'bg-blue-100 text-blue-600' : 'text-slate-500'}`}
          >
            <BiSolidHome />
          </button>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`p-2 rounded-full hover:bg-gray-100 ${isNotifOpen ? 'bg-blue-100 text-blue-600' : 'text-slate-500'}`}
          >
            <BsBellFill />
          </button>

          {/* Dropdown always rendered */}
          <div
            className={`absolute right-0 mt-3 w-80 rounded-xl shadow-lg bg-white ring-1 ring-slate-200 z-30 transform origin-top-right transition-all duration-200 ease-out
              ${isNotifOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'}
            `}
          >
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800">Notifications</h3>
              <button className="text-slate-400 hover:text-slate-600 text-xl">•••</button>
            </div>
            <div className="max-h-72 overflow-y-auto overflow-x-hidden">
              {notifications.map(notif => (
                <button
                  key={notif.id}
                  onClick={() => router.push('/notifications')}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex gap-3"
                >
                  <span className={`mt-2 h-2 w-2 rounded-full ${notif.unread ? 'bg-blue-500' : 'bg-transparent'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate whitespace-nowrap">{notif.title}</p>
                    <p className="text-xs text-slate-500 truncate">{notif.message}</p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{notif.time}</span>
                </button>
              ))}
            </div>
            <div className="border-t border-gray-100">
              <button
                onClick={() => router.push('/notifications')}
                className="w-full text-[13px] text-center text-slate-500 px-4 py-3 hover:bg-gray-50 transition flex items-center justify-center gap-3 overflow-hidden"
              >
                Show All
              </button>
            </div>
          </div>
        </div>

        {/* PROFILE */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center gap-2 px-2 py-1 rounded-full hover:text-blue-500 ${isProfileOpen ? 'text-blue-400' : 'text-slate-600'}`}
          >
            <span className="text-sm font-semibold hidden md:block">{roleLabel}</span>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-300">
              <Image src={profile} alt="Profile" width={48} height={48} className="object-cover" />
            </div>
          </button>

          {/* Profile Dropdown always rendered */}
          <div
            className={`absolute right-0 mt-3 w-56 rounded-lg shadow-lg bg-white ring-1 ring-slate-200 divide-y divide-gray-100 z-30 transform origin-top-right transition-all duration-200 ease-out
              ${isProfileOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'}
            `}
          >
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-slate-800 truncate">{fullName}</p>
              <p className="text-xs text-slate-500 truncate">{email}</p>
            </div>
            <div className="py-1">
              <a
                href="/settings"
                className="flex items-center font-medium px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
              >
                <BiCog className="mr-3 h-5 w-5 opacity-70" /> Account Settings
              </a>
            </div>
            <div className="py-1">
              <button
                onClick={handleLogout}
                className="flex items-center w-full font-medium text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
              >
                <BiLogOut className="mr-3 h-5 w-5 opacity-70" /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default EvaluatorHeader;

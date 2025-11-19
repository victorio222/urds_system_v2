'use client';
import React from 'react';
import { BiChip } from 'react-icons/bi';
import { FaCogs } from 'react-icons/fa';
import { FaUser, FaUserCheck } from 'react-icons/fa6';

const ActiveAccounts = () => {
  return (
    <div className="relative bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-lg p-3 shadow-md overflow-hidden w-full">
      <div className="absolute top-3 right-3 text-white text-2xl opacity-90">
        <FaUserCheck />
      </div>

      <p className="text-sm font-normal">Active Accounts</p>

      <h2 className="text-2xl font-bold my-1">70</h2>

      <div className="absolute w-32 h-32 bg-white/10 rounded-full -bottom-10 -left-10" />
      <div className="absolute w-24 h-24 bg-white/10 rounded-full -top-5 -right-5" />
    </div>
  );
};

export default ActiveAccounts;

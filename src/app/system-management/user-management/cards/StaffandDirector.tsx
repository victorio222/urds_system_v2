'use client';
import React from 'react';
import { BiChip } from 'react-icons/bi';
import { FaCogs } from 'react-icons/fa';
import { FaUser, FaUserTie } from 'react-icons/fa6';
import { MdWork } from 'react-icons/md';

const StaffandDirector = () => {
  return (
    <div className="relative bg-gradient-to-r from-[#1A3D64] to-[#1D546C] text-white rounded-lg p-3 shadow-md overflow-hidden w-full">
      <div className="absolute top-3 right-3 text-white text-2xl opacity-90">
        <FaUserTie />
      </div>

      <p className="text-sm font-normal">URDS Staff and Director</p>

      <h2 className="text-2xl font-bold my-1">2</h2>

      <div className="absolute w-32 h-32 bg-white/10 rounded-full -bottom-10 -left-10" />
      <div className="absolute w-24 h-24 bg-white/10 rounded-full -top-5 -right-5" />
    </div>
  );
};

export default StaffandDirector;

'use client';
import React from 'react';
import { BiBarChart, BiLoader } from 'react-icons/bi'; // Icon for Earnings (Bar Chart)
import { FaCogs } from 'react-icons/fa'; // Icon you already have

const OngoingProposal = () => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-lg w-full max-w-xs flex items-center justify-between">
      {/* Card Content */}
      <div>
        <p className="text-xs font-medium text-slate-400">Ongoing Proposal</p>
      <h2 className="text-2xl font-semibold text-slate-800">34</h2>
      <p className="text-xs text-slate-500">Increased by 5%</p>
      </div>

      {/* Icon on the right side */}
      <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded-full">
        <BiLoader className="text-xl" />
      </div>
    </div>
  );
};

export default OngoingProposal;

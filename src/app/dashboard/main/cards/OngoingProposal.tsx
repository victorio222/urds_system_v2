// 'use client';
// import React from 'react';
// import { BiBarChart, BiLoader } from 'react-icons/bi'; // Icon for Earnings (Bar Chart)
// import { FaCogs } from 'react-icons/fa'; // Icon you already have

// const OngoingProposal = () => {
//   return (
//     <div className="bg-white p-3 rounded-lg shadow-lg w-full max-w-xl flex items-center justify-between">
//       {/* Card Content */}
//       <div>
//         <p className="text-xs font-medium text-slate-400">Ongoing Proposal</p>
//       <h2 className="text-2xl font-semibold text-slate-800">34</h2>
//       <p className="text-xs text-slate-500">Increased by 5%</p>
//       </div>

//       {/* Icon on the right side */}
//       <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded-full">
//         <BiLoader className="text-xl" />
//       </div>
//     </div>
//   );
// };

// export default OngoingProposal;










'use client';

import React, { useEffect, useState } from 'react';
import { BiLoader } from 'react-icons/bi';
import { apiAuth } from '@/utils/apiHelpers';

const OngoingProposal = () => {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const res = await apiAuth.get('/proposals');

        // Adjust statuses if needed
        const ongoing = res.data.filter(
          (proposal: any) =>
            proposal.status === 'Ongoing' ||
            proposal.status === 'In Progress'
        );

        setCount(ongoing.length);
      } catch (error) {
        console.error('Failed to fetch proposals', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg w-full max-w-xl flex items-center justify-between">
      {/* Card Content */}
      <div>
        <p className="text-xs font-medium text-slate-400">
          Ongoing Proposal
        </p>

        <h2 className="text-2xl font-semibold text-slate-800">
          {loading ? '—' : count}
        </h2>

        <p className="text-xs text-slate-500">
          {loading ? 'Loading...' : 'Currently active proposals'}
        </p>
      </div>

      {/* Icon */}
      <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded-full">
        <BiLoader className={`text-xl ${loading ? 'animate-spin' : ''}`} />
      </div>
    </div>
  );
};

export default OngoingProposal;

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  BiCalendar, 
  BiDownload, 
  BiSend, 
  BiLoaderAlt,
  BiChevronRight,
  BiInfoCircle
} from "react-icons/bi";
import Link from "next/link";
import { getAnnouncements } from "@/utils/apiHelpers";
import { useAuth } from "@/context/AuthContext";

const ResearcherDashboard = () => {
  const { isAuthenticated } = useAuth();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAnnouncements();
      // Sort newest to oldest
      const data = (res.data || []).sort(
        (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setAnnouncements(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated, fetchData]);

  // Logic for the Pinned Left Side: Only Call for Research that are still active
  const pinnedCalls = announcements.filter(a => 
    a.type?.toLowerCase().includes("call") && new Date(a.end_date) > new Date()
  );

  if (loading) return (
    <div className="flex h-screen items-center justify-center"><BiLoaderAlt className="animate-spin text-blue-600" size={40} /></div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* LEFT PANEL: PINNED CALLS (FIXED) */}
          <aside className="lg:sticky lg:top-10 lg:col-span-5 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-blue-600 pl-3">Active Calls</h2>
            
            {pinnedCalls.length === 0 ? (
              <div className="p-10 bg-white border border-dashed rounded-2xl text-center text-gray-400">
                No active calls for research.
              </div>
            ) : (
              pinnedCalls.map((call) => (
                <div key={call.announcement_id} className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm ring-1 ring-blue-50">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">OPEN</span>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Deadline</p>
                      <p className="text-xs font-bold text-red-600">{new Date(call.end_date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{call.title}</h3>
                  <p className="text-sm text-gray-500 mb-6 line-clamp-3">{call.content}</p>

                  <Link
                    href="/research-projects/submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                  >
                    <BiSend /> Submit Proposal
                  </Link>
                </div>
              ))
            )}
          </aside>

          {/* RIGHT PANEL: SCROLLABLE FEED (RECENT TO OLD) */}
          <main className="lg:col-span-7 space-y-8">
            <h2 className="text-xl font-bold text-gray-800 border-l-4 border-gray-300 pl-3">Recent Announcements</h2>
            
            <div className="space-y-4">
              {announcements.map((item) => {
                const isCall = item.type?.toLowerCase().includes("call");
                const isReview = item.type?.toLowerCase().includes("review");

                return (
                  <div key={item.announcement_id} className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        isCall ? 'bg-blue-50 text-blue-600' : isReview ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-600'
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <BiCalendar /> {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-md font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.content}</p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                      <button className="text-xs font-semibold text-gray-400 flex items-center gap-1 hover:text-blue-600 transition">
                        <BiInfoCircle /> View Details
                      </button>
                      {isCall && new Date(item.end_date) > new Date() && (
                        <span className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                          ● Currently Accepting Proposals
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default ResearcherDashboard;
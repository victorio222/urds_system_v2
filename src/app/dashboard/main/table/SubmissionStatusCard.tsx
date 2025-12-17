"use client";

import React, { useState } from "react";
import { UploadCloud, Lock, Calendar, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";

// Props Interface
interface SubmissionStatusProps {
  isOpen: boolean; // Controls the Green vs Blue/Gray state
  deadline?: string;
}

const SubmissionStatusCard: React.FC<SubmissionStatusProps> = ({ 
  isOpen = true, // Default to true for demo, toggle this prop to see changes
  deadline = "Oct 15, 2025" 
}) => {

  // Toggle for testing (You can remove this in production and use the prop directly)
  const [isSubmissionOpen, setSubmissionOpen] = useState(isOpen);

  return (
    <section 
      className={`flex h-full w-full flex-col justify-between rounded-xl border p-5 shadow-sm font-sans min-h-[230px] transition-all duration-300 ${
        isSubmissionOpen 
          ? "border-emerald-100 bg-white" // Green/Alive Theme
          : "border-slate-200 bg-slate-50/50" // Blue/Gray Muted Theme
      }`}
    >
      
      {/* --- Header --- */}
      <div className="flex items-center justify-between">
        <h2 className={`text-sm lg:text-base font-medium ${isSubmissionOpen ? "text-slate-800" : "text-slate-400"}`}>
          Proposal Submission
        </h2>
        
        {/* Status Badge */}
        <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide transition-colors ${
          isSubmissionOpen 
            ? "bg-emerald-100 text-emerald-700" 
            : "bg-slate-200 text-slate-500"
        }`}>
          {isSubmissionOpen ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Active
            </>
          ) : (
            <>
              <Lock size={10} /> Closed
            </>
          )}
        </span>
      </div>

      {/* --- Main Content (Centered) --- */}
      <div className="flex flex-1 flex-col items-center justify-center gap-3 py-2">
        
        {/* Animated Icon Container */}
        <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 ${
          isSubmissionOpen 
            ? "bg-emerald-50 text-emerald-600 shadow-md shadow-emerald-100" 
            : "bg-slate-200 text-slate-400 grayscale"
        }`}>
          {isSubmissionOpen ? (
            <UploadCloud size={32} className="animate-bounce-slow" />
          ) : (
            <Lock size={30} />
          )}
        </div>

        {/* Text Details */}
        <div className="text-center space-y-1">
          <h3 className={`text-sm font-bold ${isSubmissionOpen ? "text-slate-800" : "text-slate-500"}`}>
            {isSubmissionOpen ? "Call for Proposals Open" : "Submission Period Ended"}
          </h3>
          <p className={`text-[11px] font-medium flex items-center justify-center gap-1.5 ${isSubmissionOpen ? "text-slate-500" : "text-slate-400"}`}>
            {isSubmissionOpen ? (
              <>
                <Calendar size={12} /> Deadline: <span className="text-emerald-600 font-bold">{deadline}</span>
              </>
            ) : (
              "The current cycle is closed for new entries."
            )}
          </p>
        </div>
      </div>

      {/* --- Footer Action --- */}
      <div className="mt-2">
        <button 
          disabled={!isSubmissionOpen}
          className={`group flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all duration-300 ${
            isSubmissionOpen 
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-emerald-300 hover:-translate-y-0.5" 
              : "cursor-not-allowed bg-slate-200 text-slate-400"
          }`}
        >
          {isSubmissionOpen ? "Submit Proposal" : "Submission Locked"}
          {isSubmissionOpen && <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />}
        </button>
      </div>

      {/* DEV ONLY: Remove this button in production. 
          It allows you to toggle the state to test the design.
      */}
      {/* <button 
        onClick={() => setSubmissionOpen(!isSubmissionOpen)} 
        className="absolute bottom-2 right-2 text-[9px] text-slate-300 hover:text-slate-500"
      >
        [Toggle State]
      </button> */}

    </section>
  );
};

export default SubmissionStatusCard;
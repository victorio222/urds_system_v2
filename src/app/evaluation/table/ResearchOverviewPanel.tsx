"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Divider } from "@mui/material";

interface EvaluationItem {
  id: number;
  title: string;
  researcher: string;
  evaluationId: string;
}

const ResearchOverviewPanel = () => {
  const evaluations: EvaluationItem[] = [
    {
      id: 1,
      title: "AI in Healthcare",
      researcher: "Dr. James Smith",
      evaluationId: "EV2025-001",
    },
    {
      id: 2,
      title: "Agricultural Automation",
      researcher: "Engr. Carl Lohan",
      evaluationId: "EV2025-002",
    },
    {
      id: 3,
      title: "Climate Privacy Review",
      researcher: "Dr. John Cruz",
      evaluationId: "EV2025-003",
    },
    {
      id: 4,
      title: "Climate Privacy Review",
      researcher: "Dr. John Cruz",
      evaluationId: "EV2025-003",
    },
    {
      id: 5,
      title: "Climate Privacy Review",
      researcher: "Dr. John Cruz",
      evaluationId: "EV2025-003",
    },
    {
      id: 6,
      title: "Climate Privacy Review",
      researcher: "Dr. John Cruz",
      evaluationId: "EV2025-003",
    },
    {
      id: 7,
      title: "Climate Privacy Review",
      researcher: "Dr. John Cruz",
      evaluationId: "EV2025-003",
    },
  ];

  const [selected, setSelected] = useState(evaluations[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  const handleViewContent = () => {
    // Redirect to /evaluation/proposal
    router.push("/evaluation/proposal");
  };

  return (
    <div className="relative flex h-[calc(100vh-64px)] w-full overflow-hidden">
      {/* OVERLAY FOR MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* LEFT PANEL / SIDEBAR */}
      <div
        className={`
          fixed z-20 top-0 left-0 h-full w-64 md:w-[450px] bg-white border-r border-gray-100 p-4 overflow-y-auto shadow-lg
          transform transition-transform duration-300 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}
          md:translate-x-0 md:relative md:h-full pt-18 md:pt-2
        `}
      >

        <h2 className="pt-2 flex items-center gap-2 text-lg font-semibold text-slate-700 mb-2">
          <button
            className="flex font-medium text-slate-600 items-center gap-2 justify-start ml-[-7px] hover:cursor-pointer hover:text-blue-700"
            onClick={() => router.push("/dashboard")}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          Scheduled Evaluation
        </h2>
        <div className="text-xs text-slate-500 mb-3">
          TOTAL: {evaluations.length}
        </div>

        <div className="space-y-2">
          {evaluations.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className={`p-3 rounded-lg cursor-pointer border transition ${
                selected.id === item.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 border-gray-200 text-slate-700 hover:bg-gray-200"
              }`}
            >
              <div className="font-medium">{item.title}</div>
              <div className="text-sm opacity-90">
                Researcher: {item.researcher}
              </div>
              <div className="text-xs mt-1 opacity-70">
                Evaluation ID: {item.evaluationId}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL / MAIN CONTENT */}
      <div className="m-3 w-full h-auto overflow-y-auto">
        {/* Mobile sidebar toggle */}
        <button
          className="md:hidden w-full mb-4 px-3 py-2 bg-blue-600 text-white rounded-lg shadow"
          onClick={() => setSidebarOpen(true)}
        >
          View List of Proposals
        </button>

        {[...Array(1)].map((_, index) => (
          <div
            key={index}
            className="bg-white shadow p-3 flex flex-col gap-3 mb-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-slate-700 mb-2">
              Research Overview
            </h2>
            <div className="space-y-3 text-slate-700">
              <div>
                <span className="font-semibold">Title: </span>
                {selected.title}
              </div>
              <div>
                <span className="font-semibold">Author(s): </span>
                {selected.researcher}
              </div>
              <div>
                <span className="font-semibold">Status: </span>
                <span className="text-purple-600 font-medium">
                  New Research Proposal
                </span>
              </div>
              <div>
                <span className="font-semibold">Rationale:</span>
                <p className="text-sm text-slate-500 mt-1">
                  — No rationale provided —
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={handleViewContent}
                className="mt-2 md:mt-4 px-5 py-2 bg-blue-600 text-white rounded-full hover:cursor-pointer shadow hover:bg-blue-700 transition w-max"
              >
                VIEW CONTENT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchOverviewPanel;

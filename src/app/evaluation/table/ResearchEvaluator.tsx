"use client";

import React from "react";
import ResearchOverviewPanel from "./ResearchOverviewPanel";
import EvaluatorHeader from "../header/EvaluatorHeader";

const ResearchEvaluator = () => {
  return (
    <div className="min-h-screen bg-blue-50 overflow-hidden">
      {/* HEADER */}
      <EvaluatorHeader />

      {/* MAIN CONTENT (height = screen - header) */}
      <ResearchOverviewPanel />
    </div>
  );
};

export default ResearchEvaluator;

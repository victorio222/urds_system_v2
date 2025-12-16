"use client";
import { Bell, FileText, CheckSquare, Search, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/component/uii/button";
import { Input } from "@/component/uii/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/component/uii/avatar";
import CapsuleReportPrintablePage from "@/app/report/capsule-report/page";
import WorkPlanPrintablePage from "@/app/report/workplan-report/page";
import BudgetReportPrintablePage from "@/app/report/budget-report/page";
import EvaluatorHeader from "../header/EvaluatorHeader";
import { Divider } from "@mui/material";

export default function EvaluationPanel() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <EvaluatorHeader />

      {/* Main Content */}
      <div className="flex flex-1 max-w-[1600px] mx-auto w-full flex-col lg:flex-row">
        {/* Left Sidebar */}
        <aside
          className="w-full lg:w-[380px] bg-gray-100 px-4 sm:p-6 border-r border-gray-200 overflow-y-auto flex flex-col sticky top-0 self-start"
          style={{ maxHeight: "calc(100vh - 0px)" }}
        >
          <div className="flex items-center gap-2">
            <button
              className="font-medium text-slate-600 ml-[-7px] hover:cursor-pointer hover:text-blue-700"
              onClick={() => router.push("/evaluation")}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h2 className="text-xl sm:text-lg font-semibold text-slate-700">
              Evaluation Panel
            </h2>
          </div>

          <Divider className="pb-2" />
          {/* Evaluator Information */}
          <div className="mt-1 mb-4 sm:mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">
              Evaluator Information
            </h3>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <div className="text-gray-600">Name:</div>
              <div className="text-gray-600">Position:</div>
              <div className="text-gray-600">Evaluation Reference ID:</div>
            </div>
          </div>

          {/* Proposal Information */}
          <div className="mb-4 sm:mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">
              Proposal Information
            </h3>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <div className="text-gray-600">Proposal Reference ID:</div>
              <div className="text-gray-600">Title:</div>
              <div className="text-gray-600">Researcher Name:</div>
              <div className="text-gray-600">Project Duration:</div>
              <div className="text-gray-600">Project Status:</div>
            </div>
          </div>

          {/* Evaluation Criteria */}
          <div className="mb-4 sm:mb-6">
            <h3 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">
              Evaluation Criteria
            </h3>
            <div className="space-y-4 text-xs sm:text-sm">
              {[
                "Grammar and Delivery",
                "Mastery of the Study (Manuscript)",
                "Mastery of the Study (System)",
                "Attire",
                "Presentation of the Manuscript",
              ].map((criteria) => (
                <div key={criteria}>
                  <label className="block text-gray-700 mb-1 sm:mb-2">
                    {criteria}
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 mb-1 sm:mb-2 text-sm">
                    <option value="">Select Performance Level</option>
                    <option value="poor">Poor (59% and below)</option>
                    <option value="beginning">Beginning (60% - 74%)</option>
                    <option value="developing">Developing (75% - 79%)</option>
                    <option value="proficient">Proficient (80% - 88%)</option>
                    <option value="exemplary">Exemplary (89% - 100%)</option>
                  </select>
                  <Input
                    type="number"
                    placeholder="Grade/Score"
                    className="w-full bg-white border-gray-300 text-black text-sm"
                    min={0}
                    max={100}
                  />
                </div>
              ))}

              {/* Comments */}
              <div>
                <label className="block text-gray-700 mb-1 sm:mb-2">
                  Comments
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 min-h-[100px] sm:min-h-[120px] resize-y text-sm"
                  placeholder="Enter your comments here..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-4">
            <Button variant="secondary" className="flex-1 gap-2">
              <FileText className="h-4 w-4" />
              Save Draft
            </Button>
            <Button className="flex-1 gap-2 bg-green-600 hover:bg-green-700">
              <CheckSquare className="h-4 w-4" />
              Submit
            </Button>
          </div>
        </aside>

        {/* Main Document Area */}
        <main className="flex flex-1 flex-col w-full gap-4 p-4 sm:p-8 bg-gray-200 overflow-y-auto">
          <CapsuleReportPrintablePage />
          <WorkPlanPrintablePage />
          <BudgetReportPrintablePage />
        </main>
      </div>
    </div>
  );
}

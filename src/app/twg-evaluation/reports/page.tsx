import { Bell, FileText, CheckSquare, Search } from "lucide-react"
import CapsuleReportPrintablePage from "@/app/report/capsule-report/page"
import WorkPlanPrintablePage from "@/app/report/workplan-report/page"

export default function EvaluationPanel() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-400">
      {/* Main Content */}
      <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
        {/* Main Document Area */}
        <main className="flex-1 p-8 bg-white overflow-y-auto">
          <CapsuleReportPrintablePage />
          <WorkPlanPrintablePage />
        </main>
      </div>
    </div>
  )
}

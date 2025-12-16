// import { Bell, FileText, CheckSquare, Search } from "lucide-react"
// import { Button } from "@/component/uii/button"
// import { Input } from "@/component/uii/input"
// import { Avatar, AvatarFallback, AvatarImage } from "@/component/uii/avatar"
// import CapsuleReportPrintablePage from "@/app/report/capsule-report/page"
// import WorkPlanPrintablePage from "@/app/report/workplan-report/page"
// import BudgetReportPrintablePage from "@/app/report/budget-report/page"

// export default function EvaluationPanel() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 px-6 py-3">
//         <div className="flex items-center justify-between max-w-[1600px] mx-auto">
//           {/* Logo and Title */}
//           <div className="flex items-center gap-3">
//             <div className="w-14 h-14 relative">
//               <img src="/urds/UEP_logo-transparent.png" alt="UEP Logo" className="w-full h-full object-contain" />
//             </div>
//             <h1 className="text-3xl font-bold text-blue-600">URDS</h1>
//           </div>

//           {/* Search and User Section */}
//           <div className="flex items-center gap-4">
//             <div className="relative w-80">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input placeholder="Type here..." className="pl-10 bg-gray-50 border-gray-200 text-black" />
//             </div>
//             <Button variant="ghost" size="icon" className="relative">
//               <Bell className="h-5 w-5 text-blue-600" />
//             </Button>
//             <div className="flex items-center gap-2">
//               <span className="text-sm font-medium text-gray-700">Research Evaluator</span>
//               <Avatar className="h-9 w-9">
//                 <AvatarImage src="/placeholder.svg?height=36&width=36" />
//                 <AvatarFallback>RE</AvatarFallback>
//               </Avatar>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
//         {/* Left Sidebar */}
//         <aside className="w-[380px] bg-gray-100 p-6 border-r border-gray-200 overflow-y-auto flex flex-col sticky top-0 self-start" style={{ maxHeight: 'calc(100vh - 64px)' }}>
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">Evaluation Panel</h2>

//           {/* Evaluator Information */}
//           <div className="mb-6">
//             <h3 className="font-semibold text-gray-700 mb-3">Evaluator Information</h3>
//             <div className="space-y-2 text-sm">
//               <div className="text-gray-600">Name:</div>
//               <div className="text-gray-600">Position:</div>
//               <div className="text-gray-600">Evaluation Reference ID:</div>
//             </div>
//           </div>

//           {/* Proposal Information */}
//           <div className="mb-6">
//             <h3 className="font-semibold text-gray-700 mb-3">Proposal Information</h3>
//             <div className="space-y-2 text-sm">
//               <div className="text-gray-600">Proposal Reference ID:</div>
//               <div className="text-gray-600">Title:</div>
//               <div className="text-gray-600">Researcher Name:</div>
//               <div className="text-gray-600">Project Duration:</div>
//               <div className="text-gray-600">Project Status:</div>
//             </div>
//           </div>

//           {/* Evaluation Criteria */}
//           <div className="mb-6">
//             <h3 className="font-semibold text-gray-700 mb-4">Evaluation Criteria</h3>
//             <div className="space-y-4">
//               {/* Grammar and Delivery */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Grammar and Delivery
//                 </label>
//                 <select className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 mb-2">
//                   <option value="">Select Performance Level</option>
//                   <option value="poor">Poor (59% and below)</option>
//                   <option value="beginning">Beginning (60% - 74%)</option>
//                   <option value="developing">Developing (75% - 79%)</option>
//                   <option value="proficient">Proficient (80% - 88%)</option>
//                   <option value="exemplary">Exemplary (89% - 100%)</option>
//                 </select>
//                 <Input 
//                   type="number" 
//                   placeholder="Grade/Score" 
//                   className="w-full bg-white border-gray-300 text-black"
//                   min="0"
//                   max="100"
//                 />
//               </div>

//               {/* Mastery of the Study (Manuscript) */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Mastery of the Study (Manuscript)
//                 </label>
//                 <select className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 mb-2">
//                   <option value="">Select Performance Level</option>
//                   <option value="poor">Poor (59% and below)</option>
//                   <option value="beginning">Beginning (60% - 74%)</option>
//                   <option value="developing">Developing (75% - 79%)</option>
//                   <option value="proficient">Proficient (80% - 88%)</option>
//                   <option value="exemplary">Exemplary (89% - 100%)</option>
//                 </select>
//                 <Input 
//                   type="number" 
//                   placeholder="Grade/Score" 
//                   className="w-full bg-white border-gray-300 text-black"
//                   min="0"
//                   max="100"
//                 />
//               </div>

//               {/* Mastery of the Study (System) */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Mastery of the Study (System)
//                 </label>
//                 <select className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 mb-2">
//                   <option value="">Select Performance Level</option>
//                   <option value="poor">Poor (59% and below)</option>
//                   <option value="beginning">Beginning (60% - 74%)</option>
//                   <option value="developing">Developing (75% - 79%)</option>
//                   <option value="proficient">Proficient (80% - 88%)</option>
//                   <option value="exemplary">Exemplary (89% - 100%)</option>
//                 </select>
//                 <Input 
//                   type="number" 
//                   placeholder="Grade/Score" 
//                   className="w-full bg-white border-gray-300 text-black"
//                   min="0"
//                   max="100"
//                 />
//               </div>

//               {/* Attire */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Attire
//                 </label>
//                 <select className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 mb-2">
//                   <option value="">Select Performance Level</option>
//                   <option value="poor">Poor (59% and below)</option>
//                   <option value="beginning">Beginning (60% - 74%)</option>
//                   <option value="developing">Developing (75% - 79%)</option>
//                   <option value="proficient">Proficient (80% - 88%)</option>
//                   <option value="exemplary">Exemplary (89% - 100%)</option>
//                 </select>
//                 <Input 
//                   type="number" 
//                   placeholder="Grade/Score" 
//                   className="w-full bg-white border-gray-300 text-black"
//                   min="0"
//                   max="100"
//                 />
//               </div>

//               {/* Presentation of the Manuscript */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Presentation of the Manuscript
//                 </label>
//                 <select className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 mb-2">
//                   <option value="">Select Performance Level</option>
//                   <option value="poor">Poor (59% and below)</option>
//                   <option value="beginning">Beginning (60% - 74%)</option>
//                   <option value="developing">Developing (75% - 79%)</option>
//                   <option value="proficient">Proficient (80% - 88%)</option>
//                   <option value="exemplary">Exemplary (89% - 100%)</option>
//                 </select>
//                 <Input 
//                   type="number" 
//                   placeholder="Grade/Score" 
//                   className="w-full bg-white border-gray-300 text-black"
//                   min="0"
//                   max="100"
//                 />
//               </div>

//               {/* Comments */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Comments
//                 </label>
//                 <textarea 
//                   className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 min-h-[120px] resize-y"
//                   placeholder="Enter your comments here..."
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3 mt-auto pt-4">
//             <Button variant="secondary" className="flex-1 gap-2">
//               <FileText className="h-4 w-4" />
//               Save Draft
//             </Button>
//             <Button className="flex-1 gap-2 bg-green-600 hover:bg-green-700">
//               <CheckSquare className="h-4 w-4" />
//               Submit
//             </Button>
//           </div>
//         </aside>

//         {/* Main Document Area */}
//         <main className="flex flex-1 flex-col w-full gap-2 p-8 bg-gray-200 overflow-y-auto">
//           <CapsuleReportPrintablePage />
//           <WorkPlanPrintablePage />
//           <BudgetReportPrintablePage />
//         </main>
//       </div>
//     </div>
//   )
// }








import { Bell, FileText, CheckSquare, Search } from "lucide-react";
import { Button } from "@/component/uii/button";
import { Input } from "@/component/uii/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/component/uii/avatar";
import CapsuleReportPrintablePage from "@/app/report/capsule-report/page";
import WorkPlanPrintablePage from "@/app/report/workplan-report/page";
import BudgetReportPrintablePage from "@/app/report/budget-report/page";

export default function EvaluationPanel() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto flex-wrap">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 relative">
              <img src="/urds/UEP_logo-transparent.png" alt="UEP Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">URDS</h1>
          </div>

          {/* Search and User Section */}
          <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0 flex-wrap">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Type here..." className="pl-10 bg-gray-50 border-gray-200 text-black w-full" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-blue-600" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Research Evaluator</span>
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                <AvatarImage src="/placeholder.svg?height=36&width=36" />
                <AvatarFallback>RE</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 max-w-[1600px] mx-auto w-full flex-col lg:flex-row">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-[380px] bg-gray-100 p-4 sm:p-6 border-r border-gray-200 overflow-y-auto flex flex-col sticky top-0 self-start"
          style={{ maxHeight: 'calc(100vh - 64px)' }}>
          
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Evaluation Panel</h2>

          {/* Evaluator Information */}
          <div className="mb-4 sm:mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">Evaluator Information</h3>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <div className="text-gray-600">Name:</div>
              <div className="text-gray-600">Position:</div>
              <div className="text-gray-600">Evaluation Reference ID:</div>
            </div>
          </div>

          {/* Proposal Information */}
          <div className="mb-4 sm:mb-6">
            <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">Proposal Information</h3>
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
            <h3 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">Evaluation Criteria</h3>
            <div className="space-y-4 text-xs sm:text-sm">
              {["Grammar and Delivery", "Mastery of the Study (Manuscript)", "Mastery of the Study (System)", "Attire", "Presentation of the Manuscript"].map((criteria) => (
                <div key={criteria}>
                  <label className="block text-gray-700 mb-1 sm:mb-2">{criteria}</label>
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
                <label className="block text-gray-700 mb-1 sm:mb-2">Comments</label>
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

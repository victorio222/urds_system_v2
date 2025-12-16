import { Bell, FileText, CheckSquare, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function EvaluationPanel() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
        {/* Main Document Area */}
        <main className="flex-1 p-8 bg-white overflow-y-auto">
          <div className="max-w-[900px] mx-auto space-y-8">
            {/* CAPSULE RESEARCH PROPOSAL TEMPLATE Section */}
            <div className="bg-white border border-gray-300 p-8">
              {/* University Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-28 h-28 flex-shrink-0">
                  <img src="/urds/UEP_logo-transparent.png" alt="UEP Seal" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-black mb-1">Republic of the Philippines</p>
                  <h2 className="text-lg font-bold text-black mb-1">UNIVERSITY OF EASTERN PHILIPPINES</h2>
                  <p className="text-xs text-black mb-2">University Town, Northern Samar, Philippines</p>
                  <p className="text-xs text-black">
                    Web:{" "}
                    <a href="http://uep.edu.ph" className="text-blue-600 underline">
                      http://uep.edu.ph
                    </a>
                    ; Email:{" "}
                    <a href="mailto:uepnsofficial@gmail.com" className="text-blue-600 underline">
                      uepnsofficial@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Blue Divider */}
              <div className="h-1 bg-blue-900 mb-6" />

              {/* Document Title */}
              <h3 className="text-center font-bold text-sm mb-6 text-black">
                UNIVERSITY RESEARCH AND DEVELOPMENT SERVICES
              </h3>

              <h4 className="text-center font-bold text-sm mb-4 text-black">CAPSULE RESEARCH PROPOSAL TEMPLATE</h4>

            {/* Form Table */}
            <div className="border-2 border-black">
              {/* Detailed Research Proposal Header */}
              <div className="border-b-2 border-black p-2 text-center font-bold text-sm text-black">
                Detailed Research Proposal
              </div>

              {/* Basic Information Section */}
              <div className="border-b-2 border-black">
                <div className="p-2 font-bold text-sm border-b border-black text-black">I. Basic Information</div>

                {/* Title Row */}
                <div className="flex border-b border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black">Title</div>
                  <div className="flex-1 p-2 min-h-[40px]"></div>
                </div>

                {/* Nature of Research Row */}
                <div className="flex border-b border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black">
                    <div>Nature of Research</div>
                    <div className="text-xs">(Please check one)</div>
                  </div>
                  <div className="flex-1 p-2 min-h-[40px]"></div>
                </div>

                {/* Leader/Main Proponent Row */}
                <div className="flex border-b border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black">Leader/ Main Proponent</div>
                  <div className="flex-1 p-2 min-h-[40px]"></div>
                </div>

                {/* Other Personnel Row */}
                <div className="flex border-b border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black">Other Personnel Involved</div>
                  <div className="flex-1 p-2 min-h-[40px]"></div>
                </div>

                {/* Project Location Row */}
                <div className="flex border-b border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black">Project Location/s</div>
                  <div className="flex-1 p-2 min-h-[40px]"></div>
                </div>

                {/* Duration Row */}
                <div className="flex border-b border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black">Duration</div>
                  <div className="flex-1 p-2 min-h-[40px]"></div>
                </div>

                {/* Budget Row */}
                <div className="flex">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black">Budget for the Year</div>
                  <div className="flex-1 p-2 min-h-[40px]"></div>
                </div>
              </div>

              {/* Technical Information Section */}
              <div className="border-b-2 border-black">
                <div className="p-2 font-bold text-sm border-b border-black text-black">II. Technical Information</div>

                {/* Rationale/Significance Row */}
                <div className="flex">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black">Rationale/Significance of Research</div>
                  <div className="flex-1 p-2 min-h-[280px]"></div>
                </div>
              </div>

              {/* Document Footer */}
              <div className="flex text-xs border border-black">
                <div className="flex-1 p-2 border-r border-black text-center font-bold text-black">
                  <div>DOCUMENT NO.: UEP-URDS-</div>
                  <div>FM-003</div>
                </div>
                <div className="flex-1 p-2 border-r border-black text-center font-bold text-black">REVISION NO.: 00</div>
                <div className="flex-1 p-2 text-center font-bold text-black">
                  <div>EFFECTIVITY</div>
                  <div>SEPTEMBER 12, 2022</div>
                </div>
              </div>
            </div>
            </div>

            {/* WORKPLAN Section */}
            <div className="bg-white border border-gray-300 p-8">
              {/* University Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-28 h-28 flex-shrink-0">
                  <img src="/urds/UEP_logo-transparent.png" alt="UEP Seal" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-black mb-1">Republic of the Philippines</p>
                  <h2 className="text-lg font-bold text-black mb-1">UNIVERSITY OF EASTERN PHILIPPINES</h2>
                  <p className="text-xs text-black mb-2">University Town, Northern Samar, Philippines</p>
                  <p className="text-xs text-black">
                    Web:{" "}
                    <a href="http://uep.edu.ph" className="text-blue-600 underline">
                      http://uep.edu.ph
                    </a>
                    ; Email:{" "}
                    <a href="mailto:uepnsofficial@gmail.com" className="text-blue-600 underline">
                      uepnsofficial@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Double Horizontal Line Separator */}
              <div className="h-0.5 bg-black mb-2"></div>
              <div className="h-0.5 bg-black mb-6"></div>

              {/* Document Title */}
              <h3 className="text-center font-bold text-sm mb-6 text-black">
                UNIVERSITY RESEARCH AND DEVELOPMENT SERVICES
              </h3>

              <h4 className="text-center font-bold text-lg mb-6 text-black">WORKPLAN</h4>

              {/* Top Input Fields */}
              <div className="mb-4 space-y-2">
                <div className="flex border border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black font-semibold">
                    Program/Project/Study Title:
                  </div>
                  <div className="flex-1 p-2 min-h-[40px]"></div>
                </div>
                <div className="flex border border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black font-semibold">
                    Program/Project Study Leader:
                  </div>
                  <div className="flex-1 p-2 min-h-[40px]"></div>
                </div>
                <div className="flex border border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black font-semibold">
                    College/Unit/Campus:
                  </div>
                  <div className="flex-1 p-2 min-h-[40px]"></div>
                </div>
              </div>

              {/* Main Activities Table */}
              <div className="border-2 border-black mb-4">
                {/* Table Header */}
                <div className="flex border-b-2 border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-sm font-bold text-black text-center">
                    Activities
                  </div>
                  <div className="w-1/2 p-2 text-sm font-bold text-black text-center">
                    YEAR 1
                  </div>
                </div>

                {/* Quarter Headers */}
                <div className="flex border-b-2 border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black"></div>
                  <div className="w-1/2 flex">
                    <div className="flex-1 p-2 border-r border-black text-xs font-bold text-black text-center">Q1</div>
                    <div className="flex-1 p-2 border-r border-black text-xs font-bold text-black text-center">Q2</div>
                    <div className="flex-1 p-2 border-r border-black text-xs font-bold text-black text-center">Q3</div>
                    <div className="flex-1 p-2 text-xs font-bold text-black text-center">Q4</div>
                  </div>
                </div>

                {/* Activity Rows */}
                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-xs text-black">
                    1. Conduct consultation with the client (Head of instruction of the two external campuses, college secretaries, department chairs, and laboratory school principals);
                  </div>
                  <div className="w-1/2 flex">
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 min-h-[40px]"></div>
                  </div>
                </div>

                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-xs text-black">
                    2. Presentation and approval of the research study;
                  </div>
                  <div className="w-1/2 flex">
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 min-h-[40px]"></div>
                  </div>
                </div>

                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-xs text-black">
                    3. Assess the effectiveness of the existing workload computation template;
                  </div>
                  <div className="w-1/2 flex">
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 min-h-[40px]"></div>
                  </div>
                </div>

                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-xs text-black">
                    4. Procurement of equipment and materials;
                  </div>
                  <div className="w-1/2 flex">
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 min-h-[40px]"></div>
                  </div>
                </div>

                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-xs text-black">
                    5. Follow up Interviews and focus group discussions with the head of instruction of the two external campuses, college secretaries, department chairs, and laboratory school principals;
                  </div>
                  <div className="w-1/2 flex">
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 min-h-[40px]"></div>
                  </div>
                </div>

                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-xs text-black">
                    6. Conduct preliminary Investigation and detailed data gathering;
                  </div>
                  <div className="w-1/2 flex">
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 min-h-[40px]"></div>
                  </div>
                </div>

                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-xs text-black">
                    7. Analyze and assess the scope and requirements of the research study;
                  </div>
                  <div className="w-1/2 flex">
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 min-h-[40px]"></div>
                  </div>
                </div>

                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-xs text-black">
                    8. Conduct the System Development Life Cycle;
                  </div>
                  <div className="w-1/2 flex">
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 min-h-[40px]"></div>
                  </div>
                </div>

                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-xs text-black">
                    9. Conduct Training to the head of instruction of the two external campuses, college secretaries, department chairs, and laboratory school principals.
                  </div>
                  <div className="w-1/2 flex">
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 min-h-[40px]"></div>
                  </div>
                </div>

                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-xs text-black">
                    10. Conduct an assessment on the acceptability of the Workload Computation System through survey;
                  </div>
                  <div className="w-1/2 flex">
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 min-h-[40px]"></div>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-1/2 p-2 border-r-2 border-black text-xs text-black">
                    11. Write terminal report, present completed extension project, write, and publish paper.
                  </div>
                  <div className="w-1/2 flex">
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                    <div className="flex-1 p-2 min-h-[40px]"></div>
                  </div>
                </div>
              </div>

              {/* Document Footer */}
              <div className="flex text-xs border border-black">
                <div className="flex-1 p-2 border-r border-black text-center font-bold text-black">
                  <div>DOCUMENT NO.: UEP-URDS-</div>
                  <div>FM-004</div>
                </div>
                <div className="flex-1 p-2 border-r border-black text-center font-bold text-black">REVISION NO.: 00</div>
                <div className="flex-1 p-2 text-center font-bold text-black">
                  <div>EFFECTIVITY</div>
                  <div>SEPTEMBER 12, 2022</div>
                </div>
              </div>
            </div>

            {/* FINANCIAL COMPONENTS OF THE RESEARCH (Budget Summary) Section */}
            <div className="bg-white border border-gray-300 p-8">
              {/* University Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-28 h-28 flex-shrink-0">
                  <img src="/urds/UEP_logo-transparent.png" alt="UEP Seal" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-black mb-1">Republic of the Philippines</p>
                  <h2 className="text-base font-bold text-black mb-1">UNIVERSITY OF EASTERN PHILIPPINES</h2>
                  <p className="text-xs text-black mb-2">University Town, Northern Samar, Philippines</p>
                  <p className="text-xs text-black">
                    Web:{" "}
                    <a href="http://uep.edu.ph" className="text-blue-600 underline">
                      http://uep.edu.ph
                    </a>
                    ; Email:{" "}
                    <a href="mailto:uepnsofficial@gmail.com" className="text-blue-600 underline">
                      uepnsofficial@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Bold Horizontal Line Separator */}
              <div className="h-1 bg-black mb-6"></div>

              {/* Document Title */}
              <h3 className="text-center font-bold text-sm mb-2 text-black">
                UNIVERSITY RESEARCH AND DEVELOPMENT SERVICES
              </h3>

              <h4 className="text-center font-bold text-sm mb-1 text-black">FINANCIAL COMPONENTS OF THE RESEARCH</h4>
              <p className="text-center font-bold text-sm mb-6 text-black">(Budget Summary)</p>

              {/* Project Details Section */}
              <div className="mb-4 space-y-2">
                <div className="flex border border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black font-semibold">
                    Program/Project/Study Title:
                  </div>
                  <div className="flex-1 p-2 min-h-[40px]"></div>
                </div>
                <div className="flex border border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black font-semibold">
                    Program/Project Study Leader:
                  </div>
                  <div className="flex-1 p-2 min-h-[40px]"></div>
                </div>
                <div className="flex border border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black font-semibold">
                    Duration:
                  </div>
                  <div className="flex-1 p-2 min-h-[40px]"></div>
                </div>
                <div className="flex border border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black font-semibold">
                    College/Unit/Campus:
                  </div>
                  <div className="flex-1 p-2 min-h-[40px]">College of Science</div>
                </div>
              </div>

              {/* Budget Summary Table */}
              <div className="border-2 border-black mb-4">
                {/* Table Header */}
                <div className="flex border-b-2 border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-sm font-bold text-black">
                    Items
                  </div>
                  <div className="w-1/6 p-2 border-r-2 border-black text-sm font-bold text-black text-center">
                    Year 1
                  </div>
                  <div className="w-1/6 p-2 border-r-2 border-black text-sm font-bold text-black text-center">
                    Year 2
                  </div>
                  <div className="w-1/6 p-2 text-sm font-bold text-black text-center">
                    TOTAL
                  </div>
                </div>

                {/* I. Personal Services */}
                <div className="flex border-b-2 border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-sm font-bold text-black">
                    I. Personal Services
                  </div>
                  <div className="w-1/6 p-2 border-r-2 border-black"></div>
                  <div className="w-1/6 p-2 border-r-2 border-black"></div>
                  <div className="w-1/6 p-2"></div>
                </div>

                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 pl-6 border-r-2 border-black text-xs text-black">
                    Honorarium
                  </div>
                  <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                  <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                  <div className="w-1/6 p-2 min-h-[40px]"></div>
                </div>

                <div className="flex border-b-2 border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-sm font-bold text-black">
                    Sub-Total
                  </div>
                  <div className="w-1/6 p-2 border-r-2 border-black"></div>
                  <div className="w-1/6 p-2 border-r-2 border-black"></div>
                  <div className="w-1/6 p-2"></div>
                </div>

                {/* II. MOOE */}
                <div className="flex border-b-2 border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-sm font-bold text-black">
                    II. MOOE
                  </div>
                  <div className="w-1/6 p-2 border-r-2 border-black"></div>
                  <div className="w-1/6 p-2 border-r-2 border-black"></div>
                  <div className="w-1/6 p-2"></div>
                </div>

                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 pl-6 border-r-2 border-black text-xs text-black">
                    Travel
                  </div>
                  <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                  <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                  <div className="w-1/6 p-2 min-h-[40px]"></div>
                </div>

                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 pl-6 border-r-2 border-black text-xs text-black">
                    Supplies and Materials
                  </div>
                  <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                  <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                  <div className="w-1/6 p-2 min-h-[40px]"></div>
                </div>

                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 pl-6 border-r-2 border-black text-xs text-black">
                    Communications
                  </div>
                  <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                  <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                  <div className="w-1/6 p-2 min-h-[40px]"></div>
                </div>

                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 pl-6 border-r-2 border-black text-xs text-black">
                    Other MOOE
                  </div>
                  <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                  <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                  <div className="w-1/6 p-2 min-h-[40px]"></div>
                </div>

                <div className="flex border-b border-black">
                  <div className="w-1/2 p-2 pl-6 border-r-2 border-black text-xs text-black">
                    Contingencies (10% of MOOE)
                  </div>
                  <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                  <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                  <div className="w-1/6 p-2 min-h-[40px]"></div>
                </div>

                <div className="flex border-b-2 border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-sm font-bold text-black">
                    Sub-Total
                  </div>
                  <div className="w-1/6 p-2 border-r-2 border-black"></div>
                  <div className="w-1/6 p-2 border-r-2 border-black"></div>
                  <div className="w-1/6 p-2"></div>
                </div>

                {/* III. Equipment Outlay */}
                <div className="flex border-b-2 border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-sm font-bold text-black">
                    III. Equipment Outlay
                  </div>
                  <div className="w-1/6 p-2 border-r-2 border-black"></div>
                  <div className="w-1/6 p-2 border-r-2 border-black"></div>
                  <div className="w-1/6 p-2"></div>
                </div>

                <div className="flex border-b-2 border-black">
                  <div className="w-1/2 p-2 border-r-2 border-black text-sm font-bold text-black">
                    Sub-Total
                  </div>
                  <div className="w-1/6 p-2 border-r-2 border-black"></div>
                  <div className="w-1/6 p-2 border-r-2 border-black"></div>
                  <div className="w-1/6 p-2"></div>
                </div>

                {/* Grand Total */}
                <div className="flex">
                  <div className="w-1/2 p-2 border-r-2 border-black text-sm font-bold text-black">
                    Grand Total
                  </div>
                  <div className="w-1/6 p-2 border-r-2 border-black"></div>
                  <div className="w-1/6 p-2 border-r-2 border-black"></div>
                  <div className="w-1/6 p-2"></div>
                </div>
              </div>

              {/* Signatures and Approvals Section */}
              <div className="mb-4 space-y-6">
                {/* Prepared by */}
                <div>
                  <div className="text-xs font-semibold text-black mb-3">Prepared by:</div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-black underline">EMMANUEL D. SANTOS</div>
                    <div className="text-xs text-black">Proponent</div>
                  </div>
                </div>

                {/* Recommending Approval */}
                <div>
                  <div className="text-xs font-semibold text-black mb-3">Recommending Approval:</div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-bold text-black mb-1">ROGELIO A. BANAGBANAG, DALL</div>
                      <div className="text-xs text-black">Director, URDS</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-black mb-1">KARINA MILAGROS C. LIM, PhD</div>
                      <div className="text-xs text-black">VP for RDE</div>
                    </div>
                  </div>
                </div>

                {/* Reviewed and Approved */}
                <div>
                  <div className="flex justify-between mb-3">
                    <div className="text-xs font-semibold text-black">Reviewed:</div>
                    <div className="text-xs font-semibold text-black">Approved:</div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm font-bold text-black mb-1">FERDINAND S. REYES, CPA</div>
                      <div className="text-xs text-black">Budget Officer</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-black mb-1">CHERRY L ULTRA, PhD</div>
                      <div className="text-xs text-black">President</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Footer */}
              <div className="flex text-xs border border-black">
                <div className="flex-1 p-2 border-r border-black text-center font-bold text-black">
                  <div>DOCUMENT NO.: UEP-URDS-</div>
                  <div>FM-005</div>
                </div>
                <div className="flex-1 p-2 border-r border-black text-center font-bold text-black">REVISION NO.: 00</div>
                <div className="flex-1 p-2 text-center font-bold text-black">
                  <div>EFFECTIVITY</div>
                  <div>SEPTEMBER 12, 2022</div>
                </div>
              </div>
            </div>

            {/* FINANCIAL COMPONENT OF THE RESEARCH (Budgetary Details) Section */}
            <div className="bg-white border border-gray-300 p-8">
              {/* University Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-28 h-28 flex-shrink-0">
                  <img src="/urds/UEP_logo-transparent.png" alt="UEP Seal" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-black mb-1">Republic of the Philippines</p>
                  <h2 className="text-base font-bold text-black mb-1">UNIVERSITY OF EASTERN PHILIPPINES</h2>
                  <p className="text-xs text-black mb-2">University Town, Northern Samar, Philippines</p>
                  <p className="text-xs text-black">
                    Web:{" "}
                    <a href="http://uep.edu.ph" className="text-blue-600 underline">
                      http://uep.edu.ph
                    </a>
                    ; Email:{" "}
                    <a href="mailto:uepnsofficial@gmail.com" className="text-blue-600 underline">
                      uepnsofficial@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Bold Horizontal Line Separator */}
              <div className="h-1 bg-black mb-6"></div>

              {/* Document Title */}
              <h3 className="text-center font-bold text-sm mb-2 text-black">
                UNIVERSITY RESEARCH AND DEVELOPMENT SERVICES
              </h3>

              <h4 className="text-center font-bold text-sm mb-6 text-black">
                FINANCIAL COMPONENT OF THE RESEARCH (Budgetary Details of the Research)
              </h4>

              {/* Project Details Section */}
              <div className="mb-4 space-y-2">
                <div className="flex border border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black font-semibold">
                    Program/Project/Study Title:
                  </div>
                  <div className="flex-1 p-2 min-h-[40px]">Development of an Enhanced Faculty Workload Computation System</div>
                </div>
                <div className="flex border border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black font-semibold">
                    Proponents:
                  </div>
                  <div className="flex-1 p-2 min-h-[40px]">Emmanuel D. Santos</div>
                </div>
                <div className="flex border border-black">
                  <div className="w-1/3 p-2 border-r border-black text-sm text-black font-semibold">
                    Duration:
                  </div>
                  <div className="flex-1 p-2 min-h-[40px]">1 Year</div>
                </div>
              </div>

              {/* Section I. PERSONAL SERVICES */}
              <div className="mb-6">
                <div className="border-2 border-black mb-4">
                  <div className="p-2 font-bold text-sm border-b-2 border-black text-black">
                    Section I. PERSONAL SERVICES
                  </div>
                  
                  {/* Table Header */}
                  <div className="flex border-b-2 border-black">
                    <div className="w-1/4 p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Item
                    </div>
                    <div className="w-3/4 flex">
                      <div className="flex-1 p-2 border-r border-black text-xs font-bold text-black text-center">Q1</div>
                      <div className="flex-1 p-2 border-r border-black text-xs font-bold text-black text-center">Q2</div>
                      <div className="flex-1 p-2 border-r border-black text-xs font-bold text-black text-center">Q3</div>
                      <div className="flex-1 p-2 border-r border-black text-xs font-bold text-black text-center">Q4</div>
                      <div className="flex-1 p-2 border-r border-black text-xs font-bold text-black text-center">Total Year 1</div>
                      <div className="flex-1 p-2 border-r border-black text-xs font-bold text-black text-center">Total Year 2</div>
                      <div className="flex-1 p-2 text-xs font-bold text-black text-center">Total Year 3</div>
                    </div>
                  </div>

                  {/* Wages Row */}
                  <div className="flex border-b border-black">
                    <div className="w-1/4 p-2 border-r-2 border-black text-xs text-black">
                      A. Wages
                    </div>
                    <div className="w-3/4 flex">
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 min-h-[40px]"></div>
                    </div>
                  </div>

                  {/* Honorarium Row */}
                  <div className="flex border-b border-black">
                    <div className="w-1/4 p-2 border-r-2 border-black text-xs text-black">
                      B. Honorarium
                    </div>
                    <div className="w-3/4 flex">
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 min-h-[40px]"></div>
                    </div>
                  </div>

                  {/* Total Row */}
                  <div className="flex">
                    <div className="w-1/4 p-2 border-r-2 border-black text-xs font-bold text-black">
                      Total
                    </div>
                    <div className="w-3/4 flex">
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 min-h-[40px]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section II. MOOE-Travel */}
              <div className="mb-6">
                <div className="border-2 border-black mb-4">
                  <div className="p-2 font-bold text-sm border-b-2 border-black text-black">
                    Section II. MOOE-Travel
                  </div>
                  
                  {/* Table Header */}
                  <div className="flex border-b-2 border-black">
                    <div className="w-1/6 p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Date (Quarter/Month/Year)
                    </div>
                    <div className="w-1/6 p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Places to be Visited
                    </div>
                    <div className="w-1/6 p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Purpose of Travel
                    </div>
                    <div className="w-1/6 p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Mode of Transport
                    </div>
                    <div className="w-1/6 p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Estimated Cost
                    </div>
                    <div className="w-1/6 flex">
                      <div className="flex-1 p-2 border-r border-black text-xs font-bold text-black text-center">Year 1</div>
                      <div className="flex-1 p-2 border-r border-black text-xs font-bold text-black text-center">Year 2</div>
                      <div className="flex-1 p-2 text-xs font-bold text-black text-center">Year 3</div>
                    </div>
                  </div>

                  {/* Travel Rows */}
                  {[1, 2, 3, 4, 5].map((row) => (
                    <div key={row} className="flex border-b border-black">
                      <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                      <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                      <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                      <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                      <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                      <div className="w-1/6 flex">
                        <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                        <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                        <div className="flex-1 p-2 min-h-[40px]"></div>
                      </div>
                    </div>
                  ))}

                  {/* Total Row */}
                  <div className="flex">
                    <div className="w-5/6 p-2 border-r-2 border-black text-xs font-bold text-black">
                      Total
                    </div>
                    <div className="w-1/6 flex">
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 min-h-[40px]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Information Block */}
              <div className="mb-6 text-xs text-black">
                <div className="flex border border-black">
                  <div className="flex-1 p-2 border-r border-black text-center font-bold">
                    DOCUMENT NO.: UEP-URDS-FM-005
                  </div>
                  <div className="flex-1 p-2 border-r border-black text-center font-bold">
                    REVISION NO.: 00
                  </div>
                  <div className="flex-1 p-2 text-center font-bold">
                    EFFECTIVITY: SEPTEMBER 12, 2022
                  </div>
                </div>
              </div>

              {/* Section III. MOOE-Supplies and Materials */}
              <div className="mb-6">
                <div className="border-2 border-black mb-4">
                  <div className="p-2 font-bold text-sm border-b-2 border-black text-black">
                    Section III. MOOE-Supplies and Materials
                  </div>
                  
                  {/* Table Header */}
                  <div className="flex border-b-2 border-black">
                    <div className="w-[8%] p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Date (Quarter/Month/Year)
                    </div>
                    <div className="w-[8%] p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Unit
                    </div>
                    <div className="w-[20%] p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Item Description
                    </div>
                    <div className="w-[15%] p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Purpose
                    </div>
                    <div className="w-[7%] p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Qty
                    </div>
                    <div className="w-[42%] flex">
                      <div className="w-1/4 p-2 border-r border-black text-xs font-bold text-black text-center">Unit cost</div>
                      <div className="w-1/4 p-2 border-r border-black text-xs font-bold text-black text-center">Year 1</div>
                      <div className="w-1/4 p-2 border-r border-black text-xs font-bold text-black text-center">Year 2</div>
                      <div className="w-1/4 p-2 text-xs font-bold text-black text-center">Year 3</div>
                    </div>
                  </div>

                  {/* Supplies Rows */}
                  {[1, 2, 3, 4, 5].map((row) => (
                    <div key={row} className="flex border-b border-black">
                      <div className="w-[8%] p-2 border-r-2 border-black min-h-[40px]"></div>
                      <div className="w-[8%] p-2 border-r-2 border-black min-h-[40px]"></div>
                      <div className="w-[20%] p-2 border-r-2 border-black min-h-[40px]"></div>
                      <div className="w-[15%] p-2 border-r-2 border-black min-h-[40px]"></div>
                      <div className="w-[7%] p-2 border-r-2 border-black min-h-[40px]"></div>
                      <div className="w-[42%] flex">
                        <div className="w-1/4 p-2 border-r border-black min-h-[40px]"></div>
                        <div className="w-1/4 p-2 border-r border-black min-h-[40px]"></div>
                        <div className="w-1/4 p-2 border-r border-black min-h-[40px]"></div>
                        <div className="w-1/4 p-2 min-h-[40px]"></div>
                      </div>
                    </div>
                  ))}

                  {/* Total Row */}
                  <div className="flex">
                    <div className="w-[58%] p-2 border-r-2 border-black text-xs font-bold text-black">
                      Total
                    </div>
                    <div className="w-[42%] flex">
                      <div className="w-1/4 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="w-1/4 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="w-1/4 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="w-1/4 p-2 min-h-[40px]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section IV. MOOE-Communications */}
              <div className="mb-6">
                <div className="border-2 border-black mb-4">
                  <div className="p-2 font-bold text-sm border-b-2 border-black text-black">
                    Section IV. MOOE-Communications
                  </div>
                  
                  {/* Table Header */}
                  <div className="flex border-b-2 border-black">
                    <div className="w-1/6 p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Date (Quarter/Month/Year)
                    </div>
                    <div className="w-1/6 p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Nature of Communication
                    </div>
                    <div className="w-1/6 p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Purpose
                    </div>
                    <div className="w-1/6 p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Qty
                    </div>
                    <div className="w-1/6 p-2 border-r-2 border-black text-xs font-bold text-black text-center">
                      Estimated Cost
                    </div>
                    <div className="w-1/6 flex">
                      <div className="flex-1 p-2 border-r border-black text-xs font-bold text-black text-center">Year 1</div>
                      <div className="flex-1 p-2 border-r border-black text-xs font-bold text-black text-center">Year 2</div>
                      <div className="flex-1 p-2 text-xs font-bold text-black text-center">Year 3</div>
                    </div>
                  </div>

                  {/* Communications Rows */}
                  {[1, 2, 3, 4, 5].map((row) => (
                    <div key={row} className="flex border-b border-black">
                      <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                      <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                      <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                      <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                      <div className="w-1/6 p-2 border-r-2 border-black min-h-[40px]"></div>
                      <div className="w-1/6 flex">
                        <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                        <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                        <div className="flex-1 p-2 min-h-[40px]"></div>
                      </div>
                    </div>
                  ))}

                  {/* Total Row */}
                  <div className="flex">
                    <div className="w-5/6 p-2 border-r-2 border-black text-xs font-bold text-black">
                      Total
                    </div>
                    <div className="w-1/6 flex">
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 border-r border-black min-h-[40px]"></div>
                      <div className="flex-1 p-2 min-h-[40px]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Footer */}
              <div className="flex text-xs border border-black">
                <div className="flex-1 p-2 border-r border-black text-center font-bold text-black">
                  <div>DOCUMENT NO.: UEP-URDS-</div>
                  <div>FM-005</div>
                </div>
                <div className="flex-1 p-2 border-r border-black text-center font-bold text-black">REVISION NO.: 00</div>
                <div className="flex-1 p-2 text-center font-bold text-black">
                  <div>EFFECTIVITY</div>
                  <div>SEPTEMBER 12, 2022</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

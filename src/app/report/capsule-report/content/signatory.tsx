// "use client";

// import { HorizontalRule } from "@mui/icons-material";
// import { useRef } from "react";

// // Define the printable page styles
// const styles: { [key: string]: React.CSSProperties } = {
//   printable: {
//     padding: "4px",
//     backgroundColor: "white",
//     margin: "0 auto", // Center horizontally on screen
//     width: "210mm", // A4 width
//     minHeight: "297mm", // A4 height
//     boxSizing: "border-box", // Include padding in width/height
//     borderRadius: "0", // Remove rounded corners
//     position: "relative", // Needed for footer positioning
//   },
// };

// // Define print-specific styles
// const printStyles = `
//   @media print {
//     body {
//       margin: 0;
//       padding: 0;
//       font-size: 12pt;
//       width: 210mm;
//       height: 297mm;
//       background: white;
//       overflow: hidden;
//     }

//     .printable {
//       border: none;
//       margin: 0 !important;
//       width: 100%;
//       max-width: 100%;
//       box-sizing: border-box;
//       page-break-inside: avoid;
//     }

//     .noPrint {
//       display: none;
//     }

//     /* Page Break Control */
//     .page-break {
//       page-break-before: always; /* Force page break before this element */
//     }

//     .footer {
//       position: absolute;
//       bottom: 0;
//       width: 100%;
//       border-top: 1px solid #1e3a8a;
//       font-size: 0.875rem;
//       padding: 10px 0;
//       background-color: white;
//       text-align: center;
//     }

//     /* Ensure content does not break across pages */
//     .content-container {
//       page-break-before: auto;
//       page-break-after: auto;
//     }

//     /* Ensure tables break between pages if necessary */
//     .table-container {
//       page-break-inside: auto; /* Allow table content to break across pages */
//     }

//     .table-container table {
//       page-break-inside: auto;
//     }

//     @page {
//       size: A4; /* Specify A4 paper size */
//        margin-top: 20mm;
//     }

//     .report-footer {
//       position: fixed;
//       background: white;
//     }

//     .report-footer {
//       bottom: 0;
//       width: 85%;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//   }
// `;

// const PrintStyleSheet: React.FC = () => (
//   <style dangerouslySetInnerHTML={{ __html: printStyles }} />
// );

// const SignatorySection: React.FC = () => {
//   const contentRef = useRef<HTMLDivElement>(null);

//   return (
//     <>
//       <div>
//         {/* Main Content */}
//         <div className="flex flex-col mt-5">
//           <div>
//             <p className="text-black font-bold text-[16px] w-[100%] mb-5">
//               Prepared by:
//             </p>
//             <div className="flex flex-col items-center justify-center">
//               <p className="text-black font-bold text-[16px] w-[100%] capitalize underline">
//                 EMMANUAL D. SANTOS, PhD
//               </p>
//               <p>Proponent</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignatorySection;

import React from "react";

interface SignatorySectionProps {
  proponentName: string;
  researchCoordinatorName: string;
  collegeDeanName: string;
  recommendingApprovalName: string;
  approvalName: string;
}

const SignatorySection: React.FC<SignatorySectionProps> = ({
  proponentName,
  researchCoordinatorName,
  collegeDeanName,
  recommendingApprovalName,
  approvalName,
}) => {
  return (
    <div className="mt-10 max-w-4xl mx-auto">
      {/* First Row */}
      <div className="flex gap-5 mb-12">
        {/* Prepared By */}
        <div className="flex flex-col items-start w-[250px] ">
          <p className="font-bold text-lg mb-2">Prepared by:</p>
          <div className="text-center">
            <p className="font-bold underline text-center uppercase">{proponentName}</p>
            <p className="text-center mt-1">Proponent</p>
          </div>
        </div>

        {/* Endorsed By */}
        <div className="flex flex-col items-start">
          <p className="font-bold text-lg mb-2">Endorsed by:</p>
          <div className="flex gap-5">
            <div>
              <p className="font-bold underline text-center uppercase">
                {researchCoordinatorName}
              </p>
              <p className="text-center">College Research Coordinator</p>
            </div>
            <div>
              <p className="font-bold underline text-center uppercase">
                {collegeDeanName}
              </p>
              <p className="text-center">College Dean</p>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="flex justify-between mt-8">
        {/* Recommending Approval Section */}
        <div className="flex flex-col w-[62%]">
          {/* Label row */}
          <p className="font-bold mb-2 text-left">Recommending Approval:</p>

          {/* Names row */}
          <div className="flex justify-between">
            <div className="flex flex-col items-left w-[300px]">
              <p className="font-bold underline uppercase">{recommendingApprovalName}</p>
              <p className="mt-[-2px]">Director, URDS</p>
            </div>
            <div className="flex flex-col items-left w-[300px]">
              <p className="font-bold underline uppercase">{recommendingApprovalName}</p>
              <p className="mt-[-2px]">VP for RDE</p>
            </div>
          </div>
        </div>

        {/* Approval Section */}
        <div className="flex flex-col items-start w-1/3">
          <p className="font-bold mb-2">Approval:</p>
          <p className="font-bold underline text-left">{approvalName}</p>
          <p>President</p>
        </div>
      </div>
    </div>
  );
};

export default SignatorySection;

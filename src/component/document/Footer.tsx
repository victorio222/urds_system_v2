// "use client";

// import { useRef } from "react";
// import DocumentHead from "@/component/document/Header";

// // Print-specific styles
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
//       padding: 4px;
//       background: white;
//       margin: 0 auto;
//       width: 210mm;
//       min-height: 297mm;
//       box-sizing: border-box;
//       page-break-inside: avoid;
//     }

//     .noPrint { display: none; }

//     .page-break { page-break-before: always; }

//     .footer {
//       position: absolute;
//       bottom: 0;
//       width: 100%;
//       border-top: 1px solid #1e3a8a;
//       font-size: 0.875rem;
//       padding: 10px 0;
//       text-align: center;
//       background: white;
//     }

//     .table-container { page-break-inside: auto; }
//     .table-container table { page-break-inside: auto; }

//     @page { size: A4; margin-top: 20mm; }
//   }
// `;

// export const PrintStyleSheet: React.FC = () => (
//   <style dangerouslySetInnerHTML={{ __html: printStyles }} />
// );

// const DocumentFooter: React.FC = () => {
//   const contentRef = useRef<HTMLDivElement>(null);

//   return (
//     <div>
//       {/* Footer */}
//       <div className="report-footer w-full flex justify-between border border-blue-950 font-medium mt-2 text-sm max-w-6xl mx-auto text-black leading-4">
//         <div className="text-center w-full p-1">
//           <p>DOCUMENT NO.</p>
//           <p className="font-bold">UEP-HRMO-FM-047</p>
//         </div>
//         <div className="border-l border-blue-950 text-center w-full p-1">
//           <p>REVISION NO.</p>
//           <p className="font-bold">00</p>
//         </div>
//         <div className="border-l border-blue-950 text-center w-full p-1">
//           <p>EFFECTIVITY DATE:</p>
//           <p className="font-bold">SEPTEMBER 12, 2022</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DocumentFooter;











'use client';

import React, { useRef } from "react";

// Print-specific styles
export const PrintStyleSheet: React.FC = () => {
  const printStyles = `
    @media print {
      body {
        margin: 0;
        padding: 0;
        font-size: 12pt;
        width: 210mm;
        height: 297mm;
        background: white;
        overflow: hidden;
      }

      .printable {
        padding: 4px;
        background: white;
        margin: 0 auto;
        width: 210mm;
        min-height: 297mm;
        box-sizing: border-box;
        page-break-inside: avoid;
      }

      .noPrint { display: none; }

      .page-break { page-break-before: always; }

      .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #1e3a8a;
        font-size: 0.875rem;
        padding: 10px 0;
        text-align: center;
        background: white;
      }

      .table-container { page-break-inside: auto; }
      .table-container table { page-break-inside: auto; }

      @page { size: A4; margin-top: 20mm; }
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: printStyles }} />;
};

// Props for the footer
interface DocumentFooterProps {
  documentNo: string;
  revisionNo: string;
  effectivityDate: string;
  className?: string; // Optional additional styling
}

const DocumentFooter: React.FC<DocumentFooterProps> = ({
  documentNo,
  revisionNo,
  effectivityDate,
  className = "",
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={contentRef} className={`report-footer w-full flex justify-between border border-blue-950 font-medium mt-2 text-sm max-w-6xl mx-auto text-black leading-4 ${className}`}>
      <div className="text-center w-full p-1">
        <p>DOCUMENT NO.:</p>
        <p className="font-bold">{documentNo}</p>
      </div>
      <div className="border-l border-blue-950 text-center w-full p-1">
        <p>REVISION NO.:</p>
        <p className="font-bold">{revisionNo}</p>
      </div>
      <div className="border-l border-blue-950 text-center w-full p-1">
        <p>EFFECTIVITY DATE:</p>
        <p className="font-bold">{effectivityDate}</p>
      </div>
    </div>
  );
};

export default DocumentFooter;

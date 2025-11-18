"use client";

import { HorizontalRule } from "@mui/icons-material";
import { useRef } from "react";
import SignatorySection from "./signatory";

// Define the printable page styles
const styles: { [key: string]: React.CSSProperties } = {
  printable: {
    padding: "4px",
    backgroundColor: "white",
    margin: "0 auto", // Center horizontally on screen
    width: "210mm", // A4 width
    minHeight: "297mm", // A4 height
    boxSizing: "border-box", // Include padding in width/height
    borderRadius: "0", // Remove rounded corners
    position: "relative", // Needed for footer positioning
  },
};

// Define print-specific styles
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
      border: none;
      margin: 0 !important;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      page-break-inside: avoid;
    }

    .noPrint {
      display: none;
    }

    /* Page Break Control */
    .page-break {
      page-break-before: always; /* Force page break before this element */
    }

    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      border-top: 1px solid #1e3a8a;
      font-size: 0.875rem;
      padding: 10px 0;
      background-color: white;
      text-align: center;
    }

    /* Ensure content does not break across pages */
    .content-container {
      page-break-before: auto;
      page-break-after: auto;
    }

    /* Ensure tables break between pages if necessary */
    .table-container {
      page-break-inside: auto; /* Allow table content to break across pages */
    }

    .table-container table {
      page-break-inside: auto;
    }

    @page {
      size: A4; /* Specify A4 paper size */
       margin-top: 20mm;
    }

    .report-footer {
      position: fixed;
      background: white;
    }

    .report-footer {
      bottom: 0;
      width: 85%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const PrintStyleSheet: React.FC = () => (
  <style dangerouslySetInnerHTML={{ __html: printStyles }} />
);

const MainContent: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div>
        {/* Main Content */}
        <div className="flex flex-col my-5">
          <div>
            <h1 className="text-center text-black font-bold text-[16px] w-[100%]">
              UNIVERSITY RESEARCH AND DEVELOPMENT SERVICES
            </h1>
            <p className="text-center font-semibold mt-[-7px] mb-5">
              Office of the Director for Research
            </p>
            <h2 className="text-center text-black font-bold text-[16px] w-[100%]">
              2025 AGENCY IN-HOUSE REVIEW EVALUATION FORM <br /> FOR NEW
              PROPOSALS
            </h2>
          </div>
          <div>
            <p>
              Venue: <span className="underline">RDE Hall</span>
            </p>
            <p>Agency: University of Eastern Philippines</p>
            <h3 className="font-bold uppercase underline mt-3">
              Natural Science
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="border-collapse border border-black w-full max-w-4xl mx-auto text-sm table-fixed">
            <thead>
              <tr>
                <th className="uppercase border border-black px-2 py-1 font-bold text-center w-1/5 break-words whitespace-normal overflow-hidden">
                  DEVELOPMENT ZONE/SECTOR/COMMODITY
                </th>
                <th className="uppercase border border-black px-2 py-1 font-bold text-center w-1/5 break-words whitespace-normal overflow-hidden">
                  PROJECT TITLE/RESEARCHER/DURATION
                </th>
                <th className="uppercase border border-black px-2 py-1 font-bold text-center break-words whitespace-normal overflow-hidden">
                  RECOMMENDATIONS/REMARKS
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="h-40">
                <td className="border border-black px-2 py-1 w-1/5 break-words whitespace-normal overflow-hidden"></td>
                <td className="border border-black px-2 py-1 w-1/5 break-words whitespace-normal overflow-hidden"></td>
                <td className="border border-black px-2 py-1 break-words whitespace-normal overflow-hidden"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <SignatorySection
          directorName="ROGELIO A. BANAGBANAG, DALL"
        />
      </div>
    </>
  );
};

export default MainContent;

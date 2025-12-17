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
        <div className="flex flex-col mt-5">
          <div>
            <h1 className="text-center text-black font-bold text-[16px] w-[100%] mb-5">
              UNIVERSITY RESEARCH AND DEVELOPMENT SERVICES
            </h1>
            <h2 className="uppercase text-center text-black font-bold text-[16px] w-[100%]">
              FINANCIAL COMPONENTS OF THE RESEARCH
            </h2>
            <h3 className="text-center text-black font-bold text-[15px] w-[100%]">
              (Budget Summary)
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="border-collapse border border-black w-full max-w-4xl mx-auto text-sm">
            <tbody className="leading-[17px]">
              <tr>
                <td className="border border-black px-2 py-1 w-1/3">
                  Program/Project/Study Title:{" "}
                </td>
                <td colSpan={4} className="border border-black px-2 py-1"></td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1 w-1/3">
                  Program/Project Study Leader:{" "}
                </td>
                <td colSpan={4} className="border border-black px-2 py-1"></td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1 w-1/3">
                  College/Unit/Campus:{" "}
                </td>
                <td colSpan={4} className="border border-black px-2 py-1"></td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1 w-1/3 font-bold">
                  Item
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center">
                  Year 1
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center">
                  Year 2
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center">
                  Total
                </td>
              </tr>

              <tr>
                <td className="border border-black font-bold px-2 py-1 w-1/3">
                  I. Personal Services 
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1 w-1/3">
                  Honorarium
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
              </tr>

              <tr>
                <td className="border border-black font-bold px-2 py-1 w-1/3">
                  Sub-Total 
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
              </tr>

              <tr>
                <td className="border border-black font-bold px-2 py-1 w-1/3">
                  II. MOOE
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1 w-1/3">
                  Travel
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1 w-1/3">
                  Supplies and Materials 
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1 w-1/3">
                  Communications
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1 w-1/3">
                  Other MOOE 
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1 w-1/3">
                  Contingencies (10% of MOOE) 
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
              </tr>

              <tr>
                <td className="border border-black font-bold px-2 py-1 w-1/3">
                  Sub-Total 
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
              </tr>

              <tr>
                <td className="border border-black font-bold px-2 py-1 w-1/3">
                  III. Equipment Outlay  
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
              </tr>

              <tr>
                <td className="border border-black font-bold px-2 py-1 w-1/3">
                  Sub-Total 
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
              </tr>

              <tr>
                <td className="border border-black font-bold px-2 py-1 w-1/3">
                  Grand Total 
                </td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
                <td className="border border-black font-bold px-2 py-1 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <SignatorySection
          proponentName="EMMANUEL D. SANTOS"
          researchCoordinatorName="Franklin E. Cortez"
          collegeDeanName="Anelita M. Obrar, PhD"
          recommendingApprovalName="Recommender"
          approvalName="Cherry I. Ultra"
        />
      </div>
    </>
  );
};

export default MainContent;

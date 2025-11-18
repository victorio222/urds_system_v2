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
            <h2 className="text-center text-black font-bold text-[16px] w-[100%]">
              CAPSULE RESEARCH PROPOSAL TEMPLATE
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="border-collapse border border-black w-full max-w-4xl mx-auto text-sm">
            <thead>
              <tr>
                <th
                  colSpan={2}
                  className="border border-black px-2 py-1 font-semibold text-left"
                >
                  Detailed Research Proposal
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td
                  colSpan={2}
                  className="border border-black px-2 py-1 font-semibold"
                  style={{ fontWeight: "bold" }}
                >
                  <span className="pr-5">I.</span> <u>Basic Information</u>
                </td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1 w-1/3">Title</td>
                <td className="border border-black px-2 py-1"></td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1">
                  Nature of Research <br />
                  (Please check one)
                </td>
                <td className="border border-black px-2 py-1"></td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1">
                  Leader/ Main Proponent
                </td>
                <td className="border border-black px-2 py-1"></td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1">
                  Other Personnel Involved
                </td>
                <td className="border border-black px-2 py-1"></td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1">
                  Project Location/s
                </td>
                <td className="border border-black px-2 py-1"></td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1">Duration</td>
                <td className="border border-black px-2 py-1"></td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1">
                  Budget for the Year
                </td>
                <td className="border border-black px-2 py-1"></td>
              </tr>

              <tr>
                <td
                  colSpan={2}
                  className="border border-black px-2 py-1 font-semibold"
                  style={{ fontWeight: "bold" }}
                >
                  <span className="pr-5">II.</span> <u>Technical Information</u>
                </td>
              </tr>

              <tr>
                <td
                  className="border border-black px-2 py-1 align-top"
                  style={{ width: "30%" }}
                >
                  Rationale/Significance of Research
                </td>
                <td
                  className="border border-black px-2 py-1"
                  style={{ height: "150px" }}
                >
                  {/* Large empty cell for detailed info */}
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black px-2 py-1 align-top"
                  style={{ width: "30%" }}
                >
                  Objectives
                </td>
                <td
                  className="border border-black px-2 py-1"
                  style={{ height: "150px" }}
                >
                  {/* Large empty cell for detailed info */}
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black px-2 py-1 font-semibold align-top"
                  style={{ fontWeight: "bold", width: "30%" }}
                >
                  <span>III.</span> <u>Review of Literature</u>
                </td>
                <td
                  className="border border-black px-2 py-1"
                  style={{ height: "150px" }}
                >
                  {/* Large empty cell for detailed info */}
                </td>
              </tr>
              <tr>
                <td
                  className="border border-black px-2 py-1 font-semibold align-top"
                  style={{ fontWeight: "bold", width: "30%" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <div style={{ minWidth: "12px" }}>IV.</div>
                    <div>
                      <u>
                        Detailed Methodology <br />
                        <span
                          style={{ paddingLeft: "0.1rem", display: "block" }}
                        >
                          (Including questionnaires for social science research)
                        </span>
                      </u>
                    </div>
                  </div>
                </td>
                <td
                  className="border border-black px-2 py-1"
                  style={{ height: "150px" }}
                >
                  {/* Large empty cell for detailed info */}
                </td>
              </tr>

              <tr>
                <td
                  className="border border-black px-2 py-1 font-semibold align-top"
                  style={{ fontWeight: "bold", width: "30%" }}
                >
                  <span>V.</span> <u>Work plan</u>
                </td>
                <td
                  className="border border-black px-2 py-1"
                  style={{ height: "150px" }}
                >
                  {/* Large empty cell for detailed info */}
                </td>
              </tr>

              <tr>
                <td
                  className="border border-black px-2 py-1 font-semibold align-top"
                  style={{ fontWeight: "bold", width: "30%" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                    }}
                  >
                    <div style={{ minWidth: "7px" }}>VI.</div>
                    <div>
                      <u>Detailed Budgetary Requirement</u>
                    </div>
                  </div>
                </td>
                <td
                  className="border border-black px-2 py-1"
                  style={{ height: "150px" }}
                >
                  {/* Large empty cell for detailed info */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <SignatorySection
          proponentName="EMMANUAL D. SANTOS"
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

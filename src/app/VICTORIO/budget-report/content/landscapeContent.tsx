"use client";

import { useRef } from "react";
import SignatorySection from "./signatory";

const printStyles = `
  @media print {
    body {
      margin: 0;
      padding: 0;
      font-size: 12pt;
      background: white;
      overflow: hidden;
    }

    .page {
      width: 297mm;  /* Landscape width */
      height: 210mm; /* Landscape height */
      margin: 0 auto;
      box-sizing: border-box;
      page-break-after: always;
    }

    .printable {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    table, th, td {
      border: 1px solid black;
    }

    th, td {
      padding: 4px;
      text-align: left;
    }

    .text-center {
      text-align: center;
    }
  }
`;

const PrintStyleSheet: React.FC = () => (
  <style dangerouslySetInnerHTML={{ __html: printStyles }} />
);

const LandscapeContent: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <PrintStyleSheet />

      {/* Full content in landscape */}
      <div className="page border">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="font-bold text-[16px]">UNIVERSITY RESEARCH AND DEVELOPMENT SERVICES</h1>
          <h2 className="uppercase font-bold text-[16px]">WORKPLAN</h2>
        </div>

        {/* Workplan Table */}
        <div className="overflow-x-auto mb-10">
          <table>
            <tbody>
              <tr>
                <td>Program/Project/Study Title:</td>
                <td colSpan={4}></td>
              </tr>
              <tr>
                <td>Program/Project Study Leader:</td>
                <td colSpan={4}></td>
              </tr>
              <tr>
                <td>College/Unit/Campus:</td>
                <td colSpan={4}></td>
              </tr>
              <tr>
                <td className="font-bold">Item</td>
                <td className="text-center font-bold">Year 1</td>
                <td className="text-center font-bold">Year 2</td>
                <td className="text-center font-bold">Total</td>
              </tr>
              {/* Other rows remain as in your original code */}
            </tbody>
          </table>
        </div>

        {/* Signatory Section */}
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

export default LandscapeContent;

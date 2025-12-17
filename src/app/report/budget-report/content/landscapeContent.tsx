"use client";

import { useRef } from "react";
import SignatorySection from "./signatory";

const printStyles = `
  @media print {

    @page {
      size: A4 landscape;
      margin: 0;
    }

    body {
      margin: 0;
      padding: 0;
      font-size: 12pt;
      background: white;
      overflow: hidden;
    }

    .page {
      width: 297mm;  /* Landscape width */
      margin: 0 auto;
      box-sizing: border-box;
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
      <div className="page printable mx-auto">
        {/* Header */}
        <div className="text-center mb-5 mt-10">
          <h1 className="uppercase font-bold text-[16px]">Financial Components of the Research</h1>
          <h2 className="font-bold text-[15px]">(Budgetary Details of the Research)</h2>
        </div>

        {/* Workplan Table */}
        <div className="overflow-x-auto mb-7">
          <table className="">
            <tbody >
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
              </tbody>
          </table>
        </div>

        <div className="mb-2">
          <h2 className="font-bold text-[15px] ">I. PERSONAL SERVICES</h2>
        </div>

        <div className="mb-5">
          <table className="border-collapse border border-black w-full max-w-5xl mx-auto text-sm">
            <thead>
              <tr>
                <th rowSpan={2} className="border border-black px-2 py-1">Item</th>
                <th colSpan={4} className="border border-black px-2 py-1 text-center">Year</th>
                <th colSpan={3} className="border border-black px-2 py-1 text-center">Total</th>
              </tr>
              <tr>
                {/* Year 1 Quarters */}
                <th className="border border-black px-2 py-1 text-center">Q1</th>
                <th className="border border-black px-2 py-1 text-center">Q2</th>
                <th className="border border-black px-2 py-1 text-center">Q3</th>
                <th className="border border-black px-2 py-1 text-center">Q4</th>

                {/* Total by Year */}
                <th className="border border-black px-2 py-1 text-center">Year 1</th>
                <th className="border border-black px-2 py-1 text-center">Year 2</th>
                <th className="border border-black px-2 py-1 text-center">Year 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold border-x border-black px-2 py-5 text-center">A. Wages</td>
                <td className="border-x border-black px-2 py-5 text-center"></td>
                <td className="border-x border-black px-2 py-5 text-center"></td>
                <td className="border-x border-black px-2 py-5 text-center"></td>
                <td className="border-x border-black px-2 py-5 text-center"></td>
                <td className="border-x border-black px-2 py-5 text-center"></td>
                <td className="border-x border-black px-2 py-5 text-center"></td>
                <td className="border-x border-black px-2 py-5 text-center"></td>
              </tr>
              <tr>
                <td className="border-x border-black font-bold px-2 py-5 text-center">B. Honorarium</td>
                <td className="border-x border-black px-2 py-5 text-center"></td>
                <td className="border-x border-black px-2 py-5 text-center"></td>
                <td className="border-x border-black px-2 py-5 text-center"></td>
                <td className="border-x border-black px-2 py-5 text-center"></td>
                <td className="border-x border-black px-2 py-5 text-center"></td>
                <td className="border-x border-black px-2 py-5 text-center"></td>
                <td className="border-x border-black px-2 py-5 text-center"></td>
              </tr>  
              
              <tr>
                <td className="font-bold border border-black px-2 py-1 text-center">Total</td>
                <td className=" border border-black px-2 py-1 text-center"></td>
                <td className=" border border-black px-2 py-1 text-center"></td>
                <td className=" border border-black px-2 py-1 text-center"></td>
                <td className=" border border-black px-2 py-1 text-center"></td>
                <td className=" border border-black px-2 py-1 text-center"></td>
                <td className=" border border-black px-2 py-1 text-center"></td>
                <td className=" border border-black px-2 py-1 text-center"></td>
              </tr>            
            </tbody>
          </table>  
        </div>

        <div className="mb-2">
          <h2 className="font-bold text-[15px] ">II. MOOE-Travel</h2>
        </div>

        <div>
          <table className="border-collapse border border-black w-full max-w-5xl mx-auto text-sm">
            <thead>
              <tr>
                <th rowSpan={2} className="border border-black px-2 py-1">Date <br /> (Quarter/Month/Year)</th>
                <th rowSpan={2} className="border border-black px-2 py-1">Places to be Visited</th>
                <th rowSpan={2} className="border border-black px-2 py-1">Purpose of Travel</th>
                <th rowSpan={2} className="border border-black px-2 py-1">Mode of Transport</th>
                <th rowSpan={2} className="border border-black px-2 py-1">Estimated Cost</th>
                <th colSpan={3} className="border border-black px-2 py-1 text-center">Total</th>
              </tr>
              <tr>
                {/* Total by Year */}
                <th className="border border-black px-2 py-1 text-center">Year 1</th>
                <th className="border border-black px-2 py-1 text-center">Year 2</th>
                <th className="border border-black px-2 py-1 text-center">Year 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className=" border border-black px-2 py-1 text-center"><br /><br /><br /></td>
                <td className=" border border-black px-2 py-1 text-center"></td>
                <td className=" border border-black px-2 py-1 text-center"></td>
                <td className=" border border-black px-2 py-1 text-center"></td>
                <td className=" border border-black px-2 py-1 text-center"></td>
                <td className=" border border-black px-2 py-1 text-center"></td>
                <td className=" border border-black px-2 py-1 text-center"></td>
                <td className=" border border-black px-2 py-1 text-center"></td>
              </tr>
              <tr>
                <td colSpan={5} className="font-bold border border-black px-2 py-1 text-center">Total</td>
                <td className=" border border-black px-2 py-1 text-center"></td>
                <td className=" border border-black px-2 py-1 text-center"></td>
                <td className=" border border-black px-2 py-1 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LandscapeContent;

"use client";

import { useRef } from "react";

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

const ThirdPage: React.FC = () => {

  return (
    <>
      <PrintStyleSheet />

      {/* Full content in landscape */}
      <div className="page printable mx-auto">

        <div className="mb-2">
          <h2 className="font-bold text-[15px] ">II. MOOE-Supplies and Materials</h2>
        </div>

        <div className="mb-5">
          <table className="border-collapse border border-black w-full max-w-5xl mx-auto text-sm">
            <thead>
              <tr>
                <th rowSpan={2} className="border border-black px-2 py-1">Date<br />(Quarter/Month/Year)</th>
                <th rowSpan={2} className="border border-black px-2 py-1">Unit</th>
                <th rowSpan={2} className="border border-black px-2 py-1">Item Description</th>
                <th rowSpan={2} className="border border-black px-2 py-1">Purpose</th>
                <th rowSpan={2} className="border border-black px-2 py-1">Quantity</th>
                <th rowSpan={2} className="border border-black px-2 py-1">Unit Cost</th>
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
                    <td className=" border border-black px-2 py-1 text-center">
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    </td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                </tr>
                <tr>
                    <td colSpan={6} className="font-bold border border-black px-2 py-1 text-center ">Total</td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                </tr>
            </tbody>
          </table>  
        </div>

        <div className="mb-2">
          <h2 className="font-bold text-[15px] ">II. MOOE-Communications</h2>
        </div>

        <div className="mb-10">
          <table className="border-collapse border border-black w-full max-w-5xl mx-auto text-sm">
            <thead>
              <tr>
                <th rowSpan={2} className="border border-black px-2 py-1">Date <br />(Quarter/Month/Year)</th>
                <th rowSpan={2} className="border border-black px-2 py-1">Nature of Communication</th>
                <th rowSpan={2} className="border border-black px-2 py-1">Purpose</th>
                <th rowSpan={2} className="border border-black px-2 py-1">Quantity</th>
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
                    <td className=" border border-black px-2 py-1 text-center">
                        <br /><br /><br />
                    </td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                    <td className=" border border-black px-2 py-1 text-center"></td>
                </tr>
                <tr>
                    <td colSpan={5} className="font-bold border border-black px-2 py-1 text-center ">Total</td>

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

export default ThirdPage;

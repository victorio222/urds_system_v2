"use client";

import { HorizontalRule } from "@mui/icons-material";
import { useRef } from "react";

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
            <h1 className="text-center text-black font-bold text-[16px] w-[100%] mb-5">
              UNIVERSITY RESEARCH AND DEVELOPMENT SERVICES
            </h1>
            <h2 className="text-center text-black font-bold text-[16px] w-[100%]">
              CAPSULE RESEARCH PROPOSAL TEMPLATE
            </h2>
            <div className="mt-3">
              <h2>KNOW ALL PERSONS BY THESE PRESENTS:</h2>
              <p className="indent-12">
                This contract is made and entered by and between:
              </p>
              <p className="indent-12 text-justify">
                THE <strong>UNIVERSITY OF EASTERN PHILIPPINES</strong>, a State
                University with office and main campus address at University
                Town, Northern Samar, represented herein by{" "}
                <strong>
                  DR.<span> </span>
                  <span className="w-[200px] border border-b-1 border-black border-t-0 border-r-0 border-l-0 uppercase">
                    Cherry I. Ultra
                  </span>
                </strong>
                , of legal age, Filipino, married and resident of UEP, Catarman,
                Northern Samar, hereinafter referred to as the{" "}
                <strong>"First Party"</strong>
              </p>
              <p className="flex justify-center ml-7">and</p>
              <p className="indent-12 text-justify">
                I,{" "}
                <strong>
                  <span className="w-[200px] border border-b-1 border-black border-t-0 border-r-0 border-l-0 uppercase">
                    Person Name
                  </span>
                </strong>
                , of legal age, Filipino, single/married, and resident of{" "}
                <span className="w-[200px] border border-b-1 border-black border-t-0 border-r-0 border-l-0 text-[16px] text-black font-bold">
                  UEP, Catarman, Northern Samar
                </span>
                , hereinafter referred to as the <strong>"Second Party"</strong>
              </p>
            </div>
            <div className="flex justify-center mt-2">
              <div>
                <h1 className="text-[18px] text-black">
                  <HorizontalRule /> WITNESSETH <HorizontalRule />
                </h1>
              </div>
            </div>
          </div>

          <div>
            <ol className="list-decimal text-justify ml-10">
              <li>
                That the First Party is in need of the emergency services of a
                Part-time Lecturer who shall perform teaching job;
              </li>
              <li>
                That the Second Party has signified his/her intention to be
                hired for that emergency teaching needs of the First Party;
              </li>
              <li>
                That the Second Party, possessing the education, experience, and
                skills required to perform the job as described herein, is
                hereby accepted to perform the emergency teaching work for this
                semester;
              </li>
              <li>
                That the Second Party hereby attests that he/she has not been
                previously dismissed from government service by reason of an
                administrative offense or by any form of malfeasance;
              </li>
              <li>
                That in consideration hereof, the Second Party is hereby
                contracted as Part-time Lecturer for the period covering{" "}
                <span className="w-[200px] border border-b-1 border-black border-t-0 border-r-0 border-l-0">
                  <strong>First</strong>
                </span>{" "}
                <strong>
                  Semester, School Year 20
                  <span className="w-[200px] border border-b-1 border-black border-t-0 border-r-0 border-l-0">
                    24
                  </span>
                  -20
                  <span className="w-[200px] border border-b-1 border-black border-t-0 border-r-0 border-l-0">
                    25
                  </span>
                </strong>{" "}
                in consideration of P
                <span className="w-[200px] border border-b-1 border-black border-t-0 border-r-0 border-l-0">
                  400
                </span>{" "}
                to be paid per hour and P
                <span className="w-[200px] border border-b-1 border-black border-t-0 border-r-0 border-l-0">
                  200
                </span>{" "}
                for every hour rendered in the laboratory period, if applicable;
              </li>
              <li>
                That as Part-time Lecturer, the Second Party is to teach the
                following subject and perform related academic work:
              </li>
            </ol>
          </div>

          <div className="table-container">
            {/* Table with content */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-col">
                <div className="grid max-w-full grid-cols-1 gap-9 overflow-x-auto">
                  <table className="text-gray-700 w-full table-auto overflow-hidden bg-white text-sm shadow-md">
                    <thead className="bg-slate-600 text-xs uppercase tracking-wider text-white">
                      <tr>
                        <th className="border border-slate-700 px-2 py-2 text-center">
                          Subject Code
                        </th>
                        <th className="border border-slate-700 px-2 py-2 text-center">
                          Descriptive Title
                        </th>
                        <th className="border border-slate-700 px-2 py-2 text-center">
                          Class ID
                        </th>
                        <th
                          className="border border-slate-700 px-2 py-2 text-center"
                          colSpan={2}
                        >
                          Units
                        </th>
                        <th className="border border-slate-700 px-2 py-2 text-center">
                          Time
                        </th>
                        <th className="border border-slate-700 px-2 py-2 text-center">
                          Days
                        </th>
                        <th
                          className="border border-slate-700 px-2 py-2 text-center"
                          colSpan={2}
                        >
                          Hours Per Week
                        </th>
                        <th className="border border-slate-700 px-2 py-2 text-center">
                          Number of Students
                        </th>
                        <th className="border border-slate-700 px-2 py-2 text-center">
                          Room
                        </th>
                        <th className="border border-slate-700 px-2 py-2 text-center">
                          Student's Course/Year
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                      <tr className="bg-white text-[14px]">
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                        <td className="border px-2 py-1">jgvj</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default MainContent;

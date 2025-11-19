"use client";

import { HorizontalRule } from "@mui/icons-material";
import { useRef } from "react";
import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import DocumentHead from "@/component/document/Header";
import DocumentFooter from "@/component/document/Footer";
import MainContent from "./content/main";

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

const PrintablePage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <PrintStyleSheet />
      <div ref={contentRef} style={styles.printable} className="printable">
        <main className="h-full w-[85%] text-black bg-white flex-col items-center justify-center mx-auto">
          <DocumentHead />

          {/* Main Content */}
          <MainContent />

          {/* Footer on every page */}
          <DocumentFooter
            documentNo="UEP-URDS-FM-003"
            revisionNo="00"
            effectivityDate="SEPTEMBER 12, 2022"
          />
          <div className="page-break"></div>
        </main>
      </div>
    </>
  );
};

export default PrintablePage;

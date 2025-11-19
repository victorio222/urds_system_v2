"use client";

import { useRef } from "react";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";

// Print-specific styles
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

    .table-container {
      page-break-inside: auto;
    }

    .table-container table {
      page-break-inside: auto;
    }

    @page { size: A4; margin-top: 20mm; }
  }
`;

export const PrintStyleSheet: React.FC = () => (
  <style dangerouslySetInnerHTML={{ __html: printStyles }} />
);

const DocumentHead: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="absolute top-0 left-5">
        <Image src={Logo} alt="UEP Logo" className="h-[100px] w-[100px]" />
      </div>

      {/* Header Text */}
      <div className="text-center mt-4 leading-4.5">
        <p className="text-black font-medium text-[16px]">
          Republic of the Philippines
        </p>
        <p className="text-black font-bold text-[16px]">
          UNIVERSITY OF EASTERN PHILIPPINES
        </p>
        <p className="text-black font-medium text-[16px]">
          University Town, Northern Samar
        </p>
        <p className="text-black font-medium text-[16px]">
          Web:{" "}
          <a className="text-blue-600 underline" href="http://uep.edu.ph">
            http://uep.edu.ph;
          </a>{" "}
           Email:{" "}
          <a className="text-blue-600 underline" href="mailto:uepnsofficial@gmail.com">
            uepnsofficial@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default DocumentHead;

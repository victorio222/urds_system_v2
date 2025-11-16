'use client';
import Link from 'next/link';
import React from 'react';
import { BiRightArrow, BiRightArrowAlt, BiRightTopArrowCircle, BiSolidCaretRightSquare } from 'react-icons/bi';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { GiBottomRight3dArrow } from 'react-icons/gi';

interface BreadcrumbProps {
  pageName: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ pageName }) => {
  return (
    <div 
        className="bg-gray-100 border-t border-gray-300 px-5 py-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <nav>
        <ol className="flex items-center gap-1 text-sm">
          <li>
            <Link href="#" className="font-medium text-gray-500">
              Home <span>/</span>
            </Link>
          </li>
          <li className="font-medium text-green-400">{pageName}</li>
        </ol>
      </nav>

      <div className="text-sm font-medium text-green-400">{pageName}</div>
    </div>
  );
};

export default Breadcrumb;

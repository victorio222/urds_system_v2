"use client";

import React, { useState, useRef, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";

export interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  color?: string;
}

interface DropdownProps {
  items: DropdownItem[];
  buttonContent: React.ReactNode;
  align?: "left" | "right";
}

const Dropdown: React.FC<DropdownProps> = ({ items, buttonContent, align = "right" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center text-sm justify-between w-auto px-4 py-2 rounded-full hover:bg-gray-100 transition text-gray-800 font-medium"
      >
        {buttonContent}
        <span className="ml-2">
            <MdArrowDropDown />
        </span>
      </button>

      {open && (
        <div
          className={`absolute mt-2 min-w-auto bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden z-10 animate-fade-in ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              className={`flex items-center px-4 py-2 hover:bg-gray-100 w-full text-[15px] animate-fadeIn text-left gap-2 ${item.color || "text-gray-500"}`}
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

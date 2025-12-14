"use client";
import React, { useState, useRef, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";

interface StatusFilterProps {
  onFilterChange: (status: string) => void;
  defaultStatus?: string;
}

const statusOptions = [
  { label: "All Statuses", value: "" }, // Improved label for the 'All' option
  { label: "Active", value: "Active" },
  { label: "Expired", value: "Expired" },
  { label: "Draft", value: "Draft" },
];

const StatusFilter: React.FC<StatusFilterProps> = ({
  onFilterChange,
  defaultStatus = "",
}) => {
  const [selected, setSelected] = useState(
    statusOptions.find((s) => s.value === defaultStatus) || statusOptions[0]
  );
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen(!open);

  const handleSelect = (option: typeof selected) => {
    setSelected(option);
    onFilterChange(option.value);
    setOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center space-x-2" ref={dropdownRef}>
        
      {/* 1. Label */}
      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Filter by Status:
      </span>

      {/* 2. Custom Dropdown Input Container */}
      <div className="relative w-40">
        <div
          className={`
            flex items-center justify-between 
            px-1 py-1.5 
            cursor-pointer 
            border-b 
            rounded-xs 
            text-sm
            transition-colors duration-200 
            mr-4
            ${open 
                ? 'border-blue-500 bg-blue-50/70' 
                : (selected.value ? 'border-blue-400 bg-blue-50/70 text-blue-700' : 'border-gray-300 bg-white text-gray-800 hover:border-gray-400')
            }
          `}
          onClick={toggleDropdown}
        >
          <span className="truncate">{selected.label}</span>
          <BiChevronDown
            size={18}
            className={`text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </div>

        {/* 3. Dropdown Menu */}
        {open && (
          <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 shadow-xl rounded-md z-50 overflow-hidden">
            {statusOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`
                  px-3 py-2 text-sm cursor-pointer transition-colors duration-150
                  ${
                    selected.value === option.value 
                      ? "bg-blue-50 font-semibold text-blue-700" 
                      : "hover:bg-gray-100 text-gray-800"
                  }
                `}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusFilter;
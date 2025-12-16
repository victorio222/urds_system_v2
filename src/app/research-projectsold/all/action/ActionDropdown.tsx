"use client";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { BiDotsHorizontalRounded, BiShow, BiCheck } from "react-icons/bi";
import { GrReturn } from "react-icons/gr";

interface ActionDropdownProps {
  onView?: () => void;
  onApprove?: () => void;
  onRequest?: () => void;
}

const DROPDOWN_WIDTH = 190;
const DROPDOWN_HEIGHT = 130; // approx height based on 3 buttons ~43px each

const ActionDropdown: React.FC<ActionDropdownProps> = ({ onView, onApprove, onRequest }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !document.getElementById("action-dropdown")?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  // Calculate dropdown position and prevent overflow
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;

      let top = rect.bottom + scrollY + 4; // 4px gap
      let left = rect.left + scrollX;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Prevent right overflow
      if (left + DROPDOWN_WIDTH > viewportWidth + scrollX) {
        left = viewportWidth + scrollX - DROPDOWN_WIDTH - 60; // 8px margin
      }

      // Prevent bottom overflow
      if (top + DROPDOWN_HEIGHT > viewportHeight + scrollY) {
        top = rect.top + scrollY - DROPDOWN_HEIGHT - 4; // open above button
      }

      setPosition({ top, left });
    } else {
      setPosition(null);
    }
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        aria-haspopup="true"
        aria-expanded={open}
        className="p-1 rounded-full hover:bg-gray-200 transition"
        title="Actions"
      >
        <BiDotsHorizontalRounded size={20} />
      </button>

      {position &&
        createPortal(
          <div
            id="action-dropdown"
            style={{
              top: position.top,
              left: position.left,
              width: DROPDOWN_WIDTH,
            }}
            className={`text-slate-600 absolute bg-white border border-slate-100 cursor-pointer rounded-md shadow-lg z-50 animate-fadeIn 
              ${open ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setOpen(false);
                onView && onView();
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 transition"
            >
              <BiShow size={16} /> View
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onApprove && onApprove();
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 transition"
            >
              <BiCheck size={16} /> Approve
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onRequest && onRequest();
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 transition"
            >
              <GrReturn size={16} /> Request Revision
            </button>
          </div>,
          document.body
        )}
    </>
  );
};

export default ActionDropdown;

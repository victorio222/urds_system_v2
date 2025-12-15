"use client";

import { Divider } from "@mui/material";
import React, { FC, ReactNode, useEffect } from "react";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ opened, onClose, title, children }) => {
  useEffect(() => {
    if (!opened) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [opened, onClose]);

  if (!opened) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex justify-center p-5 overflow-y-auto"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl w-full max-w-full sm:max-w-md md:max-w-lg my-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="text-lg font-semibold text-slate-700 p-4 pb-2">
            {title}
          </h2>
        )}

        <Divider />

        <div className="p-5">{children}</div>

        <button
          className="absolute top-3 right-3 text-slate-500 hover:text-black p-1"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Modal;
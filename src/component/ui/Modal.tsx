"use client";
import React, { useEffect } from "react";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ opened, onClose, title, children }) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!opened) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-xl p-5 animate-fadeIn">
        {/* Title */}
        {title && (
          <h2 className="text-lg font-semibold mb-3 border-b pb-2 text-black">
            {title}
          </h2>
        )}

        {/* Content */}
        <div>{children}</div>

        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-slate-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;

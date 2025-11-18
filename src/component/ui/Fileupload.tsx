import React, { useRef } from "react";
import { HiOutlinePaperClip } from "react-icons/hi";

interface FileUploadAreaProps {
  onFileChange?: (file: File | null) => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onFileChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (onFileChange) onFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (onFileChange) onFileChange(e.target.files[0]);
    }
  };

  return (
    <>
      <label className="block mb-1 text-sm font-medium text-gray-600">
        Upload Files
      </label>
      <span className="block mb-2 text-xs text-gray-400">
        Select and upload files of your choice
      </span>
      <div
        className="relative w-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center py-12 bg-white hover:border-blue-400 transition-colors"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <HiOutlinePaperClip size={32} className="mb-3 text-gray-400" />
        <span className="font-medium text-gray-600 text-center mb-2">
          Choose a file or drag and drop it here
        </span>
        <span className="text-xs text-gray-400 mb-6">
          JPEG, PDF, and DOCS formats, up to 10MB
        </span>
        <button
          type="button"
          className="px-4 py-2 border rounded bg-gray-50 text-gray-600 text-sm font-medium hover:border-blue-400 hover:bg-blue-50 transition"
          onClick={() => inputRef.current?.click()}
        >
          Browse Files
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <span className="block mt-3 mb-1 text-center text-xs text-gray-400">
        Ensure all required fields are filled before submitting.
      </span>
    </>
  );
};

export default FileUploadArea;

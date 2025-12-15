"use client";

import React from "react";

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
}) => {
  return (
    <section>
      <h3 className="block text-sm font-medium text-slate-600 mb-1">
        {label}
      </h3>

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="  
        w-full 
         
          px-5 
          py-2 
          border 
          text-[15px]
          border-gray-300 
          rounded-xl 
          text-gray-500 
          placeholder-gray-400 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-300 
          focus:border-blue-400
          transition 
          duration-150 
          ease-in-out
          resize-y"
      />
    </section>
  );
};

export default FormTextarea;

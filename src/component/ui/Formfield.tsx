import React, { Children, useState } from 'react';

interface FormFieldProps {
  children?: React.ReactNode;
  required?: boolean;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  children,
  required = false,
  label = "Role/ Position",
  value,
  onChange,
  options,
  placeholder = "Select role",
}) => {
  return (
    <div className="mb-3 w-full">
      <label className="block text-sm font-medium mb-1 text-[#190072]">
        {label} 
      </label>
      <select
        className="w-full h-[42px] border border-[#190072] rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:ring-2 text-gray-400 focus:ring-blue-500"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {children}
    </div>
  );
};

export default FormField;

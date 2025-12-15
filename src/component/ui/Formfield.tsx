import React, { Children, useState } from 'react';

interface FormFieldProps {
  children?: React.ReactNode;
  required?: boolean;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  children,
  required = false,
  label = "Role/ Position",
  value,
  onChange,
  options,
  placeholder,
 
}) => {
  return (
    <div className="mb-3 w-full">
      <label className="block text-sm font-medium mb-1 text-slate-600">
        {label} 
      </label>
      <select
        value={value ?? ""}
        onChange={onChange}
        required={required}
        className="
          w-full 
          h-12
          px-4 
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
        "
      >
     
     {placeholder && (
          <option value="" disabled className="text-slate-400">
            {placeholder}
          </option>
        )}

        {options &&
          options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="text-slate-700"
            >
              {opt.label}
            </option>
          ))}

        {children}
      </select>
    </div>
  );
};

export default FormField;

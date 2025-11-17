import React from 'react';

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

const GreyInput: React.FC<FormInputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div className="mb-3 w-full">
      <label htmlFor={name} className="block text-sm font-medium mb-1 text-[#190072]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full h-[42px] border rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:ring-2 text-gray-400 focus:ring-blue-500"
      />
    </div>
  );
};

export default GreyInput;

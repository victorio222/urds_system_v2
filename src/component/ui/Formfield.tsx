// import React from "react";
// import { BiChevronDown } from "react-icons/bi";

// interface FormFieldProps {
//   children?: React.ReactNode;
//   required?: boolean;
//   label?: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//   options?: { value: string; label: string }[];
//   placeholder?: string;
// }

// const FormField: React.FC<FormFieldProps> = ({
//   children,
//   required = false,
//   label = "Role/ Position",
//   value,
//   onChange,
//   options,
//   placeholder,
// }) => {
//   return (
//     <div className="mb-3 w-full relative">
//       <label className="block text-sm font-medium mb-1 text-slate-600">
//         {label}
//       </label>

//       <select
//         value={value ?? ""}
//         onChange={onChange}
//         required={required}
//         className="
//           w-full 
//           h-12
//           px-4 
//           pr-10
//           border 
//           text-[15px]
//           border-gray-300 
//           rounded-xl 
//           text-gray-500 
//           placeholder-gray-400 
//           focus:outline-none 
//           focus:ring-2 
//           focus:ring-blue-300 
//           focus:border-blue-400
//           transition 
//           duration-150 
//           ease-in-out
//           appearance-none
//         "
//       >
//         {placeholder && (
//           <option value="" disabled className="text-slate-400">
//             {placeholder}
//           </option>
//         )}

//         {options &&
//           options.map((opt) => (
//             <option
//               key={opt.value}
//               value={opt.value}
//               className="text-slate-700"
//             >
//               {opt.label}
//             </option>
//           ))}

//         {children}
//       </select>

//       {/* Dropdown Icon */}
//       <div className="pointer-events-none absolute inset-y-0 right-3 top-5.5 flex items-center">
//         <BiChevronDown className="text-slate-400 h-5 w-5" />
//       </div>
//     </div>
//   );
// };

// export default FormField;







import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

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
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-3 w-full relative">
      <label className="block text-sm font-medium mb-1 text-slate-600">
        {label}
      </label>

      <select
        value={value ?? ""}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="
          w-full 
          h-12
          px-4 
          pr-10
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
          appearance-none
          bg-white
          hover:border-blue-400
          cursor-pointer
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
              className="text-slate-700 p-2 bg-white hover:bg-blue-50"
            >
              {opt.label}
            </option>
          ))}

        {children}
      </select>

      {/* Dropdown Icon */}
      <div className="pointer-events-none absolute inset-y-0 right-3 top-5.5 flex items-center">
        <BiChevronDown
          className={`text-slate-400 h-5 w-5 transition-transform duration-200 ${
            isFocused ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
    </div>
  );
};

export default FormField;

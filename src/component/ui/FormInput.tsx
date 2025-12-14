// import React from 'react';

// interface FormInputProps {
//   label: string;
//   type: string;
//   name: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   placeholder: string;
//   required?: boolean;
// }

// const FormInput: React.FC<FormInputProps> = ({
//   label,
//   type,
//   name,
//   value,
//   onChange,
//   placeholder,
//   required = false,
// }) => {
//   return (
//     <div className="mb-3 w-full">
//       <label htmlFor={name} className="block text-sm font-medium mb-1 text-[#190072]">
//         {label}
//       </label>
//       <input
//         type={type}
//         name={name}
//         id={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         required={required}
//         className="w-full h-[42px] border border-[#190072] rounded-[10px] px-3 py-2 text-sm focus:outline-none focus:ring-2 text-gray-400 focus:ring-blue-500"
//       />
//     </div>
//   );
// };

// export default FormInput;





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

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-600 mb-1"
      >
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
        className="
          w-full 
          h-12
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
        "
      />
    </div>
  );
};

export default FormInput;

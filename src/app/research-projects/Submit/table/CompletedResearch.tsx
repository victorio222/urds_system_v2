// 'use client';

// import React, { useState } from 'react';
// import { AiOutlineClose } from "react-icons/ai";
// import FormInput from '@/component/ui/GreyInput';
// import FormButton from '@/component/ui/Button';
// import DateInputs from '@/component/ui/DateSelection';
// import FileUploadArea from '@/component/ui/Fileupload';

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     ResearchTitle: '',
//     Rationale: '',
//     Objectives: '',
//     MainProponent: '',
//     ProjectLocation: '',
//   });

//   const [coProponents, setCoProponents] = useState<string[]>(['']);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleCoProponentChange = (index: number, value: string) => {
//     const updated = [...coProponents];
//     updated[index] = value;
//     setCoProponents(updated);

//     // Add new inputs in pairs as the last inputs get filled
//     if (
//       index >= coProponents.length - 2 &&
//       coProponents.length % 2 === 0 &&
//       updated.slice(-2).every(val => val !== '')
//     ) {
//       setCoProponents([...updated, '', '']);
//     }
//     if (
//       coProponents.length % 2 !== 0 &&
//       index === coProponents.length - 1 &&
//       value !== ''
//     ) {
//       setCoProponents([...updated, '']);
//     }
//   };

//   const handleRemoveCoProponent = (idx: number) => {
//     setCoProponents(coProponents.filter((_, i) => i !== idx));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({ ...formData, coProponents, startDate, endDate, uploadedFile });
//   };

//   function renderProponentRows() {
//     const inputClass = "flex-1 relative";
//     const rows = [
//       // Always show first row: Main Proponent & Co-Proponent (no remove button)
//       <div className="flex gap-4 mb-2" key="main-row">
//         <div className="flex-1">
//           <FormInput
//             label="Main Proponent"
//             type="text"
//             name="MainProponent"
//             value={formData.MainProponent}
//             onChange={handleInputChange}
//             placeholder="Enter your Main Proponent"
//             required
//           />
//         </div>
//         <div className={inputClass}>
//           <FormInput
//             label="Co-Proponent"
//             type="text"
//             name="CoProponent1"
//             value={coProponents[0] ?? ""}
//             onChange={e => handleCoProponentChange(0, e.target.value)}
//             placeholder="Enter co-proponent name"
//             required={false}
//           />
//           {/* DO NOT show remove button here */}
//         </div>
//       </div>
//     ];

//     // Additional co-proponents in pairs, with remove icon INSIDE input
//     for (let i = 1; i < coProponents.length; i += 2) {
//       rows.push(
//         <div className="flex gap-4 mb-2" key={`co-prop-row-${i}`}>
//           <div className={inputClass}>
//             <FormInput
//               label="Additional Co-Proponent"
//               type="text"
//               name={`CoProponent${i + 1}`}
//               value={coProponents[i] ?? ""}
//               onChange={e => handleCoProponentChange(i, e.target.value)}
//               placeholder="Enter co-proponent name"
//               required={false}
//             />
//             {coProponents[i] !== "" && (
//               <button
//                 type="button"
//                 className="absolute right-3 top-9 text-xs text-red-500 rounded hover:bg-red-50 px-1"
//                 onClick={() => handleRemoveCoProponent(i)}
//                 aria-label="Remove additional co-proponent"
//               >
//                 <AiOutlineClose size={18} />
//               </button>
//             )}
//           </div>
//           <div className={inputClass}>
//             {coProponents[i + 1] !== undefined && (
//               <>
//                 <FormInput
//                   label="Additional Co-Proponent"
//                   type="text"
//                   name={`CoProponent${i + 2}`}
//                   value={coProponents[i + 1] ?? ""}
//                   onChange={e => handleCoProponentChange(i + 1, e.target.value)}
//                   placeholder="Enter co-proponent name"
//                   required={false}
//                 />
//                 {coProponents[i + 1] !== "" && (
//                   <button
//                     type="button"
//                     className="absolute right-3 top-9 text-xs text-red-500 rounded hover:bg-red-50 px-1"
//                     onClick={() => handleRemoveCoProponent(i + 1)}
//                     aria-label="Remove additional co-proponent"
//                   >
//                     <AiOutlineClose size={18} />
//                   </button>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       );
//     }

//     return rows;
//   }

//   return (
//     <div>
//       <div className="flex-col m-10 bg-white p-[60px] rounded-lg max-w-[95%] w-full">
//         <h2 className="text-2xl font-semibold mb-3 text-gray-700">Submit Form</h2>
//         <hr className="my-4 border-gray-200" />
//         <form onSubmit={handleSubmit} className="mt-5">
//           <FormInput
//             label="Research Title"
//             type="text"
//             name="ResearchTitle"
//             value={formData.ResearchTitle}
//             onChange={handleInputChange}
//             placeholder="Enter your Research Title"
//             required
//           />
//           <div className="flex justify-between">
//             <FormInput
//               label="Rationale"
//               type="text"
//               name="Rationale"
//               value={formData.Rationale}
//               onChange={handleInputChange}
//               placeholder="Enter your Rationale"
//               required
//             />
//             <div className="pr-4"></div>
//             <FormInput
//               label="Objectives"
//               type="text"
//               name="Objectives"
//               value={formData.Objectives}
//               onChange={handleInputChange}
//               placeholder="Enter your Objectives"
//               required
//             />
//           </div>
//           <div className="flex justify-between">
//             <FormInput
//               label="Project Location"
//               type="text"
//               name="ProjectLocation"
//               value={formData.ProjectLocation}
//               onChange={handleInputChange}
//               placeholder="Enter your Project Location"
//               required
//             />
//             <div className="pr-4"></div>
//             <DateInputs
//               startDate={startDate}
//               endDate={endDate}
//               onStartDateChange={e => setStartDate(e.target.value)}
//               onEndDateChange={e => setEndDate(e.target.value)}
//             />
//           </div>

//           {renderProponentRows()}

//           <FileUploadArea onFileChange={file => setUploadedFile(file)} />
//         </form>
//         <div className="justify-center items-center">
//           <FormButton
//             type="submit"
//             className="text-sm w-[40%] py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition mt-4"
//           >
//             Submit
//           </FormButton>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;


'use client';

import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import FormInput from '@/component/ui/GreyInput';
import FormButton from '@/component/ui/Button';
import DateInputs from '@/component/ui/DateSelection';
import FileUploadArea from '@/component/ui/Fileupload';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    ResearchTitle: '',
    Rationale: '',
    Objectives: '',
    MainProponent: '',
    CoProponentMain: '', // first co‑proponent
    ProjectLocation: '',
    NatureOfResearch: '',
    Description: '',
  });

  // additional co‑proponents only (second, third, ...)
  const [extraCoProponents, setExtraCoProponents] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExtraChange = (index: number, value: string) => {
    setExtraCoProponents(prev => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const handleAddCoProponent = () => {
    setExtraCoProponents(prev => [...prev, '']);
  };

  const handleRemoveCoProponent = (index: number) => {
    setExtraCoProponents(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allCoProponents = [
      formData.CoProponentMain,
      ...extraCoProponents.filter(v => v.trim() !== ''),
    ];
    console.log({
      ...formData,
      coProponents: allCoProponents,
      startDate,
      endDate,
      uploadedFile,
    });
  };

  function renderCoProponentRows() {
    const inputClass = 'flex-1 relative';
    const rows: React.ReactNode[] = [];

    // Row 1: Main + first Co‑Proponent
    rows.push(
      <div className="flex gap-4 mb-2" key="main-row">
        <div className="flex-1">
          <FormInput
            label="Main Proponent"
            type="text"
            name="MainProponent"
            value={formData.MainProponent}
            onChange={handleInputChange}
            placeholder="Enter your Main Proponent"
            required
          />
        </div>
        <div className={inputClass}>
          <FormInput
            label="Co-Proponent"
            type="text"
            name="CoProponentMain"
            value={formData.CoProponentMain}
            onChange={handleInputChange}
            placeholder="Enter co-proponent name"
          />
        </div>
      </div>
    );

    // Additional co‑proponents (2 per row)
    for (let i = 0; i < extraCoProponents.length; i += 2) {
      rows.push(
        <div className="flex gap-4 mb-2" key={`extra-row-${i}`}>
          {/* left additional */}
          <div className={inputClass}>
            <FormInput
              label="Additional Co-Proponent"
              type="text"
              name={`ExtraCoProponent${i + 1}`}
              value={extraCoProponents[i] ?? ''}
              onChange={e => handleExtraChange(i, e.target.value)}
              placeholder="Enter co-proponent name"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-xs text-red-500 rounded hover:bg-red-50 px-1"
              onClick={() => handleRemoveCoProponent(i)}
              aria-label="Remove additional co-proponent"
            >
              <AiOutlineClose size={18} />
            </button>
          </div>

          {/* right additional if exists */}
          <div className={inputClass}>
            {extraCoProponents[i + 1] !== undefined && (
              <>
                <FormInput
                  label="Additional Co-Proponent"
                  type="text"
                  name={`ExtraCoProponent${i + 2}`}
                  value={extraCoProponents[i + 1] ?? ''}
                  onChange={e => handleExtraChange(i + 1, e.target.value)}
                  placeholder="Enter co-proponent name"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-xs text-red-500 rounded hover:bg-red-50 px-1"
                  onClick={() => handleRemoveCoProponent(i + 1)}
                  aria-label="Remove additional co-proponent"
                >
                  <AiOutlineClose size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      );
    }

    return rows;
  }

  return (
    <div>
      <div className="flex-col m-10 bg-white p-[60px] rounded-lg max-w-[95%] w-full">
        <h2 className="text-2xl font-semibold mb-3 text-gray-700">Submit Form</h2>
        <hr className="my-4 border-gray-200" />

        <form onSubmit={handleSubmit} className="mt-5">
          <FormInput
            label="Research Title"
            type="text"
            name="ResearchTitle"
            value={formData.ResearchTitle}
            onChange={handleInputChange}
            placeholder="Enter your Research Title"
            required
          />

          <div className="flex justify-between">
            <FormInput
              label="Rationale"
              type="text"
              name="Rationale"
              value={formData.Rationale}
              onChange={handleInputChange}
              placeholder="Enter your Rationale"
              required
            />
            <div className="pr-4" />
            <FormInput
              label="Objectives"
              type="text"
              name="Objectives"
              value={formData.Objectives}
              onChange={handleInputChange}
              placeholder="Enter your Objectives"
              required
            />
          </div>

          <div className="flex justify-between">
            <FormInput
              label="Project Location"
              type="text"
              name="ProjectLocation"
              value={formData.ProjectLocation}
              onChange={handleInputChange}
              placeholder="Enter your Project Location"
              required
            />
            <div className="pr-4" />
            <DateInputs
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={e => setStartDate(e.target.value)}
              onEndDateChange={e => setEndDate(e.target.value)}
            />
          </div>

          {/* Main + co‑proponents */}
          {renderCoProponentRows()}

          {/* Centered "Add Co-Proponent" button once first co‑proponent is filled */}
          {formData.CoProponentMain.trim() !== '' && (
            <div className="mt-2 flex justify-center">
              <button
                type="button"
                onClick={handleAddCoProponent}
                className="text-xs text-blue-600 border border-blue-400 px-3 py-1 rounded hover:bg-blue-50"
              >
                Add Co-Proponent
              </button>
            </div>
          )}
          <div className="">
            <FormInput
              label="Nature of Research"
              type="text"
              name="NatureOfResearch"
              value={formData.NatureOfResearch}
              onChange={handleInputChange}
              placeholder="Enter your Nature of Research"
              required
            />

                <FormInput
              label="Description"
              type="text"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
              placeholder="Enter your Description"
              required
            />
          </div>
          <div className="mt-6">
            <FileUploadArea onFileChange={file => setUploadedFile(file)} />
          </div>
        </form>

        {/* Centered Submit button */}
        <div className="flex justify-center">
          <FormButton
            type="submit"
            className="text-sm w-[40%] py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition mt-4"
          >
            Submit
          </FormButton>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

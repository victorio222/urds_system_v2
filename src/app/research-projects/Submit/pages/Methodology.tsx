// 'use client';

// import React, { useState } from 'react';
// import FormInput from '@/component/ui/FormInput';
// import FormButton from '@/component/ui/Button';
// import FileUploadArea from '@/component/ui/Fileupload';
// import { Button } from '@mui/material';

// interface Props {
//   formData: any;
//   setFormData: (data: any) => void;
//   prevStep: () => void;
//   onSubmit: (data: any) => void;
// }

// const MethodologyPage: React.FC<Props> = ({ formData, setFormData, prevStep, onSubmit }) => {
//   const [file, setFile] = useState<File | null>(formData.finalFile || null);

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         onSubmit({ ...formData, finalFile: file });
//       }}
//       className="flex flex-col gap-4"
//     >
//       <FormInput
//         label="Detailed Methodology"
//         type="text"
//         name="methodology"
//         placeholder='Methodology'
//         value={formData.methodologyDetails || formData.methodology || ''}
//         onChange={(e) => setFormData({ ...formData, methodologyDetails: e.target.value })}
//         required
//       />

//       <FileUploadArea onFileChange={(file) => setFile(file)} />

//       <div className="flex justify-between mt-4">
//         <Button type="button" onClick={prevStep}>
//           Back
//         </Button>
//         <FormButton type="submit">Submit Proposal</FormButton>
//       </div>
//     </form>
//   );
// };

// export default MethodologyPage;




// 'use client';

// import React, { useState } from 'react';
// import FormInput from '@/component/ui/FormInput';
// import FormButton from '@/component/ui/Button';
// import { Button } from '@mui/material';
// import { addMethodology } from '@/utils/apiHelpers';

// interface MethodologyItem {
//   title: string;
//   description: string;
// }

// interface Props {
//   formData: any;
//   setFormData: (data: any) => void;
//   nextStep: () => void;
//   prevStep: () => void;
//   proposalId: number;
// }

// const MethodologyPage: React.FC<Props> = ({
//   formData,
//   setFormData,
//   nextStep,
//   prevStep,
//   proposalId
// }) => {
//   const [methodologies, setMethodologies] = useState<MethodologyItem[]>(
//     formData.methodologies || [{ title: '', description: '' }]
//   );
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (
//     index: number,
//     field: keyof MethodologyItem,
//     value: string
//   ) => {
//     const copy = [...methodologies];
//     copy[index][field] = value;
//     setMethodologies(copy);
//   };

//   const addRow = () =>
//     setMethodologies([...methodologies, { title: '', description: '' }]);

//   const removeRow = (index: number) =>
//     setMethodologies(methodologies.filter((_, i) => i !== index));

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setLoading(true);
//     setError(null);

//     try {
//       await addMethodology({
//         proposal_id: proposalId,
//         methodologies: methodologies.filter(
//           m => m.title.trim() && m.description.trim()
//         )
//       });

//       setFormData({ ...formData, methodologies });
//       nextStep();
//     } catch (err: any) {
//       console.error(err);
//       setError(err.response?.data?.error || 'Failed to save methodology.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//       {error && <p className="text-red-500">{error}</p>}

//       {methodologies.map((m, i) => (
//         <div key={i} className="border rounded p-4 space-y-3">
//           <FormInput
//           type='text'
//           name='methodology'
//             label={`Methodology Title ${i + 1}`}
//             placeholder="e.g. Interviews and Surveys"
//             value={m.title}
//             onChange={(e) => handleChange(i, 'title', e.target.value)}
//             required
//           />

//           <FormInput
//           type='text'
//           name='description'
//             label="Description"
//             placeholder="Describe this methodology in detail"
//             value={m.description}
//             onChange={(e) => handleChange(i, 'description', e.target.value)}
//             required
//           />

//           {methodologies.length > 1 && (
//             <button
//               type="button"
//               onClick={() => removeRow(i)}
//               className="text-red-500 text-sm"
//             >
//               Removes
//             </button>
//           )}
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={addRow}
//         className="text-blue-500 text-sm border px-3 py-1 rounded hover:bg-blue-50"
//       >
//         Add Another Methodology
//       </button>

//       <div className="flex justify-between mt-4">
//         <Button type="button" onClick={prevStep}>
//           Back
//         </Button>
//         <FormButton type="submit">
//           {loading ? 'Saving...' : 'Next'}
//         </FormButton>
//       </div>
//     </form>
//   );
// };

// export default MethodologyPage;








'use client';

import React, { useState } from 'react';
import FormInput from '@/component/ui/FormInput';
import FormButton from '@/component/ui/Button';
import { Button } from '@mui/material';
import {
  addMethodology,
  updateTechInfoMethodology,
} from '@/utils/apiHelpers';

interface MethodologyItem {
  title: string;
  description: string;
}

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  proposalId: number;
}

const MethodologyPage: React.FC<Props> = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  proposalId,
}) => {
  /** 🔹 GENERAL METHODOLOGY */
  const [generalMethodology, setGeneralMethodology] = useState(
    formData.generalMethodology || ''
  );

  /** 🔹 SUB METHODOLOGIES */
  const [methodologies, setMethodologies] = useState<MethodologyItem[]>(
    formData.methodologies || [{ title: '', description: '' }]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    index: number,
    field: keyof MethodologyItem,
    value: string
  ) => {
    const copy = [...methodologies];
    copy[index][field] = value;
    setMethodologies(copy);
  };

  const addRow = () =>
    setMethodologies([...methodologies, { title: '', description: '' }]);

  const removeRow = (index: number) =>
    setMethodologies(methodologies.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      /** 1️⃣ SAVE GENERAL METHODOLOGY */
      await updateTechInfoMethodology(proposalId, generalMethodology);

      /** 2️⃣ SAVE SUB-METHODOLOGIES */
      await addMethodology({
        proposal_id: proposalId,
        methodologies: methodologies.filter(
          (m) => m.title.trim() && m.description.trim()
        ),
      });

      /** 3️⃣ SAVE LOCALLY */
      setFormData({
        ...formData,
        generalMethodology,
        methodologies,
      });

      nextStep();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to save methodology.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && <p className="text-red-500">{error}</p>}

      {/* ================= GENERAL METHODOLOGY ================= */}
      <FormInput
        type="text"
        name="generalMethodology"
        label="General Methodology"
        placeholder="Overall research methodology (e.g. Mixed Methods Approach)"
        value={generalMethodology}
        onChange={(e) => setGeneralMethodology(e.target.value)}
        required
      />

      <hr />

      {/* ================= SUB METHODOLOGIES ================= */}
      {methodologies.map((m, i) => (
        <div key={i} className="border rounded p-4 space-y-3">
          <FormInput
            type="text"
            name="methodologyTitle"
            label={`Methodology Title ${i + 1}`}
            placeholder="e.g. Interviews and Surveys"
            value={m.title}
            onChange={(e) => handleChange(i, 'title', e.target.value)}
            required
          />

          <FormInput
            type="text"
            name="methodologyDescription"
            label="Description"
            placeholder="Describe this methodology in detail"
            value={m.description}
            onChange={(e) =>
              handleChange(i, 'description', e.target.value)
            }
            required
          />

          {methodologies.length > 1 && (
            <button
              type="button"
              onClick={() => removeRow(i)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addRow}
        className="text-blue-500 text-sm border px-3 py-1 rounded hover:bg-blue-50"
      >
        Add Sub-Methodology
      </button>

      <div className="flex justify-between mt-4">
        <Button type="button" onClick={prevStep}>
          Back
        </Button>
        <FormButton type="submit">
          {loading ? 'Saving...' : 'Next'}
        </FormButton>
      </div>
    </form>
  );
};

export default MethodologyPage;

// 'use client';

// import React, { useState } from 'react';
// import FormInput from '@/component/ui/FormInput';
// import FormButton from '@/component/ui/Button';
// import FileUploadArea from '@/component/ui/Fileupload';
// import { Button } from '@mui/material';

// interface Props {
//   formData: any;
//   setFormData: (data: any) => void;
//   nextStep: () => void;
//   prevStep: () => void;
// }

// const LiteratureReviewPage: React.FC<Props> = ({ formData, setFormData, nextStep, prevStep }) => {
//   const [file, setFile] = useState<File | null>(formData.literatureFile || null);

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         setFormData({ ...formData, literatureFile: file });
//         nextStep();
//       }}
//       className="flex flex-col gap-4"
//     >
//       <FormInput
//         label="Literature Review Summary"
//         type="text"
//         placeholder='Rationale'
//         name="rrl"
//         value={formData.literatureSummary || ''}
//         onChange={(e) => setFormData({ ...formData, literatureSummary: e.target.value })}
//         required
//       />

//       <FileUploadArea onFileChange={(file) => setFile(file)} />

//       <div className="flex justify-between mt-4">
//         <Button type="button" onClick={prevStep}>
//           Back
//         </Button>
//         <FormButton type="submit">Next</FormButton>
//       </div>
//     </form>
//   );
// };

// export default LiteratureReviewPage;

"use client";

import React, { useState } from "react";
import FormInput from "@/component/ui/FormInput";
import FormButton from "@/component/ui/Button";
import { Button } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { addReviewLiterature } from "@/utils/apiHelpers"; // Create this API helper

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  proposalId: number; // Passed from previous step
}

const LiteratureReviewPage: React.FC<Props> = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  proposalId,
}) => {
  const { userId } = useAuth(); // Get logged-in user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!proposalId) {
      setError("Proposal ID is missing.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        proposal_id: proposalId,
        details: formData.literatureSummary, // ✅ MATCHES MODEL
      };

      await addReviewLiterature(payload);

      setFormData({
        ...formData,
        literatureSummary: formData.literatureSummary,
      });

      nextStep();
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.error || "Failed to save literature review."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500">{error}</p>}

      <FormInput
        label="Literature Review Summary"
        type="text"
        placeholder="Summarize the literature review"
        name="literatureSummary"
        value={formData.literatureSummary || ""}
        onChange={(e) =>
          setFormData({ ...formData, literatureSummary: e.target.value })
        }
        required
      />

      <div className="flex justify-between mt-4">
        <Button type="button" onClick={prevStep}>
          Back
        </Button>
        <FormButton type="submit">{loading ? "Saving..." : "Next"}</FormButton>
      </div>
    </form>
  );
};

export default LiteratureReviewPage;

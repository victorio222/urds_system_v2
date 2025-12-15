"use client";

import React, { useState } from "react";
import BasicInfoPage from "./BasicInfo";
import TechnicalInfoPage from "./TechInfo";
import LiteratureReviewPage from "./ReviewLiterature";
import MethodologyPage from "./Methodology";
import WorkPlan from "./WorkPlan";
import WorkPlanPage from "./WorkPlan";

const ProposalWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [proposalId, setProposalId] = useState<number | null>(null); // ✅ store proposal ID

  // Move to next step
  const nextStep = () => setStep((prev) => prev + 1);

  // Move to previous step
  const prevStep = () => setStep((prev) => prev - 1);

  // Called after BasicInfoPage creates proposal
  const handleBasicInfoNext = (createdProposalId: number) => {
    setProposalId(createdProposalId); // ✅ save proposalId
    nextStep();
  };

  // Final submission (optional)
  const handleSubmit = (finalData: any) => {
    console.log("Final Proposal Data:", finalData);
    alert("Proposal submitted! Check console for data.");
    // TODO: call backend API to save remaining info
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Submit Proposal (Step {step} of 4)
      </h2>

      {step === 1 && (
        <BasicInfoPage
          formData={formData}
          setFormData={setFormData}
          nextStep={handleBasicInfoNext} // ✅ pass proposal ID callback
        />
      )}

      {step === 2 &&
        proposalId && ( // ✅ ensure proposalId exists
          <TechnicalInfoPage
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
            proposalId={proposalId} // ✅ pass proposalId
          />
        )}

      {step === 3 && (
        <LiteratureReviewPage
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          proposalId={proposalId!} // optional if needed
        />
      )}

      {step === 4 && (
        <MethodologyPage
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          proposalId={proposalId!} // optional if needed
          //   proposalId={proposalId} // optional if needed
        />
      )}
      {/* {step === 5 && (
        <WorkPlanPage
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          // onSubmit={handleSubmit}
          proposalId={proposalId}
        />
      )} */}
    </div>
  );
};

export default ProposalWizard;

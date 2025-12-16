// "use client";

// import React, { useState } from "react";
// import BasicInfoPage from "./BasicInfo";
// import TechnicalInfoPage from "./TechInfo";
// import LiteratureReviewPage from "./ReviewLiterature";
// import MethodologyPage from "./Methodology";
// import WorkPlan from "./WorkPlan";
// import WorkPlanPage from "./WorkPlan";

// const ProposalWizard = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState<any>({});
//   const [proposalId, setProposalId] = useState<number | null>(null); // ✅ store proposal ID

//   // Move to next step
//   const nextStep = () => setStep((prev) => prev + 1);

//   // Move to previous step
//   const prevStep = () => setStep((prev) => prev - 1);

//   // Called after BasicInfoPage creates proposal
//   const handleBasicInfoNext = (createdProposalId: number) => {
//     setProposalId(createdProposalId); // ✅ save proposalId
//     nextStep();
//   };

//   // Final submission (optional)
//   const handleSubmit = (finalData: any) => {
//     console.log("Final Proposal Data:", finalData);
//     alert("Proposal submitted! Check console for data.");
//     // TODO: call backend API to save remaining info
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold mb-4 text-black">
//         Submit Proposal (Step {step} of 4)
//       </h2>

//       {step === 1 && (
//         <BasicInfoPage
//           formData={formData}
//           setFormData={setFormData}
//           nextStep={handleBasicInfoNext} // ✅ pass proposal ID callback
//         />
//       )}

//       {step === 2 &&
//         proposalId && ( // ✅ ensure proposalId exists
//           <TechnicalInfoPage
//             formData={formData}
//             setFormData={setFormData}
//             nextStep={nextStep}
//             prevStep={prevStep}
//             proposalId={proposalId} // ✅ pass proposalId
//           />
//         )}

//       {step === 3 && (
//         <LiteratureReviewPage
//           formData={formData}
//           setFormData={setFormData}
//           nextStep={nextStep}
//           prevStep={prevStep}
//           proposalId={proposalId!} // optional if needed
//         />
//       )}

//       {step === 4 && (
//         <MethodologyPage
//           formData={formData}
//           setFormData={setFormData}
//           nextStep={nextStep}
//           prevStep={prevStep}
//           proposalId={proposalId!} // optional if needed
//           //   proposalId={proposalId} // optional if needed
//         />
//       )}
//       {/* {step === 5 && (
//         <WorkPlanPage
//           formData={formData}
//           setFormData={setFormData}
//           prevStep={prevStep}
//           // onSubmit={handleSubmit}
//           proposalId={proposalId}
//         />
//       )} */}
//     </div>
//   );
// };

// export default ProposalWizard;

"use client";

import React, { useMemo, useState } from "react";

import BasicInfoPage from "./BasicInfo";
import TechnicalInfoPage from "./TechInfo";
import LiteratureReviewPage from "./ReviewLiterature";
import MethodologyPage from "./Methodology";
import WorkPlanPage from "./WorkPlan";


const TOTAL_STEPS = 6;

const STEP_TITLES: Record<number, string> = {
  1: "I. Basic Information",
  2: "II. Technical Information",
  3: "III. Review of Literature",
  4: "IV. Detailed Methodology",
  5: "V. Work Plan",
  6: "VI. Detailed Budgetary Requirement",
};

const ProposalWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [proposalId, setProposalId] = useState<number | null>(null);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleBasicInfoNext = (createdProposalId: number) => {
    setProposalId(createdProposalId);
    nextStep();
  };

  const stepTitle = STEP_TITLES[step] || `Step ${step}`;

  // percent and dynamic color
  const percent = useMemo(() => Math.round((step / TOTAL_STEPS) * 100), [step]);
  const barColor = useMemo(() => {
    if (percent < 20) return "bg-red-500";
    if (percent < 40) return "bg-orange-500";
    if (percent < 60) return "bg-yellow-500";
    if (percent < 80) return "bg-blue-500";
    return "bg-green-600";
  }, [percent]);

  const handleFinalSubmit = (finalData: any) => {
    console.log("Final Proposal Data:", finalData);
    alert("Proposal submitted! Check console for data.");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-1 text-xl font-semibold text-gray-800">
        Submit Proposal (Step {step} of {TOTAL_STEPS})
      </h2>
      {/* Progress Bar */}
      <div className="mt-2 w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className={`${barColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percent}%` }}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
      </div>
      <p className="mb-4 text-lg font-medium text-gray-500">{stepTitle}</p>


      {/* Step 1 */}
      {step === 1 && (
        <BasicInfoPage
          formData={formData}
          setFormData={setFormData}
          nextStep={handleBasicInfoNext}
        />
      )}

      {/* Step 2 */}
      {step === 2 && proposalId && (
        <TechnicalInfoPage
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          proposalId={proposalId}
        />
      )}

      {/* Step 3 */}
      {step === 3 && proposalId && (
        <LiteratureReviewPage
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          proposalId={proposalId}
        />
      )}

      {/* Step 4 */}
      {step === 4 && proposalId && (
        <MethodologyPage
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          proposalId={proposalId}
        />
      )}

      {/* Step 5 */}
      {step === 5 && proposalId && (
        <WorkPlanPage
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          proposalId={proposalId}
        />
      )}

      {/* Step 6 */}
      {/* {step === 6 && proposalId && (
        <BudgetaryRequirementPage
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          proposalId={proposalId}
          onSubmit={handleFinalSubmit}
        />
      )} */}

      {step !== 1 && !proposalId && (
        <p className="mt-4 text-sm text-red-500">
          Proposal ID is missing. Please complete Basic Information first.
        </p>
      )}
    </div>
  );
};

export default ProposalWizard;

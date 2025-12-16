import React from "react";

interface SignatorySectionProps {
  proponentName: string;
  researchCoordinatorName: string;
  collegeDeanName: string;
  recommendingApprovalName: string;
  approvalName: string;
}

const SignatorySection: React.FC<SignatorySectionProps> = ({
  proponentName,
  researchCoordinatorName,
  collegeDeanName,
  recommendingApprovalName,
  approvalName,
}) => {
  return (
    <div className="mt-10 max-w-4xl mx-auto">
      {/* First Row */}
      <div className="flex gap-5">
        {/* Prepared By */}
        <div className="flex flex-col items-start w-[250px] ">
          <p className="font-bold text-lg mb-2">Prepared by:</p>
          <div className="text-center">
            <p className="font-bold underline text-center uppercase">
              {proponentName}
            </p>
            <p className="text-left mt-[-7px]">Proponent</p>
          </div>
        </div>
      </div>

      <p className="font-bold mb-5 text-left mt-5">Recommending Approval:</p>

      {/* Second Row */}
      <div className="flex gap-5 mt-6">
        {/* Director */}
        <div className="flex flex-col items-start w-[300px] ">
          <div className="text-center">
            <p className="font-bold text-center uppercase">{proponentName}</p>
            <p className="text-center mt-[-5px]">Director, URDS</p>
          </div>
        </div>

        {/* VP for RDE */}
        <div className="flex flex-col items-start">
          <div className="flex gap-5">
            <div>
              <p className="font-bold text-center uppercase">
                {researchCoordinatorName}
              </p>
              <p className="text-center mt-[-5px]">VP for RDE</p>
            </div>
          </div>
        </div>
      </div>

      {/* Third Row */}
      <div className="flex gap-5 mt-10">
        {/* Prepared By */}
        <div className="flex flex-col items-start w-[300px] ">
          <p className="font-bold text-lg mb-5">Reviewed:</p>
          <div className="text-center">
            <p className="font-bold text-center uppercase">{proponentName}</p>
            <p className="text-center mt-[-5px]">Budget Officer</p>
          </div>
        </div>

        {/* Endorsed By */}
        <div className="flex flex-col items-start">
          <p className="font-bold text-lg mb-5">Approved by:</p>
          <div className="flex gap-5">
            <div>
              <p className="font-bold text-center uppercase">
                {researchCoordinatorName}
              </p>
              <p className="text-center mt-[-5px]">President</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatorySection;

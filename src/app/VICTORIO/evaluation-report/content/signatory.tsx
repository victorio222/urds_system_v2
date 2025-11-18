import React from "react";

interface SignatorySectionProps {
  directorName: string;
}

const SignatorySection: React.FC<SignatorySectionProps> = ({
  directorName
}) => {
  return (
    <div className="mt-10 max-w-4xl mx-auto">
      {/* First Row */}
      <div className="flex gap-5 mb-12 justify-end">
        {/* Prepared By */}
        <div className="flex flex-col items-start">
          <p className="font-bold text-lg mb-7">Certified Correct:</p>
          <div className="text-center ml-10">
            <p className="font-bold underline text-center uppercase">{directorName}</p>
            <p className="text-center italic">Director for Research</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatorySection;

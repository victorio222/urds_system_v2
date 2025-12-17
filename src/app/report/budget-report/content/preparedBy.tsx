import React from "react";

interface SignatorySectionProps {
  proponentName: string;
  approvalName: string;
}

const PreparedBy: React.FC<SignatorySectionProps> = ({
  proponentName,
  approvalName,
  }) => {
  return (
    <div className="flex justify-between gap-4 my-15">
        {/* First Column */}
        <div className="flex flex-col items-start w-[250px]">
            <p className="font-bold text-lg mb-2">Prepared By:</p>
            <p className="font-bold underline uppercase">{proponentName}</p>
            <p className="mt-1">Program/Project/Study Leader</p>
        </div>

        {/* Second Column */}
        <div className="flex flex-col items-start w-[300px]">
            <p className="font-bold text-lg mb-2">Approved By:</p>
            <p className="font-bold underline uppercase">{approvalName}</p>
            <p className="mt-1">Director, URDS</p>
        </div>
    </div>
  );
};

export default PreparedBy;

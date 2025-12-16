"use client";

// src/component/proposal/ObjectivesSection.tsx
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import FormInput from "@/component/ui/FormInput";

export interface ObjectivesData {
  objectives: string[];
}

interface ObjectivesSectionProps {
  data: ObjectivesData;
  onChange: (data: ObjectivesData) => void;
  minItems?: number; // optional: keep at least N objectives
}

const ObjectivesSection: React.FC<ObjectivesSectionProps> = ({
  data,
  onChange,
  minItems = 1,
}) => {
  const objectives = Array.isArray(data.objectives) ? data.objectives : [""];

  const handleObjectiveChange = (index: number, value: string) => {
    const copy = [...objectives];
    copy[index] = value;
    onChange({ objectives: copy });
  };

  const handleAddObjective = () => {
    onChange({ objectives: [...objectives, ""] });
  };

  const handleRemoveObjective = (index: number) => {
    // enforce minimum items
    if (objectives.length <= minItems) return;
    onChange({ objectives: objectives.filter((_, i) => i !== index) });
  };
console.log("ObjectivesSection typeof:", typeof ObjectivesSection, ObjectivesSection);
  return (
    <div className="space-y-2">
      {objectives.map((obj, i) => (
        <div key={i} className="flex items-start gap-2 ">
          <div className="flex-1 relative">
            <FormInput
              label={`Objective ${i + 1}`}
              placeholder="Objective"
              name={`objective-${i}`}
              type="text"
              value={obj}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleObjectiveChange(i, e.target.value)
              }
              required
            />

            {/* close icon button (same style idea as proponent section) */}
            {objectives.length > minItems && (
              <button
                type="button"
                className="absolute right-3 top-9 rounded px-1 text-xs text-red-500 hover:bg-red-50"
                onClick={() => handleRemoveObjective(i)}
                aria-label="Remove objective"
                title="Remove objective"
              >
                <AiOutlineClose size={18} />
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddObjective}
        className="text-blue-500 text-sm border border-blue-300 px-2 py-1 rounded hover:bg-blue-50 "
      >
        Add Objective
      </button>
    </div>
  );
};

export default ObjectivesSection;

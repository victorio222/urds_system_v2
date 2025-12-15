"use client";  // <<< add this line

// src/component/proposal/ProponentSection.tsx
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import FormInput from "@/component/ui/FormInput";

export interface ProponentData {
  MainProponent: string;
  CoProponentMain: string;
  extraCoProponents: string[];
}

interface ProponentSectionProps {
  data: ProponentData;
  onChange: (data: ProponentData) => void;
}

const ProponentSection: React.FC<ProponentSectionProps> = ({ data, onChange }) => {
  const { MainProponent, CoProponentMain, extraCoProponents } = data;

  const handleMainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleExtraChange = (index: number, value: string) => {
    const copy = [...extraCoProponents];
    copy[index] = value;
    onChange({ ...data, extraCoProponents: copy });
  };

  const handleAddCoProponent = () => {
    onChange({ ...data, extraCoProponents: [...extraCoProponents, ""] });
  };

  const handleRemoveCoProponent = (index: number) => {
    onChange({
      ...data,
      extraCoProponents: extraCoProponents.filter((_, i) => i !== index),
    });
  };

  const renderCoProponentRows = () => {
    const rows: React.ReactNode[] = [];
    const inputClass = "flex-1 relative";

    // row 1: main + first co-proponent
    rows.push(
      <div className="mb-2 flex gap-4" key="main-row">
        <div className="flex-1">
          <FormInput
            label="Leader / Main Proponent"
            type="text"
            name="MainProponent"
            value={MainProponent}
            onChange={handleMainChange}
            placeholder="Enter Main Proponent"
            required
          />
        </div>
        <div className={inputClass}>
          <FormInput
            label="Co-Proponent"
            type="text"
            name="CoProponentMain"
            value={CoProponentMain}
            onChange={handleMainChange}
            placeholder="Enter co-proponent name"
          />
        </div>
      </div>
    );

    // additional co‑proponents (2 per row)
    for (let i = 0; i < extraCoProponents.length; i += 2) {
      rows.push(
        <div className="mb-2 flex gap-4" key={`extra-row-${i}`}>
          {/* left */}
          <div className={inputClass}>
            <FormInput
              label="Additional Co-Proponent"
              type="text"
              name={`ExtraCoProponent${i + 1}`}
              value={extraCoProponents[i] ?? ""}
              onChange={(e) => handleExtraChange(i, e.target.value)}
              placeholder="Enter co-proponent name"
            />
            <button
              type="button"
              className="absolute right-3 top-9 rounded px-1 text-xs text-red-500 hover:bg-red-50"
              onClick={() => handleRemoveCoProponent(i)}
            >
              <AiOutlineClose size={18} />
            </button>
          </div>

          {/* right */}
          <div className={inputClass}>
            {extraCoProponents[i + 1] !== undefined && (
              <>
                <FormInput
                  label="Additional Co-Proponent"
                  type="text"
                  name={`ExtraCoProponent${i + 2}`}
                  value={extraCoProponents[i + 1] ?? ""}
                  onChange={(e) => handleExtraChange(i + 1, e.target.value)}
                  placeholder="Enter co-proponent name"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 rounded px-1 text-xs text-red-500 hover:bg-red-50"
                  onClick={() => handleRemoveCoProponent(i + 1)}
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
  };

  return (
    <div className="space-y-2">
      {renderCoProponentRows()}

      {CoProponentMain.trim() !== "" && (
        <div className="mt-1 flex justify-center">
          <button
            type="button"
            onClick={handleAddCoProponent}
            className="rounded border border-blue-400 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50"
          >
            Add Co-Proponent
          </button>
        </div>
      )}
    </div>
  );
};

export default ProponentSection;

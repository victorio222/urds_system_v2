'use client';

import React, { useState } from 'react';
import FormInput from '@/component/ui/FormInput';
import FormButton from '@/component/ui/Button';
import { Button } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import { addOrUpdateTechInfo, addObjectives } from '@/utils/apiHelpers'; // Ensure updateTechInfo uses PUT to /tech-info/update/:id
import ObjectivesSection from "../table/ObjectivesSection";
import FormTextarea from '@/component/ui/FormTextArea';


interface Props {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  proposalId: number; // Pass the created proposal ID from previous step
}

const TechnicalInfoPage: React.FC<Props> = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  proposalId,
}) => {
  const { userId } = useAuth();
  const [objectives, setObjectives] = useState<string[]>(formData.objectives || ['']);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddObjective = () => setObjectives([...objectives, '']);
  const handleObjectiveChange = (index: number, value: string) => {
    const copy = [...objectives];
    copy[index] = value;
    setObjectives(copy);
  };
  const handleRemoveObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setError('User not authenticated.');
      return;
    }

    if (!proposalId) {
      setError('Proposal ID is required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // --- 1. Save or Update Tech Info ---
      const techInfoPayload = {
        rationale: formData.rationale || '',
        methodology: formData.methodology || '',
      };

      await addOrUpdateTechInfo(proposalId, techInfoPayload);

      // --- 2. Save Objectives ---
      if (objectives.length > 0) {
        const objectivesPayload = {
          proposal_id: proposalId,
          objectives,
        };
        await addObjectives(objectivesPayload);
      }

      // --- 3. Update local formData ---
      setFormData({ ...formData, objectives });

      // --- 4. Proceed to next step ---
      nextStep();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to save technical info.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500">{error}</p>}

      {/* Rationale */}
      <FormTextarea
        label="Rationale"
        name="rationale"
        value={formData.rationale || ''}
        onChange={(e) => setFormData({ ...formData, rationale: e.target.value })}
        placeholder="Describe the rationale and significance of the study"
        rows={5}
        required
      />
      {/* Methodology */}
      <FormTextarea
        label="Methodology"
        name="methodology"
        value={formData.methodology || ""}
        onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
        placeholder="Describe study design, participants, instruments, procedures, data analysis, etc."
        rows={5}
        required
      />

      {/* <FormInput
  label="Rationale"
  type="text"
  placeholder="Rationale"
  name="rationale"
  value={formData.rationale || ''}
  onChange={(e) => setFormData({ ...formData, rationale: e.target.value })}
  required
/> */}
      {/* <FormInput
                label="Methodology"
                type="text"
                placeholder="Methodology"
                name="methodology"
                value={formData.methodology || ''}
                onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
              /> */}

      {/* {objectives.map((obj, i) => (
        <div key={i} className="flex gap-2 items-center">
          <FormInput
            label={`Objective ${i + 1}`}
            placeholder="Objective"
            name={`objective-${i}`}
            type="text"
            value={obj}
            onChange={(e) => handleObjectiveChange(i, e.target.value)}
            required
          />
          <button
            type="button"
            className="text-red-500 text-sm"
            onClick={() => handleRemoveObjective(i)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddObjective}
        className="text-blue-500 text-sm border border-blue-300 px-2 py-1 rounded hover:bg-blue-50"
      >
        Add Objective
      </button> */}

      {/* Objectives handled by reusable section, bound to `objectives` state */}
      <ObjectivesSection
        data={{ objectives }}
        onChange={(d) => setObjectives(d.objectives)}
        minItems={1}
      />

      <div className="flex justify-between mt-4">
        <Button type="button" onClick={prevStep}>
          Back
        </Button>
        <FormButton className='bg-blue-600 rounded-md py-1 px-4 hover:bg-blue-700' type="submit">
          {loading ? 'Saving...' : 'Next'}
        </FormButton>
      </div>
    </form>
  );
};

export default TechnicalInfoPage;

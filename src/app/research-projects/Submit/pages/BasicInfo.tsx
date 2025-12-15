'use client';

import React, { useState } from 'react';
import FormButton from '@/component/ui/Button';
import FormInput from '@/component/ui/FormInput';
import { useAuth } from '@/context/AuthContext';
import { createProposal } from '@/utils/apiHelpers';

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: (proposalId: number) => void;
}

// Example commodity options
const commodityOptions = [
  "Agriculture",
  "Livestock",
  "Fisheries",
  "Forestry",
  "Food Processing",
];

const natureOptions = ["Program", "Project", "Study"];

const BasicInfoPage: React.FC<Props> = ({ formData, setFormData, nextStep }) => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError('User not authenticated.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        title: formData.title,
        commodity: formData.commodity,
        natureOfResearch: formData.natureOfResearch,
        location: formData.location,
        durationStart: formData.durationStart,
        durationEnd: formData.durationEnd,
        budget: parseFloat(formData.budget), // Convert to number
        mainProponent: formData.mainProponent,
        coProponentMain: formData.coProponentMain,
        user_id: userId,
      };

      const response = await createProposal(payload);
      const proposalId = response.data.proposal_id;

      nextStep(proposalId);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create proposal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500">{error}</p>}

      <FormInput
        label="Research Title"
        type="text"
        name="title"
        placeholder="Research Title"
        value={formData.title || ''}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <label className="flex flex-col">
        Commodity
        <select
          value={formData.commodity || ''}
          onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
          className="border p-2 rounded mt-1"
          required
        >
          <option value="" disabled>Select Commodity</option>
          {commodityOptions.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col">
        Nature of Research
        <select
          value={formData.natureOfResearch || ''}
          onChange={(e) => setFormData({ ...formData, natureOfResearch: e.target.value })}
          className="border p-2 rounded mt-1"
          required
        >
          <option value="" disabled>Select Nature</option>
          {natureOptions.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </label>

      <FormInput
        label="Project Location"
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location || ''}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        required
      />

      <FormInput
        label="Start Date"
        type="date"
        name="durationStart"
        value={formData.durationStart || ''}
        onChange={(e) => setFormData({ ...formData, durationStart: e.target.value })}
        required
      />

      <FormInput
        label="End Date"
        type="date"
        name="durationEnd"
        value={formData.durationEnd || ''}
        onChange={(e) => setFormData({ ...formData, durationEnd: e.target.value })}
        required
      />

      <FormInput
        label="Budget"
        type="number"
        name="budget"
        placeholder="Budget in PHP"
        value={formData.budget || ''}
        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
        min={0}
        step={0.01}
        required
      />

      <FormInput
        label="Main Proponent"
        type="text"
        name="mainProponent"
        placeholder="Main Proponent"
        value={formData.mainProponent || ''}
        onChange={(e) => setFormData({ ...formData, mainProponent: e.target.value })}
        required
      />

      <FormInput
        label="Co-Proponent"
        type="text"
        name="coProponentMain"
        placeholder="Co-Proponent"
        value={formData.coProponentMain || ''}
        onChange={(e) => setFormData({ ...formData, coProponentMain: e.target.value })}
      />

      <FormButton type="submit">
        {loading ? 'Submitting...' : 'Next'}
      </FormButton>
    </form>
  );
};

export default BasicInfoPage;

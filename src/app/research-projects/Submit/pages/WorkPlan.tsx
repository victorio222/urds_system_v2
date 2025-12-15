// 'use client';

// import React, { useState } from 'react';
// import FormInput from '@/component/ui/FormInput';
// import FormButton from '@/component/ui/Button';
// import { Button } from '@mui/material';
// import { useAuth } from '@/context/AuthContext';
// import { addTechInfo, addObjectives } from '@/utils/apiHelpers'; // Ensure both exist

// interface Props {
//   formData: any;
//   setFormData: (data: any) => void;
//   nextStep: () => void;
//   prevStep: () => void;
//   proposalId: number; // Pass the created proposal ID from previous step
// }

// const WorkPlanPage: React.FC<Props> = ({ formData, setFormData, nextStep, prevStep, proposalId }) => {
//   const { userId } = useAuth(); // Logged-in user
//   const [objectives, setObjectives] = useState<string[]>(formData.objectives || ['']);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleAddObjective = () => setObjectives([...objectives, '']);
//   const handleObjectiveChange = (index: number, value: string) => {
//     const copy = [...objectives];
//     copy[index] = value;
//     setObjectives(copy);
//   };

//   const handleRemoveObjective = (index: number) => {
//     setObjectives(objectives.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!userId) {
//       setError('User not authenticated.');
//       return;
//     }

//     if (!proposalId) {
//       setError('Proposal ID is required.');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       // --- 1. Save Tech Info (Rationale + optional methodology) ---
//       const techInfoPayload = {
//         proposal_id: proposalId,
//         rationale: formData.rationale || '',
//         methodology: '', // empty string to avoid default value errors
//       };
//       await addTechInfo(techInfoPayload);

//       // --- 2. Save Objectives ---
//       if (objectives.length > 0) {
//         const objectivesPayload = {
//           proposal_id: proposalId,
//           objectives, // array of strings
//         };
//         await addObjectives(objectivesPayload);
//       }

//       // --- 3. Update local formData ---
//       setFormData({ ...formData, objectives });

//       // --- 4. Proceed to next step ---
//       nextStep();
//     } catch (err: any) {
//       console.error(err);
//       setError(err.response?.data?.error || 'Failed to save technical info.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Rationale */}
//       <FormInput
//         label="Rationale"
//         type="text"
//         placeholder="Rationale"
//         name="rationale"
//         value={formData.rationale || ''}
//         onChange={(e) => setFormData({ ...formData, rationale: e.target.value })}
//         required
//       />

//       {/* Objectives */}
//       {objectives.map((obj, i) => (
//         <div key={i} className="flex gap-2 items-center">
//           <FormInput
//             label={`Objective ${i + 1}`}
//             placeholder="Objective"
//             name={`objective-${i}`}
//             type="text"
//             value={obj}
//             onChange={(e) => handleObjectiveChange(i, e.target.value)}
//             required
//           />
//           <button
//             type="button"
//             className="text-red-500 text-sm"
//             onClick={() => handleRemoveObjective(i)}
//           >
//             Remove
//           </button>
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={handleAddObjective}
//         className="text-blue-500 text-sm border border-blue-300 px-2 py-1 rounded hover:bg-blue-50"
//       >
//         Add Objective
//       </button>

//       <div className="flex justify-between mt-4">
//         <Button type="button" onClick={prevStep}>
//           Back
//         </Button>
//         <FormButton type="submit">
//           {loading ? 'Saving...' : 'Next'}
//         </FormButton>
//       </div>
//     </form>
//   );
// };

// export default WorkPlanPage;

"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@mui/material";
import FormButton from "@/component/ui/Button";
import FormInput from "@/component/ui/FormInput";
import { useAuth } from "@/context/AuthContext";

type Quarter = "Q1" | "Q2" | "Q3" | "Q4";

type WorkPlanRow = {
  activityNo: number;
  activityText: string;
  quarters: Record<Quarter, boolean>;
};

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  proposalId: number;
}

/** Fixed activities based on UEP-URDS-FM-004 Workplan (Year 1) */
const DEFAULT_ACTIVITIES: Array<{ no: number; text: string }> = [
  {
    no: 1,
    text:
      "Conduct consultation with the client (Head of instruction of the two external campuses, college secretaries, department chairs, and laboratory school principals);",
  },
  { no: 2, text: "Presentation and approval of the research study;" },
  {
    no: 3,
    text: "Assess the effectiveness of the existing workload computation template;",
  },
  { no: 4, text: "Procurement of equipment and materials;" },
  {
    no: 5,
    text:
      "Follow up Interviews and focus group discussions with the head of instruction of the two external campuses, college secretaries, department chairs, and laboratory school principals;",
  },
  { no: 6, text: "Conduct preliminary Investigation and detailed data gathering;" },
  { no: 7, text: "Analyze and assess the scope and requirements of the research study;" },
  { no: 8, text: "Conduct the System Development Life Cycle;" },
  {
    no: 9,
    text:
      "Conduct Training to the head of instruction of the two external campuses, college secretaries, department chairs, and laboratory school principals.",
  },
  {
    no: 10,
    text:
      "Conduct an assessment on the acceptability of the Workload Computation System through survey;",
  },
  {
    no: 11,
    text:
      "Write terminal report, present completed extension project, write, and publish paper.",
  },
];

function buildDefaultRows(): WorkPlanRow[] {
  return DEFAULT_ACTIVITIES.map((a) => ({
    activityNo: a.no,
    activityText: a.text,
    quarters: { Q1: false, Q2: false, Q3: false, Q4: false },
  }));
}

/** Circle-looking multi-select checkbox */
const CircleCheck = ({
  checked,
  onToggle,
  ariaLabel,
}: {
  checked: boolean;
  onToggle: () => void;
  ariaLabel: string;
}) => {
  return (
    <label className="inline-flex items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="peer sr-only"
        aria-label={ariaLabel}
      />
      <span
        className="
          h-5 w-5 rounded-full border-2 border-slate-300 bg-white
          transition
          peer-checked:border-blue-600 peer-checked:bg-blue-600
          peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400 peer-focus-visible:ring-offset-2
        "
      />
    </label>
  );
};

const WorkPlanPage: React.FC<Props> = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  proposalId,
}) => {
  const { userId } = useAuth();

  // Fixed rows only (no adding/removing)
  const [rows, setRows] = useState<WorkPlanRow[]>(
    Array.isArray(formData?.workPlan?.rows) ? formData.workPlan.rows : buildDefaultRows()
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const header = useMemo(() => {
    return {
      programTitle: formData?.workPlan?.programTitle ?? formData?.title ?? "",
      leader: formData?.workPlan?.leader ?? formData?.mainProponent ?? "",
      collegeUnitCampus: formData?.workPlan?.collegeUnitCampus ?? "",
      year: 1,
    };
  }, [formData]);

  const toggleQuarter = (idx: number, q: Quarter) => {
    const copy = [...rows];
    copy[idx] = {
      ...copy[idx],
      quarters: { ...copy[idx].quarters, [q]: !copy[idx].quarters[q] },
    };
    setRows(copy);
  };

  const handleHeaderChange = (key: "programTitle" | "leader" | "collegeUnitCampus", value: string) => {
    setFormData({
      ...formData,
      workPlan: {
        ...(formData.workPlan || {}),
        [key]: value,
        year: 1,
        rows, // keep rows synced
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setError("User not authenticated.");
      return;
    }

    if (!proposalId) {
      setError("Proposal ID is required.");
      return;
    }

    const hasAnyChecked = rows.some(
      (r) => r.quarters.Q1 || r.quarters.Q2 || r.quarters.Q3 || r.quarters.Q4
    );

    if (!hasAnyChecked) {
      setError("Please mark at least one quarter in the work plan.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        proposal_id: proposalId,
        programTitle: header.programTitle,
        leader: header.leader,
        collegeUnitCampus: header.collegeUnitCampus,
        year: 1,
        rows,
      };

      // If you already have an API endpoint, call it here:
      // await addWorkPlan(payload);

      // Save into wizard formData
      setFormData({
        ...formData,
        workPlan: {
          programTitle: header.programTitle,
          leader: header.leader,
          collegeUnitCampus: header.collegeUnitCampus,
          year: 1,
          rows,
        },
      });

      nextStep();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to save work plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Top card */}
      <div className="rounded-xl border bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Work Plan</h2>
            <p className="text-sm text-slate-500">
              Select the quarter(s) where each activity will be conducted (Year 1).
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700">
            YEAR 1
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

      
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-[950px] w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="border-b px-4 py-3 text-left font-semibold text-slate-700 w-[70px]">
                  #
                </th>
                <th className="border-b px-4 py-3 text-left font-semibold text-slate-700">
                  Activities
                </th>
                {(["Q1", "Q2", "Q3", "Q4"] as Quarter[]).map((q) => (
                  <th
                    key={q}
                    className="border-b px-4 py-3 text-center font-semibold text-slate-700 w-[90px]"
                  >
                    {q}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((r, idx) => (
                <tr
                  key={r.activityNo}
                  className="border-b last:border-b-0 hover:bg-slate-50/60"
                >
                  <td className="px-4 py-3 align-top text-slate-700">
                    {r.activityNo}.
                  </td>

                  <td className="px-4 py-3 align-top text-slate-700">
                    <div className="leading-relaxed">{r.activityText}</div>
                  </td>

                  {(["Q1", "Q2", "Q3", "Q4"] as Quarter[]).map((q) => (
                    <td key={q} className="px-4 py-3 text-center align-top">
                      <CircleCheck
                        checked={!!r.quarters[q]}
                        onToggle={() => toggleQuarter(idx, q)}
                        ariaLabel={`Activity ${r.activityNo} ${q}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* small footer note */}
        <div className="border-t bg-white px-4 py-3 text-xs text-slate-500">
          Tip: You can select multiple quarters for the same activity.
        </div>
      </div>

      {/* Nav buttons */}
      <div className="flex justify-between">
        <Button type="button" onClick={prevStep} variant="outlined">
          Back
        </Button>

        <FormButton type="submit">
          {loading ? "Saving..." : "Next"}
        </FormButton>
      </div>
    </form>
  );
};

export default WorkPlanPage;

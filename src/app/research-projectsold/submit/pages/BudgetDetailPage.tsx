"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@mui/material";
import FormInput from "@/component/ui/FormInput";
import FormTextarea from "@/component/ui/FormTextArea";
import FormButton from "@/component/ui/Button";
import { useAuth } from "@/context/AuthContext";
// import { addBudgetDetails } from "@/utils/apiHelpers";

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  prevStep: () => void;
  nextStep?: () => void;
  proposalId: number;
  onSubmit?: (finalData: any) => void; // optional callback for final submission
}

/** ---------- Types for each section ---------- */

interface PersonalServiceRow {
  item: string; // e.g., "Honorarium"
  q1: number | "";
  q2: number | "";
  q3: number | "";
  q4: number | "";
}

interface TravelRow {
  date: string;
  place: string;
  purpose: string;
  mode: string;
  estimatedCost: number | "";
}

interface SupplyRow {
  date: string;
  unit: string;
  description: string;
  purpose: string;
  qty: number | "";
  unitCost: number | "";
}

interface CommunicationRow {
  date: string;
  nature: string;
  purpose: string;
  qty: number | "";
  unitCost: number | "";
}

interface OtherMOOERow {
  date: string;
  jobDescription: string;
  purpose: string;
  daysOrCost: string;
  estimatedCost: number | "";
}

interface EquipmentRow {
  date: string;
  unit: string;
  description: string;
  purpose: string;
  qty: number | "";
  unitCost: number | "";
}

const BudgetDetailsPage: React.FC<Props> = ({
  formData,
  setFormData,
  prevStep,
  nextStep,
  proposalId,
  onSubmit,
}) => {
  const { userId } = useAuth();

  /** Header */
  const [title, setTitle] = useState(
    formData.budgetTitle ?? formData.title ?? ""
  );
  const [proponents, setProponents] = useState(
    formData.budgetProponents ?? formData.mainProponent ?? ""
  );
  const [duration, setDuration] = useState(
    formData.budgetDuration ?? "1 Year"
  );

  /** I. Personal Services */
  const [personal, setPersonal] = useState<PersonalServiceRow[]>(
    formData.personalServices ?? [
      { item: "Wages", q1: "", q2: "", q3: "", q4: "" },
      { item: "Honorarium", q1: "", q2: "", q3: "", q4: "" },
    ]
  );

  /** II. MOOE - Travel */
  const [travels, setTravels] = useState<TravelRow[]>(
    formData.mooeTravel ?? [
      { date: "", place: "", purpose: "", mode: "", estimatedCost: "" },
    ]
  );

  /** II. MOOE - Supplies & Materials */
  const [supplies, setSupplies] = useState<SupplyRow[]>(
    formData.mooeSupplies ?? [
      {
        date: "",
        unit: "",
        description: "",
        purpose: "",
        qty: "",
        unitCost: "",
      },
    ]
  );

  /** II. MOOE - Communications */
  const [communications, setCommunications] = useState<CommunicationRow[]>(
    formData.mooeCommunications ?? [
      {
        date: "",
        nature: "",
        purpose: "",
        qty: "",
        unitCost: "",
      },
    ]
  );

  /** II. Other MOOE (Contract labor) */
  const [otherMOOE, setOtherMOOE] = useState<OtherMOOERow[]>(
    formData.mooeOther ?? [
      {
        date: "",
        jobDescription: "",
        purpose: "",
        daysOrCost: "",
        estimatedCost: "",
      },
    ]
  );

  /** III. Equipment Outlay */
  const [equipment, setEquipment] = useState<EquipmentRow[]>(
    formData.equipmentOutlay ?? [
      {
        date: "",
        unit: "",
        description: "",
        purpose: "",
        qty: "",
        unitCost: "",
      },
    ]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** ---------- Derived totals ---------- */

  const personalTotals = useMemo(() => {
    const year1 = personal.reduce((sum, r) => {
      const totalQ =
        (Number(r.q1 || 0) +
          Number(r.q2 || 0) +
          Number(r.q3 || 0) +
          Number(r.q4 || 0)) || 0;
      return sum + totalQ;
    }, 0);
    return { year1, grand: year1 };
  }, [personal]);

  const travelTotal = useMemo(
    () =>
      travels.reduce(
        (sum, r) => sum + Number(r.estimatedCost || 0),
        0
      ),
    [travels]
  );

  const suppliesTotal = useMemo(
    () =>
      supplies.reduce(
        (sum, r) => sum + Number(r.qty || 0) * Number(r.unitCost || 0),
        0
      ),
    [supplies]
  );

  const commTotal = useMemo(
    () =>
      communications.reduce(
        (sum, r) => sum + Number(r.qty || 0) * Number(r.unitCost || 0),
        0
      ),
    [communications]
  );

  const otherMOOETotal = useMemo(
    () =>
      otherMOOE.reduce(
        (sum, r) => sum + Number(r.estimatedCost || 0),
        0
      ),
    [otherMOOE]
  );

  const mooeTotal = travelTotal + suppliesTotal + commTotal + otherMOOETotal;

  const equipmentTotal = useMemo(
    () =>
      equipment.reduce(
        (sum, r) => sum + Number(r.qty || 0) * Number(r.unitCost || 0),
        0
      ),
    [equipment]
  );

  const grandTotal = personalTotals.grand + mooeTotal + equipmentTotal;

  /** ---------- Helpers to update rows ---------- */

  const updatePersonal = (
    index: number,
    field: keyof PersonalServiceRow,
    value: string
  ) => {
    const copy = [...personal];
    // numeric fields
    if (field === "q1" || field === "q2" || field === "q3" || field === "q4") {
      copy[index][field] = value === "" ? "" : Number(value);
    } else {
      copy[index][field] = value as any;
    }
    setPersonal(copy);
  };

  const updateArray = <T,>(
    arr: T[],
    setArr: (rows: T[]) => void,
    index: number,
    field: keyof T,
    value: string
  ) => {
    const copy = [...arr];
    // best-effort numeric detection
    const isNumField =
      /cost|qty|amount|unitCost/i.test(field as string) ||
      field === "estimatedCost";
    (copy[index] as any)[field] =
      value === "" ? "" : isNumField ? Number(value) : value;
    setArr(copy);
  };

  const addRow = <T,>(arr: T[], setArr: (rows: T[]) => void, emptyRow: T) => {
    setArr([...arr, emptyRow]);
  };

  const removeRow = <T,>(arr: T[], setArr: (rows: T[]) => void, index: number) => {
    if (arr.length === 1) return;
    setArr(arr.filter((_, i) => i !== index));
  };

  /** ---------- Submit ---------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setError("User not authenticated.");
      return;
    }

    if (!proposalId) {
      setError("Proposal ID is missing.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        proposal_id: proposalId,
        title,
        proponents,
        duration,
        personal,
        travels,
        supplies,
        communications,
        otherMOOE,
        equipment,
        totals: {
          personal: personalTotals.grand,
          mooe: mooeTotal,
          equipment: equipmentTotal,
          grandTotal,
        },
      };

      // await addBudgetDetails(payload);

          setFormData({
        ...formData,
        budgetDetails: payload,
      });

      // If parent provided an onSubmit handler (final step), call it instead of moving to the next step
      if (typeof onSubmit === "function") {
        onSubmit(payload);
      } else if (typeof nextStep === "function") {
        nextStep();
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.error || "Failed to save financial components."
      );
    } finally {
      setLoading(false);
    }
  };

  /** ---------- Render ---------- */

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="rounded-xl border bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-800">
          Financial Components of the Research
        </h2>
        <p className="text-sm text-slate-500">
          Budgetary Details of the Research (by category and year).
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormInput
            label="Program / Project / Study Title"
            type="text"
            name="budgetTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
          <FormInput
            label="Proponents"
            type="text"
            name="budgetProponents"
            value={proponents}
            onChange={(e) => setProponents(e.target.value)}
            placeholder="Enter proponents"
            required
          />
          <FormInput
            label="Duration"
            type="text"
            name="budgetDuration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 1 Year"
            required
          />
        </div>
      </div>

      {/* I. PERSONAL SERVICES */}
      <section className="rounded-xl border bg-white p-5">
        <h3 className="mb-3 text-sm font-semibold text-slate-800">
          I. Personal Services
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="border-b px-3 py-2 text-left font-semibold text-slate-700">
                  Item
                </th>
                {["Q1", "Q2", "Q3", "Q4"].map((q) => (
                  <th
                    key={q}
                    className="border-b px-3 py-2 text-right font-semibold text-slate-700"
                  >
                    {q}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {personal.map((row, i) => (
                <tr key={row.item} className="border-b last:border-b-0">
                  <td className="px-3 py-2 font-medium text-slate-700">
                    {row.item}
                  </td>
                  {(["q1", "q2", "q3", "q4"] as const).map((field) => (
                    <td key={field} className="px-3 py-2 text-right">
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        value={row[field]}
                        onChange={(e) =>
                          updatePersonal(i, field, e.target.value)
                        }
                        className="w-full rounded border px-2 py-1 text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-right text-sm font-semibold text-slate-800">
          Total Personal Services (Year 1):{" "}
          <span className="text-blue-600">
            ₱ {personalTotals.year1.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </span>
        </p>
      </section>

      {/* II. MOOE - Travel */}
      <section className="rounded-xl border bg-white p-5">
        <h3 className="mb-3 text-sm font-semibold text-slate-800">
          II. MOOE – Travel
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Date (Q/M/Y)", "Places to be Visited", "Purpose", "Mode of Transport", "Estimated Cost"].map(
                  (h) => (
                    <th
                      key={h}
                      className="border-b px-3 py-2 text-left font-semibold text-slate-700"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {travels.map((row, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.date}
                      onChange={(e) =>
                        updateArray(travels, setTravels, i, "date", e.target.value)
                      }
                      className="w-full rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.place}
                      onChange={(e) =>
                        updateArray(travels, setTravels, i, "place", e.target.value)
                      }
                      className="w-full rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <FormTextarea
                      label=""
                      name={`travel-purpose-${i}`}
                      value={row.purpose}
                      onChange={(e) =>
                        updateArray(
                          travels,
                          setTravels,
                          i,
                          "purpose" as any,
                          e.target.value
                        )
                      }
                      rows={2}
                      placeholder="Purpose"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.mode}
                      onChange={(e) =>
                        updateArray(travels, setTravels, i, "mode", e.target.value)
                      }
                      className="w-full rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-2 text-right">
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={row.estimatedCost}
                      onChange={(e) =>
                        updateArray(
                          travels,
                          setTravels,
                          i,
                          "estimatedCost" as any,
                          e.target.value
                        )
                      }
                      className="w-full rounded border px-2 py-1 text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-2 flex justify-between text-sm text-slate-600">
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() =>
              addRow(travels, setTravels, {
                date: "",
                place: "",
                purpose: "",
                mode: "",
                estimatedCost: "",
              })
            }
          >
            + Add travel row
          </button>
          <span>
            Total Travel:{" "}
            <span className="font-semibold text-blue-600">
              ₱ {travelTotal.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
            </span>
          </span>
        </div>
      </section>

      {/* II. MOOE – Supplies & Materials, Communications, Other MOOE, III. Equipment */}
      {/* For brevity, structure is the same pattern: table + addRow/removeRow + totals.
         You can replicate the pattern above for each of supplies, communications, otherMOOE, equipment,
         using the fields from the PDF. */}

      {/* Grand total */}
      <section className="rounded-xl border bg-white p-4">
        <p className="text-right text-sm font-semibold text-slate-800">
          GRAND TOTAL:{" "}
          <span className="text-blue-700">
            ₱ {grandTotal.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </span>
        </p>
      </section>

      {/* Navigation */}
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

export default BudgetDetailsPage; 


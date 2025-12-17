// import React, { useState, useEffect } from "react";
// import { X, Calendar, Package, Users, FileText } from "lucide-react";

// // Updated Interface
// export interface BatchEntry {
//   id: number;
//   batchId: string;
//   commodity: string;
//   proposals: number;
//   panels: number;
//   schedule: string;
//   status: "New" | "Approved" | "Ongoing"; // Added Approved
// }

// interface EditBatchModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   batch: BatchEntry | null;
//   onSave: (updatedBatch: BatchEntry) => void;
// }

// const COMMODITY_OPTIONS = ["Rice", "Corn", "Vegetables", "Fisheries", "Livestock"];

// const EditBatchModal: React.FC<EditBatchModalProps> = ({ 
//   isOpen, 
//   onClose, 
//   batch, 
//   onSave 
// }) => {
//   const [formData, setFormData] = useState<BatchEntry | null>(null);

//   useEffect(() => {
//     setFormData(batch);
//   }, [batch]);

//   if (!isOpen || !formData) return null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (formData) {
//       onSave(formData);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
//       <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
        
//         <div className="mb-6 flex items-center justify-between">
//           <h3 className="text-lg font-bold text-slate-800">Edit Batch Details</h3>
//           <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 transition-colors">
//             <X size={20} />
//           </button>
//         </div>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
          
//           {/* Batch ID */}
//           <div>
//             <label className="mb-1 block text-xs font-bold text-slate-500 uppercase">Batch ID</label>
//             <input type="text" value={formData.batchId} disabled className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-500 cursor-not-allowed"/>
//           </div>

//           {/* Commodity */}
//           <div>
//             <label className="mb-1 block text-xs font-bold text-slate-500 uppercase">Commodity</label>
//             <div className="relative">
//               <Package className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" size={16} />
//               <select
//                 value={formData.commodity}
//                 onChange={(e) => setFormData({...formData, commodity: e.target.value})}
//                 className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-700 outline-none appearance-none cursor-pointer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
//               >
//                 <option value="" disabled>Select Commodity</option>
//                 {COMMODITY_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
//               </select>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="flex gap-4">
//             <div className="flex-1">
//               <label className="mb-1 block text-xs font-bold text-slate-500 uppercase">Proposals</label>
//               <div className="relative">
//                 <FileText className="absolute left-3 top-2.5 text-slate-400" size={16} />
//                 <input type="number" min="0" value={formData.proposals} onChange={(e) => setFormData({...formData, proposals: Number(e.target.value)})} className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-2 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"/>
//               </div>
//             </div>
//             <div className="flex-1">
//               <label className="mb-1 block text-xs font-bold text-slate-500 uppercase">Panels</label>
//               <div className="relative">
//                 <Users className="absolute left-3 top-2.5 text-slate-400" size={16} />
//                 <input type="number" min="0" value={formData.panels} onChange={(e) => setFormData({...formData, panels: Number(e.target.value)})} className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-2 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"/>
//               </div>
//             </div>
//           </div>

//           {/* Schedule */}
//           <div>
//             <label className="mb-1 block text-xs font-bold text-slate-500 uppercase">Schedule</label>
//             <div className="relative">
//               <Calendar className="absolute left-3 top-2.5 text-slate-400" size={16} />
//               <input type="date" value={formData.schedule} onChange={(e) => setFormData({...formData, schedule: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"/>
//             </div>
//           </div>

//           {/* Status (Updated Options) */}
//           <div>
//             <label className="mb-1 block text-xs font-bold text-slate-500 uppercase">Status</label>
//             <select
//               value={formData.status}
//               onChange={(e) => setFormData({...formData, status: e.target.value as any})}
//               className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none appearance-none cursor-pointer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
//             >
//               <option value="New">New</option>
//               <option value="Approved">Approved</option>
//               <option value="Ongoing">Ongoing</option>
//             </select>
//           </div>

//           <div className="mt-6 flex gap-3 pt-2">
//             <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
//             <button type="submit" className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-colors">Save Changes</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditBatchModal;

import React, { useState, useEffect } from "react";
import { 
  X, 
  Calendar, 
  Package, 
  Users, 
  FileText, 
  Trash2, 
  AlertTriangle,
  LayoutList,
  Info
} from "lucide-react";

// --- Interfaces ---

export interface BatchEntry {
  id: number;
  batchId: string;
  commodity: string;
  proposals: number;
  panels: number;
  schedule: string;
  status: "New" | "Approved" | "Ongoing";
}

interface Proposal {
  id: number;
  title: string;
  researcher: string;
}

interface EditBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  batch: BatchEntry | null;
  onSave: (updatedBatch: BatchEntry) => void;
}

const COMMODITY_OPTIONS = ["Rice", "Corn", "Vegetables", "Fisheries", "Livestock"];

// Mock Data Generator for Proposals (Since we don't have a real backend here)
const generateMockProposals = (count: number, commodity: string): Proposal[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: 100 + i,
    title: `Research on ${commodity} variant ${String.fromCharCode(65 + i)}`,
    researcher: `Dr. Researcher ${i + 1}`
  }));
};

const EditBatchModal: React.FC<EditBatchModalProps> = ({ 
  isOpen, 
  onClose, 
  batch, 
  onSave 
}) => {
  const [formData, setFormData] = useState<BatchEntry | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "proposals">("general");
  
  // State for Proposal Management
  const [proposalList, setProposalList] = useState<Proposal[]>([]);
  const [proposalToDelete, setProposalToDelete] = useState<Proposal | null>(null); // For Confirmation Modal

  // Initialize Data
  useEffect(() => {
    if (batch) {
      setFormData(batch);
      // Generate mock proposals based on the batch count
      setProposalList(generateMockProposals(batch.proposals, batch.commodity));
      setActiveTab("general"); // Reset tab on open
    }
  }, [batch]);

  // Update proposal count in formData whenever list changes
  useEffect(() => {
    if (formData) {
      setFormData(prev => prev ? { ...prev, proposals: proposalList.length } : null);
    }
  }, [proposalList.length]);

  if (!isOpen || !formData) return null;

  // --- Handlers ---

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
    }
  };

  const initiateDelete = (proposal: Proposal) => {
    setProposalToDelete(proposal);
  };

  const confirmDelete = () => {
    if (proposalToDelete) {
      setProposalList(prev => prev.filter(p => p.id !== proposalToDelete.id));
      setProposalToDelete(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl scale-100 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* --- Header --- */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-lg font-bold text-slate-800">Edit Batch Details</h3>
          <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* --- Tabs --- */}
        <div className="flex items-center gap-1 border-b border-slate-100 px-6 pt-2">
          <button
            onClick={() => setActiveTab("general")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-all ${
              activeTab === "general" 
                ? "border-indigo-600 text-indigo-600" 
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <Info size={16} /> General Info
          </button>
          <button
            onClick={() => setActiveTab("proposals")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-all ${
              activeTab === "proposals" 
                ? "border-indigo-600 text-indigo-600" 
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            <LayoutList size={16} /> Manage Proposals
            <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
              {proposalList.length}
            </span>
          </button>
        </div>
        
        {/* --- Content Area --- */}
        <div className="p-6 overflow-y-auto">
          <form id="editBatchForm" onSubmit={handleSubmit} className="space-y-4">
            
            {/* 1. GENERAL TAB */}
            {activeTab === "general" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-200">
                
                {/* Batch ID */}
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-500 uppercase">Batch ID</label>
                  <input type="text" value={formData.batchId} disabled className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-500 cursor-not-allowed"/>
                </div>

                {/* Commodity */}
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-500 uppercase">Commodity</label>
                  <div className="relative">
                    <Package className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" size={16} />
                    <select
                      value={formData.commodity}
                      onChange={(e) => setFormData({...formData, commodity: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-700 outline-none appearance-none cursor-pointer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    >
                      <option value="" disabled>Select Commodity</option>
                      {COMMODITY_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-bold text-slate-500 uppercase">Proposals</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-2.5 text-slate-400" size={16} />
                      {/* Read Only because it is controlled by the list now */}
                      <input 
                        type="number" 
                        value={formData.proposals} 
                        readOnly
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-2 py-2.5 text-sm font-bold text-slate-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-bold text-slate-500 uppercase">Panels</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-2.5 text-slate-400" size={16} />
                      <input type="number" min="0" value={formData.panels} onChange={(e) => setFormData({...formData, panels: Number(e.target.value)})} className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-2 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"/>
                    </div>
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-500 uppercase">Schedule</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 text-slate-400" size={16} />
                    <input type="date" value={formData.schedule} onChange={(e) => setFormData({...formData, schedule: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"/>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-500 uppercase">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none appearance-none cursor-pointer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  >
                    <option value="New">New</option>
                    <option value="Approved">Approved</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>
              </div>
            )}

            {/* 2. PROPOSALS TAB */}
            {activeTab === "proposals" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-200">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500 flex items-start gap-2">
                   <Info size={16} className="shrink-0 mt-0.5" />
                   <p>Removing a proposal here will update the total count. Changes are finalized when you click "Save Changes".</p>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="min-w-full text-left">
                    <thead className="bg-slate-100 text-xs font-bold text-slate-500 uppercase">
                      <tr>
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Researcher</th>
                        <th className="px-4 py-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {proposalList.length > 0 ? (
                        proposalList.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 text-xs font-bold text-slate-400">#{p.id}</td>
                            <td className="px-4 py-3 text-xs font-bold text-slate-700">{p.title}</td>
                            <td className="px-4 py-3 text-xs text-slate-500">{p.researcher}</td>
                            <td className="px-4 py-3 text-center">
                              <button 
                                type="button"
                                onClick={() => initiateDelete(p)}
                                className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-4 py-8 text-center text-xs text-slate-400 italic">
                            No proposals remaining in this batch.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </form>
        </div>

        {/* --- Footer --- */}
        <div className="flex gap-3 border-t border-slate-100 px-6 py-4">
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            // We connect the external button to the form submission
            onClick={handleSubmit}
            className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-colors"
          >
            Save Changes
          </button>
        </div>

      </div>

      {/* --- Delete Confirmation Modal (Nested) --- */}
      {proposalToDelete && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-[1px] p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl scale-100 animate-in zoom-in-95 border border-red-100">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500 mx-auto">
              <AlertTriangle size={24} />
            </div>
            <h4 className="text-center text-lg font-bold text-slate-800">Remove Proposal?</h4>
            <p className="mt-2 text-center text-sm text-slate-500">
              Are you sure you want to remove <span className="font-bold text-slate-700">"{proposalToDelete.title}"</span> from this batch?
            </p>
            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => setProposalToDelete(null)}
                className="flex-1 rounded-xl border border-slate-200 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 rounded-xl bg-red-500 py-2 text-sm font-bold text-white hover:bg-red-600 shadow-md shadow-red-200"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EditBatchModal;
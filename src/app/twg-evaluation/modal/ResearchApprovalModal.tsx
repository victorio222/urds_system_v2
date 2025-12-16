// ResearchApprovalModal.tsx
"use client";
import React from "react";
import Modal from "@/component/ui/Modal"; 
import { BiCheckCircle } from "react-icons/bi"; // Icon for the checkmark

interface ResearchApprovalModalProps {
    opened: boolean;
    onClose: () => void;
    itemName: string; // Halimbawa: "Batch-002 Proposal"
    onApprove: () => void;
    onDecline: () => void;
}

const ResearchApprovalModal: React.FC<ResearchApprovalModalProps> = ({
    opened,
    onClose,
    itemName,
    onApprove,
    onDecline,
}) => {

    return (
        <Modal opened={opened} onClose={onClose} title="Research Approval">
            <div className="p-6 text-center">
                
                {/* Confirmation Icon (Teal Checkmark) */}
                <div className="flex justify-center mb-4">
                    <BiCheckCircle size={60} className="text-teal-500" /> 
                </div>

                <p className="text-lg font-semibold text-gray-800 mb-6">
                    Please confirm the approval status of the research proposal batch: 
                    <span className="block mt-1 text-xl font-bold">{itemName}</span>
                </p>

                {/* Action Buttons */}
                <div className="flex justify-center gap-50">
                    <button
                        onClick={() => {
                            onDecline();
                            onClose();
                        }}
                        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-150 flex items-center gap-1"
                    >
                        ❌ Decline
                    </button>
                    <button
                        onClick={() => {
                            onApprove();
                            onClose();
                        }}
                        className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150 flex items-center gap-1"
                    >
                        ✅ Approve
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ResearchApprovalModal;
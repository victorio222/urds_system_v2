"use client";
import React, { useState } from "react";
// Assuming you have a reusable Modal component
import Modal from "@/component/ui/Modal"; 

interface RequestRevisionModalProps {
    opened: boolean;
    onClose: () => void;
    // Pwedeng kunin ang data ng item na kailangan ng revision, hal. Item ID
    itemId: number | null; 
    // Function na tatawagin kapag na-submit ang feedback/request
    onSubmit: (itemId: number, feedback: string) => void;
}

const RequestRevisionModal: React.FC<RequestRevisionModalProps> = ({
    opened,
    onClose,
    itemId,
    onSubmit,
}) => {
    const [feedback, setFeedback] = useState('');

    const handleSave = () => {
        if (itemId !== null && feedback.trim() !== '') {
            onSubmit(itemId, feedback.trim());
            // I-reset at isara ang modal
            setFeedback('');
            onClose();
        } else {
            // Optional: Magpakita ng error kung walang feedback
            alert("Please input feedback before submitting the revision request.");
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Comment/Feedback" // Title base sa iyong larawan
        >
            <div className="space-y-4 pt-2">
                
                {/* Textarea para sa Input Feedback (Gaya ng sa Screenshot 2025-12-15 231059.png) */}
                <textarea
                    id="feedback-input"
                    rows={8}
                    placeholder="Input Feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 transition"
                />

                {/* Save Changes Button */}
                <div className="flex justify-start pt-2">
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default RequestRevisionModal;
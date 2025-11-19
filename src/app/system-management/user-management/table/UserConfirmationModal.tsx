"use client";
import React from "react";
import Modal from "@/component/ui/Modal";
import { BiX } from "react-icons/bi"; // Icon for closing the modal, typically used inside the modal body or title bar

// Interface para sa data ng user na ipapakita sa profile modal
interface UserProfileData {
  fullName: string;
  position: string;
  accountStatus: "Pending" | "Active" | "Inactive";
  gender: string;
  emailAddress: string;
  campus: string;
  collegeDepartment: string;
}

// Default data para gayahin ang larawan
const defaultProfileData: UserProfileData = {
  fullName: "Jake Turner",
  position: "Faculty Researcher",
  accountStatus: "Pending",
  gender: "Male",
  emailAddress: "johndoe@sample.com",
  campus: "UEP - Main Campus",
  collegeDepartment: "N/A",
};

interface UserConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  // Maaari mong ipasa ang user data dito, o gamitin ang default data
  userData?: UserProfileData; 
  onApprove: () => void;
  onNotEligible: () => void;
}

const UserConfirmationModal: React.FC<UserConfirmationModalProps> = ({
  opened,
  onClose,
  userData = defaultProfileData,
  onApprove,
  onNotEligible,
}) => {
  
  // Helper function para sa status styling
  const getStatusStyle = (status: UserProfileData['accountStatus']) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600 font-semibold';
      case 'Active':
        return 'text-green-600 font-semibold';
      default:
        return 'text-gray-600';
    }
  };

  // Content Structure
  const ProfileDetailRow = ({ label, value, isStatus = false }: { label: string; value: string; isStatus?: boolean }) => (
    <div className="flex text-sm mb-2">
      <span className="w-1/3 text-gray-500">{label}:</span>
      <span className={`w-2/3 text-black font-medium ${isStatus ? getStatusStyle(value as UserProfileData['accountStatus']) : ''}`}>
        {value}
      </span>
    </div>
  );

  return (
    <Modal opened={opened} onClose={onClose} title="User Profile">
      <div className="p-4 pt-2">
        <div className="flex space-x-6">
          
          {/* Left Side: Profile Image Placeholder */}
          <div className="flex-shrink-0 w-40 h-40 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <svg className="w-10 h-10 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span className="text-sm">Profile Image</span>
            </div>
          </div>

          {/* Right Side: User Details */}
          <div className="flex-grow space-y-2">
            <ProfileDetailRow label="Full Name" value={userData.fullName} />
            <ProfileDetailRow label="Position" value={userData.position} />
            <ProfileDetailRow label="Account Status" value={userData.accountStatus} isStatus={true} />
            <ProfileDetailRow label="Gender" value={userData.gender} />
            <ProfileDetailRow label="Email Address" value={userData.emailAddress} />
            <ProfileDetailRow label="Campus" value={userData.campus} />
            <ProfileDetailRow label="College Department" value={userData.collegeDepartment} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t mt-4 border-gray-100">
          <button
            onClick={() => {
              onNotEligible();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-150"
          >
            ❌ Not Eligible
          </button>
          <button
            onClick={() => {
              onApprove();
              onClose();
            }}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-150"
          >
            ✅ Approve
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserConfirmationModal;
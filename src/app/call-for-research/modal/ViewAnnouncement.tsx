"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/component/ui/Modal";
import { Announcement } from "@/types/announcements";
import { getCampuses, getColleges } from "@/utils/apiHelpers";

interface ViewAnnouncementModalProps {
  opened: boolean;
  onClose: () => void;
  announcement: Announcement | null;
}

interface Campus {
  id: string;
  name: string;
}

interface College {
  id: string;
  name: string;
}

const ViewAnnouncementModal: React.FC<ViewAnnouncementModalProps> = ({
  opened,
  onClose,
  announcement,
}) => {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDropdownData = async () => {
      setLoading(true);
      try {
        const [campusRes, collegeRes] = await Promise.all([
          getCampuses(),
          getColleges(),
        ]);

        setCampuses(
          (campusRes.data || []).map((c: any) => ({
            id: c.campus_id.toString(),
            name: c.campus_name,
          }))
        );

        setColleges(
          (collegeRes.data || []).map((c: any) => ({
            id: c.college_id.toString(),
            name: c.college_name,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch campuses/colleges:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownData();
  }, []);

  if (!announcement) return null;

  const target = announcement.targets && announcement.targets[0];

  const getCampusName = (id: number | null | undefined) =>
    id != null
      ? campuses.find((c) => c.id === id.toString())?.name || "N/A"
      : "N/A";

  const getCollegeName = (id: number | null | undefined) =>
    id != null
      ? colleges.find((c) => c.id === id.toString())?.name || "N/A"
      : "N/A";

  return (
    <Modal opened={opened} onClose={onClose} title="Announcement Details">
      {loading ? (
        <div className="flex justify-center py-8 text-blue-600">Loading...</div>
      ) : (
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <div className="w-full capitalize text-slate-700 px-2 py-1 border-b border-gray-300 text-sm bg-gray-50 break-words">
              {announcement.title}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="w-full capitalize text-slate-700 px-2 py-1 border-b border-gray-300 text-sm bg-gray-50 break-words whitespace-pre-wrap">
              {announcement.content}
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <div className="w-full capitalize text-slate-700 px-2 py-1 border-b border-gray-300 text-sm bg-gray-50 break-words">
              {announcement.type || "N/A"}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="w-full px-2 capitalize text-slate-700 py-1 border-b border-gray-300 text-sm bg-gray-50 break-words">
              {announcement.status}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <div className="w-full capitalize text-slate-700 px-2 py-1 border-b border-gray-300 text-sm bg-gray-50">
                {new Date(announcement.start_date).toLocaleDateString()}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <div className="w-full capitalize text-slate-700 px-2 py-1 border-b border-gray-300 text-sm bg-gray-50">
                {new Date(announcement.end_date).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Audience */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Campus
              </label>
              <div className="w-full capitalize text-slate-700 px-2 py-1 border-b border-gray-300 text-sm bg-gray-50 break-words">
                {getCampusName(target?.campus_id)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                College
              </label>
              <div className="w-full capitalize text-slate-700 px-2 py-1 border-b border-gray-300 text-sm bg-gray-50 break-words">
                {getCollegeName(target?.college_id)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Specific Audience
              </label>
              <div className="w-full capitalize text-slate-700 px-2 py-1 border-b border-gray-300 text-sm bg-gray-50 break-words">
                {target?.audience || "N/A"}
              </div>
            </div>
          </div>

          {/* Attachment */}
          {announcement.attachment && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Attachment
              </label>
              <div className="mt-1">
                <a
                  href={announcement.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm break-words"
                >
                  View File
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ViewAnnouncementModal;

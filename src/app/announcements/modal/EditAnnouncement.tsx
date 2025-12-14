"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState, useCallback } from "react";
import Modal from "@/component/ui/Modal";
import { Announcement } from "@/types/announcements";
import { BiLoaderAlt } from "react-icons/bi";
import { updateAnnouncement, getCampuses, getColleges } from "@/utils/apiHelpers";

interface EditAnnouncementModalProps {
  opened: boolean;
  onClose: () => void;
  announcement: Announcement | null;
  onUpdateSuccess: () => void;
}

interface EditFormData {
  title: string;
  content: string;
  type: string;
  status: "Draft" | "Active" | "Expired";
  start_date: string;
  end_date: string;
  campusId: string;
  collegeId: string;
  audience: string;
  attachment: string;
}

interface Campus {
  id: string;
  name: string;
}

interface College {
  id: string;
  name: string;
}

const EditAnnouncementModal: React.FC<EditAnnouncementModalProps> = ({
  opened,
  onClose,
  announcement,
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState<EditFormData>({
    title: "",
    content: "",
    type: "",
    status: "Draft",
    start_date: "",
    end_date: "",
    campusId: "",
    collegeId: "",
    audience: "",
    attachment: "",
  });
  const [loading, setLoading] = useState(false);
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [dropdownLoading, setDropdownLoading] = useState(true);

  // Load campuses and colleges
  const fetchDropdownData = useCallback(async () => {
    setDropdownLoading(true);
    try {
      const [campusRes, collegeRes] = await Promise.all([getCampuses(), getColleges()]);
      setCampuses((campusRes.data || []).map((c: any) => ({
        id: c.campus_id.toString(),
        name: c.campus_name,
      })));
      setColleges((collegeRes.data || []).map((c: any) => ({
        id: c.college_id.toString(),
        name: c.college_name,
      })));
    } catch (err) {
      console.error("Failed to load dropdown data:", err);
    } finally {
      setDropdownLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDropdownData();
  }, [fetchDropdownData]);

  // Load announcement data into form
  useEffect(() => {
    if (announcement) {
      const target = announcement.targets && announcement.targets[0];
      setFormData({
        title: announcement.title,
        content: announcement.content,
        type: announcement.type || "",
        status: announcement.status,
        start_date: announcement.start_date?.split("T")[0] || "",
        end_date: announcement.end_date?.split("T")[0] || "",
        campusId: target?.campus_id?.toString() || "",
        collegeId: target?.college_id?.toString() || "",
        audience: target?.audience || "",
        attachment: announcement.attachment || "",
      });
    }
  }, [announcement]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    let key = id as keyof EditFormData;
    if (id === "description") key = "content";
    if (id === "purpose") key = "type";
    if (id === "validFrom") key = "start_date";
    if (id === "validUntil") key = "end_date";
    if (id === "statusSelect") key = "status";
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!announcement) return;

    setLoading(true);
    try {
      const target =
        formData.campusId || formData.collegeId || formData.audience
          ? {
              campus_id: formData.campusId ? parseInt(formData.campusId, 10) : null,
              college_id: formData.collegeId ? parseInt(formData.collegeId, 10) : null,
              audience: formData.audience || null,
            }
          : null;

      const payload = { ...formData, ...(target && { targets: [target] }) };

      await updateAnnouncement(announcement.announcement_id.toString(), payload);
      onUpdateSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to update:", err);
      alert("Failed to update announcement.");
    } finally {
      setLoading(false);
    }
  };

  if (!announcement) {
    return (
      <Modal opened={opened} onClose={onClose} title="Edit Announcement">
        <div className="flex justify-center py-8">
          <BiLoaderAlt size={30} className="animate-spin text-blue-600" />
        </div>
      </Modal>
    );
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Announcement">
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
              placeholder="Announcement Title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={formData.content}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
              placeholder="Enter announcement details..."
            />
          </div>

          {/* Dates & Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Valid From</label>
              <input
                id="validFrom"
                type="date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Valid Until</label>
              <input
                id="validUntil"
                type="date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="statusSelect"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Purpose</label>
            <select
              id="purpose"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
            >
              <option value="">Select Announcement Type</option>
              <option value="Research">Call for Research Proposal</option>
              <option value="Evaluation">In-House Evaluation</option>
            </select>
          </div>

          {/* Audience (Campus / College / Audience) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Audience (Optional)</label>
            <div className="text-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Campus Dropdown */}
              <select
                id="campusId"
                value={formData.campusId}
                onChange={handleChange}
                disabled={dropdownLoading}
                className="col-span-1 w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
              >
                <option value="">Select Campus</option>
                {dropdownLoading ? (
                  <option disabled>Loading...</option>
                ) : (
                  campuses.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))
                )}
              </select>

              {/* College Dropdown */}
              <select
                id="collegeId"
                value={formData.collegeId}
                onChange={handleChange}
                disabled={dropdownLoading}
                className="col-span-1 w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
              >
                <option value="">Select College</option>
                {dropdownLoading ? (
                  <option disabled>Loading...</option>
                ) : (
                  colleges.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))
                )}
              </select>

              {/* Audience Text */}
              <input
                id="audience"
                type="text"
                placeholder="Specific Audience"
                value={formData.audience}
                onChange={handleChange}
                className="col-span-1 w-full px-3 py-2.5 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition duration-150 ease-in-out"
              />
            </div>
          </div>

          {/* Attachment */}
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700">Upload Files</label>
            <p className="text-xs text-gray-500 mb-2">Select and upload files of your choice</p>
            <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
              <div className="text-2xl text-gray-400 mb-2">📎</div>
              <p className="text-sm text-gray-500 mb-1">Choose a file or drag and drop it here</p>
              <p className="text-xs text-gray-400 mb-4">JPEG, PDF, and DOCS formats, up to 50MB</p>
              <button
                type="button"
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition duration-150"
              >
                Browse Files
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="text-sm bg-blue-600 text-white font-normal px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-150 cursor-pointer"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditAnnouncementModal;

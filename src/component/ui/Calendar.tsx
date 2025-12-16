"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FiChevronLeft, FiChevronRight, FiHome } from "react-icons/fi";
import api from "@/utils/apiHelpers";
import Modal from "@/component/ui/Modal";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  content?: string;
  type?: string;
  attachment?: string;
  status?: string;
  color?: string;
}

// --- Custom Toolbar ---
interface CustomToolbarProps {
  label: string;
  onNavigate: (action: "TODAY" | "PREV" | "NEXT" | "DATE") => void;
  onView: (view: "month" | "week" | "day") => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ label, onNavigate, onView }) => (
  <div className="flex flex-col sm:flex-row items-center justify-between mb-2 px-2 gap-2">
    <div className="flex items-center gap-2">
      <button onClick={() => onNavigate("TODAY")} className="p-1 hover:bg-gray-200 rounded">
        <FiHome size={18} />
      </button>
      <button onClick={() => onNavigate("PREV")} className="p-1 hover:bg-gray-200 rounded">
        <FiChevronLeft size={18} />
      </button>
      <button onClick={() => onNavigate("NEXT")} className="p-1 hover:bg-gray-200 rounded">
        <FiChevronRight size={18} />
      </button>
    </div>

    <span className="font-bold text-center">{label}</span>

    <div className="flex items-center gap-2">
      <button onClick={() => onView("month")} className="px-2 py-1 hover:bg-gray-200 rounded text-sm sm:text-base">
        Month
      </button>
      <button onClick={() => onView("week")} className="px-2 py-1 hover:bg-gray-200 rounded text-sm sm:text-base">
        Week
      </button>
      <button onClick={() => onView("day")} className="px-2 py-1 hover:bg-gray-200 rounded text-sm sm:text-base">
        Day
      </button>
    </div>
  </div>
);

const URDSCalendar: React.FC<{ heightPercent?: number }> = ({ heightPercent = 70 }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAnnouncements = useCallback(async () => {
    try {
      const response = await api.getAnnouncements();
      const data = response.data || [];
      const colors = ["#ef4444", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899", "#22c55e", "#2563eb"];
      const formattedEvents = data.map((item: any) => ({
        id: item.announcement_id,
        title: item.title,
        start: new Date(item.start_date),
        end: new Date(item.end_date || item.start_date),
        description: item.content,
        type: item.type,
        status: item.status,
        attachment: item.attachment,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleSelectEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => setIsModalOpen(false);

  const eventStyleGetter = (event: Event) => ({
    style: {
      backgroundColor: event.color || "#3b82f6",
      borderRadius: "6px",
      color: "white",
      border: "none",
      display: "block",
      padding: "2px 6px",
      fontSize: "0.85rem",
    },
  });

  const getTypeLabel = (type?: string) => {
    if (type === "Research") return "Call for Research Proposal";
    if (type === "Evaluation") return "In House Review Schedule Announcement";
    return type || "";
  };

  return (
    <div className="h-full p-4 flex flex-col bg-blue-50">
      <div className="flex-1 bg-blue-500 rounded-md shadow-sm overflow-auto" style={{ maxHeight: `${heightPercent}vh` }}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", minHeight: 400, backgroundColor: "white", color: "#334155" }}
          onSelectEvent={handleSelectEvent}
          selectable
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          defaultView={Views.MONTH}
          toolbar
          components={{ toolbar: CustomToolbar }}
          popup
          eventPropGetter={eventStyleGetter}
        />
      </div>

      {isModalOpen && selectedEvent && (
        <Modal opened={isModalOpen} onClose={handleCloseModal} title={"Announcement"}>
          <div className="space-y-3">
            <div className="border-b border-gray-300 pb-3">
              <div>
              <span className="font-semibold text-gray-700">Purpose:</span>
              <span className="text-gray-900 ml-1">{getTypeLabel(selectedEvent.type)}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-700">Start Date:</span>
                <p className="text-gray-900">{selectedEvent.start.toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-700">Deadline:</span>
                <p className="text-gray-900">{selectedEvent.end.toLocaleDateString()}</p>
              </div>
            </div>
            </div>
<div>
              <span className="font-semibold text-gray-700">Title:</span>
              <span className="text-gray-900 ml-1 capitalize">{getTypeLabel(selectedEvent.title)}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Content:</span>
              <p className="mt-1 text-gray-800 whitespace-pre-line capitalize">{selectedEvent.description}</p>
            </div>
            {selectedEvent.attachment && (
              <div>
                <span className="font-semibold text-gray-700">Attachment:</span>
                <a
                  href={selectedEvent.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline block mt-1"
                >
                  View Attachment
                </a>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default URDSCalendar;

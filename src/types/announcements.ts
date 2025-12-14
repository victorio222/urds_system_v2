export interface AnnouncementTarget {
  target_id: number;
  announcement_id: number;
  campus_id: number | null;
  college_id: number | null;
  audience: string | null;
  start_date: string;
  end_date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  announcement_id: number;
  title: string;
  content: string;
  type?: string;
  posted_by: number;
  start_date: string;
  end_date: string;
  attachment?: string;
  status: "Active" | "Expired" | "Draft";
  created_at: string;
  updatedAt: string;
  targets?: AnnouncementTarget[]; // Added targets array
}

export interface TableAnnouncementEntry extends Announcement {
  id: number;
  sequential_id: number;
}
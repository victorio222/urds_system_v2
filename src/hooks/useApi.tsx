// src/hooks/useApi.ts
import {
  getUsers as apiGetUsers,
  createUser as apiCreateUser,
  updateUser as apiUpdateUser,
  getRoles as apiGetRoles,
  login as apiLogin,
  signup as apiSignup,
  changePassword as apiChangePassword,
  getCampuses as apiGetCampuses,
  getColleges as apiGetColleges,
  getAnnouncements as apiGetAnnouncements,
  getAnnouncementById as apiGetAnnouncementById,
  createAnnouncement as apiCreateAnnouncement,
  updateAnnouncement as apiUpdateAnnouncement,
  deleteAnnouncement as apiDeleteAnnouncement,
  uploadFile as apiUploadFile
} from "@/utils/apiHelpers";

/**
 * Custom hook to expose all API functions for cookie-based auth.
 * No token needed—authentication is handled via secure cookies.
 */
export const useApi = () => {
  // --- USERS ---
  const getUsers = () => apiGetUsers();
  const createUser = (data: any) => apiCreateUser(data);
  const updateUser = (id: string, data: any) => apiUpdateUser(id, data);
  const getRoles = () => apiGetRoles();

  // --- AUTHENTICATION ---
  const login = apiLogin;
  const signup = apiSignup;
  const changePassword = (data: any) => apiChangePassword(data);

  // --- CAMPUSES & COLLEGES ---
  const getCampuses = () => apiGetCampuses();
  const getColleges = () => apiGetColleges();

  // --- ANNOUNCEMENTS ---
  const getAnnouncements = () => apiGetAnnouncements();
  const getAnnouncementById = (id: string) => apiGetAnnouncementById(id);
  const createAnnouncement = (data: any) => apiCreateAnnouncement(data);
  const updateAnnouncement = (id: string, data: any) => apiUpdateAnnouncement(id, data);
  const deleteAnnouncement = (id: string) => apiDeleteAnnouncement(id);

  // --- FILES ---
  const uploadFile = (formData: FormData) => apiUploadFile(formData);

  return {
    // Users
    getUsers,
    createUser,
    updateUser,
    getRoles,
    // Auth
    login,
    signup,
    changePassword,
    // Campuses/Colleges
    getCampuses,
    getColleges,
    // Announcements
    getAnnouncements,
    getAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    // Files
    uploadFile,
  };
};

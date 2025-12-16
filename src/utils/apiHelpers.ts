// import axios, { AxiosInstance } from "axios";
// import config from "./config"; // Assumed to contain apiUrl

// /**
//  * Creates an Axios instance with default headers.
//  * @param useCredentials - Set to true for authenticated calls to enable cookie handling (HttpOnly JWT).
//  * @param isFormData - Set to true for multipart/form-data uploads.
//  */
// const createApiClient = (useCredentials = false, isFormData = false): AxiosInstance => {
//     const headers: Record<string, string> = {
//         Accept: "*/*",
//         "Content-Type": isFormData ? "multipart/form-data" : "application/json",
//     };

//     const instance = axios.create({
//         baseURL: config.apiUrl,
//         headers,

//         // Enable cookie handling based on the flag
//         withCredentials: useCredentials,
//     });

//     // Optional: Add interceptors for handling response errors
//     instance.interceptors.response.use(
//         (response) => response,
//         (error) => {
//             console.error("API Error:", error.response?.data || error.message);
//             return Promise.reject(error);
//         }
//     );

//     return instance;
// };

// // Centralized API client setup for public/unauthenticated and authenticated endpoints

// /**
//  * General API client for public/unauthenticated endpoints.
//  * Does NOT include credentials (useCredentials: false)
//  */
// export const apiPublic = createApiClient(false);

// /**
//  * API client for ALL authenticated endpoints.
//  * Includes credentials (useCredentials: true) to send/receive the secure cookie.
//  */
// export const apiAuth = createApiClient(true);

// /**
//  * API client for multipart/form-data (uploads).
//  * Includes credentials (useCredentials: true) for authentication.
//  */
// export const apiFormData = () => createApiClient(true, true);

// /**
//  * ----------------------------------------------------------------------
//  * Specific API Endpoints (removed token arguments)
//  * ----------------------------------------------------------------------
//  */

// /**
//  * USERS (All use the secure apiAuth client)
//  */

// // GET USERS
// export const getUsers = () => apiAuth.get("/user");

// // ADD USER
// export const createUser = (data: any) => apiAuth.post("/user/add", data);

// // UPDATE USER
// export const updateUser = (id: string, data: any) => apiAuth.put(`/user/${id}`, data);

// // USER ROLES
// export const getRoles = () => apiAuth.get(`/roles`);

// /**
//  * AUTHENTICATION
//  */

// // Login (Request is public, but the response sets the secure cookie)
// export const login = (data: any) => apiPublic.post("/auth/signin", data, {
//   withCredentials: true,  // Ensures credentials (cookies) are handled correctly for CORS
// });

// // Logout (Must hit the backend to clear the secure cookie)
// export const logout = () => apiAuth.post("/auth/logout");

// export const signup = (data: any) => apiPublic.post("/auth/register", data);

// // Change Password (Uses the secure client)
// export const changePassword = (data: any) => apiAuth.put("/auth/change-password", data);

// /**
//  * CAMPUSES & COLLEGES (All use the secure apiAuth client)
//  */

// // GET CAMPUS
// export const getCampuses = () => apiAuth.get("/campuses");

// // GET COLLEGES
// export const getColleges = () => apiAuth.get("/colleges");

// /**
//  * ANNOUNCEMENTS (All use the secure apiAuth client)
//  */

// // GET ALL ANNOUNCEMENTS
// export const getAnnouncements = () => apiAuth.get("/announcement");

// // GET ANNOUNCEMENT BY ID
// export const getAnnouncementById = (id: string) => apiAuth.get(`/announcement/${id}`);

// // ADD ANNOUNCEMENT
// export const createAnnouncement = (data: any) => apiAuth.post("/announcement/add", data);

// // UPDATE ANNOUNCEMENT
// export const updateAnnouncement = (id: string, data: any) => apiAuth.put(`/announcement/update/${id}`, data);

// // DELETE ANNOUNCEMENT
// export const deleteAnnouncement = (id: string) => apiAuth.delete(`/announcement/delete/${id}`);

// /**
//  * PROPOSALS
//  */
// export const getProposals = () => apiAuth.get("/proposals");
// export const getProposalById = (id: string) => apiAuth.get(`/proposals/${id}`);
// export const createProposal = (data: any) => apiAuth.post("/proposals/add", data);
// export const updateProposal = (id: string, data: any) => apiAuth.put(`/proposals/update/${id}`, data);
// export const deleteProposal = (id: string) => apiAuth.delete(`/proposals/delete/${id}`);
// export const finalizeProposal = (id: string, data: any) => apiAuth.put(`/proposals/finalize/${id}`, data);

// /**
//  * TECH INFO
//  */
// export const addTechInfo = (data: any) => apiAuth.post("/proposals/tech-info/add", data);
// export const getTechInfo = (proposalId: string) => apiAuth.get(`/proposals/tech-info/${proposalId}`);
// export const updateTechInfoMethodology = (
//   proposalId: number,
//   methodology: string
// ) => {
//   return apiAuth.put(`/proposals/tech-info/update/${proposalId}`, {
//     methodology,
//   });
// };

// export const addOrUpdateTechInfo = async (proposalId: number, data: { rationale: string; methodology?: string }) => {
//   if (!proposalId) throw new Error('Proposal ID is required');

//   // Always include proposal_id in payload
//   const payload = { proposal_id: proposalId, ...data };

//   return apiAuth.put(`/proposals/tech-info/update/${proposalId}`, payload);
// };
// /**
//  * OBJECTIVES
//  */
// export const addObjectives = (data: any) => apiAuth.post("/proposals/objectives/add", data);
// export const getObjectives = (proposalId: string) => apiAuth.get(`/proposals/objectives/${proposalId}`);

// /**
//  * REVIEW OF RELATED LITERATURE (RRL)
//  */
// export const addReviewLiterature = (data: any) => apiAuth.post("/proposals/review-literature/add", data);
// export const addMultipleReviews = (data: any[]) =>
//   apiAuth.post("/proposals/review-literature/add-multiple", data);
// export const getReviews = (proposalId: string) =>
//   apiAuth.get(`/proposals/review-literature/${proposalId}`);
// export const deleteReviews = (reviewId: string) =>
//   apiAuth.delete(`/proposals/review-literature/${reviewId}`);

// export const getMethodologyById = (id: string) => apiAuth.get(`/proposals/methodology/${id}`);
// export const addMethodology = (data: any) => apiAuth.post("/proposals/methodology/add", data);

// // Example: File Upload
// export const uploadFile = (formData: FormData) => apiFormData().post("/upload", formData);

// export default {
//   getUsers,
//   createUser,
//   updateUser,
//   getRoles,
//   login,
//   logout,
//   signup,
//   changePassword,
//   getCampuses,
//   getColleges,
//   getAnnouncements,
//   getAnnouncementById,
//   createAnnouncement,
//   updateAnnouncement,
//   deleteAnnouncement,
//   getProposals,
//   getProposalById,
//   createProposal,
//   updateProposal,
//   deleteProposal,
//   finalizeProposal,
//   addTechInfo,
//   getTechInfo,
//   addObjectives,
//   getObjectives,
//   addReviewLiterature,
//   addMultipleReviews,
//   getReviews,
//   deleteReviews,
//   addMethodology,
//   getMethodologyById,
//   uploadFile,
// };

// import axios, { AxiosInstance, AxiosError } from "axios";
// import config from "./config";

// /* ======================================================
//    REFRESH TOKEN QUEUE (PREVENT MULTIPLE REFRESH CALLS)
// ====================================================== */
// let isRefreshing = false;
// let failedQueue: {
//   resolve: (value?: unknown) => void;
//   reject: (reason?: any) => void;
// }[] = [];

// const processQueue = (error: any = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(true);
//   });
//   failedQueue = [];
// };

// /* ======================================================
//    AXIOS CLIENT FACTORY
// ====================================================== */
// const createApiClient = (
//   useCredentials = false,
//   isFormData = false
// ): AxiosInstance => {
//   const instance = axios.create({
//     baseURL: config.apiUrl,
//     withCredentials: useCredentials,
//     headers: {
//       Accept: "*/*",
//       "Content-Type": isFormData
//         ? "multipart/form-data"
//         : "application/json",
//     },
//   });

//   /* ======================================================
//      RESPONSE INTERCEPTOR (AUTO REFRESH)
//   ====================================================== */
//   instance.interceptors.response.use(
//     (response) => response,
//     async (error: AxiosError) => {
//       const originalRequest: any = error.config;

//       if (
//         error.response?.status === 401 &&
//         !originalRequest?._retry &&
//         useCredentials
//       ) {
//         originalRequest._retry = true;

//         // If refresh is already running, queue request
//         if (isRefreshing) {
//           return new Promise((resolve, reject) => {
//             failedQueue.push({ resolve, reject });
//           }).then(() => instance(originalRequest));
//         }

//         isRefreshing = true;

//         try {
//           // 🔁 Refresh session (cookie-based)
//           await axios.post(
//             `${config.apiUrl}/auth/refresh`,
//             {},
//             { withCredentials: true }
//           );

//           processQueue();
//           return instance(originalRequest);
//         } catch (refreshError) {
//           processQueue(refreshError);

//           // Hard logout on refresh failure
//           if (typeof window !== "undefined") {
//             window.location.href = "/urds/auth/login";
//           }

//           return Promise.reject(refreshError);
//         } finally {
//           isRefreshing = false;
//         }
//       }

//       return Promise.reject(error);
//     }
//   );

//   return instance;
// };

// /* ======================================================
//    AXIOS INSTANCES (UNCHANGED NAMING)
// ====================================================== */

// // Public / unauthenticated
// export const apiPublic = createApiClient(false);

// // Authenticated (cookies enabled)
// export const apiAuth = createApiClient(true);

// // Multipart uploads (cookies enabled)
// export const apiFormData = () => createApiClient(true, true);

// /* ======================================================
//    AUTH (UNCHANGED)
// ====================================================== */

// export const login = (data: any) =>
//   apiPublic.post("/auth/signin", data, {
//     withCredentials: true,
//   });

// export const logout = () => apiAuth.post("/auth/logout");

// export const signup = (data: any) =>
//   apiPublic.post("/auth/register", data);

// export const changePassword = (data: any) =>
//   apiAuth.put("/auth/change-password", data);

// // Restore session
// export const getMe = () => apiAuth.get("/auth/me");

// /* ======================================================
//    USERS & ROLES
// ====================================================== */

// export const getUsers = () => apiAuth.get("/user");
// export const createUser = (data: any) => apiAuth.post("/user/add", data);
// export const updateUser = (id: string, data: any) =>
//   apiAuth.put(`/user/${id}`, data);
// export const getRoles = () => apiAuth.get("/roles");

// /* ======================================================
//    CAMPUSES & COLLEGES
// ====================================================== */

// export const getCampuses = () => apiAuth.get("/campuses");
// export const getColleges = () => apiAuth.get("/colleges");

// /* ======================================================
//    ANNOUNCEMENTS
// ====================================================== */

// export const getAnnouncements = () => apiAuth.get("/announcement");
// export const getAnnouncementById = (id: string) =>
//   apiAuth.get(`/announcement/${id}`);
// export const createAnnouncement = (data: any) =>
//   apiAuth.post("/announcement/add", data);
// export const updateAnnouncement = (id: string, data: any) =>
//   apiAuth.put(`/announcement/update/${id}`, data);
// export const deleteAnnouncement = (id: string) =>
//   apiAuth.delete(`/announcement/delete/${id}`);

// /* ======================================================
//    PROPOSALS
// ====================================================== */

// export const getProposals = () => apiAuth.get("/proposals");
// export const getProposalById = (id: string) =>
//   apiAuth.get(`/proposals/${id}`);
// export const createProposal = (data: any) =>
//   apiAuth.post("/proposals/add", data);
// export const updateProposal = (id: string, data: any) =>
//   apiAuth.put(`/proposals/update/${id}`, data);
// export const deleteProposal = (id: string) =>
//   apiAuth.delete(`/proposals/delete/${id}`);
// export const finalizeProposal = (id: string, data: any) =>
//   apiAuth.put(`/proposals/finalize/${id}`, data);

// /* ======================================================
//    TECH INFO
// ====================================================== */

// export const addTechInfo = (data: any) =>
//   apiAuth.post("/proposals/tech-info/add", data);

// export const getTechInfo = (proposalId: string) =>
//   apiAuth.get(`/proposals/tech-info/${proposalId}`);

// export const addOrUpdateTechInfo = (
//   proposalId: number,
//   data: { rationale: string; methodology?: string }
// ) => {
//   if (!proposalId) throw new Error("Proposal ID is required");
//   return apiAuth.put(`/proposals/tech-info/update/${proposalId}`, {
//     proposal_id: proposalId,
//     ...data,
//   });
// };

// /* ======================================================
//    OBJECTIVES
// ====================================================== */

// export const addObjectives = (data: any) =>
//   apiAuth.post("/proposals/objectives/add", data);

// export const getObjectives = (proposalId: string) =>
//   apiAuth.get(`/proposals/objectives/${proposalId}`);

// /* ======================================================
//    REVIEW OF RELATED LITERATURE
// ====================================================== */

// export const addReviewLiterature = (data: any) =>
//   apiAuth.post("/proposals/review-literature/add", data);

// export const addMultipleReviews = (data: any[]) =>
//   apiAuth.post("/proposals/review-literature/add-multiple", data);

// export const getReviews = (proposalId: string) =>
//   apiAuth.get(`/proposals/review-literature/${proposalId}`);

// export const deleteReviews = (reviewId: string) =>
//   apiAuth.delete(`/proposals/review-literature/${reviewId}`);

// /* ======================================================
//    METHODOLOGY
// ====================================================== */

// export const getMethodologyById = (id: string) =>
//   apiAuth.get(`/proposals/methodology/${id}`);

// export const addMethodology = (data: any) =>
//   apiAuth.post("/proposals/methodology/add", data);

// /* ======================================================
//    FILE UPLOAD
// ====================================================== */

// export const uploadFile = (formData: FormData) =>
//   apiFormData().post("/upload", formData);

// /* ======================================================
//    DEFAULT EXPORT (UNCHANGED)
// ====================================================== */
// export default {
//   login,
//   logout,
//   signup,
//   changePassword,
//   getMe,
//   getUsers,
//   createUser,
//   updateUser,
//   getRoles,
//   getCampuses,
//   getColleges,
//   getAnnouncements,
//   getAnnouncementById,
//   createAnnouncement,
//   updateAnnouncement,
//   deleteAnnouncement,
//   getProposals,
//   getProposalById,
//   createProposal,
//   updateProposal,
//   deleteProposal,
//   finalizeProposal,
//   addTechInfo,
//   getTechInfo,
//   addObjectives,
//   getObjectives,
//   addReviewLiterature,
//   addMultipleReviews,
//   getReviews,
//   deleteReviews,
//   addMethodology,
//   getMethodologyById,
//   uploadFile,
// };

import axios, { AxiosInstance, AxiosError } from "axios";
import config from "./config";

/* ======================================================
   REFRESH TOKEN QUEUE (PREVENT MULTIPLE REFRESH CALLS)
====================================================== */
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(true);
  });
  failedQueue = [];
};

/* ======================================================
   AXIOS CLIENT FACTORY
====================================================== */
const createApiClient = (
  useCredentials = false,
  isFormData = false
): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.apiUrl,
    withCredentials: useCredentials,
    headers: {
      Accept: "*/*",
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
  });

  /* ======================================================
     RESPONSE INTERCEPTOR (AUTO REFRESH)
  ====================================================== */
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest: any = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest?._retry &&
        useCredentials
      ) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => instance(originalRequest));
        }

        isRefreshing = true;

        try {
          await axios.post(
            `${config.apiUrl}/auth/refresh`,
            {},
            { withCredentials: true }
          );

          processQueue();
          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError);

          if (typeof window !== "undefined") {
            window.location.href = "/urds/auth/login";
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

/* ======================================================
   AXIOS INSTANCES
====================================================== */
export const apiPublic = createApiClient(false);
export const apiAuth = createApiClient(true);
export const apiFormData = () => createApiClient(true, true);

/* ======================================================
   AUTH ROUTES
====================================================== */
export const signup = (data: any) => apiPublic.post("/auth/register", data);

export const login = (data: any) =>
  apiPublic.post("/auth/signin", data, { withCredentials: true });

export const logout = () => apiAuth.post("/auth/logout");

export const getMe = () => apiAuth.get("/auth/me");

export const changePassword = (data: any) =>
  apiAuth.put("/auth/change-password", data);

/* ======================================================
   USERS & ROLES
====================================================== */
export const getUsers = () => apiAuth.get("/user");
export const createUser = (data: any) => apiAuth.post("/user/add", data);
export const updateUser = (id: string, data: any) =>
  apiAuth.put(`/user/${id}`, data);
export const getRoles = () => apiAuth.get("/roles");

/* ======================================================
   CAMPUSES & COLLEGES
====================================================== */
export const getCampuses = () => apiAuth.get("/campuses");
export const getColleges = () => apiAuth.get("/colleges");

/* ======================================================
   ANNOUNCEMENTS
====================================================== */
export const getAnnouncements = () => apiAuth.get("/announcement");
export const getAnnouncementById = (id: string) =>
  apiAuth.get(`/announcement/${id}`);
export const createAnnouncement = (data: any) =>
  apiAuth.post("/announcement/add", data);
export const updateAnnouncement = (id: string, data: any) =>
  apiAuth.put(`/announcement/update/${id}`, data);
export const deleteAnnouncement = (id: string) =>
  apiAuth.delete(`/announcement/delete/${id}`);

/* ======================================================
   PROPOSALS
====================================================== */
export const getProposals = () => apiAuth.get("/proposals");
export const getProposalById = (id: string) => apiAuth.get(`/proposals/${id}`);
export const createProposal = (data: any) =>
  apiAuth.post("/proposals/add", data);
export const updateProposal = (id: string, data: any) =>
  apiAuth.put(`/proposals/update/${id}`, data);
export const deleteProposal = (id: string) =>
  apiAuth.delete(`/proposals/delete/${id}`);
export const finalizeProposal = (id: string, data: any) =>
  apiAuth.put(`/proposals/finalize/${id}`, data);

/* ======================================================
   TECH INFO
====================================================== */
export const addTechInfo = (data: any) =>
  apiAuth.post("/proposals/tech-info/add", data);
export const getTechInfo = (proposalId: string) =>
  apiAuth.get(`/proposals/tech-info/${proposalId}`);
export const addOrUpdateTechInfo = (
  proposalId: number,
  data: { rationale: string; methodology?: string }
) => {
  if (!proposalId) throw new Error("Proposal ID is required");
  return apiAuth.put(`/proposals/tech-info/update/${proposalId}`, {
    proposal_id: proposalId,
    ...data,
  });
};

/* ======================================================
   OBJECTIVES
====================================================== */
export const addObjectives = (data: any) =>
  apiAuth.post("/proposals/objectives/add", data);
export const getObjectives = (proposalId: string) =>
  apiAuth.get(`/proposals/objectives/${proposalId}`);

/* ======================================================
   REVIEW OF RELATED LITERATURE
====================================================== */
export const addReviewLiterature = (data: any) =>
  apiAuth.post("/proposals/review-literature/add", data);
export const addMultipleReviews = (data: any[]) =>
  apiAuth.post("/proposals/review-literature/add-multiple", data);
export const getReviews = (proposalId: string) =>
  apiAuth.get(`/proposals/review-literature/${proposalId}`);
export const deleteReviews = (reviewId: string) =>
  apiAuth.delete(`/proposals/review-literature/${reviewId}`);

/* ======================================================
   METHODOLOGY
====================================================== */
export const getMethodologyById = (id: string) =>
  apiAuth.get(`/proposals/methodology/${id}`);
export const addMethodology = (data: any) =>
  apiAuth.post("/proposals/methodology/add", data);

/* ======================================================
   FILE UPLOAD
====================================================== */
export const uploadFile = (formData: FormData) =>
  apiFormData().post("/upload", formData);

/* ======================================================
   DEFAULT EXPORT
====================================================== */
export default {
  signup,
  login,
  logout,
  getMe,
  changePassword,
  getUsers,
  createUser,
  updateUser,
  getRoles,
  getCampuses,
  getColleges,
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getProposals,
  getProposalById,
  createProposal,
  updateProposal,
  deleteProposal,
  finalizeProposal,
  addTechInfo,
  getTechInfo,
  addOrUpdateTechInfo,
  addObjectives,
  getObjectives,
  addReviewLiterature,
  addMultipleReviews,
  getReviews,
  deleteReviews,
  getMethodologyById,
  addMethodology,
  uploadFile,
};

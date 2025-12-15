// import createApiClient from "./apiClient";

// /**
//  * General API client without token (uses default authorization if present)
//  */
// export const api = createApiClient();

// /**
//  * API client with custom Bearer token
//  */
// export const apiWithToken = (token: string) => createApiClient(token);

// /**
//  * API client for multipart/form-data
//  */
// export const apiFormData = (token?: string) => createApiClient(token, true);

// /**
//  * Specific endpoints
//  */

// /**
//  * USERS
//  */

// // GET USERS
// export const getUsers = (token?: string) =>
//   apiWithToken(token ?? "").get("/user");

// // ADD USER
// export const createUser = (token: string, data: any) =>
//   apiWithToken(token ?? "").post("/user/add", data);

// // UPDATE USER
// export const updateUser = (token: string, id: string, data: any) =>
//   apiWithToken(token).put(`/user/${id}`, data);

// // USER ROLES
// export const getRoles = (token?: string) => 
//   apiWithToken(token ?? '').get(`/roles`)


// /**
//  * AUTHENTICATION
//  */

// // Authentication
// export const login = (data: any) => api.post("/auth/signin", data);
// export const signup = (data: any) => api.post("/auth/register", data);
// export const changePassword = (token: string, data: any) =>
//   apiWithToken(token).put("/auth/change-password", data);

// /**
//  * CAMPUSES & COLLEGES
//  */

// // GET CAMPUS
// export const getCampuses = (token?: string) => 
//   apiWithToken(token ?? "").get("/campuses");

// // GET COLLEGES
// export const getColleges = (token?: string) => 
//   apiWithToken(token ?? "").get("/colleges");

// /**
//  * ANNOUNCEMENTS
//  */

// // GET ALL ANNOUNCEMENTS
// export const getAnnouncements = (token?: string) => 
//   apiWithToken(token ?? "").get("/announcement");

// // GET ANNOUNCEMENT BY ID
// export const getAnnouncementById = (token: string, id: string) => 
//   apiWithToken(token).get(`/announcement/${id}`);

// // ADD ANNOUNCEMENT
// export const createAnnouncement = (token: string, data: any) =>
//   apiWithToken(token).post("/announcement/add", data);

// // UPDATE ANNOUNCEMENT
// export const updateAnnouncement = (token: string, id: string, data: any) =>
//   apiWithToken(token).put(`/announcement/update/${id}`, data);

// // DELETE ANNOUNCEMENT (Standard DELETE method is often included for completeness)
// export const deleteAnnouncement = (token: string, id: string) =>
//   apiWithToken(token).delete(`/announcement/delete/${id}`); // Assumes you add a DELETE route in your Express router

// // Example: File Upload
// export const uploadFile = (token: string, formData: FormData) =>
//   apiFormData(token).post("/upload", formData);

// // Fetch usage
// // import React, { useEffect, useState } from "react";
// // import { getUsers } from "@/utils/api";

// // const UsersPage = () => {
// //   const [users, setUsers] = useState<any[]>([]);

// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       const token = localStorage.getItem("authToken") || "";
// //       try {
// //         const res = await getUsers(token);
// //         setUsers(res.data);
// //       } catch (err) {
// //         console.error("Failed to fetch users:", err);
// //       }
// //     };

// //     fetchUsers();
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Users List</h1>
// //       <ul>
// //         {users.map(u => (
// //           <li key={u.id}>{u.name}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default UsersPage;

// // Login Usage
// // import React, { useState } from "react";
// // import { login } from "@/utils/api";

// // const LoginForm = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const handleLogin = async () => {
// //     try {
// //       const res = await login({ email, password });
// //       localStorage.setItem("authToken", res.data.token);
// //       alert("Logged in successfully!");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Login failed");
// //     }
// //   };

// //   return (
// //     <div>
// //       <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
// //       <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password"/>
// //       <button onClick={handleLogin}>Login</button>
// //     </div>
// //   );
// // };

// // export default LoginForm;

// // Update Usage
// // import React from "react";
// // import { updateUser } from "@/utils/api";

// // const UpdateUserButton = ({ userId, token }: { userId: string; token: string }) => {
// //   const handleUpdate = async () => {
// //     try {
// //       const res = await updateUser(token, userId, { firstName: "Updated Name" });
// //       alert("User updated: " + JSON.stringify(res.data));
// //     } catch (err) {
// //       console.error(err);
// //       alert("Update failed");
// //     }
// //   };

// //   return <button onClick={handleUpdate}>Update User</button>;
// // };

// // export default UpdateUserButton;

// // File Upload
// // import React, { useState } from "react";
// // import { uploadFile } from "@/utils/api";

// // const FileUpload = () => {
// //   const [file, setFile] = useState<File | null>(null);

// //   const handleUpload = async () => {
// //     if (!file) return;
// //     const token = localStorage.getItem("authToken") || "";
// //     const formData = new FormData();
// //     formData.append("file", file);

// //     try {
// //       const res = await uploadFile(token, formData);
// //       alert("Upload Success: " + JSON.stringify(res.data));
// //     } catch (err) {
// //       console.error("Upload failed", err);
// //     }
// //   };

// //   return (
// //     <div>
// //       <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
// //       <button onClick={handleUpload}>Upload</button>
// //     </div>
// //   );
// // };

// // export default FileUpload;




import createApiClient from "./apiClient";

// ----------------------------------------------------------------------
// 1. CENTRALIZED API CLIENTS (SECURE COOKIE SETUP)
//    - Assumes createApiClient(useCredentials: boolean, isFormData: boolean) signature
// ----------------------------------------------------------------------

/**
 * General API client for public/unauthenticated endpoints.
 * - Does NOT include credentials (useCredentials: false)
 */
export const apiPublic = createApiClient(false);

/**
 * API client for ALL authenticated endpoints.
 * - CRITICAL: Includes credentials (useCredentials: true) to send/receive the secure cookie.
 */
export const apiAuth = createApiClient(true);

/**
 * API client for multipart/form-data (uploads).
 * - CRITICAL: Includes credentials (useCredentials: true) for authentication.
 */
export const apiFormData = () => createApiClient(true, true);


/**
 * ----------------------------------------------------------------------
 * 2. SPECIFIC ENDPOINTS (REMOVED TOKEN ARGUMENTS)
 * ----------------------------------------------------------------------
 */

/**
 * USERS (All use the secure apiAuth client)
 */

// GET USERS
export const getUsers = () =>
  apiAuth.get("/user");

// ADD USER
export const createUser = (data: any) =>
  apiAuth.post("/user/add", data);

// UPDATE USER
export const updateUser = (id: string, data: any) =>
  apiAuth.put(`/user/${id}`, data);

// USER ROLES
export const getRoles = () => 
  apiAuth.get(`/roles`)


/**
 * AUTHENTICATION
 */

// Login (Request is public, but the response sets the secure cookie)
export const login = (data: any) => apiPublic.post("/auth/signin", data, {
  withCredentials: true,  // Optional: Ensures credentials are handled correctly for CORS
});

// Logout (NEW: Must hit the backend to clear the secure cookie)
export const logout = () => apiAuth.post("/auth/logout");

export const signup = (data: any) => apiPublic.post("/auth/register", data);

// Change Password (Uses the secure client)
export const changePassword = (data: any) =>
  apiAuth.put("/auth/change-password", data);


/**
 * CAMPUSES & COLLEGES (All use the secure apiAuth client)
 */

// GET CAMPUS
export const getCampuses = () => 
  apiAuth.get("/campuses");

// GET COLLEGES
export const getColleges = () => 
  apiAuth.get("/colleges");

/**
 * ANNOUNCEMENTS (All use the secure apiAuth client)
 */

// GET ALL ANNOUNCEMENTS
export const getAnnouncements = () => 
  apiAuth.get("/announcement");

// GET ANNOUNCEMENT BY ID
export const getAnnouncementById = (id: string) => 
  apiAuth.get(`/announcement/${id}`);

// ADD ANNOUNCEMENT
export const createAnnouncement = (data: any) =>
  apiAuth.post("/announcement/add", data);

// UPDATE ANNOUNCEMENT
export const updateAnnouncement = (id: string, data: any) =>
  apiAuth.put(`/announcement/update/${id}`, data);

// DELETE ANNOUNCEMENT
export const deleteAnnouncement = (id: string) =>
  apiAuth.delete(`/announcement/delete/${id}`);

// Example: File Upload
export const uploadFile = (formData: FormData) =>
  apiFormData().post("/upload", formData);
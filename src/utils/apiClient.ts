// import axios, { AxiosInstance } from "axios";
// import config from "./config";

// /**
//  * Creates an Axios instance with default headers.
//  * Supports optional Bearer token and FormData.
//  */
// const createApiClient = (token?: string, isFormData = false): AxiosInstance => {
//   const headers: Record<string, string> = {
//     Accept: "*/*",
//     "Content-Type": isFormData ? "multipart/form-data" : "application/json",
//   };

//   if (token) {
//     headers["Authorization"] = `Bearer ${token}`;
//   } else if (config.authorization) {
//     headers["Authorization"] = `Bearer ${config.authorization}`;
//   }

//   const instance = axios.create({
//     baseURL: config.apiUrl,
//     headers,
//   });

//   // Optional: Add interceptors
//   instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       console.error("API Error:", error.response?.data || error.message);
//       return Promise.reject(error);
//     }
//   );

//   return instance;
// };

// export default createApiClient;


// // Usage in frontend
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




import axios, { AxiosInstance } from "axios";
import config from "./config"; // Assumed to contain apiUrl

/**
 * Creates an Axios instance with default headers.
 * * @param useCredentials - Set to true for authenticated calls to enable cookie handling (HttpOnly JWT).
 * @param isFormData - Set to true for multipart/form-data uploads.
 */
const createApiClient = (useCredentials = false, isFormData = false): AxiosInstance => {
    // ----------------------------------------------------------------------
    // 1. REMOVED: Manual handling of 'token' parameter and 'Authorization' header.
    // The JWT is now managed automatically by the browser via the cookie.
    // ----------------------------------------------------------------------
    
    const headers: Record<string, string> = {
        Accept: "*/*",
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    };

    const instance = axios.create({
        baseURL: config.apiUrl,
        headers,
        
        // ------------------------------------------------------------------
        // 2. CRITICAL CHANGE: Enable cookie handling based on the flag
        // ------------------------------------------------------------------
        withCredentials: useCredentials, 
    });

    // Optional: Add interceptors
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error("API Error:", error.response?.data || error.message);
            
            // NOTE: You can add an interceptor here to check for 401/403 errors 
            // and trigger a global logout if the secure cookie has expired/failed.
            
            return Promise.reject(error);
        }
    );

    return instance;
};

export default createApiClient;
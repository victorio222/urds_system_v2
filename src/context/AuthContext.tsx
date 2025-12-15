"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

// --- PRODUCTION IMPORTS ---
// IMPORTANT: Ensure this path is correct for your project
import { logout as apiLogout } from "@/utils/apiHelpers";
// --------------------------

// --- TYPE DEFINITIONS ---
export type UserRole = "admin" | "staff" | "researcher" | "public";

interface UserData {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

// Data structure passed from LoginPage to AuthContext
interface ContextLoginPayload {
  user: UserData & { role_id: number }; // The full user object from API response
  roleName: string; // The resolved role name string (e.g., "URDS Staff")
}

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  userId: number | null;
  user: UserData | null;
  isAuthenticatedChecked: boolean;
  contextLogin: (payload: ContextLoginPayload) => void; // Renamed to clarify its role
  logout: () => void;
}

// --- ROLE MAPPING (Maps API role name to generic frontend role type) ---
const mapRoleToUserRole = (roleName: string | undefined): UserRole => {
  // Safety check for undefined roleName
  if (!roleName) {
    console.warn("Role name was undefined. Defaulting to 'public'.");
    return "public";
  }

  const normalizedRole = roleName.trim();

  switch (normalizedRole) {
    case "URDS Director":
      return "admin";
    case "URDS Staff":
    case "College Coordinator":
      return "staff";
    case "Faculty Researcher":
    case "Senior Faculty Researcher":
    case "Researcher":
      return "researcher";
    default:
      return "public";
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- AUTH PROVIDER COMPONENT ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticatedChecked, setIsAuthenticatedChecked] = useState(false);

  useEffect(() => {
    // Initial load check: Populates state from non-sensitive localStorage data
    try {
      const storedRole = localStorage.getItem("userRole") as UserRole;
      const storedUserId = localStorage.getItem("userId");
      const storedUserJson = localStorage.getItem("userData");

      const numericUserId = storedUserId ? parseInt(storedUserId, 10) : null;
      const storedUserData: UserData | null = storedUserJson
        ? JSON.parse(storedUserJson)
        : null;

      if (storedRole && numericUserId && numericUserId > 0 && storedUserData) {
        setIsAuthenticated(true);
        setUserRole(storedRole);
        setUserId(numericUserId);
        setUser(storedUserData);
      }
    } catch (error) {
      console.error(
        "Error reading initial auth data from localStorage:",
        error
      );
    } finally {
      setIsAuthenticatedChecked(true);
    }
  }, []); // --- CONTEXT LOGIN FUNCTION (Handles state update only) ---

  const contextLogin = (payload: ContextLoginPayload) => {
    const { user: userDataFromApi, roleName } = payload;

    // 1. Map the resolved role name string to the generic frontend role type
    const finalRole: UserRole = mapRoleToUserRole(roleName);
    // 2. Prepare minimal, non-sensitive data for state/storage
    const minimalUserData: UserData = {
      user_id: userDataFromApi.user_id,
      first_name: userDataFromApi.first_name,
      last_name: userDataFromApi.last_name,
      email: userDataFromApi.email,
    }; // 3. Update Storage

    localStorage.setItem("userRole", finalRole);
    localStorage.setItem("userId", userDataFromApi.user_id.toString());
    localStorage.setItem("userData", JSON.stringify(minimalUserData)); // 4. Update React State

    setIsAuthenticated(true);
    setUserRole(finalRole);
    setUserId(userDataFromApi.user_id);
    setUser(minimalUserData);
  }; // --- LOGOUT FUNCTION ---

  const logout = async () => {
    // 1. Call backend to clear the secure cookie
    try {
      await apiLogout();
    } catch (e) {
      console.warn(
        "Logout API failed (server-side), clearing client state anyway.",
        e
      );
    } // 2. Clear Local Storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData"); // 3. Clear React state

    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        userId,
        user,
        isAuthenticatedChecked,
        contextLogin, // Export the contextLogin function
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// --- CUSTOM HOOK ---
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

import { logout as apiLogout } from "@/utils/apiHelpers";

/* =======================
   ROLE TYPES
======================= */
export type UserRole =
  | "URDS Director"
  | "URDS Staff"
  | "College Dean"
  | "College Coordinator"
  | "Faculty Researcher"
  | "Senior Faculty Researcher"
  | "Research Evaluator"
  | "Public";

/* =======================
   USER DATA (SAFE)
======================= */
interface UserData {
  user_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix_name: string;
  email: string;
  role_id: number;
}

/* =======================
   LOGIN PAYLOAD (API)
======================= */
interface ContextLoginPayload {
  user: UserData;
}

/* =======================
   CONTEXT TYPE
======================= */
interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  userId: number | null;
  user: UserData | null;
  isAuthenticatedChecked: boolean;
  contextLogin: (payload: ContextLoginPayload) => void;
  logout: () => void;
}

/* =======================
   ROLE RESOLVER
======================= */
const resolveRoleFromId = (roleId: number): UserRole => {
  switch (roleId) {
    case 1:
      return "URDS Director";
    case 2:
      return "URDS Staff";
    case 3:
      return "College Coordinator";
    case 4:
      return "Faculty Researcher";
    case 5:
      return "Senior Faculty Researcher";
    case 6:
      return "College Dean";
    case 7:
      return "Research Evaluator";
    default:
      return "Public";
  }
};

/* =======================
   CONTEXT
======================= */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =======================
   PROVIDER
======================= */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticatedChecked, setIsAuthenticatedChecked] = useState(false);

  /* 🔄 INITIAL LOAD */
  useEffect(() => {
    try {
      const storedUserJson = localStorage.getItem("userData");
      const storedRole = localStorage.getItem("userRole") as UserRole | null;
      const storedUserId = localStorage.getItem("userId");

      if (storedUserJson && storedRole && storedUserId) {
        setUser(JSON.parse(storedUserJson));
        setUserRole(storedRole);
        setUserId(Number(storedUserId));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to restore auth state:", error);
    } finally {
      setIsAuthenticatedChecked(true);
    }
  }, []);

  /* 🔐 LOGIN */
  const contextLogin = ({ user }: ContextLoginPayload) => {
    const resolvedRole = resolveRoleFromId(user.role_id);

    const safeUserData: UserData = {
      user_id: user.user_id,
      first_name: user.first_name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      suffix_name: user.suffix_name,
      email: user.email,
      role_id: user.role_id,
    };

    localStorage.setItem("userData", JSON.stringify(safeUserData));
    localStorage.setItem("userRole", resolvedRole);
    localStorage.setItem("userId", user.user_id.toString());

    setIsAuthenticated(true);
    setUserRole(resolvedRole);
    setUserId(user.user_id);
    setUser(safeUserData);
  };

  /* 🚪 LOGOUT */
  const logout = async () => {
    try {
      await apiLogout();
    } catch {
      console.warn("Server logout failed, clearing client session anyway.");
    }

    localStorage.clear();

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
        contextLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* =======================
   CUSTOM HOOK
======================= */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

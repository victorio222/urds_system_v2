// components/ProtectedRoute.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const {
    isAuthenticated,
    isAuthenticatedChecked,
    userRole,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    // Wait until auth restoration finishes
    if (!isAuthenticatedChecked) return;

    // Not logged in
    if (!isAuthenticated) {
      router.replace("/auth/login");
      return;
    }

    // Logged in but role not allowed
    if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
      router.replace("/unauthorized");
    }
  }, [
    isAuthenticated,
    isAuthenticatedChecked,
    userRole,
    allowedRoles,
    router,
  ]);

  // Prevent flash + false redirects
  if (!isAuthenticatedChecked) {
    return <div className="text-center mt-20">Checking authentication...</div>;
  }

  // Block render if unauthenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

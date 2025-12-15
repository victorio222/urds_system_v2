// components/ProtectedRoute.tsx
"use client";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ("admin" | "staff" | "researcher" | "public")[]; // optional role restriction
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isAuthenticatedChecked, userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticatedChecked) {
      if (!isAuthenticated) {
        router.replace("/auth/login"); // redirect to login if not authenticated
      } else if (allowedRoles && !allowedRoles.includes(userRole!)) {
        router.replace("/unauthorized"); // optional: redirect if role not allowed
      }
    }
  }, [isAuthenticated, isAuthenticatedChecked, userRole, router, allowedRoles]);

  // Show a loading message while checking auth
  if (!isAuthenticatedChecked || !isAuthenticated) {
    return <div className="text-center mt-20">Checking authentication...</div>;
  }

  return <>{children}</>;
}

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[]; // Array of allowed roles for this route
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      router.push('/login');
    } else if (!allowedRoles.includes(userRole || '')) {
      // Redirect to home if the role is not allowed
      router.push('/');
    }
  }, [isAuthenticated, userRole, allowedRoles, router]);

  if (!isAuthenticated || !allowedRoles.includes(userRole || '')) {
    // Optionally show a loading screen while checking auth
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

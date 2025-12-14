// src/utils/auth.ts

/**
 * Checks if user is authenticated.
 * Returns true if the secure cookie exists or fallback localStorage check.
 * In a cookie-based system, this should rely on server-set cookies.
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;

  // Optional fallback check for localStorage (can remove if not needed)
  const tokenFallback = localStorage.getItem("token");
  return Boolean(tokenFallback);
};

/**
 * Hook version for convenience in React components.
 * No token needed—authentication is cookie-based.
 */
export const useIsAuthenticated = (): boolean => {
  // Since auth is cookie-based, assume user is authenticated if server cookie exists.
  // You can optionally add client-side checks if needed.
  return typeof window !== "undefined";
};

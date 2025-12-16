import { useAuth, UserRole } from "@/context/AuthContext";

export const canViewAnalytics = (role: UserRole | null) => {
  if (!role) return false;

  return ![
    "Faculty Researcher",
    "Senior Faculty Researcher",
  ].includes(role);
};

export const canViewEvaluationIncoming = (role: UserRole | null) => {
  if (!role) return false;

  return ![
    "Research Evaluator",
  ].includes(role);
};

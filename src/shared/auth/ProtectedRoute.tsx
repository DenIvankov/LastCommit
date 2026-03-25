import { Navigate, useLocation } from "react-router";

import { useAuth } from "@/shared/auth/AuthProvider";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isHydrating } = useAuth();
  const location = useLocation();

  if (isHydrating) {
    return (
      <div className="min-h-screen theme-surface flex items-center justify-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}


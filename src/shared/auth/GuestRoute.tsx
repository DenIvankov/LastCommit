import { Navigate, Outlet } from "react-router";

import { authStore, selectIsAuthenticated, selectIsLoading } from "./authStore";

export function GuestRoute() {
  const isAuthenticated = authStore(selectIsAuthenticated);
  const isLoading = authStore(selectIsLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen theme-surface flex items-center justify-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Loading...
        </p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/Home" replace />;
  }

  return <Outlet />;
}

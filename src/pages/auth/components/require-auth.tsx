import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { isLogged } = useAuth();
  const location = useLocation();

  return isLogged ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}

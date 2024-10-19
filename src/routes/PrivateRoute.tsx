import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { LayoutDashboard } from "@/layout/dashboard";

interface PrivateRouteProps {
  children: ReactElement;
}

export function PrivateRoute({ children }: PrivateRouteProps): ReactElement {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <LayoutDashboard>{children}</LayoutDashboard>;
}

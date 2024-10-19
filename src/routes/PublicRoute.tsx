import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PublicRouteProps {
  children: ReactElement;
}

export function PublicRoute({ children }: PublicRouteProps): ReactElement {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

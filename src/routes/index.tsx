import { useAuth } from "@/hooks/useAuth";

import PrivateRoutes from "./PrivateRoute";
import PublicRoutes from "./PublicRoute";

import { LayoutDashboard } from "@/layout/dashboard";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRouteWithLayout = (Route: any) => {
  return (
    <LayoutDashboard>
      <Route />
    </LayoutDashboard>
  );
};

function Routers() {
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (user) {
    return PrivateRouteWithLayout(PrivateRoutes);
  } else {
    return <PublicRoutes />;
  }
}

export default Routers;

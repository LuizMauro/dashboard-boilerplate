import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "@/pages/private/dashboard";

interface IRoute {
  path: string;
  component: React.ReactNode;
}

const routes: IRoute[] = [
  {
    path: "/dashboard",
    component: <Dashboard />,
  },
];

function RenderRoutes(route: IRoute, key: number) {
  return <Route key={key} path={route.path} element={route.component} />;
}

function PrivateRoute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={routes[0].path} />} />
      {routes.map((route, i) => RenderRoutes(route, i))}
      <Route path="*" element={<Navigate to={routes[0].path} />} />
    </Routes>
  );
}

export default PrivateRoute;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/public/Login";
import Home from "@/pages/public/Home";
import Register from "@/pages/public/Register";

interface IRoute {
  path: string;
  component: React.ReactNode;
}

const routes: IRoute[] = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
  {
    path: "*",
    component: <Navigate to="/login" />,
  },
];

function RouteWithSubRoutes(route: IRoute, key: number) {
  return <Route key={key} path={route.path} element={route.component} />;
}

function PublicRoutes() {
  return (
    <div>
      <Routes>{routes.map((route, i) => RouteWithSubRoutes(route, i))}</Routes>
    </div>
  );
}

export default PublicRoutes;

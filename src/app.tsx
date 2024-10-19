// src/App.tsx
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "@/routes/PrivateRoute";
import Home from "@/pages/public/Home";
import Login from "@/pages/public/Login";
import Dashboard from "@/pages/private/dashboard";
import { PublicRoute } from "./routes/PublicRoute";

function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Rotas privadas */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;

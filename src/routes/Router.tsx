// router.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import { isAuthenticated } from "@/api/auth";
import AppLayout from "@/layouts/AppLayout";
import type { ReactNode } from "react";
import Users from "@/pages/Users";

function Private({ children }: { children: ReactNode }) {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <Router>
      <Routes>

        {/* ROTAS PRIVADAS */}
        <Route
          path="/"
          element={
            <Private>
              <AppLayout/>
            </Private>
          }
        >
          {/* páginas dentro do layout */}
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* ROTAS PÚBLICAS */}
        <Route path="/login" element={<Login />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

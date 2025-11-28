// router.tsx
import { type ReactElement } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";

// Simula autenticação
const isAuthenticated = () => !!localStorage.getItem("token");

// Define as rotas em um array de objetos
type AppRoute = {
  path: string;
  element: ReactElement;
  private?: boolean;
};

const routes: AppRoute[] = [
  { path: "/", element: <Home/>, private: true },
  { path: "/login", element: <Login/> },
];

// Componente para rotas privadas
const PrivateRoute = ({ children }: { children: ReactElement }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element, private: isPrivate }) => (
          <Route
            key={path}
            path={path}
            element={isPrivate ? <PrivateRoute>{element}</PrivateRoute> : element}
          />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

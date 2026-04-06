import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import React from "react";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import RegisterPage from "../pages/auth/RegisterPage";
import RolesPage from "../pages/admin/RolesPage";
import ProfilePage from "../pages/ProfilePage";
import AccountsPage from "../pages/admin/AccountsPage";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import AuditPage from "../pages/admin/AuditPage";

const HomePage = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h1>Bienvenido a Nexum Frontend</h1>
    <p>Este es un ejemplo de la página de inicio.</p>
    <nav style={{ marginTop: "20px" }}>
      <Link
        to="/profile"
        style={{
          padding: "10px 20px",
          border: "1px solid blue",
          borderRadius: "5px",
          textDecoration: "none",
          color: "blue",
        }}
      >
        Ir a Datos Personales
      </Link>
    </nav>
  </div>
);

// Rutas que manejan su propio layout completo (sin Navbar/Footer global)
const ROUTES_WITHOUT_LAYOUT = [
  "/login",
  "/proyectos",
  "/habilidades",
  "/experiencia",
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const hideLayout = ROUTES_WITHOUT_LAYOUT.some((route) =>
    pathname.startsWith(route)
  );

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div style={{ flexGrow: 1 }}>{children}</div>
      <Footer />
    </div>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/roles" element={<RolesPage />} />
          <Route path="/admin/dashboard" element={<RolesPage />} />
          <Route path="/admin/usuarios" element={<AccountsPage />} />
          <Route path="/admin/auditoria" element={<AuditPage />} />
          <Route path="/dashboard" element={<RolesPage />} />
          <Route path="/portfolio" element={<RolesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import React from "react";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import RegisterPage from "../pages/auth/RegisterPage";
import RolesPage from "../pages/admin/RolesPage";
import AccountsPage from "../pages/admin/AccountsPage";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import PersonalData from "../pages/professional/profile-settings/PersonalData";
import LinksPrivacy from "../pages/professional/profile-settings/LinksPrivacy";

const HomePage = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h1>Bienvenido a Nexum Frontend</h1>
    <p>Este es la página de inicio.</p>
    <nav style={{ marginTop: "20px" }}>
      <Link
        to="/profile/personal-data"
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

// Componente de Navegación Secundaria (Breadcrumbs)
const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);

  const routeLabels: { [key: string]: string } = {
    "profile": "Perfil",
    "admin": "Administración",
    "usuarios": "Gestión de Usuarios",
    "roles": "Roles",
    "dashboard": "Panel de Control",
    "personal-data": "Datos Personales"
  };

  return (
    <div style={{ 
      padding: '12px 40px', 
      backgroundColor: '#eef3f8', 
      borderBottom: '1px solid #ddd', 
      fontSize: '13px', 
      color: '#666' 
    }}>
      {/* Caso especial: Home / Menú Principal */}
      {pathname === "/" ? (
        <span style={{ fontWeight: 'bold', color: '#003087' }}>Menú principal</span>
      ) : (
        <>
          <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>Menú principal</Link>
          
          {/* Lógica específica para Profile solicitado: Menú principal > Configuración de perfil > Perfil > Datos Personales */}
          {pathname.startsWith("/profile") ? (
            <>
              <span style={{ margin: '0 8px', color: '#999' }}>&gt;</span>
              <span style={{ color: '#666' }}>Configuración de perfil</span>
              <span style={{ margin: '0 8px', color: '#999' }}>&gt;</span>
              <span style={{ color: '#666' }}>Perfil</span>
              <span style={{ margin: '0 8px', color: '#999' }}>&gt;</span>
              <span style={{ fontWeight: 'bold', color: '#003087' }}>Datos Personales</span>
            </>
          ) : (
            /* Lógica genérica para otras rutas */
            pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;
              const displayName = routeLabels[name.toLowerCase()] || 
                                  name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

              return (
                <span key={name}>
                  <span style={{ margin: '0 8px', color: '#999' }}>&gt;</span>
                  {isLast ? (
                    <span style={{ fontWeight: 'bold', color: '#003087' }}>{displayName}</span>
                  ) : (
                    <Link to={routeTo} style={{ color: '#666', textDecoration: 'none' }}>{displayName}</Link>
                  )}
                </span>
              );
            })
          )}
        </>
      )}
    </div>
  );
};

const ROUTES_WITHOUT_LAYOUT = [
  "/login", "/register", "/forgot-password", "/reset-password", "/proyectos", "/habilidades", "/experiencia",
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const hideLayout = ROUTES_WITHOUT_LAYOUT.some((route) => pathname.startsWith(route));

  if (hideLayout) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Breadcrumbs />
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
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
          <Route path="/admin/usuarios" element={<AccountsPage />} />
          
          {/* CAMBIO DE RUTA PROFILE QUE SE BORRO POR UNA NUEVA ESTRUCTURA DE RUTAS A PERSONAL DATA */}
          <Route path="/profile" element={<Navigate to="/profile/personal-data" replace />} />
          <Route path="/profile/personal-data" element={<PersonalData />} />
          <Route path="/profile/links" element={<LinksPrivacy />} />
          
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
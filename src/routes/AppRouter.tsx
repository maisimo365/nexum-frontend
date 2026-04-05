import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RolesPage from "../pages/admin/RolesPage";
import ProfilePage from "../pages/ProfilePage";
import AccountsPage from "../pages/admin/AccountsPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/roles" element={<RolesPage />} />
        <Route path="/admin/dashboard" element={<RolesPage />} />
        <Route path="/admin/usuarios" element={<AccountsPage />} />
        <Route path="/dashboard" element={<RolesPage />} />
        <Route path="/portfolio" element={<RolesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
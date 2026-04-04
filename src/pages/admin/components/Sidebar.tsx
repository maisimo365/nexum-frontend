import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Shield,
  Database,
  Settings,
  LogOut,
  FolderOpen,
  Wrench,
  Briefcase,
  User,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";

interface SidebarProps {
  activeItem?: string;
}

const Sidebar = ({ activeItem = "Dashboard" }: SidebarProps) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const adminItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin/dashboard" },
    { label: "Gestión Usuarios", icon: <Users size={18} />, path: "/admin/usuarios" },
    { label: "Auditoría", icon: <Shield size={18} />, path: "/admin/auditoria" },
    { label: "Copias de Seguridad", icon: <Database size={18} />, path: "/admin/backups" },
    { label: "Configuración del Sistema", icon: <Settings size={18} />, path: "/admin/configuracion" },
  ];

  const professionalItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { label: "Proyectos", icon: <FolderOpen size={18} />, path: "/proyectos" },
    { label: "Habilidades", icon: <Wrench size={18} />, path: "/habilidades" },
    { label: "Experiencia", icon: <Briefcase size={18} />, path: "/experiencia" },
    { label: "Perfil", icon: <User size={18} />, path: "/profile" },
  ];

  const items = isAdmin ? adminItems : professionalItems;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
   <div className="w-56 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 self-stretch">
      {/* Menu items */}
      <nav className="py-4 ">
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
              activeItem === item.label
                ? "bg-primary text-white font-medium"
                : "text-textMain hover:bg-gray-100"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Cerrar sesión */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-sm text-textMain hover:bg-gray-100 transition-colors border-t border-gray-200"
      >
        <LogOut size={18} />
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Sidebar;
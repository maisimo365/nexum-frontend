import { useState } from "react";
import { Link } from "react-router-dom";
import logoUmss from "../../assets/logoUmss.png";
import { User } from "lucide-react";
import UserMenuModal from "./UserMenuModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="w-full bg-navbar px-6 py-3 flex items-center justify-between relative">
      {/* Logo y nombre de Nexum */}
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <div className="flex items-center gap-2">
          <img
            src={logoUmss}
            alt="Logo UMSS"
            className="w-8 h-8 object-contain"
          />
          <span className="text-white font-bold text-lg tracking-wide">
            NEXUM
          </span>
        </div>
      </Link>

      {/* Botones y Usuario */}
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="text-white border border-white px-4 py-1.5 rounded text-sm hover:bg-white hover:text-navbar transition-colors"
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/register"
          className="bg-action text-white px-4 py-1.5 rounded text-sm hover:opacity-90 transition-opacity"
        >
          Registrarse
        </Link>

        {/* Icono de Usuario que abre el Modal */}
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="ml-2 p-1.5 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
        >
          <User size={20} />
        </button>
      </div>

      {/* Modal de Usuario */}
      {isModalOpen && (
        <UserMenuModal onClose={() => setIsModalOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
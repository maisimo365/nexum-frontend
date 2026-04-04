import { Link } from "react-router-dom";
import logoUmss from "../../assets/logoUmss.png";

const Navbar = () => {
  return (
    <nav className="w-full bg-navbar px-6 py-3 flex items-center justify-between">
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

      {/* Botones */}
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
      </div>
    </nav>
  );
};

export default Navbar;
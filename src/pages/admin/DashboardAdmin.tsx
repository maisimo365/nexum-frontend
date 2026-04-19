import { Users, Activity, AlertTriangle, CheckCircle, ShieldAlert, ExternalLink } from "lucide-react";
import Sidebar from "./components/Sidebar";
import { Link } from "react-router-dom";
import Calendar from "../../components/ui/Calendar";

const DashboardAdmin = () => {
  // 1. Extraemos el contenido lateral para mantener el código limpio y evitar duplicados
  const RightPanelContent = () => (
    <div className="sticky top-6">
      <Calendar />

      <div className="mt-8">
        <h3 className="font-bold text-textMain text-sm mb-4 flex items-center gap-2">
          <ShieldAlert size={16} className="text-yellow-500" />
          Notificaciones
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-[11px] text-gray-600 leading-tight">
            <AlertTriangle size={14} className="text-yellow-500 shrink-0" />
            <span>2 usuarios inactivos por más de 30 días.</span>
          </div>
          <div className="flex items-start gap-2 text-[11px] text-gray-600 leading-tight">
            <CheckCircle size={14} className="text-green-500 shrink-0" />
            <span>Backup automático completado exitosamente.</span>
          </div>
          <div className="flex items-start gap-2 text-[11px] text-gray-600 leading-tight">
            <AlertTriangle size={14} className="text-action shrink-0" />
            <span>Intento de acceso no autorizado detectado.</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-textMain text-sm mb-4">Enlaces rápidos</h3>
        <div className="space-y-3 text-xs text-primary">
          <p className="cursor-pointer hover:underline flex items-center justify-between group">
            <span>📋 Guía de Usuario</span>
            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
          <p className="cursor-pointer hover:underline flex items-center justify-between group">
            <span>⚙️ Soporte Técnico</span>
            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
          <p className="cursor-pointer hover:underline flex items-center justify-between group">
            <span>📄 Políticas UMSS</span>
            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar activeItem="Dashboard" />

        {/* Contenido principal + Panel derecho */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-x-hidden">
          
          {/* SECCIÓN IZQUIERDA: Dashboard Content */}
          <div className="flex-1 p-4 pl-14 sm:pl-6 md:p-6">
            <h1 className="text-xl sm:text-2xl font-bold text-textMain mb-1">
              Panel de Administración
            </h1>
            <p className="text-sm text-gray-500 mb-5">
              Control general de la plataforma NEXUM
            </p>

            {/* Cards de estadísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Total Usuarios Registrados</p>
                <p className="text-3xl font-bold text-primary">148</p>
                <p className="text-xs text-gray-400 mt-1">+5 esta semana</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Usuarios Activos Hoy</p>
                <p className="text-3xl font-bold text-primary">34</p>
                <p className="text-xs text-gray-400 mt-1">Última sesión: hace 2 min</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Alertas del Sistema</p>
                <p className="text-3xl font-bold text-action">2</p>
                <p className="text-xs text-gray-400 mt-1">Requieren atención</p>
              </div>
            </div>

            {/* Cards de acciones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={18} className="text-textMain" />
                  <h2 className="font-semibold text-textMain">Gestión de Usuarios</h2>
                </div>
                <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                  Administra cuentas, roles, estados y permisos de los usuarios.
                </p>
                <div className="bg-yellow-50 text-yellow-700 text-[11px] px-3 py-1.5 rounded-lg mb-4 inline-block font-medium border border-yellow-100">
                  2 usuarios pendientes de activación.
                </div>
                <br />
                <Link
                  to="/admin/usuarios"
                  className="bg-primary text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-all inline-block shadow-sm"
                >
                  Ver usuarios
                </Link>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Activity size={18} className="text-textMain" />
                  <h2 className="font-semibold text-textMain">Copias de Seguridad</h2>
                </div>
                <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                  Gestiona y programa los respaldos automáticos de la plataforma.
                </p>
                <div className="bg-green-50 text-green-700 text-[11px] px-3 py-1.5 rounded-lg mb-4 inline-block font-medium border border-green-100">
                  Último backup: hoy 03:00 AM.
                </div>
                <br />
                <button className="bg-action text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-all shadow-sm">
                  Gestionar backups
                </button>
              </div>
            </div>

            {/* Control de acceso por roles */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="font-semibold text-textMain mb-4">
                Control de acceso por roles en la plataforma
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-background rounded-xl p-4 border border-gray-50">
                  <h3 className="font-medium text-textMain mb-3 text-sm flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-500" />
                    Rutas del Administrador
                  </h3>
                  <div className="space-y-2">
                    {["Dashboard", "Gestión Usuarios", "Auditoría", "Copias de Seguridad", "Configuración"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[13px] text-gray-600">
                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-background rounded-xl p-4 border border-gray-50">
                  <h3 className="font-medium text-textMain mb-3 text-sm flex items-center gap-2">
                    <AlertTriangle size={14} className="text-action" />
                    Rutas restringidas
                  </h3>
                  <div className="space-y-2">
                    {["Proyectos", "Habilidades", "Experiencia", "Portafolio"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[13px] text-gray-600">
                        <div className="w-1 h-1 bg-action rounded-full"></div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ASIDE DERECHO (Responsivo) */}
          {/* En móvil aparece abajo con border-t, en lg+ a la derecha con border-l */}
          <aside className="w-full lg:w-64 p-6 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 shrink-0">
            <RightPanelContent />
          </aside>

        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
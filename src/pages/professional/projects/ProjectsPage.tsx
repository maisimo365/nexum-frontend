import React, { useState } from 'react';
import Sidebar from '../../admin/components/Sidebar';
import Calendar from '../../../components/ui/Calendar';
import CreateProjectModal from './CreateProjectModal';
import {
  FolderOpen, Plus, ShieldCheck, AlertTriangle,
  CheckCircle, Folders, ChevronDown, Search,
  ArrowUpDown, ExternalLink, Pencil, Trash2
} from 'lucide-react';

const ProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const RightPanelContent = () => (
    <div className="sticky top-6 space-y-8">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-[#1a1a2e] text-sm mb-1 uppercase tracking-wider">Calendario</h3>
        <p className="text-xs text-gray-500 mb-4">Abril 2026</p>
        <Calendar />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-[#1a1a2e] text-sm mb-4 flex items-center gap-2 uppercase tracking-wider">
          <ShieldCheck size={18} className="text-[#003087]" /> NOTIFICACIONES
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 text-xs text-[#5b6472] leading-relaxed">
            <div className="p-1.5 bg-blue-50 rounded-lg">
              <Folders size={14} className="text-[#003087]" />
            </div>
            <span>Clasificación por categoría aplicada al listado.</span>
          </div>
          <div className="flex items-start gap-3 text-xs text-[#5b6472] leading-relaxed">
            <div className="p-1.5 bg-green-50 rounded-lg">
              <CheckCircle size={14} className="text-[#0f8a4b]" />
            </div>
            <span>Todos tus proyectos están actualizados.</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#e9eef5] flex flex-col font-sans">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar activeItem="Proyectos" />

        <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
          <div className="flex-1 p-4 pl-14 sm:pl-6 md:p-8 space-y-6">
            {/* Header - Basado en HU-01/02 */}
            <header className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <p className="text-[12px] font-semibold text-[#5b6472] uppercase tracking-wider mb-1">Portafolio profesional UMSS</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e]">Mis Proyectos</h1>
                <p className="text-[13px] text-[#5b6472] mt-2 max-w-2xl">
                  Administra tu portafolio con creación, edición, eliminación, clasificación por categorías, filtros y ordenamiento.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#003087] hover:brightness-110 text-white font-bold px-5 py-2.5 rounded-lg shadow-md transition-all flex items-center gap-2 text-sm"
              >
                <Plus size={18} /> NUEVO PROYECTO
              </button>
            </header>

            {/* Toolbar de Filtros - Estilo Moderno */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#e7edf5] text-[#003087] rounded-full text-xs font-bold cursor-pointer hover:bg-blue-100 transition-colors">
                  <Folders size={14} />
                  <span>Categoría: Todos</span>
                  <ChevronDown size={14} />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-[#5b6472] rounded-full text-xs font-bold cursor-pointer hover:bg-gray-50 transition-colors">
                  <ArrowUpDown size={14} />
                  <span>Ordenar por: Recientes</span>
                  <ChevronDown size={14} />
                </div>
              </div>

              <div className="flex items-center gap-3 flex-1 sm:flex-initial">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Buscar proyecto o categoría..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0030871a]"
                  />
                </div>
                <button className="bg-[#003087] text-white px-4 py-2 rounded-lg text-xs font-bold hover:brightness-110 transition-all">
                  APLICAR
                </button>
              </div>
            </div>

            {/* Tabla de Proyectos - Estilo Mockup */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#eef3f8]">
                    <th className="p-4 text-[13px] font-bold text-[#1a1a2e]">Proyecto</th>
                    <th className="p-4 text-[13px] font-bold text-[#1a1a2e]">Categoría</th>
                    <th className="p-4 text-[13px] font-bold text-[#1a1a2e]">Tecnologías</th>
                    <th className="p-4 text-[13px] font-bold text-[#1a1a2e]">Enlace / Fecha</th>
                    <th className="p-4 text-[13px] font-bold text-[#1a1a2e] text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Fila de ejemplo 1 */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-[13px] font-medium text-[#1a1a2e]">Sistema de Gestión Académica</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-[#0030871a] text-[#003087] rounded text-[11px] font-bold uppercase">Desarrollo Web</span>
                    </td>
                    <td className="p-4 text-[13px] text-[#5b6472]">React, Node.js, PostgreSQL</td>
                    <td className="p-4 text-[13px] text-[#003087] hover:underline cursor-pointer flex items-center gap-1">
                      github.com/umss/sga <ExternalLink size={12} />
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 text-[#5b6472] hover:bg-gray-100 rounded-lg transition-colors border border-gray-200" title="Editar">
                          <Pencil size={16} />
                        </button>
                        <button className="p-2 text-[#c8102e] hover:bg-red-50 rounded-lg transition-colors border border-red-100" title="Eliminar">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Fila de ejemplo 2 */}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-[13px] font-medium text-[#1a1a2e]">Analítica de Datos UMSS</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-gray-100 text-[#5b6472] rounded text-[11px] font-bold uppercase">Data</span>
                    </td>
                    <td className="p-4 text-[13px] text-[#5b6472]">Python, FastAPI, Power BI</td>
                    <td className="p-4 text-[13px] text-[#5b6472]">09/01/2025</td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 text-[#5b6472] hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
                          <Pencil size={16} />
                        </button>
                        <button className="p-2 text-[#c8102e] hover:bg-red-50 rounded-lg transition-colors border border-red-100">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Footer de la tabla si no hay datos o para copyright */}
              <div className="p-6 text-center border-t border-gray-50">
                <p className="text-[12px] text-gray-400 italic">Mostrando proyectos profesionales registrados en el sistema.</p>
              </div>
            </div>

            <footer className="mt-auto pt-8 text-center pb-6">
              <p className="text-[#1a1a2e] font-bold text-[12px] tracking-widest uppercase">Copyright © 2026 CODI</p>
            </footer>
          </div>

          <aside className="w-full lg:w-80 p-6 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 shrink-0">
            <RightPanelContent />
          </aside>
        </main>
      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProjectsPage;
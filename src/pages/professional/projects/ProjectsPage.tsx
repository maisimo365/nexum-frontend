import React, { useState } from 'react';
import Sidebar from '../../admin/components/Sidebar';
import CreateProjectModal from './CreateProjectModal';
import {
  FolderOpen, ChevronDown, Search, ArrowDownAZ, CalendarDays
} from 'lucide-react';

const ProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex flex-col font-sans">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar activeItem="Proyectos" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10">
          <div className="max-w-[1200px] mx-auto space-y-8">

            {/* Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-[12px] font-medium text-[#5b6472] mb-1">Portafolio profesional UMSS</p>
                <h1 className="text-2xl sm:text-[32px] font-bold text-[#1a1a2e] mb-2">Mis Proyectos</h1>
                <p className="text-[14px] text-[#5b6472] max-w-2xl leading-relaxed">
                  La gestión y la clasificación por categorías se resuelven dentro de una sola pantalla, con filtros visibles y acciones por proyecto.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#c8102e] hover:brightness-110 text-white font-bold px-6 py-2.5 rounded-lg shadow-sm transition-all text-[14px]"
              >
                Nuevo proyecto
              </button>
            </header>

            {/* Toolbar de Filtros */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-[16px] font-bold text-[#1a1a2e]">Filtros y ordenamiento</h2>
                <p className="text-[13px] text-[#5b6472]">Categoría, búsqueda y orden en un solo bloque.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#eef3f8] text-[#003087] rounded-xl text-[13px] font-bold cursor-pointer hover:bg-[#e0eaf5] transition-colors">
                  <FolderOpen size={16} />
                  <span>Categoría: Desarrollo web</span>
                  <ChevronDown size={16} />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-[#1a1a2e] rounded-xl text-[13px] font-bold cursor-pointer hover:bg-gray-200 transition-colors">
                  <CalendarDays size={16} />
                  <span>Ordenar por: Más antiguos</span>
                  <ChevronDown size={16} />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-[#1a1a2e] rounded-xl text-[13px] font-bold cursor-pointer hover:bg-gray-200 transition-colors">
                  <ArrowDownAZ size={16} />
                  <span>Ordenar: A a Z</span>
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-1">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Buscar proyecto o categoría"
                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-[13px] focus:outline-none focus:border-gray-300 transition-colors"
                  />
                </div>
                <button className="bg-[#c8102e] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold hover:brightness-110 transition-all shadow-sm">
                  Aplicar filtros
                </button>
              </div>
            </div>

            {/* Tabla de Proyectos */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[850px]">
                  <thead>
                    <tr className="bg-[#f8f9fa] border-b border-gray-100">
                      <th className="p-4 pl-6 text-[13px] font-bold text-[#1a1a2e] w-[25%]">Proyecto</th>
                      <th className="p-4 text-[13px] font-bold text-[#1a1a2e] w-[15%]">Categoría</th>
                      <th className="p-4 text-[13px] font-bold text-[#1a1a2e] w-[25%]">Tecnologías</th>
                      <th className="p-4 text-[13px] font-bold text-[#1a1a2e] w-[15%]">Fecha</th>
                      <th className="p-4 pr-6 text-[13px] font-bold text-[#1a1a2e] text-center w-[20%]">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50 transition-colors group">
                      <td className="p-4 pl-6 text-[13px] text-[#5b6472]">Sistema de Gestión ...</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1.5 bg-[#eef3f8] text-[#003087] rounded-md text-[12px] font-bold inline-block">Desarrollo web</span>
                      </td>
                      <td className="p-4 text-[13px] text-[#5b6472]">React, Node.js, Post...</td>
                      <td className="p-4 text-[13px] text-[#5b6472]">12/02/2024</td>
                      <td className="p-4 pr-6">
                        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="px-4 py-1.5 text-[13px] font-bold text-[#1a1a2e] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            Editar
                          </button>
                          <button className="px-4 py-1.5 text-[13px] font-bold text-white bg-[#c8102e] rounded-lg hover:brightness-110 transition-colors shadow-sm">
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors group">
                      <td className="p-4 pl-6 text-[13px] text-[#5b6472]">Portal de Tutorías In...</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1.5 bg-[#eef3f8] text-[#003087] rounded-md text-[12px] font-bold inline-block">Desarrollo web</span>
                      </td>
                      <td className="p-4 text-[13px] text-[#5b6472]">Next.js, NestJS</td>
                      <td className="p-4 text-[13px] text-[#5b6472]">18/07/2024</td>
                      <td className="p-4 pr-6">
                        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="px-4 py-1.5 text-[13px] font-bold text-[#1a1a2e] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            Editar
                          </button>
                          <button className="px-4 py-1.5 text-[13px] font-bold text-white bg-[#c8102e] rounded-lg hover:brightness-110 transition-colors shadow-sm">
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors group">
                      <td className="p-4 pl-6 text-[13px] text-[#5b6472]">Analítica de Datos U...</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1.5 bg-[#e2e8f0] text-[#475569] rounded-md text-[12px] font-bold inline-block">Data</span>
                      </td>
                      <td className="p-4 text-[13px] text-[#5b6472]">Python, FastAPI, Po...</td>
                      <td className="p-4 text-[13px] text-[#5b6472]">09/01/2025</td>
                      <td className="p-4 pr-6">
                        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="px-4 py-1.5 text-[13px] font-bold text-[#1a1a2e] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            Editar
                          </button>
                          <button className="px-4 py-1.5 text-[13px] font-bold text-white bg-[#c8102e] rounded-lg hover:brightness-110 transition-colors shadow-sm">
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
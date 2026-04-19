import React, { useState, useEffect } from 'react';
import Sidebar from '../../admin/components/Sidebar';
import CreateProjectModal from './CreateProjectModal';
import { getProjects, deleteProject, type Project } from '../../../services/project.service';
import {
  FolderOpen, ChevronDown, Search, ArrowDownAZ, CalendarDays, Loader2
} from 'lucide-react';

const ProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
      alert('No se pudo eliminar el proyecto.');
    }
  };

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
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-[#5b6472]">
                          <Loader2 className="animate-spin mx-auto mb-2 text-[#003087]" size={24} />
                          Cargando proyectos...
                        </td>
                      </tr>
                    ) : projects.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-[#5b6472]">
                          Aún no has registrado ningún proyecto.
                        </td>
                      </tr>
                    ) : (
                      projects.map((project) => (
                        <tr key={project.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="p-4 pl-6 text-[13px] text-[#5b6472] font-medium">
                            {project.title.length > 30 ? project.title.substring(0, 30) + '...' : project.title}
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1.5 rounded-md text-[12px] font-bold inline-block ${project.category?.name?.toLowerCase().includes('data')
                              ? 'bg-[#e2e8f0] text-[#475569]'
                              : 'bg-[#eef3f8] text-[#003087]'
                              }`}>
                              {project.category?.name || 'Sin Categoría'}
                            </span>
                          </td>
                          <td className="p-4 text-[13px] text-[#5b6472] truncate max-w-[200px]" title={project.skills?.map(s => s.name).join(', ')}>
                            {project.skills?.map(s => s.name).join(', ') || 'No especificadas'}
                          </td>
                          <td className="p-4 text-[13px] text-[#5b6472]">
                            {project.created_at ? new Date(project.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'N/A'}
                            {' - '}
                            {project.updated_at
                              ? new Date(project.updated_at).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
                              : 'Presente'}
                          </td>
                          <td className="p-4 pr-6">
                            <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="px-4 py-1.5 text-[13px] font-bold text-[#1a1a2e] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                Editar
                              </button>
                              <button
                                onClick={() => handleDelete(project.id)}
                                className="px-4 py-1.5 text-[13px] font-bold text-white bg-[#c8102e] rounded-lg hover:brightness-110 transition-colors shadow-sm"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchProjects(); // Recargar tras cerrar modal por si se creó un proyecto
        }}
      />
    </div>
  );
};

export default ProjectsPage;
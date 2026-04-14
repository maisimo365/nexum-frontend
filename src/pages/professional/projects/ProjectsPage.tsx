import React, { useState } from 'react';
import Sidebar from '../../admin/components/Sidebar';
import Calendar from '../../../components/ui/Calendar';
import CreateProjectModal from './CreateProjectModal'; // Importación del nuevo archivo
import { 
  FolderOpen, Plus, ShieldCheck, AlertTriangle, 
  CheckCircle, BookOpen, Settings, FileText 
} from 'lucide-react';

const ProjectsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  const RightPanelContent = () => (
    <div className="sticky top-6 space-y-8">
      <div>
        <h3 className="font-bold text-textMain text-sm mb-4 uppercase tracking-wider">Calendario</h3>
        <Calendar />
      </div>
      <div>
        <h3 className="font-bold text-textMain text-sm mb-4 flex items-center gap-2 uppercase tracking-wider">
          <ShieldCheck size={18} className="text-action" /> NOTIFICACIONES
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
            <AlertTriangle size={14} className="text-action mt-0.5 shrink-0" />
            <span>Revisa el estado de tus proyectos recientes.</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
            <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" />
            <span>Todos tus proyectos están actualizados.</span>
          </div>
        </div>
      </div>
      {/* ... Otros widgets del panel derecho ... */}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar activeItem="Proyectos" />
        <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
          <div className="flex-1 p-4 pl-14 sm:pl-6 md:p-8">
            <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Portafolio profesional UMSS</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-textMain flex items-center gap-3">
                  <FolderOpen className="text-action" size={28} /> Mis Proyectos
                </h1>
                <p className="text-sm text-gray-400 mt-2">Gestiona y clasifica tus proyectos académicos y laborales.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)} // Abre el modal
                className="bg-action hover:brightness-110 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm"
              >
                <Plus size={18} /> NUEVO PROYECTO
              </button>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <p className="text-gray-500 italic">Aquí se listarán tus proyectos profesionales...</p>
            </div>

            <div className="mt-12 text-center pb-6">
              <p className="text-textMain font-medium text-sm">Copyright © 2026 CODI</p>
            </div>
          </div>
          <aside className="w-full lg:w-72 p-6 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 shrink-0">
            <RightPanelContent />
          </aside>
        </main>
      </div>

      {/* COMPONENTE MODAL REUTILIZADO */}
      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default ProjectsPage;
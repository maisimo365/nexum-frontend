import React from "react";
import Modal from "../../../components/ui/Modal";
import { Trash2 } from "lucide-react";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectModal = ({ isOpen, onClose }: CreateProjectModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo proyecto">
      <div className="flex flex-col gap-6 w-full max-w-[520px]">
        {/* Header descriptivo con Badge */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[13px] text-[#5b6472] leading-relaxed">
              Completa la información principal para agregar un nuevo proyecto a tu portafolio profesional.
            </p>
          </div>
          <span className="bg-[#0030871a] text-[#003087] px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider">
            Crear
          </span>
        </div>

        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          {/* Fila 1: Título y Categoría */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#1a1a2e]">Título del proyecto</label>
              <input
                type="text"
                className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0030871a] focus:border-[#003087] transition-all"
                placeholder="Ej. Sistema de Tutorías Inteligentes"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#1a1a2e]">Categoría</label>
              <select className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0030871a] focus:border-[#003087] transition-all cursor-pointer">
                <option value="web">Desarrollo web</option>
                <option value="movil">Móvil</option>
                <option value="data">Data</option>
              </select>
            </div>
          </div>
          <p className="text-[11px] text-[#5b6472] -mt-3">Selecciona una categoría para clasificar y facilitar la búsqueda.</p>

          {/* Fila 2: Descripción */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[#1a1a2e]">Descripción</label>
            <textarea
              rows={4}
              className="w-full p-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0030871a] focus:border-[#003087] transition-all resize-none"
              placeholder="Describe el impacto y funcionalidades de tu proyecto..."
            />
          </div>

          {/* Fila 3: Enlace y Tecnologías */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#1a1a2e]">Enlace del proyecto</label>
              <input
                type="url"
                className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0030871a] focus:border-[#003087]"
                placeholder="https://github.com/..."
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#1a1a2e]">Tecnologías</label>
              <input
                type="text"
                className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0030871a] focus:border-[#003087]"
                placeholder="React, NestJS, PostgreSQL"
              />
            </div>
          </div>

          {/* Footer: Botones (Ajustado según HU-01 del mockup) */}
          <div className="flex justify-between items-center pt-6 mt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-5 text-sm font-bold text-[#1a1a2e] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              Cancelar
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                className="h-10 px-4 text-sm font-bold text-[#c8102e] bg-white border border-red-100 rounded-lg hover:bg-red-50 transition-all flex items-center gap-2"
              >
                <Trash2 size={16} /> Eliminar
              </button>
              <button
                type="submit"
                className="h-10 px-6 text-sm font-bold text-white bg-[#003087] rounded-lg hover:brightness-110 transition-all shadow-md shadow-blue-900/10"
              >
                Guardar proyecto
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateProjectModal;
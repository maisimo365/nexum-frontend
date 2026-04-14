import React from "react";
import Modal from "../../../components/ui/Modal";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectModal = ({ isOpen, onClose }: CreateProjectModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo proyecto">
      <div className="flex flex-col gap-6 w-full max-w-[520px]">
        {/* Header descriptivo similar al mockup */}
        <div className="flex justify-between items-start gap-4">
          <p className="text-[13px] text-[#5b6472] leading-relaxed">
            Completa la información principal para agregar un nuevo proyecto a tu portafolio profesional.
          </p>
          <span className="bg-[#0030871a] text-[#003087] px-2 py-1 rounded-[4px] text-[12px] font-semibold">
            Crear
          </span>
        </div>

        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          {/* Fila 1: Título y Categoría */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#1a1a2e]">Título del proyecto</label>
              <input 
                type="text" 
                className="w-full h-10 px-3 text-sm bg-white border border-[#00000014] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003087]"
                placeholder="Ej. Sistema de Tutorías Inteligentes"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#1a1a2e]">Categoría</label>
              <select className="w-full h-10 px-3 text-sm bg-white border border-[#00000014] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003087]">
                <option value="web">Desarrollo web</option>
                <option value="movil">Móvil</option>
                <option value="data">Data</option>
              </select>
              <p className="text-[12px] text-[#5b6472]">Selecciona una categoría para clasificar el proyecto.</p>
            </div>
          </div>

          {/* Fila 2: Descripción */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-[#1a1a2e]">Descripción</label>
            <textarea 
              rows={4}
              className="w-full p-3 text-sm bg-white border border-[#00000014] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003087] resize-none"
              placeholder="Describe el impacto y funcionalidades de tu proyecto..."
            />
          </div>

          {/* Fila 3: Enlace y Tecnologías */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#1a1a2e]">Enlace del proyecto</label>
              <input 
                type="url" 
                className="w-full h-10 px-3 text-sm bg-white border border-[#00000014] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003087]"
                placeholder="https://github.com/..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-[#1a1a2e]">Tecnologías</label>
              <input 
                type="text" 
                className="w-full h-10 px-3 text-sm bg-white border border-[#00000014] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003087]"
                placeholder="React, NestJS, PostgreSQL"
              />
            </div>
          </div>

          {/* Footer del Formulario: Botones */}
          <div className="flex justify-between items-center pt-4 border-t border-[#00000014]">
            <button 
              type="button" 
              onClick={onClose}
              className="h-9 px-4 text-sm font-semibold text-[#1a1a2e] bg-white border border-[#00000014] rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <div className="flex gap-3">
              <button 
                type="submit"
                className="h-9 px-4 text-sm font-semibold text-white bg-[#003087] rounded-md hover:brightness-90 transition-all shadow-sm"
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
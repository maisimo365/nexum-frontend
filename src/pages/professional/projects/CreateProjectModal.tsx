import React, { useState, useRef, useEffect } from "react";
import Modal from "../../../components/ui/Modal";
import { X, ChevronDown, Check } from "lucide-react";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_TECHS = [
  "React", "Vue.js", "Angular", "Next.js", "Node.js", "NestJS", "Express",
  "Python", "Django", "FastAPI", "Java", "Spring Boot", "C#", ".NET",
  "PHP", "Laravel", "Ruby", "Ruby on Rails", "Go", "Rust",
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase",
  "AWS", "Docker", "Kubernetes", "Tailwind CSS", "TypeScript", "JavaScript",
  "HTML5", "CSS3", "Sass", "GraphQL", "REST API", "Git"
].sort();

const CreateProjectModal = ({ isOpen, onClose }: CreateProjectModalProps) => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [isTechDropdownOpen, setIsTechDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTechDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTech = (tech: string) => {
    if (selectedTechs.includes(tech)) {
      setSelectedTechs(selectedTechs.filter(t => t !== tech));
    } else {
      setSelectedTechs([...selectedTechs, tech]);
    }
  };

  const removeTech = (e: React.MouseEvent, tech: string) => {
    e.stopPropagation();
    setSelectedTechs(selectedTechs.filter(t => t !== tech));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo proyecto">
      <div className="flex flex-col gap-6 w-full max-w-[520px]">
        {/* Header descriptivo con Badge */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[14px] text-[#5b6472] leading-relaxed">
              Completa la información principal para agregar un nuevo proyecto a tu portafolio profesional.
            </p>
          </div>
          <span className="bg-[#eef3f8] text-[#003087] px-3 py-1.5 rounded-md text-[13px] font-bold">
            Crear
          </span>
        </div>

        <form className="flex flex-col gap-5 mt-2" onSubmit={(e) => e.preventDefault()}>
          {/* Fila 1: Título y Categoría */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#1a1a2e]">Título del proyecto</label>
              <input
                type="text"
                className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0030871a] focus:border-[#003087] transition-all text-[#1a1a2e]"
                placeholder="Ej. Sistema de Tutorías Inteligentes"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#1a1a2e]">Categoría</label>
              <select className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0030871a] focus:border-[#003087] transition-all cursor-pointer text-[#1a1a2e]">
                <option value="web">Desarrollo web</option>
                <option value="movil">Móvil</option>
                <option value="data">Data</option>
              </select>
              <p className="text-[11px] text-[#5b6472] mt-0.5 leading-relaxed">
                Selecciona una categoría para clasificar y facilitar la búsqueda del proyecto.
              </p>
            </div>
          </div>

          {/* Fila 2: Descripción */}
          <div className="flex flex-col gap-1.5 -mt-2">
            <label className="text-[13px] font-bold text-[#1a1a2e]">Descripción</label>
            <textarea
              rows={4}
              className="w-full p-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0030871a] focus:border-[#003087] transition-all resize-none text-[#1a1a2e]"
              placeholder="Plataforma para conectar estudiantes con tutores..."
            />
          </div>

          {/* Fila 3: Enlace y Tecnologías */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#1a1a2e]">Enlace del proyecto</label>
              <input
                type="url"
                className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0030871a] focus:border-[#003087] text-[#1a1a2e]"
                placeholder="https://github.com/..."
              />
            </div>
            <div className="flex flex-col gap-1.5" ref={dropdownRef}>
              <label className="text-[13px] font-bold text-[#1a1a2e]">Tecnologías</label>

              <div className="relative">
                {/* Custom Select Trigger */}
                <div
                  className={`min-h-10 w-full px-3 py-2 text-sm bg-white border rounded-lg transition-all cursor-pointer flex items-center justify-between gap-2 ${isTechDropdownOpen ? "ring-2 ring-[#0030871a] border-[#003087]" : "border-gray-200"
                    }`}
                  onClick={() => setIsTechDropdownOpen(!isTechDropdownOpen)}
                >
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {selectedTechs.length === 0 ? (
                      <span className="text-[#5b6472] select-none">React, NestJS, ...</span>
                    ) : (
                      selectedTechs.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#0030871a] text-[#003087] text-[11px] font-semibold"
                        >
                          {tech}
                          <span
                            className="hover:bg-[#00308733] rounded-full p-0.5 transition-colors cursor-pointer"
                            onClick={(e) => removeTech(e, tech)}
                          >
                            <X size={12} />
                          </span>
                        </span>
                      ))
                    )}
                  </div>
                  <ChevronDown size={16} className={`text-[#5b6472] transition-transform flex-shrink-0 ${isTechDropdownOpen ? "rotate-180" : ""}`} />
                </div>

                {/* Dropdown Menu */}
                {isTechDropdownOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto py-1">
                    {AVAILABLE_TECHS.map((tech) => (
                      <div
                        key={tech}
                        className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center justify-between transition-colors"
                        onClick={() => toggleTech(tech)}
                      >
                        <span className={selectedTechs.includes(tech) ? "font-bold text-[#003087]" : "text-[#1a1a2e]"}>
                          {tech}
                        </span>
                        {selectedTechs.includes(tech) && (
                          <Check size={16} className="text-[#003087]" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer: Botones */}
          <div className="flex justify-between items-center pt-6 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-5 text-[14px] font-bold text-[#1a1a2e] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                className="h-10 px-6 text-[14px] font-bold text-white bg-[#c8102e] rounded-lg hover:brightness-110 transition-all"
              >
                Eliminar
              </button>
              <button
                type="submit"
                className="h-10 px-6 text-[14px] font-bold text-white bg-[#c8102e] rounded-lg hover:brightness-110 transition-all"
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
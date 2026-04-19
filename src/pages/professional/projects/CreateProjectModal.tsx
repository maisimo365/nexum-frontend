import React, { useState, useRef, useEffect } from "react";
import Modal from "../../../components/ui/Modal";
import { X, ChevronDown, Check } from "lucide-react";
import { createProject, updateProject, getCategories, getSkillsCatalog, type ProjectCategory, type Skill, type Project } from "../../../services/project.service";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit?: Project | null;
  onDelete?: (id: number) => void;
}

const CreateProjectModal = ({ isOpen, onClose, projectToEdit, onDelete }: CreateProjectModalProps) => {
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);

  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [isTechDropdownOpen, setIsTechDropdownOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      getCategories().then(setCategories).catch(console.error);
      getSkillsCatalog().then(setAvailableSkills).catch(console.error);

      if (projectToEdit) {
        setTitle(projectToEdit.title);
        setCategoryId(projectToEdit.category?.id || "");
        setDescription(projectToEdit.description || "");
        setProjectUrl(projectToEdit.project_url || "");
        // El backend devuelve id y name, podemos asimilarlo a Skill
        setSelectedSkills((projectToEdit.skills as unknown as Skill[]) || []);
      } else {
        setTitle("");
        setCategoryId("");
        setDescription("");
        setProjectUrl("");
        setSelectedSkills([]);
      }
    }
  }, [isOpen, projectToEdit]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTechDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("El título del proyecto es obligatorio.");
      return;
    }

    try {
      setIsSubmitting(true);
      const data = {
        title,
        description,
        project_url: projectUrl,
        category_id: categoryId === "" ? null : categoryId,
        skill_ids: selectedSkills.map(s => s.id),
      };

      if (projectToEdit) {
        await updateProject(projectToEdit.id, data);
      } else {
        await createProject(data);
      }

      // Reset and close
      setTitle("");
      setCategoryId("");
      setDescription("");
      setProjectUrl("");
      setSelectedSkills([]);
      onClose();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Error al crear el proyecto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSkill = (skill: Skill) => {
    if (selectedSkills.find(s => s.id === skill.id)) {
      setSelectedSkills(selectedSkills.filter(s => s.id !== skill.id));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (e: React.MouseEvent, skillId: number) => {
    e.stopPropagation();
    setSelectedSkills(selectedSkills.filter(s => s.id !== skillId));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={projectToEdit ? "Editar proyecto" : "Nuevo proyecto"}>
      <div className="flex flex-col gap-6 w-full max-w-[520px]">
        {/* Header descriptivo con Badge */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[14px] text-[#5b6472] leading-relaxed">
              Completa la información principal para agregar un nuevo proyecto a tu portafolio profesional.
            </p>
          </div>
          <span className="bg-[#eef3f8] text-[#003087] px-3 py-1.5 rounded-md text-[13px] font-bold">
            {projectToEdit ? "Editar" : "Crear"}
          </span>
        </div>

        <form className="flex flex-col gap-5 mt-2" onSubmit={handleSubmit}>
          {/* Fila 1: Título y Categoría */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#1a1a2e]">Título del proyecto</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0030871a] focus:border-[#003087] transition-all text-[#1a1a2e]"
                placeholder="Ej. Sistema de Tutorías Inteligentes"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#1a1a2e]">Categoría</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0030871a] focus:border-[#003087] transition-all cursor-pointer text-[#1a1a2e]"
              >
                <option value="" disabled>Selecciona una categoría</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0030871a] focus:border-[#003087] transition-all resize-none text-[#1a1a2e]"
              placeholder="Plataforma para conectar estudiantes con tutores..."
            />
          </div>

          {/* Fila 3: Enlace */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-[#1a1a2e]">Enlace del proyecto</label>
            <input
              type="url"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              className="w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0030871a] focus:border-[#003087] text-[#1a1a2e]"
              placeholder="https://github.com/..."
            />
          </div>

          {/* Fila 4: Tecnologías */}
          <div className="flex flex-col gap-1.5 mt-1" ref={dropdownRef}>
            <label className="text-[13px] font-bold text-[#1a1a2e]">Tecnologías</label>

            <div className="relative">
              {/* Custom Select Trigger */}
              <div
                className={`min-h-10 w-full px-3 py-2 text-sm bg-white border rounded-lg transition-all cursor-pointer flex items-center justify-between gap-2 ${isTechDropdownOpen ? "ring-2 ring-[#0030871a] border-[#003087]" : "border-gray-200"
                  }`}
                onClick={() => setIsTechDropdownOpen(!isTechDropdownOpen)}
              >
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {selectedSkills.length === 0 ? (
                    <span className="text-[#5b6472] select-none">Ej. React, Python...</span>
                  ) : (
                    selectedSkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#0030871a] text-[#003087] text-[11px] font-semibold"
                      >
                        {skill.name}
                        <span
                          className="hover:bg-[#00308733] rounded-full p-0.5 transition-colors cursor-pointer"
                          onClick={(e) => removeSkill(e, skill.id)}
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
                  {availableSkills.length === 0 && (
                    <div className="px-3 py-2 text-sm text-gray-400">Cargando habilidades...</div>
                  )}
                  {availableSkills.map((skill) => {
                    const isSelected = selectedSkills.some(s => s.id === skill.id);
                    return (
                      <div
                        key={skill.id}
                        className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center justify-between transition-colors"
                        onClick={() => toggleSkill(skill)}
                      >
                        <span className={isSelected ? "font-bold text-[#003087]" : "text-[#1a1a2e]"}>
                          {skill.name} <span className="text-[11px] text-gray-400 ml-1 font-normal">({skill.category})</span>
                        </span>
                        {isSelected && (
                          <Check size={16} className="text-[#003087]" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Footer: Botones */}
          <div className="flex justify-between items-center pt-6 mt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-5 text-[14px] font-bold text-[#1a1a2e] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <div className="flex gap-3">
              {projectToEdit && (
                <button
                  type="button"
                  onClick={() => {
                    if (onDelete) {
                      onDelete(projectToEdit.id);
                      onClose();
                    }
                  }}
                  className="h-10 px-6 text-[14px] font-bold text-white bg-[#c8102e] rounded-lg hover:brightness-110 transition-all"
                >
                  Eliminar
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`h-10 px-6 text-[14px] font-bold text-white rounded-lg transition-all ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#c8102e] hover:brightness-110'}`}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar proyecto'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateProjectModal;
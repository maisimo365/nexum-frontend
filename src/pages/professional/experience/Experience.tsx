import { useState, useEffect, useRef } from 'react'
import Sidebar from '../../admin/components/Sidebar'
import Calendar from '../../../components/ui/Calendar'
import {
  Briefcase, ShieldAlert, ExternalLink, Loader2, AlertCircle, CheckCircle2, ChevronDown, X, Check, Clock, MapPin, Code
} from 'lucide-react'
import { createExperience } from '../../../services/experience.service'
import { getSkillsCatalog, type Skill } from '../../../services/project.service'

function Experience() {
  const [position, setPosition] = useState("")
  const [company, setCompany] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [employmentType, setEmploymentType] = useState("remote")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")

  const [availableSkills, setAvailableSkills] = useState<Skill[]>([])
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])
  const [isTechDropdownOpen, setIsTechDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    getSkillsCatalog().then(setAvailableSkills).catch(console.error)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTechDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const formatMonthYear = (val: string) => {
    let curr = val.replace(/\D/g, "");
    if (curr.length > 6) curr = curr.slice(0, 6);
    if (curr.length >= 3) {
      return curr.slice(0, 2) + "/" + curr.slice(2);
    }
    return curr;
  }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(formatMonthYear(e.target.value))
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(formatMonthYear(e.target.value))
  }

  const handleSave = async () => {
    setError(null)
    setSuccess(null)

    if (!position || !company || !startDate) {
      setError("Por favor completa los campos obligatorios (Cargo, Empresa, Fecha Inicio).")
      return
    }

    // Convert MM/YYYY to YYYY-MM
    const formatToBackend = (val: string) => {
      if (!val || val.length < 7) return null;
      const [m, y] = val.split("/");
      return `${y}-${m}`;
    }

    try {
      setActionLoading(true)

      const payload = {
        position,
        company,
        location: location || null,
        employment_type: employmentType,
        start_date: formatToBackend(startDate),
        end_date: formatToBackend(endDate),
        description: description || null,
        skill_ids: selectedSkills.map(s => s.id)
      }

      await createExperience(payload)

      setSuccess("Experiencia laboral guardada exitosamente.")
      // Reset form
      setPosition("")
      setCompany("")
      setStartDate("")
      setEndDate("")
      setEmploymentType("remote")
      setLocation("")
      setDescription("")
      setSelectedSkills([])
    } catch (err: any) {
      if (err.errors) {
        const firstErr = Object.values(err.errors)[0] as string[]
        setError(firstErr[0])
      } else {
        setError(err.message || "Ocurrió un error al guardar.")
      }
    } finally {
      setActionLoading(false)
    }
  }

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

  const RightPanelContent = () => (
    <div className="sticky top-6">
      <Calendar />

      <div className="mt-8">
        <h3 className="font-bold text-textMain text-sm mb-4 flex items-center gap-2 uppercase tracking-wider">
          <ShieldAlert size={16} className="text-action" />
          NOTIFICACIONES
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-[11px] text-gray-600 leading-tight bg-gray-50 p-3 rounded-lg border border-gray-100">
            <Clock size={14} className="text-action mt-0.5 shrink-0" />
            <span>Mantén tu experiencia actualizada para destacar ante reclutadores.</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-textMain text-sm mb-4 uppercase tracking-wider">Enlaces rápidos</h3>
        <div className="space-y-3 text-xs text-primary">
          <p className="cursor-pointer hover:underline flex items-center justify-between group">
            <span>📋 Guía de Usuario</span>
            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
          <p className="cursor-pointer hover:underline flex items-center justify-between group">
            <span>⚙️ Soporte Técnico</span>
            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar activeItem="Experiencia" />

        <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto bg-[#cbd5e1]">

          <div className="flex-1 p-4 pl-14 sm:pl-6 md:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto pt-2">
              <header className="mb-6">
                <h1 className="text-2xl font-bold text-textMain">Experienca</h1>
              </header>

              <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 mb-8 border border-gray-100">

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-center gap-3 animate-slideIn">
                    <AlertCircle size={18} />
                    {error}
                  </div>
                )}

                {success && (
                  <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm flex items-center gap-3 animate-slideIn">
                    <CheckCircle2 size={18} />
                    {success}
                  </div>
                )}

                <div className="space-y-6 text-[#1a1a2e]">
                  {/* Cargo / Puesto */}
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-4">
                    <label className="text-[13px] font-bold">Cargo / Puesto:</label>
                    <input
                      type="text"
                      placeholder="Ej. Desarrollador Frontend"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      disabled={actionLoading}
                      className="w-full p-2.5 rounded border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm placeholder:text-gray-300"
                    />
                  </div>

                  {/* Empresa */}
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-4">
                    <label className="text-[13px] font-bold">Empresa:</label>
                    <input
                      type="text"
                      placeholder="Url: Comteco"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      disabled={actionLoading}
                      className="w-full p-2.5 rounded border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm placeholder:text-gray-300"
                    />
                  </div>

                  {/* Fecha (1) */}
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-4">
                    <label className="text-[13px] font-bold text-gray-700">Fecha:</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        placeholder="Desde (MM/YYYY)"
                        value={startDate}
                        onChange={handleStartDateChange}
                        disabled={actionLoading}
                        className="flex-1 p-2.5 rounded border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm placeholder:text-gray-300"
                      />
                      <span className="text-gray-400">-</span>
                      <input
                        type="text"
                        placeholder="Hasta (MM/YYYY)"
                        value={endDate}
                        onChange={handleEndDateChange}
                        disabled={actionLoading}
                        className="flex-1 p-2.5 rounded border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  {/* Modalidad de trabajo */}
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-4">
                    <label className="text-[13px] font-bold">Modalidad de trabajo</label>
                    <div className="relative">
                      <select
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value)}
                        disabled={actionLoading}
                        className="w-full p-2.5 rounded border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm appearance-none cursor-pointer"
                      >
                        <option value="remote">Remoto</option>
                        <option value="on_site">Presencial</option>
                        <option value="hybrid">Híbrido</option>
                        <option value="freelance">Freelance</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Ubicacion */}
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-4">
                    <label className="text-[13px] font-bold">Ubicacion</label>
                    <input
                      type="text"
                      placeholder="Av. Villazon"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={actionLoading}
                      className="w-full p-2.5 rounded border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm placeholder:text-gray-300"
                    />
                  </div>


                  {/* Descripcion */}
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-4">
                    <label className="text-[13px] font-bold">Descripcion:</label>
                    <input
                      type="text"
                      placeholder="Funciones de trabajo"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={actionLoading}
                      className="w-full p-2.5 rounded border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm placeholder:text-gray-300"
                    />
                  </div>

                  {/* Tecnologías Usadas */}
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-start gap-4" ref={dropdownRef}>
                    <label className="text-[13px] font-bold pt-2.5">Tecnologías Usadas:</label>
                    <div className="relative">
                      <div
                        className={`min-h-[42px] w-full px-3 py-2 text-sm bg-white border rounded transition-all cursor-pointer flex items-center justify-between gap-2 ${isTechDropdownOpen ? "border-action ring-1 ring-action/10" : "border-gray-200"}`}
                        onClick={() => setIsTechDropdownOpen(!isTechDropdownOpen)}
                      >
                        <div className="flex flex-wrap gap-1.5 flex-1">
                          {selectedSkills.length === 0 ? (
                            <span className="text-gray-300 select-none">React, Laravel</span>
                          ) : (
                            selectedSkills.map((skill) => (
                              <span
                                key={skill.id}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-primary text-[11px] font-semibold"
                              >
                                {skill.name}
                                <span
                                  className="hover:bg-blue-100 rounded-full p-0.5 transition-colors cursor-pointer"
                                  onClick={(e) => removeSkill(e, skill.id)}
                                >
                                  <X size={12} />
                                </span>
                              </span>
                            ))
                          )}
                        </div>
                        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isTechDropdownOpen ? "rotate-180" : ""}`} />
                      </div>

                      {isTechDropdownOpen && (
                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto py-1 animate-fadeIn">
                          {availableSkills.map((skill) => {
                            const isSelected = selectedSkills.some(s => s.id === skill.id)
                            return (
                              <div
                                key={skill.id}
                                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center justify-between transition-colors"
                                onClick={() => toggleSkill(skill)}
                              >
                                <span className={isSelected ? "font-bold text-primary" : "text-[#1a1a2e]"}>
                                  {skill.name}
                                </span>
                                {isSelected && <Check size={16} className="text-primary" />}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-10 mt-6 border-t border-gray-50">
                  <button
                    type="button"
                    onClick={() => {
                      setPosition(""); setCompany(""); setStartDate(""); setEndDate(""); setLocation(""); setDescription(""); setSelectedSkills([]);
                    }}
                    disabled={actionLoading}
                    className="px-8 py-2 rounded-lg border border-gray-200 font-bold text-sm text-gray-700 hover:bg-gray-50 transition-all bg-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={actionLoading}
                    className="px-8 py-2 rounded-lg font-bold text-sm text-white bg-action hover:brightness-110 shadow-md transition-all flex items-center gap-2 min-w-[140px] justify-center"
                  >
                    {actionLoading ? <Loader2 className="animate-spin" size={16} /> : "Guardar"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="w-full lg:w-72 p-6 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 shrink-0">
            <RightPanelContent />
          </aside>
        </main>
      </div>
    </div>
  )
}

export default Experience

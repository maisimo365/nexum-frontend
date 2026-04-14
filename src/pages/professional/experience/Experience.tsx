import { useState, useRef } from 'react'
import Sidebar from '../../admin/components/Sidebar'
import Calendar from '../../../components/ui/Calendar'
import {
  Save, X, ShieldCheck, AlertTriangle,
  CheckCircle, BookOpen, Settings, FileText, Upload, Plus
} from 'lucide-react'

function Experience() {
  const [activeTab, setActiveTab] = useState<'laboral' | 'academica'>('laboral')
  const [tags, setTags] = useState<string[]>(['React', 'JavaScript', 'Node.js'])
  const [newTag, setNewTag] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  // ESTRUCTURA DEL PANEL DERECHO (Basada en Dashboard Admin / PersonalData)
  const RightPanelContent = () => (
    <div className="sticky top-6 space-y-8">
      {/* Calendario */}
      <div>
        <h3 className="font-bold text-textMain text-sm mb-4 uppercase tracking-wider">
          Calendario
        </h3>
        <Calendar />
      </div>

      {/* Notificaciones */}
      <div>
        <h3 className="font-bold text-textMain text-sm mb-4 flex items-center gap-2 uppercase tracking-wider">
          <ShieldCheck size={18} className="text-action" />
          NOTIFICACIONES
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span className="mt-0.5 shrink-0 bg-white p-1 rounded shadow-sm">
              <FileText size={14} className="text-gray-600" />
            </span>
            <span>Precarga automática de datos registrados al acceder al formulario.</span>
          </div>
        </div>
      </div>

      {/* Enlaces Rápidos */}
      <div>
        <h3 className="font-bold text-textMain text-sm mb-4 uppercase tracking-wider">
          Enlaces rápidos
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-primary cursor-pointer hover:underline transition-all">
            <Settings size={16} className="text-gray-500" />
            <span className="font-medium text-gray-700">Configurar perfil</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar activeItem="Experiencia" />

        <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto bg-[#eef3f8]">

          {/* SECCIÓN IZQUIERDA: Formulario */}
          <div className="flex-1 p-4 pl-14 sm:pl-6 md:p-8">
            <header className="mb-6">

              <h1 className="text-2xl font-bold text-textMain">Experiencia</h1>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-4xl">

              {/* TABS CONTAINER */}
              <div className="flex bg-gray-50/50 p-1 rounded-xl mb-8 border border-gray-100 max-w-sm">
                <button
                  onClick={() => setActiveTab('laboral')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${activeTab === 'laboral'
                      ? 'bg-white text-textMain shadow-sm border border-gray-200'
                      : 'text-gray-500 hover:text-textMain'
                    }`}
                >
                  <BookOpen size={16} /> Laboral
                </button>
                <button
                  onClick={() => setActiveTab('academica')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${activeTab === 'academica'
                      ? 'bg-white text-textMain shadow-sm border border-gray-200'
                      : 'text-gray-500 hover:text-textMain'
                    }`}
                >
                  <FileText size={16} /> Académica
                </button>
              </div>

              {/* FORM LABOBRAL */}
              <div className={`space-y-6 ${activeTab === 'laboral' ? 'block' : 'hidden'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-gray-700">Cargo / puesto</label>
                    <input type="text" placeholder="Ej. Desarrollador Frontend" className="w-full p-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-gray-700">Empresa</label>
                    <input type="text" placeholder="Ej. Google o Startup X" className="w-full p-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-gray-700">Fecha de inicio y fin</label>
                    <div className="flex items-center gap-3">
                      <input type="date" className="flex-1 p-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm text-gray-500" />
                      <span className="text-gray-400">—</span>
                      <input type="date" className="flex-1 p-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm text-gray-500" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-gray-700">Ubicación</label>
                    <select className="w-full p-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm text-gray-500 appearance-none">
                      <option value="">Ej. Ciudad o remoto</option>
                      <option value="Cochabamba">Cochabamba</option>
                      <option value="Remoto">Remoto</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-gray-700">Tipo de empleo</label>
                    <select className="w-full p-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm text-gray-500 appearance-none">
                      <option value="">Tiempo completo</option>
                      <option value="part-time">Medio tiempo</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700">Descripción</label>
                  <textarea
                    rows={4}
                    className="w-full p-4 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all resize-none text-sm leading-relaxed"
                    placeholder="Describe tus responsabilidades, logros y el impacto de tu trabajo."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700">Tecnologías usadas</label>
                  <div className="flex flex-wrap items-center gap-2">
                    {tags.map((tag, index) => (
                      <span key={index} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border
                        ${tag === 'React' ? 'bg-gray-50 border-gray-200 text-gray-700' : ''}
                        ${tag === 'JavaScript' ? 'bg-orange-500 border-orange-600 text-white' : ''}
                        ${tag === 'Node.js' ? 'bg-green-100 border-green-200 text-green-700' : ''}
                        ${!['React', 'JavaScript', 'Node.js'].includes(tag) ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}
                      `}>
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:opacity-70"><X size={12} /></button>
                      </span>
                    ))}

                    <div className="flex items-center border border-dashed border-gray-300 rounded-md bg-white">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        placeholder="Añadir..."
                        className="p-1.5 text-xs outline-none bg-transparent w-20 px-2"
                      />
                      <button onClick={handleAddTag} className="p-1 px-2 text-gray-400 hover:text-gray-600">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* FORM ACADÉMICA */}
              <div className={`space-y-6 animate-fadeIn ${activeTab === 'academica' ? 'block' : 'hidden'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-gray-700">Institución</label>
                    <select className="w-full p-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm text-gray-500 appearance-none">
                      <option value="">Ej. Universidad Mayor de San Simón</option>
                      <option value="UCB">Universidad Católica Boliviana</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-gray-700">Título Obtenido</label>
                    <input type="text" placeholder="Ej. Ingeniería de Sistemas" className="w-full p-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-gray-700">Fecha de Inicio y fin</label>
                    <div className="flex items-center gap-3">
                      <input type="date" className="flex-1 p-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm text-gray-500" />
                      <span className="text-gray-400">—</span>
                      <input type="date" className="flex-1 p-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm text-gray-500" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700">Detalle de proyectos</label>
                  <textarea
                    rows={4}
                    className="w-full p-4 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all resize-none text-sm leading-relaxed"
                    placeholder="Detalles de cursos y proyectos..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700">Certificado (Opcional)</label>
                  <div className="w-full bg-[#f0f4f8] border border-dashed border-[#d1dce5] rounded-xl p-8 flex flex-col items-center justify-center gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white border text-gray-700 border-gray-200 font-medium text-sm py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2 transition-all"
                    >
                      <Upload size={16} /> Subir Archivo PDF
                    </button>
                    <input type="file" ref={fileInputRef} accept="application/pdf" className="hidden" />
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS (Shared) */}
              <div className="flex justify-end gap-3 pt-8 mt-6">
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-lg border border-gray-200 font-bold text-sm text-gray-700 hover:bg-gray-50 transition-all shadow-sm bg-white"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center px-6 py-2.5 rounded-lg font-bold text-sm text-white bg-[#dc2626] hover:bg-red-700 shadow-md transition-all"
                >
                  Guardar
                </button>
              </div>

            </div>


          </div>

          {/* ASIDE DERECHO (ESTILO MOCKUP) */}
          <aside className="w-full lg:w-72 p-6 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 shrink-0">
            <RightPanelContent />
          </aside>
        </main>
      </div>
    </div>
  )
}

export default Experience

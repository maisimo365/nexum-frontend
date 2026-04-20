import { useState, useRef } from 'react'
import Sidebar from '../../admin/components/Sidebar'
import Calendar from '../../../components/ui/Calendar'
import {
  X, ShieldCheck,
  Briefcase, Settings, FileText, Plus, BellRing
} from 'lucide-react'

function Experience() {
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

  // ESTRUCTURA DEL PANEL DERECHO (Basada en mockup proporcionado)
  const RightPanelContent = () => (
    <div className="sticky top-6 space-y-8">
      {/* Calendario */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 text-sm mb-4">
          Calendario
        </h3>
        <div className="text-[11px] text-gray-400 mb-2 uppercase font-medium">Octubre 2026</div>
        <Calendar />
      </div>

      {/* Notificaciones */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
          Notificaciones
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed bg-gray-50/50 p-3 rounded-lg border border-gray-50">
            <span className="mt-0.5 shrink-0">
               <BellRing size={16} className="text-gray-400" />
            </span>
            <span>Precarga automática de datos registrados al acceder al formulario.</span>
          </div>
        </div>
      </div>

      {/* Enlaces Rápidos */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 text-sm mb-4">
          Enlaces rápidos
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-primary transition-all font-bold">
            <Settings size={16} className="text-gray-400" />
            <span>Configurar perfil</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#cbd5e1] flex flex-col font-sans">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar activeItem="Experiencia" />

        <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
          
          {/* SECCIÓN IZQUIERDA: Formulario */}
          <div className="flex-1 p-4 pl-14 sm:pl-6 md:p-8">
            <header className="mb-6">
              <h1 className="text-2xl font-bold text-[#1e293b]">Experienca</h1>
            </header>

            <div className="bg-white rounded-[24px] shadow-lg p-3 md:p-1 max-w-5xl mx-auto border border-gray-100 overflow-hidden">
               <div className="bg-white rounded-[20px] p-6 md:p-10 border border-gray-50">
              
              {/* TABS (ESTILO MOCKUP) */}
              <div className="mb-10">
                <div className="flex bg-gray-50/30 p-1.5 rounded-2xl border border-gray-100 w-fit">
                   <button
                    className="flex items-center gap-2 py-2.5 px-8 rounded-xl text-sm font-bold transition-all shadow-sm border bg-white text-gray-800 border-gray-100 shadow-md"
                  >
                    <Briefcase size={18} className="text-gray-600" /> Laboral
                  </button>
                </div>
              </div>

              {/* FORMULARIO - Contenido corregido según Captura 2 */}
              <div className="space-y-10 max-w-4xl">
                
                {/* Cargo / puesto */}
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
                  <span className="text-[15px] font-bold text-[#334155]">Cargo / puesto:</span>
                  <input 
                    type="text" 
                    placeholder="Ej. Desarrollador Frontend" 
                    className="w-full p-3 rounded-lg border border-gray-100 bg-white outline-none focus:border-blue-200 transition-all text-sm placeholder:text-gray-300 shadow-sm" 
                  />
                </div>

                {/* Contratado por */}
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
                  <span className="text-[15px] font-bold text-[#334155]">Contratado por:</span>
                  <input 
                    type="text" 
                    placeholder="Ej. Perfil del empleador (linkedin)" 
                    className="w-full p-3 rounded-lg border border-gray-100 bg-white outline-none focus:border-blue-200 transition-all text-sm placeholder:text-gray-300 shadow-sm" 
                  />
                </div>
                
                {/* Empresa */}
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
                  <span className="text-[15px] font-bold text-[#334155]">Empresa:</span>
                  <input 
                    type="text" 
                    placeholder="Url: Comteco" 
                    className="w-full p-3 rounded-lg border border-gray-100 bg-white outline-none focus:border-blue-200 transition-all text-sm placeholder:text-gray-300 shadow-sm" 
                  />
                </div>

                {/* Fecha */}
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
                  <span className="text-[15px] font-bold text-[#334155]">Fecha:</span>
                  <div className="flex items-center gap-4">
                    <input 
                      type="text" 
                      placeholder="Desde-MM/YYYY" 
                      className="flex-1 p-3 rounded-lg border border-gray-100 bg-white outline-none focus:border-blue-200 transition-all text-sm placeholder:text-gray-300 shadow-sm text-center" 
                    />
                    <span className="text-gray-300">—</span>
                    <input 
                      type="text" 
                      placeholder="Hasta-MM/YYYY" 
                      className="flex-1 p-3 rounded-lg border border-gray-100 bg-white outline-none focus:border-blue-200 transition-all text-sm placeholder:text-gray-300 shadow-sm text-center" 
                    />
                  </div>
                </div>

                {/* Ubicación */}
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
                  <span className="text-[15px] font-bold text-[#334155]">Ubicación:</span>
                  <input 
                    type="text" 
                    placeholder="Ej. Ciudad" 
                    className="w-full p-3 rounded-lg border border-gray-100 bg-white outline-none focus:border-blue-200 transition-all text-sm placeholder:text-gray-300 shadow-sm" 
                  />
                </div>

                {/* Tipo de empleo */}
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
                  <span className="text-[15px] font-bold text-[#334155]">Tipo de empleo:</span>
                  <input 
                    type="text" 
                    placeholder="remoto" 
                    className="w-full p-3 rounded-lg border border-gray-100 bg-white outline-none focus:border-blue-200 transition-all text-sm placeholder:text-gray-300 shadow-sm" 
                  />
                </div>

                {/* Descripción */}
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-start gap-4">
                  <span className="text-[15px] font-bold text-[#334155] pt-2">Descripción:</span>
                  <div className="relative">
                    <textarea
                      rows={6}
                      className="w-full p-5 rounded-xl border border-gray-100 bg-white outline-none focus:border-blue-100 transition-all resize-none text-sm leading-[1.8] placeholder:text-gray-300 shadow-sm"
                      placeholder="Describe tus responsabilidades, logros y el impacto de tu trabajo."
                    />
                  </div>
                </div>

                {/* Tags de Tecnologías - Ajustados a Captura 2 */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                    <div className="w-[200px] hidden md:block">
                       <span className="text-[15px] font-bold text-[#334155]">Tecnologías usadas</span>
                    </div>
                    
                    {/* React Badge */}
                    <span className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border bg-[#f8fafc] border-gray-100 text-[#64748b]">
                       <div className="bg-gray-200/50 p-1 rounded-md">
                          <X size={10} className="text-gray-400 rotate-45" />
                       </div>
                       React
                       <button onClick={() => removeTag('React')} className="ml-1 opacity-40 hover:opacity-100"><X size={14} /></button>
                    </span>

                    {/* JavaScript Badge */}
                    <span className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border bg-[#f97316] border-[#ea580c] text-white">
                       <Briefcase size={12} className="text-white/80" />
                       JavaScript
                       <button onClick={() => removeTag('JavaScript')} className="ml-1 opacity-60 hover:opacity-100"><X size={14} /></button>
                    </span>

                    {/* Node.js Badge */}
                    <span className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border bg-[#dcfce7] border-[#bbf7d0] text-[#166534]">
                       <ShieldCheck size={12} className="text-[#22c55e]" />
                       Node.js
                       <button onClick={() => removeTag('Node.js')} className="ml-1 opacity-50 hover:opacity-100"><X size={14} /></button>
                    </span>

                    {/* Botón Añadir */}
                    <div className="flex items-center border border-dashed border-gray-200 rounded-lg p-0.5 bg-gray-50/30">
                       <input 
                         type="text" 
                         placeholder="Añadir..."
                         className="bg-transparent border-none outline-none text-xs px-3 w-24 placeholder:text-gray-400 font-medium"
                         onKeyDown={(e) => {
                            if(e.key === 'Enter') {
                              handleAddTag();
                            }
                         }}
                         onChange={(e) => setNewTag(e.target.value)}
                         value={newTag}
                       />
                       <button className="p-2 text-gray-300 hover:text-gray-400">
                          <Plus size={16} />
                       </button>
                    </div>
                </div>

                {/* BOTONES FINALES */}
                <div className="flex justify-end gap-4 pt-10 border-t border-gray-50">
                  <button
                    type="button"
                    className="px-10 py-3 rounded-xl border border-gray-200 font-bold text-[15px] text-gray-500 hover:bg-gray-50 transition-all bg-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="px-12 py-3 rounded-xl font-bold text-[15px] text-white bg-[#dc2626] hover:bg-red-700 shadow-xl shadow-red-500/20 transition-all"
                  >
                    Guardar
                  </button>
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* ASIDE DERECHO (ESTILO MOCKUP) */}
          <aside className="w-full lg:w-[360px] p-8 shrink-0">
            <RightPanelContent />
          </aside>
        </main>
      </div>
    </div>
  )
}

export default Experience

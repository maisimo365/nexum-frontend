import { useRef } from 'react'
import Sidebar from '../../admin/components/Sidebar'
import Calendar from '../../../components/ui/Calendar'
import { 
  ShieldCheck, CheckCircle, Settings, FileText, Upload 
} from 'lucide-react'

function Certifications() {
  const fileInputRef = useRef<HTMLInputElement>(null)

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
        <Sidebar activeItem="Certificaciones" />

        <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto bg-[#eef3f8]">
          
          {/* SECCIÓN IZQUIERDA: Formulario */}
          <div className="flex-1 p-4 pl-14 sm:pl-6 md:p-8">
            <header className="mb-6">

              <h1 className="text-2xl font-bold text-textMain">Certificaciones</h1>
            </header>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-4xl">
              
              <h2 className="text-base font-bold text-textMain mb-6">Añadir Certificación</h2>

              <div className="space-y-6">
                {/* Campos Principales */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
                    <label className="text-[13px] font-bold text-gray-700">Nombre de la Certificación:</label>
                    <input 
                      type="text" 
                      placeholder="Ej. AWS Certified Solutions Architect" 
                      className="w-full p-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
                    <label className="text-[13px] font-bold text-gray-700">Entidad Emisora:</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Amazon Web Services" 
                      className="w-full p-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-4">
                    <label className="text-[13px] font-bold text-gray-700">Fecha:</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="month" 
                        className="flex-1 p-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm text-gray-500 placeholder-transparent" 
                      />
                      <span className="text-gray-400">—</span>
                      <input 
                        type="month" 
                        className="flex-1 p-2.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm text-gray-500 placeholder-transparent" 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="text-[13px] font-bold text-gray-700 mb-3 block">Certificado o Insignia (Opcional):</label>
                  <div className="w-full bg-[#f0f4f8] border border-dashed border-[#d1dce5] rounded-xl p-8 flex flex-col items-center justify-center gap-3">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white border text-gray-700 border-gray-200 font-medium text-sm py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2 transition-all"
                    >
                      <Upload size={16} /> Subir Archivo PDF o Imagen
                    </button>
                    <input type="file" ref={fileInputRef} accept="application/pdf,image/*" className="hidden" />
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3 pt-8 mt-6">
                <button 
                  type="button" 
                  className="px-6 py-2.5 rounded-lg border border-gray-200 font-medium text-sm text-gray-700 hover:bg-gray-50 transition-all shadow-sm bg-white"
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="flex items-center justify-center px-6 py-2.5 rounded-lg font-medium text-sm text-white bg-[#dc2626] hover:bg-red-700 shadow-md transition-all"
                >
                  Guardar Certificación
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

export default Certifications

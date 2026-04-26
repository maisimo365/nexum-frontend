import { useRef, useState } from 'react'
import Sidebar from '../../admin/components/Sidebar'
import Calendar from '../../../components/ui/Calendar'
import {
  ShieldCheck, Settings, FileText, Upload, Loader2, AlertCircle, CheckCircle2
} from 'lucide-react'
import { createCertification, updateCertificationImage } from '../../../services/certification.service'

function Certifications() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [entidad, setEntidad] = useState("")
  const [fechaDesde, setFechaDesde] = useState("")
  const [fechaHasta, setFechaHasta] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/.test(val)) {
      setTitulo(val);
    }
  }

  const handleDescripcionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescripcion(e.target.value);
  }

  const handleEntidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntidad(e.target.value);
  }

  const formatMonthYear = (val: string) => {
    let curr = val.replace(/\D/g, "");
    if (curr.length > 6) curr = curr.slice(0, 6);
    if (curr.length >= 3) {
      return curr.slice(0, 2) + "/" + curr.slice(2);
    }
    return curr;
  }

  const handleFechaDesdeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFechaDesde(formatMonthYear(e.target.value));
  }

  const handleFechaHastaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFechaHasta(formatMonthYear(e.target.value));
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Solo se permiten archivos de imagen (JPG, PNG, WEBP).")
        setSelectedFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
        return
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("limite exedido, por favor seleccione otra imagen")
        setSelectedFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
        return
      }
      setSelectedFile(file)
      setError(null)
    }
  }

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  const handleSave = async () => {
    setError(null)
    setSuccess(null)

    if (!titulo || !entidad || !fechaDesde) {
      setError("Por favor completa los campos obligatorios.")
      return
    }

    if (!isValidUrl(entidad)) {
      setError("La entidad emisora debe ser una URL válida (ej: https://udemy.com/...)")
      return
    }

    try {
      setActionLoading(true)

      const payload = {
        name: titulo,
        description: descripcion || null,
        issuing_entity: entidad,
        issue_date: fechaDesde,
        expiration_date: fechaHasta || null
      }

      const newCert = await createCertification(payload)

      if (selectedFile) {
        await updateCertificationImage(newCert.id, selectedFile)
      }

      setSuccess("Certificación guardada exitosamente.")
      setTitulo("")
      setDescripcion("")
      setEntidad("")
      setFechaDesde("")
      setFechaHasta("")
      setSelectedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
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

  const RightPanelContent = () => (
    <div className="sticky top-6 space-y-8">
      <div>
        <Calendar />
      </div>

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
            <span>Las certificaciones ayudan a validar tus conocimientos técnicos.</span>
          </div>
        </div>
      </div>

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

        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#cbd5e1]">

          <div className="flex-1 p-4 pl-14 sm:pl-6 md:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto pt-2">
              <header className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-textMain">Certificaciones</h1>
              </header>

              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
                <h2 className="text-base font-bold text-textMain mb-6">Añadir Certificación</h2>

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

                <div className="space-y-6 text-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-4">
                    <label className="text-[13px] font-bold">Título de la Certificación:</label>
                    <input
                      type="text"
                      placeholder="Ej. Cisco Certified Network Associate"
                      value={titulo}
                      onChange={handleTituloChange}
                      disabled={actionLoading}
                      className="w-full p-2.5 rounded border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-4">
                    <label className="text-[13px] font-bold">Descripción (Opcional):</label>
                    <input
                      type="text"
                      placeholder="Ej. Redes de computadoras y protocolos"
                      value={descripcion}
                      onChange={handleDescripcionChange}
                      disabled={actionLoading}
                      className="w-full p-2.5 rounded border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-4">
                    <label className="text-[13px] font-bold">URL Entidad Emisora:</label>
                    <input
                      type="text"
                      placeholder="https://entidad.com/certificado"
                      value={entidad}
                      onChange={handleEntidadChange}
                      disabled={actionLoading}
                      className="w-full p-2.5 rounded border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-start md:items-center gap-4">
                    <label className="text-[13px] font-bold">Fecha:</label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
                      <input
                        type="text"
                        placeholder="Desde (MM/YYYY) *"
                        value={fechaDesde}
                        onChange={handleFechaDesdeChange}
                        disabled={actionLoading}
                        className="w-full sm:flex-1 min-w-0 p-2.5 rounded border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm"
                      />
                      <span className="text-gray-400 hidden sm:block">-</span>
                      <input
                        type="text"
                        placeholder="Hasta (MM/YYYY)"
                        value={fechaHasta}
                        onChange={handleFechaHastaChange}
                        disabled={actionLoading}
                        className="w-full sm:flex-1 min-w-0 p-2.5 rounded border border-gray-200 bg-white outline-none focus:border-action transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <label className="text-[13px] font-bold mb-3 block">Insignia o Imagen (JPG, PNG):</label>
                    <div className="w-full bg-[#f0f4f8] border border-dashed border-[#d1dce5] rounded-xl p-8 flex flex-col items-center justify-center gap-3">
                      {selectedFile ? (
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded shadow-md border-2 border-white"
                          />
                          <p className="text-xs text-gray-500 font-medium">{selectedFile.name}</p>
                          <button onClick={() => setSelectedFile(null)} className="text-red-500 text-[10px] hover:underline">Quitar</button>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={actionLoading}
                            className="bg-white border text-gray-700 border-gray-200 font-medium text-sm py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2 transition-all disabled:opacity-50"
                          >
                            <Upload size={16} /> Seleccionar Imagen
                          </button>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Formato JPG, PNG o WEBP - Máx 2MB</p>
                        </>
                      )}
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-8 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setTitulo(""); setDescripcion(""); setEntidad(""); setFechaDesde(""); setFechaHasta(""); setSelectedFile(null);
                    }}
                    disabled={actionLoading}
                    className="px-6 py-2 rounded border border-gray-200 font-medium text-sm text-gray-700 hover:bg-gray-50 transition-all shadow-sm bg-white"
                  >
                    Limpiar
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={actionLoading}
                    className="px-6 py-2 rounded font-medium text-sm text-white bg-[#dc2626] hover:bg-red-700 shadow-sm transition-all flex items-center gap-2 min-w-[150px] justify-center"
                  >
                    {actionLoading ? <Loader2 className="animate-spin" size={16} /> : "Guardar Certificación"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="w-full lg:w-72 p-6 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 shrink-0 shadow-lg overflow-y-auto">
            <RightPanelContent />
          </aside>
        </main>
      </div>
    </div>
  )
}

export default Certifications

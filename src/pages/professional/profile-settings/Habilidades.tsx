import { useState, useCallback } from "react";
import Sidebar from "../../admin/components/Sidebar";
import RightWidgets from "../../../components/ui/RightWidgets";
import Toast from "../../../components/ui/Toast";

// ─── Tipos ────────────────────────────────────────────────────────────────────
type TipoHabilidad = "Técnica" | "Blanda";
type NivelHabilidad = "Básico" | "Intermedio" | "Avanzado";

interface Skill {
  id: number;
  nombre: string;
  tipo: TipoHabilidad;
  nivel: NivelHabilidad;
}

interface FiltrosAplicados {
  tipo: TipoHabilidad | "Todas";
  nivel: NivelHabilidad | "Todos";
  busqueda: string;
}

// ─── Datos iniciales de ejemplo ───────────────────────────────────────────────
const INITIAL_SKILLS: Skill[] = [
  { id: 1, nombre: "React", tipo: "Técnica", nivel: "Avanzado" },
  { id: 2, nombre: "Comunicación", tipo: "Blanda", nivel: "Intermedio" },
  { id: 3, nombre: "Node.js", tipo: "Técnica", nivel: "Intermedio" },
  { id: 4, nombre: "Liderazgo de equipos", tipo: "Blanda", nivel: "Avanzado" },
  { id: 5, nombre: "Figma", tipo: "Técnica", nivel: "Básico" },
];

// ─── Helpers de badges ────────────────────────────────────────────────────────
const TIPO_STYLES: Record<TipoHabilidad, string> = {
  Técnica: "bg-blue-100 text-blue-700 border border-blue-200",
  Blanda: "bg-purple-100 text-purple-700 border border-purple-200",
};

const NIVEL_STYLES: Record<NivelHabilidad, string> = {
  Avanzado: "bg-green-100 text-green-700 border border-green-200",
  Intermedio: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Básico: "bg-gray-100 text-gray-600 border border-gray-200",
};

// ─── Ícono de barras de señal ──────────────────────────────────────────────────
interface SignalBarsProps {
  nivel: NivelHabilidad;
  active: boolean;
}

function SignalBars({ nivel, active }: SignalBarsProps) {
  const heights: Record<NivelHabilidad, [number, number, number]> = {
    Básico: [1, 0, 0],
    Intermedio: [1, 1, 0],
    Avanzado: [1, 1, 1],
  };
  const bars = heights[nivel] ?? ([0, 0, 0] as [number, number, number]);
  const activeColor = active ? "#1D4ED8" : "#6B7280";
  const inactiveColor = "#D1D5DB";
  const barHeights: [number, number, number] = [10, 14, 18];

  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {([0, 1, 2] as const).map((i) => (
        <rect
          key={i}
          x={i * 7 + 1}
          y={20 - barHeights[i]}
          width="5"
          height={barHeights[i]}
          rx="1.5"
          fill={bars[i] ? activeColor : inactiveColor}
        />
      ))}
    </svg>
  );
}

// ─── Modal de confirmación de eliminación ─────────────────────────────────────
interface DeleteModalProps {
  skill: Skill;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteModal({ skill, onConfirm, onCancel }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Eliminar habilidad</h3>
            <p className="text-sm text-gray-500">Esta acción no se puede deshacer</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-6">
          ¿Estás seguro de que deseas eliminar <span className="font-semibold text-gray-900">"{skill.nombre}"</span> de tu perfil?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Modal Nueva / Editar Habilidad ──────────────────────────────────────────
interface SkillFormData {
  nombre: string;
  tipo: TipoHabilidad;
  nivel: NivelHabilidad;
}

interface SkillModalProps {
  skill?: Skill;
  onSave: (data: SkillFormData) => void;
  onCancel: () => void;
}

interface FormErrors {
  nombre?: string;
  nivel?: string;
}

function SkillModal({ skill, onSave, onCancel }: SkillModalProps) {
  const isEdit = !!skill;
  const [nombre, setNombre] = useState<string>(skill?.nombre ?? "");
  const [tipo, setTipo] = useState<TipoHabilidad>(skill?.tipo ?? "Técnica");
  const [nivel, setNivel] = useState<NivelHabilidad | "">(skill?.nivel ?? "");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!nombre.trim()) e.nombre = "El nombre es requerido.";
    if (!nivel) e.nivel = "Selecciona un nivel de dominio.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSave({ nombre: nombre.trim(), tipo, nivel: nivel as NivelHabilidad });
  };

  const niveles: NivelHabilidad[] = ["Básico", "Intermedio", "Avanzado"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            {isEdit ? "Editar habilidad" : "Nueva habilidad"}
          </h2>
          <button
            onClick={onCancel}
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nombre de la habilidad
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                setErrors((prev) => ({ ...prev, nombre: "" }));
              }}
              placeholder="Ej. Python, Negociación..."
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-colors placeholder:text-gray-400
                ${errors.nombre
                  ? "border-red-400 bg-red-50 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                }`}
            />
            {errors.nombre && <p className="text-xs text-red-500 mt-1">{errors.nombre}</p>}
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <div className="flex gap-5">
              {(["Técnica", "Blanda"] as TipoHabilidad[]).map((t) => (
                <label key={t} className="flex items-center gap-2 cursor-pointer select-none">
                  <div className="relative">
                    <input
                      type="radio"
                      name="tipo"
                      value={t}
                      checked={tipo === t}
                      onChange={() => setTipo(t)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                        ${tipo === t ? "border-blue-600" : "border-gray-300"}`}
                    >
                      {tipo === t && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>
                  </div>
                  <span className="text-sm text-gray-700">{t}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Nivel */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de dominio</label>
            {isEdit ? (
              // Selector visual con barras (modo edición)
              <div className="grid grid-cols-3 gap-2">
                {niveles.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setNivel(n);
                      setErrors((prev) => ({ ...prev, nivel: "" }));
                    }}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all
                      ${nivel === n
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    <SignalBars nivel={n} active={nivel === n} />
                    <span className={`text-xs font-medium ${nivel === n ? "text-blue-700" : "text-gray-600"}`}>
                      {n}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              // Dropdown (modo nuevo)
              <div className="relative">
                <select
                  value={nivel}
                  onChange={(e) => {
                    setNivel(e.target.value as NivelHabilidad);
                    setErrors((prev) => ({ ...prev, nivel: "" }));
                  }}
                  className={`w-full px-3 py-2 text-sm border rounded-lg outline-none appearance-none bg-white transition-colors
                    ${errors.nivel ? "border-red-400 bg-red-50" : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}
                    ${!nivel ? "text-gray-400" : "text-gray-900"}`}
                >
                  <option value="" disabled>Selecciona un nivel</option>
                  {niveles.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}
            {errors.nivel && <p className="text-xs text-red-500 mt-1">{errors.nivel}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 justify-end px-6 py-4 border-t border-gray-100">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 active:scale-95 transition-all"
          >
            {isEdit ? "Guardar cambios" : "Guardar habilidad"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function HabilidadesPage() {
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [filtroTipo, setFiltroTipo] = useState<TipoHabilidad | "Todas">("Todas");
  const [filtroNivel, setFiltroNivel] = useState<NivelHabilidad | "Todos">("Todos");
  const [busqueda, setBusqueda] = useState<string>("");
  const [filtrosAplicados, setFiltrosAplicados] = useState<FiltrosAplicados>({
    tipo: "Todas",
    nivel: "Todos",
    busqueda: "",
  });

  const [modalNuevo, setModalNuevo] = useState<boolean>(false);
  const [modalEditar, setModalEditar] = useState<Skill | null>(null);
  const [modalEliminar, setModalEliminar] = useState<Skill | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Filtrado
  const skillsFiltradas = skills.filter((s) => {
    const matchTipo = filtrosAplicados.tipo === "Todas" || s.tipo === filtrosAplicados.tipo;
    const matchNivel = filtrosAplicados.nivel === "Todos" || s.nivel === filtrosAplicados.nivel;
    const matchBusqueda = s.nombre.toLowerCase().includes(filtrosAplicados.busqueda.toLowerCase());
    return matchTipo && matchNivel && matchBusqueda;
  });

  const handleAplicarFiltros = () => {
    setFiltrosAplicados({ tipo: filtroTipo, nivel: filtroNivel, busqueda });
  };

  const handleGuardarNuevo = ({ nombre, tipo, nivel }: SkillFormData) => {
    const nueva: Skill = { id: Date.now(), nombre, tipo, nivel };
    setSkills((prev) => [...prev, nueva]);
    setModalNuevo(false);
    setToast(`La habilidad '${nombre}' se ha añadido correctamente a tu perfil.`);
  };

  const handleGuardarEditar = ({ nombre, tipo, nivel }: SkillFormData) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === modalEditar?.id ? { ...s, nombre, tipo, nivel } : s))
    );
    setModalEditar(null);
    setToast(`La habilidad '${nombre}' se ha actualizado correctamente.`);
  };

  const handleEliminarConfirm = () => {
    setSkills((prev) => prev.filter((s) => s.id !== modalEliminar?.id));
    setModalEliminar(null);
  };

  const handleCloseToast = useCallback(() => setToast(null), []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeItem="Habilidades" />

        <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
          <div className="flex-1 p-4 pl-14 sm:pl-6 md:p-8">
            <header className="mb-6">
              <p className="text-sm text-gray-500 mb-0.5">Portafolio profesional UMSS</p>
              <h1 className="text-2xl font-bold text-textMain">Mis Habilidades</h1>
              <p className="text-sm text-gray-500 mt-1">Administra tus habilidades técnicas y blandas con su nivel de dominio.</p>
            </header>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
              <div className="grid gap-3 sm:grid-cols-3 w-full">
                <div className="relative">
                  <div className="flex items-center gap-1.5 pl-2.5 pr-1 py-1.5 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 hover:border-gray-400 transition-colors">
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                    <select
                      value={filtroTipo}
                      onChange={(e) => setFiltroTipo(e.target.value as TipoHabilidad | "Todas")}
                      className="appearance-none bg-transparent outline-none text-sm text-gray-700 cursor-pointer pr-5"
                    >
                      <option value="Todas">Todas</option>
                      <option value="Técnica">Técnica</option>
                      <option value="Blanda">Blanda</option>
                    </select>
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pl-2.5 pr-1 py-1.5 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 hover:border-gray-400 transition-colors">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <select
                    value={filtroNivel}
                    onChange={(e) => setFiltroNivel(e.target.value as NivelHabilidad | "Todos")}
                    className="appearance-none bg-transparent outline-none text-sm text-gray-700 cursor-pointer pr-5"
                  >
                    <option value="Todos">Todos</option>
                    <option value="Básico">Básico</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>
                  <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg bg-white hover:border-gray-400 transition-colors">
                  <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAplicarFiltros()}
                    placeholder="Buscar habilidad..."
                    className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent"
                  />
                </div>
              </div>

              <button
                onClick={() => setModalNuevo(true)}
                className="w-full md:w-auto px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg active:scale-95 transition-all"
              >
                Nueva habilidad
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 w-2/5">Habilidad</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 w-1/5">Tipo</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 w-1/5">Nivel</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 w-1/5">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {skillsFiltradas.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-12 text-sm text-gray-400">
                        No se encontraron habilidades con los filtros aplicados.
                      </td>
                    </tr>
                  ) : (
                    skillsFiltradas.map((skill, idx) => (
                      <tr
                        key={skill.id}
                        className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${
                          idx === skillsFiltradas.length - 1 ? "border-b-0" : ""
                        }`}
                      >
                        <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{skill.nombre}</td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${TIPO_STYLES[skill.tipo] ?? ""}`}>
                            {skill.tipo}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${NIVEL_STYLES[skill.nivel] ?? ""}`}>
                            {skill.nivel}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setModalEditar(skill)}
                              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => setModalEliminar(skill)}
                              className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 active:scale-95 transition-all"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <RightWidgets type="profile" />
        </main>
      </div>

      {/* ── Modales ── */}
      {modalNuevo && (
        <SkillModal onSave={handleGuardarNuevo} onCancel={() => setModalNuevo(false)} />
      )}
      {modalEditar && (
        <SkillModal skill={modalEditar} onSave={handleGuardarEditar} onCancel={() => setModalEditar(null)} />
      )}
      {modalEliminar && (
        <DeleteModal
          skill={modalEliminar}
          onConfirm={handleEliminarConfirm}
          onCancel={() => setModalEliminar(null)}
        />
      )}

      {/* ── Toast ── */}
      {toast && <Toast message={toast} type="success" onClose={handleCloseToast} />}
    </div>
  );
}

import { useState, useCallback, useEffect } from "react";
import Sidebar from "../admin/components/Sidebar";
import Toast from "../../components/ui/Toast";

import {
  getPortfolioSkills, getCatalogSkills,
  addPortfolioSkill, updatePortfolioSkill,
  deletePortfolioSkill, suggestSkill,
  type ApiPortfolioSkill,
} from '../../services/habilidades.service';

// ─── Tipos internos del frontend ──────────────────────────────────────────────
type TipoHabilidad = "Técnica" | "Blanda";
type NivelHabilidad = "Básico" | "Intermedio" | "Avanzado";
type CategoriaKey =
  | "lenguajes" | "frameworks" | "bases-datos" | "otras"
  | "comunicacion-tecnica" | "trabajo-equipo" | "liderazgo";

interface Skill {
  portfolioSkillId: number;
  skillId: number;
  nombre: string;
  tipo: TipoHabilidad;
  nivel: NivelHabilidad | null;
  categoria: string;
}

interface CatalogItem {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: TipoHabilidad;
  categoria: string;
}

// ─── Mapeo API ↔ frontend ─────────────────────────────────────────────────────
function apiTypeToFrontend(type: "tecnica" | "blanda"): TipoHabilidad {
  return type === "tecnica" ? "Técnica" : "Blanda";
}

function frontendTypeToApi(tipo: TipoHabilidad): "tecnica" | "blanda" {
  return tipo === "Técnica" ? "tecnica" : "blanda";
}

function apiLevelToFrontend(
  level: "basico" | "intermedio" | "avanzado" | null
): NivelHabilidad | null {
  if (!level) return null;
  const map: Record<string, NivelHabilidad> = {
    basico: "Básico", intermedio: "Intermedio", avanzado: "Avanzado",
  };
  return map[level] ?? null;
}

function frontendLevelToApi(
  nivel: NivelHabilidad | null
): "basico" | "intermedio" | "avanzado" | null {
  if (!nivel) return null;
  const map: Record<NivelHabilidad, "basico" | "intermedio" | "avanzado"> = {
    Básico: "basico", Intermedio: "intermedio", Avanzado: "avanzado",
  };
  return map[nivel];
}

/**
 * BUG FIX: La respuesta real del backend tiene campos APLANADOS.
 * No existe api.skill.name — los campos son directamente api.name, api.type, api.category.
 */
function mapPortfolioSkill(api: ApiPortfolioSkill): Skill {
  return {
    portfolioSkillId: api.id,
    skillId:          api.skill_id,
    nombre:           api.name,       // ← antes: api.skill.name  ← CRASH
    tipo:             apiTypeToFrontend(api.type),      // ← antes: api.skill.type
    nivel:            apiLevelToFrontend(api.level),
    categoria:        api.category,   // ← antes: api.skill.category
  };
}

// ─── Mapeo categorías backend → CategoriaKey frontend ────────────────────────
const CATEGORIA_KEY_MAP: Record<string, CategoriaKey> = {
  "Lenguajes de Programación": "lenguajes",
  "Frameworks & Librerías":    "frameworks",
  "Bases de Datos":            "bases-datos",
  "Cloud & DevOps":            "otras",
  "Herramientas & Plataformas":"otras",
  "Comunicación":              "comunicacion-tecnica",
  "Colaboración":              "trabajo-equipo",
  "Liderazgo & Gestión":       "liderazgo",
  "Pensamiento Analítico":     "otras",
  "Desarrollo Personal":       "otras",
};

// ─── Catálogos UI ─────────────────────────────────────────────────────────────
interface CategoriaInfo {
  key: CategoriaKey; label: string; sublabel: string; ejemplos: string; tipo: TipoHabilidad;
}

const CATEGORIAS_TECNICA: CategoriaInfo[] = [
  { key: "lenguajes",   label: "Lenguajes",             sublabel: "TÉCNICA", ejemplos: "Python, JavaScript, Java",    tipo: "Técnica" },
  { key: "frameworks",  label: "Frameworks & Librerías", sublabel: "TÉCNICA", ejemplos: "React, Vue, Next.js",         tipo: "Técnica" },
  { key: "bases-datos", label: "Bases de Datos",         sublabel: "TÉCNICA", ejemplos: "MySQL, PostgreSQL, Supabase", tipo: "Técnica" },
  { key: "otras",       label: "Otras",                  sublabel: "TÉCNICA", ejemplos: "Docker, Git, Figma",          tipo: "Técnica" },
];

const CATEGORIAS_BLANDA: CategoriaInfo[] = [
  { key: "comunicacion-tecnica", label: "Comunicación técnica", sublabel: "SOFT", ejemplos: "Feedback, documentación, presentaciones", tipo: "Blanda" },
  { key: "trabajo-equipo",       label: "Trabajo en equipo",    sublabel: "SOFT", ejemplos: "Colaboración y coordinación",              tipo: "Blanda" },
  { key: "liderazgo",            label: "Liderazgo",            sublabel: "SOFT", ejemplos: "Guía y toma de decisiones",                tipo: "Blanda" },
];

function categoriasParaTipo(tipo: TipoHabilidad): CategoriaInfo[] {
  return tipo === "Técnica" ? CATEGORIAS_TECNICA : CATEGORIAS_BLANDA;
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const NIVEL_BADGE: Record<NivelHabilidad, string> = {
  Avanzado:   "bg-green-100 text-green-700 border border-green-200",
  Intermedio: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Básico:     "bg-gray-100 text-gray-500 border border-gray-200",
};

const NIVEL_DOT: Record<NivelHabilidad, string> = {
  Avanzado: "bg-green-500", Intermedio: "bg-yellow-400", Básico: "bg-gray-400",
};

// ─── Íconos ───────────────────────────────────────────────────────────────────
function IconEdit({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-3.5 h-3.5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.415.586H9v-2a2 2 0 01.586-1.414z" />
    </svg>
  );
}

function IconTrash({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-3.5 h-3.5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function IconSearch({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function IconSpinner({ className = "" }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}

function SkillIcon({ tipo }: { tipo: TipoHabilidad }) {
  if (tipo === "Técnica") {
    return (
      <div className="w-7 h-7 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-7 h-7 rounded-md bg-purple-100 flex items-center justify-center flex-shrink-0">
      <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
  );
}

// ─── SkillChip ────────────────────────────────────────────────────────────────
function SkillChip({ skill, onEdit, onDelete, deleting }: {
  skill: Skill; onEdit: () => void; onDelete: () => void; deleting: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 transition-colors ${deleting ? "opacity-50" : "hover:border-gray-300"}`}>
      <SkillIcon tipo={skill.tipo} />
      <span className="text-sm font-medium text-gray-800">{skill.nombre}</span>
      {skill.nivel && (
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${NIVEL_BADGE[skill.nivel]}`}>
          {skill.nivel}
        </span>
      )}
      <button onClick={onEdit} disabled={deleting} className="ml-1 p-0.5 text-gray-400 hover:text-blue-600 transition-colors rounded disabled:cursor-not-allowed"
        title={skill.tipo === "Técnica" ? "Cambiar nivel" : "Ver información"}>
        <IconEdit />
      </button>
      <button onClick={onDelete} disabled={deleting} className="p-0.5 text-gray-400 hover:text-red-600 transition-colors rounded disabled:cursor-not-allowed" title="Eliminar">
        {deleting ? <IconSpinner className="w-3.5 h-3.5 text-red-400" /> : <IconTrash />}
      </button>
    </div>
  );
}

// ─── Modal: Eliminar ──────────────────────────────────────────────────────────
function DeleteModal({ skill, loading, onConfirm, onCancel }: {
  skill: Skill; loading: boolean; onConfirm: () => void; onCancel: () => void;
}) {
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
          ¿Estás seguro de que deseas eliminar{" "}
          <span className="font-semibold text-gray-900">"{skill.nombre}"</span> de tu perfil?
        </p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} disabled={loading} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">Cancelar</button>
          <button onClick={onConfirm} disabled={loading} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60">
            {loading && <IconSpinner className="w-4 h-4" />}
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Modal: Editar nivel ──────────────────────────────────────────────────────
function EditNivelModal({ skill, loading, onSave, onCancel }: {
  skill: Skill; loading: boolean; onSave: (nivel: NivelHabilidad) => void; onCancel: () => void;
}) {
  const [nivel, setNivel] = useState<NivelHabilidad>(skill.nivel ?? "Básico");

  const niveles: { key: NivelHabilidad; desc: string }[] = [
    { key: "Básico",     desc: "Conceptos y uso guiado." },
    { key: "Intermedio", desc: "Implementación funcional en proyectos." },
    { key: "Avanzado",   desc: "Uso profesional autónomo." },
  ];

  if (skill.tipo === "Blanda") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 text-center">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Sin nivel disponible</h3>
          <p className="text-xs text-gray-500 mb-5">
                Las habilidades blandas no tienen nivel de dominio. Si ya no aplica a tu perfil, puedes eliminarla.
          </p>
          <button onClick={onCancel} className="px-5 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">Entendido</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Cambiar nivel de dominio</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              <span className="font-semibold text-gray-600">{skill.nombre}</span>
              {" · "}
              <span className="text-blue-600">{skill.tipo}</span>
            </p>
          </div>
          <button onClick={onCancel} disabled={loading} className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mx-6 mt-4 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 flex items-start gap-2">
          <svg className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-9a3 3 0 100 6 3 3 0 000-6z" />
          </svg>
          <p className="text-xs text-gray-500">
            El nombre y tipo no son editables. Solo el nivel es actualizable.
          </p>
        </div>
        <div className="px-6 py-5">
          <label className="block text-sm font-medium text-gray-700 mb-3">Nivel de dominio</label>
          <div className="grid grid-cols-3 gap-2">
            {niveles.map((n) => (
              <button key={n.key} type="button" disabled={loading} onClick={() => setNivel(n.key)}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all disabled:opacity-50 ${nivel === n.key ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"}`}>
                <div className={`w-2.5 h-2.5 rounded-full ${NIVEL_DOT[n.key]}`} />
                <span className={`text-xs font-semibold ${nivel === n.key ? "text-blue-700" : "text-gray-600"}`}>{n.key}</span>
                <span className="text-[10px] text-gray-400 text-center leading-tight">{n.desc}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3 justify-end px-6 py-4 border-t border-gray-100">
          <button onClick={onCancel} disabled={loading} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">Cancelar</button>
          <button onClick={() => onSave(nivel)} disabled={loading} className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-60">
            {loading && <IconSpinner className="w-4 h-4" />}
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Modal: Sugerir habilidad ─────────────────────────────────────────────────
function SugerirHabilidadModal({ nombreInicial, tipo, categoriaKey, onCancel, onToast }: {
  nombreInicial: string; tipo: TipoHabilidad; categoriaKey: string | null;
  onCancel: () => void;
  onToast: (msg: string, t: "success" | "error") => void;
}) {
  const [nombre, setNombre]         = useState(nombreInicial);
  const [descripcion, setDescripcion] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [loading, setLoading]       = useState(false);

  const categoriaLabel =
    [...CATEGORIAS_TECNICA, ...CATEGORIAS_BLANDA].find(c => c.key === categoriaKey)?.label ?? "—";

  const handleSubmit = async () => {
    if (!nombre.trim()) { setErrorNombre("El nombre es requerido."); return; }
    setLoading(true);
    try {
      await suggestSkill(nombre.trim(), frontendTypeToApi(tipo), categoriaKey ?? "otras", descripcion.trim() || undefined);
      onToast(`Sugerencia "${nombre.trim()}" enviada correctamente.`, "success");
      onCancel();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al enviar la sugerencia.";
      onToast(message, "error");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Sugerir habilidad</h2>
            <p className="text-xs text-gray-400 mt-0.5">Se enviará para revisión antes de aparecer en el catálogo.</p>
          </div>
          <button onClick={onCancel} disabled={loading} className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
              <p className="text-[10px] font-bold uppercase text-gray-400 mb-0.5">Tipo</p>
              <p className="text-sm font-semibold text-gray-700">{tipo}</p>
            </div>
            <div className="flex-1 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
              <p className="text-[10px] font-bold uppercase text-gray-400 mb-0.5">Categoría</p>
              <p className="text-sm font-semibold text-gray-700">{categoriaLabel}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre <span className="text-red-500">*</span></label>
            <input type="text" value={nombre} onChange={(e) => { setNombre(e.target.value); setErrorNombre(""); }}
              placeholder="Ej. Kotlin, Design Thinking..." disabled={loading}
              className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-colors disabled:opacity-50 ${errorNombre ? "border-red-400 bg-red-50" : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`}
            />
            {errorNombre && <p className="text-xs text-red-500 mt-1">{errorNombre}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción <span className="text-gray-400 font-normal">(opcional)</span></label>
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
              placeholder="¿Para qué sirve? ¿Por qué debería estar en el catálogo?" rows={3} disabled={loading}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors placeholder:text-gray-400 disabled:opacity-50"
            />
          </div>
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <svg className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <p className="text-xs text-amber-700">La sugerencia requiere aprobación del administrador antes de poder agregarse a perfiles.</p>
          </div>
        </div>
        <div className="flex gap-3 justify-end px-6 py-4 border-t border-gray-100">
          <button onClick={onCancel} disabled={loading} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">Cancelar</button>
          <button onClick={handleSubmit} disabled={loading} className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-amber-500 rounded-lg hover:bg-amber-600 active:scale-95 transition-all disabled:opacity-60">
            {loading && <IconSpinner className="w-4 h-4" />}
            Enviar sugerencia
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Panel: Nueva habilidad ───────────────────────────────────────────────────
function NuevaHabilidadPanel({
  tipo, onTipoChange, catalogoPorCategoria, skillsExistentes,
  loadingCatalog, saving, onSave, onCancel, onToast,
}: {
  tipo: TipoHabilidad; onTipoChange: (t: TipoHabilidad) => void;
  catalogoPorCategoria: Record<string, CatalogItem[]>;
  skillsExistentes: Skill[]; loadingCatalog: boolean; saving: boolean;
  onSave: (skillId: number, nivel: NivelHabilidad | null) => void;
  onCancel: () => void;
  onToast: (msg: string, t: "success" | "error") => void;
}) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaKey | null>(null);
  const [busqueda, setBusqueda]             = useState("");
  const [skillSeleccionada, setSkillSeleccionada] = useState<CatalogItem | null>(null);
  const [nivelSeleccionado, setNivelSeleccionado] = useState<NivelHabilidad | null>(null);
  const [errorDuplicado, setErrorDuplicado] = useState("");
  const [modalSugerencia, setModalSugerencia] = useState(false);

  const isTecnica    = tipo === "Técnica";
  const accentBorder = isTecnica ? "border-blue-500"  : "border-purple-500";
  const accentBg     = isTecnica ? "bg-blue-50"       : "bg-purple-50";
  const accentText   = isTecnica ? "text-blue-700"    : "text-purple-700";
  const accentBadge  = isTecnica ? "text-blue-600 bg-blue-100 border-blue-200" : "text-purple-600 bg-purple-100 border-purple-200";
  const accentTag    = isTecnica ? "text-blue-600 bg-blue-50 border-blue-100"  : "text-purple-600 bg-purple-50 border-purple-100";

  const niveles: { key: NivelHabilidad; desc: string }[] = [
    { key: "Básico",     desc: "Conceptos y uso guiado." },
    { key: "Intermedio", desc: "Implementación funcional en proyectos." },
    { key: "Avanzado",   desc: "Uso profesional autónomo." },
  ];

  const handleTipoChange = (t: TipoHabilidad) => {
    onTipoChange(t);
    setCategoriaSeleccionada(null); setBusqueda(""); setSkillSeleccionada(null);
    setNivelSeleccionado(null); setErrorDuplicado("");
  };

  const handleCategoriaClick = (key: CategoriaKey) => {
    setCategoriaSeleccionada(key); setBusqueda(""); setSkillSeleccionada(null); setErrorDuplicado("");
  };

  const handleSeleccionarSkill = (item: CatalogItem) => {
    const yaExiste = skillsExistentes.some(s => s.skillId === item.id);
    if (yaExiste) { setErrorDuplicado(`"${item.nombre}" ya está en tu perfil.`); setSkillSeleccionada(null); return; }
    setErrorDuplicado(""); setSkillSeleccionada(item);
  };

  const itemsFiltrados: CatalogItem[] = (
    categoriaSeleccionada ? (catalogoPorCategoria[categoriaSeleccionada] ?? []) : []
  ).filter(s => s.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  const sinResultados = !!categoriaSeleccionada && busqueda.trim().length > 0 && itemsFiltrados.length === 0 && !loadingCatalog;
  const categoriaLabel = categoriasParaTipo(tipo).find(c => c.key === categoriaSeleccionada)?.label ?? "";
  const canSave = skillSeleccionada !== null && categoriaSeleccionada !== null && (tipo === "Blanda" || nivelSeleccionado !== null);

  const handleGuardar = () => {
    if (!canSave || !skillSeleccionada) return;
    onSave(skillSeleccionada.id, isTecnica ? nivelSeleccionado : null);
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gray-50/60">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              {skillSeleccionada ? `Nueva · ${skillSeleccionada.nombre}` : "Nueva habilidad"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {isTecnica ? "Selecciona del catálogo técnico y asigna tu nivel." : "Selecciona del catálogo de habilidades blandas."}
            </p>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            {(["Técnica", "Blanda"] as TipoHabilidad[]).map(t => (
              <button key={t} onClick={() => handleTipoChange(t)} disabled={saving}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all disabled:opacity-50 ${tipo === t ? (isTecnica ? "bg-white text-blue-700 shadow-sm" : "bg-white text-purple-700 shadow-sm") : "text-gray-500 hover:text-gray-700"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 space-y-6">
          {/* Paso 1 */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3"><span className="text-gray-400 mr-1.5">1.</span>Selecciona categoría</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {categoriasParaTipo(tipo).map(cat => {
                const isActive = categoriaSeleccionada === cat.key;
                return (
                  <button key={cat.key} type="button" disabled={saving} onClick={() => handleCategoriaClick(cat.key)}
                    className={`text-left p-3.5 rounded-xl border-2 transition-all disabled:opacity-50 ${isActive ? `${accentBorder} ${accentBg}` : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"}`}>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? accentText : "text-gray-400"}`}>{cat.sublabel}</span>
                    <p className={`text-sm font-semibold mt-0.5 ${isActive ? accentText : "text-gray-800"}`}>{cat.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-tight">{cat.ejemplos}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Paso 2 */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3"><span className="text-gray-400 mr-1.5">2.</span>Busca una habilidad</p>
            <div className={`flex items-center gap-2 px-3 py-2 border rounded-lg bg-white transition-colors ${categoriaSeleccionada ? "border-gray-300 focus-within:border-blue-400" : "border-gray-200 opacity-50 pointer-events-none"}`}>
              {categoriaSeleccionada && (
                <span className={`text-[10px] font-bold uppercase rounded px-1.5 py-0.5 flex-shrink-0 border ${accentTag}`}>
                  {categoriaLabel.split(" ")[0].toUpperCase()}
                </span>
              )}
              <input type="text" value={busqueda} disabled={saving}
                onChange={e => { setBusqueda(e.target.value); setSkillSeleccionada(null); setErrorDuplicado(""); }}
                placeholder={categoriaSeleccionada ? "Buscar en el catálogo..." : "Primero selecciona una categoría"}
                className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent disabled:opacity-50"
              />
              <IconSearch className="text-gray-400 flex-shrink-0" />
            </div>

            {errorDuplicado && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                {errorDuplicado}
              </p>
            )}

            {categoriaSeleccionada && (
              <div className="mt-2 border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {isTecnica ? "TÉCNICA" : "SOFT SKILLS"} · {categoriaLabel.toUpperCase()}
                  </span>
                  {skillSeleccionada && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${accentBadge}`}>✓ {skillSeleccionada.nombre}</span>
                  )}
                </div>
                <div className="divide-y divide-gray-50 max-h-52 overflow-y-auto">
                  {loadingCatalog && (
                    <div className="flex items-center justify-center gap-2 py-6 text-sm text-gray-400">
                      <IconSpinner className="w-4 h-4 text-gray-400" /> Cargando catálogo...
                    </div>
                  )}
                  {!loadingCatalog && itemsFiltrados.map(item => {
                    const isSelected   = skillSeleccionada?.id === item.id;
                    const yaRegistrada = skillsExistentes.some(s => s.skillId === item.id);
                    return (
                      <button key={item.id} type="button" disabled={yaRegistrada || saving}
                        onClick={() => handleSeleccionarSkill(item)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${yaRegistrada ? "opacity-40 cursor-not-allowed" : isSelected ? accentBg : "hover:bg-gray-50"}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${isSelected ? (isTecnica ? "bg-blue-100" : "bg-purple-100") : "bg-gray-100"}`}>
                            {isTecnica ? (
                              <svg className={`w-3.5 h-3.5 ${isSelected ? "text-blue-600" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                              </svg>
                            ) : (
                              <svg className={`w-3.5 h-3.5 ${isSelected ? "text-purple-600" : "text-gray-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${isSelected ? accentText : "text-gray-800"}`}>{item.nombre}</p>
                            {item.descripcion && <p className="text-xs text-gray-400">{item.descripcion}</p>}
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-2">
                          {yaRegistrada ? (
                            <span className="text-[10px] text-gray-400 italic">Ya registrada</span>
                          ) : isSelected ? (
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${accentBadge}`}>Seleccionada</span>
                          ) : null}
                        </div>
                      </button>
                    );
                  })}
                  {sinResultados && (
                    <div className="px-4 py-5 flex flex-col items-center gap-3 text-center">
                      <div>
                        <p className="text-sm text-gray-500">No se encontró <span className="font-semibold text-gray-700">"{busqueda}"</span> en el catálogo.</p>
                        <p className="text-xs text-gray-400 mt-0.5">¿Crees que debería estar? Puedes sugerirla.</p>
                      </div>
                      <button type="button" onClick={() => setModalSugerencia(true)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Sugerir "{busqueda}"
                      </button>
                    </div>
                  )}
                  {!loadingCatalog && !sinResultados && itemsFiltrados.length === 0 && !busqueda.trim() && (
                    <div className="px-4 py-6 text-center text-sm text-gray-400">Escribe para buscar una habilidad.</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Paso 3 */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3"><span className="text-gray-400 mr-1.5">3.</span>Nivel</p>
            {isTecnica ? (
              <div className="grid grid-cols-3 gap-3">
                {niveles.map(n => (
                  <button key={n.key} type="button" disabled={saving} onClick={() => setNivelSeleccionado(n.key)}
                    className={`text-left p-3.5 rounded-xl border-2 transition-all disabled:opacity-50 ${nivelSeleccionado === n.key ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${NIVEL_DOT[n.key]}`} />
                      <span className={`text-sm font-semibold ${nivelSeleccionado === n.key ? "text-blue-800" : "text-gray-700"}`}>{n.key}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-tight">{n.desc}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-purple-50 border border-purple-100">
                <svg className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
                </svg>
                <p className="text-xs text-purple-700 leading-relaxed">
                  <span className="font-semibold">Las habilidades blandas no tienen nivel.</span> Este tipo de habilidades se valoran por su presencia, no por un grado de dominio.
                </p>
              </div>
            )}
          </div>

          {/* Acciones */}
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <button onClick={onCancel} disabled={saving} className="flex-1 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">Cancelar</button>
            <button onClick={handleGuardar} disabled={!canSave || saving}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              {saving && <IconSpinner className="w-4 h-4" />}
              Guardar habilidad
            </button>
          </div>
        </div>
      </div>

      {modalSugerencia && (
        <SugerirHabilidadModal
          nombreInicial={busqueda.trim()} tipo={tipo} categoriaKey={categoriaSeleccionada}
          onCancel={() => setModalSugerencia(false)} onToast={onToast}
        />
      )}
    </>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function HabilidadesPage() {
  const [skills, setSkills]                             = useState<Skill[]>([]);
  const [loadingSkills, setLoadingSkills]               = useState(true);
  const [loadingCatalog, setLoadingCatalog]             = useState(false);
  const [catalogoPorCategoria, setCatalogoPorCategoria] = useState<Record<string, CatalogItem[]>>({});
  const [filtroTipo, setFiltroTipo]                     = useState<"Todas" | TipoHabilidad>("Todas");
  const [busqueda, setBusqueda]                         = useState("");
  const [mostrandoPanel, setMostrandoPanel]             = useState(false);
  const [tipoNueva, setTipoNueva]                       = useState<TipoHabilidad>("Técnica");
  const [savingNew, setSavingNew]                       = useState(false);
  const [editando, setEditando]                         = useState<Skill | null>(null);
  const [savingEdit, setSavingEdit]                     = useState(false);
  const [eliminando, setEliminando]                     = useState<Skill | null>(null);
  const [deletingId, setDeletingId]                     = useState<number | null>(null);
  // BUG FIX: tipo solo "success" | "error" para que Toast no crashee
  const [toast, setToast] = useState<{ mensaje: string; tipo: "success" | "error" } | null>(null);

  // Carga inicial
  useEffect(() => {
    (async () => {
      setLoadingSkills(true);
      try {
        const data = await getPortfolioSkills();
        setSkills(data.map(mapPortfolioSkill));
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error al cargar habilidades.";
        setToast({ mensaje: message, tipo: "error" });
      } finally {
        setLoadingSkills(false);
      }
    })();
  }, []);

  // Catálogo al abrir el panel
  useEffect(() => {
    if (!mostrandoPanel || Object.keys(catalogoPorCategoria).length > 0) return;
    (async () => {
      setLoadingCatalog(true);
      try {
        const data = await getCatalogSkills();
        const grouped: Record<string, CatalogItem[]> = {};
        for (const s of data) {
          // BUG FIX: convertir category del backend ("Lenguajes de Programación")
          // a CategoriaKey del frontend ("lenguajes") usando el mapa
          const key: string = CATEGORIA_KEY_MAP[s.category] ?? "otras";
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push({ id: s.id, nombre: s.name, descripcion: "", tipo: apiTypeToFrontend(s.type), categoria: s.category });
        }
        setCatalogoPorCategoria(grouped);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error al cargar el catálogo.";
        setToast({ mensaje: message, tipo: "error" });
      } finally {
        setLoadingCatalog(false);
      }
    })();
  }, [mostrandoPanel]);

  // Crear
  const handleGuardarNuevo = async (skillId: number, nivel: NivelHabilidad | null) => {
    setSavingNew(true);
    try {
      const level = nivel ? frontendLevelToApi(nivel)! : undefined;
      const created = await addPortfolioSkill(skillId, level);
      setSkills(prev => [...prev, mapPortfolioSkill(created)]);
      setMostrandoPanel(false);
      // BUG FIX: created.name en lugar de created.skill.name (campo aplanado)
      setToast({ mensaje: `"${created.name}" añadida a tu perfil.`, tipo: "success" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al agregar la habilidad.";
      setToast({ mensaje: message, tipo: "error" });
    } finally {
      setSavingNew(false);
    }
  };

  // Actualizar nivel
  const handleGuardarNivel = async (nuevoNivel: NivelHabilidad) => {
    if (!editando) return;
    setSavingEdit(true);
    try {
      const updated = await updatePortfolioSkill(editando.portfolioSkillId, frontendLevelToApi(nuevoNivel)!);
      // BUG FIX: mapPortfolioSkill(updated) usa updated.name (campo aplanado)
      setSkills(prev => prev.map(s => s.portfolioSkillId === editando.portfolioSkillId ? mapPortfolioSkill(updated) : s));
      setToast({ mensaje: `Nivel de "${editando.nombre}" actualizado a ${nuevoNivel}.`, tipo: "success" });
      setEditando(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al actualizar el nivel.";
      setToast({ mensaje: message, tipo: "error" });
    } finally {
      setSavingEdit(false);
    }
  };

  // Eliminar
  const handleEliminarConfirm = async () => {
    if (!eliminando) return;
    setDeletingId(eliminando.portfolioSkillId);
    try {
      await deletePortfolioSkill(eliminando.portfolioSkillId);
      setSkills(prev => prev.filter(s => s.portfolioSkillId !== eliminando.portfolioSkillId));
      setToast({ mensaje: `"${eliminando.nombre}" eliminada de tu perfil.`, tipo: "success" });
      setEliminando(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al eliminar la habilidad.";
      setToast({ mensaje: message, tipo: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  const handleCloseToast = useCallback(() => setToast(null), []);

  const skillsFiltered = skills.filter(s => {
    const matchTipo     = filtroTipo === "Todas" || s.tipo === filtroTipo;
    const matchBusqueda = s.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return matchTipo && matchBusqueda;
  });

  const tecnicas = skillsFiltered.filter(s => s.tipo === "Técnica");
  const blandas  = skillsFiltered.filter(s => s.tipo === "Blanda");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeItem="Habilidades" />
        <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
          <div className="flex-1 p-4 pl-14 sm:pl-6 md:p-8">
            <header className="mb-6">
              <p className="text-base text-gray-500 mb-0.5">Portafolio profesional UMSS</p>
              <h1 className="text-4xl font-bold text-textMain">Mis Habilidades</h1>
              <p className="text-sm text-gray-500 mt-1">Bienvenido al area de habilidades. Administra tus habilidades técnicas y blandas .</p>
            </header>

            {/* Filtros */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Filtro tipo como botones */}
                      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                        {(["Todas", "Técnica", "Blanda"] as const).map(t => (
                          <button
                            key={t}
                            onClick={() => setFiltroTipo(t)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                              filtroTipo === t
                                ? "bg-white text-gray-800 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      {/* Buscador */}
                      <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg bg-white hover:border-gray-400 transition-colors">
                        <IconSearch className="text-gray-400" />
                        <input
                          type="text"
                          value={busqueda}
                          onChange={e => setBusqueda(e.target.value)}
                          placeholder="Buscar por nombre..."
                          className="outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent w-40"
                        />
                        {busqueda && (
                          <button onClick={() => setBusqueda("")} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setMostrandoPanel(true)}
                      disabled={mostrandoPanel}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg active:scale-95 transition-all whitespace-nowrap disabled:opacity-60"
                    >
                      + Nueva habilidad
                    </button>
                  </div>
            {/* Habilidades registradas */}
            <div className="bg-white rounded-xl border border-trasparent shadow-md p-5 mb-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-gray-800">Tus Habilidades Registradas</h2>
                  {!loadingSkills && (
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">{skills.length}</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 hidden sm:block">Puedes realizar Editar → solo nivel o · Eliminar → quita la habilidad</p>
              </div>

              {loadingSkills ? (
                <div className="flex items-center justify-center gap-2 py-10 text-sm text-gray-400">
                  <IconSpinner className="w-5 h-5 text-gray-400" />
                  Cargando tus habilidades...
                </div>
              ) : (
                <>
                  {(filtroTipo === "Todas" || filtroTipo === "Técnica") && (
                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-3">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Habilidades Técnicas</p>
                        <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{tecnicas.length}</span>
                      </div>
                      {tecnicas.length === 0 ? (
                        <p className="text-sm text-gray-400 italic">No hay habilidades técnicas registradas.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {tecnicas.map(s => (
                            <SkillChip key={s.portfolioSkillId} skill={s} deleting={deletingId === s.portfolioSkillId}
                              onEdit={() => setEditando(s)} onDelete={() => setEliminando(s)} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {(filtroTipo === "Todas" || filtroTipo === "Blanda") && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Habilidades Blandas</p>
                        <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{blandas.length}</span>
                      </div>
                      {blandas.length === 0 ? (
                        <p className="text-sm text-gray-400 italic">No hay habilidades blandas registradas.</p>
                      ) : (
                        <>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {blandas.map(s => (
                              <SkillChip key={s.portfolioSkillId} skill={s} deleting={deletingId === s.portfolioSkillId}
                                onEdit={() => setEditando(s)} onDelete={() => setEliminando(s)} />
                            ))}
                          </div>
                          <p className="text-xs text-gray-400 italic">
                               Las habilidades blandas no tienen nivel de dominio asignado.
                            <code className="text-xs bg-gray-100 px-1 rounded">StoreSkillRequest</code>.
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Panel nueva habilidad */}
            {mostrandoPanel && (
              <NuevaHabilidadPanel
                tipo={tipoNueva} onTipoChange={setTipoNueva}
                catalogoPorCategoria={catalogoPorCategoria}
                skillsExistentes={skills} loadingCatalog={loadingCatalog}
                saving={savingNew} onSave={handleGuardarNuevo}
                onCancel={() => setMostrandoPanel(false)}
                onToast={(msg, t) => setToast({ mensaje: msg, tipo: t })}
              />
            )}
          </div>
        </main>
      </div>

      {editando && (
        <EditNivelModal skill={editando} loading={savingEdit}
          onSave={handleGuardarNivel} onCancel={() => setEditando(null)} />
      )}
      {eliminando && (
        <DeleteModal skill={eliminando} loading={deletingId === eliminando.portfolioSkillId}
          onConfirm={handleEliminarConfirm} onCancel={() => setEliminando(null)} />
      )}
      {toast && <Toast message={toast.mensaje} type={toast.tipo} onClose={handleCloseToast} />}
    </div>
  );
}
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoUmss from "../assets/logoUmss.png";
import React from "react";
import useAuth from "../hooks/useAuth";
import { API_BASE_URL } from "../utils/constants";
// ── Interfaces ─────────────────────────────────────────────────────────────

interface Feature {
  icon: string;
  title: string;
  description: string;
}

// Datos que vienen del backend: GET /api/v1/featured-profiles
interface FeaturedProfile {
  first_name: string;
  last_name: string;
  location: string | null;
  avatar_url: string | null;
  projects_count: number;
}

// Estadísticas globales del sistema (vienen en el mismo endpoint)
// ⚠️ Ajustar los nombres de campo cuando el backend confirme la estructura
interface GlobalStats {
  total_users: number;
  total_projects: number;
  total_views: number;
}

const features: Feature[] = [
  { icon: "👤", title: "Registro de usuario", description: "Los profesionales TIS pueden registrarse y acceder con usuario y contraseña asociados a la universidad." },
  { icon: "🔑", title: "Control de roles", description: "Sistema de permisos por roles: estudiantes, docentes, coordinadores y administradores del sistema." },
  { icon: "📁", title: "Gestión de proyectos", description: "Administra proyectos académicos y laborales, mantén actualizadas tus experiencias de trabajo." },
  { icon: "📄", title: "Exportación PDF", description: "Genera y exporta tu portafolio como archivo PDF profesional listo para compartir con empleadores." },
  { icon: "🌐", title: "Multilenguaje", description: "Soporte completo en español e inglés para ampliar las oportunidades a nivel internacional." },
  { icon: "⚙️", title: "Panel Administrativo", description: "Herramientas de administración para la gestión de usuarios, estadísticas y resolución de incidencias." },
];

// ── Helpers ────────────────────────────────────────────────────────────────

// Genera iniciales del avatar a partir del nombre y apellido
function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

// Formatea números grandes: 1200 → "1.2k"
function formatNumber(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// ── Hook: carga perfiles destacados y estadísticas desde el backend ─────────
function useFeaturedProfiles() {
  const [profiles, setProfiles] = useState<FeaturedProfile[]>([]);
  const [stats, setStats] = useState<GlobalStats>({
    total_users: 0,
    total_projects: 0,
    total_views: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/featured-profiles`
        );
        if (!res.ok) throw new Error("Error al cargar perfiles");
        const json = await res.json();
        
          console.log("Estructura real del backend:", json);
        // Perfiles destacados
        if (Array.isArray(json.data)) setProfiles(json.data);

        // ⚠️ Estadísticas globales — ajustar nombres de campo cuando el backend confirme
        // Por ahora buscamos en json.stats, pero puede estar en json directamente
        const statsSource = json.stats ?? json;
        setStats({
          total_users: statsSource.total_users ?? 0,
          total_projects: statsSource.total_projects ?? 0,
          total_views: statsSource.total_views ?? 0,
        });
      } catch (err) {
        console.error("Error cargando featured profiles:", err);
        // Fallback con datos de ejemplo si el backend no responde
        setProfiles([
          { first_name: "Carlos", last_name: "Mendoza", location: null, avatar_url: null, projects_count: 12 },
          { first_name: "Lucía", last_name: "Martínez", location: null, avatar_url: null, projects_count: 8 },
          { first_name: "Marcelo", last_name: "Vargas", location: null, avatar_url: null, projects_count: 15 },
        ]);
        setStats({ total_users: 1200, total_projects: 3500, total_views: 15000 });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { profiles, stats, loading };
}

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav
      style={{
        backgroundColor: scrolled ? "rgba(0,26,94,0.97)" : "#001A5E",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "all 0.3s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50 shadow-lg"
    >
      <div className="w-full px-6 h-16 flex items-center">

        {/* Logo — izquierda */}
        <div className="flex-1 flex items-center">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img src={logoUmss} alt="Logo UMSS" className="w-16 h-16 object-contain rounded-full" />
            <span className="text-white font-bold text-lg tracking-wide">NEXUM</span>
          </Link>
        </div>

        {/* Links — centro */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-10">
          <Link to="/" className="text-white text-xs font-bold tracking-widest hover:text-gray-300 transition-colors duration-200 no-underline">
            INICIO
          </Link>
          <Link to="/Home" className="text-white text-xs font-bold tracking-widest hover:text-gray-300 transition-colors duration-200 no-underline">
            EXPLORAR PORTAFOLIOS
          </Link>
          <a href="#contacto" className="text-white text-xs font-bold tracking-widest hover:text-gray-300 transition-colors duration-200 no-underline">
            CONTACTO
          </a>
        </div>

        {/* Botones — derecha */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-3">
          {user ? (
            <>
              <span className="text-white text-sm opacity-80 font-medium">
                {user.first_name || user.name || user.email}
              </span>
              <Link
                to="/profile/personal-data"
                className="text-sm font-bold px-5 py-2 rounded border-2 border-white transition-all duration-200 no-underline"
                style={{ color: "white", backgroundColor: "transparent" }}
                onMouseEnter={(e) => {
                  const l = e.currentTarget as HTMLAnchorElement;
                  l.style.backgroundColor = "white";
                  l.style.color = "#001A5E";
                }}
                onMouseLeave={(e) => {
                  const l = e.currentTarget as HTMLAnchorElement;
                  l.style.backgroundColor = "transparent";
                  l.style.color = "white";
                }}
              >
                Mi Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="text-white text-sm font-bold px-5 py-2 rounded transition-all duration-200 border-0 cursor-pointer"
                style={{ backgroundColor: "#C8102E" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#a50d25")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C8102E")}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-bold px-5 py-2 rounded border-2 border-white transition-all duration-200 no-underline"
                style={{ color: "white", backgroundColor: "transparent" }}
                onMouseEnter={(e) => {
                  const l = e.currentTarget as HTMLAnchorElement;
                  l.style.backgroundColor = "white";
                  l.style.color = "#001A5E";
                }}
                onMouseLeave={(e) => {
                  const l = e.currentTarget as HTMLAnchorElement;
                  l.style.backgroundColor = "transparent";
                  l.style.color = "white";
                }}
              >
                Acceder
              </Link>
              <Link
                to="/register"
                className="text-white text-sm font-bold px-6 py-2 rounded transition-all duration-200 no-underline"
                style={{ backgroundColor: "#C8102E" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#a50d25")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C8102E")}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden flex flex-col gap-1.5 ml-auto"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-4"
          style={{ backgroundColor: "#001A5E" }}
        >
          <Link to="/" className="text-white text-xs font-bold tracking-widest no-underline">INICIO</Link>
          <Link to="/Home" className="text-white text-xs font-bold tracking-widest no-underline">EXPLORAR PORTAFOLIOS</Link>
          <a href="#contacto" className="text-white text-xs font-bold tracking-widest no-underline">CONTACTO</a>
          <div className="flex gap-3 pt-2">
            {user ? (
              <>
                <Link to="/profile/personal-data" className="flex-1 border-2 border-white text-white text-sm font-bold py-2 rounded text-center no-underline">
                  Mi Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex-1 text-white text-sm font-bold py-2 rounded text-center border-0 cursor-pointer"
                  style={{ backgroundColor: "#C8102E" }}
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex-1 border-2 border-white text-white text-sm font-bold py-2 rounded text-center no-underline">
                  Acceder
                </Link>
                <Link to="/register" className="flex-1 text-white text-sm font-bold py-2 rounded text-center no-underline" style={{ backgroundColor: "#C8102E" }}>
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero({ stats }: { stats: GlobalStats }) {
  const { user } = useAuth();
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      title: "Dashboard Principal",
      description: "Vista general de tu portafolio",
      content: (
        <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: "#4a6b7a" }}>
          <div className="flex items-center justify-between px-5 py-3 border-b" style={{ backgroundColor: "#3d5a67", borderColor: "rgba(255,255,255,0.15)" }}>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">⚙</div>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">👤</div>
          </div>
          <div className="p-5 flex gap-3">
            <div className="w-32 flex-shrink-0 rounded-xl p-3 flex flex-col gap-3" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
              {[{ label: "Dashboard", icon: "🏠" }, { label: "Settings", icon: "⚙️" }, { label: "Profile", icon: "👤" }, { label: "Documentation", icon: "📄" }].map((item) => (
                <div key={item.label} className="text-white/70 text-xs py-1.5 px-2 rounded-lg flex items-center gap-2">
                  <span>{item.icon}</span>{item.label}
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <div className="bg-white rounded-xl p-4">
                <div className="font-bold text-sm mb-1" style={{ color: "#1A1A2E" }}>Project Progress</div>
                <div className="text-gray-400 text-xs mb-3">Q4 Performance</div>
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#003087" strokeWidth="4" strokeDasharray="75 25" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold" style={{ color: "#1A1A2E" }}>85%</span>
                    </div>
                  </div>
                  <svg viewBox="0 0 100 40" className="flex-1 h-10">
                    <polyline points="0,35 15,28 30,32 45,18 60,22 75,10 90,14 100,8" fill="none" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3">
                  <div className="font-bold text-xs mb-2" style={{ color: "#1A1A2E" }}>Analytics</div>
                  <div className="flex items-center justify-center py-1">
                    <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#003087" strokeWidth="4" strokeDasharray="55 45" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#C8102E" strokeWidth="4" strokeDasharray="25 75" strokeDashoffset="-55" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="text-gray-400 text-xs text-center">Traffic Sources</div>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <div className="font-bold text-xs mb-2" style={{ color: "#1A1A2E" }}>Reports</div>
                  <div className="flex items-end justify-center gap-1 h-12 py-1">
                    {[40, 70, 50, 80, 60, 90].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: i % 2 === 0 ? "#003087" : "#C9D1D9" }} />
                    ))}
                  </div>
                  <div className="text-gray-400 text-xs text-center">Monthly Summary</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Exportación PDF",
      description: "Descarga tu portafolio listo para empleadores",
      content: (() => {
        const [innerCurrent, setInnerCurrent] = React.useState(0);
        const innerSlides = [
          { title: "Crea tu portafolio", desc: "Sube tus proyectos, habilidades y experiencia en minutos." },
          { title: "Comparte con empleadores", desc: "Genera un enlace único o exporta tu PDF verificado por UMSS." },
          { title: "Destaca como profesional TIS", desc: "Tu perfil validado por la FCyT te diferencia en el mercado." },
        ];
        return (
          <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: "#C9D1D9" }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: "#C8102E" }}>PDF</div>
                <div>
                  <div className="font-bold text-xs" style={{ color: "#1A1A2E" }}>portafolio_cmendoza.pdf</div>
                  <div className="text-gray-400 text-xs">Generado hoy · 2.4 MB</div>
                </div>
              </div>
              <button className="text-xs font-bold px-3 py-1.5 rounded-lg text-white flex-shrink-0" style={{ backgroundColor: "#003087" }}>↓ Descargar</button>
            </div>
            <div className="mx-4 my-4 rounded-xl border overflow-hidden" style={{ borderColor: "#C9D1D9" }}>
              <div className="px-5 py-6 flex flex-col items-center text-center" style={{ backgroundColor: "#fafafa", minHeight: "120px" }}>
                <div className="font-bold text-sm mb-1" style={{ color: "#003087" }}>{innerSlides[innerCurrent].title}</div>
                <div className="text-xs text-gray-500">{innerSlides[innerCurrent].desc}</div>
              </div>
              <div className="flex items-center justify-center gap-2 py-3 border-t" style={{ borderColor: "#C9D1D9", backgroundColor: "#fafafa" }}>
                {innerSlides.map((_, i) => (
                  <button key={i} onClick={() => setInnerCurrent(i)}
                    style={{ width: i === innerCurrent ? "20px" : "7px", height: "7px", borderRadius: i === innerCurrent ? "4px" : "50%", backgroundColor: i === innerCurrent ? "#003087" : "#C9D1D9", transition: "all 0.2s", border: "none", padding: 0, cursor: "pointer" }} />
                ))}
              </div>
            </div>
            <div className="px-4 pb-4 grid grid-cols-3 gap-2">
              {[{ label: "PDF Completo", icon: "📄", active: true }, { label: "Solo CV", icon: "📋", active: false }, { label: "Compartir link", icon: "🔗", active: false }].map((opt) => (
                <button key={opt.label} className="flex flex-col items-center gap-1 py-2 rounded-xl border text-xs font-bold transition-all"
                  style={{ borderColor: opt.active ? "#003087" : "#C9D1D9", color: opt.active ? "#003087" : "#9ca3af", backgroundColor: opt.active ? "#f0f4ff" : "transparent" }}>
                  <span style={{ fontSize: "16px" }}>{opt.icon}</span>{opt.label}
                </button>
              ))}
            </div>
          </div>
        );
      })(),
    },
    {
      title: "Gestión de Proyectos",
      description: "Administra tu portafolio académico",
      content: (
        <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl bg-white">
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "#C9D1D9" }}>
            <div className="font-bold text-sm" style={{ color: "#1A1A2E" }}>Mis Proyectos</div>
            <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: "#003087" }}>+ Nuevo</span>
          </div>
          <div className="divide-y" style={{ borderColor: "#C9D1D9" }}>
            {[
              { name: "Sistema de Inventario", tech: "React · Laravel", status: "Completado", color: "#16a34a" },
              { name: "App Gestión Académica", tech: "Vue · Node.js", status: "En progreso", color: "#d97706" },
              { name: "API REST Portafolio", tech: "PHP · PostgreSQL", status: "Completado", color: "#16a34a" },
              { name: "Dashboard Analytics", tech: "React · Python", status: "Borrador", color: "#6b7280" },
            ].map((proj) => (
              <div key={proj.name} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm" style={{ color: "#1A1A2E" }}>{proj.name}</div>
                  <div className="text-gray-400 text-xs">{proj.tech}</div>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ color: proj.color, backgroundColor: `${proj.color}18` }}>{proj.status}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="flex flex-col lg:flex-row min-h-screen pt-16">
      {/* Left — Azul UMSS */}
      <div className="flex-1 flex flex-col justify-center px-10 lg:px-20 py-20" style={{ backgroundColor: "#003087" }}>
        <div className="inline-flex items-center gap-2 border border-white/30 rounded-full px-4 py-2 mb-8 w-fit" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
          <span className="text-white text-xs">🛡️</span>
          <span className="text-white text-xs font-bold tracking-widest uppercase">Plataforma No Oficial</span>
        </div>

        <h1 className="font-extrabold text-4xl lg:text-5xl xl:text-6xl leading-tight mb-8 text-white">
          {user
            ? `Bienvenido de vuelta, ${user.first_name || user.name || "profesional"} 👋`
            : "Plataforma de Portafolios Digitales para Profesionales"}
        </h1>

        <p className="text-blue-200 text-base leading-relaxed mb-10 max-w-lg">
          {user
            ? "Accedé a tu perfil, actualizá tus proyectos y compartí tu portafolio profesional."
            : "Crea, gestiona y comparte tu perfil profesional."}
        </p>

        <div>
          {user ? (
            <Link
              to="/profile/personal-data"
              className="text-white font-bold text-base px-8 py-4 rounded transition-all duration-200 shadow-xl no-underline inline-block"
              style={{ backgroundColor: "#C8102E" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#a50d25")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C8102E")}
            >
              Ir a mi perfil →
            </Link>
          ) : (
            <Link
              to="/register"
              className="text-white font-bold text-base px-8 py-4 rounded transition-all duration-200 shadow-xl no-underline inline-block"
              style={{ backgroundColor: "#C8102E" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#a50d25")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C8102E")}
            >
              Registrarse ahora
            </Link>
          )}
        </div>

        {/* Estadísticas del backend */}
        <div className="border-t border-white/20 mt-12 pt-10 flex gap-12">
          {[
            { value: formatNumber(stats.total_users), label: "USUARIOS" },
            { value: formatNumber(stats.total_projects), label: "PROYECTOS" },
            { value: formatNumber(stats.total_views), label: "VISITAS" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-white font-extrabold text-3xl">{stat.value || "—"}</div>
              <div className="text-blue-300 text-xs font-bold tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Carrusel */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-20 relative" style={{ backgroundColor: "#C9D1D9" }}>
        <div className="w-full flex items-center justify-center" style={{ minHeight: "340px" }}>
          {slides[current].content}
        </div>
        <div className="mt-6 text-center">
          <div className="font-bold text-sm" style={{ color: "#1A1A2E" }}>{slides[current].title}</div>
          <div className="text-gray-500 text-xs mt-1">{slides[current].description}</div>
        </div>
        <div className="flex items-center gap-6 mt-6">
          <button onClick={prev} className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer"
            style={{ borderColor: "#003087", color: "#003087", backgroundColor: "transparent" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#003087"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#003087"; }}>
            ‹
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className="rounded-full transition-all duration-300 cursor-pointer border-0"
                style={{ width: i === current ? "24px" : "8px", height: "8px", backgroundColor: i === current ? "#003087" : "#94a3b8" }} />
            ))}
          </div>
          <button onClick={next} className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer"
            style={{ borderColor: "#003087", color: "#003087", backgroundColor: "transparent" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#003087"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#003087"; }}>
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Feature Card ───────────────────────────────────────────────────────────
function FeatureCard({ feat }: { feat: Feature }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="rounded-2xl p-7 border transition-all duration-300 cursor-default hover:shadow-xl hover:-translate-y-1"
      style={{ backgroundColor: hovered ? "#003087" : "#FFFFFF", borderColor: hovered ? "#003087" : "#C9D1D9" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-colors duration-300" style={{ backgroundColor: hovered ? "rgba(255,255,255,0.15)" : "#f0f4ff" }}>
        {feat.icon}
      </div>
      <h3 className="font-bold text-lg mb-3" style={{ color: hovered ? "#FFFFFF" : "#1A1A2E" }}>{feat.title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: hovered ? "#bfdbfe" : "#6b7280" }}>{feat.description}</p>
    </div>
  );
}

// ── University Strip ───────────────────────────────────────────────────────
function UniversityStrip() {
  return (
    <div className="py-8 border-y" style={{ backgroundColor: "#FFFFFF", borderColor: "#C9D1D9" }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-6">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#1A1A2E" }}>
          Respaldado por la Universidad Mayor de San Simón
        </p>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {["UMSS", "FCyT", "Dpto. Informática y Sistemas"].map((uni) => (
            <span key={uni} className="text-xs font-bold px-4 py-1.5 rounded-full border"
              style={{ color: "#003087", borderColor: "#003087", backgroundColor: "#f0f4ff" }}>
              {uni}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Features ───────────────────────────────────────────────────────────────
function Features() {
  return (
    <section className="py-24" style={{ backgroundColor: "#C9D1D9" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-3xl lg:text-4xl mb-4" style={{ color: "#1A1A2E" }}>Funcionalidades del Sistema</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-base">Todo lo que necesitas para construir y gestionar tu portafolio profesional.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => <FeatureCard key={feat.title} feat={feat} />)}
        </div>
      </div>
    </section>
  );
}

// ── CTA ────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: "#003087" }}>
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: "#C8102E" }} />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <h2 className="text-white font-extrabold text-3xl lg:text-4xl mb-4">¿Eres profesional de software?</h2>
        <p className="text-blue-200 text-base mb-10 max-w-xl mx-auto">
          Crea tu portafolio institucional hoy mismo y destaca en tu área con una presencia digital profesional.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/register" className="text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-xl no-underline"
            style={{ backgroundColor: "#C8102E" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#a50d25")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C8102E")}>
            Comenzar ahora
          </Link>
          <Link to="/Home" className="border-2 border-white/50 hover:border-white text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 no-underline">
            Explorar portafolios
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Portfolio Card — ahora usa datos del backend ───────────────────────────
const accentColors = ["#003087", "#C8102E", "#001A5E"];

function PortfolioCard({ profile, index }: { profile: FeaturedProfile; index: number }) {
  const [btnHovered, setBtnHovered] = useState(false);
  const accentColor = accentColors[index % accentColors.length];
  const initials = getInitials(profile.first_name, profile.last_name);
  const fullName = `${profile.first_name} ${profile.last_name}`;

  return (
    <div className="rounded-2xl p-6 border-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ backgroundColor: "#FFFFFF", borderColor: "#C9D1D9" }}>
      <div className="flex items-center gap-4 mb-5">
        {profile.avatar_url ? (
          <img src={profile.avatar_url} alt={fullName} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: accentColor }}>
            {initials}
          </div>
        )}
        <div>
          <div className="font-bold text-base" style={{ color: "#1A1A2E" }}>{fullName}</div>
          <div className="text-gray-500 text-xs">{profile.location || "UMSS · FCyT"}</div>
          <div className="text-gray-400 text-xs">Universidad Mayor de San Simón</div>
        </div>
      </div>
      <div className="flex items-center gap-8 mb-6 pt-4 border-t-2" style={{ borderColor: "#C9D1D9" }}>
        <div className="flex-1 border-r-2 pr-8" style={{ borderColor: "#C9D1D9" }}>
          <div className="font-extrabold text-2xl" style={{ color: "#1A1A2E" }}>{profile.projects_count}</div>
          <div className="text-gray-400 text-xs">Proyectos</div>
        </div>
        <div className="flex-1">
          <div className="font-extrabold text-2xl" style={{ color: "#1A1A2E" }}>—</div>
          <div className="text-gray-400 text-xs">Visitas</div>
        </div>
      </div>
      <Link to="/Home"
        className="w-full font-bold text-sm py-2.5 rounded-xl border-2 transition-all duration-200 no-underline text-center inline-block"
        style={{ color: btnHovered ? "#FFFFFF" : "#C8102E", borderColor: "#C8102E", backgroundColor: btnHovered ? "#C8102E" : "transparent" }}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}>
        Ver portafolio →
      </Link>
    </div>
  );
}

// ── Recent Portfolios — datos del backend ──────────────────────────────────
function RecentPortfolios({ profiles, loading }: { profiles: FeaturedProfile[]; loading: boolean }) {
  return (
    <section className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-3xl lg:text-4xl mb-4" style={{ color: "#1A1A2E" }}>Portafolios recientes</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">Conoce el trabajo de los profesionales.</p>
        </div>

        {loading ? (
          // Skeleton de carga
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl p-6 border-2 animate-pulse" style={{ borderColor: "#C9D1D9" }}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-16 bg-gray-200 rounded mb-4" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profiles.map((p, i) => (
              <PortfolioCard key={`${p.first_name}-${p.last_name}`} profile={p} index={i} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/Home" className="text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg no-underline inline-block"
            style={{ backgroundColor: "#003087" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#001A5E")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#003087")}>
            Ver todos los portafolios
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contacto" className="pt-16 pb-8" style={{ backgroundColor: "#001A5E" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 no-underline">
              <img src={logoUmss} alt="Logo UMSS" className="w-16 h-20 object-contain rounded-full" />
              <span className="text-white font-extrabold text-xl tracking-widest ml-1">NEXUM</span>
            </Link>
            <p className="text-blue-300 text-sm leading-relaxed">Plataforma institucional de portafolios digitales para profesionales.</p>
          </div>
          <div>
            <div className="text-white font-bold text-xs mb-4 uppercase tracking-widest">Navegación</div>
            <Link to="/" className="block text-blue-300 hover:text-white text-sm mb-2.5 transition-colors no-underline">Inicio</Link>
            <Link to="/Home" className="block text-blue-300 hover:text-white text-sm mb-2.5 transition-colors no-underline">Explorar Portafolios</Link>
            <Link to="/login" className="block text-blue-300 hover:text-white text-sm mb-2.5 transition-colors no-underline">Acceder</Link>
            <Link to="/register" className="block text-blue-300 hover:text-white text-sm mb-2.5 transition-colors no-underline">Registrarse</Link>
          </div>
          <div>
            <div className="text-white font-bold text-xs mb-4 uppercase tracking-widest">Recursos</div>
            {["Guía de uso", "Formato PDF", "Preguntas frecuentes", "Normativa"].map((l) => (
              <a key={l} href="#" className="block text-blue-300 hover:text-white text-sm mb-2.5 transition-colors no-underline">{l}</a>
            ))}
          </div>
          <div>
            <div className="text-white font-bold text-xs mb-4 uppercase tracking-widest">Contacto</div>
            <p className="text-blue-300 text-sm mb-2">soporte@nexum.umss.edu.bo</p>
            <p className="text-blue-300 text-sm mb-2">FCyT · UMSS</p>
            <p className="text-blue-300 text-sm">Cochabamba, Bolivia</p>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          <p className="text-blue-400 text-xs">© 2025 NEXUM · Universidad Mayor de San Simón · Facultad de Ciencias y Tecnología</p>
          <div className="flex items-center gap-2">
            <span className="text-white font-mono font-bold text-sm">&lt;/&gt;</span>
            <span className="text-blue-400 text-xs">CODI · Departamento de Informática y Sistemas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Home Page ──────────────────────────────────────────────────────────────
export default function Home() {
  const { user } = useAuth();
  const { profiles, stats, loading } = useFeaturedProfiles();

  return (
    <div className="min-h-screen font-sans antialiased">
      <Navbar />
      <Hero stats={stats} />
      <UniversityStrip />
      <Features />
      {!user && <CTA />}
      <RecentPortfolios profiles={profiles} loading={loading} />
      <Footer />
    </div>
  );
}
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ← react-router-dom

// ── Paleta oficial NEXUM/UMSS ──────────────────────────────────────────────
// Primario:           #003087  — Azul profundo UMSS
// Secundario/Acción:  #C8102E  — Rojo UMSS
// Fondo general:      #C9D1D9  — Gris azulado pálido
// Tarjetas/Sup.:      #FFFFFF  — Blanco puro
// Texto principal:    #1A1A2E  — Negro azulado
// Footer/Navbar:      #001A5E  — Azul marino profundo

// ── Mapa de rutas ─────────────────────────────────────────────────────────
// Acceder            → /login
// Registrarse        → /register
// Registrarse ahora  → /register
// Comenzar ahora     → /register
// Explorar portafolios → /portfolio
// Ver portafolio     → /portfolio
// Ver todos          → /portfolio
// Contacto (nav)     → mailto / ancla #contacto (footer)

// ── Types ──────────────────────────────────────────────────────────────────
interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Portfolio {
  name: string;
  role: string;
  university: string;
  projects: number;
  views: string;
  avatar: string;
}

// ── Data ───────────────────────────────────────────────────────────────────
const features: Feature[] = [
  {
    icon: "👤",
    title: "Registro de usuario",
    description:
      "Los profesionales TIS pueden registrarse y acceder con usuario y contraseña asociados a la universidad.",
  },
  {
    icon: "🔑",
    title: "Control de roles",
    description:
      "Sistema de permisos por roles: estudiantes, docentes, coordinadores y administradores del sistema.",
  },
  {
    icon: "📁",
    title: "Gestión de proyectos",
    description:
      "Administra proyectos académicos y laborales, mantén actualizadas tus experiencias de trabajo.",
  },
  {
    icon: "📄",
    title: "Exportación PDF",
    description:
      "Genera y exporta tu portafolio como archivo PDF profesional listo para compartir con empleadores.",
  },
  {
    icon: "🌐",
    title: "Multilenguaje",
    description:
      "Soporte completo en español e inglés para ampliar las oportunidades a nivel internacional.",
  },
  {
    icon: "⚙️",
    title: "Panel Administrativo",
    description:
      "Herramientas de administración para la gestión de usuarios, estadísticas y resolución de incidencias.",
  },
];

const portfolios: Portfolio[] = [
  {
    name: "Carlos Mendoza",
    role: "Ing. de Sistemas",
    university: "Universidad Mayor de San Simón",
    projects: 12,
    views: "3.4k",
    avatar: "CM",
  },
  {
    name: "Lucía Martínez",
    role: "Analista TIS",
    university: "Universidad Mayor de San Simón",
    projects: 8,
    views: "1.2k",
    avatar: "LM",
  },
  {
    name: "Marcelo Vargas",
    role: "Dev Full Stack",
    university: "Universidad Mayor de San Simón",
    projects: 15,
    views: "5.1k",
    avatar: "MV",
  },
];

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        backgroundColor: scrolled ? "rgba(0,26,94,0.97)" : "#001A5E",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "all 0.3s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo → vuelve al inicio */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="text-white font-mono font-bold text-lg tracking-tight">&lt;/&gt;</span>
          <span className="text-white font-extrabold text-xl tracking-widest ml-1">NEXUM</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            to="/"
            className="text-white text-xs font-bold tracking-widest hover:text-gray-300 transition-colors duration-200 no-underline"
          >
            INICIO
          </Link>
          <Link
            to="/Home"
            className="text-white text-xs font-bold tracking-widest hover:text-gray-300 transition-colors duration-200 no-underline"
          >
            EXPLORAR PORTAFOLIOS
          </Link>
          {/* Contacto hace scroll hasta el footer */}
          <a
            href="#contacto"
            className="text-white text-xs font-bold tracking-widest hover:text-gray-300 transition-colors duration-200 no-underline"
          >
            CONTACTO
          </a>
        </div>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-bold px-5 py-2 rounded border-2 border-white transition-all duration-200 no-underline"
            style={{ color: "white", backgroundColor: "transparent" }}
            onMouseEnter={(e) => {
              const link = e.currentTarget as HTMLAnchorElement;
              link.style.backgroundColor = "white";
              link.style.color = "#001A5E";
            }}
            onMouseLeave={(e) => {
              const link = e.currentTarget as HTMLAnchorElement;
              link.style.backgroundColor = "transparent";
              link.style.color = "white";
            }}
          >
            Acceder
          </Link>
          <Link
            to="/register"
            className="text-white text-sm font-bold px-6 py-2 rounded transition-all duration-200 no-underline"
            style={{ backgroundColor: "#C8102E" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#a50d25")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C8102E")
            }
          >
            Registrarse
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
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
          <Link to="/" className="text-white text-xs font-bold tracking-widest no-underline">
            INICIO
          </Link>
          <Link
            to="/Home"
            className="text-white text-xs font-bold tracking-widest no-underline"
          >
            EXPLORAR PORTAFOLIOS
          </Link>
          <a href="#contacto" className="text-white text-xs font-bold tracking-widest no-underline">
            CONTACTO
          </a>
          <div className="flex gap-3 pt-2">
            <Link
              to="/login"
              className="flex-1 border-2 border-white text-white text-sm font-bold py-2 rounded text-center no-underline"
            >
              Acceder
            </Link>
            <Link
              to="/register"
              className="flex-1 text-white text-sm font-bold py-2 rounded text-center no-underline"
              style={{ backgroundColor: "#C8102E" }}
            >
              Registrarse
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero() {

  return (
    <section className="flex flex-col lg:flex-row min-h-screen pt-16">
      {/* Left — Azul UMSS */}
      <div
        className="flex-1 flex flex-col justify-center px-10 lg:px-20 py-20"
        style={{ backgroundColor: "#003087" }}
      >
        <div
          className="inline-flex items-center gap-2 border border-white/30 rounded-full px-4 py-2 mb-8 w-fit"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <span className="text-white text-xs">🛡️</span>
          <span className="text-white text-xs font-bold tracking-widest uppercase">
            Plataforma Oficial
          </span>
        </div>

        <h1 className="font-extrabold text-4xl lg:text-5xl xl:text-6xl leading-tight mb-8 text-white">
          Plataforma de Portafolios Digitales para Profesionales TIS
        </h1>

        <p className="text-blue-200 text-base leading-relaxed mb-10 max-w-lg">
          Crea, gestiona y comparte tu perfil profesional con el respaldo de la
          Universidad Mayor de San Simón. Una herramienta exclusiva para conectar
          talento TIS con el mundo laboral.
        </p>

        {/* Registrarse ahora → /register */}
        <div>
          <Link
            to="/register"
            className="text-white font-bold text-base px-8 py-4 rounded transition-all duration-200 shadow-xl no-underline inline-block"
            style={{ backgroundColor: "#C8102E" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#a50d25")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C8102E")
            }
          >
            Registrarse ahora
          </Link>
        </div>

        {/* Stats */}
        <div className="border-t border-white/20 mt-12 pt-10 flex gap-12">
          {[
            { value: "1,200+", label: "USUARIOS" },
            { value: "3,500+", label: "PROYECTOS" },
            { value: "15k+", label: "VISITAS" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-white font-extrabold text-3xl">{stat.value}</div>
              <div className="text-blue-300 text-xs font-bold tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Gris claro con mockup */}
      <div
        className="flex-1 flex items-center justify-center px-8 py-20"
        style={{ backgroundColor: "#C9D1D9" }}
      >
        <div
          className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: "#4a6b7a" }}
        >
          {/* Window chrome */}
          <div
            className="flex items-center justify-between px-5 py-3 border-b"
            style={{ backgroundColor: "#3d5a67", borderColor: "rgba(255,255,255,0.15)" }}
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">⚙</div>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">👤</div>
          </div>

          <div className="p-5 flex gap-3">
            {/* Sidebar */}
            <div
              className="w-32 flex-shrink-0 rounded-xl p-3 flex flex-col gap-3"
              style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            >
              {[
                { label: "Dashboard", icon: "🏠" },
                { label: "Settings", icon: "⚙️" },
                { label: "Profile", icon: "👤" },
                { label: "Documentation", icon: "📄" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-white/70 text-xs py-1.5 px-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-white/10"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="bg-white rounded-xl p-4">
                <div className="mb-3">
                  <div className="font-bold text-sm" style={{ color: "#1A1A2E" }}>
                    Project Progress
                  </div>
                  <div className="text-gray-400 text-xs">Q4 Performance</div>
                </div>
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
                  <div className="flex-1">
                    <svg viewBox="0 0 100 40" className="w-full h-10">
                      <polyline points="0,35 15,28 30,32 45,18 60,22 75,10 90,14 100,8" fill="none" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <polyline points="0,38 15,33 30,36 45,25 60,28 75,18 90,20 100,15" fill="none" stroke="#C9D1D9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-3">
                  <div className="font-bold text-xs mb-2" style={{ color: "#1A1A2E" }}>Analytics</div>
                  <div className="flex items-center justify-center py-2">
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
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{ height: `${h}%`, backgroundColor: i % 2 === 0 ? "#003087" : "#C9D1D9" }}
                      />
                    ))}
                  </div>
                  <div className="text-gray-400 text-xs text-center">Monthly Summary</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
            <span
              key={uni}
              className="text-xs font-bold px-4 py-1.5 rounded-full border"
              style={{ color: "#003087", borderColor: "#003087", backgroundColor: "#f0f4ff" }}
            >
              {uni}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Feature Card ───────────────────────────────────────────────────────────
function FeatureCard({ feat }: { feat: Feature }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="rounded-2xl p-7 border transition-all duration-300 cursor-default hover:shadow-xl hover:-translate-y-1"
      style={{
        backgroundColor: hovered ? "#003087" : "#FFFFFF",
        borderColor: hovered ? "#003087" : "#C9D1D9",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-colors duration-300"
        style={{ backgroundColor: hovered ? "rgba(255,255,255,0.15)" : "#f0f4ff" }}
      >
        {feat.icon}
      </div>
      <h3 className="font-bold text-lg mb-3" style={{ color: hovered ? "#FFFFFF" : "#1A1A2E" }}>
        {feat.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: hovered ? "#bfdbfe" : "#6b7280" }}>
        {feat.description}
      </p>
    </div>
  );
}

// ── Features ───────────────────────────────────────────────────────────────
function Features() {
  return (
    <section className="py-24" style={{ backgroundColor: "#C9D1D9" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-3xl lg:text-4xl mb-4" style={{ color: "#1A1A2E" }}>
            Funcionalidades del Sistema
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-base">
            Todo lo que necesitas para construir y gestionar tu portafolio profesional.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <FeatureCard key={feat.title} feat={feat} />
          ))}
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
        <h2 className="text-white font-extrabold text-3xl lg:text-4xl mb-4">
          ¿Eres profesional de software?
        </h2>
        <p className="text-blue-200 text-base mb-10 max-w-xl mx-auto">
          Crea tu portafolio institucional hoy mismo y destaca en tu área con
          una presencia digital profesional.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Comenzar ahora → /register */}
          <Link
            to="/register"
            className="text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-xl no-underline"
            style={{ backgroundColor: "#C8102E" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#a50d25")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C8102E")
            }
          >
            Comenzar ahora
          </Link>
          {/* Explorar portafolios → /portfolio */}
          <Link
            to="/Home"
            className="border-2 border-white/50 hover:border-white text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 no-underline"
          >
            Explorar portafolios
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Portfolio Card ─────────────────────────────────────────────────────────
function PortfolioCard({
  portfolio,
  accentColor,
}: {
  portfolio: Portfolio;
  accentColor: string;
}) {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <div
      className="rounded-2xl p-6 border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#C9D1D9" }}
    >
      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: accentColor }}
        >
          {portfolio.avatar}
        </div>
        <div>
          <div className="font-bold text-base" style={{ color: "#1A1A2E" }}>{portfolio.name}</div>
          <div className="text-gray-500 text-xs">{portfolio.role}</div>
          <div className="text-gray-400 text-xs">{portfolio.university}</div>
        </div>
      </div>

      <div className="flex items-center gap-8 mb-6 pt-4 border-t" style={{ borderColor: "#C9D1D9" }}>
        <div>
          <div className="font-extrabold text-2xl" style={{ color: "#1A1A2E" }}>{portfolio.projects}</div>
          <div className="text-gray-400 text-xs">Proyectos</div>
        </div>
        <div>
          <div className="font-extrabold text-2xl" style={{ color: "#1A1A2E" }}>{portfolio.views}</div>
          <div className="text-gray-400 text-xs">Visitas</div>
        </div>
      </div>

      {/* Ver portafolio → /portfolio */}
      <Link
        to="/Home"
        className="w-full font-bold text-sm py-2.5 rounded-xl border-2 transition-all duration-200 no-underline text-center inline-block"
        style={{
          color: btnHovered ? "#FFFFFF" : "#C8102E",
          borderColor: "#C8102E",
          backgroundColor: btnHovered ? "#C8102E" : "transparent",
        }}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
      >
        Ver portafolio →
      </Link>
    </div>
  );
}

// ── Recent Portfolios ──────────────────────────────────────────────────────
function RecentPortfolios() {
  const accentColors = ["#003087", "#C8102E", "#001A5E"];

  return (
    <section className="py-24" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-3xl lg:text-4xl mb-4" style={{ color: "#1A1A2E" }}>
            Portafolios recientes
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Conoce el trabajo de los profesionales TIS de la UMSS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolios.map((p, i) => (
            <PortfolioCard key={p.name} portfolio={p} accentColor={accentColors[i]} />
          ))}
        </div>

        {/* Ver todos → /portfolio */}
        <div className="text-center mt-10">
          <Link
            to="/Home"
            className="text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg no-underline inline-block"
            style={{ backgroundColor: "#003087" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#001A5E")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#003087")
            }
          >
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
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 no-underline">
              <span className="text-white font-mono font-bold text-lg">&lt;/&gt;</span>
              <span className="text-white font-extrabold text-xl tracking-widest ml-1">NEXUM</span>
            </Link>
            <p className="text-blue-300 text-sm leading-relaxed">
              Plataforma institucional de portafolios digitales para profesionales TIS.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <div className="text-white font-bold text-xs mb-4 uppercase tracking-widest">Navegación</div>
            <Link to="/" className="block text-blue-300 hover:text-white text-sm mb-2.5 transition-colors no-underline">Inicio</Link>
            <Link to="/Home" className="block text-blue-300 hover:text-white text-sm mb-2.5 transition-colors no-underline">Explorar Portafolios</Link>
            <Link to="/login" className="block text-blue-300 hover:text-white text-sm mb-2.5 transition-colors no-underline">Acceder</Link>
            <Link to="/register" className="block text-blue-300 hover:text-white text-sm mb-2.5 transition-colors no-underline">Registrarse</Link>
          </div>

          {/* Recursos */}
          <div>
            <div className="text-white font-bold text-xs mb-4 uppercase tracking-widest">Recursos</div>
            {["Guía de uso", "Formato PDF", "Preguntas frecuentes", "Normativa"].map((l) => (
              <a key={l} href="#" className="block text-blue-300 hover:text-white text-sm mb-2.5 transition-colors no-underline">
                {l}
              </a>
            ))}
          </div>

          {/* Contacto */}
          <div>
            <div className="text-white font-bold text-xs mb-4 uppercase tracking-widest">Contacto</div>
            <p className="text-blue-300 text-sm mb-2">soporte@nexum.umss.edu.bo</p>
            <p className="text-blue-300 text-sm mb-2">FCyT · UMSS</p>
            <p className="text-blue-300 text-sm">Cochabamba, Bolivia</p>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          <p className="text-blue-400 text-xs">
            © 2025 NEXUM · Universidad Mayor de San Simón · Facultad de Ciencias y Tecnología
          </p>
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
  return (
    <div className="min-h-screen font-sans antialiased">
      <Navbar />
      <Hero />
      <UniversityStrip />
      <Features />
      <CTA />
      <RecentPortfolios />
      <Footer />
    </div>
  );
}
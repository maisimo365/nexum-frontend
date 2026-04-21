import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { loginService } from "../../services/auth.service";
import logoUmss from "../../assets/logoUmss.png";
import prueba11 from "../../assets/prueba12.png";
import prueba09 from "../../assets/prueba09.png";
import prueba10 from "../../assets/prueba10.png";
import { useEffect } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await loginService({ email, password });

      if (rememberMe) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      }
      setEmail("");
      setPassword("");
      setRememberMe(false);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err: any) {
      const rawMessage = err?.message || "Credenciales inválidas. Verifica tus datos e inténtalo nuevamente.";
      const adminContact = "admin@nexum.com";
      const isDeactivated = /desactivad/i.test(rawMessage);

      setError(
        isDeactivated
          ? `Tu cuenta fue desactivada. Contactá al administrador: ${adminContact}`
          : rawMessage
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">

      {/* Navbar */}
      <nav className="w-full  bg-navbar px-4 sm:px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="text-white hover:opacity-80 transition-opacity"
          title="Retroceder al Home"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <img
            src={logoUmss}
            alt="Logo UMSS"
            className="w-8 h-10 object-contain"
          />
          <span className="text-white font-bold text-lg tracking-wide">
            NEXUM
          </span>
        </div>
        <div className="w-6" />
      </nav>

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:py-10">
        <div className="w-full max-w-4xl bg-surface rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col md:flex-row">

          {/* Panel izquierdo azul — solo en md+ */}
            <div className="hidden md:flex w-full md:w-1/2 rounded-2xl bg-primary flex-col items-center justify-center p-10 text-white">

              {/* Carrusel */}
              {(() => {
                const [idx, setIdx] = useState(0);
                const slides = [
                  { img: prueba11, title: "Tu portafolio profesional ", desc: "Conecta con oportunidades y muestra tu talento al mundo" },
                  { img: prueba09, title: "Proyectos que hablan por ti", desc: "Sube tu trabajo y déjalo brillar ante los empleadores" },
                  { img: prueba10, title: "Verificado por UMSS · FCyT", desc: "Tu perfil con respaldo académico real" },
                ];

              useEffect(() => {
                const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 5000);
                return () => clearInterval(t);
              }, []);

              return (
                <div className="flex flex-col items-center w-full">
                  <img
                    key={idx}
                    src={slides[idx].img}
                    alt="Ilustración Nexum"
                    className="w-48 h-48 lg:w-64 lg:h-64 object-contain mb-8 transition-opacity duration-500"
                  />
                  <h2 className="text-xl lg:text-2xl font-bold text-center mb-2">
                    {slides[idx].title}
                  </h2>
                  <p className="text-sm text-center opacity-80 mb-6">
                    {slides[idx].desc}
                  </p>
                  {/* Dots */}
                  <div className="flex gap-2 mb-6">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIdx(i)}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: i === idx ? "20px" : "8px",
                          height: "8px",
                          backgroundColor: i === idx ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })()}

              <div className="flex items-center justify-between w-full mt-4">
                <span className="border border-white text-white text-xs px-3 py-1 rounded">UMSS</span>
                <span className="text-white font-bold text-lg">Nexum</span>
              </div>
            </div>
          {/* Panel derecho - Formulario */}
          <div className="w-full md:w-1/2 flex flex-col rounded-2xl items-center justify-center p-6 sm:p-8 md:p-10 bg-background">

            {/* Logo visible solo en móvil (reemplaza al panel izquierdo) */}
            <div className="flex md:hidden flex-col items-center mb-4">
              <img
                src={logoUmss}
                alt="Logo UMSS"
                className="w-12 h-12 object-contain mb-1"
              />
              <span className="text-primary font-bold text-xl tracking-wide">NEXUM</span>
            </div>

            <p className="text-textMain text-lg font-bold mb-1 text-center">Bienvenido</p>
            <p className="text-textMain font-bold mb-5 text-center text-sm sm:text-base">
              Accede a tu cuenta para continuar
            </p>

            <div className="w-full bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-md">
              <h2 className="text-base sm:text-lg font-bold text-textMain text-center mb-1">
                Iniciar Sesión
              </h2>
              <p className="text-xs text-gray-400 text-center mb-5">
                Ingresa tus credenciales para continuar
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-textMain block mb-1">
                    Correo electrónico
                  </label>
                  <div className="flex items-center border border-gray-300 rounded px-3 py-2 gap-2 focus-within:border-primary">
                    <Mail size={16} className="text-gray-400 shrink-0" />
                    <input
                      type="email"
                      placeholder="nombre@ejemplo.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className="flex-1 outline-none text-sm text-textMain bg-transparent min-w-0"
                    />
                  </div>
                </div>

                {/* Contraseña */}
                <div>
                  <label className="text-sm font-medium text-textMain block mb-1">
                    Contraseña
                  </label>
                  <div className="flex items-center border border-gray-300 rounded px-3 py-2 gap-2 focus-within:border-primary">
                    <Lock size={16} className="text-gray-400 shrink-0" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      className="flex-1 outline-none text-sm text-textMain bg-transparent min-w-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-primary shrink-0"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-action text-xs mt-1">{error}</p>
                  )}
                </div>

                {/* Recordarme y olvidaste contraseña */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <label className="flex items-center gap-2 text-sm text-textMain cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="accent-primary"
                      autoComplete="off"
                    />
                    Recordarme
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {/* Registro */}
                <p className="text-center text-sm text-textMain">
                  ¿No tienes cuenta?{" "}
                  <Link
                    to="/register"
                    className="text-primary font-semibold hover:underline"
                  >
                    Regístrate aquí
                  </Link>
                </p>

                {/* Botón */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-action text-white py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm rounded-2xl text-gray-800 py-4 bg-white">
        Copyright © 2026 CODI
      </footer>
    </div>
  );
};

export default LoginPage;
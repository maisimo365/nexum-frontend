import { useState } from 'react';
import Sidebar from '../../admin/components/Sidebar';
import RightWidgets from '../../../components/ui/RightWidgets';
import { Globe } from 'lucide-react';

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

function LinksPrivacy() {
  const [linkedin, setLinkedin] = useState('https://www.linkedin.com/in/milton-quispe');
  const [github, setGithub] = useState('https://github.com/milton-quispe');
  const [website, setWebsite] = useState('https://milton.dev');

  const [showProjects, setShowProjects] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  const [showExperience, setShowExperience] = useState(true);
  const [showContact, setShowContact] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Links & Privacy saved:', { linkedin, github, website, showProjects, showSkills, showExperience, showContact });
    alert('Enlaces y Privacidad actualizados (simulado)');
  };

  const Toggle = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
    <div
      onClick={onToggle}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: '999px',
        backgroundColor: active ? '#c8102e' : '#5b6472',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '2px',
        left: active ? '22px' : '2px',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        transition: 'left 0.2s'
      }} />
    </div>
  );

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 120px)', backgroundColor: '#e9eef5' }}>

      <Sidebar activeItem="Enlaces" />

      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>

        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>
          Enlaces y Privacidad
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', width: '100%', maxWidth: '1100px' }}>

          {/* Columna Izquierda: Redes Profesionales */}
          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 6px 18px rgba(0, 26, 94, 0.06)', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div style={{ padding: '16px', background: '#e7edf5', borderRadius: '12px', fontSize: '12px', color: '#5b6472' }}>
              <div style={{ fontWeight: 'bold', color: '#1a1a2e', marginBottom: '4px' }}>Ruta visible dentro del módulo Perfil</div>
              Estás configurando los enlaces públicos y la privacidad del perfil profesional.
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>Redes Profesionales</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* LinkedIn */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LinkedinIcon /> LinkedIn
                </label>
                <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)}
                       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #00000014', fontSize: '14px' }} />
                <span style={{ fontSize: '11px', color: '#5b6472' }}>Opcional. Ejemplo: https://www.linkedin.com/in/tu-perfil</span>
              </div>

              {/* GitHub */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GithubIcon /> GitHub
                </label>
                <input type="text" value={github} onChange={(e) => setGithub(e.target.value)}
                       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #00000014', fontSize: '14px' }} />
              </div>

              {/* Sitio Web */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={18} /> Sitio web
                </label>
                <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)}
                       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #00000014', fontSize: '14px' }} />
              </div>
            </div>

            <button onClick={handleSubmit} style={{ alignSelf: 'flex-end', padding: '10px 20px', borderRadius: '8px', backgroundColor: '#c8102e', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
              Guardar enlaces
            </button>
          </div>

          {/* Columna Derecha: Visibilidad */}
          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 6px 18px rgba(0, 26, 94, 0.06)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>Visibilidad del perfil público</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600' }}>Mostrar proyectos</div>
                  <div style={{ fontSize: '11px', color: '#5b6472' }}>Mostrar/ocultar la sección de proyectos.</div>
                </div>
                <Toggle active={showProjects} onToggle={() => setShowProjects(!showProjects)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600' }}>Mostrar habilidades</div>
                  <div style={{ fontSize: '11px', color: '#5b6472' }}>Mostrar/ocultar la sección de habilidades.</div>
                </div>
                <Toggle active={showSkills} onToggle={() => setShowSkills(!showSkills)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600' }}>Mostrar experiencia</div>
                  <div style={{ fontSize: '11px', color: '#5b6472' }}>Mostrar/ocultar la sección de experiencia.</div>
                </div>
                <Toggle active={showExperience} onToggle={() => setShowExperience(!showExperience)} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600' }}>Mostrar contacto</div>
                  <div style={{ fontSize: '11px', color: '#5b6472' }}>Mostrar/ocultar la sección de contacto.</div>
                </div>
                <Toggle active={showContact} onToggle={() => setShowContact(!showContact)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <RightWidgets type="profile" />
    </div>
  );
}

export default LinksPrivacy;
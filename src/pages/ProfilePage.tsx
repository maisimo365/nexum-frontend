import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './admin/components/Sidebar';
import RightWidgets from '../components/ui/RightWidgets';

function ProfilePage() {
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tituloProfesional, setTituloProfesional] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [biografia, setBiografia] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Datos del perfil:', {
      nombre,
      apellido,
      tituloProfesional,
      correoElectronico,
      telefono,
      ubicacion,
      biografia,
    });
    alert('Datos guardados (simulado)');
  };

  const handleCancel = () => {
    navigate('/'); // Navega de vuelta a la página de inicio
  };

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 120px)' }}>
      
      {/* 1. LADO IZQUIERDO: Sidebar con submenú de Perfil activo */}
      <Sidebar activeItem="Datos Personales" />

      {/* 2. CENTRO: Contenedor del Formulario */}
      <div style={{ flex: 1, padding: '40px 20px', display: 'flex', justifyContent: 'center', overflowY: 'auto' }}>
        <div style={{ 
          width: '100%',
          maxWidth: '600px', 
          backgroundColor: '#fff', 
          padding: '30px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          height: 'fit-content'
        }}>
          <h2 style={{ marginBottom: '20px', color: '#1a1a2e', fontSize: '24px' }}>Datos Personales</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="nombre" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombres:</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="apellido" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Apellidos:</label>
              <input
                type="text"
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="tituloProfesional" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Título Profesional:</label>
              <input
                type="text"
                id="tituloProfesional"
                value={tituloProfesional}
                onChange={(e) => setTituloProfesional(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="correoElectronico" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Correo:</label>
              <input
                type="email"
                id="correoElectronico"
                value={correoElectronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="telefono" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Teléfono:</label>
              <input
                type="tel"
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="ubicacion" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Ubicación:</label>
              <input 
                type="text" 
                id="ubicacion" 
                value={ubicacion} 
                onChange={(e) => setUbicacion(e.target.value)} 
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} 
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="biografia" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Biografía:</label>
              <textarea 
                id="biografia" 
                value={biografia} 
                onChange={(e) => setBiografia(e.target.value)} 
                rows={5} 
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', resize: 'none', boxSizing: 'border-box' }}
              ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button 
                type="submit" 
                style={{ 
                  padding: '10px 20px', 
                  cursor: 'pointer', 
                  backgroundColor: '#c8102e', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  fontWeight: 'bold' 
                }}
              >
                Guardar Cambios
              </button>
              <button 
                type="button" 
                onClick={handleCancel} 
                style={{ 
                  padding: '10px 20px', 
                  cursor: 'pointer', 
                  backgroundColor: '#f4f4f4', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px' 
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 3. LADO DERECHO: Widgets (Calendario, Notificaciones y Enlaces) */}
      <RightWidgets type="profile" />
    </div>
  );
}

export default ProfilePage;
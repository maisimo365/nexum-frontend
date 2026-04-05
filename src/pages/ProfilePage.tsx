import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RightWidgets from '../components/ui/RightWidgets';

function ProfilePage() {
  const navigate = useNavigate();
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
    <div style={{ display: 'flex', minHeight: '100-screen', backgroundColor: '#f5f7fa' }}>
      {/* Contenedor del Formulario (Centro/Izquierda) */}
      <div style={{ flex: 1, padding: '40px 20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h1 style={{ marginBottom: '20px', color: '#1a1a2e' }}>Datos Personales</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="nombre" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombres:</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="apellido" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Apellidos:</label>
              <input
                type="text"
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="tituloProfesional" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Título Profesional:</label>
              <input
                type="text"
                id="tituloProfesional"
                value={tituloProfesional}
                onChange={(e) => setTituloProfesional(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="correoElectronico" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Correo:</label>
              <input
                type="email"
                id="correoElectronico"
                value={correoElectronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="telefono" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Teléfono:</label>
              <input
                type="tel"
                id="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="ubicacion" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Ubicación:</label>
              <input 
                type="text" 
                id="ubicacion" 
                value={ubicacion} 
                onChange={(e) => setUbicacion(e.target.value)} 
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="biografia" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Biografía:</label>
              <textarea 
                id="biografia" 
                value={biografia} 
                onChange={(e) => setBiografia(e.target.value)} 
                rows={5} 
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', resize: 'none' }}
              ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#c8102e', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Guardar Cambios</button>
              <button type="button" onClick={handleCancel} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#f4f4f4', border: '1px solid #ccc', borderRadius: '4px' }}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>

      {/* COMPONENTE LADO DERECHO */}
      <RightWidgets />
    </div>
  );
}

export default ProfilePage;
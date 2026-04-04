import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Datos Personales</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="nombre" style={{ display: 'block', marginBottom: '5px' }}>Nombres:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="apellido" style={{ display: 'block', marginBottom: '5px' }}>Apellidos:</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="tituloProfesional" style={{ display: 'block', marginBottom: '5px' }}>Título Profesional:</label>
          <input
            type="text"
            id="tituloProfesional"
            value={tituloProfesional}
            onChange={(e) => setTituloProfesional(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="correoElectronico" style={{ display: 'block', marginBottom: '5px' }}>Correo:</label>
          <input
            type="email"
            id="correoElectronico"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="telefono" style={{ display: 'block', marginBottom: '5px' }}>Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="ubicacion" style={{ display: 'block', marginBottom: '5px' }}>Ubicación:</label>
          <input type="text" id="ubicacion" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </div>


        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="biografia" style={{ display: 'block', marginBottom: '5px' }}>Biografía:</label>
          <textarea id="biografia" value={biografia} onChange={(e) => setBiografia(e.target.value)} rows={5} style={{ width: '100%', padding: '8px' }}></textarea>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Guardar Cambios</button>
          <button type="button" onClick={handleCancel} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#f4f4f4', border: '1px solid #ccc' }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
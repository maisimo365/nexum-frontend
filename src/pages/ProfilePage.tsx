import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './admin/components/Sidebar';
import RightWidgets from '../components/ui/RightWidgets';

function ProfilePage() {
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('Milton');
  const [apellido, setApellido] = useState('Quispe');
  const [tituloProfesional, setTituloProfesional] = useState('Ingeniero de Sistemas');
  const [correoElectronico, setCorreoElectronico] = useState('milton@gmail.com');
  const [telefono, setTelefono] = useState('66666666');
  const [ubicacion, setUbicacion] = useState('Cochabamba, Bolivia');
  const [biografia, setBiografia] = useState('Desempleado.');

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
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 120px)', backgroundColor: '#e9eef5' }}>
      
      {/* 1. LADO IZQUIERDO: Sidebar */}
      <Sidebar activeItem="Datos Personales" />

      {/* 2. CENTRO: Contenido del área de trabajo */}
      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>
          Datos Personales
        </h2>

        {/* Tarjeta Blanca Principal */}
        <div style={{ 
          width: '100%', 
          maxWidth: '1000px', 
          backgroundColor: '#fff', 
          padding: '32px', 
          borderRadius: '12px', 
          boxShadow: '0 6px 18px rgba(0, 26, 94, 0.06)',
          display: 'flex',
          flexDirection: 'row',
          gap: '32px',
          alignItems: 'flex-start'
        }}>
          
          {/* Panel de Foto (Lado Izquierdo) */}
          <div style={{ width: '144px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '999px', 
              overflow: 'hidden', 
              boxShadow: '0 0 0 4px #fff, 0 0 0 5px #00000014' 
            }}>
              <img 
                src="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FHispanic%2F0" 
                alt="Profile Preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ fontSize: '12px', color: '#5b6472', textAlign: 'center', lineHeight: '1.4' }}>
              Vista previa de imagen al seleccionar o arrastrar una nueva foto.
            </div>
            <button type="button" style={{ 
              minHeight: '36px', padding: '0 14px', borderRadius: '8px', 
              border: '1px solid #00000014', background: '#fff', fontSize: '14px', cursor: 'pointer', fontWeight: '600'
            }}>
              Cambiar foto
            </button>
          </div>

          {/* Campos del Formulario (Lado Derecho) */}
          <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Banner de Ayuda */}
            <div style={{ padding: '16px', background: '#e7edf5', borderRadius: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a2e' }}>Ruta visible dentro del módulo Perfil</div>
              <div style={{ fontSize: '12px', color: '#5b6472' }}>Estás editando la sección Datos Personales del perfil profesional.</div>
            </div>

            {/* Grid de Entradas */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a2e' }}>Nombre</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} 
                       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #00000014', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a2e' }}>Apellido</label>
                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} 
                       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #00000014', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a2e' }}>Título Profesional</label>
                <input type="text" value={tituloProfesional} onChange={(e) => setTituloProfesional(e.target.value)} 
                       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #00000014', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a2e' }}>Correo</label>
                <input type="email" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} 
                       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #00000014', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a2e' }}>Teléfono</label>
                <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} 
                       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #00000014', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a2e' }}>Ubicación</label>
                <input type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} 
                       style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #00000014', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#1a1a2e' }}>Biografía</label>
              <textarea value={biografia} onChange={(e) => setBiografia(e.target.value)} rows={4} 
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #00000014', fontSize: '14px', resize: 'none', boxSizing: 'border-box', lineHeight: '1.5' }} />
            </div>

            {/* Acciones del Formulario */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '20px', borderTop: '1px solid #0000000a' }}>
              <div style={{ fontSize: '12px', color: '#5b6472', maxWidth: '320px' }}>
                Alerta de cambios sin guardar al intentar cancelar. Manejo de errores en subida de imagen sin borrar cambios de texto.
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={handleCancel} style={{ 
                  minHeight: '38px', padding: '0 20px', borderRadius: '8px', 
                  border: '1px solid #00000014', background: '#fff', fontSize: '14px', cursor: 'pointer', fontWeight: '600'
                }}>
                  Cancelar
                </button>
                <button type="submit" style={{ 
                  minHeight: '38px', padding: '0 20px', borderRadius: '8px', 
                  border: 'none', background: '#c8102e', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer' 
                }}>
                  Guardar cambios
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* 3. LADO DERECHO: Widgets */}
      <RightWidgets type="profile" />
    </div>
  );
}

export default ProfilePage;
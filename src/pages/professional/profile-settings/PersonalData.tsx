import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../admin/components/Sidebar';
import RightWidgets from '../../../components/ui/RightWidgets';
import { getPersonalData } from '../../../services/datapersonal.service';

function PersonalData() {
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tituloProfesional, setTituloProfesional] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [biografia, setBiografia] = useState('');
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        //Intentamos traer datos del endpoint /portfolio
        const data = await getPersonalData();
        
        if (data) {
          // Si el portafolio existe, usamos esos datos
          setNombre(data.user.first_name || '');
          setApellido(data.user.last_name || '');
          setCorreoElectronico(data.user.email || '');
          setTituloProfesional(data.profession || '');
          setTelefono(data.phone || '');
          setUbicacion(data.location || '');
          setBiografia(data.biography || '');
        } else {
          // Si no existe (404), rescatamos datos de la tabla 'users' desde el storage
          const storedUser = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}");
          
          if (storedUser.first_name) {
            setNombre(storedUser.first_name);
            setApellido(storedUser.last_name);
            setCorreoElectronico(storedUser.email);
          }
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí irá tu lógica para llamar a update del PortfolioController
    console.log('Datos a guardar:', { nombre, apellido, tituloProfesional, correoElectronico, telefono, ubicacion, biografia });
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#e9eef5' }}>
        Cargando perfil...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 120px)', backgroundColor: '#e9eef5' }}>
      <Sidebar activeItem="Datos Personales" />

      <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>
          Datos Personales
        </h2>

        <div style={{ 
          width: '100%', 
          maxWidth: '1000px', 
          backgroundColor: '#fff', 
          padding: '32px', 
          borderRadius: '12px', 
          boxShadow: '0 6px 18px rgba(0, 26, 94, 0.06)',
          display: 'flex',
          gap: '32px'
        }}>
          
          {/* Panel de Foto */}
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
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <button type="button" style={{ 
              minHeight: '36px', padding: '0 14px', borderRadius: '8px', 
              border: '1px solid #00000014', background: '#fff', fontSize: '14px', cursor: 'pointer', fontWeight: '600'
            }}>
              Cambiar foto
            </button>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>Nombre</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} 
                       style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #00000014' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>Apellido</label>
                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} 
                       style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #00000014' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>Título Profesional</label>
                <input type="text" value={tituloProfesional} onChange={(e) => setTituloProfesional(e.target.value)} 
                       style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #00000014' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>Correo</label>
                <input type="email" value={correoElectronico} disabled 
                       style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #00000014', background: '#f5f5f5' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>Teléfono</label>
                <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} 
                       style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #00000014' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>Ubicación</label>
                <input type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} 
                       style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #00000014' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Biografía</label>
              <textarea value={biografia} onChange={(e) => setBiografia(e.target.value)} rows={4} 
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #00000014', resize: 'none' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px', paddingTop: '20px', borderTop: '1px solid #0000000a' }}>
              <button type="button" onClick={handleCancel} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #00000014', background: '#fff', cursor: 'pointer', fontWeight: '600' }}>
                Cancelar
              </button>
              <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#c8102e', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>

      <RightWidgets type="profile" />
    </div>
  );
}

export default PersonalData;
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  positioning?: 'center' | 'top-right';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, positioning = 'center' }) => {
  if (!isOpen) return null;

  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    zIndex: 1000, // Asegura que esté por encima de otros elementos
  };

  const contentContainerStyles: React.CSSProperties = {
    backgroundColor: '#FFFFFF', // Fondo blanco puro para el contenido del modal
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
    position: 'relative',
  };

  if (positioning === 'top-right') {
    overlayStyles.justifyContent = 'flex-end';
    overlayStyles.alignItems = 'flex-start';
    contentContainerStyles.marginTop = '60px';
    contentContainerStyles.marginRight = '20px';
  } else { // Por defecto 'center'
    overlayStyles.justifyContent = 'center';
    overlayStyles.alignItems = 'center';
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Asegura que esté por encima de otros elementos
        ...overlayStyles,
      }}
      onClick={onClose} // Cierra el modal al hacer clic fuera
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          width: '300px',
          textAlign: 'center',
          position: 'relative',
          ...contentContainerStyles,
        }}
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#333',
          }}
        >
          &times; {/* Icono de cerrar */}
        </button>
        {title && <h2 style={{ marginBottom: '15px', fontSize: '1.5rem', color: '#1A1A2E' }}>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
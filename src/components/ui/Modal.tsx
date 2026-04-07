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
    zIndex: 1000,
  };

  const contentContainerStyles: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    padding: '32px',
    borderRadius: '24px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    width: 'fit-content',
    minWidth: '320px',
    maxWidth: '550px',
    textAlign: 'center',
    position: 'relative',
  };

  if (positioning === 'top-right') {
    overlayStyles.justifyContent = 'flex-end';
    overlayStyles.alignItems = 'flex-start';
    contentContainerStyles.marginTop = '60px';
    contentContainerStyles.marginRight = '20px';
    contentContainerStyles.borderRadius = '12px';
    contentContainerStyles.padding = '20px';
    contentContainerStyles.width = '250px';
  } else {
    overlayStyles.justifyContent = 'center';
    overlayStyles.alignItems = 'center';
  }

  return (
    <div style={overlayStyles} onClick={onClose}>
      <div
        style={contentContainerStyles}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#999',
            lineHeight: 1
          }}
        >
          &times;
        </button>
        {title && (
          <h2 style={{ 
            marginBottom: '20px', 
            fontSize: '1.4rem', 
            fontWeight: '800', 
            color: '#1A1A2E',
            lineHeight: '1.2',
            paddingRight: '20px' 
          }}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  positioning?: 'center' | 'top-right' | 'right';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, positioning = 'center' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 26, 94, 0.55)',
    display: 'flex',
    zIndex: 1000,
  };

  const contentContainerStyles: React.CSSProperties = {
    backgroundColor: 'var(--card, #FFFFFF)',
    padding: '32px',
    borderRadius: '24px',
    boxShadow: '0 16px 40px rgba(0, 26, 94, 0.18)',
    width: 'fit-content',
    minWidth: '320px',
    maxWidth: '550px',
    textAlign: 'left',
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
  } else if (positioning === 'right') {
    overlayStyles.justifyContent = 'flex-end';
    overlayStyles.alignItems = 'stretch';
    contentContainerStyles.margin = '0';
    contentContainerStyles.borderRadius = '24px 0 0 24px';
    contentContainerStyles.padding = '40px 32px';
    contentContainerStyles.width = '100%';
    contentContainerStyles.maxWidth = '520px';
    contentContainerStyles.height = '100%';
    contentContainerStyles.overflowY = 'auto';
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
            top: positioning === 'right' ? '24px' : '15px',
            right: positioning === 'right' ? '24px' : '20px',
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
            marginBottom: '4px',
            fontSize: '20px',
            fontWeight: '700',
            color: '#1a1a2e',
            lineHeight: '1.3',
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
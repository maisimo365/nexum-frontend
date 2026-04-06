import React from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';

interface UserMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userProfession: string;
  userPhoto: string;
}

const UserMenuModal: React.FC<UserMenuModalProps> = ({ isOpen, onClose, userName, userProfession, userPhoto }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mi Perfil" positioning="top-right">
        <img
          src={userPhoto}
          alt="Foto de Perfil"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '15px',
            border: '2px solid #001A5E',
          }}
        />
        <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#1A1A2E' }}>{userName}</h3>
        <p style={{ margin: '0 0 15px 0', fontSize: '0.9rem', color: '#6B7280' }}>{userProfession}</p>
        <Link to="/profile" onClick={onClose} style={{
          display: 'block', padding: '10px 15px', backgroundColor: '#C8102E', color: 'white', textDecoration: 'none', borderRadius: '5px', marginTop: '20px', fontWeight: 'bold', transition: 'background-color 0.3s ease',
        }}>
          Configura tu cuenta
        </Link>
    </Modal>
  );
};

export default UserMenuModal;
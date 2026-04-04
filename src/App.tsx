import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  const HomePage = () => (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Bienvenido a Nexum Frontend</h1>
      <p>Este es un ejemplo de la página de inicio.</p>
      <nav style={{ marginTop: '20px' }}>
        <Link to="/profile" style={{ padding: '10px 20px', border: '1px solid blue', borderRadius: '5px', textDecoration: 'none', color: 'blue' }}>
          Ir a Datos Personales
        </Link>
      </nav>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;

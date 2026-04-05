import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import './App.css';
import LoginPage from './pages/auth/LoginPage';//Este es tu login oe milton
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import Navbar from './components/ui/Navbar';

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
      <Navbar />
      <div style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

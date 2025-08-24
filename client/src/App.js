import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Styleguide from './pages/Styleguide';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './styles/styleguide.css';

function Home() {
  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('rememberMe');
    // Recargar la página para actualizar el estado
    window.location.href = '/';
  };
  
  const userEmail = localStorage.getItem('userEmail') || 'Usuario';
  
  return (
    <div className="padding-lg text-center">
      <h1>App Transporte</h1>
      <p>Sistema de Gestión de Transporte</p>
      <p className="text-secondary margin-top-md">
        <i className="fas fa-user-circle"></i> Bienvenido, {userEmail}
      </p>
      <div className="display-flex justify-center gap-md margin-top-lg">
        <Link to="/styleguide" className="btn btn-outline-primary">
          <i className="fas fa-palette"></i> Sistema de Diseño
        </Link>
        <button onClick={handleLogout} className="btn btn-danger">
          <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta de login - si ya está autenticado, redirigir a home */}
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Login />
          } />
          
          {/* Ruta de registro - accesible sin login */}
          <Route path="/register" element={<Register />} />
          
          {/* Rutas protegidas - requieren autenticación */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          {/* Styleguide - accesible sin login */}
          <Route path="/styleguide" element={<Styleguide />} />
          
          {/* Cualquier otra ruta redirige al login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

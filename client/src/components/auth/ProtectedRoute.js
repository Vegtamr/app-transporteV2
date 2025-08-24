import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Verificar si el usuario está autenticado
  // Por ahora usaremos localStorage, pero en producción sería mejor usar Context o Redux
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // Si está autenticado, mostrar el contenido
  return children;
}

export default ProtectedRoute;
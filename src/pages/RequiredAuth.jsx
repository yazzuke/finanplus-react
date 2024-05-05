import React, { useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from './../context/AuthContext';

function RequiredAuth({ children }) {
  const { isAuthenticated } = useContext(AuthContext); // Reemplaza esto con tu lógica de autenticación
  const navigate = useNavigate();

  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    return <Navigate to="/login" replace />;
  }

  return children; // Si el usuario está autenticado, muestra el componente hijo
}

export default RequiredAuth;
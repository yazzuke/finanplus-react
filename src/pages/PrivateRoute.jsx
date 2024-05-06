import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import AuthContext

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Get user from AuthContext

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />; // Render children or Outlet (for nested routes)
};

export default PrivateRoute;

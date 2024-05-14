import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext

function ProtectRoute({ element, ...rest }) {
  const { isAutenticate } = useAuth(); // Get user from AuthContext

  return isAutenticate ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectRoute;

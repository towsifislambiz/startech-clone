import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuthState from '../hooks/useAuthState';
import AuthLoader from '../components/AuthLoader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthState();
  const location = useLocation();

  if (loading) {
    return <AuthLoader message="Checking security status..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;

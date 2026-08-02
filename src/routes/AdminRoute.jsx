import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuthState from '../hooks/useAuthState';
import AuthLoader from '../components/AuthLoader';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, role } = useAuthState();
  const location = useLocation();

  if (loading) {
    return <AuthLoader message="Verifying Administrator privileges..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== 'Admin') {
    return <Navigate to="/unauthorized" state={{ requiredRole: 'Admin', currentRole: role }} replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;

import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuthState from '../hooks/useAuthState';
import AuthLoader from '../components/AuthLoader';

const AUTHORIZED_SUPER_ADMIN_EMAIL = 'towsifislam33@gmail.com';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading, role } = useAuthState();
  const location = useLocation();

  if (loading) {
    return <AuthLoader message="Verifying Administrator privileges..." />;
  }

  // Strict email check: Only towsifislam33@gmail.com is granted access
  const userEmail = user?.email?.toLowerCase();
  const isSuperAdmin =
    isAuthenticated &&
    (role === 'Admin' || userEmail === AUTHORIZED_SUPER_ADMIN_EMAIL.toLowerCase()) &&
    userEmail === AUTHORIZED_SUPER_ADMIN_EMAIL.toLowerCase();

  if (!isSuperAdmin) {
    console.warn(`[SECURITY_ALERT] Unauthorized access attempt to ${location.pathname} by email: ${userEmail || 'Guest'}`);
    return <Navigate to="/404" replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;

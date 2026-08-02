import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuthState from '../hooks/useAuthState';
import AuthLoader from '../components/AuthLoader';

const SellerRoute = ({ children }) => {
  const { isAuthenticated, loading, role } = useAuthState();
  const location = useLocation();

  if (loading) {
    return <AuthLoader message="Verifying Seller account permissions..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admins also have access to seller features if needed
  if (role !== 'Seller' && role !== 'Admin') {
    return <Navigate to="/unauthorized" state={{ requiredRole: 'Seller', currentRole: role }} replace />;
  }

  return children ? children : <Outlet />;
};

export default SellerRoute;

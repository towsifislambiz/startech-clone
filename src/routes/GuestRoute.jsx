import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuthState from '../hooks/useAuthState';
import AuthLoader from '../components/AuthLoader';

const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading, role } = useAuthState();
  const location = useLocation();

  console.log('[GUEST_ROUTE] Evaluated:', { pathname: location.pathname, loading, isAuthenticated, role });

  // Do not unmount guest pages during background auth sync if not authenticated
  if (loading && isAuthenticated) {
    return <AuthLoader message="Loading account session..." />;
  }

  if (isAuthenticated) {
    console.log('[GUEST_ROUTE] Authenticated user detected -> Redirecting away from guest route');
    const fromLocation = location.state?.from?.pathname;
    if (fromLocation) {
      return <Navigate to={fromLocation} replace />;
    }

    if (role === 'Admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (role === 'Seller') {
      return <Navigate to="/seller-dashboard" replace />;
    } else {
      return <Navigate to="/profile" replace />;
    }
  }

  return children ? children : <Outlet />;
};

export default GuestRoute;

import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuthState from '../hooks/useAuthState';
import AuthLoader from '../components/AuthLoader';

const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading, role } = useAuthState();
  const location = useLocation();

  if (loading) {
    return <AuthLoader message="Loading account session..." />;
  }

  if (isAuthenticated) {
    // 1. If user arrived with a target redirect location in state, preserve it
    const fromLocation = location.state?.from?.pathname;
    if (fromLocation) {
      return <Navigate to={fromLocation} replace />;
    }

    // 2. Otherwise redirect based on role
    if (role === 'Admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (role === 'Seller') {
      return <Navigate to="/seller-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children ? children : <Outlet />;
};

export default GuestRoute;

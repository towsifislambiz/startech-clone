import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';
import SellerLayout from '../layouts/SellerLayout';

// Common Components
import FullPageLoader from '../components/Common/FullPageLoader';
import EmptyState from '../components/Common/EmptyState';

// Lazy Pages
const Home = lazy(() => import('../pages/Home'));
const Category = lazy(() => import('../pages/Category'));
const Product = lazy(() => import('../pages/Product'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const PCBuilder = lazy(() => import('../pages/PCBuilder'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Skeleton Dashboard Placeholders for Admin & Seller
const AdminDashboard = () => (
  <EmptyState
    icon="🛡️"
    title="Admin Dashboard"
    description="Admin analytics, user management, and catalog controls ready for backend connection."
    actionText="Back to Main Store"
    actionLink="/"
  />
);

const SellerDashboard = () => (
  <EmptyState
    icon="🏪"
    title="Seller Dashboard"
    description="Seller portal for managing products, store orders, and revenue."
    actionText="Back to Main Store"
    actionLink="/"
  />
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        {/* Main E-Commerce Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pc-builder" element={<PCBuilder />} />
        </Route>

        {/* Authentication Routes (Card Layout) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* User Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Seller Routes */}
        <Route element={<SellerLayout />}>
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
        </Route>

        {/* 404 Catch All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

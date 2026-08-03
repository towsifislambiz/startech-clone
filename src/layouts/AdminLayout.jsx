import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Layout/Sidebar';
import AdminHeader from '../components/Admin/AdminHeader';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg, #060d13)' }}>
      {/* Collapsible Brand Sidebar */}
      <Sidebar role="Admin" />

      {/* Main Administrative Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        {/* Luxury Top Header Bar */}
        <AdminHeader />

        {/* Content Body View */}
        <main style={{ flex: 1, padding: '32px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

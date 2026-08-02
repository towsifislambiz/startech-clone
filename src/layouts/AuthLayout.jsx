import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FiZap } from 'react-icons/fi';
import Toast from '../components/Common/Toast';

const AuthLayout = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg)',
        padding: '40px 20px',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ backgroundColor: 'var(--accent-red)', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
          <FiZap />
        </span>
        <span style={{ fontSize: '28px', fontWeight: 800 }}>
          <span style={{ color: 'var(--text-primary)' }}>Star</span>
          <span style={{ color: 'var(--accent-red)' }}>Tech</span>
        </span>
      </Link>

      <div style={{ width: '100%', maxWidth: '440px' }}>
        <Outlet />
      </div>

      <div style={{ marginTop: '30px', color: 'var(--text-secondary)', fontSize: '13px', textAlign: 'center' }}>
        &copy; 2026 StarTech. All rights reserved.
      </div>
      <Toast />
    </div>
  );
};

export default AuthLayout;

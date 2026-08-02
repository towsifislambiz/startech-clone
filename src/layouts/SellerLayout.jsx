import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/Layout/Sidebar';
import useAuthState from '../hooks/useAuthState';
import { FiUser, FiBell, FiExternalLink } from 'react-icons/fi';

const SellerLayout = () => {
  const { user } = useAuthState();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg, #060d13)' }}>
      {/* Seller Sidebar */}
      <Sidebar role="Seller" />

      {/* Main Content Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        {/* Top Header */}
        <header
          style={{
            height: '68px',
            backgroundColor: 'var(--bg-secondary, #081621)',
            borderBottom: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            position: 'sticky',
            top: 0,
            zIndex: 100
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div>
              <div style={{ fontWeight: '800', fontSize: '18px', color: 'var(--text-primary, #ffffff)', letterSpacing: '-0.02em' }}>
                Seller Control Panel
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted, #64748b)', fontWeight: '600' }}>
                Store Operations & Analytics
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--accent-red, #D51E0B)',
                fontSize: '13px',
                fontWeight: '700',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                backgroundColor: 'rgba(213, 30, 11, 0.1)',
                border: '1px solid rgba(213, 30, 11, 0.2)',
                transition: 'all 0.2s ease'
              }}
            >
              Live Storefront <FiExternalLink size={14} />
            </Link>

            <button
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-secondary, #94a3b8)',
                cursor: 'pointer',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              title="Notifications"
            >
              <FiBell size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '14px', borderLeft: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)' }}>
                <FiUser size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary, #ffffff)', lineHeight: '1.2' }}>
                  {user?.displayName || user?.email || 'Seller Partner'}
                </div>
                <div style={{ fontSize: '11px', color: '#3b82f6', fontWeight: '700' }}>
                  Verified Seller
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main style={{ flex: 1, padding: '28px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;

import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiHeart, FiStar, FiLogOut, FiHome } from 'react-icons/fi';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Toast from '../components/Common/Toast';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: 'Overview', icon: FiHome, path: '/dashboard' },
    { label: 'My Orders', icon: FiShoppingBag, path: '/dashboard?tab=orders' },
    { label: 'Wishlist', icon: FiHeart, path: '/dashboard?tab=wishlist' },
    { label: 'My Reviews', icon: FiStar, path: '/dashboard?tab=reviews' },
    { label: 'Profile', icon: FiUser, path: '/dashboard?tab=profile' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1, padding: '40px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
          {/* Sidebar */}
          <aside style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', padding: '20px', height: 'fit-content', border: '1px solid var(--border-color)' }}>
            <div style={{ paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
              <h4 style={{ margin: 0 }}>{user?.first_name || 'User'}</h4>
              <small style={{ color: 'var(--text-secondary)' }}>{user?.email}</small>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = location.pathname + location.search === item.path;
                return (
                  <Link
                    key={idx}
                    to={item.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      color: isActive ? 'var(--white)' : 'var(--text-primary)',
                      backgroundColor: isActive ? 'var(--accent-red)' : 'transparent',
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontSize: '14px',
                    }}
                  >
                    <Icon /> {item.label}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={logout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  color: 'var(--danger)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  marginTop: '10px',
                  textAlign: 'left',
                }}
              >
                <FiLogOut /> Logout
              </button>
            </nav>
          </aside>

          {/* Main Dashboard Content Area */}
          <div>
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default DashboardLayout;

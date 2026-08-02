import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiGrid, FiBox, FiShoppingBag, FiUsers, FiBarChart2, FiSettings,
  FiTag, FiLayers, FiZap, FiLogOut
} from 'react-icons/fi';
import useAuthState from '../../hooks/useAuthState';

const Sidebar = ({ role = 'Admin' }) => {
  const { logout } = useAuthState();

  const adminMenu = [
    { title: 'Overview', path: '/admin-dashboard', icon: <FiGrid size={18} /> },
    { title: 'Users Governance', path: '/admin/users', icon: <FiUsers size={18} /> },
    { title: 'Products', path: '/admin/products', icon: <FiBox size={18} /> },
    { title: 'Orders', path: '/admin/orders', icon: <FiShoppingBag size={18} /> },
    { title: 'Categories', path: '/admin/categories', icon: <FiLayers size={18} /> },
    { title: 'Brands', path: '/admin/brands', icon: <FiTag size={18} /> },
    { title: 'Analytics', path: '/admin/analytics', icon: <FiBarChart2 size={18} /> },
    { title: 'Settings', path: '/admin/settings', icon: <FiSettings size={18} /> },
  ];

  const sellerMenu = [
    { title: 'Dashboard', path: '/seller-dashboard', icon: <FiGrid size={18} /> },
    { title: 'My Products', path: '/seller/products', icon: <FiBox size={18} /> },
    { title: 'My Orders', path: '/seller/orders', icon: <FiShoppingBag size={18} /> },
    { title: 'Sales Analytics', path: '/seller/analytics', icon: <FiBarChart2 size={18} /> },
  ];

  const menuItems = role === 'Admin' ? adminMenu : sellerMenu;

  return (
    <aside
      style={{
        width: '270px',
        backgroundColor: '#081621',
        color: '#ffffff',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 18px',
        flexShrink: 0
      }}
    >
      <div>
        {/* Sidebar Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '22px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '22px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #D51E0B 0%, #ff4d36 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 12px rgba(213, 30, 11, 0.35)' }}>
            <FiZap size={22} />
          </div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '19px', color: '#fff', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Star<span style={{ color: '#D51E0B' }}>Tech</span>
            </div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', fontWeight: '700', marginTop: '2px' }}>
              {role} Console
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin-dashboard' || item.path === '/seller-dashboard'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                color: isActive ? '#ffffff' : '#94a3b8',
                background: isActive ? 'linear-gradient(135deg, #D51E0B 0%, #ff4d36 100%)' : 'transparent',
                boxShadow: isActive ? '0 4px 12px rgba(213, 30, 11, 0.3)' : 'none',
                transition: 'all 0.2s ease'
              })}
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Action */}
      <button
        onClick={logout}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: '700',
          color: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          cursor: 'pointer',
          marginTop: 'auto',
          transition: 'all 0.2s ease'
        }}
      >
        <FiLogOut size={18} />
        <span>Logout Session</span>
      </button>
    </aside>
  );
};

export default Sidebar;

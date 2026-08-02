import React from 'react';
import {
  FiGrid, FiShoppingBag, FiUser, FiMapPin, FiHeart,
  FiStar, FiHelpCircle, FiSettings, FiLogOut
} from 'react-icons/fi';
import { BsArrowLeftRight } from 'react-icons/bs';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: FiGrid },
  { id: 'orders', label: 'My Orders', icon: FiShoppingBag },
  { id: 'profile', label: 'Profile Settings', icon: FiUser },
  { id: 'addresses', label: 'Address Book', icon: FiMapPin },
  { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
  { id: 'compare', label: 'Product Compare', icon: BsArrowLeftRight },
  { id: 'reviews', label: 'My Reviews', icon: FiStar },
  { id: 'support', label: 'Help & Support', icon: FiHelpCircle },
  { id: 'settings', label: 'Account Settings', icon: FiSettings }
];

const DashboardSidebar = ({ activeTab = 'overview', onTabChange, onLogout, user, role }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-secondary, #0c1c28)',
        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'sticky',
        top: '80px'
      }}
    >
      {/* User Header Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#D51E0B', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '900', flexShrink: 0 }}>
          {user?.displayName?.[0] || 'U'}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.displayName || 'StarTech User'}
          </div>
          <div style={{ fontSize: '12px', color: '#9ca3af' }}>{user?.email}</div>
          <span style={{ fontSize: '10px', backgroundColor: 'rgba(213, 30, 11, 0.2)', color: '#D51E0B', padding: '2px 8px', borderRadius: '4px', fontWeight: '700', textTransform: 'uppercase', display: 'inline-block', marginTop: '4px' }}>
            {role || 'Customer'}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: isActive ? '#D51E0B' : 'transparent',
                color: '#ffffff',
                border: 'none',
                fontWeight: isActive ? '800' : '600',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.1)', margin: 0 }} />

      {/* Logout Action */}
      <button
        type="button"
        onClick={onLogout}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: '8px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          color: '#ef4444',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          fontWeight: '700',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer'
        }}
      >
        <FiLogOut size={16} /> Logout
      </button>
    </div>
  );
};

export default DashboardSidebar;

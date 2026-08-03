import React from 'react';
import {
  FiGrid, FiShoppingBag, FiUser, FiMapPin, FiHeart,
  FiShoppingCart, FiStar, FiHelpCircle, FiSettings, FiLogOut, FiCalendar
} from 'react-icons/fi';
import { BsArrowLeftRight } from 'react-icons/bs';

const NAV_ITEMS = [
  { id: 'overview', label: 'Dashboard', icon: FiGrid },
  { id: 'orders', label: 'My Orders', icon: FiShoppingBag },
  { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
  { id: 'cart', label: 'Cart', icon: FiShoppingCart },
  { id: 'profile', label: 'Profile Settings', icon: FiUser },
  { id: 'addresses', label: 'Address Book', icon: FiMapPin },
  { id: 'compare', label: 'Product Compare', icon: BsArrowLeftRight },
  { id: 'reviews', label: 'My Reviews', icon: FiStar },
  { id: 'support', label: 'Help & Support', icon: FiHelpCircle },
  { id: 'settings', label: 'Account Settings', icon: FiSettings }
];

const DashboardSidebar = ({ activeTab = 'overview', onTabChange, onLogout, user, role }) => {
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Jan 2026';

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-secondary, #0c1c28)',
        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
        borderRadius: '20px',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
        position: 'sticky',
        top: '90px'
      }}
    >
      {/* User Profile Info Card */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user?.displayName || 'User Avatar'}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              objectFit: 'cover',
              border: '2px solid #D51E0B',
              boxShadow: '0 6px 16px rgba(213, 30, 11, 0.35)'
            }}
          />
        ) : (
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              backgroundColor: '#D51E0B',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              fontWeight: '900',
              flexShrink: 0,
              boxShadow: '0 6px 16px rgba(213, 30, 11, 0.35)'
            }}
          >
            {user?.displayName?.[0]?.toUpperCase() || 'U'}
          </div>
        )}

        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: '15.5px', fontWeight: '800', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.displayName || 'StarTech User'}
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.email}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
            <span
              style={{
                fontSize: '10px',
                backgroundColor: 'rgba(213, 30, 11, 0.2)',
                color: '#D51E0B',
                border: '1px solid rgba(213, 30, 11, 0.4)',
                padding: '2px 8px',
                borderRadius: '6px',
                fontWeight: '800',
                textTransform: 'uppercase'
              }}
            >
              {role || 'Customer'}
            </span>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <FiCalendar size={11} /> {memberSince}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Menu Links */}
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
                padding: '11px 16px',
                borderRadius: '12px',
                backgroundColor: isActive ? 'rgba(213, 30, 11, 0.15)' : 'transparent',
                color: isActive ? '#ffffff' : '#94a3b8',
                border: isActive ? '1px solid rgba(213, 30, 11, 0.4)' : '1px solid transparent',
                fontWeight: isActive ? '800' : '600',
                fontSize: '13.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative'
              }}
            >
              {/* Active Left Indicator */}
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '20%',
                    bottom: '20%',
                    width: '4px',
                    borderRadius: '0 4px 4px 0',
                    backgroundColor: '#D51E0B',
                    boxShadow: '0 0 10px #D51E0B'
                  }}
                />
              )}
              <Icon size={18} style={{ color: isActive ? '#D51E0B' : '#64748b' }} />
              {item.label}
            </button>
          );
        })}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: '4px 0' }} />

      {/* Logout Button */}
      <button
        type="button"
        onClick={onLogout}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          backgroundColor: 'rgba(239, 68, 68, 0.08)',
          color: '#ef4444',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          fontWeight: '800',
          fontSize: '13.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <FiLogOut size={18} /> Logout
      </button>
    </div>
  );
};

export default DashboardSidebar;

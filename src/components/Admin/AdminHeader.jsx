import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShield, FiBell, FiExternalLink, FiSearch, FiLogOut, FiUser } from 'react-icons/fi';
import useAuthState from '../../hooks/useAuthState';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = () => {
  const { user } = useAuthState();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header
      style={{
        height: '72px',
        backgroundColor: '#0c1c28',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(12px)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Brand & Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: '#D51E0B',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(213, 30, 11, 0.4)'
          }}
        >
          <FiShield size={22} />
        </div>
        <div>
          <div style={{ fontWeight: '900', fontSize: '19px', color: '#ffffff', letterSpacing: '-0.5px' }}>
            StarTech Super Admin Control Center
          </div>
          <div style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: '600' }}>
            Platform Governance & Enterprise Management
          </div>
        </div>
      </div>

      {/* Header Search & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Global Search Bar */}
        <div style={{ position: 'relative', width: '280px' }}>
          <FiSearch style={{ position: 'absolute', left: '14px', top: '12px', color: '#64748b' }} size={16} />
          <input
            type="text"
            placeholder="Search orders, products, users..."
            style={{
              width: '100%',
              padding: '9px 14px 9px 40px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backgroundColor: '#081621',
              color: '#ffffff',
              fontSize: '13px',
              outline: 'none'
            }}
          />
        </div>

        {/* Live Site View Link */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: '700',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '10px',
            backgroundColor: 'rgba(213, 30, 11, 0.15)',
            border: '1px solid rgba(213, 30, 11, 0.3)',
            transition: 'all 0.2s ease'
          }}
        >
          View Live Store <FiExternalLink size={14} />
        </Link>

        {/* Notification Bell */}
        <button
          type="button"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
          title="System Notifications"
        >
          <FiBell size={19} />
          <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D51E0B' }} />
        </button>

        {/* Admin Profile Dropdown */}
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingLeft: '16px',
              borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#D51E0B',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                fontSize: '18px',
                boxShadow: '0 4px 12px rgba(213, 30, 11, 0.4)'
              }}
            >
              {user?.displayName?.[0]?.toUpperCase() || 'A'}
            </div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#ffffff' }}>
                {user?.displayName || 'Super Admin'}
              </div>
              <div style={{ fontSize: '11px', color: '#D51E0B', fontWeight: '800' }}>
                towsifislam33@gmail.com
              </div>
            </div>
          </div>

          {showDropdown && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '52px',
                width: '220px',
                backgroundColor: '#0c1c28',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '14px',
                padding: '10px',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5)',
                zIndex: 999
              }}
            >
              <Link
                to="/profile"
                onClick={() => setShowDropdown(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '600'
                }}
              >
                <FiUser size={16} /> My Account Profile
              </Link>

              <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: '6px 0' }} />

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  color: '#ef4444',
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                <FiLogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

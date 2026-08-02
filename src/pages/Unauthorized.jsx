import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiShieldOff, FiHome, FiArrowLeft, FiLock } from 'react-icons/fi';

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const requiredRole = location.state?.requiredRole || 'higher privileges';
  const currentRole = location.state?.currentRole || 'Customer';

  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        background: 'var(--bg)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '48px 32px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative Top Accent Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #D51E0B 0%, #ff4d36 100%)'
          }}
        />

        {/* Animated Icon Badge */}
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            backgroundColor: 'rgba(213, 30, 11, 0.12)',
            border: '2px solid rgba(213, 30, 11, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            color: '#D51E0B',
            animation: 'pulseGlow 2s infinite ease-in-out'
          }}
        >
          <FiShieldOff size={44} />
        </div>

        {/* Status Code & Title */}
        <div
          style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#D51E0B',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <FiLock size={16} /> 403 Forbidden Access
        </div>

        <h1
          style={{
            fontSize: '28px',
            fontWeight: '800',
            color: 'var(--text-primary)',
            marginBottom: '16px'
          }}
        >
          Access Restricted
        </h1>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '15px',
            lineHeight: '1.6',
            marginBottom: '24px'
          }}
        >
          You do not have permission to access this area. This feature requires a <strong>{requiredRole}</strong> account.
          Your current account role is <span style={{ textTransform: 'capitalize', color: 'var(--text-primary)', fontWeight: '600' }}>{currentRole}</span>.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            marginTop: '32px'
          }}
        >
          <button
            onClick={() => navigate(-1)}
            className="btn"
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-tertiary, #1a2530)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <FiArrowLeft size={18} /> Go Back
          </button>

          <Link
            to="/"
            className="btn btn-primary"
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              backgroundColor: '#D51E0B',
              color: '#ffffff',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none'
            }}
          >
            <FiHome size={18} /> Back to Homepage
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(213, 30, 11, 0.4); }
          70% { transform: scale(1.04); box-shadow: 0 0 0 14px rgba(213, 30, 11, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(213, 30, 11, 0); }
        }
      `}</style>
    </div>
  );
};

export default Unauthorized;

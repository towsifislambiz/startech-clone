import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiHome, FiAlertCircle } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        background: 'var(--bg)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: '540px',
          width: '100%',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '48px 36px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          position: 'relative'
        }}
      >
        {/* Animated Badge Icon */}
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: 'rgba(213, 30, 11, 0.1)',
            border: '2px dashed #D51E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            color: '#D51E0B',
            animation: 'spinPulse 4s ease-in-out infinite'
          }}
        >
          <FiAlertCircle size={52} />
        </div>

        <h1
          style={{
            fontSize: '64px',
            fontWeight: '900',
            color: '#D51E0B',
            lineHeight: '1',
            marginBottom: '12px',
            letterSpacing: '-1px'
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '16px'
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '15px',
            lineHeight: '1.6',
            marginBottom: '32px'
          }}
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable in StarTech catalog.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            justifyContent: 'center'
          }}
        >
          <Link
            to="/category/1"
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
              textDecoration: 'none'
            }}
          >
            <FiSearch size={18} /> Search Products
          </Link>

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
            <FiHome size={18} /> Back Home
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spinPulse {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.05) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;

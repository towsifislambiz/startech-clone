import React from 'react';
import { FiZap } from 'react-icons/fi';

const AuthLoader = ({ message = 'Verifying Authentication & Security...' }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#081621] text-white p-4 transition-opacity duration-300"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#081621',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Container to prevent layout shifts */}
      <div className="flex flex-col items-center text-center max-w-sm w-full" style={{ textAlign: 'center', maxWidth: '360px' }}>
        
        {/* Animated Brand Logo Icon */}
        <div 
          className="relative mb-6 flex items-center justify-center"
          style={{ position: 'relative', marginBottom: '24px' }}
        >
          <div
            className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#D51E0B] to-[#ff4d36] flex items-center justify-center shadow-lg shadow-red-900/40 animate-pulse"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #D51E0B 0%, #ff4d36 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(213, 30, 11, 0.45)'
            }}
          >
            <FiZap size={44} color="#ffffff" className="animate-bounce" />
          </div>

          {/* Glowing Ring Orbit */}
          <div 
            style={{
              position: 'absolute',
              top: '-8px',
              left: '-8px',
              right: '-8px',
              bottom: '-8px',
              borderRadius: '20px',
              border: '2px solid rgba(213, 30, 11, 0.3)',
              animation: 'spin 3s linear infinite'
            }}
          />
        </div>

        {/* Brand Text */}
        <div style={{ fontSize: '26px', fontWeight: '800', tracking: '0.5px', marginBottom: '12px' }}>
          <span style={{ color: '#ffffff' }}>Star</span>
          <span style={{ color: '#D51E0B' }}>Tech</span>
        </div>

        {/* Status Message */}
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '20px', fontWeight: '500' }}>
          {message}
        </p>

        {/* Smooth Loader Bar */}
        <div
          style={{
            width: '180px',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '999px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div
            style={{
              height: '100%',
              width: '45%',
              backgroundColor: '#D51E0B',
              borderRadius: '999px',
              position: 'absolute',
              animation: 'loadingSlide 1.5s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes loadingSlide {
          0% { left: -45%; }
          50% { left: 50%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default AuthLoader;

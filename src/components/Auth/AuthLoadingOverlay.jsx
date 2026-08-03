import React, { useEffect, useState, useRef } from 'react';
import { FiZap, FiShield } from 'react-icons/fi';

const AuthLoadingOverlay = ({ title, subtitle, durationMs = 3000, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('Initializing authentication...');
  
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const startTime = Date.now();
    const intervalTime = 30;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / durationMs) * 100), 100);
      setProgress(pct);

      if (pct < 30) {
        setStepText('Connecting to Firebase Security Services...');
      } else if (pct < 65) {
        setStepText(durationMs > 4000 ? 'Authenticating credentials & profile...' : 'Sending email verification request...');
      } else if (pct < 95) {
        setStepText(durationMs > 4000 ? 'Loading your custom tech dashboard...' : 'Finalizing user registration...');
      } else {
        setStepText('Complete!');
      }

      if (elapsed >= durationMs) {
        clearInterval(timer);
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [durationMs]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(6, 13, 19, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
        padding: '24px',
        animation: 'fadeIn 0.3s ease'
      }}
    >
      {/* Brand Icon Glow Container */}
      <div
        style={{
          position: 'relative',
          width: '96px',
          height: '96px',
          borderRadius: '28px',
          backgroundColor: '#D51E0B',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '28px',
          boxShadow: '0 0 50px rgba(213, 30, 11, 0.55), inset 0 0 15px rgba(255, 255, 255, 0.2)'
        }}
      >
        <FiZap size={48} style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }} />
        
        {/* Pulsing Outer Ring */}
        <div
          style={{
            position: 'absolute',
            inset: '-10px',
            borderRadius: '34px',
            border: '2px solid rgba(213, 30, 11, 0.4)',
            animation: 'pulse 1.8s infinite ease-in-out'
          }}
        />
      </div>

      {/* Main Title */}
      <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#ffffff', margin: '0 0 10px 0', letterSpacing: '-0.5px', textAlign: 'center' }}>
        {title || 'Authenticating...'}
      </h2>

      {/* Subtitle */}
      <p style={{ fontSize: '14.5px', color: '#94a3b8', margin: '0 0 28px 0', textAlign: 'center', maxWidth: '420px', lineHeight: 1.5 }}>
        {subtitle || 'Please wait while we establish a secure session'}
      </p>

      {/* Progress Bar Container */}
      <div style={{ width: '100%', maxWidth: '380px', marginBottom: '16px' }}>
        <div
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #D51E0B, #ff4b3e, #22c55e)',
              borderRadius: '10px',
              transition: 'width 0.05s linear',
              boxShadow: '0 0 12px rgba(213, 30, 11, 0.6)'
            }}
          />
        </div>
      </div>

      {/* Step Status Text & Percentage */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#94a3b8' }}>
        <FiShield style={{ color: '#22c55e' }} size={15} />
        <span>{stepText}</span>
        <span style={{ color: '#ffffff', fontWeight: '800', marginLeft: '6px' }}>{progress}%</span>
      </div>
    </div>
  );
};

export default AuthLoadingOverlay;

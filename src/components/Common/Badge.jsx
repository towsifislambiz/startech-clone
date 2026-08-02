import React from 'react';

const Badge = ({ children, variant = 'primary', className = '', style = {} }) => {
  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' };
      case 'warning':
        return { bg: 'rgba(234, 179, 8, 0.15)', color: '#eab308' };
      case 'danger':
        return { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' };
      case 'info':
        return { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' };
      default:
        return { bg: 'rgba(213, 30, 11, 0.15)', color: 'var(--accent-red)' };
    }
  };

  const { bg, color } = getColors();

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 600,
        backgroundColor: bg,
        color: color,
        ...style,
      }}
      className={className}
    >
      {children}
    </span>
  );
};

export default Badge;

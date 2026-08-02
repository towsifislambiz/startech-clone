import React from 'react';

const Spinner = ({ size = 'medium', color = 'var(--accent-red)' }) => {
  const dimensions = size === 'small' ? '18px' : size === 'large' ? '48px' : '28px';
  const borderWidth = size === 'small' ? '2px' : '3px';

  return (
    <div
      style={{
        display: 'inline-block',
        width: dimensions,
        height: dimensions,
        border: `${borderWidth} solid rgba(255, 255, 255, 0.2)`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'st-spin 0.8s linear infinite',
      }}
      aria-label="Loading"
    />
  );
};

export default Spinner;

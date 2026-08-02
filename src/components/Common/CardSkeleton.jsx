import React from 'react';

const CardSkeleton = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        border: '1px solid var(--border-color)',
        animation: 'pulse 1.5s infinite ease-in-out',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '180px',
          backgroundColor: 'var(--border-color)',
          borderRadius: '6px',
        }}
      />
      <div
        style={{
          width: '40%',
          height: '14px',
          backgroundColor: 'var(--border-color)',
          borderRadius: '4px',
        }}
      />
      <div
        style={{
          width: '85%',
          height: '18px',
          backgroundColor: 'var(--border-color)',
          borderRadius: '4px',
        }}
      />
      <div
        style={{
          width: '60%',
          height: '22px',
          backgroundColor: 'var(--border-color)',
          borderRadius: '4px',
          marginTop: 'auto',
        }}
      />
    </div>
  );
};

export default CardSkeleton;

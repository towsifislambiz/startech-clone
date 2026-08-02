import React from 'react';

const ProductSkeleton = ({ count = 4 }) => {
  return (
    <div style={{ display: 'contents' }}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: 'var(--bg-secondary, #0c1c28)',
            border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            animation: 'skeletonPulse 1.5s ease-in-out infinite'
          }}
        >
          <div style={{ height: '170px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }} />
          <div style={{ height: '12px', width: '40%', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px' }} />
          <div style={{ height: '18px', width: '90%', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px' }} />
          <div style={{ height: '14px', width: '70%', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px' }} />
          <div style={{ height: '24px', width: '50%', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', marginTop: 'auto' }} />
          <div style={{ height: '38px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '8px' }} />
        </div>
      ))}
      <style>{`
        @keyframes skeletonPulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default ProductSkeleton;
